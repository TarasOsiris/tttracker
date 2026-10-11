import { appNames, links, SITE_URL } from "./site";
import type { LegalDocument } from "./legal";
import type { Locale } from "../i18n/config";

const contact = `[${links.email}](mailto:${links.email})`;

/** Translations of the English documents in legal.ts; a language without one shows the English text. */
export const legalTranslations: Partial<Record<Locale, { privacy: LegalDocument; terms: LegalDocument }>> = {
  es: {
    privacy: {
      title: "Política de Privacidad",
      description: `Cómo gestiona tus datos ${appNames.es.name}: qué permanece en tu dispositivo, qué envía la aplicación y quién lo recibe.`,
      updated: "11 de octubre de 2026",
      intro: `${appNames.es.name} es un diario de entrenamiento para jugadores de tenis de mesa, desarrollado por Nineva Studios («nosotros»). Esta política cubre las aplicaciones ${appNames.es.name} para iOS y Android y el sitio web en ${SITE_URL}. En resumen: no hay cuentas de usuario, tus datos de entrenamiento permanecen en tu dispositivo, nunca vendemos datos y la aplicación no contiene anuncios.`,
      sections: [
        {
          heading: "Los datos que introduces",
          blocks: [
            "Las sesiones de entrenamiento, partidos, oponentes (nombres, clubes, puntuaciones, estilo de juego, notas) y tus ajustes se guardan en una base de datos local en tu dispositivo. Nosotros no los recibimos y nunca forman parte de analíticas ni informes de fallos.",
            "Los widgets de la pantalla de inicio (y, en iOS, los de la pantalla de bloqueo) leen un resumen de tus entrenamientos desde el almacenamiento que la app comparte con ellos en el mismo dispositivo. No sale del dispositivo.",
            "Eliminar la aplicación borra estos datos, a menos que uses la sincronización de iCloud (ver más abajo) o las copias de seguridad de tu propio dispositivo.",
          ],
        },
        {
          heading: "Sincronización con iCloud (iOS)",
          blocks: [
            "Si la sincronización con iCloud está disponible y la activas, tus sesiones, partidos y oponentes se copian a tu base de datos **privada** de iCloud a través de CloudKit de Apple, para sincronizarse con tus otros dispositivos vinculados a la misma cuenta de Apple. Solo tú puedes leer tu base de datos privada de iCloud: nosotros no tenemos acceso y Apple la gestiona bajo la [Política de Privacidad de Apple](https://www.apple.com/legal/privacy/).",
            "Los elementos eliminados se conservan en iCloud como marcadores sin contenido para reflejar el borrado en todos tus dispositivos. Desactivar la sincronización la detiene en ese dispositivo.",
          ],
        },
        {
          heading: "App Salud de Apple y Health Connect",
          blocks: [
            "Puedes vincular una sesión a un entrenamiento registrado por tu reloj o tu app de fitness: a través de la app Salud en iOS y de Health Connect en Android. La aplicación solo lee datos de salud después de que lo permitas en la pantalla de permisos del sistema, y solo para completar una sesión y mostrar lo que ocurrió durante ella. Nunca escribe nada en la app Salud ni en Health Connect.",
            {
              list: [
                "**Qué lee:** tus entrenamientos de tenis de mesa (hora de inicio y fin, app que los registró), la energía activa (calorías) y la frecuencia cardiaca registradas durante ellos y, en iOS, la puntuación de esfuerzo que hayas dado a un entrenamiento en el Apple Watch.",
                "**Dónde se quedan:** los datos de salud solo se leen y se muestran en tu dispositivo. Nunca se guardan en la base de datos de la app, nunca se nos envían ni a nosotros ni a iCloud y nunca se incluyen en analíticas ni en informes de errores.",
                "**Qué conserva la app:** solo el identificador del entrenamiento vinculado a una sesión, para que el vínculo se mantenga. Como el resto de la sesión, se sincroniza a través de tu base de datos privada de iCloud si usas la sincronización con iCloud. Al desvincular el entrenamiento o eliminar la sesión, se borra.",
                "**Lo que nunca hacemos:** los datos de salud nunca se venden, no se comparten con nadie y no se usan para publicidad, elaboración de perfiles ni ningún otro fin que no sea mostrártelos en la app.",
              ],
            },
            "Puedes impedir que la app lea datos de salud en cualquier momento: en iOS, en Ajustes → Salud → Acceso a datos y dispositivos; en Android, en los permisos de apps de Health Connect. El uso de la información recibida de Health Connect cumple la [Política de permisos de Health Connect](https://support.google.com/googleplay/android-developer/answer/12991134), incluidos sus requisitos de uso limitado.",
          ],
        },
        {
          heading: "Qué envía la aplicación y a quién",
          blocks: [
            "La aplicación genera un identificador aleatorio la primera vez que se inicia (visible como ID de usuario en Ajustes). No está vinculado a tu nombre, correo ni cuentas de Apple o Google.",
            {
              list: [
                "**Analíticas de uso — PostHog** (PostHog Inc., servidores en la UE, Fráncfort). Qué pantallas se abren y qué funciones se utilizan (por ejemplo, tipo de sesión, duración y RPE, o que se vinculó un entrenamiento, nunca datos de salud). También versión de la app, modelo de dispositivo, sistema operativo, idioma y ubicación aproximada por IP. Solo las versiones oficiales de producción envían analíticas. [Política de privacidad de PostHog](https://posthog.com/privacy).",
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
                "Los datos de salud de la app Salud o de Health Connect nunca salen de tu dispositivo a través de la app.",
              ],
            },
          ],
        },
        {
          heading: "Este sitio web",
          blocks: [
            "El sitio web utiliza Google Analytics (Google LLC) para contar visitas y ver qué páginas se leen. Funciona con el modo de consentimiento de Google. A los visitantes del EEE, el Reino Unido y Suiza se les pregunta primero: hasta que aceptas, Google Analytics no instala cookies y Google solo recibe señales sin cookies sobre cada página vista (como la página, la hora y el navegador), sin ningún identificador. En el resto del mundo, las cookies de analítica están activadas por defecto. Con las cookies permitidas, Google Analytics recibe tu dirección IP, datos del navegador y del dispositivo, y las páginas que visitas. [Cómo usa Google estos datos](https://policies.google.com/technologies/partner-sites?hl=es).",
            "Puedes aceptar o rechazar las cookies de analítica en cualquier momento desde Configuración de cookies, al pie de cada página. Esa elección, tu tema y los saques que marcas como favoritos se guardan en el almacenamiento local de tu navegador y nunca se nos envían.",
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
      updated: "11 de octubre de 2026",
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
            "La aplicación, sus estadísticas (incluidas la frecuencia cardiaca y la energía leídas de la app Salud o de Health Connect) y los planes de entrenamiento incluidos tienen fines meramente informativos y de registro personal. No constituyen asesoramiento médico ni profesional. Consulta con un especialista antes de iniciar un programa de entrenamiento físico exigente.",
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
      updated: "11. Oktober 2026",
      intro: `${appNames.de.name} ist ein Trainingstagebuch für Tischtennisspieler, entwickelt von Nineva Studios („wir“, „uns“). Diese Erklärung gilt für die ${appNames.de.name}-Apps für iOS und Android sowie die Website unter ${SITE_URL}. Kurz zusammengefasst: Es gibt keine Benutzerkonten, Ihre Trainingsdaten verbleiben auf Ihrem Gerät, Daten werden niemals verkauft und die App ist werbefrei.`,
      sections: [
        {
          heading: "Die von Ihnen eingegebenen Daten",
          blocks: [
            "Trainingseinheiten, Spiele, Gegner (Namen, Vereine, Spielstile, Notizen) und Ihre Einstellungen werden lokal in einer Datenbank auf Ihrem Endgerät gespeichert. Wir haben darauf keinen Zugriff; sie sind niemals Teil von Analyse- oder Fehlerberichten.",
            "Die Widgets für den Home-Bildschirm (und unter iOS für den Sperrbildschirm) lesen eine Zusammenfassung Ihrer Trainingsdaten aus dem lokalen App-Speicher. Die Daten verlassen das Gerät nicht.",
            "Das Löschen der App löscht diese Daten, es sei denn, Sie nutzen die iCloud-Synchronisierung oder Gerätesicherungen.",
          ],
        },
        {
          heading: "iCloud-Synchronisierung (iOS)",
          blocks: [
            "Wenn Sie die optionale iCloud-Synchronisierung aktivieren, werden Ihre Einheiten und Spiele über Apple CloudKit in Ihre **private** iCloud-Datenbank kopiert. Nur Sie haben Zugriff darauf. Apple verarbeitet diese Daten gemäß der [Apple Datenschutzrichtlinie](https://www.apple.com/legal/privacy/).",
          ],
        },
        {
          heading: "Apple Health und Health Connect",
          blocks: [
            "Sie können eine Trainingseinheit mit einem Training verknüpfen, das Ihre Uhr oder Fitness-App aufgezeichnet hat: unter iOS über Apple Health, unter Android über Health Connect. Die App liest Gesundheitsdaten erst, nachdem Sie dies im Berechtigungsdialog des Systems erlaubt haben, und nur, um eine Einheit auszufüllen und zu zeigen, was während der Einheit geschah. Sie schreibt niemals Daten in Apple Health oder Health Connect.",
            {
              list: [
                "**Was gelesen wird:** Ihre Tischtennis-Trainings (Start- und Endzeit, aufzeichnende App), die dabei erfasste aktive Energie (Kalorien) und Herzfrequenz sowie unter iOS die Anstrengung, mit der Sie ein Training auf der Apple Watch bewertet haben.",
                "**Wo die Daten bleiben:** Gesundheitsdaten werden ausschließlich auf Ihrem Gerät gelesen und angezeigt. Sie werden nie in der Datenbank der App gespeichert, nie an uns oder an iCloud gesendet und sind nie Teil von Analyse- oder Absturzberichten.",
                "**Was die App speichert:** nur die Kennung des Trainings, mit dem eine Einheit verknüpft ist, damit die Verknüpfung erhalten bleibt. Wie der Rest der Einheit wird sie über Ihre private iCloud-Datenbank synchronisiert, wenn Sie die iCloud-Synchronisierung nutzen. Wenn Sie die Verknüpfung aufheben oder die Einheit löschen, wird sie entfernt.",
                "**Was wir niemals tun:** Gesundheitsdaten werden niemals verkauft, an Dritte weitergegeben oder für Werbung, Profilbildung oder irgendeinen anderen Zweck verwendet, als sie Ihnen in der App anzuzeigen.",
              ],
            },
            "Sie können der App das Lesen von Gesundheitsdaten jederzeit entziehen: unter iOS in Einstellungen → Health → Datenzugriff & Geräte, unter Android in den App-Berechtigungen von Health Connect. Die Verwendung von Informationen aus Health Connect erfolgt gemäß der [Richtlinie zu Health Connect-Berechtigungen](https://support.google.com/googleplay/android-developer/answer/12991134), einschließlich ihrer Anforderungen zur eingeschränkten Nutzung (Limited Use).",
          ],
        },
        {
          heading: "Datenübertragungen an Dritte",
          blocks: [
            "Die App erstellt beim ersten Start eine zufällige Kennung (Benutzer-ID in den Einstellungen). Sie ist nicht mit Ihrem Namen oder Konto verknüpft.",
            {
              list: [
                "**Nutzungsanalyse — PostHog** (PostHog Inc., Serverstandort in der EU, Frankfurt). Erfassung von Bildschirmaufrufen und Funktionsnutzung, etwa dass ein Training verknüpft wurde (niemals Gesundheitsdaten). [PostHog Datenschutz](https://posthog.com/privacy).",
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
                "Gesundheitsdaten aus Apple Health oder Health Connect verlassen Ihr Gerät niemals über die App.",
              ],
            },
          ],
        },
        {
          heading: "Diese Website",
          blocks: [
            "Die Website nutzt Google Analytics (Google LLC), um Besuche zu zählen und zu sehen, welche Seiten gelesen werden. Sie arbeitet mit dem Einwilligungsmodus von Google. Besucher aus dem EWR, dem Vereinigten Königreich und der Schweiz werden zuerst gefragt: Bis Sie zustimmen, setzt Google Analytics keine Cookies, und Google erhält zu jedem Seitenaufruf nur cookielose Signale (etwa Seite, Uhrzeit und Browser) ohne Kennung. Anderswo sind Analyse-Cookies standardmäßig aktiv. Sind Cookies erlaubt, erhält Google Analytics Ihre IP-Adresse, Browser- und Geräteangaben sowie die besuchten Seiten. [Wie Google diese Daten verwendet](https://policies.google.com/technologies/partner-sites?hl=de).",
            "Sie können Analyse-Cookies jederzeit über „Cookie-Einstellungen“ unten auf jeder Seite annehmen oder ablehnen. Diese Wahl, Ihre Theme-Einstellung und favorisierte Aufschläge verbleiben im lokalen Speicher Ihres Browsers und werden nie an uns gesendet.",
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
            "Die App, ihre Statistiken (einschließlich der aus Apple Health oder Health Connect gelesenen Herzfrequenz- und Energiewerte) und die Trainingspläne dienen der allgemeinen sportlichen Dokumentation und stellen keine medizinische oder gesundheitliche Beratung dar.",
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
      updated: "11 octobre 2026",
      intro: `${appNames.fr.name} est un journal d'entraînement pour les joueurs de tennis de table, édité par Nineva Studios (« nous »). Cette politique s'applique aux applications pour iOS et Android et au site ${SITE_URL}. En résumé : aucun compte requis, vos données restent sur votre appareil, nous ne vendons aucune donnée et l'application ne diffuse aucune publicité.`,
      sections: [
        {
          heading: "Les données que vous saisissez",
          blocks: [
            "Vos séances d'entraînement, matchs, adversaires et réglages sont stockés localement sur votre appareil. Nous n'y avons pas accès et ils ne sont jamais partagés avec des tiers.",
            "Les widgets (écran d'accueil, et écran verrouillé sous iOS) consultent un résumé local qui ne quitte jamais l'appareil.",
          ],
        },
        {
          heading: "Synchronisation iCloud (iOS)",
          blocks: [
            "Si vous activez iCloud, vos données sont synchronisées via votre base de données **privée** CloudKit d'Apple. Seul vous pouvez y accéder sous la [Politique de confidentialité Apple](https://www.apple.com/legal/privacy/).",
          ],
        },
        {
          heading: "App Santé d'Apple et Santé Connect",
          blocks: [
            "Vous pouvez lier une séance à un entraînement enregistré par votre montre ou votre app de fitness : via l'app Santé sur iOS, et via Santé Connect sur Android. L'application ne lit vos données de santé qu'après votre accord dans l'écran d'autorisation du système, et uniquement pour compléter une séance et montrer ce qui s'y est passé. Elle n'écrit jamais rien dans l'app Santé ni dans Santé Connect.",
            {
              list: [
                "**Ce qui est lu :** vos entraînements de tennis de table (heure de début et de fin, app d'enregistrement), l'énergie active (calories) et la fréquence cardiaque enregistrées pendant ceux-ci et, sur iOS, l'évaluation de l'effort que vous avez attribuée à un entraînement sur l'Apple Watch.",
                "**Où elles restent :** les données de santé sont lues et affichées uniquement sur votre appareil. Elles ne sont jamais enregistrées dans la base de données de l'application, jamais transmises ni à nous ni à iCloud, et jamais incluses dans les statistiques d'utilisation ou les rapports de plantage.",
                "**Ce que l'application conserve :** uniquement l'identifiant de l'entraînement auquel une séance est liée, afin que le lien soit préservé. Comme le reste de la séance, il est synchronisé via votre base de données iCloud privée si vous utilisez la synchronisation iCloud. Il est supprimé si vous dissociez l'entraînement ou supprimez la séance.",
                "**Ce que nous ne faisons jamais :** les données de santé ne sont jamais vendues, partagées avec qui que ce soit, ni utilisées à des fins publicitaires, de profilage ou à toute autre fin que leur affichage pour vous dans l'application.",
              ],
            },
            "Vous pouvez empêcher l'application de lire vos données de santé à tout moment : sur iOS dans Réglages → Santé → Accès aux données et appareils, sur Android dans les autorisations des applications de Santé Connect. L'utilisation des informations reçues de Santé Connect respecte le [Règlement sur les autorisations Santé Connect](https://support.google.com/googleplay/android-developer/answer/12991134), y compris ses exigences d'utilisation limitée.",
          ],
        },
        {
          heading: "Données transmises et partenaires",
          blocks: [
            "L'application génère un identifiant aléatoire (ID utilisateur dans Réglages) sans lien avec votre identité.",
            {
              list: [
                "**Analytique d'utilisation — PostHog** (serveurs dans l'UE à Francfort). Mesure anonyme de l'utilisation des écrans et des fonctionnalités, par exemple la liaison d'un entraînement (jamais aucune donnée de santé). [Confidentialité PostHog](https://posthog.com/privacy).",
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
          heading: "Ce site web",
          blocks: [
            "Le site utilise Google Analytics (Google LLC) pour compter les visites et voir quelles pages sont lues. Il fonctionne avec le mode de consentement de Google. Les visiteurs de l'EEE, du Royaume-Uni et de Suisse sont d'abord consultés : tant que vous n'avez pas accepté, Google Analytics ne dépose aucun cookie et Google ne reçoit que des signaux sans cookie sur chaque page vue (page, heure, navigateur), sans identifiant. Ailleurs, les cookies de mesure d'audience sont activés par défaut. Lorsque les cookies sont autorisés, Google Analytics reçoit votre adresse IP, des informations sur votre navigateur et votre appareil, et les pages que vous consultez. [Comment Google utilise ces données](https://policies.google.com/technologies/partner-sites?hl=fr).",
            "Vous pouvez accepter ou refuser ces cookies à tout moment via Paramètres des cookies, en bas de chaque page. Ce choix, votre thème et les services que vous mettez en favoris sont conservés dans le stockage local de votre navigateur et ne nous sont jamais envoyés.",
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
      updated: "11 de outubro de 2026",
      intro: `O ${appNames.pt.name} é um diário de treino para mesatenistas, desenvolvido pela Nineva Studios («nós»). Em suma: não exigimos cadastro, os dados de treino ficam no seu aparelho, nunca vendemos dados e o aplicativo não contém anúncios.`,
      sections: [
        {
          heading: "Seus dados de treino",
          blocks: [
            "Sessões, partidas, adversários e notas ficam armazenados exclusivamente no seu dispositivo e não são enviados aos nossos servidores.",
          ],
        },
        {
          heading: "Sincronização iCloud (iOS)",
          blocks: [
            "A sincronização opcional com o iCloud utiliza sua base privada do CloudKit da Apple, protegida pela política de privacidade da Apple.",
          ],
        },
        {
          heading: "App Saúde da Apple e Conexão Saúde",
          blocks: [
            "Você pode vincular uma sessão a um treino registrado pelo seu relógio ou app de fitness: pelo app Saúde no iOS e pelo Conexão Saúde (Health Connect) no Android. O aplicativo só lê dados de saúde depois que você autoriza na tela de permissões do sistema, e apenas para completar uma sessão e mostrar o que aconteceu durante ela. Ele nunca grava nada no app Saúde nem no Conexão Saúde.",
            {
              list: [
                "**O que é lido:** seus treinos de tênis de mesa (início e fim, app que registrou), a energia ativa (calorias) e a frequência cardíaca registradas durante eles e, no iOS, a pontuação de esforço que você deu a um treino no Apple Watch.",
                "**Onde ficam:** os dados de saúde são lidos e exibidos somente no seu dispositivo. Nunca são armazenados no banco de dados do aplicativo, nunca são enviados para nós nem para o iCloud e nunca entram em métricas de uso ou relatórios de falhas.",
                "**O que o aplicativo guarda:** apenas o identificador do treino vinculado a uma sessão, para que o vínculo se mantenha. Como o restante da sessão, ele é sincronizado pela sua base privada do iCloud se você usa a sincronização iCloud. Desvincular o treino ou excluir a sessão o remove.",
                "**O que nunca fazemos:** os dados de saúde nunca são vendidos, compartilhados com ninguém nem usados para publicidade, criação de perfis ou qualquer finalidade que não seja mostrá-los a você no aplicativo.",
              ],
            },
            "Você pode impedir que o aplicativo leia dados de saúde a qualquer momento: no iOS, em Ajustes → Saúde → Acesso a Dados e Dispositivos; no Android, nas permissões de apps do Conexão Saúde. O uso de informações recebidas do Conexão Saúde segue a [Política de permissões do Conexão Saúde](https://support.google.com/googleplay/android-developer/answer/12991134), incluindo seus requisitos de uso limitado.",
          ],
        },
        {
          heading: "Serviços de terceiros",
          blocks: [
            "Utilizamos PostHog (dados na UE) para métricas de uso, Sentry para relatórios de falhas e RevenueCat para validação de compras. Nenhum dado de saúde é incluído nesses envios.",
          ],
        },
        {
          heading: "Este site",
          blocks: [
            "O site usa o Google Analytics (Google LLC) para contar visitas e ver quais páginas são lidas. Ele funciona com o modo de consentimento do Google. Visitantes do EEE, do Reino Unido e da Suíça são consultados primeiro: até você aceitar, o Google Analytics não grava cookies e o Google recebe apenas sinais sem cookies sobre cada página vista (como a página, o horário e o navegador), sem identificador. Nos demais lugares, os cookies de análise ficam ativados por padrão. Com os cookies permitidos, o Google Analytics recebe seu endereço IP, dados do navegador e do dispositivo, e as páginas que você visita. [Como o Google usa esses dados](https://policies.google.com/technologies/partner-sites?hl=pt-BR).",
            "Você pode aceitar ou recusar os cookies de análise a qualquer momento em Configurações de cookies, no rodapé de cada página. Essa escolha, seu tema e os saques marcados como favoritos ficam no armazenamento local do navegador e nunca são enviados para nós.",
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
      updated: "2026年10月11日",
      intro: `「${appNames.ja.name}」はNineva Studios（以下「当社」）が提供する卓球選手のための練習記録アプリです。要約：アカウント作成は不要で、練習ログはお使いの端末内にのみ保存され、データの販売や広告の表示は一切行いません。`,
      sections: [
        {
          heading: "入力されるデータについて",
          blocks: [
            "練習セッション、試合結果、対戦相手（氏名、所属、戦型、メモ等）および各種設定は、端末内のローカルデータベースにのみ保存されます。当社がこれらのデータを収集・閲覧することはありません。",
            "ウィジェット（ホーム画面、iOSではロック画面も）は端末内の共有領域から概要を読み取りますが、外部へ送信されることはありません。",
          ],
        },
        {
          heading: "iCloud同期（iOS）",
          blocks: [
            "iCloud同期（無料）をご利用の場合、データはお客様個人のプライベートなCloudKitデータベースを通じて同期されます。当社がアクセスすることはできません。",
          ],
        },
        {
          heading: "「ヘルスケア」Appとヘルスコネクト",
          blocks: [
            "練習セッションを、ウォッチやフィットネスアプリで記録したワークアウトと連携できます（iOSでは「ヘルスケア」App、Androidではヘルスコネクトを使用）。アプリがヘルスケアデータを読み取るのは、システムの許可画面でお客様が許可した後に限られ、その目的はセッションの入力とセッション中の記録の表示のみです。「ヘルスケア」Appやヘルスコネクトにデータを書き込むことは一切ありません。",
            {
              list: [
                "**読み取るデータ：**卓球のワークアウト（開始・終了時刻、記録したアプリ）、その間に記録されたアクティブエネルギー（カロリー）と心拍数、およびiOSではApple Watchでワークアウトに付けた負荷の評価。",
                "**データの保存場所：**ヘルスケアデータは端末上でのみ読み取り・表示されます。アプリのデータベースに保存されることはなく、当社やiCloudに送信されることも、利用状況解析やクラッシュ報告に含まれることもありません。",
                "**アプリが保持する情報：**連携を維持するため、セッションに連携したワークアウトの識別子のみを保持します。セッションの他のデータと同様、iCloud同期をご利用の場合はお客様のプライベートなiCloudデータベースを通じて同期されます。ワークアウトの連携を解除するか、セッションを削除すると、この識別子も削除されます。",
                "**当社が決して行わないこと：**ヘルスケアデータを販売したり、第三者と共有したり、広告やプロファイリング、その他アプリ内でお客様に表示する以外の目的に使用したりすることは一切ありません。",
              ],
            },
            "ヘルスケアデータの読み取りはいつでも停止できます。iOSでは「設定」→「ヘルスケア」→「データアクセスとデバイス」、Androidではヘルスコネクトのアプリの権限から変更してください。ヘルスコネクトから受け取った情報の使用は、限定使用（Limited Use）の要件を含む[ヘルスコネクトの権限に関するポリシー](https://support.google.com/googleplay/android-developer/answer/12991134)に従います。",
          ],
        },
        {
          heading: "外部送信される技術情報",
          blocks: [
            "アプリの改善と品質維持のため、個人を特定しない形で以下のサービスを利用しています：",
            {
              list: [
                "**利用状況解析 — PostHog**（欧州フランクフルトのサーバー）：画面遷移や機能の利用頻度（ワークアウトを連携したかどうか等）の匿名統計。ヘルスケアデータは一切含みません。",
                "**エラー・クラッシュ報告 — Sentry**：アプリのクラッシュ情報およびエラー解析。",
                "**購入管理 — RevenueCat**：App StoreまたはGoogle Playでの購入状態の検証および復元。",
              ],
            },
          ],
        },
        {
          heading: "このウェブサイト",
          blocks: [
            "このウェブサイトでは、訪問数や読まれているページを把握するためにGoogle Analytics（Google LLC）を使用しています。Googleの同意モードで動作します。EEA、英国、スイスからの訪問者には最初に確認し、同意するまでGoogle AnalyticsはCookieを設定せず、Googleはページの閲覧ごとに識別子のないCookieなしの信号（ページ、時刻、ブラウザなど）のみを受け取ります。その他の地域では、分析用Cookieは初期設定で有効です。Cookieが許可されると、Google AnalyticsはIPアドレス、ブラウザと端末の情報、閲覧したページを受け取ります。[Googleによるデータの使用について](https://policies.google.com/technologies/partner-sites?hl=ja)",
            "分析用Cookieは、各ページ下部の「Cookie設定」からいつでも許可または拒否できます。その選択、テーマ、お気に入りに登録したサーブは、ブラウザのローカルストレージに保存され、当社に送信されることはありません。",
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
            "本アプリ（「ヘルスケア」Appまたはヘルスコネクトから読み取った心拍数や消費エネルギーの表示を含む）および掲載されている練習メニューは一般的なスポーツ記録および情報提供を目的としており、医療的助言や指導を構成するものではありません。",
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
      updated: "2026年10月11日",
      intro: `「${appNames.zh.name}」是由 Nineva Studios（“我们”）专为乒乓球爱好者打造的训练日志应用。简要说明：无需注册账号，训练与比赛记录保存在您的本地设备中，我们绝不出售任何数据，应用内无任何广告。`,
      sections: [
        {
          heading: "您输入的数据",
          blocks: [
            "训练记录、比赛比分、对手资料（姓名、打法、战绩、备注）及偏好设置均保存在您的设备本地数据库中。我们不会上传或获取这些个人内容。",
            "小组件（主屏幕，以及 iOS 上的锁屏）通过设备本地共享储存读取概览，数据绝不离开您的手机。",
          ],
        },
        {
          heading: "iCloud 同步（iOS）",
          blocks: [
            "如果您开启了 iCloud 云同步，数据将通过 Apple CloudKit 同步至您个人的私有 iCloud 空间，受 [Apple 隐私政策](https://www.apple.com/legal/privacy/) 保护，我们无法查看。",
          ],
        },
        {
          heading: "“健康”App 与 Health Connect",
          blocks: [
            "您可以将训练记录与手表或健身应用记录的体能训练关联：iOS 上通过“健康”App，Android 上通过 Health Connect。只有在您于系统权限界面中授权后，应用才会读取健康数据，且仅用于填写训练记录并显示训练期间的情况。应用绝不会向“健康”App 或 Health Connect 写入任何数据。",
            {
              list: [
                "**读取的内容：**您的乒乓球体能训练（开始和结束时间、记录所用的应用）、训练期间记录的活动能量（卡路里）和心率，以及在 iOS 上您在 Apple Watch 上为体能训练给出的强度评分。",
                "**数据存放位置：**健康数据仅在您的设备上读取和显示，绝不会存入应用的数据库，绝不会发送给我们或 iCloud，也绝不会包含在使用统计或崩溃报告中。",
                "**应用保留的内容：**仅保留训练记录所关联体能训练的标识符，以便保持关联。与训练记录的其他数据一样，如果您使用 iCloud 同步，它会通过您的私有 iCloud 数据库同步。取消关联该体能训练或删除训练记录即会将其移除。",
                "**我们绝不会：**出售健康数据或与任何人共享，也不会将其用于广告、用户画像或除在应用中向您展示以外的任何目的。",
              ],
            },
            "您可以随时停止应用读取健康数据：iOS 上前往“设置”→“健康”→“数据访问与设备”，Android 上在 Health Connect 的应用权限中关闭。对从 Health Connect 获取的信息的使用遵守 [Health Connect 权限政策](https://support.google.com/googleplay/android-developer/answer/12991134)，包括其中的有限使用要求。",
          ],
        },
        {
          heading: "技术数据与第三方服务",
          blocks: [
            "为了保障软件稳定性，应用会生成随机匿名标识符并调用以下服务：",
            {
              list: [
                "**使用统计 — PostHog**（数据存储在欧盟法兰克福）：记录功能使用频次等匿名数据（例如是否关联了体能训练），绝不包含任何健康数据。",
                "**崩溃报告 — Sentry**：分析应用运行时的崩溃错误和系统日志。",
                "**购买验证 — RevenueCat**：用于在您的多台设备上验证和恢复 Pro 购买凭证。",
              ],
            },
          ],
        },
        {
          heading: "本网站",
          blocks: [
            "本网站使用 Google Analytics（Google LLC）统计访问量并了解哪些页面被阅读。它在 Google 同意模式下运行。来自欧洲经济区、英国和瑞士的访客会先被询问：在你同意之前，Google Analytics 不会设置 Cookie，Google 只会收到关于每次页面浏览的无 Cookie 信号（如页面、时间和浏览器），不含任何标识符。在其他地区，分析 Cookie 默认开启。允许 Cookie 后，Google Analytics 会收到你的 IP 地址、浏览器和设备信息以及你访问的页面。[Google 如何使用这些数据](https://policies.google.com/technologies/partner-sites?hl=zh-CN)",
            "你可以随时通过每个页面底部的“Cookie 设置”接受或拒绝分析 Cookie。你的选择、主题以及收藏的发球都保存在浏览器的本地存储中，绝不会发送给我们。",
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
            "本应用提供的数据分析（包括从“健康”App 或 Health Connect 读取的心率和能量数据）与训练计划仅供参考，不构成医疗或专业运动教练建议。请根据个人身体状况合理安排训练。",
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
      updated: "2026년 10월 11일",
      intro: `「${appNames.ko.name}」은 Nineva Studios(이하 '회사')가 개발한 탁구인을 위한 훈련일지 앱입니다. 요약: 별도의 회원가입이나 계정이 필요 없으며, 모든 기록은 사용자 기기에 안전하게 보관되고, 데이터 판매나 광고는 절대 하지 않습니다.`,
      sections: [
        {
          heading: "사용자가 입력하는 데이터",
          blocks: [
            "훈련 세션, 경기 점수, 상대 선수 정보(이름, 클럽, 전형, 메모) 및 사용자 설정은 사용자 기기의 로컬 데이터베이스에만 저장됩니다. 회사는 이를 수집하거나 열람하지 않습니다.",
          ],
        },
        {
          heading: "iCloud 동기화 (iOS)",
          blocks: [
            "iCloud 동기화 활성화 시 사용자의 비공개 CloudKit 데이터베이스를 통해 다른 기기와 동기화됩니다. 애플의 개인정보 처리방침에 따라 보호되며 회사에는 접근 권한이 없습니다.",
          ],
        },
        {
          heading: "Apple 건강 앱 및 헬스 커넥트",
          blocks: [
            "훈련 세션을 워치나 피트니스 앱으로 기록한 운동과 연결할 수 있습니다. iOS에서는 건강 앱, Android에서는 헬스 커넥트를 통해 연결됩니다. 앱은 사용자가 시스템 권한 화면에서 허용한 후에만 건강 데이터를 읽으며, 세션 정보를 채우고 세션 중의 기록을 보여 주는 용도로만 사용합니다. 건강 앱이나 헬스 커넥트에 어떠한 데이터도 기록하지 않습니다.",
            {
              list: [
                "**읽는 데이터:** 탁구 운동 기록(시작 및 종료 시간, 기록한 앱), 운동 중 기록된 활동 에너지(칼로리)와 심박수, 그리고 iOS에서는 Apple Watch에서 운동에 매긴 운동 강도 평가.",
                "**보관 위치:** 건강 데이터는 사용자 기기에서만 읽고 표시됩니다. 앱 데이터베이스에 저장되지 않으며, 회사나 iCloud로 전송되지 않고, 사용 통계나 오류 보고에도 포함되지 않습니다.",
                "**앱이 보관하는 정보:** 연결을 유지하기 위해 세션에 연결된 운동의 식별자만 보관합니다. 세션의 다른 데이터와 마찬가지로 iCloud 동기화를 사용하는 경우 사용자의 비공개 iCloud 데이터베이스를 통해 동기화됩니다. 운동 연결을 해제하거나 세션을 삭제하면 함께 삭제됩니다.",
                "**회사가 절대 하지 않는 일:** 건강 데이터를 판매하거나 누구와도 공유하지 않으며, 광고, 프로파일링 또는 앱에서 사용자에게 보여 주는 것 이외의 어떠한 목적으로도 사용하지 않습니다.",
              ],
            },
            "건강 데이터 읽기는 언제든지 중단할 수 있습니다. iOS에서는 설정 → 건강 → 데이터 접근 및 기기, Android에서는 헬스 커넥트의 앱 권한에서 변경하세요. 헬스 커넥트에서 받은 정보의 사용은 제한적 사용 요구사항을 포함한 [헬스 커넥트 권한 정책](https://support.google.com/googleplay/android-developer/answer/12991134)을 따릅니다.",
          ],
        },
        {
          heading: "외부 전송 기술 데이터",
          blocks: [
            "앱 오류 개선 및 안정성 유지를 위해 비식별화된 임의 식별자를 기반으로 다음 서비스를 이용합니다:",
            {
              list: [
                "**사용 통계 — PostHog** (EU 프랑크푸르트 서버): 익명 기능 사용 빈도 측정(운동 연결 여부 등, 건강 데이터는 절대 포함되지 않음).",
                "**오류 보고 — Sentry** (미국): 앱 비정상 종료 시 기술적 오류 로그 분석.",
                "**구매 관리 — RevenueCat** (미국): 인앱 결제 확인 및 다중 기기 구매 복원 처리.",
              ],
            },
          ],
        },
        {
          heading: "이 웹사이트",
          blocks: [
            "이 웹사이트는 방문 수와 많이 읽히는 페이지를 파악하기 위해 Google Analytics(Google LLC)를 사용합니다. Google 동의 모드로 작동합니다. EEA, 영국, 스위스 방문자에게는 먼저 동의를 묻습니다. 동의하기 전까지 Google Analytics는 쿠키를 설정하지 않으며, Google은 각 페이지 조회에 대해 식별자 없는 쿠키리스 신호(페이지, 시간, 브라우저 등)만 받습니다. 그 밖의 지역에서는 분석 쿠키가 기본으로 켜져 있습니다. 쿠키가 허용되면 Google Analytics는 IP 주소, 브라우저와 기기 정보, 방문한 페이지를 받습니다. [Google의 데이터 사용 방식](https://policies.google.com/technologies/partner-sites?hl=ko)",
            "분석 쿠키는 모든 페이지 하단의 '쿠키 설정'에서 언제든지 허용하거나 거부할 수 있습니다. 이 선택과 테마, 즐겨찾기한 서브는 브라우저의 로컬 저장소에 보관되며 저희에게 전송되지 않습니다.",
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
            "본 앱의 통계(Apple 건강 앱 또는 헬스 커넥트에서 읽어 온 심박수 및 에너지 포함) 및 훈련 계획은 참고용 일반 정보이며 의학적 조언을 대신할 수 없습니다.",
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
      updated: "11 ottobre 2026",
      intro: `${appNames.it.name} è un diario di allenamento per giocatori di tennistavolo, creato da Nineva Studios («noi»). In breve: nessun account richiesto, i dati rimangono sul tuo dispositivo, non vendiamo dati e non mostriamo pubblicità.`,
      sections: [
        {
          heading: "I dati che inserisci",
          blocks: [
            "Allenamenti, partite, avversari e impostazioni sono salvati esclusivamente sul tuo dispositivo e non vengono inviati ai nostri server.",
          ],
        },
        {
          heading: "Sincronizzazione iCloud (iOS)",
          blocks: [
            "La sincronizzazione opzionale avviene tramite il tuo database privato CloudKit di Apple secondo la [Politica sulla Privacy di Apple](https://www.apple.com/legal/privacy/).",
          ],
        },
        {
          heading: "App Salute di Apple e Connessione Salute",
          blocks: [
            "Puoi collegare una sessione a un allenamento registrato dal tuo orologio o da un'app di fitness: tramite l'app Salute su iOS e Connessione Salute (Health Connect) su Android. L'app legge i dati sulla salute solo dopo che lo hai consentito nella schermata dei permessi del sistema, e solo per completare una sessione e mostrare cosa è successo durante l'allenamento. Non scrive mai nulla nell'app Salute o in Connessione Salute.",
            {
              list: [
                "**Cosa legge:** i tuoi allenamenti di tennistavolo (ora di inizio e fine, app che li ha registrati), l'energia attiva (calorie) e la frequenza cardiaca registrate durante l'allenamento e, su iOS, il punteggio di sforzo che hai assegnato a un allenamento su Apple Watch.",
                "**Dove restano:** i dati sulla salute vengono letti e mostrati solo sul tuo dispositivo. Non vengono mai salvati nel database dell'app, mai inviati a noi o a iCloud e mai inclusi nelle statistiche d'uso o nei report sui crash.",
                "**Cosa conserva l'app:** solo l'identificativo dell'allenamento collegato a una sessione, per mantenere il collegamento. Come il resto della sessione, viene sincronizzato tramite il tuo database privato iCloud se usi la sincronizzazione iCloud. Scollegando l'allenamento o eliminando la sessione viene rimosso.",
                "**Cosa non facciamo mai:** i dati sulla salute non vengono mai venduti, condivisi con nessuno né usati per pubblicità, profilazione o qualsiasi scopo diverso dal mostrarteli nell'app.",
              ],
            },
            "Puoi impedire all'app di leggere i dati sulla salute in qualsiasi momento: su iOS in Impostazioni → Salute → Accesso ai dati e dispositivi, su Android nelle autorizzazioni app di Connessione Salute. L'uso delle informazioni ricevute da Connessione Salute rispetta le [Norme sulle autorizzazioni di Connessione Salute](https://support.google.com/googleplay/android-developer/answer/12991134), inclusi i requisiti di uso limitato.",
          ],
        },
        {
          heading: "Servizi di terze parti",
          blocks: [
            "Utilizziamo PostHog (server nell'UE a Francoforte) per statistiche d'uso anonime, Sentry per i report sui crash e RevenueCat per la gestione degli acquisti in-app. Nessun dato sulla salute viene mai incluso in questi invii.",
          ],
        },
        {
          heading: "Questo sito web",
          blocks: [
            "Il sito usa Google Analytics (Google LLC) per contare le visite e vedere quali pagine vengono lette. Funziona con la modalità di consenso di Google. Ai visitatori di SEE, Regno Unito e Svizzera viene chiesto prima: finché non accetti, Google Analytics non imposta cookie e Google riceve solo segnali senza cookie su ogni pagina visualizzata (come pagina, ora e browser), senza alcun identificatore. Altrove i cookie di analisi sono attivi per impostazione predefinita. Con i cookie consentiti, Google Analytics riceve il tuo indirizzo IP, i dati del browser e del dispositivo e le pagine che visiti. [Come Google usa questi dati](https://policies.google.com/technologies/partner-sites?hl=it).",
            "Puoi accettare o rifiutare i cookie di analisi in qualsiasi momento da Impostazioni cookie, in fondo a ogni pagina. Questa scelta, il tema e i servizi che segni come preferiti restano nella memoria locale del browser e non ci vengono mai inviati.",
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
      updated: "11 жовтня 2026 р.",
      intro: `«${appNames.uk.name}» — це тренувальний щоденник для гравців у настільний теніс від Nineva Studios («ми»). Коротко: реєстрація не потрібна, ваші тренування зберігаються на вашому пристрої, ми ніколи не продаємо дані, а в додатку немає реклами.`,
      sections: [
        {
          heading: "Дані, які ви вводите",
          blocks: [
            "Тренування, матчі, суперники (імена, клуби, стиль гри, нотатки) та налаштування зберігаються в локальній базі даних на вашому пристрої. Ми їх не отримуємо і не використовуємо в аналітиці.",
            "Віджети (на початковому екрані, а в iOS і на заблокованому) читають зведення з локального сховища безпосередньо на пристрої. Дані не залишають ваш телефон.",
          ],
        },
        {
          heading: "Синхронізація iCloud (iOS)",
          blocks: [
            "Якщо ви увімкнули синхронізацію з iCloud, ваші дані копіюються до вашої **приватної** бази даних iCloud через Apple CloudKit. Доступ маєте лише ви відповідно до [Політики конфіденційності Apple](https://www.apple.com/legal/privacy/).",
          ],
        },
        {
          heading: "Apple Health («Здоров’я») і Health Connect",
          blocks: [
            "Ви можете прив’язати тренування до запису тренування з вашого годинника чи фітнес-додатка: через «Здоров’я» (Apple Health) в iOS і через Health Connect в Android. Додаток читає дані про здоров’я лише після того, як ви дозволите це в системному вікні дозволів, і лише для того, щоб заповнити тренування й показати, що відбувалося під час нього. Він ніколи нічого не записує в «Здоров’я» чи Health Connect.",
            {
              list: [
                "**Що читається:** ваші записи тренувань з настільного тенісу (час початку й завершення, додаток, що їх записав), активна енергія (калорії) і пульс, зафіксовані під час них, а в iOS — оцінка зусиль, яку ви поставили тренуванню на Apple Watch.",
                "**Де залишаються дані:** дані про здоров’я читаються й показуються лише на вашому пристрої. Вони ніколи не зберігаються в базі даних додатка, не надсилаються ні нам, ні в iCloud і не потрапляють до аналітики чи звітів про помилки.",
                "**Що зберігає додаток:** лише ідентифікатор запису тренування, до якого прив’язано тренування, щоб прив’язка не загубилася. Як і решта даних тренування, він синхронізується через вашу приватну базу даних iCloud, якщо ви користуєтеся синхронізацією з iCloud. Якщо відв’язати запис або видалити тренування, ідентифікатор також видаляється.",
                "**Чого ми ніколи не робимо:** дані про здоров’я ніколи не продаються, нікому не передаються й не використовуються для реклами, профілювання чи будь-якої іншої мети, крім показу вам у додатку.",
              ],
            },
            "Заборонити додатку читати дані про здоров’я можна будь-коли: в iOS у розділі «Параметри → Здоров’я → Доступ до даних і пристрої», в Android — у дозволах додатків Health Connect. Використання інформації, отриманої з Health Connect, відповідає [Правилам щодо дозволів Health Connect](https://support.google.com/googleplay/android-developer/answer/12991134), зокрема їхнім вимогам щодо обмеженого використання.",
          ],
        },
        {
          heading: "Що і кому надсилає додаток",
          blocks: [
            "Додаток створює випадковий анонімний ідентифікатор при першому запуску (ID користувача в Налаштуваннях). Він не пов'язаний з вашим іменем або обліковим записом.",
            {
              list: [
                "**Аналітика використання — PostHog** (сервери в ЄС, Франкфурт): анонімна статистика щодо переглянутих екранів та активності, як-от прив’язування запису тренування (без жодних даних про здоров’я). [Політика PostHog](https://posthog.com/privacy).",
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
                "Дані про здоров’я з Apple Health чи Health Connect ніколи не залишають ваш пристрій через додаток.",
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
          heading: "Цей вебсайт",
          blocks: [
            "Вебсайт використовує Google Analytics (Google LLC), щоб рахувати відвідування й бачити, які сторінки читають. Він працює в режимі згоди Google. Відвідувачів із ЄЕЗ, Великої Британії та Швейцарії спершу запитують: доки ви не погодитеся, Google Analytics не встановлює cookie, а Google отримує лише сигнали без cookie про кожен перегляд сторінки (як-от сторінка, час і браузер), без жодного ідентифікатора. Деінде аналітичні cookie ввімкнені за замовчуванням. Якщо cookie дозволено, Google Analytics отримує вашу IP-адресу, дані про браузер і пристрій та сторінки, які ви відвідуєте. [Як Google використовує ці дані](https://policies.google.com/technologies/partner-sites?hl=uk).",
            "Прийняти або відхилити аналітичні cookie можна будь-коли через «Налаштування cookie» внизу кожної сторінки. Цей вибір, ваша тема й подачі, позначені як улюблені, зберігаються в локальному сховищі браузера й ніколи не надсилаються нам.",
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
            "Додаток, його статистика (зокрема пульс і енергія, отримані з Apple Health чи Health Connect) і плани тренувань носять виключно інформаційний характер і не є медичними чи професійними порадами. Проконсультуйтеся з лікарем або тренером перед початком інтенсивних занять.",
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
