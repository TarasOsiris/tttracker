/// RPE 1...10 to its label, matching `getRpeLabel` in the Compose UI.
func rpeLabel(_ rpe: Int) -> String {
    switch rpe {
    case 1, 2: L.rpeVeryEasy
    case 3, 4: L.rpeEasy
    case 5, 6: L.rpeModerate
    case 7, 8: L.rpeHard
    case 9, 10: L.rpeMaxEffort
    default: ""
    }
}
