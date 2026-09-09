import SwiftUI

struct OpponentEditorSheet: View {
    @StateModel private var model: OpponentEditorModel
    @Environment(\.dismiss) private var dismiss

    init(opponentId: String?) {
        _model = StateModel(wrappedValue: OpponentEditorModel(opponentId: opponentId))
    }

    var body: some View {
        NavigationStack {
            Form {
                if model.isLoading {
                    ProgressView().frame(maxWidth: .infinity)
                } else {
                    fields
                }
            }
            .navigationTitle(model.isEditing ? L.actionEditOpponent : L.actionAddOpponent)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(L.actionCancel, action: dismiss.callAsFunction)
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionSave, action: save)
                        .disabled(!model.canSave || model.isLoading)
                }
            }
            .task { await model.load() }
            .failureAlert($model.failure)
        }
    }

    private func save() {
        Task { if await model.save() { dismiss() } }
    }

    @ViewBuilder
    private var fields: some View {
        Section {
            TextField(L.labelOpponentName, text: $model.name)
            TextField(L.labelOpponentClub, text: $model.club)
            // Bound to the `Double?` itself: ratings carry a decimal, so the field needs the
            // decimal keyboard and locale-aware parsing rather than a hand-rolled `Double.init`.
            TextField(L.labelOpponentRating, value: $model.rating, format: .number)
                .keyboardType(.decimalPad)
        }

        Section(L.labelOpponentHandedness) {
            Picker(L.labelOpponentHandedness, selection: $model.handedness) {
                Text(verbatim: "—").tag(Handed?.none)
                ForEach(Handed.allCases) { Text($0.label).tag(Handed?.some($0)) }
            }
            .pickerStyle(.segmented)
            .labelsHidden()
        }

        Section(L.labelOpponentStyle) {
            Picker(L.labelOpponentStyle, selection: $model.style) {
                Text(verbatim: "—").tag(Style?.none)
                ForEach(Style.allCases) { Text($0.label).tag(Style?.some($0)) }
            }
            .pickerStyle(.navigationLink)
        }

        Section(L.labelOpponentNotes) {
            TextField(L.labelOpponentNotes, text: $model.notes, axis: .vertical)
                .lineLimit(3...6)
                .labelsHidden()
        }
    }
}
