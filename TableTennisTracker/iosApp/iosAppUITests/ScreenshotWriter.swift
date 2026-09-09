import XCTest

/// Writes store screenshots as PNGs into the simulator's shared-resources directory, which is a real
/// path on the Mac — `~/Library/Developer/CoreSimulator/Devices/<UDID>/data/…` — so the capture
/// script can copy them out with `rsync` while the run is still going.
///
/// This is the mechanism fastlane's `SnapshotHelper` uses, without fastlane, which
/// `.claude/skills/ship/SKILL.md` rules out as a dependency.
enum ScreenshotWriter {
    static let directoryName = "tt-screenshots"

    private static let root: URL = {
        guard let shared = ProcessInfo.processInfo.environment["SIMULATOR_SHARED_RESOURCES_DIRECTORY"] else {
            fatalError("SIMULATOR_SHARED_RESOURCES_DIRECTORY is unset — these tests only run on a simulator")
        }
        return URL(fileURLWithPath: shared).appendingPathComponent("Library/Caches/\(directoryName)")
    }()

    /// The whole screen, at device resolution. `XCUIScreen.main.screenshot()` rather than
    /// `app.screenshot()`: the latter crops to the app element's frame, so anything that leaves the
    /// app less than full-screen silently yields a PNG the App Store rejects for its dimensions.
    static func capture(
        device: String,
        locale: String,
        screen: String,
        expecting size: CGSize,
        file: StaticString = #filePath,
        line: UInt = #line
    ) {
        let data = XCUIScreen.main.screenshot().pngRepresentation
        let directory = root.appendingPathComponent("\(device)/\(locale)")

        do {
            try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
            try data.write(to: directory.appendingPathComponent("\(screen).png"), options: .atomic)
        } catch {
            XCTFail("could not write \(device)/\(locale)/\(screen).png: \(error)", file: file, line: line)
            return
        }

        // A wrong-sized capture is still a valid PNG, so nothing downstream would catch it. Failing
        // on the first one beats discovering it after 140.
        guard let image = UIImage(data: data) else {
            XCTFail("\(screen).png is not decodable", file: file, line: line)
            return
        }
        let pixels = CGSize(width: image.size.width * image.scale, height: image.size.height * image.scale)
        XCTAssertEqual(pixels, size, "\(device)/\(locale)/\(screen) is \(pixels), expected \(size)", file: file, line: line)
    }

    /// Removes output from an earlier run so a screen that stops being captured cannot linger and be
    /// imported as if it were current.
    static func reset() {
        try? FileManager.default.removeItem(at: root)
    }
}
