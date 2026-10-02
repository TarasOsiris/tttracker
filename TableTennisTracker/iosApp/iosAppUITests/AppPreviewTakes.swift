import XCTest

/// The takes the App Store app preview is cut from, one test per take.
///
/// `marketing/app-preview/capture/capture_clips.py` runs these while it records the simulator. A
/// take seeds the showcase data, relaunches into a clean state and then waits: it writes `ready`
/// into `PREVIEW_DIR`, the script starts recording and answers with `go`, and only then does the
/// take act. Every tap and drag is logged to `events.json` with its wall-clock time and screen
/// point, so the video draws its touch dots and places its click sounds where the app reacted.
///
/// Outside a capture run `PREVIEW_DIR` is unset and every take skips, so a full UI test run is
/// unaffected. The takes run in English with the Pro upsell hidden, like the store screenshots.
final class AppPreviewTakes: XCTestCase {
    private var app: XCUIApplication!
    private var directory: URL!
    private var events: [[String: Any]] = []

    private let timeout: TimeInterval = 30

    /// Mirrors `DebugScreen.unknownCount`; the UI test bundle cannot see the app's types.
    private static let unknownCount = "\u{2014}"

    private var isPad: Bool { UIDevice.current.userInterfaceIdiom == .pad }

    override func setUpWithError() throws {
        guard let path = ProcessInfo.processInfo.environment["PREVIEW_DIR"] else {
            throw XCTSkip("recorded by marketing/app-preview/capture/capture_clips.py")
        }
        directory = URL(fileURLWithPath: path)
        continueAfterFailure = false
        XCUIDevice.shared.orientation = .portrait
    }

    override func tearDown() {
        app?.terminate()
        app = nil
    }

    // MARK: Takes

    /// The sessions list, then the month calendar. Opens on a few still seconds, which the night
    /// beat plays against the same moment of the dark take.
    func testBrowse() throws {
        try prepare { if self.isPad { self.tapFirstHittable("session.row") } }
        pause(3.4)
        let list = element("session.row").frame
        let x = isPad ? list.midX : screen.width / 2
        drag(from: CGPoint(x: x, y: screen.height * 0.5), to: CGPoint(x: x, y: screen.height * 0.78), seconds: 0.9)
        pause(0.8)
        tap(element("calendar.toggleMode"))
        pause(1.4)
        tap(element("calendar.previousPeriod"))
        pause(1.8)
        finish()
    }

    /// The floating add button, the form, a match with a winning score, and the saved session.
    func testLog() throws {
        try prepare()
        pause(1.0)
        tap(element("sessions.add"))
        XCTAssertTrue(element("screen.sessionForm").waitForExistence(timeout: timeout))
        pause(1.0)

        slide(app.sliders.element(boundBy: 0), to: 0.42)
        pause(0.5)
        let kind = app.buttons.matching(NSPredicate(format: "label BEGINSWITH 'Session Type'")).firstMatch
        tap(kind)
        pause(0.7)
        tap(app.buttons["Match Play"].firstMatch)
        pause(0.6)
        slide(app.sliders.element(boundBy: 1), to: 7.0 / 9.0)
        pause(0.6)

        let form = element("screen.sessionForm").frame
        drag(from: CGPoint(x: form.midX, y: form.minY + form.height * 0.8),
             to: CGPoint(x: form.midX, y: form.minY + form.height * 0.35), seconds: 0.7)
        pause(0.7)
        tap(element("sessionForm.addMatch"))
        XCTAssertTrue(element("screen.matchEditor").waitForExistence(timeout: timeout))
        pause(0.9)

        // The form stays in the tree behind the sheet, so every query here is scoped to the sheet.
        let editor = element("screen.matchEditor")
        let name = editor.textFields.firstMatch
        tap(name)
        pause(0.4)
        type("Die", into: name)
        pause(0.7)
        // The suggestion row combines its children, so it is matched by label whatever it reports as.
        tap(app.descendants(matching: .any).matching(NSPredicate(format: "label BEGINSWITH 'Diego Mar'")).firstMatch)
        pause(0.6)
        let mine = editor.steppers.element(boundBy: 0).buttons.element(boundBy: 1)
        let theirs = editor.steppers.element(boundBy: 1).buttons.element(boundBy: 1)
        for _ in 0..<3 { tap(mine); pause(0.35) }
        tap(theirs)
        pause(0.8)
        tap(element("matchEditor.save"))
        pause(1.3)
        tap(element("sessionForm.save"))
        pause(2.2)
        finish()
    }

    /// Analytics, scrolled from the summary down through the charts and the insights.
    func testAnalytics() throws {
        try prepare()
        pause(0.8)
        openAnalytics()
        XCTAssertTrue(element("screen.analytics").waitForExistence(timeout: timeout))
        pause(1.6)
        let x = isPad ? screen.width * 0.5 : screen.width / 2
        for _ in 0..<4 {
            drag(from: CGPoint(x: x, y: screen.height * 0.78), to: CGPoint(x: x, y: screen.height * 0.36), seconds: 1.1)
            pause(1.1)
        }
        finish()
    }

    /// The sessions list in dark mode, still, for the night reveal. The script sets the appearance.
    func testDark() throws {
        try prepare { if self.isPad { self.tapFirstHittable("session.row") } }
        pause(4.4)
        finish()
    }

    // MARK: Preparation and handshake

    private var screen: CGRect { app.windows.firstMatch.frame }

