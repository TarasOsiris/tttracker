# AGENTS.md

This file gives concise, project-specific instructions for AI agents working in this repo.

## Project overview

Table Tennis Tracker is a Kotlin Multiplatform app targeting Android, iOS, Desktop (JVM), and a Ktor server.
Shared UI is built with Compose Multiplatform; shared domain models live in `shared`.

## Repository map

- `composeApp/` Shared Compose UI (KMP library, not an app)
  - `composeApp/src/commonMain/kotlin` shared UI + ViewModels
  - `composeApp/src/jvmMain/kotlin/xyz/tleskiv/tt/main.kt` desktop entry point
  - `composeApp/src/iosMain/kotlin/xyz/tleskiv/tt/MainViewController.kt` iOS entry point
- `androidApp/` Android application entry point (`TTApplication.kt`, `MainActivity`)
- `iosApp/` Xcode project for iOS app
- `server/` Ktor backend (JVM)
- `shared/` Shared models (KMP, Kotlinx serialization)
- `docs/` Additional functional documentation

## Build and run

Android:
- `./gradlew :composeApp:assembleDebug`
- `./gradlew :androidApp:installDebug`

Desktop:
- `./gradlew :composeApp:run`

Server:
- `./gradlew :server:run` (port 8080)
- `./gradlew :server:buildFatJar`

iOS:
- Open `iosApp/` in Xcode and run from there

Tests:
- `./gradlew test`
- `./gradlew :server:test`
- `./gradlew :composeApp:test`

## Architecture and conventions

### Compose app (MVVM + Clean Architecture)

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

Compose Navigation 3 with typed routes in `composeApp/src/commonMain/kotlin/xyz/tleskiv/tt/ui/nav/Routes.kt`.
Top-level tabs use `TopLevelBackStack`; modal routes for create/details.

### Database (SQLDelight)

- Server schema: `server/src/main/sqldelight/xyz/tleskiv/tt/db/ServerDatabase.sq`
- Server setup: `server/src/main/kotlin/xyz/tleskiv/tt/db/DatabaseFactory.kt`
- Client drivers: Android, iOS native, JVM

### Gradle + versions

Dependencies are managed in `gradle/libs.versions.toml`.

## Code style and correctness rules

- Do not add comments unless absolutely necessary.
- Prefer a single line for code under 120 characters.
- For time: use `kotlin.time.Clock`.
- In `commonMain`, never use `System.currentTimeMillis()`; use `DateTimeUtils.nowMillis`.
- Android resource handling requires `copyComposeResourcesToAndroidResources` and resource prefix
  `tabletennistracker.composeapp.generated.resources`.
- Use `docs/` for any new functional documentation.

## Platform-specific guidance

Use `expect`/`actual` in KMP:
1) `expect` in `commonMain`
2) `actual` in the platform source set (`androidMain`, `iosMain`, `jvmMain`)
