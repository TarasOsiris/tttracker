import XCTest

/// The app's half of the widgets: a tap on one hands it a `tttracker://` URL.
///
/// Opening a URL from outside the app puts SpringBoard's "Open in" prompt in the way. That is an
/// artifact of `XCUISystem.open` — a widget tap shows no such thing — so each test dismisses it
/// before looking at the app.
final class WidgetDeepLinkUITests: XCTestCase {
    private var app: XCUIApplication!

    private let timeout: TimeInterval = 10

    override func setUp() {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launch()
    }

    func testAddSessionLink_opensTheSessionForm() {
        open("tttracker://sessions/new")
        assertVisible("screen.sessionForm")
    }

    func testAnalyticsLink_opensTheAnalyticsTab() {
        open("tttracker://analytics")
        assertVisible("screen.analytics")
    }

    /// An unknown host must leave the app where it was rather than clearing the selection or
    /// raising a sheet.
    func testUnknownLink_changesNothing() {
        open("tttracker://nowhere")
        assertVisible("sessions.add")
    }

    // MARK: Helpers

    private func open(_ url: String, file: StaticString = #filePath, line: UInt = #line) {
        guard let url = URL(string: url) else {
            return XCTFail("not a URL: \(url)", file: file, line: line)
        }
        XCUIDevice.shared.system.open(url)

        let springboard = XCUIApplication(bundleIdentifier: "com.apple.springboard")
        let confirm = springboard.buttons["Open"]
        if confirm.waitForExistence(timeout: timeout) {
            confirm.tap()
        }
        // Whether the prompt appeared or not, nothing about the app can be asserted until it is
        // actually the app on screen.
        XCTAssertTrue(app.wait(for: .runningForeground, timeout: timeout),
                      "the app never came forward", file: file, line: line)
    }

    private func assertVisible(_ identifier: String, file: StaticString = #filePath, line: UInt = #line) {
        let element = app.descendants(matching: .any).matching(identifier: identifier).firstMatch
        XCTAssertTrue(element.waitForExistence(timeout: timeout), "\(identifier) never appeared", file: file, line: line)
    }
}
