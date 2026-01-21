# CLAUDE.md

## Project Overview

Table Tennis Tracker is a Kotlin Multiplatform (KMP) application targeting Android, iOS, Desktop (JVM), and Server. It uses Compose Multiplatform for shared UI across platforms and Ktor for the backend server.

## Build Commands

### Android

```bash
./gradlew :composeApp:assembleDebug          # Build debug APK
./gradlew :androidApp:installDebug           # Install on connected device
```

### Desktop (JVM)

```bash
./gradlew :composeApp:run                    # Run desktop app
```

### iOS

Open `/iosApp` directory in Xcode and build/run from there, or use the IDE's run configuration.

### Server

```bash
./gradlew :server:run                        # Run server locally (port 8080)
./gradlew :server:buildFatJar                # Build standalone fat JAR
```

### Testing

```bash
./gradlew test                               # Run all tests
./gradlew :server:test                       # Run server tests only
./gradlew :composeApp:test                   # Run UI tests only
```

## Module Architecture

The project consists of 4 modules with clear separation of concerns:

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

#### composeApp Architecture

**Pattern:** MVVM + Clean Architecture with layered separation:

```
UI Layer (Screens) → ViewModel Layer → Service Layer → Repository Layer → Database
```

**ViewModel Pattern:**
- Abstract interface class extending `ViewModelBase` (which extends `androidx.lifecycle.ViewModel`)
- Concrete implementation class (e.g., `SessionScreenViewModel` + `SessionScreenViewModelImpl`)
- State exposed as immutable `StateFlow`, internal state as `MutableStateFlow`
- Koin registration: `viewModelOf(::ImplementationClass) bind InterfaceClass::class`
- Parameters via `koinViewModel { parametersOf(args) }` for route data

**Service Layer:**
- Interface + implementation pattern
- Business logic and data transformation (e.g., LocalDateTime ↔ epoch milliseconds)
- Registered as Koin singletons: `single<Interface> { ImplementationClass(get()) }`

**Repository Layer:**
- Interface + implementation pattern
- Data access via SQLDelight queries
- Uses `withContext(ioDispatcher)` for suspend functions
- Injected with named dispatcher qualifier

**Dialogs:**

- All dialogs go in `ui/dialogs/` package as separate composable functions
- Pattern: `@Composable fun XxxDialog(onConfirm: () -> Unit, onDismiss: () -> Unit)`
- Use Material 3 `AlertDialog` for confirmation dialogs
- Examples: `DatePickerDialog.kt`, `DeleteSessionDialog.kt`

### androidApp

Android application entry point that depends on composeApp.

- **Application class:** `TTApplication.kt` - Initializes Koin with Android context
- **MainActivity:** Simple ComponentActivity that loads the shared Compose app
- Min SDK 24, Target SDK 36

### server

Ktor backend server (JVM only).

- **Framework:** Ktor 3.3.3 with Netty engine
- **Port:** 8080
- **DI:** Koin for Ktor (`koin-ktor`)
    - Modules defined in `Application.kt`
    - Use `@inject<T>` pattern in route handlers
- **Database:** SQLDelight with JdbcSqliteDriver
    - Database file: `data/server.db`
    - Schema: `server/src/main/sqldelight/xyz/tleskiv/tt/db/ServerDatabase.sq`
    - Setup: `DatabaseFactory.kt` configures WAL mode, foreign keys, and optimizations
- **Routing:** Extension functions on `Routing` (see `Application.kt`)
- **Deployment:** Multi-stage Dockerfile with Java 21 runtime, produces fat JAR

### shared

Shared data models across all platforms (Android, iOS, Desktop, Server).

- **Pattern:** Kotlinx serialization-compatible data classes
- **Example:** `User.kt` - `@Serializable data class`
- **Purpose:** Single source of truth for API contracts and domain models

## Dependency Injection with Koin

Koin 4.1.1 is used throughout the project:

- **Server:** Koin modules defined in `Application.kt`, installed via `Koin` plugin
- **Android:** Initialized in `TTApplication.kt` with Android context
- **Compose:** Use `koin-compose-viewmodel` for ViewModel injection in Composables

**Composable Dependency Injection Rules:**

- **NEVER** use `koinInject<T>()` directly in composables
- **ALWAYS** inject dependencies into ViewModels and expose functionality through the ViewModel
- Composables should only receive ViewModels via `koinViewModel()` and UI callbacks via parameters

Pattern for adding new Koin modules:

1. Define module in appropriate location (Application.kt for server, App.kt for UI)
2. Inject dependencies using `@inject<T>()` (Ktor routes) or constructor injection in ViewModels

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

Uses Compose Navigation 3 with type-safe route definitions:

**Route Structure (`ui/nav/Routes.kt`):**
```kotlin
sealed interface TopLevelRoute  // Bottom nav destinations with icon + label
├── SessionsRoute              // Sessions list (default)
├── AnalyticsRoute             // Analytics screen
└── ProfileRoute               // Profile screen

data class CreateSessionRoute(val initialDate: LocalDate?)  // Modal route
data class SessionDetailsRoute(val sessionId: String)        // Modal route
```

**Navigation Components:**
- `TopLevelBackStack<T>` - Custom class managing per-tab back stack persistence
- `NavDisplay` - Renders routes with entry decorators for state/ViewModel preservation
- Entry decorators: `rememberSaveableStateHolderNavEntryDecorator()`, `rememberViewModelStoreNavEntryDecorator()`

**ViewModel Injection with Route Parameters:**
```kotlin
koinViewModel<CreateSessionScreenViewModel> { parametersOf(route.initialDate) }
```

## Version Catalog

All dependencies are managed via `gradle/libs.versions.toml`.

## Platform-Specific Code

Instead of using KMP's `expect`/`actual` pattern prefer creating an interface in `di.components` package in `commonMain` and adding platform specific implementations,
also add it to Koin injection. 

If it's not possible fallback to `expect`/`actual` pattern:
1. Define `expect` declaration in `commonMain`
2. Provide `actual` implementation in platform-specific source sets (`androidMain`, `iosMain`, `jvmMain`)

# Other instructions

- Do not comment on the code unless absolutely necessary.
- Prefer keeping code a single line if less than 120 characters.
- for clock use `kotlin.time.Clock`
- Use docs folder in the root for any additional functional documentation needed
- Never use `System.currentTimeMillis()` in commonApp module, use `nowMillis` from DateTimeUtils instead.
- Never nest Scaffolds in composeApp module, use simple Column/Box instead.
- Never inline full package names, always use imports
- In Android instrumentation tests, never hardcode UI strings - use Compose resources via `Res.string.*` with `runBlocking { getString(res) }`
