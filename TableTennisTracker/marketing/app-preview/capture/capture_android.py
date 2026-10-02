#!/usr/bin/env python3
"""Record the raw Android screen clips the Google Play promo video is cut from.

    python3 capture_android.py              # every take -> ../public/clips/android/
    python3 capture_android.py log          # just one take
    python3 capture_android.py --no-build   # reuse the installed app and test APKs
    python3 capture_android.py --reprocess  # re-cut the last recordings without recording again

A take is `androidApp/src/androidTest/.../AppPreviewTakes.kt`, run with `am instrument` and the
`previewTake` argument. It seeds the showcase data off camera, writes `ready` into its external files
directory and waits; this script starts `screenrecord`, writes `/data/local/tmp/tt-preview-go`, and
the take plays its script, logging every injected touch against the moment it saw `go`.

`screenrecord` takes a moment to start filming, and when exactly is not reported, so the log is
placed on the recording by fitting its taps to the screen changes they cause.
"""
import argparse, json, os, shutil, subprocess, sys, time

import footage

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.abspath(os.path.join(HERE, "../../.."))
SDK = os.environ.get("ANDROID_HOME", "/opt/homebrew/share/android-commandlinetools")
ADB = os.path.join(SDK, "platform-tools", "adb")
APP = "xyz.tleskiv.tt.debug"
RUNNER = f"{APP}.test/androidx.test.runner.AndroidJUnitRunner"
DEVICE_DIR = f"/sdcard/Android/data/{APP}/files/preview"
DEVICE_VIDEO = "/sdcard/tt-preview-take.mp4"
GO = "/data/local/tmp/tt-preview-go"
HANDSHAKE = "/tmp/tt-preview/android"
WIDTH = 1080

os.environ["ANDROID_HOME"] = SDK
JDK = "/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
if os.path.isdir(JDK):
    os.environ["JAVA_HOME"] = JDK
    os.environ["PATH"] = f"{JDK}/bin:{os.environ['PATH']}"

TAKES = ["browse", "log", "analytics", "dark"]


def sh(*cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)


def adb(*args):
    return sh(ADB, *args)


def build():
    print("building and installing the app and its instrumentation tests…")
    out = sh(os.path.join(PROJECT, "gradlew"), "-p", PROJECT, ":androidApp:installDebug",
             ":androidApp:installDebugAndroidTest", "-q")
    if out.returncode:
        sys.exit(out.stdout[-4000:] + out.stderr[-4000:])


def demo_status_bar():
    """A clean 9:41 status bar: full battery, full wifi, no mobile data, no notification icons."""
    adb("shell", "settings", "put", "global", "sysui_demo_allowed", "1")
    for extras in (["-e", "command", "enter"],
                   ["-e", "command", "clock", "-e", "hhmm", "0941"],
                   ["-e", "command", "battery", "-e", "level", "100", "-e", "plugged", "false"],
                   ["-e", "command", "network", "-e", "wifi", "show", "-e", "level", "4", "-e", "fully", "true"],
                   ["-e", "command", "network", "-e", "mobile", "hide"],
                   ["-e", "command", "notifications", "-e", "visible", "false"]):
        adb("shell", "am", "broadcast", "-a", "com.android.systemui.demo", *extras)


def wait_for_device_file(path, proc, seconds):
    deadline = time.time() + seconds
    while time.time() < deadline:
        if adb("shell", "ls", path).returncode == 0:
            return True
        if proc.poll() is not None:
            return False
        time.sleep(0.2)
    return False


