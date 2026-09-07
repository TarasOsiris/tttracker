import Charts
import SwiftUI

struct AnalyticsScreen: View {
    @State private var model = AnalyticsModel()
    @State private var showsSettings = false

    var body: some View {
        List {
            if model.visibility.summary { SummarySection(model: model) }
            if model.visibility.winLoss { WinLossSection(model: model) }
            if model.visibility.weekly { WeeklySection(model: model) }
            if model.visibility.heatmap { HeatmapSection(model: model) }
        }
        .navigationTitle(L.navAnalytics)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button { showsSettings = true } label: {
                    Label(L.analyticsSettingsTitle, systemImage: "gearshape")
                }
            }
        }
        .sheet(isPresented: $showsSettings) { AnalyticsSettingsSheet(model: model) }
    }
}

private struct SummarySection: View {
    let model: AnalyticsModel

    var body: some View {
        Section(L.analyticsSummary) {
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                StatTile(emoji: "🏓", value: "\(model.totalSessions)", label: L.analyticsTotalSessions)
                StatTile(emoji: "⏱️", value: formattedTotal, label: L.analyticsTotalTime)
                StatTile(
                    emoji: "🏆",
                    value: "\(model.matchesWon) - \(model.matchesLost)",
                    label: L.analyticsWinLoss
                )
                StatTile(emoji: "📈", value: formattedWinRate, label: L.analyticsWinRate, tint: winRateTint)
            }
            .padding(.vertical, 4)
        }
    }

    /// Foundation pluralises and orders the units correctly in all 14 locales, which the hand-rolled
    /// `%1$dh %2$dm` string could not.
    private var formattedTotal: String {
        Duration.seconds(model.totalMinutes * 60)
            .formatted(.units(allowed: [.hours, .minutes], width: .abbreviated))
    }

    private var formattedWinRate: String {
        guard let rate = model.winRate else { return "—" }
        return rate.formatted(.percent.precision(.fractionLength(0)))
    }

    private var winRateTint: Color? {
        guard let rate = model.winRate else { return nil }
        return rate >= 0.5 ? .matchWin : .matchLoss
    }
}

private struct StatTile: View {
    let emoji: String
    let value: String
    let label: String
    var tint: Color?

    var body: some View {
        VStack(spacing: 4) {
            Text(emoji)
            Text(value).font(.title3).bold().foregroundStyle(tint ?? .primary)
            Text(label).font(.caption).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 8)
        .background(Color(.secondarySystemGroupedBackground), in: .rect(cornerRadius: 12))
    }
}

private struct WinLossSection: View {
    let model: AnalyticsModel

    var body: some View {
        Section(L.analyticsWinLossChart) {
            if model.totalMatches == 0 {
                ContentUnavailableView(L.analyticsNoMatches, systemImage: "chart.pie")
            } else {
                Chart {
                    SectorMark(
                        angle: .value(L.analyticsWins, model.matchesWon),
                        innerRadius: .ratio(0.6),
                        angularInset: 1.5
                    )
                    .foregroundStyle(Color.matchWin)
                    .annotation(position: .overlay) { Text("\(model.matchesWon)").font(.caption).bold() }

                    SectorMark(
                        angle: .value(L.analyticsLosses, model.matchesLost),
                        innerRadius: .ratio(0.6),
                        angularInset: 1.5
                    )
                    .foregroundStyle(Color.matchLoss)
                    .annotation(position: .overlay) { Text("\(model.matchesLost)").font(.caption).bold() }
                }
                .frame(height: 180)

                HStack(spacing: 16) {
                    LegendDot(color: .matchWin, label: L.analyticsWins)
                    LegendDot(color: .matchLoss, label: L.analyticsLosses)
                }
                .frame(maxWidth: .infinity)
            }
        }
    }
}

private struct LegendDot: View {
    let color: Color
    let label: String

    var body: some View {
        HStack(spacing: 6) {
            Circle().fill(color).frame(width: 10, height: 10)
            Text(label).font(.caption).foregroundStyle(.secondary)
        }
    }
}

private struct WeeklySection: View {
    let model: AnalyticsModel

    var body: some View {
        Section(L.analyticsWeeklyTraining) {
            if model.weekly.allSatisfy({ $0.minutes == 0 }) {
                ContentUnavailableView(L.analyticsNoTraining, systemImage: "chart.bar")
            } else {
                Chart(model.weekly) { week in
                    BarMark(
                        x: .value(L.analyticsWeeklyTraining, week.label),
                        y: .value(L.analyticsWeeklyTraining, week.minutes)
                    )
                    // The most recent week is the last entry; tint it so "now" stands out.
                    .foregroundStyle(week.id == model.weekly.count - 1 ? Color.accentColor : Color.secondary)
                    .cornerRadius(4)
                }
                .frame(height: 160)

                HStack {
                    Text(L.analyticsWeeklyTotal).foregroundStyle(.secondary)
                    Spacer()
                    Text(formatted(model.weekly.reduce(0) { $0 + $1.minutes }))
                }
                .font(.caption)
                HStack {
                    Text(L.analyticsWeeklyAvg).foregroundStyle(.secondary)
                    Spacer()
                    Text(formatted(average))
                }
                .font(.caption)
            }
        }
    }

    private var average: Int {
        guard !model.weekly.isEmpty else { return 0 }
        return model.weekly.reduce(0) { $0 + $1.minutes } / model.weekly.count
    }

    private func formatted(_ minutes: Int) -> String {
        Duration.seconds(minutes * 60)
            .formatted(.units(allowed: [.hours, .minutes], width: .abbreviated))
    }
}

private struct AnalyticsSettingsSheet: View {
    let model: AnalyticsModel
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                Toggle(L.analyticsWidgetSummary, isOn: binding(\.summary, model.setSummaryVisible))
                Toggle(L.analyticsWidgetWinLoss, isOn: binding(\.winLoss, model.setWinLossVisible))
                Toggle(L.analyticsWidgetWeekly, isOn: binding(\.weekly, model.setWeeklyVisible))
                Toggle(L.analyticsWidgetHeatmap, isOn: binding(\.heatmap, model.setHeatmapVisible))
            }
            .navigationTitle(L.analyticsSettingsTitle)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionClose) { dismiss() }
                }
            }
        }
        .presentationDetents([.medium])
    }

    private func binding(
        _ keyPath: KeyPath<WidgetVisibility, Bool>,
        _ set: @escaping (Bool) -> Void
    ) -> Binding<Bool> {
        Binding(get: { model.visibility[keyPath: keyPath] }, set: set)
    }
}
