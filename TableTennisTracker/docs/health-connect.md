# Health Connect (Android)

The Android side of [Apple Health](apple-health.md): a training session can be linked to the Health
Connect exercise session it was played in, recorded by whatever watch or fitness app the user has
(Samsung Health, Fitbit, Google Fit, Garmin…). The link is the same `training_session.health_workout_id`
column, and the ranking and suggestion the same `HealthWorkoutMatching` in `:core`.

## What the user gets

| Where | What | Pro |
|---|---|---|
| Create Session | **Import from Health Connect**: pick one of the last 30 days' table tennis workouts; the form takes its day and its length (rounded to 5 minutes). Saving links it. | Free |
| Session details | Unlinked: a same-day workout no other session has is offered as **Suggested**; **Link a workout** opens the picker ranked for the session. | Free |
| Session details | Linked: workout time, length, active energy, the recording app, and **Unlink workout**. | Free |
| Session details | Linked: average and max heart rate and a minute-by-minute chart. | Pro (blurred preview) |

Health Connect has no effort score, so unlike iOS the RPE is not pre-filled.

## Where things live

| Layer | File |
|---|---|
| Interface (iOS binds `UnavailableHealthDataSource`) | `core/.../di/components/HealthDataSource.kt` |
| Models | `core/.../health/HealthWorkout.kt` |
| ViewModels | `core/.../viewmodel/health/`, `CreateSessionScreenViewModel` |
| Health Connect | `androidApp/.../di/components/HealthConnectDataSource.kt` |
| Picker, import field, details section | `ui/dialogs/HealthWorkoutPickerDialog.kt`, `ui/widgets/fields/HealthImportField.kt`, `ui/health/` |
| Privacy-policy link Health Connect opens | `health/HealthPermissionsRationaleActivity.kt` + the manifest's activity-alias |

## Rules

- **Read-only, three permissions**: `READ_EXERCISE`, `READ_HEART_RATE`, `READ_ACTIVE_CALORIES_BURNED`.
  `HealthConnectDataSource.READ_PERMISSIONS` and the manifest must list the same ones.
- **Only the workout's id is stored**, and nothing read from Health Connect goes to PostHog or Sentry;
  the events are the iOS ones (`health_workout_imported`, `health_workout_linked`, `health_workout_unlinked`).
- **The permission request only follows a tap** — Import, Link a workout, or Allow Health Connect
  access on a linked session. Opening a session's details never raises it.
- **Availability**: Health Connect is built into Android 14+, and an app from Play on Android 9–13.
  The library needs API 26 (the app supports 24, hence `tools:overrideLibrary`); below that, or with
  Health Connect missing, every health surface is hidden.
- **Active energy** is summed from the records the app that recorded the workout wrote over its span.
  Health Connect's own aggregate counts only apps on the user's data-source priority list and is
  often empty; summing every app's records would count a watch and a phone twice. The aggregate is
  only the fallback.
- **History**: a read grant covers data from 30 days before it was first given, and everything after.

## Shipping it

Google Play requires the **Health apps declaration** in Play Console (App content → Health apps)
for any app requesting Health Connect permissions, with a justification per permission, and the
privacy policy at `https://ttapp.smashyapps.com/privacy` must describe the health data the app
reads. Play rejects the release until both are in place.
