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
                    Button(L.actionCancel) { dismiss() }
                        .accessibilityIdentifier("sessionForm.cancel")
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionSave) {
                        Task { if await model.save() { dismiss() } }
                    }
                    .disabled(!model.canSave || model.isLoading)
                    .accessibilityIdentifier("sessionForm.save")
                }
            }
            .task { await model.load() }
            .alert(L.titleError, isPresented: $model.saveFailed) {
                Button(L.actionOk, role: .cancel) {}
            }
            .sheet(isPresented: $showsRpeHelp) {
                RpeHelpSheet().presentationDetents([.medium, .large])
            }
            .sheet(item: $editingMatch) { target in
                MatchEditorSheet(editing: target.match) { model.upsert($0) }
            }
        }
    }

    private var dateSection: some View {
        Section {
            DatePicker(L.labelDate, selection: $model.day, displayedComponents: .date)
        }
    }

    private var durationSection: some View {
        Section {
            HStack {
                Text(L.labelDuration)
                Spacer()
                Text(model.durationMinutes.formattedTrainingDuration).font(.body.weight(.semibold))
            }
            Slider(
                value: durationBinding,
                in: Double(SessionFormModel.durationRange.lowerBound)...Double(SessionFormModel.durationRange.upperBound),
                step: 5
            )
            .accessibilityValue(model.durationMinutes.formattedTrainingDuration)
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
                Button { showsRpeHelp = true } label: { Image(systemName: "questionmark.circle") }
                    .buttonStyle(.borderless)
                    .accessibilityLabel(L.helpIconContentDescription)
                Spacer()
                Text(model.rpe.formatted())
                    .font(.body.weight(.semibold))
                    .foregroundStyle(Color.rpe(model.rpe))
            }
            Slider(value: rpeBinding, in: 1...10, step: 1)
                .tint(Color.rpe(model.rpe))
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
                .font(.caption2)
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

    private var durationBinding: Binding<Double> {
        Binding(get: { Double(model.durationMinutes) }, set: { model.durationMinutes = Int($0) })
    }

    private var rpeBinding: Binding<Double> {
        Binding(get: { Double(model.rpe) }, set: { model.rpe = Int($0) })
    }
}

/// The RPE scale, ported from `help/RpeHelpContent.kt`.
struct RpeHelpSheet: View {
    @Environment(\.dismiss) private var dismiss

    /// Computed, not a `static let`: the strings resolve through the in-app language override, and
    /// a stored array would freeze whichever language was current when it was first touched.
    private var levels: [(Int, String)] {
        [(1, L.helpRpeLevel12), (3, L.helpRpeLevel34), (5, L.helpRpeLevel56),
         (7, L.helpRpeLevel78), (9, L.helpRpeLevel910)]
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Text(L.helpRpeDescription).font(.subheadline)
                }
                Section(L.helpRpeScaleIntro) {
                    ForEach(levels, id: \.0) { rpe, text in
                        Label {
                            Text(text)
                        } icon: {
                            Circle().fill(Color.rpe(rpe)).frame(width: 12, height: 12)
                        }
                    }
                }
                Section {
                    Text(L.helpRpeTip).font(.footnote).foregroundStyle(.secondary)
                }
            }
            .navigationTitle(L.helpRpeTitle)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionOk) { dismiss() }
                }
            }
        }
    }
}

enum MatchEditorTarget: Identifiable {
    case new
    case existing(PendingMatch)

    var match: PendingMatch? {
        switch self {
        case .new: nil
        case let .existing(match): match
        }
    }

    var id: String { match?.id ?? "new" }
}
