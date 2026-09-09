import SwiftUI

struct MatchEditorSheet: View {
    let onSave: (PendingMatch) -> Void

    @StateModel private var model: MatchEditorModel
    @Environment(\.dismiss) private var dismiss

    init(editing match: PendingMatch?, onSave: @escaping (PendingMatch) -> Void) {
        self.onSave = onSave
        _model = StateModel(wrappedValue: MatchEditorModel(editing: match))
    }

    var body: some View {
        NavigationStack {
            Form {
                opponentSection
                scoreSection
                formatSection
                notesSection
            }
            .accessibilityIdentifier("screen.matchEditor")
            .navigationTitle(model.isEditing ? L.editMatch : L.addMatch)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(L.actionCancel, action: dismiss.callAsFunction)
                        .accessibilityIdentifier("matchEditor.cancel")
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionSave, action: save)
                        .disabled(!model.canSave)
                }
            }
        }
    }

    private func save() {
        onSave(model.result())
        dismiss()
    }

    private var opponentSection: some View {
        Section(L.labelOpponent) {
            TextField(L.labelOpponent, text: $model.opponentName)
                .textInputAutocapitalization(.words)
                .autocorrectionDisabled()
                .onChange(of: model.opponentName) { _, _ in model.nameChanged() }

            ForEach(model.suggestions) { opponent in
                Button {
                    model.choose(opponent)
                } label: {
                    HStack {
                        Text(opponent.name).foregroundStyle(.primary)
                        if let subtitle = opponent.subtitle {
                            Text(subtitle).font(.caption).foregroundStyle(.secondary)
                        }
                        Spacer()
                    }
                }
                .accessibilityElement(children: .combine)
            }
        }
    }

    private var scoreSection: some View {
        Section(L.labelScore) {
            Stepper(value: $model.myGamesWon, in: 0...99) {
                MatchScoreRow(label: L.labelMe, value: model.myGamesWon)
            }
            Stepper(value: $model.opponentGamesWon, in: 0...99) {
                MatchScoreRow(label: opponentLabel, value: model.opponentGamesWon)
            }
        }
    }

    private var opponentLabel: String {
        model.opponentName.nilIfBlank ?? L.labelOpponent
    }

    private var formatSection: some View {
        Section {
            Toggle(L.labelDoubles, isOn: $model.isDoubles)
            Toggle(L.labelRanked, isOn: $model.isRanked)
            Picker(L.labelCompetitionLevelOptional, selection: $model.competition) {
                Text(verbatim: "—").tag(Competition?.none)
                ForEach(Competition.allCases) { level in
                    Text(level.label).tag(Competition?.some(level))
                }
            }
        }
    }

    private var notesSection: some View {
        Section(L.labelMatchNotesOptional) {
            TextField(L.hintMatchNotes, text: $model.notes, axis: .vertical).lineLimit(2...5)
        }
    }
}
