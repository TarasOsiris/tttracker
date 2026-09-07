import SwiftUI

/// Sessions as two columns wherever there is room for them.
///
/// The day list is a custom `ScrollView` rather than a `List`, so a collapsed `NavigationSplitView`
/// would have no row selection to push from. The compact case therefore keeps a stack of its own —
/// but both cases navigate by the same selected id, so the screen below knows nothing about which
/// of the two it is in.
struct SessionsTab: View {
    @Binding var selectedSession: String?

    @Environment(\.horizontalSizeClass) private var horizontalSizeClass

    /// Owned here rather than by the screen: the two layouts are branches of an `if`, so crossing
    /// the size-class boundary — iPad multitasking, or a large iPhone rotating — discards the
    /// screen's state. Keeping the model above the branch spares it re-opening its Kotlin flows.
    @StateModel private var model = SessionsModel()

    var body: some View {
        if horizontalSizeClass.isWide {
            NavigationSplitView {
                SessionsScreen(model: model, selectedSession: $selectedSession, startsExpanded: true)
                    .sidebarColumnWidth()
            } detail: {
                detail
            }
            .navigationSplitViewStyle(.balanced)
        } else {
            NavigationStack {
                SessionsScreen(model: model, selectedSession: $selectedSession)
                    .navigationDestination(item: $selectedSession) { details(for: $0) }
            }
        }
    }

    /// Keyed on the id, because the screen builds its model from the session it was created with:
    /// reusing the view for another row would leave the first session's model in place. The pushed
    /// copy needs no key — a push builds a new view either way.
    @ViewBuilder private var detail: some View {
        if let selectedSession {
            details(for: selectedSession).id(selectedSession)
        } else {
            ContentUnavailableView(L.sessionsSelectPrompt, systemImage: "figure.table.tennis")
        }
    }

    /// Captures the binding rather than `self`, so the closure the details screen holds for its
    /// lifetime does not keep a copy of this view alive with it.
    private func details(for id: String) -> some View {
        let selection = $selectedSession
        return SessionDetailsScreen(sessionId: id) { selection.wrappedValue = nil }
    }
}
