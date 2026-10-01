// Privacy Policy and Terms of Use, in English only: a legal text should not change meaning in a
// translation nobody has reviewed. Inline links use [label](url); a block is a paragraph or a list.
// Keep the Privacy Policy in step with the SDKs the apps ship (PostHog, Sentry, RevenueCat, CloudKit)
// and with what the website loads (Google Analytics).
import { APP_NAME, links, SITE_URL } from "./site";

export type LegalBlock = string | { list: string[] };
export type LegalSection = { heading: string; blocks: LegalBlock[] };
export type LegalDocument = { title: string; description: string; updated: string; intro: string; sections: LegalSection[] };

const UPDATED = "October 1, 2026";
const contact = `[${links.email}](mailto:${links.email})`;

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description: `How ${APP_NAME} handles your data: what stays on your device, what the app sends, and who receives it.`,
  updated: UPDATED,
  intro: `${APP_NAME} is a training journal for table tennis players, made by Nineva Studios ("we", "us"). This policy covers the ${APP_NAME} apps for iOS and Android and the website at ${SITE_URL}. The short version: there are no accounts, your training log stays on your device, we never sell data, and the app shows no ads.`,
  sections: [
    {
      heading: "The data you enter",
      blocks: [
        "Training sessions, matches, opponents (names, clubs, ratings, playing style, notes) and your settings are stored in a database on your device. We do not receive them, and they are never part of analytics or crash reports.",
        "On iOS, the Home Screen and Lock Screen widgets read a summary of your training from storage shared between the app and its widgets on the same device. It does not leave the device.",
        "Deleting the app deletes this data, unless you use iCloud sync (below) or your device's own backups.",
      ],
    },
    {
      heading: "iCloud sync (iOS, Pro)",
      blocks: [
        "Where iCloud sync is available and you turn it on, your sessions, matches and opponents are copied to your **private** iCloud database through Apple's CloudKit, so they appear on your other devices signed in to the same Apple Account. Only you can read your private iCloud database: we have no access to it, and Apple handles it under the [Apple Privacy Policy](https://www.apple.com/legal/privacy/).",
        "Deleted entries are kept in iCloud as markers without their content, so they stay deleted on every device. Turning sync off stops it on that device. To remove the synced data from iCloud, open Settings → [your name] → iCloud → Storage on an iPhone or iPad, and delete TT Tracker's data.",
      ],
    },
    {
      heading: "What the app sends, and to whom",
      blocks: [
        "The app creates a random identifier the first time it runs (shown as User ID in Settings). It is not linked to your name, email or Apple or Google account, and it is the only identifier attached to what follows.",
        {
          list: [
            "**Usage analytics — PostHog** (PostHog Inc., data stored in the EU, Frankfurt). Which screens are opened and which features are used, for example that a session was created with its type, duration, effort rating (RPE) and number of matches, or that a setting was changed. Also app version, device model, operating system, language, and an approximate location (country or city) derived from your IP address. Only release builds send analytics. [PostHog privacy policy](https://posthog.com/privacy).",
            "**Crash reports — Sentry** (Functional Software, Inc., United States). When the app crashes or hits an error: the technical details of the error, the app version, device model, operating system, and the recent app events leading up to it. [Sentry privacy policy](https://sentry.io/privacy/).",
            "**Purchases — RevenueCat** (RevenueCat, Inc., United States). Purchases are made through the App Store or Google Play, which handle payment: we never see your card or billing details. RevenueCat receives the purchase receipt and its product, price, currency and country, along with device and operating system details and your IP address, so the app can tell whether Pro is unlocked and restore it on your other devices. [RevenueCat privacy policy](https://www.revenuecat.com/privacy/).",
          ],
        },
        "If you send feedback from the app, your email app opens a message to us with the app version and your User ID filled in. We receive your email address and whatever you write, and use them only to reply.",
      ],
    },
    {
      heading: "What we do not do",
      blocks: [
        {
          list: [
            "We do not sell or rent your data, or share it for advertising.",
            "The app shows no ads, contains no advertising SDKs, and does not track you across other companies' apps or websites. It does not request the iOS advertising identifier.",
            "There is no sign-up, and we never ask for your name, email, phone number or contacts.",
          ],
        },
      ],
    },
    {
      heading: "This website",
      blocks: [
        "The website uses Google Analytics (Google LLC) to count visits and see which pages are read. Google Analytics sets cookies and receives your IP address, browser and device details, and the pages you visit. [How Google uses this data](https://policies.google.com/technologies/partner-sites).",
        "Your theme choice and the serves you mark as favorites are kept in your browser's local storage and never sent to us.",
      ],
    },
    {
      heading: "Why we process data",
      blocks: [
        "We use analytics and crash reports to fix problems and decide what to improve, which is our legitimate interest in running a reliable app; they never contain your training content. Purchase data is processed to provide what you bought. Feedback emails are used to answer you.",
      ],
    },
    {
      heading: "How long we keep it",
      blocks: [
        "Analytics and crash reports are kept only as long as they are useful for improving the app, within the retention limits of PostHog and Sentry, and are deleted sooner on request. Purchase records are kept as long as needed to provide your purchases and meet legal obligations. Feedback emails are kept while the conversation is useful.",
      ],
    },
    {
      heading: "International transfers",
      blocks: [
        "Sentry and RevenueCat are based in the United States. Where data about people in the EU, UK or Switzerland is transferred there, it is protected by the safeguards these providers offer, such as the EU Standard Contractual Clauses.",
      ],
    },
    {
      heading: "Your choices and rights",
      blocks: [
        `You can ask to access, correct or delete the data linked to your User ID, or object to its processing: email ${contact} and include the User ID from Settings → Copy User ID, since it is the only way we can find your data. Depending on where you live (for example under the GDPR or California law) you may also have the right to data portability and to complain to your local data protection authority.`,
        "Your training data itself is on your device and in your own iCloud account, where you can delete it at any time.",
      ],
    },
    {
      heading: "Children",
      blocks: [
        "The app is not directed at children under 13 and we do not knowingly collect personal data from them. If you believe a child has sent us personal data, contact us and we will delete it.",
      ],
    },
    {
      heading: "Changes",
      blocks: [
        "If what the app collects changes, for example when a new service is added, we will update this page and the date above.",
      ],
    },
    {
      heading: "Contact",
      blocks: [`Nineva Studios — ${contact}`],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  title: "Terms of Use",
  description: `The terms for using the ${APP_NAME} apps, TT Tracker Pro and this website.`,
  updated: UPDATED,
  intro: `These terms apply to the ${APP_NAME} apps for iOS and Android and the website at ${SITE_URL}, provided by Nineva Studios ("we", "us"). By downloading or using them you agree to these terms. If you do not agree, please do not use them.`,
  sections: [
    {
      heading: "The app",
      blocks: [
        `${APP_NAME} lets you log table tennis training sessions, matches and opponents, and see statistics about them. We grant you a personal, non-exclusive, non-transferable licence to use the app on devices you own or control, for your own non-commercial use.`,
        "On iOS, the [Apple Standard Licensed Application End User License Agreement](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/) also applies. Apple and Google are not parties to these terms and are not responsible for the app or its support.",
      ],
    },
    {
      heading: "TT Tracker Pro",
      blocks: [
        "TT Tracker Pro is an optional **one-time purchase**, not a subscription. It unlocks the Pro features for as long as the app is offered, on your devices that use the same Apple Account (on iOS) or Google account (on Android) as the purchase. Pro features today are iCloud sync and supporting the app's development; we may add more over time, and we do not plan to take away what you paid for.",
        {
          list: [
            "Payment is handled by the App Store or Google Play and charged to your account there when you confirm the purchase. Prices are shown in the app before you buy.",
            "Use Restore purchases (in Settings or on the purchase screen) to unlock Pro again on a new device or after reinstalling.",
            "Refunds are handled by Apple or Google under their own policies: [Apple](https://support.apple.com/118223), [Google Play](https://support.google.com/googleplay/answer/2479637).",
          ],
        },
        "iCloud sync relies on Apple's iCloud service, your Apple Account and your available iCloud storage. We cannot guarantee that it is always available or that every change syncs immediately.",
      ],
    },
    {
      heading: "Your data",
      blocks: [
        `What you enter in the app belongs to you. It is stored on your device (and in your own iCloud account if you use iCloud sync), and you are responsible for keeping backups. How we handle data is described in the [Privacy Policy](/privacy).`,
      ],
    },
    {
      heading: "Not medical advice",
      blocks: [
        "The app, its statistics and the training plans on this website are for general information and tracking only. They are not medical, health or coaching advice. Check with a doctor or qualified coach before starting a new training program, and stop if you feel pain or discomfort.",
      ],
    },
    {
      heading: "Acceptable use",
      blocks: [
        "Do not copy, modify, reverse engineer or redistribute the app, except where the law allows it; interfere with its operation or with the services it uses; or use it to break the law.",
      ],
    },
    {
      heading: "Content and trademarks",
      blocks: [
        "The app, this website and their design, text, graphics and code belong to Nineva Studios. App Store is a service mark of Apple Inc. Google Play is a trademark of Google LLC.",
      ],
    },
    {
      heading: "Third-party services",
      blocks: [
        "The app uses services from other companies, such as Apple, Google, RevenueCat, PostHog and Sentry, as described in the Privacy Policy. Their own terms apply to them, and we are not responsible for their availability.",
      ],
    },
    {
      heading: "Disclaimer",
      blocks: [
        'The app and website are provided "as is" and "as available", without warranties of any kind beyond those the law requires. We do our best to keep them working and your data safe, but we do not promise that they will be uninterrupted, error-free, or that data can never be lost.',
      ],
    },
    {
      heading: "Limitation of liability",
      blocks: [
        "To the fullest extent the law allows, Nineva Studios is not liable for indirect, incidental or consequential damages, or for loss of data, arising from your use of the app or website. Our total liability for any claim is limited to the amount you paid for the app or TT Tracker Pro. Nothing in these terms limits liability that cannot be limited by law, or your rights as a consumer.",
      ],
    },
    {
      heading: "Ending use",
      blocks: [
        "You can stop using the app at any time by deleting it. We may stop offering the app or parts of it; if that affects Pro features you paid for, we will try to give reasonable notice.",
      ],
    },
    {
      heading: "Changes to these terms",
      blocks: [
        "We may update these terms, for example when features change. The date above shows the latest version; continuing to use the app after a change means you accept the new terms.",
      ],
    },
    {
      heading: "Contact",
      blocks: [`Nineva Studios — ${contact}`],
    },
  ],
};
