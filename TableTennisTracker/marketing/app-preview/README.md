# App previews

The motion preview videos for the stores, made from real screen recordings of the app, laid out in
the app's palette and fonts with [Remotion](https://www.remotion.dev), the same way as the other
apps' previews:

- **App Store:** an iPhone cut (886×1920, the 6.9"/6.5" slot) and an iPad cut (1200×1600, the 13"
  slot), each 30 fps, under 30 s, H.264 with a stereo AAC track.
- **Google Play:** a landscape Android cut (1920×1080, 30 fps), the phone beside its captions. Play
  takes its promo video as a YouTube link, so this one is uploaded to YouTube rather than to Play.

```bash
npm install
npm run capture:iphone   # record the takes on the iPhone 17 Pro Max simulator -> public/clips/iphone
npm run capture:ipad     # ...and on the iPad Pro 13" -> public/clips/ipad
npm run capture:android  # ...and on the running Android emulator -> public/clips/android
npm run audio            # synthesize the music bed and UI sounds -> public/audio
npm run studio           # preview and scrub in the browser
npm run render           # -> out/app-preview-iphone.mp4, out/app-preview-ipad.mp4, out/promo-android.mp4
```

Clips, audio and renders are generated, and all three folders are gitignored. The committed part
is the source that produces them.

| Path | What it is |
|---|---|
| `../../iosApp/iosAppUITests/AppPreviewTakes.swift` | The takes: one UI test each, seeding the showcase data off camera and logging every tap and drag |
| `../../androidApp/src/androidTest/.../AppPreviewTakes.kt` | The Android takes, one instrumentation run each, injecting real-time touches and logging them |
| `capture/capture_clips.py` | Builds the UI tests, runs each iOS take while `simctl` records, and writes `<take>.mp4` + `<take>.json` |
| `capture/capture_android.py` | Installs the app and its tests, runs each Android take while `screenrecord` films, and does the same |
| `capture/footage.py` | Shared by both: finds the visible changes, squeezes still screen out, re-encodes, and remaps the log |
| `capture/make_audio.py` | The music bed and one-shot sounds, synthesized with the standard library only |
| `capture/finalize.sh` | Re-encodes a render to Apple's preview spec (limited-range yuv420p, ~11 Mbps, AAC 256k) |
| `src/storyboard.ts` | The edit: which slice of which take plays under each caption, at what speed and zoom |
| `src/Preview.tsx` | The composition: intro lockup, device, captions, the win's confetti and the day/night reveal |

## Recording

The takes are XCUITests, not mouse events, so the Mac stays usable while they record. Each one
seeds the showcase data through Settings → Debug, relaunches, and writes `ready` to a handshake
directory; `capture_clips.py` starts `simctl io recordVideo` and answers `go`, and the take plays.
The tests skip unless `PREVIEW_DIR` is set, so an ordinary UI test run is unaffected.

The takes log each gesture's wall-clock time and screen point. XCTest returns from a gesture only
once the app has idled, so the logged time is the end of the call less the gesture and a measured
0.24 s. The composition draws its touch dots and places its click sounds from that log, and
`src/storyboard.ts` finds its beat boundaries from the log — a take's first gesture, the typing, the
last two saves — so a re-recorded take re-times itself, on either platform. If a take's script
changes shape, check the comment above `beats` there.

`simctl` writes a frame only when the screen changes, with decode timestamps seconds ahead of the
presentation ones. `capture_clips.py` re-encodes with `-fflags +igndts`; without it ffmpeg pulls the
later half of a take seconds early, out of step with its log.

## Recording on Android

Each take is `AppPreviewTakes.kt`, run by `am instrument` with a `previewTake` argument; without it
the test skips. It seeds the showcase data and sets the theme through `:core` directly, as the store
screenshot test does, then writes `ready` to its external files directory and waits for
`/data/local/tmp/tt-preview-go`. Touches are injected in real time through
`Instrumentation.sendPointerSync`, at each node's position on screen, so the match dialog and its
suggestion menu (windows of their own) are hit too. An injected touch may not land on another app's
window, so the take closes the keyboard before tapping anything it covers.

`screenrecord` does not report when it starts filming. `capture_android.py` knows only the bound
(it launched the recorder, then wrote `go`), and places the log by fitting each gesture to the start
of the burst of screen change it causes. The status bar is put in demo mode — 9:41, full battery and
Wi-Fi, no mobile data — and restored afterwards.

## Uploading

App Store Connect ▸ the version ▸ Previews and Screenshots: add `app-preview-iphone.mp4` to the
6.9" iPhone set and `app-preview-ipad.mp4` to the 13" iPad set. Pick the poster frame there; a
frame from the "Track every match and score" beat reads best.

For Google Play, upload `promo-android.mp4` to YouTube (public or unlisted, ads off), then paste its
link into Play Console ▸ Grow ▸ Store presence ▸ Main store listing ▸ Video.
