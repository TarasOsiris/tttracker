import SwiftUI

extension Optional where Wrapped == UserInterfaceSizeClass {
    /// Whether there is room for two columns side by side.
    ///
    /// Read it from the *container* that chooses the layout, never from inside one: a
    /// `NavigationSplitView` reports its own sidebar as compact however wide the window is.
    var isWide: Bool { self == .regular }
}

extension View {
    /// The width every split-view sidebar in the app asks for. Wide enough for a seven-column
    /// calendar, which is the widest thing any of them holds.
    func sidebarColumnWidth() -> some View {
        navigationSplitViewColumnWidth(min: 320, ideal: 380, max: 460)
    }

    /// Grows a control to Apple's 44x44 minimum for anything meant to be tapped. An SF Symbol
    /// glyph on its own is roughly half that.
    func minimumTapTarget() -> some View {
        frame(minWidth: 44, minHeight: 44)
    }
}
