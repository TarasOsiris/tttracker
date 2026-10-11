# Apple Health (iOS)

A training session can be linked to the Apple Health workout it was played in, usually one the user
recorded with the Workout app on Apple Watch. iOS only; Android stores the column but has no UI yet
(Health Connect has an equivalent table tennis exercise type, and the matching already lives in `:core`).

## What the user gets

| Where | What | Pro |
|---|---|---|
| Create Session | **Import from Apple Health**: pick one of the last 30 days' table tennis workouts; the form takes its day, its length (rounded to the slider's 5 minutes) and, when the user rated the workout on Apple Watch, its effort score as RPE. Saving links the workout. | Free |
| Session details | Unlinked: a same-day workout no other session has is offered as **Suggested**, and **Link a workout** opens the picker ranked for the session. | Free |
| Session details | Linked: workout time, length, active energy, and **Unlink workout**. | Free |
| Session details | Linked: average and max heart rate, and a minute-by-minute heart-rate chart. | Pro (blurred preview) |

## Where things live

| Layer | File |
|---|---|
| Link column | `training_session.health_workout_id` (migration `5.sqm`), synced as `healthWorkoutId` |
| Ranking and suggestion | `core/.../health/HealthWorkoutMatching.kt` |
| HealthKit | `iosApp/iosApp/Platform/Health/HealthStore.swift` |
| Picker | `iosApp/iosApp/Features/Health/HealthWorkoutPicker.swift` |
| Details section | `iosApp/iosApp/Features/Health/SessionHealthModel.swift`, `SessionHealthSection.swift` |

## Rules

- **Only the workout's UUID is stored.** Heart rate, energy and times are read from Health each time
  and never written to the database: the database syncs to iCloud, and App Review guideline 5.1.3
  forbids health data in iCloud. `HKWorkout.uuid` is the same on every device Health syncs the
  workout to, so a link made on the iPhone resolves on the iPad.
- **Nothing from Health goes to PostHog or Sentry.** The events are `health_workout_imported`,
  `health_workout_linked` (`via`: `suggestion` or `picker`) and `health_workout_unlinked`, with no values.
- **The permission sheet only follows a tap** on Import, Link a workout or Connect Apple Health.
  Opening a session's details never raises it: the suggestion is looked for only once the user has
  already been asked (`HealthStore.hasAskedForAccess`). A session linked on another device shows
  **Connect Apple Health** until this device has asked.
- **Health never says whether reading was denied.** A denied read looks like no workouts, so the
  empty picker points to Settings › Health. Since iOS 27 the user also chooses how far back to share;
  with "Past 30 Days" an older linked workout shows as not found.
- **A workout links to one session.** The picker and the suggestion leave out workouts other
  sessions have.
- Read-only: nothing is written to Health, so there is no `NSHealthUpdateUsageDescription`.

## Shipping it

`healthWorkoutId` is a new field on the `TrainingSession` record type, so the CloudKit schema has to
reach Production before a TestFlight build can sync it (see `docs/icloud-sync.md` → CloudKit schema).
The App ID needs the HealthKit capability; automatic signing adds it from `iosApp.entitlements`.
