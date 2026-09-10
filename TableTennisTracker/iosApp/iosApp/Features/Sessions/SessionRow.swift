import SwiftUI

struct SessionRow: View {
    let session: SessionItem
    var isSelected = false

    var body: some View {
        HStack(spacing: 12) {
            RoundedRectangle(cornerRadius: 2)
                .fill(Color.sessionKind(session.kind))
                .frame(width: 4, height: 40)

            VStack(alignment: .leading, spacing: 2) {
                Text(session.title).font(.body)
                Text(session.durationMinutes.trainingDuration, format: .trainingDuration)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                if let notes = session.notes {
                    // `.caption2` at `.tertiary` was small and faint enough to be hard to read
                    // before Dynamic Type entered into it.
                    Text(notes).font(.caption).foregroundStyle(.secondary).lineLimit(1)
                }
            }

            Spacer(minLength: 8)

            RpeBadge(rpe: session.rpe)
        }
        .padding(12)
        .background(background, in: .rect(cornerRadius: 12))
        .contentShape(.rect(cornerRadius: 12))
        // One row is one session: read cell by cell it announces a colour bar and a loose number.
        .accessibilityElement(children: .combine)
    }

    private var background: Color {
        isSelected ? .selection : Color(.secondarySystemGroupedBackground)
    }
}
