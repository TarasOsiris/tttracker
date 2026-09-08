import SwiftUI

struct SessionDetailsScreen: View {
    /// Clears the container's selection, which pops the pushed copy and empties the detail column.
    private let onDelete: () -> Void

    @StateModel private var model: SessionDetailsModel
    @Environment(\.locale) private var locale

    @State private var isEditing = false
    @State private var confirmsDelete = false

    init(sessionId: String, onDelete: @escaping () -> Void) {
        _model = StateModel(wrappedValue: SessionDetailsModel(sessionId: sessionId))
        self.onDelete = onDelete
    }

    var body: some View {
        Group {
            if let session = model.session {
                content(for: session)
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
                    Button(role: .destructive) { confirmsDelete = true } label: {
                        Image(systemName: "trash")
                    }
                    .accessibilityLabel(L.actionDelete)
                }
            }
        }
        .sheet(isPresented: $isEditing) {
            SessionFormScreen(sessionId: model.sessionId, day: model.session?.day ?? .now)
        }
        .confirmationDialog(L.deleteSessionTitle, isPresented: $confirmsDelete, titleVisibility: .visible) {
            Button(L.actionDelete, role: .destructive) {
                Task { if await model.delete() { onDelete() } }
            }
            Button(L.actionCancel, role: .cancel) {}
        } message: {
            Text(L.deleteSessionMessage)
        }
        .alert(L.titleError, isPresented: $model.deleteFailed) {
            Button(L.actionOk, role: .cancel) {}
        }
    }

    private func content(for session: SessionItem) -> some View {
        List {
            Section {
                LabeledContent(L.labelDate) {
                    Text(session.day, format: Date.FormatStyle(locale: locale).weekday(.wide).day().month(.wide).year())
                }
                LabeledContent(L.labelDuration, value: session.durationText)
                LabeledContent(L.labelSessionType) {
                    HStack(spacing: 6) {
                        Circle().fill(Color.sessionKind(session.kind)).frame(width: 10, height: 10)
                        Text(session.title)
                    }
                }
                LabeledContent(L.labelRpe) {
                    HStack(spacing: 6) {
                        Text(session.rpe.formatted()).foregroundStyle(Color.rpe(session.rpe))
                        Text(rpeLabel(session.rpe)).foregroundStyle(.secondary)
                    }
                }
            }
            if let notes = session.notes {
                Section(L.labelNotes) { Text(notes) }
            }
            if !session.matches.isEmpty {
                Section(L.sessionMatchesCount(session.matches.count)) {
                    ForEach(session.matches) { MatchDetailRow(match: $0) }
                }
            }
        }
    }
}

private struct MatchDetailRow: View {
    let match: MatchItem

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(spacing: 10) {
                Text(match.resultText)
                    .font(.caption.weight(.bold))
                    .foregroundStyle(.white)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(match.isWin ? Color.matchWin : Color.matchLoss, in: .capsule)
                Text(match.opponentName)
                Spacer()
                Text(match.scoreText).font(.body.weight(.semibold)).monospacedDigit()
            }
            if !tags.isEmpty {
                HStack(spacing: 6) {
                    ForEach(tags, id: \.self) { tag in
                        Text(tag)
                            .font(.caption2)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(Color(.tertiarySystemFill), in: .capsule)
                    }
                }
            }
            if let notes = match.notes {
                Text(notes).font(.caption).foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 2)
    }

    private var tags: [String] {
        var tags: [String] = []
        if match.isDoubles { tags.append(L.labelDoubles) }
        if match.isRanked { tags.append(L.labelRanked) }
        if let competition = match.competition { tags.append(competition.label) }
        return tags
    }
}
