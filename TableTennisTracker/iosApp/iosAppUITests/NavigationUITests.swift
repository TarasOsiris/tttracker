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

    /// The list keeps its place across a push and pop.
    ///
    /// Two separate things used to move it, neither of them visible in a screenshot: `task` runs on
    /// every *appearance*, so the one-shot scroll that puts today at the top re-ran on the way back;
    /// and the `scrollPosition(id:)` binding re-anchored its day to the top of the viewport. The
    /// row's frame is the only thing that tells them apart from a list that stayed put.
    func testSessionRow_returningFromDetails_leavesTheListWhereItWas() {
        let row = addSessionAndWaitForItsRow()
        let atRest = row.frame

        dragListBackInTime()
        let before = row.frame
        XCTAssertNotEqual(before.minY, atRest.minY, "the drag did not move the list, so nothing is being tested")
        assertVisible("sessions.today")

        row.tap()
        assertVisible("screen.sessionDetails")
        back()
        assertGone("screen.sessionDetails")

        XCTAssertEqual(stillFrame(of: row).minY, before.minY, accuracy: 1, "the list moved under the user")
    }

    /// The calendar half of the sync: selecting a day scrolls the list to it. Paging out and taking
    /// the Today action back covers both of the paths that ask the list to move.
    func testTodayAction_afterPagingTheCalendar_returnsTheListToToday() {
        let row = addSessionAndWaitForItsRow()
        let atRest = row.frame

        tap("calendar.previousPeriod")
        tap("sessions.today")

        XCTAssertEqual(stillFrame(of: row).minY, atRest.minY, accuracy: 1, "the list did not come back to today")
    }

    // MARK: Helpers

    /// The tab bar is the one thing addressed positionally — its items are built by `TabView` from
    /// the same localized strings the navigation titles use, and there is no view of ours to hang an
    /// identifier on. Sessions, Analytics, Settings, in that order.
    private func openSettings() {
        let settings = app.tabBars.buttons.element(boundBy: 2)
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

    private func assertGone(_ identifier: String, file: StaticString = #filePath, line: UInt = #line) {
        let element = app.descendants(matching: .any).matching(identifier: identifier).firstMatch
        let gone = expectation(for: NSPredicate(format: "exists == false"), evaluatedWith: element)
        XCTAssertEqual(XCTWaiter().wait(for: [gone], timeout: timeout), .completed,
                       "\(identifier) never went away", file: file, line: line)
    }

    /// The pushed screen leaves the system back button first in its navigation bar; there is no view
    /// of ours there to hang an identifier on.
    private func back(file: StaticString = #filePath, line: UInt = #line) {
        let button = app.navigationBars.buttons.element(boundBy: 0)
        XCTAssertTrue(button.waitForExistence(timeout: timeout), "no back button", file: file, line: line)
        button.tap()
    }

    /// The simulator keeps its database between runs, so a scroll test cannot assume an empty list —
    /// it can only assume that saving the form puts a row on today.
    private func addSessionAndWaitForItsRow(file: StaticString = #filePath, line: UInt = #line) -> XCUIElement {
        tap("sessions.add")
        assertVisible("screen.sessionForm")
        tap("sessionForm.save")

        let row = app.descendants(matching: .any).matching(identifier: "session.row").firstMatch
        XCTAssertTrue(row.waitForExistence(timeout: timeout), "the saved session was never listed", file: file, line: line)
        return row
    }

    /// A short drag rather than a swipe, so the list moves off today by a known amount and comes to
    /// rest with the row still on screen to measure.
    private func dragListBackInTime() {
        let list = app.scrollViews.firstMatch
        list.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.35))
            .press(forDuration: 0.1,
                   thenDragTo: list.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.62)),
                   withVelocity: .slow,
                   thenHoldForDuration: 0.1)
    }

    /// A frame read while the list is still gliding says nothing, and `scrollTo` animates — so wait
    /// for two identical reads before believing one.
    private func stillFrame(of element: XCUIElement) -> CGRect {
        var last = element.frame
        let deadline = Date().addingTimeInterval(timeout)
        while Date() < deadline {
            Thread.sleep(forTimeInterval: 0.25)
            let current = element.frame
            if current == last { return current }
            last = current
        }
        return last
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
