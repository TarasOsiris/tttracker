import SwiftUI

struct SessionsScreen: View {
    let model: SessionsModel

    /// The session the container is showing. What selecting one does — push a screen or fill a
    /// detail column — is the container's business, not this screen's.
    @Binding var selectedSession: String?

    /// The day at the top of the list. One piece of state drives both directions of the sync:
    /// scrolling writes it, and the calendar writes it to scroll. Because the calendar is a pure
    /// function of it, there is no second position that could disagree and no loop to arbitrate.
    @State private var topDay: Date?
    @State private var isCalendarExpanded = false
    @State private var isCreating = false

    @Environment(\.scenePhase) private var scenePhase

    init(model: SessionsModel, selectedSession: Binding<String?>, startsExpanded: Bool = false) {
        self.model = model
        _selectedSession = selectedSession
        _isCalendarExpanded = State(initialValue: startsExpanded)
    }

    var body: some View {
        VStack(spacing: 0) {
            SessionCalendar(model: model, selection: selection, isExpanded: $isCalendarExpanded)
            Divider()
            dayList
        }
        .onChange(of: scenePhase) { _, phase in
            if phase == .active { model.refreshToday() }
        }
        .sheet(isPresented: $isCreating) {
            SessionFormScreen(day: topDay ?? model.today)
        }
        .navigationTitle(L.navSessions)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            if let topDay, topDay != model.today {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(L.timeToday) { self.topDay = model.today }
                        .keyboardShortcut("t", modifiers: .command)
                }
            }
            ToolbarItem(placement: .topBarTrailing) {
                Button { isCreating = true } label: { Image(systemName: "plus") }
                    .accessibilityLabel(L.actionAddSession)
                    .keyboardShortcut("n", modifiers: .command)
            }
        }
    }

    private var dayList: some View {
        ScrollViewReader { proxy in
            ScrollView {
                LazyVStack(spacing: 0, pinnedViews: .sectionHeaders) {
                    ForEach(model.days, id: \.self) { day in
                        Section {
                            daySessions(on: day)
                        } header: {
                            SessionDayHeader(day: day, today: model.today, highlightsToday: model.highlightsToday)
                        }
                        .id(day)
                    }
                }
                .scrollTargetLayout()
            }
            .scrollPosition(id: $topDay, anchor: .top)
            .task {
                // `scrollPosition` alone lands imprecisely across 731 unmeasured sections; the
                // proxy measures as it goes, so it puts today exactly at the top on first show.
                proxy.scrollTo(model.today, anchor: .top)
            }
        }
    }

    @ViewBuilder private func daySessions(on day: Date) -> some View {
        let sessions = model.sessions(on: day)
        if sessions.isEmpty {
            Text(L.sessionsEmpty)
                .font(.subheadline)
                .foregroundStyle(.tertiary)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.horizontal, 16)
                .padding(.vertical, 16)
        } else {
            ForEach(sessions) { session in
                Button { selectedSession = session.id } label: {
                    SessionRow(session: session, isSelected: selectedSession == session.id)
                }
                .buttonStyle(.plain)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
            }
        }
    }

    private var selection: Binding<Date> {
        Binding(get: { topDay ?? model.today }, set: { topDay = $0 })
    }
}
