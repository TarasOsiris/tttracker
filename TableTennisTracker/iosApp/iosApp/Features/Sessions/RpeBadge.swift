import SwiftUI

/// The exertion number, as ink on its own ramp colour.
///
/// Tinting the digit instead put the middle of the ramp — a mid yellow — on a light fill at under
/// 2:1. Filling the circle and taking the ink from the fill keeps the colour coding and leaves the
/// number readable at every level.
struct RpeBadge: View {
    let rpe: Int

    /// `false` where the row around it already says "Intensity (RPE)", so VoiceOver does not say
    /// it twice.
    var namesItself = true

    var body: some View {
        if namesItself {
            digit
                .accessibilityLabel(L.labelRpe)
                .accessibilityValue(Text(rpe, format: .integer))
        } else {
            digit
        }
    }

    private var digit: some View {
        Text(rpe, format: .integer)
            .font(.callout.weight(.semibold))
            .foregroundStyle(Color.rpeInk(rpe))
            .frame(minWidth: 32, minHeight: 32)
            .background(Color.rpe(rpe), in: .circle)
    }
}
