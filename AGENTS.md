# AGENTS.md

The app lives in `TableTennisTracker/`: read and follow [TableTennisTracker/AGENTS.md](TableTennisTracker/AGENTS.md) for its architecture, checks and workflow. The website is in `website/`.

## Commit messages: say how to test

Testers read every commit in the Smashy Control app log (admin.smashyapps.com), which turns this
section into a testing guide. So every commit that changes what someone can see or do in the app
ends its message, before any `Co-Authored-By:` trailer, with:

```
How to test:
Where: iOS › Settings › Subscription › Restore Purchases
Setup: a sandbox account that bought Pro before
1. Open the app signed in with that account and go to Settings.
2. Tap Restore Purchases.
Expect: Pro unlocks within a few seconds and the paywall no longer appears.
```

- Write for someone who has never seen the code: name screens, tabs and buttons exactly as they
  appear in the app (English UI), starting from launching the app.
- `Where:` is the path to the screen: platform › screen › control. Add one `Where:` line per
  platform when the path differs (iOS, Mac, Android, Windows, website).
- `Setup:` (optional) is anything needed first: an account state, a subscription, sample data, a
  setting, a device, a language.
- 1–6 numbered steps, then one or more `Expect:` lines with what should happen when it works.
  Include the edge case the change is about.
- Nothing a person can check (refactor, tests, docs, tooling, CI, store metadata): one line,
  `How to test: nothing to test — <reason>`.
