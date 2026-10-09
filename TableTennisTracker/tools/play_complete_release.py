#!/usr/bin/env python3
"""Make an already-uploaded versionCode the completed (100%) release of a Google Play track.

gplay 2.0.0 cannot do this: `--complete` sends a user fraction ("COMPLETED release must not have
fraction"), and that also hits the internal track's default. Upload the bundle with
`gplay releases upload ... --draft` first, then run this, which replaces the track's releases with
one completed release in a single edit, validates and commits it.

Usage:  python3 tools/play_complete_release.py <track> <versionCode> "<en-US release notes>"
Auth:   the Play service-account key in iCloud Files (JWT signed with openssl, no pip packages).
"""

from __future__ import annotations

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

KEY = os.path.expanduser(
    "~/Library/Mobile Documents/com~apple~CloudDocs/Files/taras-android-google-play.json")
PACKAGE = "xyz.tleskiv.tt"


def b64(data: bytes) -> bytes:
    return base64.urlsafe_b64encode(data).rstrip(b"=")


def access_token() -> str:
    sa = json.load(open(KEY))
    now = int(time.time())
    header = b64(json.dumps({"alg": "RS256", "typ": "JWT"}).encode())
    claim = b64(json.dumps({
        "iss": sa["client_email"],
        "scope": "https://www.googleapis.com/auth/androidpublisher",
        "aud": "https://oauth2.googleapis.com/token",
        "iat": now,
        "exp": now + 3600,
    }).encode())
    message = header + b"." + claim
    with tempfile.NamedTemporaryFile("w", delete=False) as f:
        f.write(sa["private_key"])
        key_path = f.name
    try:
        signature = subprocess.run(["openssl", "dgst", "-sha256", "-sign", key_path],
                                   input=message, capture_output=True, check=True).stdout
    finally:
        os.unlink(key_path)
    jwt = (message + b"." + b64(signature)).decode()
    body = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": jwt,
    }).encode()
    return json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", body))["access_token"]


def main() -> None:
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    track, version_code, notes = sys.argv[1:]
    token = access_token()
    base = f"https://androidpublisher.googleapis.com/androidpublisher/v3/applications/{PACKAGE}/edits"

    def call(method: str, url: str, body: dict | None = None) -> dict:
        request = urllib.request.Request(
            url, method=method, data=json.dumps(body).encode() if body is not None else None,
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
        try:
            return json.load(urllib.request.urlopen(request))
        except urllib.error.HTTPError as e:
            sys.exit(f"{method} {url}: HTTP {e.code}\n{e.read().decode()}")

    edit = call("POST", base, {})["id"]
    release = {"versionCodes": [version_code], "status": "completed",
               "releaseNotes": [{"language": "en-US", "text": notes}]}
    print(json.dumps(call("PUT", f"{base}/{edit}/tracks/{track}",
                          {"track": track, "releases": [release]})))
    call("POST", f"{base}/{edit}:validate")
    call("POST", f"{base}/{edit}:commit")
    print(f"committed: {track} -> versionCode {version_code}, completed")


if __name__ == "__main__":
    main()
