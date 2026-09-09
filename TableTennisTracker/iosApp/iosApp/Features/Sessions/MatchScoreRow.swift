import SwiftUI

/// One side's game count, as the label of a `Stepper`.
struct MatchScoreRow: View {
    let label: String
    let value: Int

    var body: some View {
        LabeledContent {
            Text(value, format: .integer).font(.body.weight(.semibold)).monospacedDigit()
        } label: {
            Text(label)
        }
    }
}
