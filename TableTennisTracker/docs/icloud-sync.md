# iCloud sync (iOS, Pro)

Sessions, matches and opponents sync between a user's devices through their **private** CloudKit
database, with `CKSyncEngine`. iOS only; Android neither syncs nor installs the change tracking.

## Who gets it

- **Debug and TestFlight builds only.** `SandboxDistribution.isActive` reads the receipt (a
  TestFlight build is the binary later promoted to the App Store, so no compile-time flag can tell
  them apart). An App Store install shows no Pro UI and never touches CloudKit.
- **Never in a build sent to App Review.** A reviewer's install has a sandbox receipt too, so a
  Release build also needs the `SANDBOX_FEATURES` build setting (`YES` in `Config.xcconfig`).
  `/ship` archives a build headed for review with `SANDBOX_FEATURES=NO`; an upload-only build keeps
  it for TestFlight testers and must not be submitted later.
- **Pro owners only.** `ProModel` is the one reader of RevenueCat; `CloudSyncModel` runs the engine
  only while `isPro`. Losing Pro pauses the engine but keeps the switch on, because `false` is also
  what RevenueCat reports before it answers.

The App Store screenshot run passes `-hidesSandboxFeatures` so its Debug build looks like the App
Store one.

## Where things live

| Layer | File |
|---|---|
| Change tracking (triggers, iOS only) | `core/.../db/CloudSyncTracking.kt` |
| Outbox, change tags, merge rule | `core/.../repo/impl/CloudSyncRepositoryImpl.kt` |
| Swift boundary | `core/src/iosMain/.../sync/CloudSync.kt` |
| CloudKit | `iosApp/iosApp/Platform/CloudSync/CloudSyncEngine.swift` |
| Switch, status, gating | `iosApp/iosApp/App/CloudSyncModel.swift` |
| Settings section | `iosApp/iosApp/Features/Settings/CloudSyncSection.swift` |
| CloudKit schema (source of truth) | `iosApp/CloudKit/Schema.ckdb` |

Every synced row is one CloudKit record in the `Training` zone of `iCloud.xyz.tleskiv.tt`, named by
its UUID (hex). Record types: `TrainingSession`, `Opponent`, `Match`. Each record also carries
`modifiedAt` (the row's `updated_at`) and `isDeleted`.

## Conflict resolution

Every record is merged on its own, and the merge is a **join**: a pure function of the two versions,
so devices converge to the same state whatever order they see changes in, and seeing a change twice
changes nothing. Versions are ordered by:

1. **Deleted beats live**, whatever the timestamps. The app never undeletes, and a remote edit
   reviving a row whose children were cascaded away would leave orphans behind.
2. **Later `updated_at` wins.**
3. **Same millisecond:** the greater content (a canonical string of the known fields) wins. Rare,
   but it has to be decided the same way everywhere.

The loser is overwritten: a remote winner is written to the row, a local winner is queued to
overwrite iCloud's copy. `CKSyncEngine` sends saves against the change tag last seen, so a save made
on stale information is refused with the server's copy, merged by the same rule, and sent again if
the local version still wins.

Three things in the app keep that rule honest:

- **Writes that change nothing are skipped.** The update queries compare before they write, so
  re-saving an unchanged form does not restamp a row and outrank a real edit made elsewhere.
- **`updated_at` never moves backwards.** A local edit stamps `max(now, previous + 1)`, so an edit
  made after seeing another device's version wins over it even when this device's clock is behind.
  Wall clocks still decide between two *concurrent* edits; that is the accepted cost of
  last-writer-wins.
- **Matches are edited in place.** Saving a session updates its matches by id rather than deleting
  and reinserting them; with fresh ids every save, two devices editing one session would end up
  with two copies of every match.

Cross-record rules:

- **Deletion cascades again after every merge.** A match added on one device while another deleted
  its session or opponent arrives live under a deleted parent; it is deleted locally as an ordinary
  edit, so every device deletes it and the tombstones converge.
- **Out-of-order arrival is harmless.** Foreign keys are not enforced, so a match can land before
  its session or opponent; the joins hide it until they arrive.
- **Two devices creating "the same" opponent create two opponents.** They have different ids; there
  is no merge by name.

## Deletions

Deletions go to iCloud as **tombstones**: a save with `isDeleted = 1` and every other field cleared,
so a deleted row's text does not stay in iCloud. Records are never deleted from CloudKit, so a
device that still holds an old copy cannot bring one back. Soft deletes are ordinary updates;
hard deletes (the Debug screen's wipe) are queued as bare tombstones, and stay queued while sync is
off once it has ever been on.

## Turning it on and off

- **On** queues every row, deleted ones included. Rows iCloud already has come back as conflicts and
  are merged by the rule above, so enabling on a device with older copies does not overwrite newer
  edits.
- **Off** forgets the queue (except hard deletes) and every change tag, and deletes the engine state.
- **Deleting the app's data in iCloud settings** turns sync off on every device; nothing local is
  removed.
- **A different Apple ID** turns sync off too, before anything is sent. The engine remembers the
  user record it synced with; this device's rows include the previous account's training, so they
  go to the new account only once the user turns sync on again.
- Neither automatic turn-off is reported as the user's `icloud_sync_disabled`.

## CloudKit schema

TestFlight uses the **Production** environment, which never creates schema on the fly: a save naming
a missing record type or field fails and sync uploads nothing. A new synced field goes into
`Schema.ckdb` as well as `CloudSyncRepositoryImpl`, then:

```bash
xcrun cktool import-schema --team-id XW3GM347XY --container-id iCloud.xyz.tleskiv.tt \
  --environment development --file iosApp/CloudKit/Schema.ckdb
```

and CloudKit Console → **Deploy Schema Changes…** to Production (additive only, irreversible).
`python3 tools/check_cloudkit_schema.py` checks Production and `/ship` runs it before archiving.
Both need a management token saved once per Mac: `xcrun cktool save-token --type management`.
