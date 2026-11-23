import SwiftUI

/// The duration rows shared by the session form and the defaults in General settings.
struct DurationSliderRows: View {
    @Binding var duration: Double

    private var minutes: Int { Int(duration.rounded()) }

    var body: some View {
        LabeledContent(L.labelDuration) {
            Text(minutes.trainingDuration, format: .trainingDuration)
                .font(.body.weight(.semibold))
        }
        Slider(value: $duration, in: SessionFormModel.durationSliderRange, step: 5)
            .accessibilityLabel(L.labelDuration)
            .accessibilityValue(Text(minutes.trainingDuration, format: .trainingDuration))
    }
}

struct SessionKindPicker: View {
    @Binding var selection: SessionKind

    var body: some View {
        Picker(L.labelSessionType, selection: $selection) {
            ForEach(SessionKind.allCases) { kind in
                Label {
                    Text(kind.label)
                } icon: {
                    Circle().fill(Color.sessionKind(kind)).frame(width: 10, height: 10)
                }
                .tag(kind)
            }
        }
    }
}
