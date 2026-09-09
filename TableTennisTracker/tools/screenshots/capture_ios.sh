#!/usr/bin/env bash
#
# Captures the App Store screenshots for one iOS device family, in every app language.
#
# The XCUITest writes PNGs into the simulator's shared-resources directory, which is a real path on
# this Mac; this script erases the simulator first so the seeded dataset cannot stack, pins the
# status bar to the 9:41 marketing state, runs the test, and copies the output into build/.
#
# Usage: tools/screenshots/capture_ios.sh iphone|ipad
set -euo pipefail

DEVICE="${1:-iphone}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

case "$DEVICE" in
	iphone) SIM_NAME="iPhone 17 Pro Max"; RUNTIME_HINT="26-5" ;;
	ipad)   SIM_NAME="iPad Pro 13-inch (M5)"; RUNTIME_HINT="26-5" ;;
	*) echo "usage: $0 iphone|ipad" >&2; exit 2 ;;
esac

# Address the simulator by UDID, never by name: several runtimes ship a device with the same name,
# and the status-bar override below applies to one specific booted device.
UDID="$(xcrun simctl list devices available --json | python3 -c "
import json, sys
devices = json.load(sys.stdin)['devices']
name, hint = sys.argv[1], sys.argv[2]
matches = [d['udid'] for runtime, ds in devices.items() if hint in runtime for d in ds if d['name'] == name]
if not matches:
    sys.exit(f'no simulator named {name!r} on a {hint} runtime')
print(matches[0])
" "$SIM_NAME" "$RUNTIME_HINT")"

echo "==> $SIM_NAME ($UDID)"

xcrun simctl boot "$UDID" 2>/dev/null || true
xcrun simctl bootstatus "$UDID" -b

# Uninstall rather than `simctl erase`. Both clear the app's database — which is what keeps a second
# run from stacking a duplicate roster — but erasing also resets the device to first-boot state, and
# a first-boot simulator pushes system notifications ("Ready for Apple Intelligence") that slide over
# the app and get captured with it.
xcrun simctl uninstall "$UDID" xyz.tleskiv.tt 2>/dev/null || true

xcrun simctl status_bar "$UDID" override \
	--time "9:41" \
	--dataNetwork wifi \
	--wifiMode active --wifiBars 3 \
	--cellularMode active --cellularBars 4 \
	--operatorName "" \
	--batteryState charged --batteryLevel 100

if ! xcrun simctl status_bar "$UDID" list | grep -q .; then
	echo "status bar override did not take — screenshots would show the real clock" >&2
	exit 1
fi

# The Kotlin/Native framework is the slow half of the build. Linking it first means a failure there
# is reported as itself rather than as an opaque "module 'Shared' not found" from xcodebuild.
./gradlew :core:linkDebugFrameworkIosSimulatorArm64

# No -derivedDataPath: a fresh one forces a full Kotlin/Native link and Swift rebuild for each
# device family. -parallel-testing-enabled NO keeps the run off a simulator clone, whose PNGs would
# land under a different UDID than the one this script copies from.
# TEST_RUNNER_-prefixed variables reach the test runner process with the prefix stripped, which is
# how SCREENSHOT_LOCALES gets in. Narrow a run with: SCREENSHOT_LOCALES=de,ja tools/…/capture_ios.sh
export TEST_RUNNER_SCREENSHOT_LOCALES="${SCREENSHOT_LOCALES:-}"

# xcodebuild refuses to overwrite an existing result bundle.
rm -rf "build/screenshots/ios-$DEVICE.xcresult"

set +e
xcodebuild test \
	-project iosApp/iosApp.xcodeproj \
	-scheme iosApp \
	-configuration Debug \
	-destination "platform=iOS Simulator,id=$UDID" \
	-only-testing:iosAppUITests/AppStoreScreenshotTests \
	-resultBundlePath "build/screenshots/ios-$DEVICE.xcresult" \
	-parallel-testing-enabled NO \
	CODE_SIGNING_ALLOWED=NO
STATUS=$?
set -e

xcrun simctl status_bar "$UDID" clear

SOURCE="$HOME/Library/Developer/CoreSimulator/Devices/$UDID/data/Library/Caches/tt-screenshots"
if [ ! -d "$SOURCE" ]; then
	echo "no screenshots at $SOURCE" >&2
	exit 1
fi

# --delete only on a full run. A narrowed run (SCREENSHOT_LOCALES) captures a subset, and deleting
# would take the languages it did not capture with it.
mkdir -p "build/screenshots/$DEVICE"
if [ -z "${SCREENSHOT_LOCALES:-}" ]; then
	rsync -a --delete "$SOURCE/$DEVICE/" "build/screenshots/$DEVICE/"
else
	rsync -a "$SOURCE/$DEVICE/" "build/screenshots/$DEVICE/"
fi
echo "==> $(find "build/screenshots/$DEVICE" -name '*.png' | wc -l | tr -d ' ') PNGs in build/screenshots/$DEVICE"
exit "$STATUS"
