import SwiftUI

struct SessionsScreen: View {
    let model: SessionsModel

    /// The session the container is showing. What selecting one does — push a screen or fill a
    /// detail column — is the container's business, not this screen's.
    @Binding var selectedSession: String?

    /// The day at the top of the list: the calendar's selection, and what the Today action compares
    /// against. The list reports it; nothing reads it back to scroll.
    ///
    /// A `scrollPosition(id:)` binding would be the obvious way to keep the two in step, and was —
    /// but it re-applies its day whenever the screen re-appears, so popping back from a session
    /// re-anchored that day to the top and shifted the list under the user. Driving the other
    /// direction with an explicit `scrollTo` means only a deliberate selection ever scrolls.
    @State private var topDay: Date?

    /// Whether the list has been put on today yet, latching the one-shot scroll below.
    ///
    /// Deliberately not `topDay == nil`: the list writes that as soon as it lays out, which is
    /// before the scroll gets to run, so it would suppress the very scroll the app opens with.
    /// `@State` here rather than on the model, because a size-class flip rebuilds this screen
    /// around a fresh `ScrollView` parked a year in the past — that one does need positioning.
    @State private var hasPositioned = false

    /// A day the calendar has asked the list to move to, cleared as soon as it has. The list is not
    /// a function of `topDay` — it reports it — so a move has to be asked for explicitly.
    @State private var pendingScroll: Date?

    @State private var isCalendarExpanded = false

    /// Owned by the tab, so a deep link from a widget can raise the sheet on a day of its own
    /// choosing rather than on whichever day the list is parked at.
    @Binding var newSession: NewSessionTarget?

    @Environment(\.scenePhase) private var scenePhase

    init(
        model: SessionsModel,
        selectedSession: Binding<String?>,
        newSession: Binding<NewSessionTarget?>,
        startsExpanded: Bool = false
    ) {
        self.model = model
        _selectedSession = selectedSession
        _newSession = newSession
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
        .sheet(item: $newSession) { target in
            SessionFormScreen(day: target.day)
        }
        .navigationTitle(L.navSessions)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            if let topDay, topDay != model.today {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(L.timeToday) { select(model.today) }
                        .keyboardShortcut("t", modifiers: .command)
                        .accessibilityIdentifier("sessions.today")
                }
            }
            ToolbarItem(placement: .topBarTrailing) {
                Button(L.actionAddSession, systemImage: "plus") { create(on: topDay ?? model.today) }
                    .keyboardShortcut("n", modifiers: .command)
                    .accessibilityIdentifier("sessions.add")
            }
        }
    }

    /// Reads the day the list is on, writes by asking the list to move to one — so the calendar
    /// still cannot disagree with the list about where it is.
    private var selection: Binding<Date> {
        Binding(get: { topDay ?? model.today }, set: select)
    }

    private func create(on day: Date) { newSession = NewSessionTarget(day: day) }

    private func select(_ day: Date) {
        topDay = day
        pendingScroll = day
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
            // Reporting only, so that scrolling never feeds back into scrolling. The default
            // threshold is deliberate: asking for every sliver of a section instead (`threshold: 0`)
            // disturbs how the list measures itself, and the opening scroll then lands a screen off.
            .onScrollTargetVisibilityChange(idType: Date.self) { days in
                if let first = days.first { topDay = first }
            }
            .onChange(of: pendingScroll) { _, day in
                guard let day else { return }
                proxy.scrollTo(day, anchor: .top)
                pendingScroll = nil
            }
            .task {
                // `scrollTo` measures as it goes, so it puts today exactly at the top on first show.
                //
                // Once only, because `task` runs on every *appearance*: popping back from the
                // details screen, switching tabs and re-showing the iPad sidebar all re-run it, and
                // scrolling then would throw away the place the user was at — which the
                // `ScrollView` otherwise keeps to the pixel, offset within the day and all.
                guard !hasPositioned else { return }
                hasPositioned = true
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
                .accessibilityIdentifier("session.row")
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
            }
        }
    }
}
