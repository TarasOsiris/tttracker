import type { Messages } from "../types";

export const de: Messages = {
  meta: {
    homeTitle: "Tischtennis Trainingstagebuch – Ping Pong: Spiele & Statistik",
    homeDescription:
      "Kostenloses Tischtennis-Trainingstagebuch für iPhone und Android. Einheiten in Sekunden loggen, Spiele und Gegner erfassen, Fortschritt per Heatmap verfolgen.",
    drillsTitle: "Kostenlose Tischtennis-Trainingspläne | Tischtennis Trainingstagebuch",
    drillsDescription:
      "Ausdruckbare Trainingspläne: Grundlagen, Beinarbeit, Aufschlag & Return, Balleimertraining, Konstanz, Wettkampfvorbereitung – mit Zeitplan, Tipps und FAQ.",
  },
  nav: {
    features: "Funktionen",
    howItWorks: "So funktioniert's",
    serves: "Aufschläge",
    drills: "Trainingspläne",
    faq: "FAQ",
    getApp: "App herunterladen",
    openMenu: "Menü öffnen",
    menu: "Menü",
    toggleTheme: "Design wechseln",
    skipToContent: "Zum Inhalt springen",
    language: "Sprache",
  },
  store: {
    appStore: "Laden im App Store",
    googlePlay: "Jetzt bei Google Play",
  },
  hero: {
    badge: "Neu: Spiele und Gegner erfassen",
    titleLead: "Jede Einheit loggen.",
    titleHighlight: "Sieh dein Spiel wachsen.",
    subtitleBefore: "Das ",
    subtitleStrong: "Trainingstagebuch für Tischtennis und Ping Pong",
    subtitleAfter:
      ". Trainingseinheiten in unter 30 Sekunden loggen, Spiele gegen gespeicherte Gegner erfassen und ein Jahr Fortschritt auf einen Blick sehen.",
    trustPoints: ["Kostenlos", "Kein Konto", "Offline nutzbar", "14 Sprachen"],
  },
  mockup: {
    weekdays: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    today: "Heute",
    yesterday: "Gestern",
    tomorrow: "Morgen",
    noSessions: "Keine Einheiten",
    minutes: "{n} min",
    hours: "{n} h",
    addSession: "Einheit hinzufügen",
    save: "Speichern",
    cancel: "Abbrechen",
    duration: "Dauer",
    sessionType: "Einheitstyp",
    intensity: "Intensität (RPE)",
    summary: "Zusammenfassung",
    totalSessions: "Einheiten",
    totalTime: "Trainingszeit",
    winLoss: "Sieg / Niederlage",
    heatmapTitle: "Heatmap der Trainingseinheiten",
    weeklyTraining: "Wöchentliche Trainingszeit",
    notes: ["Beinarbeit, Multiball", "Liga · vs. Alex K."],
    tabs: ["Einheiten", "Analyse"],
    heatmapLabel: "Letzte 14 Wochen",
    heatmapStat: "42 Einheiten",
    heatmapHours: "51 h",
    winRate: "Siegquote",
  },
  sessionTypes: {
    technique: "Technik",
    match: "Spielpraxis",
    tournament: "Turnier",
    serve: "Aufschlagtraining",
    physical: "Athletik",
    freeplay: "Freies Spiel",
    other: "Sonstiges",
  },
  features: {
    eyebrow: "Funktionen",
    title: "Alles, was dein Trainingstagebuch braucht",
    subtitle: "Training, Spiele und Fortschritt – vom ersten Ballwechsel bis zum Punktspielabend. Gemacht von einem Spieler, für Spieler.",
    sessionTypesTitle: "7 Einheitentypen, überall farblich markiert",
    items: [
      {
        icon: "sessions",
        title: "Einheiten in Sekunden",
        body: "Trainingseinheit in unter 30 Sekunden loggen: Dauer, Art und wie anstrengend es war.",
        bullets: ["7 Einheitentypen", "Dauer & Belastung (RPE) 1–10", "Notizen & nachträglich erfassen"],
      },
      {
        icon: "matches",
        title: "Spiele & Gegner",
        body: "Jedes Match satzweise erfassen und ein Profil für jeden Gegner anlegen.",
        bullets: ["Einzel oder Doppel", "Training, Liga, Turnier", "Spielstil, Stärke, Schlaghand"],
      },
      {
        icon: "analytics",
        title: "Statistiken mit echten Antworten",
        body: "Sieh deine Siegquote, wie viel du wirklich pro Woche trainierst, und ein ganzes Jahr auf einen Blick.",
        bullets: ["Sieg/Niederlage-Diagramm", "Wöchentliches Trainingspensum", "12-Monats-Heatmap"],
      },
      {
        icon: "calendar",
        title: "Intelligenter Kalender",
        body: "Monats- und Wochenansicht mit Punkten zeigen deine intensivsten Wochen. Tippe auf einen Tag, um zu sehen, was du gemacht hast.",
        bullets: ["Monats- & Wochenansicht", "Trainingsdichte", "Frei wählbarer Wochenstart"],
      },
      {
        icon: "widgets",
        title: "Home- & Sperrbildschirm-Widgets",
        body: "Behalte Heatmap und letzte Einheit auf dem Home-Bildschirm im Blick und logge neue Einheiten direkt aus dem Kontrollzentrum.",
        bullets: ["Übersichts- & Heatmap-Widgets", "Statistiken auf dem Sperrbildschirm", "Schnellzugriff zum Loggen"],
      },
      {
        icon: "simple",
        title: "Bewusst einfach gehalten",
        body: "Keine Anmeldung, kein Schnickschnack, keine Cloud nötig. Alles bleibt auf deinem Gerät.",
        bullets: ["Funktioniert komplett offline", "Helles & dunkles Design", "In 14 Sprachen verfügbar"],
      },
    ],
  },
  steps: {
    eyebrow: "So funktioniert's",
    title: "Drei Schritte. Dann wird's Gewohnheit.",
    items: [
      {
        title: "Einheit loggen",
        body: "Typ wählen (Technik, Spielpraxis, Aufschlagtraining …), Dauer und Anstrengung festlegen, Notiz hinzufügen. Fertig in unter 30 Sekunden.",
      },
      {
        title: "Spiele erfassen",
        body: "Satzergebnisse gegen gespeicherte Gegner eintragen – ob Freundschaftsspiel, Punktspielabend oder Turnier.",
      },
      {
        title: "Fortschritt sehen",
        body: "Deine Heatmap füllt sich, die Wochenwerte steigen und deine Siegquote zeigt, ob sich die Arbeit auszahlt.",
      },
    ],
  },
  screenshots: {
    eyebrow: "Screenshots",
    title: "Ein Blick in die App",
    subtitle: "Eine klare App im Material-Stil, die sich auf deinem Handy zu Hause fühlt – hell oder dunkel.",
    previous: "Vorherige Screenshots",
    next: "Nächste Screenshots",
    previousOne: "Vorheriger Screenshot",
    nextOne: "Nächster Screenshot",
    enlarge: "Screenshot vergrößern: {alt}",
    alts: [
      "Wochenkalender mit protokollierten Tischtennis-Trainingseinheiten",
      "Neue Einheit hinzufügen mit Dauer, Typ und Intensität",
      "Einstellungen für Standarddauer, Intensität und Typ der Einheit",
      "Detailansicht einer Einheit mit Dauer und RPE",
      "Bearbeiten oder Löschen einer bestehenden Einheit",
      "Monatsansicht des Kalenders mit Trainingsdichte",
      "Statistik-Heatmap der Trainingseinheiten",
      "Kalender im dunklen Design",
    ],
  },
  drillsTeaser: {
    eyebrow: "Kostenlose Trainingspläne",
    title: "Nicht sicher, was du üben sollst?",
    subtitle:
      "Fertige Tischtennis-Trainingspläne mit Zeitplan, Tipps und FAQ. Ausdrucken, mit in die Halle nehmen und danach in der App loggen.",
    browseAll: "Alle Trainingspläne ansehen",
  },
  servesTeaser: {
    eyebrow: "Aufschlag-Lexikon",
    title: "Lerne jeden Aufschlag",
    subtitle: "29 Tischtennis-Aufschläge im Detail: Schnitt, Absprung, Platzierung und wie du sie zurückspielst. Kostenlos, mit Diagrammen.",
    cta: "Aufschläge entdecken",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Fragen & Antworten",
    items: [
      {
        q: "Ist TT Tracker kostenlos?",
        a: "Ja. Du kannst die App kostenlos im App Store und bei Google Play herunterladen und so viele Einheiten und Spiele loggen, wie du willst.",
      },
      {
        q: "Auf welchen Geräten läuft die App?",
        a: "Auf iPhone und iPad (iOS) sowie Android-Handys und -Tablets. Home- und Sperrbildschirm-Widgets gibt es unter iOS.",
      },
      {
        q: "Brauche ich ein Konto?",
        a: "Nein. Öffne die App und leg direkt los. Keine Anmeldung, keine E-Mail, kein Passwort.",
      },
      {
        q: "Funktioniert die App offline? Wo werden meine Daten gespeichert?",
        a: "Sie funktioniert komplett offline. Deine Einheiten, Spiele und Gegner werden auf deinem Gerät gespeichert, nicht auf unseren Servern.",
      },
      {
        q: "Ist die App für Ping Pong oder Tischtennis?",
        a: "Für beides – es ist derselbe Sport! Ob du locker in der Garage Ping Pong spielst oder in einer Liga antrittst, die App erfasst dein Training und deine Spiele auf die gleiche Weise.",
      },
      {
        q: "In welchen Sprachen ist die App verfügbar?",
        a: "14: Englisch, Arabisch, Chinesisch, Französisch, Deutsch, Hindi, Indonesisch, Italienisch, Japanisch, Koreanisch, Portugiesisch, Spanisch, Türkisch und Ukrainisch.",
      },
    ],
  },
  cta: {
    homeTitle: "Schluss mit Rätselraten, wie viel du trainierst.",
    homeSubtitle: "Kostenlos für iPhone, iPad und Android. Kein Konto, keine Einrichtung – einfach öffnen und die erste Einheit loggen.",
    drillsTitle: "Jede Übung, die du machst, im Blick.",
    drillsSubtitle: "Logge jede Einheit mit Typ, Dauer und Anstrengung und sieh, wie sich deine Trainings-Heatmap füllt.",
    drillTitle: "Einheit geschafft? Logge sie in 30 Sekunden.",
    drillSubtitle: "Speichere sie als {type}-Einheit mit Dauer und Anstrengung und baue deine Serie aus.",
    telegram: "Tritt der Community auf Telegram bei: @tttrackerapp",
  },
  footer: {
    tagline: "Das Trainingstagebuch für Ping-Pong- und Tischtennisspieler. Einheiten loggen, Spiele erfassen, Fortschritt sehen.",
    product: "Produkt",
    download: "Download",
    company: "Unternehmen",
    contact: "Kontakt",
    support: "Support",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    telegram: "Telegram-Community",
    encyclopedia: "Aufschlag-Lexikon",
    allServes: "Alle Aufschläge",
    motions: "Bewegungen",
    spins: "Schnitt",
    rules: "Regeln",
    quiz: "Quiz",
    about: "Über",
    language: "Sprache",
    legal: "App Store ist eine Dienstleistungsmarke der Apple Inc. Google Play ist eine Marke der Google LLC.",
  },
  drillsPage: {
    eyebrow: "Trainingspläne",
    title: "Tischtennis-Übungen für jede Einheit",
    intro:
      "Strukturierte Trainingspläne mit Aufwärmen, Hauptteil und Cool-down, auf die Minute getaktet. Ausdrucken für die Halle und danach in TT Tracker loggen, um deinen Fortschritt zu sehen.",
    back: "Alle Trainingspläne",
    minutes: "{n} min",
    minutesLong: "{n} Minuten",
    drillCount: "{n} Übungen",
    print: "Drucken",
    tipsTitle: "Tipps, um mehr rauszuholen",
    faqTitle: "Häufige Fragen",
    moreTitle: "Weitere Trainingspläne",
    progressDone: "{done}/{total} erledigt",
    progressLeft: "noch {n} min",
    complete: "Einheit abgeschlossen. Gut gemacht! 🏓",
    reset: "Zurücksetzen",
    levels: { Beginner: "Anfänger", Intermediate: "Fortgeschritten", "All levels": "Alle Levels" },
  },
  errors: {
    notFoundTitle: "Der Ball ist vom Tisch gesprungen",
    notFoundBody: "Diese Seite konnten wir nicht finden.",
    errorTitle: "Etwas ist schiefgelaufen",
    errorBody: "Bitte versuch es gleich noch einmal.",
    backHome: "Zurück zur Startseite",
    drillNotFound: "Übung nicht gefunden",
  },
  drills: [
    {
      slug: "beginner-fundamentals",
      emoji: "🏓",
      title: "Grundlagen für Einsteiger",
      short: "Die vier Grundschläge, in der Reihenfolge, wie sie Trainer vermitteln.",
      metaTitle: "Tischtennis-Trainingsplan für Einsteiger (60 Min.)",
      metaDescription:
        "Ein 60-minütiger Trainingsplan für Tischtennis-Einsteiger: Aufwärmen, Vor- und Rückhand-Konter, Schupfball, Beinarbeit und Cool-down. Kostenlos, zum Ausdrucken.",
      level: "Beginner",
      sessionType: "technique",
      intro:
        "Wenn du neu im Tischtennis bist (oder nach Jahren Garagen-Ping-Pong zurückkommst), baut diese Einheit die vier Grundschläge auf, auf denen alles andere aufbaut. Mach sie zwei- bis dreimal pro Woche und logge jede Einheit, damit du siehst, wie sich deine Konstanz verbessert.",
      blocks: [
        {
          title: "Aufwärmen",
          items: [
            { name: "Lockeres Einlaufen und Armkreisen", minutes: 3 },
            { name: "Schattenschläge: Vorhand und Rückhand", minutes: 3, note: "Langsame, volle Schwünge ohne Ball" },
            { name: "Lockerer Ballwechsel, beliebiger Schlag", minutes: 4 },
          ],
        },
        {
          title: "Hauptteil",
          items: [
            { name: "Vorhand-Konter, diagonal", minutes: 10, note: "Ziel: 20 in Folge, bevor du das Tempo steigerst" },
            { name: "Rückhand-Konter, diagonal", minutes: 10 },
            { name: "Rückhand-Schupfball auf Rückhand", minutes: 8, note: "Knapp über das Netz spielen" },
            { name: "Vorhand – Rückhand im Wechsel (1-1)", minutes: 8 },
          ],
        },
        {
          title: "Spiel & Cool-down",
          items: [
            { name: "Sätze bis 11, nur Aufschlag und Angriff auf den ersten Ball", minutes: 10 },
            { name: "Schultern, Handgelenke, Waden dehnen", minutes: 4 },
          ],
        },
      ],
      tips: [
        { title: "Zähle deine Ballwechsel", body: "Sag die Zahl laut. So wird aus einer vagen Übung ein messbares Ziel." },
        { title: "Erst die Grundstellung", body: "Knie gebeugt, Gewicht vorne, Schläger vorn. Die meisten Anfängerfehler entstehen schon vor dem Schlag." },
        { title: "Logge sie mit RPE", body: "Bewerte, wie anstrengend es war. Wenn die Grundlagen sitzen, fühlt sich dieselbe Einheit bald leichter an." },
      ],
      faqs: [
        { q: "Wie oft sollte ein Einsteiger trainieren?", a: "Zwei bis drei Einheiten pro Woche à etwa einer Stunde reichen für stetige Fortschritte, ohne dich zu verausgaben." },
        { q: "Sollten Einsteiger gleich Topspin lernen?", a: "Lerne zuerst einen konstanten flachen Konter und Schupfball. Topspin kommt von selbst, sobald Schlag und Beinarbeit stabil sind." },
        { q: "Kann ich das allein machen?", a: "Für die meisten Übungen brauchst du einen Partner oder einen Roboter. Allein kannst du stattdessen Schattenschläge und Aufschlagtraining machen." },
      ],
    },
    {
      slug: "footwork-drills",
      emoji: "👟",
      title: "Beinarbeit-Übungen",
      short: "Falkenberg, Seitwärtsbewegung und Vor-Zurück.",
      metaTitle: "Tischtennis-Beinarbeit: 50-Minuten-Einheit",
      metaDescription:
        "Verbessere deine Beinarbeit mit einer 50-minütigen Einheit: Seitwärtsbewegung, Falkenberg, zufällige Beinarbeit und Vor-Zurück-Übungen.",
      level: "Intermediate",
      sessionType: "technique",
      intro:
        "Die meisten Punkte gehen wegen der Füße verloren, nicht wegen der Hände. Diese Einheit trainiert die Bewegungsmuster, mit denen du jeden Ball aus einer ausbalancierten Position spielst. Halte die Sätze kurz und intensiv und mach Pausen dazwischen.",
      blocks: [
        {
          title: "Aufwärmen",
          items: [
            { name: "Seilspringen oder lockeres Einlaufen", minutes: 3 },
            { name: "Schatten-Seitschritte mit Schlägen", minutes: 4 },
            { name: "Vorhand- und Rückhand-Ballwechsel diagonal", minutes: 5 },
          ],
        },
        {
          title: "Hauptteil",
          items: [
            { name: "Zwei-Punkte-Vorhand: Mitte & weite Vorhand", minutes: 8, note: "Sätze: 60 s Belastung, 30 s Pause" },
            { name: "Falkenberg (RH – VH aus der RH-Ecke – weite VH)", minutes: 10 },
            { name: "Vor-Zurück: kurzer Schupfball, dann langer Topspin", minutes: 8 },
            { name: "Zufällig auf die Vorhandhälfte", minutes: 7 },
          ],
        },
        {
          title: "Cool-down",
          items: [{ name: "Lockerer Ballwechsel und Dehnen", minutes: 5 }],
        },
      ],
      tips: [
        { title: "Kleine Schritte, dann ein großer", body: "Korrigiere mit kleinen Schritten. Den großen Ausfallschritt hebst du dir für weite Bälle auf." },
        { title: "Zurück in die Neutralposition", body: "Kehre nach jedem Schlag zur Mitte zurück. Genau dieser Rückschritt ist die eigentliche Übung." },
        { title: "Intensität festhalten", body: "Beinarbeit-Einheiten sind anstrengend. Logge sie mit hohem RPE und plane die Woche drumherum." },
      ],
      faqs: [
        { q: "Was ist die Falkenberg-Übung?", a: "Ein Drei-Ball-Muster: Rückhand aus der Rückhand-Ecke, Umspringen zur Vorhand aus derselben Ecke, dann eine weite Vorhand. Benannt nach dem schwedischen Trainer Karl-Olof Falkenberg." },
        { q: "Wie lang sollten Beinarbeit-Sätze sein?", a: "30–60 Sekunden Belastung mit gleich langer oder längerer Pause. Bei Ermüdung sinkt die Qualität schnell." },
        { q: "Kann ich Beinarbeit ohne Tisch trainieren?", a: "Ja. Schatten-Beinarbeit mit Schläger vor dem Spiegel ist eine tolle 10-Minuten-Gewohnheit für jeden Tag." },
      ],
    },
    {
      slug: "serve-and-receive",
      emoji: "🎯",
      title: "Aufschlag & Return",
      short: "Kurzer Unterschnitt, lange schnelle Aufschläge und Spin lesen.",
      metaTitle: "Aufschlagtraining Tischtennis: Aufschlag & Return (50 Min.)",
      metaDescription:
        "Ein 50-minütiges Aufschlag- und Return-Training: kurzer Unterschnitt, lange Aufschläge, Seitspin-Varianten und Return-Übungen.",
      level: "All levels",
      sessionType: "serve",
      intro:
        "Jeder Punkt beginnt mit einem Aufschlag, trotzdem wird er am wenigsten trainiert. Für den Aufschlag-Teil brauchst du nur einen Balleimer, für den Return einen Partner. Kombiniere den Plan mit unserer Partnerseite TT Serves für detaillierte Technik-Anleitungen.",
      blocks: [
        {
          title: "Aufwärmen",
          items: [
            { name: "Beweglichkeit für Handgelenk und Schulter", minutes: 3 },
            { name: "Lockerer Ballwechsel", minutes: 4 },
          ],
        },
        {
          title: "Aufschlag (Balleimer)",
          items: [
            { name: "Kurzer Unterschnitt, zweimal auf der gegnerischen Seite aufspringend", minutes: 8, note: "Ziel: ein Handtuch nahe am Netz" },
            { name: "Langer schneller Aufschlag in die Ecken", minutes: 6 },
            { name: "Seitspin / Seit-Unterschnitt mit derselben Bewegung", minutes: 8 },
          ],
        },
        {
          title: "Return (mit Partner)",
          items: [
            { name: "Schupfball oder Flip gegen kurze Aufschläge", minutes: 8 },
            { name: "Lange Aufschläge angreifen", minutes: 6 },
            { name: "Aufschlag + Dritter Ball, den Punkt zu Ende spielen", minutes: 7 },
          ],
        },
      ],
      tips: [
        { title: "Gleiche Bewegung, anderer Spin", body: "Die besten Aufschläge sehen bis zum Treffpunkt identisch aus. Übe die Tarnung, nicht nur den Spin." },
        { title: "Zähle gute Aufschläge", body: "Wie viele von 20 sind dort gelandet, wo du wolltest? Trage die Zahl in deine Notizen ein." },
        { title: "Kenne die Regeln", body: "Wirf den Ball mindestens 16 cm hoch, von der offenen Handfläche, und halte ihn sichtbar." },
      ],
      faqs: [
        { q: "Wie viele Aufschläge sollte ich üben?", a: "Ein Eimer mit 50–100 Bällen pro Einheit reicht völlig aus. Konzentriere dich auf Qualität und Platzierung." },
        { q: "Welchen Aufschlag sollte ich zuerst lernen?", a: "Einen kurzen Unterschnittaufschlag. Er verhindert den gegnerischen Angriff und bereitet deinen dritten Ball vor." },
        { q: "Wo kann ich weitere Aufschlagtechniken lernen?", a: "TT Serves zeigt über 20 Aufschläge, von Pendel über Reverse bis Tomahawk, mit Schritt-für-Schritt-Anleitungen." },
      ],
    },
    {
      slug: "multiball-training",
      emoji: "🧺",
      title: "Multiball-Training",
      short: "Viele Wiederholungen, um Schläge schnell zu automatisieren.",
      metaTitle: "Multiball-Übungen Tischtennis: 40-Minuten-Einheit",
      metaDescription:
        "Eine 40-minütige Multiball-Einheit: Topspin, Beinarbeit und Unterschnitt-zu-Topspin-Übungen mit Zuspieler. Ideal für mehr Konstanz.",
      level: "Intermediate",
      sessionType: "technique",
      intro:
        "Multiball packt Hunderte Wiederholungen in eine kurze Einheit. Ein Spieler spielt aus dem Korb zu, der andere schlägt. Wechselt nach jedem Satz, damit ihr beide trainiert und beide das Zuspielen übt.",
      blocks: [
        {
          title: "Aufwärmen",
          items: [{ name: "Lockerer Ballwechsel und Schattenschläge", minutes: 6 }],
        },
        {
          title: "Hauptteil (Sätze à 20–30 Bälle)",
          items: [
            { name: "Vorhand-Topspin, feste Position", minutes: 6 },
            { name: "Rückhand-Topspin, feste Position", minutes: 6 },
            { name: "Topspin gegen Unterschnitt, im Wechsel Vor- und Rückhand", minutes: 8 },
            { name: "Zufällige Platzierung, ganzer Tisch", minutes: 8 },
          ],
        },
        {
          title: "Cool-down",
          items: [{ name: "Bälle einsammeln, dehnen", minutes: 6 }],
        },
      ],
      tips: [
        { title: "Zuspieler gibt das Tempo vor", body: "Langsam starten und das Tempo nur steigern, wenn 8 von 10 Bällen sitzen." },
        { title: "Kurze Sätze", body: "20–30 Bälle pro Satz halten die Technik sauber. Ermüdung automatisiert schlechte Angewohnheiten." },
        { title: "Beide Rollen loggen", body: "Logge sie als Technik-Einheit und notiere, was du zugespielt und was du gespielt hast." },
      ],
      faqs: [
        { q: "Wie viele Bälle brauche ich für Multiball?", a: "Mindestens 60–100, damit du nicht ständig sammeln musst. Trainingsbälle sind günstig." },
        { q: "Ist Multiball besser als normale Übungen?", a: "Für Wiederholungen und Beinarbeit ist es besser, für das Timing gegen einen echten Ball sind normale Ballwechsel besser. Nutze beides." },
        { q: "Können Einsteiger Multiball machen?", a: "Ja, mit langsamen, vorhersehbaren Zuspielen auf eine Position. Es ist einer der schnellsten Wege, einen Schlag zu lernen." },
      ],
    },
    {
      slug: "forehand-backhand-consistency",
      emoji: "🔁",
      title: "Konstanz bei Vor- und Rückhand",
      short: "Lange Ballwechsel, Zielübungen und Wechselspiel.",
      metaTitle: "Konstanz-Übungen für Vor- und Rückhand (Tischtennis)",
      metaDescription:
        "Eine 55-minütige Konstanz-Einheit: Zielballwechsel, longline, Vorhand-Rückhand-Wechsel und Konter.",
      level: "All levels",
      sessionType: "technique",
      intro:
        "Konstanz gewinnt mehr Spiele als Winner. Diese Einheit ist um Ballwechsel-Zähler-Ziele herum aufgebaut, damit jede Übung eine klare Ziellinie hat. Notiere deinen besten Wert und versuche, ihn nächste Woche zu toppen.",
      blocks: [
        {
          title: "Aufwärmen",
          items: [
            { name: "Beweglichkeit und Schattenschläge", minutes: 4 },
            { name: "Vorhand und Rückhand diagonal", minutes: 6 },
          ],
        },
        {
          title: "Hauptteil",
          items: [
            { name: "Vorhand diagonal, Ziel: 50 in Folge", minutes: 10 },
            { name: "Rückhand diagonal, Ziel: 50 in Folge", minutes: 10 },
            { name: "Longline: VH auf RH", minutes: 8 },
            { name: "Wechsel: 2 RH – 1 VH", minutes: 10 },
          ],
        },
        {
          title: "Spiel",
          items: [{ name: "Ballwechsel-Spiele: Punkt zählt erst ab dem 5. Ball", minutes: 7 }],
        },
      ],
      tips: [
        { title: "70 % Tempo", body: "Bei Konstanz-Übungen geht es nicht um Tempo. Bleib locker und finde deinen Rhythmus." },
        { title: "Wähle ein Ziel", body: "Leg einen kleinen Gegenstand auf den Tisch. Ziel ist, in seiner Nähe zu landen, nicht nur 'auf dem Tisch'." },
        { title: "Halte deinen Rekord fest", body: "Notiere deine beste Ballwechsel-Zahl der Einheit. Es motiviert, sie wachsen zu sehen." },
      ],
      faqs: [
        { q: "Wie viele Bälle in Folge sind gut?", a: "50 diagonale Konter ohne Fehler sind ein solider Wert für Vereinsspieler, 100 sind exzellent." },
        { q: "Warum ist meine Rückhand weniger konstant?", a: "Meist wandert der Ellbogen nach hinten oder der Schlägerwinkel öffnet sich. Halte den Ellbogen vorn und spiele mit kurzem Schwung." },
        { q: "Sollte ich Spiele machen oder üben?", a: "Beides. Übe 70–80 % der Einheit und teste es danach in Spielen." },
      ],
    },
    {
      slug: "match-play-prep",
      emoji: "🏆",
      title: "Wettkampfvorbereitung",
      short: "Aufschlag-Return-Muster und Drucksituationen vor einem Turnier.",
      metaTitle: "Tischtennis-Wettkampfvorbereitung (vor dem Turnier)",
      metaDescription:
        "Eine 60-minütige Wettkampf-Einheit: Aufschlag-und-Dritter-Ball-Muster, Drucksituationen und taktisches Spiel vor Punktspiel oder Turnier.",
      level: "Intermediate",
      sessionType: "match",
      intro:
        "In der Woche vor einem Punktspiel oder Turnier verschiebst du den Fokus von Technik auf Entscheidungsfindung. Diese Einheit trainiert deine Standardmuster und baut Druck auf, damit sich der Wettkampftag vertraut anfühlt. Logge die Übungsspiele als Matches, um deine Siegquote zu sehen.",
      blocks: [
        {
          title: "Aufwärmen",
          items: [
            { name: "Einlaufen, dynamisches Dehnen", minutes: 4 },
            { name: "VH-/RH-Ballwechsel und Kurzspiel", minutes: 6 },
          ],
        },
        {
          title: "Muster",
          items: [
            { name: "Dein bester Aufschlag + Angriff mit dem dritten Ball", minutes: 10 },
            { name: "Return + vierter Ball", minutes: 8 },
            { name: "Start bei 8:8, 9:9, Einstand (Drucksituationen)", minutes: 10 },
          ],
        },
        {
          title: "Wettkampf",
          items: [
            { name: "Best of 5 gegen einen Trainingspartner", minutes: 18, note: "Als Match mit Satzergebnissen loggen" },
            { name: "Cool-down und Reflexion", minutes: 4 },
          ],
        },
      ],
      tips: [
        { title: "Zwei Aufschläge reichen", body: "Wähle zwei Aufschläge, denen du vertraust. Der Wettkampftag ist nicht die Zeit zum Experimentieren." },
        { title: "Gegner mit Notizen scouten", body: "Notiere Spielstil und Schlaghand jedes Gegners, damit du dich beim nächsten Mal darauf einstellen kannst." },
        { title: "Belastung reduzieren", body: "Halte den Tag vor einem Turnier kurz und leicht. Deine Heatmap zeigt die Serie trotzdem." },
      ],
      faqs: [
        { q: "Wie sollte ich in der Woche vor einem Turnier trainieren?", a: "Reduziere den Umfang, halte die Intensität und konzentriere dich auf Aufschlag-Return-Muster und Drucksituationen." },
        { q: "Was sind Drucksituationen?", a: "Sätze, die bei einem knappen Stand wie 8:8 oder 9:9 beginnen, sodass jeder Punkt ab dem ersten Aufschlag zählt." },
        { q: "Sollte ich Übungsspiele loggen?", a: "Ja. Wenn du Übungs- und Turnierspiele getrennt loggst, siehst du, ob sich deine Trainingsform überträgt." },
      ],
    },
  ],
};
