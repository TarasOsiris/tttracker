import XCTest

/// Taps through the navigation the app is built out of.
///
/// Every screen here is reached the way a user reaches it — by tapping — because that is the part
/// a screenshot cannot check. The regression that prompted these tests looked perfect in a
/// screenshot: the settings rows drew their disclosure chevrons and did nothing when tapped,
/// because the `List` around them had a selection binding that swallowed the tap.
///
/// Elements are addressed by accessibility identifier rather than by label, so a test does not
/// pin itself to one of the app's fourteen languages.
final class NavigationUITests: XCTestCase {
    private var app: XCUIApplication!

    private let timeout: TimeInterval = 10

    override func setUp() {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launch()
    }

    // MARK: Settings

    func testSettingsRow_uiSettings_opensGeneralSettings() {
        openSettings()
        tap(SettingsRoute.general.identifier)
        assertVisible(SettingsRoute.general.screenIdentifier)
    }

    func testSettingsRow_opponents_opensOpponents() {
        openSettings()
        tap(SettingsRoute.opponents.identifier)
        assertVisible(SettingsRoute.opponents.screenIdentifier)
    }

    // MARK: Sessions

    func testAddButton_opensSessionForm() {
        tap("sessions.add")
        assertVisible("screen.sessionForm")
    }

    func testSavedSession_rowOpensDetails() {
        tap("sessions.add")
        assertVisible("screen.sessionForm")
        tap("sessionForm.save")

        tap("session.row")
        assertVisible("screen.sessionDetails")
    }

    /// A day cell is mostly empty space around its number, and it only became a button in the iPad
    /// pass. Selecting a day the list is not already on is what surfaces the Today action.
    func testCalendarDay_tapped_movesTheListOffToday() {
        let days = app.buttons.matching(identifier: "calendar.day")
        XCTAssertTrue(days.element(boundBy: 0).waitForExistence(timeout: timeout), "no calendar days")
        days.element(boundBy: 0).tap()

        assertVisible("sessions.today")
    }

    // MARK: Helpers

    /// The tab bar is the one thing addressed by label — its items are built by `TabView` from the
    /// same strings the navigation titles use, and there is no view of ours to hang an identifier on.
    private func openSettings() {
        let settings = app.buttons["Settings"].firstMatch
        XCTAssertTrue(settings.waitForExistence(timeout: timeout), "no Settings tab")
        settings.tap()
    }

    private func tap(_ identifier: String, file: StaticString = #filePath, line: UInt = #line) {
        let element = app.descendants(matching: .any).matching(identifier: identifier).firstMatch
        XCTAssertTrue(element.waitForExistence(timeout: timeout), "\(identifier) never appeared", file: file, line: line)
        element.tap()
    }

    private func assertVisible(_ identifier: String, file: StaticString = #filePath, line: UInt = #line) {
        let element = app.descendants(matching: .any).matching(identifier: identifier).firstMatch
        XCTAssertTrue(element.waitForExistence(timeout: timeout), "\(identifier) never appeared", file: file, line: line)
    }
}

/// Mirrors the app's `SettingsRoute` identifiers. A UI test bundle does not link the app, so the
/// strings have to be repeated — keeping them in one place here keeps the repetition to one line
/// per route.
private enum SettingsRoute: String {
    case general, opponents, debug

    var identifier: String { "settings.\(rawValue)" }
    var screenIdentifier: String { "screen.\(rawValue)" }
}
