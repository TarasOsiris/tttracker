import SwiftUI

struct OpponentsScreen: View {
    @StateModel private var model = OpponentsModel()
    @State private var editing: OpponentEditorTarget?
    @State private var pendingDeletion: Opponent?
    @State private var showsInfo = false

    var body: some View {
        List {
            ForEach(model.opponents) { opponent in
                Button { editing = .existing(opponent.id) } label: {
                    OpponentRow(opponent: opponent)
                }
                .buttonStyle(.plain)
                .swipeActions(edge: .trailing) {
                    Button(L.actionDelete, role: .destructive) { pendingDeletion = opponent }
                }
            }
        }
        .overlay {
            if model.isLoaded && model.opponents.isEmpty {
                ContentUnavailableView(L.opponentsEmpty, systemImage: "person.2")
            }
        }
        .accessibilityIdentifier(SettingsRoute.opponents.screenIdentifier)
        .navigationTitle(L.titleOpponents)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button(L.helpIconContentDescription, systemImage: "questionmark.circle") {
                    showsInfo = true
                }
            }
            ToolbarItem(placement: .topBarTrailing) {
                Button(L.actionAddOpponent, systemImage: "plus") { editing = .new }
            }
        }
        .sheet(item: $editing) { target in
            OpponentEditorSheet(opponentId: target.opponentId)
        }
        .alert(L.opponentsInfoTitle, isPresented: $showsInfo) { } message: {
            Text(L.opponentsInfoMessage)
        }
        .failureAlert($model.failure)
        .confirmationDialog(
            L.deleteOpponentTitle,
            isPresented: $pendingDeletion.isPresent(),
            titleVisibility: .visible,
            presenting: pendingDeletion
        ) { opponent in
            Button(L.actionDelete, role: .destructive) { model.delete(opponent) }
            Button(L.actionCancel, role: .cancel) {}
        } message: { _ in
            Text(L.deleteOpponentMessage)
        }
    }
}
