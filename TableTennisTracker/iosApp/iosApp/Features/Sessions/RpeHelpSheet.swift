import SwiftUI

/// The RPE scale, ported from `help/RpeHelpContent.kt`.
struct RpeHelpSheet: View {
    @Environment(\.dismiss) private var dismiss

    /// Computed, not a `static let`: the strings resolve through the in-app language override, and
    /// a stored array would freeze whichever language was current when it was first touched.
    private var levels: [RpeHelpLevel] {
        [
            RpeHelpLevel(rpe: 1, text: L.helpRpeLevel12),
            RpeHelpLevel(rpe: 3, text: L.helpRpeLevel34),
            RpeHelpLevel(rpe: 5, text: L.helpRpeLevel56),
            RpeHelpLevel(rpe: 7, text: L.helpRpeLevel78),
            RpeHelpLevel(rpe: 9, text: L.helpRpeLevel910)
        ]
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Text(L.helpRpeDescription).font(.subheadline)
                }
                Section(L.helpRpeScaleIntro) {
                    ForEach(levels) { level in
                        Label {
                            Text(level.text)
                        } icon: {
                            Circle().fill(Color.rpe(level.rpe)).frame(width: 12, height: 12)
                        }
                    }
                }
                Section {
                    Text(L.helpRpeTip).font(.footnote).foregroundStyle(.secondary)
                }
            }
            .navigationTitle(L.helpRpeTitle)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionOk, action: dismiss.callAsFunction)
                }
            }
        }
    }
}
