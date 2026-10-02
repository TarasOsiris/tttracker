import SwiftUI

/// The round add button floating at the bottom trailing corner of the sessions list, where
/// Reminders keeps its own. On iOS 26 it is prominent glass; earlier systems get an accent circle.
struct AddSessionButton: View {
    let action: () -> Void

    private static let diameter: CGFloat = 56
    private static let margin: CGFloat = 16

    /// How much the list must leave below its last row for that row to scroll out from under it.
    static let clearance = diameter + margin * 2

    var body: some View {
        button
            .keyboardShortcut("n", modifiers: .command)
            .accessibilityLabel(L.actionAddSession)
            .accessibilityIdentifier("sessions.add")
            .padding(Self.margin)
    }

    @ViewBuilder private var button: some View {
        if #available(iOS 26.0, *) {
            Button(action: action) { icon }
                .buttonStyle(.glassProminent)
                .buttonBorderShape(.circle)
        } else {
            Button(action: action) {
                icon
                    .foregroundStyle(.white)
                    .background(.tint, in: Circle())
                    .shadow(color: .black.opacity(0.2), radius: 6, y: 3)
            }
            .buttonStyle(.plain)
        }
    }

    private var icon: some View {
        Image(systemName: "plus")
            .font(.title2.weight(.semibold))
            .frame(width: Self.diameter, height: Self.diameter)
    }
}
