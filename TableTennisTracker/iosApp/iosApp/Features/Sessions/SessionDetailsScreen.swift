import SwiftUI

struct SessionDetailsScreen: View {
    /// Clears the container's selection, which pops the pushed copy and empties the detail column.
    private let onDelete: () -> Void

    @StateModel private var model: SessionDetailsModel

    @State private var isEditing = false
    @State private var confirmsDelete = false

    init(sessionId: String, onDelete: @escaping () -> Void) {
        _model = StateModel(wrappedValue: SessionDetailsModel(sessionId: sessionId))
        self.onDelete = onDelete
    }

    var body: some View {
        Group {
            if let session = model.session {
                SessionDetailsList(session: session)
            } else if model.isLoading {
                ProgressView().frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                ContentUnavailableView(L.titleError, systemImage: "exclamationmark.triangle")
            }
        }
        .accessibilityIdentifier("screen.sessionDetails")
        .navigationTitle(model.session?.title ?? "")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            if model.session != nil {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(L.actionEdit) { isEditing = true }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button(L.actionDelete, systemImage: "trash", role: .destructive) {
                        confirmsDelete = true
                    }
                    // Attached to the button that opens it, so the dialog animates out of its
                    // source rather than out of the screen.
                    .confirmationDialog(
                        L.deleteSessionTitle,
                        isPresented: $confirmsDelete,
                        titleVisibility: .visible
                    ) {
                        Button(L.actionDelete, role: .destructive, action: delete)
                        Button(L.actionCancel, role: .cancel) {}
                    } message: {
                        Text(L.deleteSessionMessage)
                    }
                }
            }
        }
        .sheet(isPresented: $isEditing) {
            SessionFormScreen(sessionId: model.sessionId, day: model.session?.day ?? .now)
        }
        .failureAlert($model.failure)
    }

    private func delete() {
        Task { if await model.delete() { onDelete() } }
    }
}
