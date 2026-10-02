#!/usr/bin/env python3
"""Record the raw screen clips the App Store preview is cut from.

    python3 capture_clips.py iphone            # every iPhone take -> ../public/clips/iphone/
    python3 capture_clips.py ipad              # every iPad take   -> ../public/clips/ipad/
    python3 capture_clips.py iphone log        # just one take
    python3 capture_clips.py iphone --no-build # reuse the last build-for-testing

A take is a UI test in `iosAppUITests/AppPreviewTakes.swift`. It seeds the showcase data and
relaunches off camera, then writes `ready` into a handshake directory and waits. This script starts
`simctl io recordVideo`, answers with `go`, and the test plays its script, logging the wall-clock
time and screen point of every tap and drag. The recording is trimmed to the `go` moment, re-encoded
to constant 30 fps, and the log is rebased onto clip time as `<take>.json` beside `<take>.mp4`.

Nothing here moves the Mac's mouse: XCTest drives the simulator directly, so the Mac stays usable
while takes record.
"""
import argparse, json, os, shutil, signal, subprocess, sys, time

import footage

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = os.path.abspath(os.path.join(HERE, "../../.."))
XCODEPROJ = os.path.join(PROJECT, "iosApp/iosApp.xcodeproj")
DERIVED = "/tmp/tt-preview-derived"
HANDSHAKE = "/tmp/tt-preview"

os.environ["DEVELOPER_DIR"] = "/Applications/Xcode.app/Contents/Developer"
# The Compile Kotlin Framework build phase runs Gradle, which needs a JDK on the PATH.
JDK = "/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
if os.path.isdir(JDK):
    os.environ["JAVA_HOME"] = JDK
    os.environ["PATH"] = f"{JDK}/bin:{os.environ['PATH']}"

DEVICES = {
    "iphone": {"udid": "BE825318-7870-4101-AA08-C1E0928114C3", "width": 1000},
    "ipad": {"udid": "A072A80E-3E5B-4C9F-ACA5-90A32ECBE732", "width": 1400},
}

# Take name -> (test method, appearance).
TAKES = {
    "browse": ("testBrowse", "light"),
    "log": ("testLog", "light"),
    "analytics": ("testAnalytics", "light"),
    "dark": ("testDark", "dark"),
}


def sh(*cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)


def simctl(*args):
    return sh("xcrun", "simctl", *args)


def build():
    print("building the app and its UI tests…")
    out = sh("xcodebuild", "-project", XCODEPROJ, "-scheme", "iosApp", "-derivedDataPath", DERIVED,
             "-destination", "generic/platform=iOS Simulator", "build-for-testing")
    if out.returncode:
        sys.exit(out.stdout[-4000:] + out.stderr[-2000:])


def prepare(udid):
    simctl("boot", udid)
    simctl("bootstatus", udid, "-b")
    simctl("status_bar", udid, "override", "--time", "9:41", "--batteryState", "charged",
           "--batteryLevel", "100", "--wifiBars", "3", "--cellularBars", "4", "--dataNetwork", "wifi")


def wait_for(path, proc, seconds):
    deadline = time.time() + seconds
    while not os.path.exists(path):
        if proc.poll() is not None:
            return False
        if time.time() > deadline:
            return False
        time.sleep(0.05)
    return True


def record(device, name, out_dir):
    spec = DEVICES[device]
    udid = spec["udid"]
    method, appearance = TAKES[name]
    simctl("ui", udid, "appearance", appearance)

    shake = os.path.join(HANDSHAKE, device, name)
    shutil.rmtree(shake, ignore_errors=True)
    os.makedirs(shake)
    log = open(os.path.join(shake, "xcodebuild.log"), "w")
    env = dict(os.environ, TEST_RUNNER_PREVIEW_DIR=shake)
    test = subprocess.Popen(
        ["xcodebuild", "-project", XCODEPROJ, "-scheme", "iosApp", "-derivedDataPath", DERIVED,
         "-destination", f"id={udid}", "test-without-building",
         f"-only-testing:iosAppUITests/AppPreviewTakes/{method}"],
        stdout=log, stderr=subprocess.STDOUT, env=env)

    if not wait_for(os.path.join(shake, "ready"), test, 600):
        test.kill()
        sys.exit(f"{name}: the take never got ready; see {shake}/xcodebuild.log")

    raw = os.path.join(shake, "raw.mp4")
    rec = subprocess.Popen(["xcrun", "simctl", "io", udid, "recordVideo", "--codec", "h264", "--force", raw],
                           stderr=subprocess.PIPE, text=True)
    for line in rec.stderr:
        if "Recording started" in line:
            break
    t0 = time.time()
    open(os.path.join(shake, "go"), "w").write(str(t0))

    finished = wait_for(os.path.join(shake, "events.json"), test, 300)
    time.sleep(0.3)
    rec.send_signal(signal.SIGINT)
    rec.wait(timeout=30)
    test.wait(timeout=120)
    log.close()
    if not finished:
        sys.exit(f"{name}: the take failed before finishing; see {shake}/xcodebuild.log")
    simctl("ui", udid, "appearance", "light")
    finalize(device, name, out_dir)


def finalize(device, name, out_dir):
    shake = os.path.join(HANDSHAKE, device, name)
    t0 = float(open(os.path.join(shake, "go")).read())
    meta = json.load(open(os.path.join(shake, "events.json")))
    events = [dict(e, t=e["t"] - t0) for e in meta["events"]]
    footage.cut(os.path.join(shake, "raw.mp4"), events, meta["end"] - t0, meta["points"], device, name, out_dir,
                DEVICES[device]["width"])


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("device", choices=sorted(DEVICES))
    ap.add_argument("takes", nargs="*", help=f"take names: {', '.join(TAKES)} (default: all)")
    ap.add_argument("--no-build", action="store_true", help="reuse the last build-for-testing")
    ap.add_argument("--reprocess", action="store_true",
                    help="re-encode the last recordings in /tmp/tt-preview without recording again")
    args = ap.parse_args()
    unknown = [t for t in args.takes if t not in TAKES]
    if unknown:
        ap.error(f"unknown takes: {', '.join(unknown)}")

    out_dir = os.path.join(HERE, "..", "public", "clips", args.device)
    os.makedirs(out_dir, exist_ok=True)
    if args.reprocess:
        for name in args.takes or list(TAKES):
            finalize(args.device, name, out_dir)
        return
    if not args.no_build:
        build()
    udid = DEVICES[args.device]["udid"]
    prepare(udid)
    for name in args.takes or list(TAKES):
        print(name)
        record(args.device, name, out_dir)


if __name__ == "__main__":
    main()
