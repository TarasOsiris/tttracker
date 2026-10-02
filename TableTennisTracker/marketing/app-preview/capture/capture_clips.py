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

    shake = os.path.join(HANDSHAKE, name)
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


# XCTest waits for the app to idle around every gesture, which leaves seconds of still screen between
# actions. Any still stretch longer than HOLD is shortened to it; the opening one is kept whole.
HOLD = 0.55
TAIL = 1.0
# Mean absolute change, out of 255, below which a frame counts as still: a blinking caret or a
# fading scroll indicator, not something the viewer should wait for.
STILL = 0.35
PROBE = (90, 196)


def change_times(raw):
    """The times of the frames that visibly change the screen.

    simctl writes a frame whenever any pixel changes, a caret blink included, so its frame times
    alone would leave no still stretch to squeeze. Frames are compared, small and grey, against the
    last frame that counted.
    """
    w, h = PROBE
    listing = sh("ffprobe", "-v", "error", "-fflags", "+igndts", "-select_streams", "v",
                 "-show_entries", "frame=best_effort_timestamp_time", "-of", "csv=p=0", raw).stdout
    times = [float(v.strip(",")) for v in listing.split()]
    pixels = subprocess.run(["ffmpeg", "-v", "error", "-fflags", "+igndts", "-i", raw, "-fps_mode", "passthrough",
                             "-vf", f"scale={w}:{h}", "-f", "rawvideo", "-pix_fmt", "gray", "-"],
                            capture_output=True).stdout
    size = w * h
    frames = [pixels[i:i + size] for i in range(0, len(pixels) - size + 1, size)]
    kept, last = [], None
    for t, frame in zip(times, frames):
        if last is None or sum(abs(a - b) for a, b in zip(frame, last)) / size > STILL:
            kept.append(t)
            last = frame
    return kept


def squeeze(changes, end):
    """Squeezes every still stretch after the first down to HOLD.

    A stretch keeps its first and last HOLD/2 — the last holds the moment a finger lands, just before
    the app reacts — and time stands still across its middle. Returns the time map as a function and
    as an ffmpeg expression of T, and the squeezed length.
    """
    gaps = [(a, b) for a, b in zip(changes[1:], changes[2:]) if b - a > HOLD]
    tail = max(0.0, end - changes[-1] - TAIL) if len(changes) > 1 else 0.0

    def removed(t):
        return sum(min(max(t - a - HOLD / 2, 0.0), (b - a) - HOLD) for a, b in gaps)

    expression = "+".join(f"clip(T-{a + HOLD / 2:.4f},0,{(b - a) - HOLD:.4f})" for a, b in gaps) or "0"
    return (lambda t: t - removed(t)), expression, end - removed(end) - tail


def finalize(device, name, out_dir):
    spec = DEVICES[device]
    shake = os.path.join(HANDSHAKE, name)
    raw = os.path.join(shake, "raw.mp4")
    t0 = float(open(os.path.join(shake, "go")).read())
    meta = json.load(open(os.path.join(shake, "events.json")))
    end = meta["end"] - t0

    # A gesture counts as a change too, even when what it changes is too small to measure — a
    # stepper's digit — so taps keep their own beat instead of collapsing onto one moment.
    gestures = [e["t"] - t0 for e in meta["events"]]
    changes = sorted({t for t in change_times(raw) + gestures if t <= end})
    to_new, shift, length = squeeze(changes, end)

    events = []
    for e in meta["events"]:
        e = dict(e, t=round(to_new(e["t"] - t0), 3))
        events.append({k: (round(v, 1) if isinstance(v, float) and k != "t" else v) for k, v in e.items()})

    # simctl's decode timestamps run seconds ahead of the presentation ones, and ffmpeg times some
    # frames by them unless told not to, which pulls later moments of the take seconds early. Then
    # the squeeze, constant 30 fps, the take's own end, and the width the composition shows.
    path = os.path.join(out_dir, f"{name}.mp4")
    out = sh("ffmpeg", "-v", "error", "-y", "-fflags", "+igndts", "-i", raw,
             "-vf", f"setpts='(T-({shift}))/TB',fps=30,scale={spec['width']}:-2:flags=lanczos",
             "-t", f"{length:.2f}", "-c:v", "libx264", "-crf", "14", "-preset", "slow", "-pix_fmt", "yuv420p",
             "-an", path)
    if out.returncode:
        sys.exit(out.stderr)
    with open(os.path.join(out_dir, f"{name}.json"), "w") as fh:
        json.dump({"device": device, "points": meta["points"], "duration": round(length, 3), "events": events},
                  fh, indent=2)
    print(f"  {name}: {end:.1f}s squeezed to {length:.1f}s, {len(events)} events")


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