def record(name):
    shake = os.path.join(HANDSHAKE, name)
    shutil.rmtree(shake, ignore_errors=True)
    os.makedirs(shake)
    adb("shell", "rm", "-rf", DEVICE_DIR, GO, DEVICE_VIDEO)

    log = open(os.path.join(shake, "instrument.log"), "w")
    test = subprocess.Popen([ADB, "shell", "am", "instrument", "-w", "-e", "class", "xyz.tleskiv.tt.AppPreviewTakes",
                             "-e", "previewTake", name, RUNNER], stdout=log, stderr=subprocess.STDOUT)
    if not wait_for_device_file(f"{DEVICE_DIR}/ready", test, 300):
        test.kill()
        sys.exit(f"{name}: the take never got ready; see {shake}/instrument.log")

    rec = subprocess.Popen([ADB, "shell", "screenrecord", "--bit-rate", "16000000", DEVICE_VIDEO])
    started = time.time()
    time.sleep(1.0)
    adb("shell", "touch", GO)
    went = time.time()

    finished = wait_for_device_file(f"{DEVICE_DIR}/events.json", test, 300)
    time.sleep(0.4)
    adb("shell", "pkill", "-INT", "screenrecord")
    rec.wait(timeout=30)
    test.wait(timeout=120)
    log.close()
    if not finished:
        sys.exit(f"{name}: the take failed before finishing; see {shake}/instrument.log")
    time.sleep(1.0)
    adb("pull", DEVICE_VIDEO, os.path.join(shake, "raw.mp4"))
    adb("pull", f"{DEVICE_DIR}/events.json", os.path.join(shake, "events.json"))
    with open(os.path.join(shake, "go"), "w") as fh:
        fh.write(str(went - started))


def fit_offset(changes, gestures, guess):
    """Where `go` falls in the recording.

    The host knows only that filming began after it launched `screenrecord` and before it wrote `go`,
    so `go` lies at most `guess` into the recording. A take waits for the screen to settle before each
    gesture, which then changes it within a frame or two: the offset that puts every gesture at the
    start of a burst of change, after a still moment, is the one where the log meets the picture.
    """
    def cost(offset):
        total = 0.0
        for g in gestures:
            t = g + offset
            after = [c - t for c in changes if 0.0 <= c - t <= 0.4]
            total += min(after) if after else 0.4
            if any(-0.3 <= c - t < 0.0 for c in changes):
                total += 0.3
        return total

    candidates = [guess - 1.2 + i * 0.01 for i in range(126)]
    return min(candidates, key=cost)


def finalize(name, out_dir):
    shake = os.path.join(HANDSHAKE, name)
    raw = os.path.join(shake, "raw.mp4")
    meta = json.load(open(os.path.join(shake, "events.json")))
    guess = float(open(os.path.join(shake, "go")).read())
    changes = footage.change_times(raw)
    taps = [e["t"] for e in meta["events"] if e["kind"] in ("tap", "drag")]
    offset = fit_offset(changes, taps, guess) if taps else guess
    events = [dict(e, t=e["t"] + offset) for e in meta["events"]]
    end = (meta["end"] - meta["go"]) / 1000 + offset
    print(f"  {name}: go at {offset:.2f}s of the recording (host guessed {guess:.2f}s)")
    footage.cut(raw, events, end, meta["points"], "android", name, out_dir, WIDTH, changes=changes)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("takes", nargs="*", help=f"take names: {', '.join(TAKES)} (default: all)")
    ap.add_argument("--no-build", action="store_true", help="reuse the installed app and test APKs")
    ap.add_argument("--reprocess", action="store_true",
                    help="re-cut the last recordings in /tmp/tt-preview/android without recording again")
    args = ap.parse_args()
    unknown = [t for t in args.takes if t not in TAKES]
    if unknown:
        ap.error(f"unknown takes: {', '.join(unknown)}")

    out_dir = os.path.join(HERE, "..", "public", "clips", "android")
    os.makedirs(out_dir, exist_ok=True)
    takes = args.takes or TAKES
    if not args.reprocess:
        if not args.no_build:
            build()
        demo_status_bar()
        for name in takes:
            print(name)
            record(name)
        adb("shell", "am", "broadcast", "-a", "com.android.systemui.demo", "-e", "command", "exit")
    for name in takes:
        finalize(name, out_dir)


if __name__ == "__main__":
    main()
