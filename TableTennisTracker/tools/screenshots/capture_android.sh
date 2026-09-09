#!/usr/bin/env bash
#
# Captures the Play Store screenshots in every app language, on an emulator sized to the store's
# limits rather than to a real Pixel.
#
# Play rejects a phone screenshot whose longest side is more than twice its shortest, so the
# Pixel 9's native 1080x2424 (ratio 2.24) is out. This uses a dedicated AVD with the Pixel 9's
# 420dpi — a 411x823dp viewport, close to what users actually see — cut to 1080x2160 (ratio 2.0).
#
# Usage: tools/screenshots/capture_android.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

export ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
AVD_NAME="TT_Shots_1080x2160"
SYSTEM_IMAGE="system-images;android-36;google_apis_playstore;arm64-v8a"
ADB="$ANDROID_HOME/platform-tools/adb"
EMULATOR="$ANDROID_HOME/emulator/emulator"
AVD_DIR="$ANDROID_HOME/.android/avd/$AVD_NAME.avd"

if ! "$EMULATOR" -list-avds | grep -qx "$AVD_NAME"; then
	echo "==> creating $AVD_NAME"
	"$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager" create avd \
		-n "$AVD_NAME" -k "$SYSTEM_IMAGE" -d pixel_9 --abi arm64-v8a -c 512M -f

	# The stock Pixel_9 AVD on this machine is tuned for correctness, not rendering: software GPU,
	# 2G RAM and 16-bit colour, which is slow enough to time the test out and can band the colours.
	python3 "$(dirname "${BASH_SOURCE[0]}")/avd_config.py" "$AVD_DIR/config.ini"
fi

if ! "$ADB" devices | grep -q "emulator-.*device$"; then
	echo "==> booting $AVD_NAME"
	"$EMULATOR" -avd "$AVD_NAME" -gpu host -memory 4096 -no-boot-anim -no-snapshot >/dev/null 2>&1 &
	"$ADB" wait-for-device
fi

# Poll from the host rather than looping inside `adb shell`: right after wait-for-device the daemon
# will still refuse a shell for a few seconds, and under `set -e` that one non-zero exit killed the
# whole run.
for _ in $(seq 1 180); do
	[ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ] && break
	sleep 2
done
if [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" != "1" ]; then
	echo "emulator never finished booting" >&2
	exit 1
fi

# A wrong-sized emulator must fail here, not at upload time.
SIZE="$("$ADB" shell wm size | tr -d '\r' | awk '{print $NF}')"
if [ "$SIZE" != "1080x2160" ]; then
	echo "emulator is $SIZE, expected 1080x2160 — wrong AVD is booted" >&2
	exit 1
fi

echo "==> status bar demo mode"
"$ADB" shell settings put global sysui_demo_allowed 1
demo() { "$ADB" shell am broadcast -a com.android.systemui.demo "$@" >/dev/null; }
demo -e command enter
demo -e command clock -e hhmm 0941
demo -e command battery -e plugged false -e level 100
# `fully true` clears the "no internet" badge on the wifi glyph, and hiding the mobile radio keeps
# a stray "3G" out of the shot — a store screenshot should not look like a bad connection.
demo -e command network -e wifi show -e level 4
demo -e command network -e mobile hide
demo -e command network -e fully true
demo -e command notifications -e visible false
demo -e command status -e volume hide -e bluetooth hide -e location hide -e alarm hide -e sync hide

"$ADB" shell rm -rf /sdcard/googletest/test_outputfiles || true

set +e
./gradlew :androidApp:connectedDebugAndroidTest \
	-Pandroid.testInstrumentationRunnerArguments.class=xyz.tleskiv.tt.StoreScreenshotTest
STATUS=$?
set -e

demo -e command exit
"$ADB" shell settings put global sysui_demo_allowed 0

mkdir -p build/screenshots
if ! "$ADB" shell ls /sdcard/googletest/test_outputfiles/android >/dev/null 2>&1; then
	echo "no screenshots on the device" >&2
	exit 1
fi

rm -rf build/screenshots/android
"$ADB" pull /sdcard/googletest/test_outputfiles/android build/screenshots/android >/dev/null
echo "==> $(find build/screenshots/android -name '*.png' | wc -l | tr -d ' ') PNGs in build/screenshots/android"
exit "$STATUS"
