// What changed in the apps, newest first, in English only. Built from the app repo's history: each entry is dated
// by its version-bump commit (when the build went to the stores, not when review finished) and lists only changes
// a user can see. Store-listing-only and maintenance builds are left out. Before September 2026 the iOS binary
// and App Store version numbers differed, so those iOS entries name no version.

export type Release = {
  /** ISO date of the version bump. */
  date: string;
  /** Platforms and versions, as the stores show them where known. */
  versions: string;
  title: string;
  changes: string[];
};

export const releases: Release[] = [
  {
    date: "2026-10-08",
    versions: "Android 1.3.0 (build 26)",
    title: "Pro and widgets on Android",
    changes: [
      "TT Tracker Pro, the one-time purchase from iOS, comes to Android: training insights (streaks, training load, session-type mix, head-to-head records), weekly charts over 6 months, a year or all time, opponent records, CSV export and accent colors.",
      "Home Screen widgets: training summary, heatmap and last session, plus the Pro training streak and training load widgets.",
      "An Add session shortcut on the launcher icon.",
    ],
  },
  {
    date: "2026-10-03",
    versions: "iOS 1.3.12, Android 1.3.0 (build 25)",
    title: "Eight more languages, and the redesigned Android app",
    changes: [
      "New languages: Czech, Dutch, Malay, Polish, Swedish, Thai, Vietnamese and Traditional Chinese, for 22 in all.",
      "Phones set to Chinese for Taiwan or Hong Kong no longer fall back to English.",
      "\"System default\" in the language picker is translated.",
      "Android: a new launcher icon, with themed icon support on Android 13 and later.",
      "Android: the app is redesigned in Material 3 Expressive and rebuilt natively, and no longer crashes on Android 7 to 8.1.",
    ],
  },
  {
    date: "2026-10-02",
    versions: "iOS 1.3.11, Android",
    title: "Settings moves to the toolbar",
    changes: [
      "Settings opens from a gear at the top right instead of a tab.",
      "iOS: a floating button at the bottom of the sessions list adds a session.",
      "Analytics cards can be hidden and reordered (drag on iOS, up and down buttons on Android).",
      "Copying your User ID shows a confirmation.",
    ],
  },
  {
    date: "2026-10-02",
    versions: "iOS 1.3.10",
    title: "Free iCloud sync and TT Tracker Pro",
    changes: [
      "iCloud sync of sessions, matches and opponents is free for everyone.",
      "TT Tracker Pro, a one-time purchase, adds training insights (weekly streaks, training load, session-type mix, head-to-head records), weekly charts over 6 months, a year or all time, the streak and training load widgets, CSV export and accent colors.",
      "The tip jar is gone.",
    ],
  },
  {
    date: "2026-09-13",
    versions: "iOS 1.3.6",
    title: "Widgets on iPhone and iPad",
    changes: [
      "Home Screen widgets for your training summary, activity heatmap and last session, Lock Screen widgets, and a Control Center button to start a session.",
      "Each week of the activity heatmap lines up correctly.",
      "Accessibility: stronger text and badge contrast, outlined session-type dots that work with Differentiate Without Color, and a calendar that respects Reduce Motion.",
    ],
  },
  {
    date: "2026-09-09",
    versions: "iOS 1.3.5",
    title: "Polish for every language",
    changes: [
      "Durations, percentages and scores are formatted in the app's language.",
      "VoiceOver reads calendar and heatmap days as full dates with their session counts.",
      "The heatmap scrolls more smoothly, and opponent ratings accept decimals again.",
      "Bigger tap targets, and no clipped text at large text sizes.",
    ],
  },
  {
    date: "2026-09-09",
    versions: "iOS 1.3.4",
    title: "A fully native iPhone and iPad app",
    changes: [
      "The iOS app is rebuilt natively, with faster startup and smoother scrolling.",
      "iPad gets a two-column layout.",
      "Fixed settings rows that did nothing when tapped, and text shown in the wrong font.",
    ],
  },
  {
    date: "2026-09-07",
    versions: "iOS 1.3.3, Android 1.2.9",
    title: "The app speaks your language",
    changes: [
      "iOS follows the device language automatically.",
      "The analytics screen is fully translated.",
      "Android: the bottom bar's background reaches under the system navigation bar.",
    ],
  },
  {
    date: "2026-03-13",
    versions: "iOS",
    title: "Fixes",
    changes: ["Fixed the bottom bar background.", "Fixed the calendar's Today button."],
  },
  {
    date: "2026-02-11",
    versions: "Android 1.2.7 and 1.2.8, iOS",
    title: "Back to today",
    changes: ["A button in the sessions calendar jumps back to today."],
  },
  {
    date: "2026-01-29",
    versions: "Android 1.2.5 and 1.2.6, iOS",
    title: "New analytics",
    changes: [
      "Redesigned analytics with a summary, a weekly training time chart and a win/loss card.",
      "Edit a session's matches when you edit the session.",
      "Notes on matches.",
    ],
  },
  {
    date: "2026-01-27",
    versions: "Android 1.2.4, iOS",
    title: "Matches and opponents",
    changes: [
      "Log the matches you played in a session, with the score and the opponent.",
      "A new Tournament session type.",
      "An opponents list: add, edit and delete opponents.",
      "An analytics summary with your win/loss record.",
      "Choose the app's language in Settings.",
    ],
  },
  {
    date: "2026-01-24",
    versions: "Android 1.2 to 1.2.3",
    title: "Twelve more languages",
    changes: [
      "Arabic, Chinese (Simplified), French, German, Hindi, Indonesian, Italian, Japanese, Korean, Portuguese, Spanish and Turkish join English and Ukrainian.",
      "An explanation of RPE next to the effort field.",
      "Copy your User ID from Settings.",
    ],
  },
  {
    date: "2026-01-21",
    versions: "Android 1.1",
    title: "First release on Google Play",
    changes: [
      "Log training sessions with date, duration, type, effort (RPE) and notes, and edit or delete them.",
      "Week and month calendar, and an activity heatmap.",
      "Settings for default duration, effort and type, theme and first day of the week.",
      "In English and Ukrainian.",
    ],
  },
];

export const CHANGELOG_TITLE = "What's new in TT Tracker";
export const CHANGELOG_DESCRIPTION =
  "Release notes for the table tennis training journal on iPhone, iPad and Android: new features, languages and fixes in each version.";
