/// One band of the RPE scale, as shown in the help sheet.
struct RpeHelpLevel: Identifiable {
    /// The lowest RPE in the band, which also picks the swatch colour.
    let rpe: Int
    let text: String

    var id: Int { rpe }
}
