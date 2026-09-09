import XCTest

/// Captures the App Store screenshots, one pass per app language.
///
/// The data is seeded exactly once, at the top of the run, from `ShowcaseData` in `:core`. It lands
/// in the app's SQLite container, which survives relaunch, so every language — and the Android run,
/// which seeds the same dataset — shows the same player with the same history.
///
/// Nothing here is addressed by label. Fourteen languages go past, and a label lookup would work in
/// exactly one of them; the tab bar, which `TabView` builds from localized strings with no view of
/// ours to hang an identifier on, is addressed positionally instead.
final class AppStoreScreenshotTests: XCTestCase {
    private var app: XCUIApplication!

    /// Queried only to find notification banners, which belong to SpringBoard rather than the app.
    private let springboard = XCUIApplication(bundleIdentifier: "com.apple.springboard")

    private let timeout: TimeInterval = 30

    /// Mirrors `DebugScreen.unknownCount` — a UI test target drives the app as a black box and
    /// cannot see its types, so the placeholder has to be spelled out on both sides.
    private static let unknownCount = "\u{2014}"

    /// Every language the app ships, as `Shared.xcstrings` spells them. `AppLocale` in `:core` is the
    /// source of this list; it is repeated because a UI test bundle does not link the app.
    private static let allLocales = [
        "en", "ar", "de", "es", "fr", "hi", "id", "it", "ja", "ko", "pt", "tr", "uk", "zh-CN"
    ]

    /// `TEST_RUNNER_SCREENSHOT_LOCALES=de,ja` narrows the run to those languages — a smoke test
    /// before committing to all fourteen, and the way to re-capture one language on its own.
    private static var locales: [String] {
        guard let override = ProcessInfo.processInfo.environment["SCREENSHOT_LOCALES"], !override.isEmpty else {
            return allLocales
        }
        return override.split(separator: ",").map { $0.trimmingCharacters(in: .whitespaces) }
    }

    private static let localeRegions = [
        "en": "en_US", "ar": "ar_SA", "de": "de_DE", "es": "es_ES", "fr": "fr_FR", "hi": "hi_IN",
        "id": "id_ID", "it": "it_IT", "ja": "ja_JP", "ko": "ko_KR", "pt": "pt_BR", "tr": "tr_TR",
        "uk": "uk_UA", "zh-CN": "zh_CN"
    ]

    private var isPad: Bool { UIDevice.current.userInterfaceIdiom == .pad }

    private var deviceName: String { isPad ? "ipad" : "iphone" }

    /// The App Store expects the device's own resolution. iPhone 17 Pro Max is 1320×2868, iPad Pro
    /// 13-inch is 2064×2752 — both checked on every capture rather than trusted.
    private var expectedSize: CGSize {
        isPad ? CGSize(width: 2064, height: 2752) : CGSize(width: 1320, height: 2868)
    }

    /// The iPad row of the Screenshot Bro project has four columns, the iPhone row eight.
    private var screens: [String] {
        isPad
            ? ["01-sessions", "02-sessionForm", "03-analytics", "07-dark"]
            : ["01-sessions", "02-sessionForm", "03-analytics", "04-matchEditor",
               "05-calendar", "06-opponents", "07-dark", "08-settings"]
    }

    override func setUp() {
        continueAfterFailure = false
        XCUIDevice.shared.orientation = .portrait
    }

    override func tearDown() {
        app?.terminate()
        app = nil
    }

    func testCapturesEveryLocale() {
        // Only a full run may clear the output: a narrowed re-run would otherwise delete the
        // languages it is not capturing.
        if Self.locales == Self.allLocales { ScreenshotWriter.reset() }

        // Re-seeded for every language, not seeded once: the session notes are user content, so
        // `ShowcaseSeeder` writes the translation for whichever language the app is running in.
        for locale in Self.locales {
            launch(locale: locale)
            seedShowcaseData()
            app.terminate()

            launch(locale: locale)
            capturePass(locale: locale)
            app.terminate()
        }
    }

    // MARK: The pass

