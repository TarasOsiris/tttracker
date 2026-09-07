import SwiftUI

/// Settings as a list of pages beside the page itself, the way iPadOS presents its own.
///
/// A `NavigationSplitView` collapses to a stack on its own, which would make the compact branch
/// below unnecessary — but a collapsed one pushes from `.tag()` rows, and those draw no disclosure
/// chevron and would auto-push whichever page the selection defaults to. The phone keeps its links.
struct SettingsTab: View {
    @Binding var path: NavigationPath

    @Environment(\.horizontalSizeClass) private var horizontalSizeClass
    @State private var selectedPage: SettingsRoute? = .general

    var body: some View {
        if horizontalSizeClass.isWide {
            NavigationSplitView {
                SettingsScreen(selectedPage: $selectedPage).sidebarColumnWidth()
            } detail: {
                // A stack of its own, so the pickers inside a page have somewhere to push to.
                NavigationStack { page }
            }
            .navigationSplitViewStyle(.balanced)
        } else {
            NavigationStack(path: $path) { SettingsScreen() }
        }
    }

    @ViewBuilder private var page: some View {
        if let selectedPage {
            settingsPage(selectedPage)
        } else {
            ContentUnavailableView(L.titleSettings, systemImage: "gearshape")
        }
    }
}
