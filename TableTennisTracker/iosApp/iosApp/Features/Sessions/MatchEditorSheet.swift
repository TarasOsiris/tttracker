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
            .navigationTitle(model.isEditing ? L.editMatch : L.addMatch)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(L.actionCancel) { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionSave) {
                        onSave(model.result())
                        dismiss()
                    }
                    .disabled(!model.canSave)
                }
            }
        }
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
            }
        }
    }

    private var scoreSection: some View {
        Section(L.labelScore) {
            Stepper(value: $model.myGamesWon, in: 0...99) {
                scoreRow(label: L.labelMe, value: model.myGamesWon)
            }
            Stepper(value: $model.opponentGamesWon, in: 0...99) {
                scoreRow(label: opponentLabel, value: model.opponentGamesWon)
            }
        }
    }

    private func scoreRow(label: String, value: Int) -> some View {
        HStack {
            Text(label)
            Spacer()
            Text(value.formatted()).font(.body.weight(.semibold)).monospacedDigit()
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

/// One entered match on the session form.
struct PendingMatchRow: View {
    let match: PendingMatch

    var body: some View {
        HStack(spacing: 12) {
            Text(match.resultText)
                .font(.caption.weight(.bold))
                .foregroundStyle(.white)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(match.isWin ? Color.matchWin : Color.matchLoss, in: .capsule)

            VStack(alignment: .leading, spacing: 2) {
                Text(match.opponentName)
                if let notes = match.notes {
                    Text(notes).font(.caption2).foregroundStyle(.secondary).lineLimit(2)
                }
            }

            Spacer(minLength: 8)

            Text(match.scoreText).font(.body.weight(.semibold)).monospacedDigit()
        }
    }
}