    /// One language, one app session. The order is chosen so each screen is a short hop from the
    /// last, and so the theme — the one thing a pass leaves behind in storage — is put back at the
    /// end rather than assumed at the start.
    private func capturePass(locale: String) {
        showSessionsAtToday()
        // iPad puts the list in a sidebar beside a detail pane, and an unselected pane reads
        // "Select a session" — half the screenshot saying nothing. Selecting today's session fills it.
        if isPad { tapFirstHittable("session.row") }
        capture(locale, "01-sessions")

        tap("sessions.add")
        waitFor("screen.sessionForm")
        capture(locale, "02-sessionForm")

        if !isPad {
            scrollTo("sessionForm.addMatch")
            tap("sessionForm.addMatch")
            waitFor("screen.matchEditor")
            capture(locale, "04-matchEditor")
            tap("matchEditor.cancel")
        }
        tap("sessionForm.cancel")

        if !isPad {
            showSessionsAtToday()
            tap("calendar.toggleMode")
            // The current month is half in the future, so it shows only the handful of sessions up
            // to today. The previous month is the one that actually looks like a training log.
            tap("calendar.previousPeriod")
            capture(locale, "05-calendar")
            tap("calendar.nextPeriod")
            tap("calendar.toggleMode")
        }

        openTab(.analytics)
        waitFor("screen.analytics")
        capture(locale, "03-analytics")

        if !isPad {
            openTab(.settings)
            scrollTo("settings.opponents")
            tap("settings.opponents")
            waitFor("screen.opponents")
            capture(locale, "06-opponents")
            navigateBack()

            scrollTo("settings.general")
            tap("settings.general")
            waitFor("screen.general")
            capture(locale, "08-settings")
            navigateBack()
        }

        // Relaunch rather than capture straight after the switch: changing the theme rebuilds the
        // tab, and the rebuilt sessions list comes back parked a day off today with the "Today"
        // action hidden, so there is nothing to tap to recover it.
        setTheme(.dark)
        app.terminate()
        launch(locale: locale)
        showSessionsAtToday()
        // Same reason as the light shot: an unselected iPad detail pane is half a screenshot of
        // "Select a session".
        if isPad { tapFirstHittable("session.row") }
        capture(locale, "07-dark")
        setTheme(.system)
    }

