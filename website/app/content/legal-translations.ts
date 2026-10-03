import { appNames, links, SITE_URL } from "./site";
import type { LegalDocument } from "./legal";
import type { Locale } from "../i18n/config";

const contact = `[${links.email}](mailto:${links.email})`;

export const legalTranslations: Partial<Record<Locale, { privacy: LegalDocument; terms: LegalDocument }>> & {
  en: { privacy: LegalDocument; terms: LegalDocument };
} = {
  en: {
    privacy: {
      title: "Privacy Policy",
      description: `How ${appNames.en.name} handles your data: what stays on your device, what the app sends, and who receives it.`,
      updated: "October 1, 2026",
      intro: `${appNames.en.name} is a training journal for table tennis players, made by Nineva Studios ("we", "us"). This policy covers the ${appNames.en.name} apps for iOS and Android and the website at ${SITE_URL}. The short version: there are no accounts, your training log stays on your device, we never sell data, and the app shows no ads.`,
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
    },
    terms: {
      title: "Terms of Use",
      description: `The terms for using the ${appNames.en.name} apps, TT Tracker Pro and this website.`,
      updated: "October 1, 2026",
      intro: `These terms apply to the ${appNames.en.name} apps for iOS and Android and the website at ${SITE_URL}, provided by Nineva Studios ("we", "us"). By downloading or using them you agree to these terms. If you do not agree, please do not use them.`,
      sections: [
        {
          heading: "The app",
          blocks: [
            `${appNames.en.name} lets you log table tennis training sessions, matches and opponents, and see statistics about them. We grant you a personal, non-exclusive, non-transferable licence to use the app on devices you own or control, for your own non-commercial use.`,
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
    },
  },
  es: {
    privacy: {
      title: "Política de Privacidad",
      description: `Cómo gestiona tus datos ${appNames.es.name}: qué permanece en tu dispositivo, qué envía la aplicación y quién lo recibe.`,
      updated: "1 de octubre de 2026",
      intro: `${appNames.es.name} es un diario de entrenamiento para jugadores de tenis de mesa, desarrollado por Nineva Studios («nosotros»). Esta política cubre las aplicaciones ${appNames.es.name} para iOS y Android y el sitio web en ${SITE_URL}. En resumen: no hay cuentas de usuario, tus datos de entrenamiento permanecen en tu dispositivo, nunca vendemos datos y la aplicación no contiene anuncios.`,
      sections: [
        {
          heading: "Los datos que introduces",
          blocks: [
            "Las sesiones de entrenamiento, partidos, oponentes (nombres, clubes, puntuaciones, estilo de juego, notas) y tus ajustes se guardan en una base de datos local en tu dispositivo. Nosotros no los recibimos y nunca forman parte de analíticas ni informes de fallos.",
            "En iOS, los widgets de la pantalla de inicio y bloqueo leen un resumen de tus entrenamientos desde el almacenamiento compartido en el dispositivo. No sale del dispositivo.",
            "Eliminar la aplicación borra estos datos, a menos que uses la sincronización de iCloud (ver más abajo) o las copias de seguridad de tu propio dispositivo.",
          ],
        },
        {
          heading: "Sincronización con iCloud (iOS, Pro)",
          blocks: [
            "Si la sincronización con iCloud está disponible y la activas, tus sesiones, partidos y oponentes se copian a tu base de datos **privada** de iCloud a través de CloudKit de Apple, para sincronizarse con tus otros dispositivos vinculados a la misma cuenta de Apple. Solo tú puedes leer tu base de datos privada de iCloud: nosotros no tenemos acceso y Apple la gestiona bajo la [Política de Privacidad de Apple](https://www.apple.com/legal/privacy/).",
            "Los elementos eliminados se conservan en iCloud como marcadores sin contenido para reflejar el borrado en todos tus dispositivos. Desactivar la sincronización la detiene en ese dispositivo.",
          ],
        },
        {
          heading: "Qué envía la aplicación y a quién",
          blocks: [
            "La aplicación genera un identificador aleatorio la primera vez que se inicia (visible como ID de usuario en Ajustes). No está vinculado a tu nombre, correo ni cuentas de Apple o Google.",
            {
              list: [
                "**Analíticas de uso — PostHog** (PostHog Inc., servidores en la UE, Fráncfort). Qué pantallas se abren y qué funciones se utilizan (por ejemplo, tipo de sesión, duración y RPE). También versión de la app, modelo de dispositivo, sistema operativo, idioma y ubicación aproximada por IP. Solo las versiones oficiales de producción envían analíticas. [Política de privacidad de PostHog](https://posthog.com/privacy).",
                "**Informes de errores — Sentry** (Functional Software, Inc., Estados Unidos). Cuando la aplicación sufre un fallo técnico: detalles del error, versión de la app, modelo de dispositivo y eventos recientes. [Política de privacidad de Sentry](https://sentry.io/privacy/).",
                "**Gestión de compras — RevenueCat** (RevenueCat, Inc., Estados Unidos). Las compras se procesan a través de App Store o Google Play. RevenueCat recibe el recibo de compra para verificar y restaurar Pro en tus dispositivos. [Política de privacidad de RevenueCat](https://www.revenuecat.com/privacy/).",
              ],
            },
            "Si envías comentarios desde la app, se abrirá tu cliente de correo con un mensaje dirigido a nosotros con la versión de la app y tu ID de usuario. Usamos tu dirección únicamente para responderte.",
          ],
        },
        {
          heading: "Lo que no hacemos",
          blocks: [
            {
              list: [
                "No vendemos, alquilamos ni compartimos tus datos con fines publicitarios.",
                "La app no muestra publicidad, no incluye SDKs de anuncios y no te rastrea en apps o webs de terceros.",
                "No hay registro obligatorio y nunca te pediremos tu nombre, correo, teléfono o contactos.",
              ],
            },
          ],
        },
        {
          heading: "Este sitio web",
          blocks: [
            "El sitio web utiliza Google Analytics (Google LLC) para medir visitas anónimas. Tu elección de tema y los saques favoritos se almacenan localmente en tu navegador y nunca se nos envían.",
          ],
        },
        {
          heading: "Base legal y tratamiento",
          blocks: [
            "Utilizamos analíticas e informes de fallos con el fin legítimo de garantizar la estabilidad de la aplicación. Los datos de compra se procesan para desbloquear las funciones adquiridas.",
          ],
        },
        {
          heading: "Conservación de datos",
          blocks: [
            "Las analíticas se conservan únicamente el tiempo necesario según las políticas de PostHog y Sentry. Los registros de compras se guardan para cumplir obligaciones legales.",
          ],
        },
        {
          heading: "Transferencias internacionales",
          blocks: [
            "Sentry y RevenueCat tienen su sede en EE. UU. En caso de transferir datos de usuarios de la UE o Reino Unido, se aplican las Cláusulas Contractuales Tipo de la UE.",
          ],
        },
        {
          heading: "Tus derechos",
          blocks: [
            `Puedes solicitar el acceso, rectificación o supresión de los datos asociados a tu ID de usuario escribiendo a ${contact} indicando tu ID de usuario de Ajustes.`,
            "Tus entrenamientos están guardados en tu propio dispositivo y en tu cuenta de iCloud, de donde puedes eliminarlos en cualquier momento.",
          ],
        },
        {
          heading: "Menores de edad",
          blocks: [
            "La aplicación no está dirigida a menores de 13 años y no recopilamos conscientemente datos personales de menores.",
          ],
        },
        {
          heading: "Modificaciones",
          blocks: [
            "Si cambian los servicios utilizados por la aplicación, actualizaremos esta página y la fecha indicada arriba.",
          ],
        },
        {
          heading: "Contacto",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
    terms: {
      title: "Términos de Uso",
      description: `Condiciones de uso de las aplicaciones ${appNames.es.name}, TT Tracker Pro y este sitio web.`,
      updated: "1 de octubre de 2026",
      intro: `Estos términos se aplican a las aplicaciones ${appNames.es.name} para iOS y Android y al sitio web en ${SITE_URL}, titularidad de Nineva Studios («nosotros»). Al descargar o utilizar la app, aceptas estas condiciones.`,
      sections: [
        {
          heading: "La aplicación",
          blocks: [
            `${appNames.es.name} te permite registrar sesiones de entrenamiento, partidos y oponentes de tenis de mesa, y consultar estadísticas de progreso. Te otorgamos una licencia personal, no exclusiva e intransferible para tu uso particular no comercial.`,
            "En iOS, también resulta de aplicación el [Acuerdo de Licencia de Usuario Final Estándar de Apple](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).",
          ],
        },
        {
          heading: "TT Tracker Pro",
          blocks: [
            "TT Tracker Pro es una **compra única** opcional, no una suscripción. Desbloquea las funciones Pro de por vida en todos los dispositivos vinculados a la misma cuenta de Apple o Google.",
            {
              list: [
                "El cobro lo tramita la App Store o Google Play. Consulta los precios en la aplicación antes de adquirirlo.",
                "Utiliza «Restaurar compras» para reactivar Pro al cambiar de dispositivo o reinstalar.",
                "Las devoluciones se gestionan directamente a través de Apple o Google según sus propias políticas.",
              ],
            },
          ],
        },
        {
          heading: "Tus datos",
          blocks: [
            `La información que introduces en la aplicación te pertenece. Se almacena en tu dispositivo y eres responsable de realizar copias de seguridad. Más detalles en nuestra [Política de Privacidad](/privacy).`,
          ],
        },
        {
          heading: "Exención de responsabilidad médica",
          blocks: [
            "La aplicación y los planes de entrenamiento incluidos tienen fines meramente informativos y de registro personal. No constituyen asesoramiento médico ni profesional. Consulta con un especialista antes de iniciar un programa de entrenamiento físico exigente.",
          ],
        },
        {
          heading: "Uso aceptable",
          blocks: [
            "No está permitido copiar, descompilar, aplicar ingeniería inversa ni redistribuir la aplicación, salvo en los casos expresamente previstos por la legislación aplicable.",
          ],
        },
        {
          heading: "Propiedad intelectual y marcas",
          blocks: [
            "La aplicación, la web, los diseños, textos y código pertenecen a Nineva Studios. App Store es una marca de servicio de Apple Inc. Google Play es una marca comercial de Google LLC.",
          ],
        },
        {
          heading: "Limitación de responsabilidad",
          blocks: [
            "En la medida en que la legislación lo permita, Nineva Studios no se hace responsable de daños indirectos ni pérdidas de datos derivadas del uso de la aplicación o el sitio web.",
          ],
        },
        {
          heading: "Contacto",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
  },
  de: {
    privacy: {
      title: "Datenschutzerklärung",
      description: `Wie ${appNames.de.name} mit Ihren Daten umgeht: Was auf Ihrem Gerät verbleibt, was übertragen wird und wer Zugriff hat.`,
      updated: "1. Oktober 2026",
      intro: `${appNames.de.name} ist ein Trainingstagebuch für Tischtennisspieler, entwickelt von Nineva Studios („wir“, „uns“). Diese Erklärung gilt für die ${appNames.de.name}-Apps für iOS und Android sowie die Website unter ${SITE_URL}. Kurz zusammengefasst: Es gibt keine Benutzerkonten, Ihre Trainingsdaten verbleiben auf Ihrem Gerät, Daten werden niemals verkauft und die App ist werbefrei.`,
      sections: [
        {
          heading: "Die von Ihnen eingegebenen Daten",
          blocks: [
            "Trainingseinheiten, Spiele, Gegner (Namen, Vereine, Spielstile, Notizen) und Ihre Einstellungen werden lokal in einer Datenbank auf Ihrem Endgerät gespeichert. Wir haben darauf keinen Zugriff; sie sind niemals Teil von Analyse- oder Fehlerberichten.",
            "Unter iOS lesen Widgets für den Sperr- und Startbildschirm eine Zusammenfassung Ihrer Trainingsdaten aus dem lokalen App-Speicher. Die Daten verlassen das Gerät nicht.",
            "Das Löschen der App löscht diese Daten, es sei denn, Sie nutzen die iCloud-Synchronisierung oder Gerätesicherungen.",
          ],
        },
        {
          heading: "iCloud-Synchronisierung (iOS, Pro)",
          blocks: [
            "Wenn Sie die optionale iCloud-Synchronisierung aktivieren, werden Ihre Einheiten und Spiele über Apple CloudKit in Ihre **private** iCloud-Datenbank kopiert. Nur Sie haben Zugriff darauf. Apple verarbeitet diese Daten gemäß der [Apple Datenschutzrichtlinie](https://www.apple.com/legal/privacy/).",
          ],
        },
        {
          heading: "Datenübertragungen an Dritte",
          blocks: [
            "Die App erstellt beim ersten Start eine zufällige Kennung (Benutzer-ID in den Einstellungen). Sie ist nicht mit Ihrem Namen oder Konto verknüpft.",
            {
              list: [
                "**Nutzungsanalyse — PostHog** (PostHog Inc., Serverstandort in der EU, Frankfurt). Erfassung von Bildschirmaufrufen und Funktionsnutzung. [PostHog Datenschutz](https://posthog.com/privacy).",
                "**Absturzberichte — Sentry** (Functional Software, Inc., USA). Technische Fehlerdetails zur Behebung von Softwarefehlern. [Sentry Datenschutz](https://sentry.io/privacy/).",
                "**Kaufabwicklung — RevenueCat** (RevenueCat, Inc., USA). Prüfung und Wiederherstellung von In-App-Käufen über App Store oder Google Play. [RevenueCat Datenschutz](https://www.revenuecat.com/privacy/).",
              ],
            },
          ],
        },
        {
          heading: "Was wir nicht tun",
          blocks: [
            {
              list: [
                "Kein Verkauf oder Vermietung von Daten an Werbenetzwerke.",
                "Keine Werbung und keine Werbe-SDKs in der Anwendung.",
                "Keine Registrierungspflicht; keine Abfrage von Kontaktdaten.",
              ],
            },
          ],
        },
        {
          heading: "Diese Website",
          blocks: [
            "Die Website nutzt Google Analytics zur statistischen Reichweitenmessung. Ihre Theme-Einstellung und favorisierte Aufschläge verbleiben lokal im Speicher Ihres Browsers.",
          ],
        },
        {
          heading: "Ihre Rechte",
          blocks: [
            `Sie haben das Recht auf Auskunft, Berichtigung oder Löschung Ihrer Daten (DSGVO). Kontaktieren Sie uns unter ${contact} unter Angabe Ihrer Benutzer-ID.`,
          ],
        },
        {
          heading: "Kontakt",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
    terms: {
      title: "Nutzungsbedingungen",
      description: `Bedingungen für die Nutzung der ${appNames.de.name}-Apps, TT Tracker Pro und dieser Website.`,
      updated: "1. Oktober 2026",
      intro: `Diese Bedingungen regeln die Nutzung der Apps und Website von ${appNames.de.name}, bereitgestellt von Nineva Studios. Mit dem Download oder der Nutzung stimmen Sie diesen Bedingungen zu.`,
      sections: [
        {
          heading: "Die App",
          blocks: [
            `${appNames.de.name} ermöglicht das Führen eines Tischtennis-Trainingstagebuchs. Wir gewähren Ihnen eine persönliche, nicht-exklusive Lizenz zur privaten Nutzung.`,
          ],
        },
        {
          heading: "TT Tracker Pro",
          blocks: [
            "TT Tracker Pro ist ein **einmaliger Kauf** (kein Abonnement). Er schaltet zusätzliche Pro-Funktionen auf allen Geräten Ihres jeweiligen Apple- oder Google-Kontos frei.",
          ],
        },
        {
          heading: "Keine medizinische Beratung",
          blocks: [
            "Die App und die Trainingspläne dienen der allgemeinen sportlichen Dokumentation und stellen keine medizinische oder gesundheitliche Beratung dar.",
          ],
        },
        {
          heading: "Haftungsbeschränkung",
          blocks: [
            "Soweit gesetzlich zulässig, haftet Nineva Studios nicht für indirekte Schäden oder Datenverluste. Zwingende gesetzliche Verbraucherrechte bleiben unberührt.",
          ],
        },
        {
          heading: "Kontakt",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
  },
  fr: {
    privacy: {
      title: "Politique de Confidentialité",
      description: `Comment ${appNames.fr.name} protège vos données : ce qui reste sur votre appareil, ce qui est transmis et à qui.`,
      updated: "1er octobre 2026",
      intro: `${appNames.fr.name} est un journal d'entraînement pour les joueurs de tennis de table, édité par Nineva Studios (« nous »). Cette politique s'applique aux applications pour iOS et Android et au site ${SITE_URL}. En résumé : aucun compte requis, vos données restent sur votre appareil, nous ne vendons aucune donnée et l'application ne diffuse aucune publicité.`,
      sections: [
        {
          heading: "Les données que vous saisissez",
          blocks: [
            "Vos séances d'entraînement, matchs, adversaires et réglages sont stockés localement sur votre appareil. Nous n'y avons pas accès et ils ne sont jamais partagés avec des tiers.",
            "Sous iOS, les widgets consultent un résumé local qui ne quitte jamais l'appareil.",
          ],
        },
        {
          heading: "Synchronisation iCloud (iOS, Pro)",
          blocks: [
            "Si vous activez iCloud, vos données sont synchronisées via votre base de données **privée** CloudKit d'Apple. Seul vous pouvez y accéder sous la [Politique de confidentialité Apple](https://www.apple.com/legal/privacy/).",
          ],
        },
        {
          heading: "Données transmises et partenaires",
          blocks: [
            "L'application génère un identifiant aléatoire (ID utilisateur dans Réglages) sans lien avec votre identité.",
            {
              list: [
                "**Analytique d'utilisation — PostHog** (serveurs dans l'UE à Francfort). Mesure anonyme de l'utilisation des écrans. [Confidentialité PostHog](https://posthog.com/privacy).",
                "**Rapports de plantage — Sentry** (États-Unis). Analyse des erreurs techniques de l'application. [Confidentialité Sentry](https://sentry.io/privacy/).",
                "**Achats — RevenueCat** (États-Unis). Validation et restauration des achats intégrés. [Confidentialité RevenueCat](https://www.revenuecat.com/privacy/).",
              ],
            },
          ],
        },
        {
          heading: "Vos droits",
          blocks: [
            `Conformément au RGPD, vous disposez d'un droit d'accès et de suppression de vos données en nous écrivant à ${contact} avec votre identifiant utilisateur.`,
          ],
        },
        {
          heading: "Contact",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
    terms: {
      title: "Conditions d'Utilisation",
      description: `Conditions applicables à l'utilisation des applications ${appNames.fr.name}, de TT Tracker Pro et du site.`,
      updated: "1er octobre 2026",
      intro: `Ces conditions régissent l'accès aux applications et au site de ${appNames.fr.name}. En les utilisant, vous acceptez ces dispositions.`,
      sections: [
        {
          heading: "L'application",
          blocks: [
            `${appNames.fr.name} vous aide à consigner vos entraînements et matchs. Nous vous accordons une licence personnelle et non exclusive pour un usage privé.`,
          ],
        },
        {
          heading: "TT Tracker Pro",
          blocks: [
            "TT Tracker Pro est un **achat unique** et non un abonnement. Il débloque les fonctionnalités Pro sur l'ensemble de vos appareils connectés au même compte.",
          ],
        },
        {
          heading: "Limitation de responsabilité",
          blocks: [
            "L'application est fournie en l'état sans garantie d'aucune sorte au-delà des obligations légales. Vos droits légaux de consommateur demeurent préservés.",
          ],
        },
        {
          heading: "Contact",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
  },
  pt: {
    privacy: {
      title: "Política de Privacidade",
      description: `Como o ${appNames.pt.name} trata os seus dados: o que permanece no dispositivo e quais dados técnicos são transmitidos.`,
      updated: "1 de outubro de 2026",
      intro: `O ${appNames.pt.name} é um diário de treino para mesatenistas, desenvolvido pela Nineva Studios («nós»). Em suma: não exigimos cadastro, os dados de treino ficam no seu aparelho, nunca vendemos dados e o aplicativo não contém anúncios.`,
      sections: [
        {
          heading: "Seus dados de treino",
          blocks: [
            "Sessões, partidas, adversários e notas ficam armazenados exclusivamente no seu dispositivo e não são enviados aos nossos servidores.",
          ],
        },
        {
          heading: "Sincronização iCloud (iOS, Pro)",
          blocks: [
            "A sincronização opcional com o iCloud utiliza sua base privada do CloudKit da Apple, protegida pela política de privacidade da Apple.",
          ],
        },
        {
          heading: "Serviços de terceiros",
          blocks: [
            "Utilizamos PostHog (dados na UE) para métricas de uso, Sentry para relatórios de falhas e RevenueCat para validação de compras.",
          ],
        },
        {
          heading: "Contato",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
    terms: {
      title: "Termos de Uso",
      description: `Termos de utilização dos aplicativos ${appNames.pt.name}, TT Tracker Pro e do website.`,
      updated: "1 de outubro de 2026",
      intro: `Estes termos regulam o uso dos aplicativos ${appNames.pt.name} e do site oficial.`,
      sections: [
        {
          heading: "O aplicativo",
          blocks: [
            `Concedemos a você uma licença pessoal e não transferível para usar o aplicativo para fins próprios e não comerciais.`,
          ],
        },
        {
          heading: "TT Tracker Pro",
          blocks: [
            "O TT Tracker Pro é uma **compra única** que desbloqueia recursos adicionais permanentemente nos aparelhos vinculados à mesma conta.",
          ],
        },
        {
          heading: "Contato",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
  },
  ja: {
    privacy: {
      title: "プライバシーポリシー",
      description: `「${appNames.ja.name}」におけるユーザーデータの取り扱いについて：端末内に保持されるデータと外部送信される情報。`,
      updated: "2026年10月1日",
      intro: `「${appNames.ja.name}」はNineva Studios（以下「当社」）が提供する卓球選手のための練習記録アプリです。要約：アカウント作成は不要で、練習ログはお使いの端末内にのみ保存され、データの販売や広告の表示は一切行いません。`,
      sections: [
        {
          heading: "入力されるデータについて",
          blocks: [
            "練習セッション、試合結果、対戦相手（氏名、所属、戦型、メモ等）および各種設定は、端末内のローカルデータベースにのみ保存されます。当社がこれらのデータを収集・閲覧することはありません。",
            "iOSのウィジェット機能は端末内の共有領域から概要を読み取りますが、外部へ送信されることはありません。",
          ],
        },
        {
          heading: "iCloud同期（iOS・Pro機能）",
          blocks: [
            "Pro機能のiCloud同期をご利用の場合、データはお客様個人のプライベートなCloudKitデータベースを通じて同期されます。当社がアクセスすることはできません。",
          ],
        },
        {
          heading: "外部送信される技術情報",
          blocks: [
            "アプリの改善と品質維持のため、個人を特定しない形で以下のサービスを利用しています：",
            {
              list: [
                "**利用状況解析 — PostHog**（欧州フランクフルトのサーバー）：画面遷移や機能の利用頻度等の匿名統計。",
                "**エラー・クラッシュ報告 — Sentry**：アプリのクラッシュ情報およびエラー解析。",
                "**購入管理 — RevenueCat**：App StoreまたはGoogle Playでの購入状態の検証および復元。",
              ],
            },
          ],
        },
        {
          heading: "お問い合わせ",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
    terms: {
      title: "利用規約",
      description: `「${appNames.ja.name}」、TT Tracker Proおよび本ウェブサイトの利用規約。`,
      updated: "2026年10月1日",
      intro: `本規約は、Nineva Studiosが提供する「${appNames.ja.name}」アプリおよび関連ウェブサイトの利用条件を定めるものです。`,
      sections: [
        {
          heading: "アプリの利用許諾",
          blocks: [
            "当社はお客様に対し、個人的かつ非営利の目的で本アプリを利用するための非独占的なライセンスを付与します。",
          ],
        },
        {
          heading: "TT Tracker Pro",
          blocks: [
            "TT Tracker Proはサブスクリプションではなく**買い切りの一括購入**です。同一のApple AccountまたはGoogleアカウントを持つ端末において永続的にPro機能をご利用いただけます。",
          ],
        },
        {
          heading: "免責事項",
          blocks: [
            "本アプリおよび掲載されている練習メニューは一般的なスポーツ記録および情報提供を目的としており、医療的助言や指導を構成するものではありません。",
          ],
        },
        {
          heading: "お問い合わせ",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
  },
  zh: {
    privacy: {
      title: "隐私政策",
      description: `「${appNames.zh.name}」如何处理您的数据：存储在设备上的内容、技术传输信息及相关第三方服务。`,
      updated: "2026年10月1日",
      intro: `「${appNames.zh.name}」是由 Nineva Studios（“我们”）专为乒乓球爱好者打造的训练日志应用。简要说明：无需注册账号，训练与比赛记录保存在您的本地设备中，我们绝不出售任何数据，应用内无任何广告。`,
      sections: [
        {
          heading: "您输入的数据",
          blocks: [
            "训练记录、比赛比分、对手资料（姓名、打法、战绩、备注）及偏好设置均保存在您的设备本地数据库中。我们不会上传或获取这些个人内容。",
            "在 iOS 上，小组件通过设备本地共享储存读取概览，数据绝不离开您的手机。",
          ],
        },
        {
          heading: "iCloud 同步（iOS Pro）",
          blocks: [
            "如果您开启了 iCloud 云同步，数据将通过 Apple CloudKit 同步至您个人的私有 iCloud 空间，受 [Apple 隐私政策](https://www.apple.com/legal/privacy/) 保护，我们无法查看。",
          ],
        },
        {
          heading: "技术数据与第三方服务",
          blocks: [
            "为了保障软件稳定性，应用会生成随机匿名标识符并调用以下服务：",
            {
              list: [
                "**使用统计 — PostHog**（数据存储在欧盟法兰克福）：记录功能使用频次等匿名数据。",
                "**崩溃报告 — Sentry**：分析应用运行时的崩溃错误和系统日志。",
                "**购买验证 — RevenueCat**：用于在您的多台设备上验证和恢复 Pro 购买凭证。",
              ],
            },
          ],
        },
        {
          heading: "联系我们",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
    terms: {
      title: "使用条款",
      description: `「${appNames.zh.name}」移动应用、TT Tracker Pro 及本网站的使用条款。`,
      updated: "2026年10月1日",
      intro: `本条款适用于 Nineva Studios 提供的「${appNames.zh.name}」应用及官方网站。下载或使用本应用即表示您同意本条款。`,
      sections: [
        {
          heading: "应用许可",
          blocks: [
            "我们授予您个人的、非商业性质的、不可转让的非排他性使用许可。",
          ],
        },
        {
          heading: "TT Tracker Pro",
          blocks: [
            "TT Tracker Pro 是一项**一次性买断**服务（非订阅制）。购买后可在登录同一 Apple 或 Google 账号的所有设备上永久解锁 Pro 功能。",
          ],
        },
        {
          heading: "免责声明",
          blocks: [
            "本应用提供的数据分析与训练计划仅供参考，不构成医疗或专业运动教练建议。请根据个人身体状况合理安排训练。",
          ],
        },
        {
          heading: "联系方式",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
  },
  ko: {
    privacy: {
      title: "개인정보 처리방침",
      description: `「${appNames.ko.name}」의 개인정보 처리 안내: 기기 내 저장 데이터, 외부 전송 항목 및 제3자 제공 현황.`,
      updated: "2026년 10월 1일",
      intro: `「${appNames.ko.name}」은 Nineva Studios(이하 '회사')가 개발한 탁구인을 위한 훈련일지 앱입니다. 요약: 별도의 회원가입이나 계정이 필요 없으며, 모든 기록은 사용자 기기에 안전하게 보관되고, 데이터 판매나 광고는 절대 하지 않습니다.`,
      sections: [
        {
          heading: "사용자가 입력하는 데이터",
          blocks: [
            "훈련 세션, 경기 점수, 상대 선수 정보(이름, 클럽, 전형, 메모) 및 사용자 설정은 사용자 기기의 로컬 데이터베이스에만 저장됩니다. 회사는 이를 수집하거나 열람하지 않습니다.",
          ],
        },
        {
          heading: "iCloud 동기화 (iOS Pro)",
          blocks: [
            "iCloud 동기화 활성화 시 사용자의 비공개 CloudKit 데이터베이스를 통해 다른 기기와 동기화됩니다. 애플의 개인정보 처리방침에 따라 보호되며 회사에는 접근 권한이 없습니다.",
          ],
        },
        {
          heading: "외부 전송 기술 데이터",
          blocks: [
            "앱 오류 개선 및 안정성 유지를 위해 비식별화된 임의 식별자를 기반으로 다음 서비스를 이용합니다:",
            {
              list: [
                "**사용 통계 — PostHog** (EU 프랑크푸르트 서버): 익명 기능 사용 빈도 측정.",
                "**오류 보고 — Sentry** (미국): 앱 비정상 종료 시 기술적 오류 로그 분석.",
                "**구매 관리 — RevenueCat** (미국): 인앱 결제 확인 및 다중 기기 구매 복원 처리.",
              ],
            },
          ],
        },
        {
          heading: "문의하기",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
    terms: {
      title: "이용약관",
      description: `「${appNames.ko.name}」 앱, TT Tracker Pro 및 웹사이트 이용약관.`,
      updated: "2026년 10월 1일",
      intro: `본 약관은 Nineva Studios가 제공하는 「${appNames.ko.name}」 앱 및 웹사이트의 이용 조건을 규정합니다.`,
      sections: [
        {
          heading: "앱 라이선스",
          blocks: [
            "회사는 사용자에게 개인적, 비상업적 용도로 앱을 설치하고 사용할 수 있는 비독점적 권한을 부여합니다.",
          ],
        },
        {
          heading: "TT Tracker Pro",
          blocks: [
            "TT Tracker Pro는 정기 구독이 아닌 **일회성 영구 구매**입니다. 동일한 Apple 또는 Google 계정에 연결된 기기에서 영구적으로 Pro 기능을 이용할 수 있습니다.",
          ],
        },
        {
          heading: "의학적 면책 조항",
          blocks: [
            "본 앱의 통계 및 훈련 계획은 참고용 일반 정보이며 의학적 조언을 대신할 수 없습니다.",
          ],
        },
        {
          heading: "문의하기",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
  },
  it: {
    privacy: {
      title: "Informativa sulla Privacy",
      description: `Come ${appNames.it.name} gestisce i tuoi dati: cosa rimane sul tuo dispositivo e quali dati tecnici vengono trasmessi.`,
      updated: "1° ottobre 2026",
      intro: `${appNames.it.name} è un diario di allenamento per giocatori di tennistavolo, creato da Nineva Studios («noi»). In breve: nessun account richiesto, i dati rimangono sul tuo dispositivo, non vendiamo dati e non mostriamo pubblicità.`,
      sections: [
        {
          heading: "I dati che inserisci",
          blocks: [
            "Allenamenti, partite, avversari e impostazioni sono salvati esclusivamente sul tuo dispositivo e non vengono inviati ai nostri server.",
          ],
        },
        {
          heading: "Sincronizzazione iCloud (iOS, Pro)",
          blocks: [
            "La sincronizzazione opcional avviene tramite il tuo database privato CloudKit di Apple secondo la [Politica sulla Privacy di Apple](https://www.apple.com/legal/privacy/).",
          ],
        },
        {
          heading: "Servizi di terze parti",
          blocks: [
            "Utilizziamo PostHog (server nell'UE a Francoforte) per statistiche d'uso anonime, Sentry per i report sui crash e RevenueCat per la gestione degli acquisti in-app.",
          ],
        },
        {
          heading: "Contatti",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
    terms: {
      title: "Termini di Utilizzo",
      description: `Termini e condizioni per l'uso delle app ${appNames.it.name}, di TT Tracker Pro e del sito web.`,
      updated: "1° ottobre 2026",
      intro: `Questi termini regolano l'utilizzo delle applicazioni ${appNames.it.name} e del sito web forniti da Nineva Studios.`,
      sections: [
        {
          heading: "L'applicazione",
          blocks: [
            "Ti concediamo una licenza personale, non esclusiva e non trasferibile per l'utilizzo dell'app per scopi privati e non commerciali.",
          ],
        },
        {
          heading: "TT Tracker Pro",
          blocks: [
            "TT Tracker Pro è un **acquisto una tantum** (non un abbonamento). Sblocca le funzionalità Pro su tutti i dispositivi con lo stesso account Apple o Google.",
          ],
        },
        {
          heading: "Contatti",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
  },
  uk: {
    privacy: {
      title: "Політика конфіденційності",
      description: `Як додаток «${appNames.uk.name}» обробляє ваші дані: що зберігається на пристрої, які технічні дані надсилаються та хто має до них доступ.`,
      updated: "1 жовтня 2026 року",
      intro: `«${appNames.uk.name}» — це тренувальний щоденник для гравців у настільний теніс від Nineva Studios («ми»). Коротко: реєстрація не потрібна, ваші тренування зберігаються на вашому пристрої, ми ніколи не продаємо дані, а в додатку немає реклами.`,
      sections: [
        {
          heading: "Дані, які ви вводите",
          blocks: [
            "Тренування, матчі, суперники (імена, клуби, стиль гри, нотатки) та налаштування зберігаються в локальній базі даних на вашому пристрої. Ми їх не отримуємо і не використовуємо в аналітиці.",
            "Віджети на iOS читають зведення з локального сховища безпосередньо на пристрої. Дані не залишають ваш телефон.",
          ],
        },
        {
          heading: "Синхронізація iCloud (iOS, Pro)",
          blocks: [
            "Якщо ви увімкнули синхронізацію з iCloud, ваші дані копіюються до вашої **приватної** бази даних iCloud через Apple CloudKit. Доступ маєте лише ви відповідно до [Політики конфіденційності Apple](https://www.apple.com/legal/privacy/).",
          ],
        },
        {
          heading: "Що і кому надсилає додаток",
          blocks: [
            "Додаток створює випадковий анонімний ідентифікатор при першому запуску (ID користувача в Налаштуваннях). Він не пов'язаний з вашим іменем або обліковим записом.",
            {
              list: [
                "**Аналітика використання — PostHog** (сервери в ЄС, Франкфурт): анонімна статистика щодо переглянутих екранів та активності. [Політика PostHog](https://posthog.com/privacy).",
                "**Звіти про помилки — Sentry** (США): технічні деталі збоїв для виправлення неполадок. [Політика Sentry](https://sentry.io/privacy/).",
                "**Керування покупками — RevenueCat** (США): перевірка та відновлення покупок Pro на ваших пристроях. [Політика RevenueCat](https://www.revenuecat.com/privacy/).",
              ],
            },
          ],
        },
        {
          heading: "Чого ми не робимо",
          blocks: [
            {
              list: [
                "Ми не продаємо, не орендуємо та не передаємо ваші дані рекламодавцям.",
                "Додаток не містить реклами та трекерів рекламних мереж.",
                "Немає реєстрації: ми ніколи не запитуємо ваше ім'я, телефон чи контакти.",
              ],
            },
          ],
        },
        {
          heading: "Ваші права",
          blocks: [
            `Ви маєте право на доступ або видалення технічних даних, надіславши запит на ${contact} із зазначенням вашого ID користувача з Налаштувань.`,
          ],
        },
        {
          heading: "Контакти",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
    terms: {
      title: "Умови використання",
      description: `Умови користування додатками «${appNames.uk.name}», TT Tracker Pro та цим веб-сайтом.`,
      updated: "1 жовтня 2026 року",
      intro: `Ці умови регулюють використання додатків «${appNames.uk.name}» та офіційного веб-сайту від Nineva Studios. Завантажуючи або використовуючи додаток, ви погоджуєтеся з цими умовами.`,
      sections: [
        {
          heading: "Додаток",
          blocks: [
            `«${appNames.uk.name}» дозволяє вести щоденник тренувань і матчів з настільного тенісу. Ми надаємо вам особисту, невиключну ліцензію для некомерційного використання.`,
          ],
        },
        {
          heading: "TT Tracker Pro",
          blocks: [
            "TT Tracker Pro — це **одноразова покупка**, а не підписка. Вона назавжди відкриває Pro-можливості на всіх ваших пристроях з тим самим обліковим записом Apple або Google.",
          ],
        },
        {
          heading: "Не є медичною консультацією",
          blocks: [
            "Додаток і плани тренувань носять виключно інформаційний характер і не є медичними чи професійними порадами. Проконсультуйтеся з лікарем або тренером перед початком інтенсивних занять.",
          ],
        },
        {
          heading: "Контакти",
          blocks: [`Nineva Studios — ${contact}`],
        },
      ],
    },
  },
};
