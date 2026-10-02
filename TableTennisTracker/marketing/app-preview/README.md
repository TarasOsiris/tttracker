# App Store app preview

The motion preview video for the App Store: an iPhone cut (886×1920, the 6.9"/6.5" slot) and an
iPad cut (1200×1600, the 13" slot). Each is 30 fps, under 30 s, H.264 with a stereo AAC track. It
is made from real screen recordings of the app, laid out in the app's palette and fonts with
[Remotion](https://www.remotion.dev), the same way as the other apps' previews.

```bash
npm install
npm run capture:iphone   # record the takes on the iPhone 17 Pro Max simulator -> public/clips/iphone
npm run capture:ipad     # ...and on the iPad Pro 13" -> public/clips/ipad
npm run audio            # synthesize the music bed and UI sounds -> public/audio
npm run studio           # preview and scrub in the browser
npm run render           # -> out/app-preview-iphone.mp4, out/app-preview-ipad.mp4
```

Clips, audio and renders are generated, and all three folders are gitignored. The committed part
is the source that produces them.

| Path | What it is |
|---|---|
| `../../iosApp/iosAppUITests/AppPreviewTakes.swift` | The takes: one UI test each, seeding the showcase data off camera and logging every tap and drag |
| `capture/capture_clips.py` | Builds the UI tests, runs each take while `simctl` records, and writes `<take>.mp4` + `<take>.json` |
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
`src/storyboard.ts` finds its beat boundaries by event index, so a re-recorded take re-times itself.
If a take gains or loses a gesture, update the indices there.

`simctl` writes a frame only when the screen changes, with decode timestamps seconds ahead of the
presentation ones. `capture_clips.py` re-encodes with `-fflags +igndts`; without it ffmpeg pulls the
later half of a take seconds early, out of step with its log.

## Uploading

App Store Connect ▸ the version ▸ Previews and Screenshots: add `app-preview-iphone.mp4` to the
6.9" iPhone set and `app-preview-ipad.mp4` to the 13" iPad set. Pick the poster frame there; a
frame from the "Track every match and score" beat reads best.
