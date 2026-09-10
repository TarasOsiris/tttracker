import SwiftUI

/// Everything recorded about one session.
struct SessionDetailsList: View {
    let session: SessionItem

    @Environment(\.locale) private var locale

    var body: some View {
        List {
            Section {
                LabeledContent(L.labelDate) {
                    Text(session.day, format: .fullDay(locale))
                }
                LabeledContent(L.labelDuration) {
                    Text(session.durationMinutes.trainingDuration, format: .trainingDuration)
                }
                LabeledContent(L.labelSessionType) {
                    HStack(spacing: 6) {
                        Circle().fill(Color.sessionKind(session.kind)).frame(width: 10, height: 10)
                        Text(session.title)
                    }
                }
                LabeledContent(L.labelRpe) {
                    HStack(spacing: 6) {
                        RpeBadge(rpe: session.rpe, namesItself: false)
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
