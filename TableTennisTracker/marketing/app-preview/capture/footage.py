"""Turns a raw screen recording and its gesture log into a clip the composition can cut.

Shared by `capture_clips.py` (iOS, `simctl`) and `capture_android.py` (`screenrecord`). Both
recorders write a frame only when the screen changes, so the gaps between frames are still screen.
"""
import json, os, subprocess, sys

# The test frameworks wait for the app to idle around every gesture, which leaves seconds of still
# screen between actions. Any still stretch longer than HOLD is shortened to it; the opening one is
# kept whole, since the night beat plays against it.
HOLD = 0.55
TAIL = 1.0
# Mean absolute change, out of 255, below which a frame counts as still: a blinking caret or a
# fading scroll indicator, not something the viewer should wait for.
STILL = 0.35
PROBE = (90, 196)


def sh(*cmd):
    return subprocess.run(cmd, capture_output=True, text=True)


def change_times(raw):
    """The times of the frames that visibly change the screen.

    A recorder writes a frame whenever any pixel changes, a caret blink included, so its frame times
    alone would leave no still stretch to squeeze. Frames are compared, small and grey, against the
    last frame that counted. `+igndts` throughout: simctl's decode timestamps run seconds ahead of
    the presentation ones, and ffmpeg times some frames by them unless told not to.
    """
    w, h = PROBE
    listing = sh("ffprobe", "-v", "error", "-fflags", "+igndts", "-select_streams", "v",
                 "-show_entries", "frame=best_effort_timestamp_time", "-of", "csv=p=0", raw).stdout
    times = [float(v.strip(",")) for v in listing.split() if v.strip(",")]
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


def cut(raw, events, end, points, device, name, out_dir, width, changes=None):
    """Writes `<name>.mp4` and `<name>.json` from a recording whose event times are recording time.

    A gesture counts as a change too, even when what it changes is too small to measure — a stepper's
    digit — so taps keep their own beat instead of collapsing onto one moment.
    """
    changes = changes if changes is not None else change_times(raw)
    changes = sorted({t for t in changes + [e["t"] for e in events] if 0 <= t <= end})
    to_new, shift, length = squeeze(changes, end)

    remapped = []
    for e in events:
        e = dict(e, t=round(to_new(e["t"]), 3))
        remapped.append({k: (round(v, 1) if isinstance(v, float) and k != "t" else v) for k, v in e.items()})

    path = os.path.join(out_dir, f"{name}.mp4")
    out = sh("ffmpeg", "-v", "error", "-y", "-fflags", "+igndts", "-i", raw,
             "-vf", f"setpts='(T-({shift}))/TB',fps=30,scale={width}:-2:flags=lanczos",
             "-t", f"{length:.2f}", "-c:v", "libx264", "-crf", "14", "-preset", "slow", "-pix_fmt", "yuv420p",
             "-an", path)
    if out.returncode:
        sys.exit(out.stderr)
    with open(os.path.join(out_dir, f"{name}.json"), "w") as fh:
        json.dump({"device": device, "points": points, "duration": round(length, 3), "events": remapped}, fh, indent=2)
    print(f"  {name}: {end:.1f}s squeezed to {length:.1f}s, {len(remapped)} events")
