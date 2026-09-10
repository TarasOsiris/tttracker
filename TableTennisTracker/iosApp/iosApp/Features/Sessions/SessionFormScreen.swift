import SwiftUI

struct SessionFormScreen: View {
    @StateModel private var model: SessionFormModel
    @Environment(\.dismiss) private var dismiss
    @State private var showsRpeHelp = false
    @State private var editingMatch: MatchEditorTarget?

    init(sessionId: String? = nil, day: Date) {
        _model = StateModel(wrappedValue: SessionFormModel(sessionId: sessionId, day: day))
    }

    var body: some View {
        NavigationStack {
            Form {
                if model.isLoading {
                    ProgressView().frame(maxWidth: .infinity)
                } else {
                    dateSection
                    durationSection
                    typeSection
                    rpeSection
                    notesSection
                    matchesSection
                }
            }
            .accessibilityIdentifier("screen.sessionForm")
            .navigationTitle(model.isEditing ? L.actionEdit : L.titleCreateSession)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(L.actionCancel, action: dismiss.callAsFunction)
                        .accessibilityIdentifier("sessionForm.cancel")
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionSave, action: save)
                        .disabled(!model.canSave || model.isLoading)
                        .accessibilityIdentifier("sessionForm.save")
                }
            }
            .task { await model.load() }
            .failureAlert($model.failure)
            .sheet(isPresented: $showsRpeHelp) {
                RpeHelpSheet().presentationDetents([.medium, .large])
            }
            .sheet(item: $editingMatch) { target in
                MatchEditorSheet(editing: target.match) { model.upsert($0) }
            }
        }
    }

    private func save() {
        Task { if await model.save() { dismiss() } }
    }

    private var dateSection: some View {
        Section {
            DatePicker(L.labelDate, selection: $model.day, displayedComponents: .date)
        }
    }

    private var durationSection: some View {
        Section {
            LabeledContent(L.labelDuration) {
                Text(model.durationMinutes.trainingDuration, format: .trainingDuration)
                    .font(.body.weight(.semibold))
            }
            Slider(
                value: $model.duration,
                in: Double(SessionFormModel.durationRange.lowerBound)...Double(SessionFormModel.durationRange.upperBound),
                step: 5
            )
            .accessibilityLabel(L.labelDuration)
            .accessibilityValue(
                Text(model.durationMinutes.trainingDuration, format: .trainingDuration)
            )
        }
    }

    private var typeSection: some View {
        Section {
            Picker(L.labelSessionType, selection: $model.kind) {
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

    private var rpeSection: some View {
        Section {
            HStack {
                Text(L.labelIntensityRpe)
                Button(L.helpIconContentDescription, systemImage: "questionmark.circle") {
                    showsRpeHelp = true
                }
                .labelStyle(.iconOnly)
                .buttonStyle(.borderless)
                .minimumTapTarget()
                Spacer()
                RpeBadge(rpe: model.rpe, namesItself: false)
            }
            Slider(value: $model.intensity, in: 1...10, step: 1)
                .tint(Color.rpe(model.rpe))
                .accessibilityLabel(L.labelIntensityRpe)
                .accessibilityValue(rpeLabel(model.rpe))
            Text(rpeLabel(model.rpe)).font(.caption).foregroundStyle(.secondary)
        }
    }

    private var notesSection: some View {
        Section(L.labelNotesOptional) {
            TextField(L.hintNotes, text: $model.notes, axis: .vertical)
                .lineLimit(3...8)
                .onChange(of: model.notes) { _, new in
                    if new.count > SessionFormModel.notesLimit {
                        model.notes = String(new.prefix(SessionFormModel.notesLimit))
                    }
                }
            Text(L.counterNotes(model.notes.count))
                .font(.caption)
                .foregroundStyle(.secondary)
                .frame(maxWidth: .infinity, alignment: .trailing)
        }
    }

    private var matchesSection: some View {
        Section(L.labelMatchesOptional) {
            if model.matches.isEmpty {
                Text(L.matchesEmptyHint).font(.caption).foregroundStyle(.secondary)
            }
            ForEach(model.matches) { match in
                Button { editingMatch = .existing(match) } label: {
                    PendingMatchRow(match: match)
                }
                .buttonStyle(.plain)
                .swipeActions {
                    Button(L.actionDelete, role: .destructive) { model.remove(match) }
                }
            }
            Button(L.actionAddMatch, systemImage: "plus") { editingMatch = .new }
                .accessibilityIdentifier("sessionForm.addMatch")
        }
    }
}
