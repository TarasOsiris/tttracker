# AGENTS.md

This file gives concise, project-specific instructions for AI agents working in this repo.

## Project overview

Table Tennis Tracker is a Kotlin Multiplatform app targeting Android, iOS and a Ktor server.
Each app has a native UI — Jetpack Compose on Android, SwiftUI on iOS — over shared Kotlin business
logic in `core`; shared domain models live in `shared`.

## Repository map

- `androidApp/` Android application (`TTApplication.kt`, `MainActivity`)
  - `androidApp/src/main/kotlin/xyz/tleskiv/tt/ui` Jetpack Compose UI
  - `androidApp/src/main/res` strings (14 locales), drawables, fonts
- `core/` Business logic, ViewModels and DI (KMP: Android + iOS); produces `Shared.framework`
- `iosApp/` Xcode project and SwiftUI app
- `server/` Ktor backend (JVM)
- `shared/` Shared models (KMP, Kotlinx serialization)
- `docs/` Additional functional documentation

## Build and run

Android:
- `./gradlew :androidApp:assembleDebug`
- `./gradlew :androidApp:installDebug`

Server:
- `./gradlew :server:run` (port 8080)
- `./gradlew :server:buildFatJar`

iOS:
- Open `iosApp/` in Xcode and run from there

Tests:
- `./gradlew test`
- `./gradlew :server:test`
- `./gradlew :androidApp:testDebugUnitTest`
- `./gradlew :androidApp:connectedDebugAndroidTest` (needs a device)

## Architecture and conventions

### Android app (MVVM + Clean Architecture)

Layering:
```
UI Layer (Screens) → ViewModel Layer → Service Layer → Repository Layer → Database
```

ViewModel pattern:
- Abstract interface class extends `ViewModelBase` (extends `androidx.lifecycle.ViewModel`)
- Concrete implementation class `XxxViewModelImpl`
- State via immutable `StateFlow`, internal `MutableStateFlow`
- Koin registration: `viewModelOf(::Impl) bind Interface::class`
- Route params via `koinViewModel { parametersOf(args) }`

Services:
- Interface + implementation
- Business logic and data transforms
- Registered in Koin: `singleOf(::Impl) bind Interface::class`

Repositories:
- Interface + implementation
- SQLDelight queries
- Use `withContext(ioDispatcher)` for suspend IO

### Dependency injection (Koin)

- Compose: `koin-compose`, `koin-compose-viewmodel`
- Server: `koin-ktor`, modules in `server/src/main/kotlin/.../Application.kt`
- Android: initialized in `androidApp/src/.../TTApplication.kt`

### Navigation

Navigation 3 (`androidx.navigation3`) with typed routes in `androidApp/src/main/kotlin/xyz/tleskiv/tt/ui/nav/routes/`.
Top-level tabs use `TopLevelBackStack`; modal routes for create/details.

### Database (SQLDelight)

- Server schema: `server/src/main/sqldelight/xyz/tleskiv/tt/db/ServerDatabase.sq`
- Server setup: `server/src/main/kotlin/xyz/tleskiv/tt/db/DatabaseFactory.kt`
- Client drivers: Android, iOS native

### Gradle + versions

Dependencies are managed in `gradle/libs.versions.toml`.

## Code style and correctness rules

- Do not add comments unless absolutely necessary.
- Prefer a single line for code under 120 characters.
- For time: use `kotlin.time.Clock`.
- In `commonMain`, never use `System.currentTimeMillis()`; use `DateTimeUtils.nowMillis`.
- UI strings live in `androidApp/src/main/res/values*/strings.xml` and are also the source of truth
  for iOS via `tools/strings/xcstrings.py`. Escape apostrophes as `\'`.
- Use `docs/` for any new functional documentation.

## Platform-specific guidance

Use `expect`/`actual` in KMP:
1) `expect` in `commonMain`
2) `actual` in the platform source set (`androidMain`, `iosMain`)
