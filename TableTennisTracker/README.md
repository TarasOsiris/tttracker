This is a Kotlin Multiplatform project targeting Android, iOS and a Ktor server. Each app ships a
native UI — Jetpack Compose on Android, SwiftUI on iOS — over shared Kotlin business logic.

* [/androidApp](./androidApp/src/main) is the Android application: Jetpack Compose UI, resources,
  previews and instrumentation tests.

* [/iosApp](./iosApp/iosApp) is the SwiftUI application and its Xcode project. It consumes the
  Kotlin `Shared.framework` produced by `:core`.

* [/core](./core/src) holds all business logic — database, repositories, services, ViewModels and
  DI — with no dependency on Compose. Targets Android and iOS.

* [/shared](./shared/src) is for models shared with the server as well as the apps.

* [/server](./server/src/main/kotlin) is the Ktor server application.

### Build and Run Android Application

To build and run the development version of the Android app, use the run configuration from the run widget
in your IDE’s toolbar or build it directly from the terminal:
- on macOS/Linux
  ```shell
  ./gradlew :androidApp:installDebug
  ```
- on Windows
  ```shell
  .\gradlew.bat :androidApp:installDebug
  ```

### Build and Run Server

To build and run the development version of the server, use the run configuration from the run widget
in your IDE’s toolbar or run it directly from the terminal:
- on macOS/Linux
  ```shell
  ./gradlew :server:run
  ```
- on Windows
  ```shell
  .\gradlew.bat :server:run
  ```

### Build and Run iOS Application

To build and run the development version of the iOS app, open the [/iosApp](./iosApp) directory in
Xcode and run it from there. The Kotlin framework can be checked on its own with
`./gradlew :core:linkReleaseFrameworkIosArm64`.

---

Learn more about [Kotlin Multiplatform](https://www.jetbrains.com/help/kotlin-multiplatform-dev/get-started.html)…
