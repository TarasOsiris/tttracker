import Foundation
import SwiftUI
import Shared

extension Palette {
    /// The palette `:core` shares with the Compose UI, and the one the widget snapshot is written
    /// from. The only place the Kotlin table is read.
    static let brand = Palette(
        rpeRamp: BrandColors.shared.RpeRamp.map(\.int64Value),
        sessionTypes: [
            SessionKind.technique.rawValue: BrandColors.shared.SessionTypeTechnique,
            SessionKind.matchPlay.rawValue: BrandColors.shared.SessionTypeMatchPlay,
            SessionKind.tournament.rawValue: BrandColors.shared.SessionTypeTournament,
            SessionKind.servePractice.rawValue: BrandColors.shared.SessionTypeServePractice,
            SessionKind.physical.rawValue: BrandColors.shared.SessionTypePhysical,
            SessionKind.freePlay.rawValue: BrandColors.shared.SessionTypeFreePlay,
        ],
        sessionTypeFallback: BrandColors.shared.SessionTypeOther,
        win: BrandColors.shared.Win,
        loss: BrandColors.shared.Loss
    )
}

/// The brand colours by the names the screens use them under. See `Palette` for what each one is.
extension Color {
    static func rpe(_ rpe: Int) -> Color { Palette.brand.rpe(rpe) }
    static func rpeInk(_ rpe: Int) -> Color { Palette.brand.rpeInk(rpe) }

    static func sessionType(_ type: SessionType?) -> Color { sessionKind(SessionKind(type)) }

    /// Overload taking the Swift mirror, so views never have to name a `Shared` type.
    static func sessionKind(_ kind: SessionKind?) -> Color { Palette.brand.sessionType(kind?.rawValue) }

    static var matchWin: Color { Palette.brand.matchWin }
    static var matchLoss: Color { Palette.brand.matchLoss }
    static var onMatchWin: Color { Palette.brand.onMatchWin }
    static var onMatchLoss: Color { Palette.brand.onMatchLoss }
    static var matchWinText: Color { Palette.brand.matchWinText }
    static var matchLossText: Color { Palette.brand.matchLossText }
}
