import SwiftUI

struct OpponentsScreen: View {
    @State private var model = OpponentsModel()
    @State private var editing: OpponentEditorTarget?
    @State private var pendingDeletion: Opponent?
    @State private var showsInfo = false

    var body: some View {
        List {
            ForEach(model.opponents) { opponent in
                Button { editing = .existing(opponent.id) } label: { row(opponent) }
                    .buttonStyle(.plain)
                    .swipeActions(edge: .trailing) {
                        Button(L.actionDelete, role: .destructive) { pendingDeletion = opponent }
                    }
            }
        }
        .overlay {
            if model.isLoaded && model.opponents.isEmpty {
                ContentUnavailableView(L.opponentsEmpty, systemImage: "person.2")
            }
        }
        .navigationTitle(L.titleOpponents)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button { showsInfo = true } label: {
                    Label(L.helpIconContentDescription, systemImage: "questionmark.circle")
                }
            }
            ToolbarItem(placement: .topBarTrailing) {
                Button { editing = .new } label: {
                    Label(L.actionAddOpponent, systemImage: "plus")
                }
            }
        }
        .sheet(item: $editing) { target in
            OpponentEditorSheet(opponentId: target.opponentId)
        }
        .alert(L.opponentsInfoTitle, isPresented: $showsInfo) {
            Button(L.actionOk, role: .cancel) {}
        } message: {
            Text(L.opponentsInfoMessage)
        }
        .confirmationDialog(
            L.deleteOpponentTitle,
            isPresented: .init(get: { pendingDeletion != nil }, set: { if !$0 { pendingDeletion = nil } }),
            titleVisibility: .visible
        ) {
            Button(L.actionDelete, role: .destructive) {
                if let opponent = pendingDeletion { model.delete(opponent) }
                pendingDeletion = nil
            }
            Button(L.actionCancel, role: .cancel) { pendingDeletion = nil }
        } message: {
            Text(L.deleteOpponentMessage)
        }
    }

    private func row(_ opponent: Opponent) -> some View {
        HStack(spacing: 12) {
            Text(opponent.initial)
                .font(.headline)
                .foregroundStyle(.white)
                .frame(width: 40, height: 40)
                .background(Color.accentColor, in: .circle)

            VStack(alignment: .leading, spacing: 2) {
                Text(opponent.name)
                if let subtitle = opponent.subtitle {
                    Text(subtitle).font(.subheadline).foregroundStyle(.secondary)
                }
                if let notes = opponent.notes {
                    Text(notes).font(.footnote).foregroundStyle(.secondary).lineLimit(2)
                }
            }
        }
    }
}

enum OpponentEditorTarget: Identifiable {
    case new
    case existing(String)

    var id: String {
        switch self {
        case .new: "new"
        case .existing(let id): id
        }
    }

    var opponentId: String? {
        switch self {
        case .new: nil
        case .existing(let id): id
        }
    }
}

struct OpponentEditorSheet: View {
    let opponentId: String?

    @State private var model: OpponentEditorModel
    @Environment(\.dismiss) private var dismiss

    init(opponentId: String?) {
        self.opponentId = opponentId
        _model = State(initialValue: OpponentEditorModel(opponentId: opponentId))
    }

    var body: some View {
        NavigationStack {
            Form {
                if model.isLoading {
                    ProgressView().frame(maxWidth: .infinity)
                } else {
                    fields
                }
            }
            .navigationTitle(model.isEditing ? L.actionEditOpponent : L.actionAddOpponent)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(L.actionCancel) { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionSave) {
                        Task {
                            await model.save()
                            dismiss()
                        }
                    }
                    .disabled(!model.canSave || model.isLoading)
                }
            }
            .task { await model.load() }
        }
    }

    @ViewBuilder
    private var fields: some View {
        Section {
            TextField(L.labelOpponentName, text: $model.name)
            TextField(L.labelOpponentClub, text: $model.club)
            TextField(L.labelOpponentRating, text: $model.rating).keyboardType(.numberPad)
        }

        Section(L.labelOpponentHandedness) {
            Picker(L.labelOpponentHandedness, selection: $model.handedness) {
                Text(verbatim: "—").tag(Handed?.none)
                ForEach(Handed.allCases) { Text($0.label).tag(Handed?.some($0)) }
            }
            .pickerStyle(.segmented)
            .labelsHidden()
        }

        Section(L.labelOpponentStyle) {
            Picker(L.labelOpponentStyle, selection: $model.style) {
                Text(verbatim: "—").tag(Style?.none)
                ForEach(Style.allCases) { Text($0.label).tag(Style?.some($0)) }
            }
            .pickerStyle(.navigationLink)
        }

        Section(L.labelOpponentNotes) {
            TextField(L.labelOpponentNotes, text: $model.notes, axis: .vertical)
                .lineLimit(3...6)
                .labelsHidden()
        }
    }
}
