# CLAUDE.md

## Project Overview

Table Tennis Tracker is a Kotlin Multiplatform (KMP) application targeting Android, iOS, Desktop (JVM), and Server. It
uses Compose Multiplatform for shared UI across platforms and Ktor for the backend server.

## Build Commands

### Android

```bash
./gradlew :composeApp:assembleDebug          # Build debug APK
./gradlew :androidApp:installDebug           # Install on connected device
```

### Desktop (JVM)

```bash
./gradlew :composeApp:run                    # Run desktop app
./gradlew :composeApp:packageDistributionForCurrentOS  # Create native installer
```

### iOS

Open `/iosApp` directory in Xcode and build/run from there, or use the IDE's run configuration.

### Server

```bash
./gradlew :server:run                        # Run server locally (port 8080)
./gradlew :server:buildFatJar                # Build standalone fat JAR
docker build -f server/Dockerfile .          # Build Docker image
```

### Testing

```bash
./gradlew test                               # Run all tests
./gradlew :server:test                       # Run server tests only
./gradlew :composeApp:test                   # Run UI tests only
```

## Module Architecture

The project consists of 5 modules with clear separation of concerns:

### composeApp
Shared Compose UI for Android, iOS, and Desktop. This is a **multiplatform library** (not an application module).

- **Platform targets:** Android Library, iOS framework, JVM
- **UI Framework:** Compose Multiplatform with Material3
- **DI:** Koin for Compose (`koin-compose`, `koin-compose-viewmodel`)
- **Navigation:** Compose Navigation 3
  Multiplatform: https://kotlinlang.org/docs/multiplatform/compose-navigation-3.html
- **Database:** SQLDelight with platform-specific drivers (Android, iOS native, JVM)
- **Entry points:**
    - Desktop: `composeApp/src/jvmMain/kotlin/xyz/tleskiv/tt/main.kt`
    - iOS: `composeApp/src/iosMain/kotlin/xyz/tleskiv/tt/MainViewController.kt`
    - Android: Via `androidApp` module's MainActivity

**Important:** Android resource handling requires special build task `copyComposeResourcesToAndroidResources` that
prefixes resources with `tabletennistracker.composeapp.generated.resources`.

### androidApp

Android application entry point that depends on composeApp.

- **Application class:** `TTApplication.kt` - Initializes Koin with Android context
- **MainActivity:** Simple ComponentActivity that loads the shared Compose app
- Min SDK 24, Target SDK 36

### server

Ktor backend server (JVM only).

- **Framework:** Ktor 3.3.3 with Netty engine
- **Port:** 8080 (defined in `shared` module as `SERVER_PORT`)
- **DI:** Koin for Ktor (`koin-ktor`)
    - Modules defined in `Application.kt`
    - Use `@inject<T>` pattern in route handlers
- **Database:** SQLDelight with JdbcSqliteDriver
    - Database file: `data/server.db`
    - Schema: `server/src/main/sqldelight/xyz/tleskiv/tt/db/ServerDatabase.sq`
    - Setup: `DatabaseFactory.kt` configures WAL mode, foreign keys, and optimizations
- **Routing:** Extension functions on `Routing` (see `Application.kt`)
- **Deployment:** Multi-stage Dockerfile with Java 21 runtime, produces fat JAR

### data

Shared data models across all platforms (Android, iOS, Desktop, Server).

- **Pattern:** Kotlinx serialization-compatible data classes
- **Example:** `User.kt` - `@Serializable data class`
- **Purpose:** Single source of truth for API contracts and domain models

### shared

Cross-platform utilities and business logic.

- **Pattern:** KMP `expect`/`actual` for platform-specific implementations
- **Example:** `Platform.kt` interface with implementations in `jvmMain`, `androidMain`
- **Constants:** `SERVER_PORT = 8080`
- **Utilities:** Helper classes like `Greeting.kt`

## Dependency Injection with Koin

Koin 4.1.1 is used throughout the project:

- **Server:** Koin modules defined in `Application.kt`, installed via `Koin` plugin
- **Android:** Initialized in `TTApplication.kt` with Android context
- **Compose:** Use `koin-compose-viewmodel` for ViewModel injection in Composables

Pattern for adding new Koin modules:

1. Define module in appropriate location (Application.kt for server, App.kt for UI)
2. Inject dependencies using `@inject<T>()` (Ktor) or `koinInject<T>()` (Compose)

## Database with SQLDelight

SQLDelight 2.0.2 is configured for both server and client apps:

- **Server:** `ServerDatabase` with schema at `server/src/main/sqldelight/xyz/tleskiv/tt/db/ServerDatabase.sq`
- **Clients:** Platform-specific drivers (Android, iOS native, JVM)
- **Queries:** Auto-generated from `.sq` files
- **Database setup:** See `server/src/main/kotlin/xyz/tleskiv/tt/db/DatabaseFactory.kt` for server configuration

To add new tables:

1. Add SQL schema to appropriate `.sq` file
2. Define queries in same file
3. Rebuild project to generate Kotlin code
4. Access via generated database interface

## Navigation Pattern


## Version Catalog

All dependencies are managed via `gradle/libs.versions.toml`.

## Platform-Specific Code

Use KMP's `expect`/`actual` pattern:

1. Define `expect` declaration in `commonMain`
2. Provide `actual` implementation in platform-specific source sets (`androidMain`, `iosMain`, `jvmMain`)

See `shared/src/commonMain/kotlin/xyz/tleskiv/tt/Platform.kt` for reference.

# Other instructions

- Do not comment on the code unless absolutely necessary.
- Prefer keeping code a single line if less than 120 characters.
- for clock use `kotlin.time.Clock`
- Use docs folder in the root for any additional functional documentation needed