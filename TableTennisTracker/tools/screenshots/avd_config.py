#!/usr/bin/env python3
"""Retune a freshly created AVD's config.ini for screenshot capture.

The stock Pixel 9 AVD on this machine is set up for correctness rather than rendering — software
GPU, 2 GB of RAM and 16-bit colour — which is slow enough to time the instrumentation test out and
can band the colours. The panel is also cut from 2424 to 2160 so the screenshots come out at Play's
maximum 2:1 ratio; see capture_android.sh for why.
"""

import pathlib
import sys

OVERRIDES = {
    "hw.lcd.height": "2160",
    "hw.lcd.width": "1080",
    "hw.lcd.density": "420",
    "hw.lcd.depth": "24",
    "hw.ramSize": "4096",
    "hw.gpu.enabled": "yes",
    "hw.gpu.mode": "host",
}


def main() -> int:
    config = pathlib.Path(sys.argv[1])
    lines, seen = [], set()
    for line in config.read_text().splitlines():
        key = line.split("=", 1)[0].strip()
        if key in OVERRIDES:
            lines.append(f"{key}={OVERRIDES[key]}")
            seen.add(key)
        else:
            lines.append(line)
    lines += [f"{key}={value}" for key, value in OVERRIDES.items() if key not in seen]
    config.write_text("\n".join(lines) + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