    /// Seeds, relaunches, waits for the list to land on today, runs `setup` off camera, then hands
    /// over to the recorder.
    private func prepare(setup: () -> Void = {}) throws {
        launch()
        seedShowcaseData()
        app.terminate()
        launch()
        showSessionsAtToday()
        setup()
        pause(1.5)

        try Data().write(to: directory.appendingPathComponent("ready"))
        let go = directory.appendingPathComponent("go")
        let deadline = Date().addingTimeInterval(120)
        while !FileManager.default.fileExists(atPath: go.path) {
            guard Date() < deadline else { throw XCTSkip("the recorder never started") }
            Thread.sleep(forTimeInterval: 0.05)
        }
    }

    private func finish() {
        let payload: [String: Any] = [
            "end": Date().timeIntervalSince1970,
            "points": [screen.width, screen.height],
            "events": events
        ]
        let data = try? JSONSerialization.data(withJSONObject: payload, options: [.prettyPrinted])
        try? data?.write(to: directory.appendingPathComponent("events.json"))
    }

    private func launch() {
        app = XCUIApplication()
        app.launchArguments = ["-AppleLanguages", "(en)", "-AppleLocale", "en_US", "-hidesProUpsell"]
        app.launch()
    }

    /// Settings → Debug → clear, then seed, as `AppStoreScreenshotTests` does: every take starts from
    /// the same showcase data, whatever the previous take saved.
    private func seedShowcaseData() {
        tapPlain(element("settings.toolbar"))
        let debug = element("settings.debug")
        for _ in 0..<8 where !debug.exists { app.swipeUp() }
        tapPlain(debug)
        let count = element("debug.sessionCount")
        wait(count, matching: "label != '\(Self.unknownCount)'")
        if count.label != "0" {
            tapPlain(element("debug.clearAll"))
            wait(count, matching: "label == '0'", timeout: 300)
        }
        tapPlain(element("debug.seedShowcase"))
        wait(count, matching: "label != '0'", timeout: 300)
    }

    private func showSessionsAtToday() {
        for _ in 0..<6 {
            let today = element("sessions.today")
            if today.exists { today.tap() }
            if element("session.row").waitForExistence(timeout: 5) { return }
        }
        XCTFail("sessions list never showed a row")
    }

    private func openAnalytics() {
        let identified = element("tab.analytics")
        let button = identified.waitForExistence(timeout: 5) ? identified : app.tabBars.buttons.element(boundBy: 1)
        tap(button)
    }

    // MARK: Logged gestures

    /// XCTest returns from a gesture only once the app has idled after it, so the time the call ends
    /// trails the touch. Less the gesture itself and the 0.24 s that trail measured against the
    /// recording, it is where the finger actually came down.
    private func note(_ kind: String, at point: CGPoint, endedAt end: Date, lasting seconds: Double = 0,
                      to target: CGPoint? = nil) {
        var event: [String: Any] = [
            "t": end.timeIntervalSince1970 - seconds - 0.24,
            "kind": kind,
            "x": point.x,
            "y": point.y
        ]
        if seconds > 0 { event["duration"] = seconds }
        if let target {
            event["x2"] = target.x
            event["y2"] = target.y
        }
        events.append(event)
    }

    private func tap(_ target: XCUIElement) {
        XCTAssertTrue(target.waitForExistence(timeout: timeout), "\(target) never appeared")
        let point = CGPoint(x: target.frame.midX, y: target.frame.midY)
        target.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5)).tap()
        note("tap", at: point, endedAt: Date())
    }

    private func drag(from start: CGPoint, to end: CGPoint, seconds: Double) {
        let origin = app.coordinate(withNormalizedOffset: .zero)
        let from = origin.withOffset(CGVector(dx: start.x, dy: start.y))
        let to = origin.withOffset(CGVector(dx: end.x, dy: end.y))
        let velocity = XCUIGestureVelocity(rawValue: hypot(end.x - start.x, end.y - start.y) / seconds)
        from.press(forDuration: 0.05, thenDragTo: to, withVelocity: velocity, thenHoldForDuration: 0.05)
        note("drag", at: start, endedAt: Date().addingTimeInterval(-0.05), lasting: seconds, to: end)
    }

    /// Drags a slider's thumb from where it sits to a normalized position.
    private func slide(_ slider: XCUIElement, to position: CGFloat) {
        XCTAssertTrue(slider.waitForExistence(timeout: timeout))
        let frame = slider.frame
        let inset: CGFloat = 14
        let track = frame.width - inset * 2
        let current = slider.normalizedSliderPosition
        let start = CGPoint(x: frame.minX + inset + track * current, y: frame.midY)
        let end = CGPoint(x: frame.minX + inset + track * position, y: frame.midY)
        drag(from: start, to: end, seconds: 0.6)
    }

    private func type(_ text: String, into field: XCUIElement) {
        field.typeText(text)
        events.append(["t": Date().timeIntervalSince1970, "kind": "type", "text": text])
    }

    private func pause(_ seconds: TimeInterval) {
        Thread.sleep(forTimeInterval: seconds)
    }

    // MARK: Unlogged plumbing, before recording starts

    private func element(_ identifier: String) -> XCUIElement {
        app.descendants(matching: .any).matching(identifier: identifier).firstMatch
    }

    private func tapPlain(_ target: XCUIElement) {
        XCTAssertTrue(target.waitForExistence(timeout: timeout), "\(target) never appeared")
        target.tap()
    }

    private func tapFirstHittable(_ identifier: String) {
        let matches = app.descendants(matching: .any).matching(identifier: identifier)
        for index in 0..<matches.count where matches.element(boundBy: index).isHittable {
            matches.element(boundBy: index).tap()
            return
        }
        XCTFail("no hittable \(identifier)")
    }

    private func wait(_ target: XCUIElement, matching predicate: String, timeout: TimeInterval = 30) {
        let done = expectation(for: NSPredicate(format: predicate), evaluatedWith: target)
        XCTAssertEqual(XCTWaiter.wait(for: [done], timeout: timeout), .completed, predicate)
    }
}
