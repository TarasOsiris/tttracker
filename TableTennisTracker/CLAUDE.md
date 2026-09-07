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

Open `iosApp/iosApp.xcodeproj` in Xcode and build/run from there.

The app uses **Swift Package Manager**, not CocoaPods — there is no `.xcworkspace`, and every
`xcodebuild` invocation targets `-project iosApp/iosApp.xcodeproj`. The Kotlin/Native
`Shared.framework` is produced by the target's `Compile Kotlin Framework` build phase, which runs
`./gradlew :composeApp:embedAndSignAppleFrameworkForXcode`. PostHog and Sentry are SwiftPM
dependencies used only from Swift.

Because the Kotlin framework links no Apple SDKs of its own, it can be checked on its own without
Xcode:

```bash
./gradlew :composeApp:linkReleaseFrameworkIosArm64
```

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

The project consists of 5 modules with clear separation of concerns:

### core

All business logic, with **no dependency on Compose**: database, repositories, services,
ViewModels, DI wiring, and the platform-abstraction interfaces. A native (SwiftUI) iOS UI is meant
to be buildable on top of this module alone, so keep it Compose-free.

- **Platform targets:** Android Library, iOS, JVM
- **Database:** SQLDelight `AppDatabase`, schema at
  `core/src/commonMain/sqldelight/xyz/tleskiv/tt/db/AppDatabase.sq`, drivers per platform
- **DI:** Koin (`koin-core`, `koin-core-viewmodel` — the Compose-free ViewModel DSL)
- **Startup:** `core/src/commonMain/kotlin/xyz/tleskiv/tt/di/AppModule.kt` exposes
  `initApp(platformModule, configure)`; iOS calls `doInitApp(...)` from
  `core/src/iosMain/kotlin/xyz/tleskiv/tt/di/IosEntryPoint.kt`
- **Swift interop:** `core/src/iosMain/kotlin/xyz/tleskiv/tt/util/FlowObserver.kt` — `Flow.observe {}`
  returning a `Cancellable`, since Swift cannot collect flows directly

### composeApp
Shared Compose UI for Android, iOS, and Desktop. This is a **multiplatform library** (not an application module).
It depends on `:core` and contains only UI.

- **Platform targets:** Android Library, iOS framework, JVM
- **UI Framework:** Compose Multiplatform with Material3
- **DI:** Koin for Compose (`koin-compose`, `koin-compose-viewmodel`)
- **Navigation:** Compose Navigation 3
  Multiplatform: https://kotlinlang.org/docs/multiplatform/compose-navigation-3.html
- **iOS framework:** produces `Shared.framework`, which re-exports `:core` and `:shared` via
  `export(...)` in the framework binary. Kotlin/Native only puts the framework module's own
  declarations in the generated ObjC header, so anything Swift needs must be exported explicitly.
- **Entry points:**
    - Desktop: `composeApp/src/jvmMain/kotlin/xyz/tleskiv/tt/main.kt`
    - iOS: `composeApp/src/iosMain/kotlin/xyz/tleskiv/tt/MainViewController.kt` (Koin is started
      from `iosApp/iosApp/iOSApp.swift`, not from the composition)
    - Android: Via `androidApp` module's MainActivity

#### Architecture (lives in `:core`, consumed by `:composeApp`)

**Pattern:** MVVM + Clean Architecture with layered separation:

```
UI Layer (Screens) → ViewModel Layer → Service Layer → Repository Layer → Database
```

**ViewModel Pattern:**
- Abstract interface class extending `ViewModelBase` (which extends `androidx.lifecycle.ViewModel`)
- Concrete implementation class (e.g., `SessionScreenViewModel` + `SessionScreenViewModelImpl`)
- State exposed as immutable `StateFlow`, internal state as `MutableStateFlow`
- Koin registration: `viewModelOf(::ImplementationClass) bind InterfaceClass::class`
- **ViewModel injection:** Always inject as default parameter value in composables:
  ```kotlin
  // Without parameters:
  fun MyScreen(
      onNavigateBack: () -> Unit,
      viewModel: MyViewModel = koinViewModel()
  )

  // With parameters:
  fun MyScreen(
      sessionId: String,
      onNavigateBack: () -> Unit,
      viewModel: MyViewModel = koinViewModel { parametersOf(sessionId) }
  )
  ```
