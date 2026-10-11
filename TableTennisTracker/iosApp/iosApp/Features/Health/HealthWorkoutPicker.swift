import Observation
import Shared
import SwiftUI

/// The table tennis workouts a session could be linked to, minus those other sessions already have.
@MainActor
@Observable
final class HealthWorkoutPickerModel {
    /// The session being linked, which ranks its own day first; nil when importing a new one.
    struct Target {
        let day: Date
        let durationMinutes: Int
    }

    private(set) var workouts: [HealthWorkout] = []
    private(set) var suggestedId: String?
    private(set) var isLoading = true

    /// The last action that did not go through, if it has not been dismissed yet.
    var failure: OperationFailure?

    @ObservationIgnored private let target: Target?
    @ObservationIgnored private let health: HealthStore
    @ObservationIgnored private let sessions: any TrainingSessionService

    init(target: Target?, health: HealthStore = .shared, sessions: any TrainingSessionService = Services.sessions) {
        self.target = target
        self.health = health
        self.sessions = sessions
    }

    func load() async {
        defer { isLoading = false }
        do {
            try await health.requestAccess()
            let recent = try await health.recentWorkouts()
            let linked = try await Set(sessions.getAllSessions().compactMap(\.healthWorkoutId))
            guard let target, let day = target.day.kotlinLocalDate else {
                workouts = recent.filter { !linked.contains($0.id) }
                return
            }
            let candidates = recent.compactMap(\.candidate)
            let byId = Dictionary(uniqueKeysWithValues: recent.map { ($0.id, $0) })
            let matching = HealthWorkoutMatching.shared
            let duration = Int32(target.durationMinutes)
            workouts = matching.rank(date: day, durationMinutes: duration, candidates: candidates, linkedIds: linked)
                .compactMap { byId[$0.id] }
            suggestedId = matching.suggestion(date: day, durationMinutes: duration, candidates: candidates, linkedIds: linked)?.id
        } catch {
            failure = OperationFailure(error)
        }
    }
}

extension HealthWorkout {
    /// What `HealthWorkoutMatching` in `:core` ranks by.
    var candidate: HealthWorkoutCandidate? {
        start.kotlinLocalDate.map { HealthWorkoutCandidate(id: id, date: $0, durationMinutes: Int32(durationMinutes)) }
    }
}

struct HealthWorkoutPicker: View {
    let onPick: (HealthWorkout) -> Void

    @StateModel private var model: HealthWorkoutPickerModel
    @Environment(\.dismiss) private var dismiss

    init(target: HealthWorkoutPickerModel.Target? = nil, onPick: @escaping (HealthWorkout) -> Void) {
        _model = StateModel(wrappedValue: HealthWorkoutPickerModel(target: target))
        self.onPick = onPick
    }

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading {
                    ProgressView().frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if model.workouts.isEmpty {
                    ContentUnavailableView {
                        Label(L.healthPickerEmptyTitle, systemImage: "figure.table.tennis")
                    } description: {
                        Text(L.healthPickerEmptyMessage)
                    }
                } else {
                    List(model.workouts) { workout in
                        Button {
                            onPick(workout)
                            dismiss()
                        } label: {
                            HealthWorkoutRow(workout: workout, isSuggested: workout.id == model.suggestedId)
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .accessibilityIdentifier("screen.healthWorkoutPicker")
            .navigationTitle(L.healthPickerTitle)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    CancelButton(action: dismiss.callAsFunction)
                }
            }
            .task { await model.load() }
            .failureAlert($model.failure)
        }
    }
}

/// One workout: when it was, how long, and where it came from.
struct HealthWorkoutRow: View {
    let workout: HealthWorkout
    var isSuggested = false

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "figure.table.tennis")
                .font(.title3)
                .foregroundStyle(.pink)
                .frame(width: 28)
            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 6) {
                    Text(workout.start, format: .dateTime.weekday(.abbreviated).day().month())
                        .font(.body.weight(.semibold))
                    if isSuggested {
                        Text(L.healthSuggested)
                            .font(.caption2.weight(.semibold))
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(.tint.opacity(0.15), in: Capsule())
                            .foregroundStyle(.tint)
                    }
                }
                Text(workout.timeRange)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                Text(workout.sourceName)
                    .font(.caption)
                    .foregroundStyle(.tertiary)
            }
            Spacer()
            VStack(alignment: .trailing, spacing: 2) {
                Text(workout.durationMinutes.trainingDuration, format: .trainingDuration)
                    .font(.subheadline.weight(.semibold))
                if let energy = workout.activeEnergy {
                    Text(energy).font(.caption).foregroundStyle(.secondary)
                }
            }
        }
        .contentShape(Rectangle())
        .accessibilityElement(children: .combine)
    }
}

extension HealthWorkout {
    var timeRange: String { (start..<end).formatted(.interval.hour().minute()) }

    var activeEnergy: String? {
        activeEnergyKilocalories.map {
            Measurement(value: $0, unit: UnitEnergy.kilocalories)
                .formatted(.measurement(width: .abbreviated, usage: .workout, numberFormatStyle: .number.precision(.fractionLength(0))))
        }
    }
}
