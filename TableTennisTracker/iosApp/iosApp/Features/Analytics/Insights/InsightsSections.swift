import Charts
import SwiftUI

/// The Pro half of the analytics screen. Without Pro, a single blurred preview of the streak and
/// load stands in for all of it, so the free screen carries one lock rather than four.
struct InsightsSections: View {
    let model: InsightsModel
    let isWide: Bool

    @Environment(ProModel.self) private var pro: ProModel?

    var body: some View {
        if pro?.hasProFeatures == true {
            Section {
                StreakTiles(model: model, isWide: isWide)
            } header: {
                Text(L.analyticsInsights)
            } footer: {
                Text(L.analyticsStreakHint)
            }
            Section {
                TrainingLoadChart(model: model, isWide: isWide)
            } header: {
                Text(L.analyticsTrainingLoad)
            } footer: {
                Text(L.analyticsTrainingLoadHint)
            }
            Section(L.analyticsSessionTypes) { SessionTypeBreakdown(model: model) }
            HeadToHeadSection(model: model)
        } else {
            Section(L.analyticsInsights) {
                VStack(spacing: 16) {
                    StreakTiles(model: model, isWide: isWide)
                    TrainingLoadChart(model: model, isWide: isWide)
                }
                .padding(.vertical, 4)
                .proLocked(.analyticsInsights, caption: L.proBenefitInsightsDetail)
            }
        }
    }
}

private struct StreakTiles: View {
    let model: InsightsModel
    let isWide: Bool

    var body: some View {
        LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 12), count: 2), spacing: 12) {
            StatTile(emoji: "🔥", value: weeks(model.currentStreakWeeks), label: L.analyticsStreakCurrent)
            StatTile(emoji: "🏅", value: weeks(model.longestStreakWeeks), label: L.analyticsStreakLongest)
        }
        .padding(.vertical, 4)
    }

    /// "3 weeks", pluralised and translated by Foundation in the app's language.
    private func weeks(_ count: Int) -> Text {
        Text(Duration.seconds(count * 7 * 24 * 60 * 60), format: .units(allowed: [.weeks], width: .wide))
    }
}

private struct TrainingLoadChart: View {
    let model: InsightsModel
    let isWide: Bool

    var body: some View {
        if model.hasLoad {
            Chart(model.load) { week in
                BarMark(
                    x: .value(L.analyticsTrainingLoad, week.start, unit: .weekOfYear),
                    y: .value(L.analyticsTrainingLoad, week.load)
                )
                .foregroundStyle(week.id == model.load.count - 1 ? AnyShapeStyle(.tint) : AnyShapeStyle(Color.secondary))
                .cornerRadius(4)
            }
            .chartXAxis {
                AxisMarks(values: .automatic(desiredCount: 6)) { _ in
                    AxisGridLine()
                    AxisValueLabel(format: .dateTime.day().month(.defaultDigits))
                }
            }
            .frame(height: isWide ? 200 : 150)
        } else {
            ContentUnavailableView(L.analyticsNoTraining, systemImage: "flame")
        }
    }
}

private struct SessionTypeBreakdown: View {
    let model: InsightsModel

    var body: some View {
        if model.sessionTypes.isEmpty {
            ContentUnavailableView(L.analyticsNoTraining, systemImage: "list.bullet")
        } else {
            let most = max(model.sessionTypes.map(\.minutes).max() ?? 1, 1)
            ForEach(model.sessionTypes) { share in
                VStack(alignment: .leading, spacing: 6) {
                    LabeledContent(share.label) {
                        Text(share.minutes.trainingDuration, format: .trainingDuration)
                    }
                    ProgressView(value: Double(share.minutes), total: Double(most))
                        .tint(Color.sessionKind(share.kind))
                        .accessibilityHidden(true)
                }
                .padding(.vertical, 2)
                .accessibilityElement(children: .combine)
            }
        }
    }
}
