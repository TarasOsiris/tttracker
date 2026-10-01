import Foundation

/// Debug or TestFlight, as opposed to an App Store install: the builds that get Pro and iCloud sync.
///
/// A TestFlight build is the very binary later promoted to the App Store, so only the receipt tells
/// them apart at runtime — and not from App Review, whose installs carry a sandbox receipt as well.
/// So a Release build also has to opt in through the `SANDBOX_FEATURES` build setting, which `/ship`
/// turns off when archiving a build that will be submitted for review. `appStoreReceiptURL` is
/// deprecated from iOS 18 in favour of the async `AppTransaction`, but this has to be known
/// synchronously, before the first frame.
///
/// The App Store screenshot run is a Debug build too, and passes `-hidesSandboxFeatures` so its
/// captures look like what the App Store build shows.
enum SandboxDistribution {
    static let isActive: Bool = {
        #if DEBUG
        return !ProcessInfo.processInfo.arguments.contains("-hidesSandboxFeatures")
        #else
        let isEnabledForBuild = Bundle.main.object(forInfoDictionaryKey: "SANDBOX_FEATURES") as? String == "YES"
        return isEnabledForBuild && Bundle.main.appStoreReceiptURL?.lastPathComponent == "sandboxReceipt"
        #endif
    }()
}
