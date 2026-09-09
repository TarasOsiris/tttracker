import SwiftUI
import Shared

/// Mirrors `AppThemeMode`. See `KotlinEnumParity.swift` for why these mirrors exist.
enum ThemeMode: String, CaseIterable, Identifiable {
    case system = "SYSTEM"
    case light = "LIGHT"
    case dark = "DARK"

    var id: String { rawValue }

    init(_ kotlin: AppThemeMode) { self = ThemeMode(rawValue: kotlin.name) ?? .system }

    var kotlin: AppThemeMode {
        switch self {
        case .system: .system
        case .light: .light
        case .dark: .dark
        }
    }

    var colorScheme: ColorScheme? {
        switch self {
        case .system: nil
        case .light: .light
        case .dark: .dark
        }
    }

    var label: String {
        switch self {
        case .system: L.themeSystem
        case .light: L.themeLight
        case .dark: L.themeDark
        }
    }
}