- For ViewModels with custom parameter types (not primitives), use lambda registration:
  ```kotlin
  viewModel<MyViewModel> { params -> MyViewModelImpl(params.getOrNull<MyType>(), get()) }
  ```

**Service Layer:**
- Interface + implementation pattern
- Business logic and data transformation (e.g., LocalDateTime ↔ epoch milliseconds)
- Registered as Koin singletons: `singleOf(::ImplementationClass) bind Interface::class`

**Repository Layer:**
- Interface + implementation pattern
- Data access via SQLDelight queries
- Uses `withContext(ioDispatcher)` for suspend functions
- Injected with named dispatcher qualifier
- **All multi-statement database operations must be transactional** using
  `database.transaction { ... }`

**Dialogs:**

- All dialogs go in `ui/dialogs/` package as separate composable functions
- Pattern: `@Composable fun XxxDialog(onConfirm: () -> Unit, onDismiss: () -> Unit)`
- Use Material 3 `AlertDialog` for confirmation dialogs
- Examples: `DatePickerDialog.kt`, `DeleteSessionDialog.kt`

**Model Mapping:**

- All model-to-model mapping code must be placed in `model/mappers/UiModelMappers.kt` as extension
  functions
- Never write inline mapping code in ViewModels - always use extension functions
- Pattern: `fun SourceModel.toTargetModel(): TargetModel = TargetModel(...)`
- Examples: `Match.toPendingMatch()`, `PendingMatch.toMatchInput()`

### androidApp

Android application entry point that depends on `:composeApp` and `:core`.

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
- **Clients:** `AppDatabase` in `:core`, schema at `core/src/commonMain/sqldelight/xyz/tleskiv/tt/db/AppDatabase.sq`, with platform-specific drivers (Android, iOS native, JVM)
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
- Pass route parameters to screens, not ViewModels (ViewModel is injected as default parameter)

## Version Catalog

All dependencies are managed via `gradle/libs.versions.toml`.

## Analytics with PostHog

The app uses PostHog for analytics tracking across platforms.

**Configuration:**

- Android: Set `POSTHOG_API_KEY` environment variable (added to BuildConfig)
- iOS: Add `POSTHOG_API_KEY` to Info.plist

**AnalyticsService Interface (`di/components/AnalyticsService.kt`):**

```kotlin
interface AnalyticsService {
    fun capture(event: String, properties: Map<String, Any>? = null)
    fun screen(screenName: String, properties: Map<String, Any>? = null)
    fun identify(userId: String, properties: Map<String, Any>? = null)
    fun reset()
}
```

**Platform Implementations:**

- Android: `AndroidAnalyticsService` - Full PostHog SDK support
- iOS: `SwiftAnalyticsService` in `iosApp/iosApp/` - implemented in **Swift** against the PostHog
  SwiftPM package and passed into `doInitApp(...)`, so event properties are supported
- JVM/Desktop: `JvmAnalyticsService` - No-op implementation

**Usage:** Inject `AnalyticsService` into ViewModels and call tracking methods.

## Platform-Specific Code

Instead of using KMP's `expect`/`actual` pattern prefer creating an interface in `di.components` package in `:core`'s `commonMain` and adding platform specific implementations,
also add it to Koin injection.

On iOS an implementation may live in **Swift** rather than Kotlin, and be handed to
`doInitApp(...)` at startup — that is how `AnalyticsService` (PostHog) and `CrashReporter` (Sentry)
work. Prefer this whenever the implementation would otherwise need a cinterop binding to an Apple
SDK: it keeps the Kotlin framework free of Apple dependencies so it links standalone.