    /// Settings → Developer → Debug → clear, then seed.
    ///
    /// Clearing first matters now that every language re-seeds: without it the second language would
    /// stack a second roster and a second set of sessions on top of the first.
    ///
    /// Both waits are on the debug screen's own row count rather than on a busy flag. The buttons
    /// disable while they run, but a fast write finishes between two polls of an XCTest predicate,
    /// so "disabled then enabled" reports a failure on a run that worked.
    ///
    /// The count has to be read *after* it loads, not the instant the screen appears: it arrives
    /// from the screen's own `.task`, and reading a not-yet-loaded count as 0 would skip the clear
    /// on precisely the languages that still hold the previous one's rows.
    private func seedShowcaseData() {
        openTab(.settings)
        scrollTo("settings.debug")
        tap("settings.debug")
        waitFor("screen.debug", orIdentifier: "debug.seedShowcase")

        let count = element("debug.sessionCount")
        wait(count, matching: "label != '\(Self.unknownCount)'", timeout: timeout,
             "session count never loaded", #filePath, #line)
        if count.label != "0" {
            tap("debug.clearAll")
            wait(count, matching: "label == '0'", timeout: 300, "clearing never finished", #filePath, #line)
        }

        tap("debug.seedShowcase")
        wait(count, matching: "label != '0'", timeout: 300,
             "seeding produced no sessions", #filePath, #line)
    }

    // MARK: Navigation

    /// The list is 731 sections deep and lands on today from a `.task`, which a tab tap arriving in
    /// the same moment interrupts — leaving it parked on empty days. The app's own "Today" action
    /// exists exactly when the list is off today, so tapping it when present is the reliable way
    /// back, and waiting for a session row is what proves it landed.
    private func showSessionsAtToday(file: StaticString = #filePath, line: UInt = #line) {
        // The app launches on Sessions, so at the top of a pass this is already the active tab and
        // the extra taps only interrupt the list's scroll to today. The add button is the tell that
        // the tab is already showing, and unlike a tab bar's `isSelected` it exists on iPad too,
        // where the same `TabView` is drawn as a pill rather than a tab bar.
        if !element("sessions.add").waitForExistence(timeout: 5) {
            openTab(.sessions)
        }
        for _ in 0..<6 {
            let today = element("sessions.today")
            if today.exists { today.tap() }
            if element("session.row").waitForExistence(timeout: 5) { return }
        }
        // Whatever the list is showing instead is more useful than the assertion message.
        ScreenshotWriter.capture(device: deviceName, locale: "_failures", screen: "sessions-not-at-today",
                                 expecting: expectedSize, file: file, line: line)
        XCTFail("sessions list never showed a row", file: file, line: line)
    }

    private enum AppTab: Int, CaseIterable {
        case sessions = 0, analytics = 1, settings = 2

        var identifier: String { "tab.\(self)" }
    }

    /// iPhone draws the tabs as a bottom tab bar; iPad draws the same `TabView` as a pill at the top,
    /// which is not a `tabBars` element. The identifier finds either, and the positional lookup stays
    /// as a fallback for whatever a future iOS decides a `Tab` is.
    private func openTab(_ tab: AppTab) {
        let identified = element(tab.identifier)
        let button = identified.waitForExistence(timeout: 5)
            ? identified
            : app.tabBars.buttons.element(boundBy: tab.rawValue)
        XCTAssertTrue(button.waitForExistence(timeout: timeout), "no tab \(tab.identifier)")
        button.tap()
        // Re-tapping the active tab is the app's "return to root" gesture, which is exactly what a
        // pass wants after a push has been left open.
        button.tap()
    }

    /// The back button is the first item in the navigation bar, and its title is the previous
    /// screen's — localized in all fourteen languages, so it cannot be addressed by name.
    private func navigateBack() {
        let back = app.navigationBars.buttons.element(boundBy: 0)
        XCTAssertTrue(back.waitForExistence(timeout: timeout), "no back button")
        back.tap()
    }

    /// `ThemeMode.allCases` is `system, light, dark`, and `.navigationLink` renders it as a pushed
    /// list in that order — so the row index is stable while every label is not.
    private func setTheme(_ theme: ThemeChoice) {
        openTab(.settings)
        scrollTo("settings.general")
        tap("settings.general")
        waitFor("screen.general")
        tap("general.theme")

        let option = app.cells.element(boundBy: theme.rawValue)
        XCTAssertTrue(option.waitForExistence(timeout: timeout), "no theme row at \(theme.rawValue)")
        // A `.navigationLink` picker pops itself once a row is chosen, so only the push from
        // Settings into General is left to undo.
        option.tap()
        navigateBack()
    }

    private enum ThemeChoice: Int { case system = 0, light = 1, dark = 2 }

    // MARK: Helpers

    private func launch(locale: String) {
        app = XCUIApplication()
        app.launchArguments = [
            "-AppleLanguages", "(\(locale))",
            "-AppleLocale", Self.localeRegions[locale] ?? locale
        ]
        app.launch()
    }

    private func capture(_ locale: String, _ screen: String, file: StaticString = #filePath, line: UInt = #line) {
        guard screens.contains(screen) else { return }
        dismissSystemBanners()
        // The whole tree is re-keyed on a language change and on a theme change, so a capture taken
        // the instant a screen appears can catch it mid-rebuild — a valid PNG of the wrong thing.
        Thread.sleep(forTimeInterval: 1.2)
        ScreenshotWriter.capture(
            device: deviceName, locale: locale, screen: screen,
            expecting: expectedSize, file: file, line: line
        )
    }

    /// A system notification slides over the top of whatever is on screen and is captured with it —
    /// a fresh simulator offers "Ready for Apple Intelligence" within the first minute, which landed
    /// squarely across the Analytics title on one run. Swiping it up dismisses it.
    private func dismissSystemBanners() {
        for _ in 0..<3 {
            let banner = springboard.otherElements["NotificationShortLookView"]
            guard banner.exists else { return }
            banner.swipeUp()
            Thread.sleep(forTimeInterval: 0.5)
        }
    }

    /// `firstMatch` can be a row the list has laid out above the viewport — present in the tree,
    /// at a negative y, and not hittable. This takes the first one actually on screen.
    private func tapFirstHittable(_ identifier: String, file: StaticString = #filePath, line: UInt = #line) {
        let matches = app.descendants(matching: .any).matching(identifier: identifier)
        for index in 0..<matches.count where matches.element(boundBy: index).isHittable {
            matches.element(boundBy: index).tap()
            return
        }
        XCTFail("no hittable \(identifier)", file: file, line: line)
    }

    private func element(_ identifier: String) -> XCUIElement {
        app.descendants(matching: .any).matching(identifier: identifier).firstMatch
    }

    private func tap(_ identifier: String, file: StaticString = #filePath, line: UInt = #line) {
        let target = element(identifier)
        XCTAssertTrue(target.waitForExistence(timeout: timeout), "\(identifier) never appeared", file: file, line: line)
        target.tap()
    }

    private func waitFor(_ identifier: String, orIdentifier fallback: String? = nil,
                         file: StaticString = #filePath, line: UInt = #line) {
        if element(identifier).waitForExistence(timeout: timeout) { return }
        if let fallback, element(fallback).waitForExistence(timeout: timeout) { return }
        XCTFail("\(identifier) never appeared", file: file, line: line)
    }

    private func wait(_ target: XCUIElement, matching predicate: String, timeout: TimeInterval,
                      _ message: String, _ file: StaticString, _ line: UInt) {
        let done = expectation(for: NSPredicate(format: predicate), evaluatedWith: target)
        XCTAssertEqual(XCTWaiter.wait(for: [done], timeout: timeout), .completed, message, file: file, line: line)
    }

    /// `Form` and `List` are lazy, so a row below the fold is absent from the accessibility tree
    /// rather than merely off-screen — `waitForExistence` alone never finds it.
    private func scrollTo(_ identifier: String, file: StaticString = #filePath, line: UInt = #line) {
        let target = element(identifier)
        for _ in 0..<8 {
            if target.exists { return }
            app.swipeUp()
        }
        XCTAssertTrue(target.exists, "\(identifier) never appeared, even after scrolling", file: file, line: line)
    }
}
