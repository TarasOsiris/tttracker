import Charts
import SwiftUI

struct WeeklyChart: View {
    let model: AnalyticsModel
    let isWide: Bool

    @Environment(ProModel.self) private var pro: ProModel?
    @State private var showsPaywall = false

    var body: some View {
        VStack(spacing: 8) {
            rangePicker
            if model.weekly.allSatisfy({ $0.minutes == 0 }) {
                ContentUnavailableView(L.analyticsNoTraining, systemImage: "chart.bar")
            } else {
                chart
                WeeklyTotals(total: model.weeklyTotalMinutes, average: model.weeklyAverageMinutes)
            }
        }
        .sheet(isPresented: $showsPaywall) { ProPaywallSheet(source: .analyticsRange) }
    }

    /// The longer ranges stay listed for everyone; picking one without Pro opens the paywall and
    /// leaves the chart where it was.
    private var rangePicker: some View {
        Picker(L.analyticsRange, selection: Binding(
            get: { model.weeklyRange },
            set: { range in
                if range.needsPro && pro?.hasProFeatures != true {
                    showsPaywall = true
                } else {
                    model.weeklyRange = range
                }
            }
        )) {
            ForEach(WeeklyRange.allCases) { range in
                Text(range.label).tag(range)
            }
        }
        .pickerStyle(.segmented)
        .accessibilityIdentifier("analytics.weeklyRange")
    }

    private var chart: some View {
        Chart(model.weekly) { week in
            BarMark(
                x: .value(L.analyticsWeeklyTraining, week.start, unit: .weekOfYear),
                y: .value(L.analyticsWeeklyTraining, week.minutes)
            )
            // The most recent week is the last entry; tint it so "now" stands out.
            .foregroundStyle(week.id == model.weekly.count - 1 ? AnyShapeStyle(.tint) : AnyShapeStyle(Color.secondary))
            .cornerRadius(model.weekly.count > 26 ? 1 : 4)
        }
        .chartXAxis {
            AxisMarks(values: .automatic(desiredCount: model.weeklyRange == .eightWeeks ? 8 : 6)) { _ in
                AxisGridLine()
                AxisValueLabel(format: model.weeklyRange.axisFormat(weeks: model.weekly.count))
            }
        }
        // Room after the last bar, so a month label falling in the current week is not clipped by
        // the y axis.
        .chartXScale(range: .plotDimension(endPadding: model.weeklyRange == .eightWeeks ? 0 : 14))
        .frame(height: isWide ? 220 : 160)
    }
}