If it's not possible fallback to `expect`/`actual` pattern:
1. Define `expect` declaration in `commonMain`
2. Provide `actual` implementation in platform-specific source sets (`androidMain`, `iosMain`, `jvmMain`)

# Other instructions

- All colors must be defined in `composeApp/src/commonMain/kotlin/xyz/tleskiv/tt/ui/theme/Color.kt`.
  Never use hardcoded `Color(0xFF...)` values directly in UI code.
- Do not commit or push changes unless explicitly asked to do so.
- ViewModel state must be `StateFlow`/`MutableStateFlow`, never Compose `mutableStateOf`. `:core`
  must not import `androidx.compose`. Compose screens read flows with
  `collectAsStateWithLifecycle()` for repository-backed flows, or `collectAsState()` for in-memory
  form state. `MutableStateFlow.collectAsMutableState()` (`util/ui/FlowState.kt`) keeps `by`
  delegation working over a flow; treat it as a transitional shim from the Compose-state migration —
  new screens are better served by a single `StateFlow<UiState>` plus intent functions, which is
  also what a SwiftUI UI can consume.
- Business logic goes in `:core`; only Compose UI goes in `:composeApp`. Anything using
  `org.jetbrains.compose.resources` (`Res.string.*`, `StringResource`) is UI and stays in
  `:composeApp`.
- Kotlin cannot smart-cast a nullable `val` declared in another module, so a nullable property of a
  `:core` type (`session.notes`, `opponent.club`) needs a local `val` before a null check when read
  from `:composeApp`. This is a workaround, not a target state — where the property is on a `:core`
  UI model the better fix is for the mapper to normalise it (non-null with an empty default).
- Do not comment on the code unless absolutely necessary.
- In composable screens, extract reusable UI blocks into named composable functions instead of
  using comments to separate sections. Function names should clearly describe what the block does.
- Prefer keeping code a single line if less than 120 characters.
- for clock use `kotlin.time.Clock`
- Use docs folder in the root for any additional functional documentation needed
- Never use `System.currentTimeMillis()` in commonApp module, use `nowMillis` from DateTimeUtils instead.
- Never nest Scaffolds in composeApp module, use simple Column/Box instead.
- FABs must use `navigationBarsPadding()` modifier to respect Android system navigation bars.
- Lists (LazyColumn) with FABs need extra bottom contentPadding calculated as:
  `WindowInsets.navigationBars.asPaddingValues().calculateBottomPadding() + fabHeight(56.dp) + fabMargin(16.dp) * 2`
- Never inline full package names, always use imports
- In Android instrumentation tests, never hardcode UI strings - use Compose resources via `Res.string.*` with `runBlocking { getString(res) }`
- After modifying Android instrumentation tests, always run them to verify: `./gradlew :androidApp:connectedDebugAndroidTest`
- In tests, never use hardcoded values inline - always extract values into named variables (e.g.,
  `val expectedCount = 1` instead of `assertEquals(1, list.size)`)
- Test naming convention: `action_condition_expectedResult` using underscores to separate parts.
  Examples:
    - `addSession_withAllFields_displaysSessionDetails`
    - `getSessionById_withNonExistentId_returnsNull`
    - `deleteSession_removesFromDatabase` (condition can be omitted if obvious)
- After modifying composable screen signatures, always update the corresponding Android previews
  in `androidApp/src/main/kotlin/xyz/tleskiv/tt/previews/`

## Localization

The project uses Compose Multiplatform resources for translations.

**File locations:**
- Base strings (English): `composeApp/src/commonMain/composeResources/values/strings.xml`
- Localized strings: `composeApp/src/commonMain/composeResources/values-{locale}/strings.xml`

**Supported locales:** ar, de, es, fr, hi, id, it, ja, ko, pt, tr, uk, zh-rCN

**During development:**

- Only add strings to the base `values/strings.xml` file
- DO NOT add translations to locale files manually during development
- Use `/translate` command to add all missing translations at once when ready

**Adding new strings:**
1. Add the string to the base `values/strings.xml` first
2. Run `/translate` to add translations to all locale files
