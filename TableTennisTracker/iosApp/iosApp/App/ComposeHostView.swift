import SwiftUI
import Shared

/// Hosts the Compose Multiplatform UI.
///
/// `MainViewController()` renders the entire Compose app, including its own tab bar, so this is
/// all-or-nothing — individual Compose screens cannot be embedded in the native shell.
struct ComposeHostView: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        MainViewControllerKt.MainViewController()
    }

    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
}
