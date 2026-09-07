#!/usr/bin/env python3
"""Google Play Developer API client for shipping Android App Bundles.

Depends on nothing but the Python standard library and the `openssl` CLI (used to
RS256-sign the service-account JWT), so it runs with no `pip install` step.

    python3 play_upload.py status
    python3 play_upload.py upload --aab <path> --track internal
    python3 play_upload.py upload --aab <path> --track production --status draft
    python3 play_upload.py upload --aab <path> --track production --rollout 0.1
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request

DEFAULT_KEY = os.path.expanduser(
    "~/Library/Mobile Documents/com~apple~CloudDocs/Files/taras-android-google-play.json"
)
DEFAULT_PACKAGE = "xyz.tleskiv.tt"
SCOPE = "https://www.googleapis.com/auth/androidpublisher"
API = "https://androidpublisher.googleapis.com/androidpublisher/v3"
UPLOAD_API = "https://androidpublisher.googleapis.com/upload/androidpublisher/v3"


def fail(message: str) -> "NoReturn":  # noqa: F821
    print(f"error: {message}", file=sys.stderr)
    sys.exit(1)


def b64url(raw: bytes) -> str:
    return base64.urlsafe_b64encode(raw).rstrip(b"=").decode()


def sign_rs256(payload: bytes, private_key_pem: str) -> bytes:
    fd, path = tempfile.mkstemp(prefix="play-sa-", suffix=".pem")
    try:
        os.fchmod(fd, 0o600)
        with os.fdopen(fd, "w") as handle:
            handle.write(private_key_pem)
        result = subprocess.run(
            ["openssl", "dgst", "-sha256", "-sign", path],
            input=payload,
            capture_output=True,
        )
    finally:
        os.unlink(path)
    if result.returncode != 0:
        fail(f"openssl could not sign the JWT: {result.stderr.decode().strip()}")
    return result.stdout


def access_token(key: dict) -> str:
    now = int(time.time())
    token_uri = key.get("token_uri", "https://oauth2.googleapis.com/token")
    header = {"alg": "RS256", "typ": "JWT"}
    claims = {
        "iss": key["client_email"],
        "scope": SCOPE,
        "aud": token_uri,
        "iat": now,
        "exp": now + 3600,
    }
    signing_input = f"{b64url(json.dumps(header).encode())}.{b64url(json.dumps(claims).encode())}"
    assertion = f"{signing_input}.{b64url(sign_rs256(signing_input.encode(), key['private_key']))}"
    body = urllib.parse.urlencode(
        {"grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer", "assertion": assertion}
    ).encode()
    request = urllib.request.Request(token_uri, data=body, method="POST")
    request.add_header("Content-Type", "application/x-www-form-urlencoded")
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return json.load(response)["access_token"]
    except urllib.error.HTTPError as error:
        fail(f"service account auth failed ({error.code}): {error.read().decode(errors='replace')}")


class ApiError(Exception):
    def __init__(self, status: int, body: str):
        super().__init__(f"HTTP {status}: {body}")
        self.status = status
        self.body = body


class Play:
    def __init__(self, token: str, package: str):
        self.token = token
        self.package = package

    def _call(self, method: str, url: str, *, body=None, headers=None, stream=None, length=None):
        request_headers = {"Authorization": f"Bearer {self.token}"}
        request_headers.update(headers or {})
        data = stream
        if body is not None:
            data = json.dumps(body).encode()
            request_headers["Content-Type"] = "application/json"
        if length is not None:
            request_headers["Content-Length"] = str(length)
        request = urllib.request.Request(url, data=data, method=method, headers=request_headers)
        try:
            with urllib.request.urlopen(request, timeout=1800) as response:
                raw = response.read()
                return json.loads(raw) if raw else {}
        except urllib.error.HTTPError as error:
            raise ApiError(error.code, error.read().decode(errors="replace")) from None

    def edits_url(self, edit_id: str, suffix: str = "") -> str:
        return f"{API}/applications/{self.package}/edits/{edit_id}{suffix}"

    def create_edit(self) -> str:
        return self._call("POST", f"{API}/applications/{self.package}/edits", body={})["id"]

    def delete_edit(self, edit_id: str) -> None:
        try:
            self._call("DELETE", self.edits_url(edit_id))
        except ApiError as error:
            print(f"warning: could not delete edit {edit_id}: {error}", file=sys.stderr)

    def list_tracks(self, edit_id: str) -> list:
        return self._call("GET", self.edits_url(edit_id, "/tracks")).get("tracks", [])

    def upload_bundle(self, edit_id: str, aab: str) -> dict:
        url = f"{UPLOAD_API}/applications/{self.package}/edits/{edit_id}/bundles?uploadType=media"
        size = os.path.getsize(aab)
        with open(aab, "rb") as handle:
            return self._call(
                "POST",
                url,
                headers={"Content-Type": "application/octet-stream"},
                stream=handle,
                length=size,
            )

    def update_track(self, edit_id: str, track: str, release: dict) -> dict:
        return self._call(
            "PUT",
            self.edits_url(edit_id, f"/tracks/{track}"),
            body={"track": track, "releases": [release]},
        )

    def validate(self, edit_id: str) -> dict:
        return self._call("POST", self.edits_url(edit_id, ":validate"))

    def commit(self, edit_id: str, changes_not_sent_for_review: bool = False) -> dict:
        query = "?changesNotSentForReview=true" if changes_not_sent_for_review else ""
        return self._call("POST", self.edits_url(edit_id, f":commit{query}"))


def load_key(path: str) -> dict:
    if not os.path.exists(path):
        fail(f"service account key not found at {path}")
    with open(path) as handle:
        key = json.load(handle)
    for field in ("client_email", "private_key"):
        if field not in key:
            fail(f"{path} is not a service account key (missing {field})")
    return key


def connect(args) -> Play:
    return Play(access_token(load_key(args.key)), args.package)


def cmd_status(args) -> int:
    play = connect(args)
    edit_id = play.create_edit()
    try:
        tracks = play.list_tracks(edit_id)
    finally:
        play.delete_edit(edit_id)

    print(f"package: {play.package}")
    highest = 0
    for track in tracks:
        releases = track.get("releases", [])
        if not releases:
            print(f"  {track['track']:<12} (no releases)")
            continue
        for release in releases:
            codes = ", ".join(release.get("versionCodes", [])) or "-"
            highest = max(highest, *(int(code) for code in release.get("versionCodes", ["0"])))
            fraction = release.get("userFraction")
            rollout = f" rollout={float(fraction) * 100:g}%" if fraction else ""
            name = release.get("name", "")
            print(
                f"  {track['track']:<12} versionCodes={codes:<8} status={release.get('status', '?')}"
                f"{rollout} name={name}"
            )
    print(f"highest versionCode on Play: {highest}")
    return 0


def cmd_upload(args) -> int:
    if not os.path.exists(args.aab):
        fail(f"bundle not found at {args.aab} — build it first")
    if args.rollout is not None and not 0 < args.rollout < 1:
        fail("--rollout must be a fraction between 0 and 1 (e.g. 0.1 for 10%)")

    play = connect(args)
    edit_id = play.create_edit()
    print(f"edit {edit_id} created")

    committed = False
    try:
        bundle = play.upload_bundle(edit_id, args.aab)
        version_code = str(bundle["versionCode"])
        size_mb = os.path.getsize(args.aab) / 1024 / 1024
        print(f"uploaded {os.path.basename(args.aab)} ({size_mb:.1f} MB) as versionCode {version_code}")

        release = {"versionCodes": [version_code], "status": args.status}
        if args.rollout is not None:
            release["status"] = "inProgress"
            release["userFraction"] = args.rollout
        if args.name:
            release["name"] = args.name
        if args.release_notes:
            release["releaseNotes"] = [{"language": args.notes_locale, "text": args.release_notes}]
        play.update_track(edit_id, args.track, release)
        print(f"track {args.track} set to status={release['status']}")

        if args.dry_run:
            play.validate(edit_id)
            print("validated (dry run) — edit discarded, nothing was published")
            return 0

        try:
            result = play.commit(edit_id)
        except ApiError as error:
            if "changesNotSentForReview" not in error.body:
                raise
            print(
                "note: Play refused to send changes for review automatically; "
                "committing with changesNotSentForReview=true. The release will sit in the "
                "Play Console until you send it for review there.",
                file=sys.stderr,
            )
            result = play.commit(edit_id, changes_not_sent_for_review=True)
        committed = True
        print(f"committed edit {result.get('id', edit_id)}")
        print(f"versionCode {version_code} is on the {args.track} track (status={release['status']})")
        return 0
    except ApiError as error:
        print(f"error: Play API call failed — {error}", file=sys.stderr)
        return 1
    finally:
        if not committed:
            play.delete_edit(edit_id)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--key", default=os.environ.get("GOOGLE_PLAY_KEY_JSON", DEFAULT_KEY))
    parser.add_argument("--package", default=DEFAULT_PACKAGE)
    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("status", help="list tracks and their releases").set_defaults(func=cmd_status)

    upload = subparsers.add_parser("upload", help="upload an .aab and assign it to a track")
    upload.add_argument("--aab", required=True)
    upload.add_argument("--track", default="internal", choices=["internal", "alpha", "beta", "production"])
    upload.add_argument("--status", default="completed", choices=["completed", "draft", "halted", "inProgress"])
    upload.add_argument("--rollout", type=float, help="staged rollout fraction, e.g. 0.1 (forces status=inProgress)")
    upload.add_argument("--name", help="release name shown in the Play Console")
    upload.add_argument("--release-notes")
    upload.add_argument("--notes-locale", default="en-US")
    upload.add_argument("--dry-run", action="store_true", help="upload and validate, then discard the edit")
    upload.set_defaults(func=cmd_upload)

    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
