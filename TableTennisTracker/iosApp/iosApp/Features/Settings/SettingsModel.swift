import Observation
import Shared

@MainActor
@Observable
final class SettingsModel {
    private(set) var userId: String = ""

    let versionName: String
    let buildNumber: String
    let isDebugBuild: Bool

    @ObservationIgnored private let launcher: any ExternalAppLauncher
    @ObservationIgnored private let clipboard: any ClipboardManager
    @ObservationIgnored private let analytics: any AnalyticsService
    @ObservationIgnored private let userIdService: any UserIdService

    init(
        deviceInfo: any NativeInfoProvider = Services.deviceInfo,
        launcher: any ExternalAppLauncher = Services.launcher,
        clipboard: any ClipboardManager = Services.clipboard,
        analytics: any AnalyticsService = Services.analytics,
        userIdService: any UserIdService = Services.userId
    ) {
        self.versionName = deviceInfo.versionName
        self.buildNumber = deviceInfo.buildNumber
        self.isDebugBuild = deviceInfo.isDebugBuild
        self.launcher = launcher
        self.clipboard = clipboard
        self.analytics = analytics
        self.userIdService = userIdService
    }

    func load() async {
        userId = (try? await userIdService.getUserId()) ?? ""
    }

    func copyUserId() {
        guard !userId.isEmpty else { return }
        clipboard.doCopyToClipboard(text: userId)
        analytics.capture(event: "user_id_copied", properties: nil)
    }

    func sendFeedback() {
        launcher.sendEmail(
            to: "leskiv.taras@gmail.com",
            subject: "TT Tracker feedback",
            body: "\n\n---\nVersion \(versionName) (\(buildNumber))\nUser ID: \(userId)"
        )
        analytics.capture(event: "feedback_opened", properties: nil)
    }

    func rateApp() {
        launcher.openAppStore()
        analytics.capture(event: "rate_app_opened", properties: nil)
    }
}
