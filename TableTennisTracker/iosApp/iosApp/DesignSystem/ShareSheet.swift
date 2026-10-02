import SwiftUI
import UIKit

/// The system share sheet for items that only exist once the user has asked for them — `ShareLink`
/// needs its items before the tap.
struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: items, applicationActivities: nil)
    }

    func updateUIViewController(_ controller: UIActivityViewController, context: Context) {}
}
