import Charts
import SwiftUI

/// The session's Apple Health workout in its details: linking one, or what it recorded.
struct SessionHealthSection: View {
    let session: SessionItem
    let model: SessionHealthModel

    @State private var picksWorkout = false

    var body: some View {
        content
            .task(id: session.healthWorkoutId) { await model.refresh(for: session) }
            .sheet(isPresented: $picksWorkout) {
                HealthWorkoutPicker(target: .init(day: session.day, durationMinutes: session.durationMinutes)) { workout in
                    Task { await model.link(workout, to: session, via: "picker") }
                }
            }
    }

    @ViewBuilder
    private var content: some View {
        switch model.state {
        case .unavailable:
            EmptyView()
        case .loading:
            Section(L.healthSectionTitle) {
                ProgressView().frame(maxWidth: .infinity)
            }
        case .unlinked(let suggestion):
            Section {
                if let suggestion {
                    Button {
                        Task { await model.link(suggestion, to: session, via: "suggestion") }
                    } label: {
                        HealthWorkoutRow(workout: suggestion, isSuggested: true)
                    }
                    .buttonStyle(.plain)
                    .accessibilityHint(L.healthLinkAction)
                }
                Button(L.healthLinkAction, systemImage: "link") { picksWorkout = true }
                    .accessibilityIdentifier("sessionDetails.linkHealth")
            } header: {
                Text(L.healthSectionTitle)
            } footer: {
                if suggestion != nil { Text(L.healthSuggestionHint) }
            }
        case .needsAccess:
            Section {
                Button(L.healthConnectAction, systemImage: "heart.fill") {
                    Task { await model.connect(session) }
                }
            } header: {
                Text(L.healthSectionTitle)
            } footer: {
                Text(L.healthConnectHint)
            }
        case .missing:
            Section(L.healthSectionTitle) {
                Text(L.healthWorkoutMissing).foregroundStyle(.secondary)
                unlinkButton
            }
        case .linked(let workout):
            Section {
                LabeledContent(L.healthTime, value: workout.timeRange)
                LabeledContent(L.healthWorkout) {
                    Text(workout.durationMinutes.trainingDuration, format: .trainingDuration)
                }
                if let energy = workout.activeEnergy {
                    LabeledContent(L.healthActiveEnergy, value: energy)
                }
                HeartRateSummary(workout: workout, points: model.heartRate)
                    .proLocked(.healthHeartRate, caption: L.healthHeartRateLocked)
                unlinkButton
            } header: {
                Text(L.healthSectionTitle)
            } footer: {
                Text(workout.sourceName)
            }
        }
    }

    private var unlinkButton: some View {
        Button(L.healthUnlinkAction, systemImage: "link.badge.minus", role: .destructive) {
            Task { await model.unlink(session) }
        }
    }
}

/// Average and max heart rate, and the minute-by-minute line under them.
private struct HeartRateSummary: View {
    let workout: HealthWorkout
    let points: [HeartRatePoint]

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label(L.healthHeartRate, systemImage: "heart.fill")
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(.pink)
            if let average = workout.averageHeartRate, let max = workout.maxHeartRate {
                HStack(spacing: 32) {
                    stat(L.healthHeartRateAverage, average)
                    stat(L.healthHeartRateMax, max)
                }
                if points.count > 1 {
                    Chart(points) { point in
                        LineMark(
                            x: .value(L.healthTime, point.time),
                            y: .value(L.healthHeartRate, point.beatsPerMinute)
                        )
                        .interpolationMethod(.catmullRom)
                        .foregroundStyle(.pink)
                    }
                    .chartYScale(domain: .automatic(includesZero: false))
                    .frame(height: 140)
                }
            } else {
                Text(L.healthHeartRateEmpty).font(.footnote).foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 4)
    }

    private func stat(_ title: String, _ beatsPerMinute: Double) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(title).font(.caption).foregroundStyle(.secondary)
            Text(L.healthBpmFormat(Int(beatsPerMinute.rounded()))).font(.title3.weight(.semibold))
        }
        .accessibilityElement(children: .combine)
    }
}
