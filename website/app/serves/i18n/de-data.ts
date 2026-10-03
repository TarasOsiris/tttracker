/**
 * German translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

import type { DataTranslations } from "./es-data";

export const deData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Kurzer Pendelaufschlag mit Unterschnitt",
      description: "Der Standardaufschlag schlechthin. Kurzer Unterschnitt mit linkem Seitschnitt auf die Rückhand oder in die Mitte. Provoziert meist einen Schupf als Rückschlag und bereitet den Angriff mit dem dritten Ball vor.",
      contactPoint: "Triff den Ball unten-hinten mit offenem Schlägerblatt. Streife nach unten und leicht nach rechts und lass das Handgelenk natürlich durch den Pendelbogen schwingen. Ein dünner Treffpunkt maximiert den Unterschnitt, der seitliche Ausschwung bringt den Seitschnitt.",
      returnAdvice: "Nimm ihn früh nach dem Aufsprung mit offenem Schlägerblatt und einem kurzen, streifenden Schupf, um selbst Unterschnitt zu geben. Leg ihn kurz ab oder schupfe lang auf Rückhand oder Ellbogen des Aufschlägers, leicht gegen den Seitschnitt gezielt. Kommt er zu hoch, ist ein kontrollierter Flip sicherer als ein Anheben.",
    },
    "pendulum-sidespin-long": {
      name: "Langer Pendelaufschlag mit Seitschnitt",
      description: "Schneller Pendelaufschlag in die Ecken mit Seit- und Unterschnitt. Die Kurve erschwert einen guten Rückschlag und eröffnet dir die Chance auf den dritten Ball.",
      contactPoint: "Triff den Ball hinten-links mit leicht geschlossenem Schlägerblatt. Streife mit mehr Tempo und dickerem Treffpunkt als bei der kurzen Variante nach vorne und seitlich durch den Ball. Das Handgelenk beschleunigt im Treffpunkt für zusätzliches Tempo.",
      returnAdvice: "Kommt er lang, geh einen Schritt zurück und spiele einen kontrollierten Topspin oder Konter mit extra Zug nach oben gegen den Unterschnitt. Ziele leicht auf die Rückhand des Aufschlägers, um den Seitschnitt auszugleichen, und halte den Ball flach. Kannst du nicht angreifen, ist ein schneller, schnittreicher Schupf die sichere Alternative.",
    },
    "pendulum-no-spin": {
      name: "Pendelaufschlag ohne Schnitt (Leerball)",
      description: "Sieht aus wie der Pendelaufschlag mit Unterschnitt, doch der Ball kommt ohne Schnitt. Wer gegen vermeintlichen Unterschnitt schupft, spielt den Ball meist zu hoch zurück.",
      contactPoint: "Triff den Ball hinten-mittig mit fast senkrechtem Schlägerblatt. Der Schläger gleitet hinter den Ball, statt ihn unten zu streifen, und trifft ihn nur kurz und dick. Arm und Handgelenk schwingen durch, als würden sie Schnitt erzeugen, aber der flache Winkel nimmt die Rotation heraus.",
      returnAdvice: "Gib für die Kontrolle eigenen Schnitt: ein kompakter Schupf oder ein kontrollierter Flip bzw. Konter mit leicht geschlossenem Schlägerblatt. Vermeide ein bloßes Hinhalten, dann springt der Ball oft hoch. Halte ihn flach und platziere in die Ecken.",
    },
    "pendulum-topspin": {
      name: "Pendelaufschlag mit Oberschnitt",
      description: "Als Unterschnitt getarnt, trägt aber Oberschnitt. Der Ball springt nach dem Aufsprung nach vorn und überrascht Gegner, die ihn schupfen wollen.",
      contactPoint: "Triff den Ball hinten-oben mit leicht geschlossenem Schlägerblatt. Streife nach oben und vorn durch die obere Ballhälfte. Die Pendelbewegung tarnt das Streifen nach oben: Das Handgelenk rollt im Treffpunkt über den Ball und erzeugt Oberschnitt, während der Arm seitlich weiterschwingt.",
      returnAdvice: "Nicht schupfen. Schließ das Schlägerblatt und blocke früh oder spiele einen Gegentopspin, bevor der Ball nach vorn springt. Ziele leicht auf die Rückhand des Aufschlägers, um den Seitschnitt auszugleichen, und halte den Ball flach.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Kurzer umgekehrter Pendelaufschlag",
      description: "Kurzer Aufschlag mit rechtem Seitschnitt und Unterschnitt. Die zum normalen Pendel entgegengesetzte Kurve ist schwer zu lesen, besonders für Gegner, die an Standardaufschläge gewöhnt sind.",
      contactPoint: "Triff den Ball unten-hinten mit offenem Schlägerblatt. Streife nach unten und nach links (umgekehrt zum normalen Pendel) und führe die Bewegung mit dem Handrücken. Der Schläger bewegt sich im Treffpunkt von links nach rechts vor dem Körper.",
      returnAdvice: "Nimm ihn früh mit offenem Schlägerblatt und einem kurzen, streifenden Schupf, um Unterschnitt zu geben. Ziele leicht auf die Vorhand des Aufschlägers, um den rechten Seitschnitt auszugleichen, und halte den Ball flach. Kommt er zu hoch, ist ein weicher Flip sicherer als ein Anheben.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Langer umgekehrter Pendelaufschlag mit Oberschnitt",
      description: "Langer Aufschlag mit rechtem Seitschnitt und Oberschnitt. Der Ball zieht aus Sicht des Aufschlägers nach links und springt beim Aufsprung seitlich weg, was einen guten Angriff erschwert.",
      contactPoint: "Triff den Ball hinten-rechts mit leicht geschlossenem Schlägerblatt. Streife nach oben und nach links durch den Ball. Die umgekehrte Pendelbewegung erzeugt rechten Seitschnitt, die Aufwärtskomponente bringt Oberschnitt.",
      returnAdvice: "Schließ das Schlägerblatt und nimm den Ball früh mit Block, Konter oder Gegentopspin. Ziele leicht auf die Vorhand des Aufschlägers, um den Seitschnitt auszugleichen. Ziehst du Topspin, streife über den Ball und halte den Bogen flach.",
    },
    "tomahawk-sidespin-long": {
      name: "Langer Tomahawk-Aufschlag",
      description: "Aggressiver langer Aufschlag mit starkem rechtem Seitschnitt und Oberschnitt. Der Ball springt nach dem Aufsprung kräftig zur Seite und setzt den Gegner unter Zeitdruck.",
      contactPoint: "Triff den Ball hinten-rechts mit fast senkrechtem Schlägerblatt. Streife in einer Wurfbewegung nach vorn und scharf nach links. Das Handgelenk klappt im Treffpunkt nach außen und erzeugt kräftigen rechten Seitschnitt, der Aufwärtsbogen des Schwungs liefert den Oberschnitt.",
      returnAdvice: "Nimm ihn früh mit geschlossenem Schlägerblatt und einem kompakten Block oder Konter. Ziele leicht auf die Vorhand des Aufschlägers, um den Seitschnitt auszugleichen, und halte den Ball flach. Hast du Zeit, ist ein kontrollierter Topspin die beste Wahl.",
    },
    "tomahawk-backspin-short": {
      name: "Kurzer Tomahawk-Aufschlag mit Unterschnitt",
      description: "Ein seltener kurzer Tomahawk mit Unterschnitt. Die ungewöhnliche Bewegung in Kombination mit der kurzen Platzierung macht ihn für Gegner sehr schwer zu lesen und kaum aggressiv anzunehmen.",
      contactPoint: "Triff den Ball unten mit offenem, seitlich angewinkeltem Schlägerblatt. Streife im Tomahawk-Bogen nach unten und nach links. Der dünne Kontakt unter dem Ball erzeugt Unterschnitt, die Seitwärtsbewegung bringt Seitschnitt. Ein weicherer, langsamerer Handgelenkeinsatz hält den Ball kurz.",
      returnAdvice: "Spiele mit offenem Schlägerblatt einen kurzen, streifenden Schupf und halte den Ball flach. Ziele leicht auf die Vorhand des Aufschlägers, um den Seitschnitt auszugleichen. Leg ihn kurz ab, es sei denn, du kannst mit gutem Schnitt lang schupfen.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Langer umgekehrter Tomahawk-Aufschlag",
      description: "Der Markenzeichen-Aufschlag von Ding Ning. Beginnt genau wie ein normaler Tomahawk, wechselt aber im letzten Moment auf den Rückhandbelag und erzeugt linken Seitschnitt mit Oberschnitt statt des erwarteten rechten Seitschnitts. Durch den Oberschnitt fällt der Ball schnell ab und springt nach dem Aufsprung kräftig zur Gegenseite. Erfordert eine tiefe Hocke und präzises Timing. Am trickreichsten im Wechsel mit normalen Tomahawk-Aufschlägen.",
      contactPoint: "Triff den Ball hinten-links mit dem Rückhandbelag, das Schlägerblatt fast senkrecht. Dreh im letzten Moment des Tomahawk-Schwungs das Handgelenk nach innen und streife nach vorn und nach rechts. Das kehrt die Seitschnittrichtung gegenüber dem normalen Tomahawk um: linker Seitschnitt mit Oberschnitt.",
      returnAdvice: "Schließ das Schlägerblatt und nimm den Ball früh mit einem kompakten Block oder Gegentopspin. Ziele leicht auf die Rückhand des Aufschlägers, um den linken Seitschnitt auszugleichen. Nicht schupfen, der Oberschnitt trägt den Ball sonst ins Aus. Ist die Seitschnittrichtung unklar, spiel in die Mitte, um das Risiko zu senken.",
    },
    "backhand-backspin-short": {
      name: "Kurzer Rückhandaufschlag mit Unterschnitt",
      description: "Ein kompakter Rückhandaufschlag mit reinem Unterschnitt, kurz platziert. Schnell ausgeführt, sodass du sofort für den nächsten Ball bereit bist. Auf jedem Spielniveau verbreitet.",
      contactPoint: "Triff den Ball unten mit offenem Schlägerblatt. Streife mit einem kompakten Handgelenkeinsatz gerade nach unten und halte den Schlag kurz und kontrolliert. Der Schläger bewegt sich kaum nach vorn, fast die gesamte Bewegung geht nach unten und erzeugt reinen Unterschnitt.",
      returnAdvice: "Öffne das Schlägerblatt und streife mit einem kurzen Schupf unter den Ball, früh im Aufsprung. Leg ihn kurz ab oder schupfe lang in die Ecken, wenn du verlängern willst. Konzentriere dich darauf, den Ball flach zu halten, statt ihn anzuheben.",
    },
    "backhand-no-spin-long": {
      name: "Schneller langer Rückhandaufschlag",
      description: "Ein schneller Rückhandaufschlag in die Ecken mit wenig Schnitt. Das reine Tempo überrascht unvorbereitete Gegner, vor allem im Wechsel mit kurzen Unterschnittaufschlägen.",
      contactPoint: "Triff den Ball hinten-mittig mit fast senkrechtem Schlägerblatt. Schieb ihn mit einer schnellen, stoßenden Bewegung durch, statt zu streifen. Ein dicker, flacher Treffpunkt maximiert das Tempo bei minimalem Schnitt. Der Arm streckt sich vollständig Richtung Ziel.",
      returnAdvice: "Triff ihn um den höchsten Punkt mit einem kompakten Block oder kontrollierten Konter und gib etwas Oberschnitt für die Kontrolle. Halte den Schläger nicht nur hin: Ein Leerball braucht deinen eigenen Schnitt. Platziere lang in die Ecken oder auf den Ellbogen.",
    },
    "backhand-sidespin": {
      name: "Rückhandaufschlag mit Seitschnitt",
      description: "Rückhandaufschlag mit rechtem Seitschnitt und Unterschnitt. Die kompakte Bewegung macht den Schnitt schwer lesbar, und du stehst schon bereit für den Rückhand-Folgeschlag.",
      contactPoint: "Triff den Ball unten-rechts mit offenem Schlägerblatt. Streife mit einer kompakten Handgelenkbewegung nach unten und nach links über den Ball. Der Seitschnitt entsteht durch die seitliche Handgelenkbewegung, das offene Schlägerblatt erzeugt den Unterschnitt.",
      returnAdvice: "Nimm ihn früh mit offenem Schlägerblatt und einem kurzen, streifenden Schupf, um Unterschnitt zu geben. Ziele leicht auf die Vorhand des Aufschlägers, um den Seitschnitt auszugleichen. Kommt er hoch, funktioniert ein kompakter Flip gut.",
    },
    "hook-heavy-side-short": {
      name: "Kurzer Hook-Aufschlag mit starkem Seitschnitt",
      description: "Eine schaufelnde Bewegung unter dem Ball, die extremen Seitschnitt erzeugt. Der Ball springt beim Aufsprung seitlich weg. Durch den ungewöhnlichen Schlägerwinkel sehr schwer zu lesen.",
      contactPoint: "Triff die linke Seite des Balls mit fast waagerechtem Schlägerblatt und schaufle unter und um ihn herum. Die Hakenbewegung streift seitlich über den Äquator des Balls. Das Handgelenk dreht scharf nach innen ein, um den seitlichen Schnittanteil zu maximieren.",
      returnAdvice: "Stell den Schlägerwinkel gegen den starken Seitschnitt ein und triff die Seite des Balls, nicht die Rückseite. Ein weicher, gefühlvoller Ball oder ein Banana-Flip ist sicherer als ein harter Schlag. Ziele leicht auf die Rückhand des Aufschlägers und halte den Ball flach.",
    },
    "hook-backspin-short": {
      name: "Kurzer Hook-Aufschlag mit Unterschnitt",
      description: "Hook-Aufschlag, der starken Seitschnitt mit Unterschnitt kombiniert. Die doppelte Schnittkomponente macht einen präzisen Rückschlag sehr schwierig.",
      contactPoint: "Triff den Ball unten-links mit offenem, seitlich angewinkeltem Schlägerblatt. Streife in einem schaufelnden Bogen nach unten und nach rechts und erfasse dabei gleichzeitig Unterseite und Seite des Balls. Dieses Streifen in zwei Richtungen erzeugt die Kombination aus Unter- und Seitschnitt.",
      returnAdvice: "Öffne das Schlägerblatt weiter und hebe den Ball mit einem streifenden Schupf an, um den starken Unterschnitt zu kontrollieren. Ziele leicht auf die Rückhand des Aufschlägers, um den Seitschnitt auszugleichen, und halte den Ball flach. Nicht flach durchschlagen.",
    },
    "hook-fast-long-topspin": {
      name: "Schneller langer Hook-Aufschlag",
      description: "Eine aggressive Variante des Hook-Aufschlags, die rechten Seitschnitt mit Oberschnitt kombiniert, schnell und lang gespielt. Die schaufelnde Hakenbewegung sieht nach Unterschnitt aus, doch der Ball springt nach dem Aufsprung mit Seitschnitt nach vorn. Am wirkungsvollsten im Wechsel mit klassischen Hook-Aufschlägen mit Unterschnitt.",
      contactPoint: "Triff den Ball hinten-rechts mit leicht geschlossenem Schlägerblatt. Streife in einem schnellen, schaufelnden Bogen nach vorn und nach links und erfasse die obere Seite des Balls. Die Hakenbewegung tarnt den Kontakt nach oben, der den Oberschnitt erzeugt, der seitliche Ausschwung bringt rechten Seitschnitt.",
      returnAdvice: "Schließ das Schlägerblatt und nimm den Ball sehr früh mit einem kompakten Block oder Gegentopspin. Nicht schupfen, der Oberschnitt trägt den Ball sonst ins Aus. Neige den Schläger leicht nach links, um den rechten Seitschnitt auszugleichen. Ein kontrollierter Topspin in die Mitte ist die sicherste Angriffsoption.",
    },
    "high-toss-backspin": {
      name: "Hochwurfaufschlag mit starkem Unterschnitt",
      description: "Der hohe Ballwurf bringt mehr Zeit und Energie für starken Schnitt. Der Ball kann nach dem Aufsprung sichtbar zurückrollen. Viele Spitzenspieler nutzen ihn, um schwache Schupfbälle zu erzwingen.",
      contactPoint: "Triff den Ball ganz unten mit weit offenem Schlägerblatt, während er aus dem hohen Wurf herabfällt. Streife scharf nach unten und nutze die Fallenergie des Balls, um den Unterschnitt zu verstärken. Das Handgelenk klappt am tiefsten Punkt des Schwungs nach unten für maximalen Schnitt.",
      returnAdvice: "Spiele mit sehr offenem Schlägerblatt einen längeren, streifenden Schupf mit extra Anheben. Kommt er lang, eröffne mit einem kontrollierten Topspin statt flach zu schlagen. Achte beim Rückschlag auf viel Unterschnitt und eine flache Flugbahn.",
    },
    "high-toss-sidespin": {
      name: "Hochwurfaufschlag mit Seitschnitt",
      description: "Kombiniert den hohen Ballwurf mit Seit- und Unterschnitt zu starkem kombiniertem Schnitt. Der Ball kann stark kurven und auf dem Tisch abbremsen. Erfordert außergewöhnliches Timing.",
      contactPoint: "Triff den Ball unten-links mit offenem Schlägerblatt, während er aus dem hohen Wurf herabfällt. Streife im Pendelbogen nach unten und nach rechts und erfasse Unterseite und linke Seite zugleich. Fallenergie und Handgelenkeinsatz zusammen erzeugen extrem starken Unterschnitt mit linkem Seitschnitt.",
      returnAdvice: "Öffne das Schlägerblatt und streife nach oben und leicht gegen den Seitschnitt. Ziele leicht auf die Rückhand des Aufschlägers, um die Kurve auszugleichen, und halte den Ball flach. Ein weicher, schnittreicher Schupf ist sicherer als ein harter Schlag.",
    },
    "ghost-serve": {
      name: "Ghost-Aufschlag",
      description: "Ein legendärer, extrem kurzer Unterschnittaufschlag, berühmt geworden durch Ma Lin. Der Ball geht knapp über das Netz, springt auf der gegnerischen Seite auf und rollt zurück Richtung Netz (manchmal sogar darüber). Erfordert maximalen Unterschnitt aus lockerem Handgelenk und dünnem Treffpunkt ganz unten am Ball.",
      contactPoint: "Triff den Ball ganz unten mit komplett offenem, fast waagerechtem Schlägerblatt. Streife scharf nach unten mit extrem dünnem, streifendem Kontakt, der Schläger küsst den Ball nur. Ein lockeres, entspanntes Handgelenk ist entscheidend für den maximalen Unterschnitt, der den Ball zurückziehen lässt.",
      returnAdvice: "Geh nah an den Tisch und nimm ihn direkt nach dem Aufsprung mit sehr offenem Schlägerblatt und feinem, streifendem Kontakt. Leg ihn kurz ab oder schupfe lang mit viel Unterschnitt. Warte nicht, sonst zieht er zurück ins Netz.",
    },
    "fast-long-surprise-fh": {
      name: "Schneller langer Aufschlag auf die Vorhand",
      description: "Ein plötzlicher schneller Aufschlag in die Vorhandecke des Gegners, mit Oberschnitt fast wie ein Konterschlag getroffen. Am wirkungsvollsten nach einer Reihe kurzer Aufschläge. Die Überraschung ist die eigentliche Waffe.",
      contactPoint: "Triff den Ball hinten mit leicht geschlossenem Schlägerblatt. Schlag mit einer schnellen, flachen Bewegung durch den Ball und streife leicht nach oben, um Oberschnitt zu geben. Es geht um Tempo und Vorwärtsenergie statt um Schnitt: dicker Treffpunkt und schnelle Armstreckung.",
      returnAdvice: "Schließ das Schlägerblatt und nimm den Ball früh mit einem kompakten Block oder Gegentopspin. Nicht schupfen. Platziere lang auf die Rückhand oder in die Mitte, um den Winkel zu verkleinern.",
    },
    "fast-long-surprise-bh": {
      name: "Schneller langer Aufschlag auf die Rückhand",
      description: "Schneller Aufschlag in die Rückhandecke, mit Oberschnitt fast wie ein Konterschlag getroffen. Wirkungsvoll gegen Gegner, die zu nah am Tisch stehen oder sich schon auf einen kurzen Aufschlag eingestellt haben.",
      contactPoint: "Triff den Ball hinten mit leicht geschlossenem Schlägerblatt von der Rückhandseite. Schlag mit einem schnellen, kompakten Stoß durch den Ball und streife leicht nach oben. Der Rückhandgriff schließt den Schläger von selbst und gibt der schnellen, flachen Flugbahn etwas Oberschnitt.",
      returnAdvice: "Spiele einen kompakten Rückhand-Block oder -Konter mit leicht geschlossenem Schlägerblatt. Nimm den Ball früh und halte ihn flach. Platziere lang in die Mitte oder weit auf die Vorhand, um den Winkel zu neutralisieren.",
    },
    "pendulum-corkspin": {
      name: "Pendelaufschlag mit Korkenzieherschnitt",
      description: "Ein Pendelaufschlag mit gyroskopischer Korkenzieher-Rotationsachse. Der Ball kann im Flug eiern und unberechenbarer aufspringen, was einen sauberen Rückschlag erschwert.",
      contactPoint: "Triff den Ball hinten-links mit geschlossenem Schlägerblatt. Streife in einer Hakenbewegung nach vorn und um den Ball herum, als würdest du den Schläger um ihn wickeln. Das Handgelenk klappt im Treffpunkt nach innen und erzeugt die gyroskopische Achse: Der Schnitt geht in den Ball hinein statt rein seitlich oder nach unten.",
      returnAdvice: "Beobachte den Aufsprung und triff früh, mit neutralem Schlägerwinkel, um das Eiern abzufangen. Ein kontrollierter Block oder ein Roller in die Mitte ist am sichersten. Pass dich nach dem ersten Absprung an, statt einen weiten Winkel zu erzwingen.",
    },
    "backhand-elbow": {
      name: "Rückhandaufschlag auf den Ellbogen",
      description: "Ein Rückhandaufschlag mit mittlerem Tempo, direkt auf den Ellbogen des Gegners. Der rechte Seitschnitt bringt Kurve hinein und erzeugt Unsicherheit, ob mit Vorhand oder Rückhand zurückgespielt werden soll.",
      contactPoint: "Triff den Ball hinten-rechts mit leicht offenem Schlägerblatt aus der Rückhandposition. Streife seitlich nach links und leicht nach unten. Der Seitschnitt entsteht durch die seitliche Handgelenkbewegung, der leicht abwärts gerichtete Winkel gibt genug Unterschnitt, um den Ball flach zu halten.",
      returnAdvice: "Bewege die Füße und entscheide dich früh; nicht strecken. Kommt er lang, spiele einen kontrollierten Topspin oder Konter mit extra Zug nach oben gegen den Unterschnitt. Ziele lang auf den Ellbogen oder leicht auf die Vorhand des Aufschlägers, um den Seitschnitt auszugleichen.",
    },
    "high-toss-no-spin": {
      name: "Hochwurfaufschlag ohne Schnitt",
      description: "Imitiert den Hochwurfaufschlag mit starkem Unterschnitt täuschend echt, kommt aber ohne Schnitt. Gegner, die extremen Unterschnitt erwarten, schupfen den Ball oft zu lang oder zu hoch. Erfordert viel Ballgefühl.",
      contactPoint: "Triff den Ball hinten-mittig mit fast senkrechtem Schlägerblatt, auch wenn es offen aussieht. Der Schläger bewegt sich nach unten, als würde er starken Unterschnitt erzeugen, trifft den Ball aber mit der flachen Belagmitte, statt zu streifen. Ein dicker, kurzer Kontakt nimmt den Schnitt heraus, während der Arm täuschend durchschwingt.",
      returnAdvice: "Gib für die Kontrolle eigenen Schnitt: ein kompakter Flip oder Schupf mit leicht geschlossenem Schlägerblatt. Lass den Ball etwas steigen und triff ihn sauber. Vermeide ein bloßes Hinhalten, dann springt er hoch.",
    },
    "chop-backspin-short": {
      name: "Kurzer Vorhand-Chop mit Unterschnitt",
      description: "Der grundlegendste Aufschlag im Tischtennis: reiner Unterschnitt ohne Seitschnitt, kurz platziert. Der sicherste Aufschlag, um den Ball kurz und flach zu halten, sodass der Gegner kaum angreifen kann. Ideal gegen aggressive Topspinspieler.",
      contactPoint: "Triff den Ball unten mit weit offenem Schlägerblatt. Schneide mit einem einfachen, sauberen Schlag gerade nach unten. Der Schläger streift ohne seitliche Bewegung unter dem Ball durch und erzeugt reinen Unterschnitt. Triff dünn für maximalen Schnitt oder etwas dicker für eine kontrollierte Platzierung.",
      returnAdvice: "Öffne das Schlägerblatt und streife mit einem kurzen Schupf unter den Ball, früh im Aufsprung. Leg ihn kurz ab oder schupfe lang mit gutem Unterschnitt. Halte den Ball flach, statt ihn anzuheben.",
    },
    "chop-no-spin": {
      name: "Vorhand-Chop ohne Schnitt",
      description: "Nutzt dieselbe Hackbewegung wie die Unterschnitt-Variante, trifft den Ball aber fast ohne Schnitt. Gegner, die starken Unterschnitt erwarten, schupfen oft zu lang oder zu hoch und schenken dir einen leichten dritten Ball.",
      contactPoint: "Triff den Ball hinten-mittig mit einem Schlägerblatt, das offen wirkt, aber tatsächlich senkrechter steht als bei der Unterschnitt-Variante. Die Hackbewegung läuft weiter, doch der Schläger gleitet hinter den Ball statt darunter und erzeugt kaum Schnitt. Der Ausschwung imitiert zur Täuschung die Unterschnitt-Version.",
      returnAdvice: "Gib eigenen Schnitt mit einem kompakten Schupf oder einem kontrollierten Flip bzw. Konter. Halte das Schlägerblatt leicht geschlossen und die Flugbahn flach. Vermeide ein bloßes Hinhalten.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Kurzer Scheibenwischer-Aufschlag mit Seitschnitt",
      description: "Der Schläger fegt waagerecht über den Ball und erzeugt linken Seitschnitt mit Unterschnitt. Je nach Treffpunkt im Bogen erzeugt dieselbe Bewegung jede Schnittart, was ihn sehr schwer lesbar macht. Am wirkungsvollsten, wenn er flach über das Netz geht.",
      contactPoint: "Triff den Ball unten-links, während der Schläger in einem waagerechten Bogen von rechts nach links fegt. Streife nach unten und nach rechts durch den Ball und erfasse die Unterseite in der Mitte des Wischerbogens. Offenes Schlägerblatt und tiefer Treffpunkt kombinieren Unterschnitt mit linkem Seitschnitt.",
      returnAdvice: "Lies den Treffpunkt und spiele mit offenem Schlägerblatt einen kurzen, streifenden Schupf. Ziele leicht auf die Rückhand des Aufschlägers, um den Seitschnitt auszugleichen. Halte ihn kurz und flach, es sei denn, du kannst mit viel Schnitt lang schupfen.",
    },
    "windshield-wiper-topspin": {
      name: "Scheibenwischer-Aufschlag mit Oberschnitt",
      description: "Dieselbe Scheibenwischer-Bewegung, aber mit Treffpunkt an einer anderen Stelle des Bogens, sodass Oberschnitt statt Unterschnitt entsteht. Wer ihn als Unterschnitt liest und schupft, spielt den Ball zu lang oder zu hoch.",
      contactPoint: "Triff den Ball hinten-oben am Ende des Wischerbogens statt in der Mitte. Der Schläger erfasst den Ball später im Schwung, wenn die Bewegung nach oben und vorn geht. Ein leicht geschlossenes Schlägerblatt streift über die Oberseite des Balls und erzeugt Oberschnitt, die seitliche Bewegung bringt Seitschnitt.",
      returnAdvice: "Nicht schupfen. Schließ das Schlägerblatt und blocke früh oder spiele einen Gegentopspin. Ziele leicht auf die Rückhand des Aufschlägers, um den Seitschnitt auszugleichen, und halte den Ball flach.",
    },
    "hidden-serve": {
      name: "Verdeckter Aufschlag (regelwidrig)",
      description: "Ein Aufschlag, bei dem der Treffpunkt absichtlich hinter Körper oder freiem Arm verborgen wird. Vor der Regeländerung vom 1. September 2002 war er erlaubt, im Hobbybereich sieht man ihn gelegentlich noch.",
      contactPoint: "Der Treffpunkt variiert: Da er verdeckt ist, kann der Aufschläger jede Schnittart erzeugen. Meist wird der Ball unten-links mit offenem Schlägerblatt für starken Seit-Unterschnitt getroffen, doch durch das Verdecken sieht der Rückschläger weder den genauen Schlägerwinkel noch die Streifrichtung.",
      returnAdvice: "Kontrolle geht vor: Rechne mit Seit-Unterschnitt und spiele mit offenem Schlägerblatt einen schnittreichen, flachen Schupf. Ziele leicht gegen den Schnitt und halte den Ball flach in die Ecken. War der Treffpunkt verdeckt, bitte um eine Verwarnung.",
      legalityNotes: "Nach ITTF-Regeln seit dem 1. September 2002 verboten. Vom Beginn des Aufschlags bis zum Schlag darf der Ball nicht vor dem Rückschläger verdeckt werden, und der freie Arm muss aus dem Raum zwischen Ball und Netz genommen werden. Ein unklarer Aufschlag kann beim ersten Mal eine Verwarnung nach sich ziehen; jeder weitere unklare Aufschlag kann einen Punkt kosten.",
    },
    "finger-spin-serve": {
      name: "Fingerspin-Aufschlag (regelwidrig)",
      description: "Der Aufschläger versetzt den Ball beim Hochwurf mit den Fingern in Rotation, statt den Schnitt mit dem Schläger zu erzeugen. Bringt täuschenden Schnitt aus einer scheinbar simplen Bewegung.",
      contactPoint: "Der Schnitt entsteht beim Hochwurf durch die Finger, nicht im Schlägerkontakt. Die Finger rollen den Ball beim Loslassen ab und geben ihm Unter- oder Seitschnitt, bevor der Schläger ihn überhaupt berührt. Der Schlägerkontakt selbst kann fast flach sein, sodass der Schnitt wie aus dem Nichts kommt.",
      returnAdvice: "Beobachte die Rotation des Balls beim Hochwurf und stell deinen Schlägerwinkel darauf ein. Spiele mit offenem Schlägerblatt einen weichen, schnittreichen Schupf oder, wenn er lang kommt, einen kontrollierten Topspin. Halte den Rückschlag flach.",
      legalityNotes: "Regelwidrig. Der Aufschlag muss damit beginnen, dass der Ball frei auf der offenen Handfläche ruht, und der Ball muss nahezu senkrecht und ohne Rotation hochgeworfen werden. Den Ball beim Hochwurf mit den Fingern anzudrehen, verstößt gegen diese Regel.",
    },
  },

  motions: {
    pendulum: {
      name: "Pendel",
      description: "Der häufigste Aufschlag im Tischtennis. Der Schläger schwingt wie ein Pendel von rechts nach links (bei Rechtshändern) und erzeugt Seitschnitt kombiniert mit Unter- oder Oberschnitt. Sehr vielseitig: Aus derselben Bewegung sind viele Schnittvarianten möglich.",
    },
    "reverse-pendulum": {
      name: "Umgekehrtes Pendel",
      description: "Der Schläger schwingt von links nach rechts (bei Rechtshändern) und erzeugt Seitschnitt in die entgegengesetzte Richtung zum normalen Pendel. Seltener gespielt und daher für Gegner schwerer zu lesen.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Ein Aufschlag, bei dem der Schläger in einer Wurfbewegung nach außen schwingt, wie beim Werfen eines Tomahawks. Erzeugt starken Seitschnitt und lässt sich mit Oberschnitt kombinieren, damit der Ball seitlich wegspringt. Im asiatischen Spielstil beliebt. Hinweis: Die Zuordnung ist uneinheitlich. Im chinesischen Training gilt er meist als Vorhandaufschlag (Kontakt mit dem Vorhandbelag), manche westliche Trainer ordnen ihn wegen der Körperhaltung der Rückhand zu.",
    },
    "reverse-tomahawk": {
      name: "Umgekehrter Tomahawk",
      description: "Beginnt mit derselben Wurfbewegung nach außen wie ein normaler Tomahawk, wechselt aber im letzten Moment auf die Rückhandseite des Schlägers und erzeugt so linken statt rechten Seitschnitt. Die identische Ausholbewegung macht ihn extrem täuschend. Bekannt gemacht von Ding Ning, auch Kenta Matsudaira spielt ihn.",
    },
    backhand: {
      name: "Rückhandaufschlag",
      description: "Ein kompakter Aufschlag aus der Rückhandseite. Ermöglicht einen schnellen Übergang zum nächsten Ball und ist durch die Handgelenkstellung von Natur aus täuschend. Viele europäische Spieler setzen ihn sehr wirkungsvoll ein.",
    },
    "hook-shovel": {
      name: "Hook / Schaufel",
      description: "Ein unkonventioneller Aufschlag, bei dem der Schläger mit einer Hakenbewegung unter den Ball schaufelt. Erzeugt starken Seitschnitt mit Unterschnitt. Der ungewöhnliche Treffpunkt macht ihn sehr schwer lesbar.",
    },
    chop: {
      name: "Vorhand-Chop",
      description: "Eine einfache, hackende Abwärtsbewegung mit offenem Schlägerblatt, die reinen Unterschnitt ohne Seitschnitt erzeugt. Der grundlegendste Aufschlag im Tischtennis: leicht zu lernen, leicht kurz zu halten und wirksam gegen aggressive Rückschläge. Oft der erste Aufschlag, den Anfänger lernen.",
    },
    "windshield-wiper": {
      name: "Scheibenwischer",
      description: "Der Schläger fegt wie ein Scheibenwischer in einem waagerechten Bogen über die Rückseite des Balls. Je nachdem, wo im Bogen der Ball getroffen wird, erzeugt dieselbe Bewegung Seit-, Ober- oder Unterschnitt. Weil er bei jeder Schnittart gleich aussieht, ist er sehr täuschend. Erfordert eine tiefe, breite Grundstellung.",
    },
    "high-toss": {
      name: "Pendel mit Hochwurf",
      description: "Ein Pendelaufschlag mit hohem Ballwurf (meist 2–5 Meter). Die größere Fallhöhe bringt zusätzliche Energie und erhöht das Schnittpotenzial. Verlangt exzellentes Timing, erzeugt aber außergewöhnlich starken Schnitt.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Reiner Unterschnitt",
      description: "Sauberer Rückwärtsdrall, der den Ball flach gleiten und auf der gegnerischen Seite abbremsen lässt. Wer ohne Ausgleich schupft, spielt den Ball meist ins Netz.",
    },
    "heavy-backspin": {
      name: "Starker Unterschnitt",
      description: "Maximaler Rückwärtsdrall. Der Ball greift auf der Tischoberfläche und kann sogar Richtung Netz zurückspringen. Extrem schwer zu flippen oder aggressiv mit Topspin anzugreifen.",
    },
    "pure-topspin": {
      name: "Reiner Oberschnitt",
      description: "Vorwärtsdrall, der den Ball nach dem Aufsprung nach vorn springen lässt. Oft bei schnellen langen Aufschlägen eingesetzt, um den Gegner unter Zeitdruck zu setzen.",
    },
    "left-side-backspin": {
      name: "Linker Seitschnitt + Unterschnitt",
      description: "Die klassische Pendel-Kombination. Der Ball kurvt aus Sicht des Aufschlägers nach rechts und springt mit Rückwärtsdrall ab. Im Wettkampf sehr verbreitet.",
    },
    "right-side-backspin": {
      name: "Rechter Seitschnitt + Unterschnitt",
      description: "Kombination aus umgekehrtem Pendel oder Tomahawk. Der Ball kurvt aus Sicht des Aufschlägers nach links. Seltener und daher für Gegner schwerer zu lesen.",
    },
    "left-side-topspin": {
      name: "Linker Seitschnitt + Oberschnitt",
      description: "Eine täuschende Kombination: Der Ball sieht nach Unterschnitt aus, springt aber nach vorn. Überrascht Gegner, die Rückwärtsdrall erwarten.",
    },
    "right-side-topspin": {
      name: "Rechter Seitschnitt + Oberschnitt",
      description: "Kombination im Tomahawk-Stil, die den Ball beim Aufsprung kräftig zur Seite springen lässt. Wirkungsvoll, um Vorhandangriffe vorzubereiten.",
    },
    "no-spin": {
      name: "Leerball (ohne Schnitt)",
      description: "Ein „toter“ Ball mit minimaler Rotation. Imitiert die Bewegung eines Schnittaufschlags, kommt aber flatternd ohne Schnitt. Gegner, die Schnitt erwarten, lesen den Ball völlig falsch.",
    },
    "pure-left-sidespin": {
      name: "Reiner linker Seitschnitt",
      description: "Starke seitliche Rotation ohne nennenswerten Ober- oder Unterschnitt. Der Ball kurvt in der Luft deutlich und springt beim Aufsprung seitlich weg.",
    },
    "pure-right-sidespin": {
      name: "Reiner rechter Seitschnitt",
      description: "Starke seitliche Rotation in die entgegengesetzte Richtung. Wirkungsvoll mit umgekehrtem Pendel und Tomahawk.",
    },
    "light-backspin": {
      name: "Leichter Unterschnitt",
      description: "Dezenter Rückwärtsdrall, der kaum vom Leerball zu unterscheiden ist. Der Ball trägt etwas länger als ein toter Ball und lässt den Gegner zwischen Schupf und Flip schwanken.",
    },
    "heavy-left-side-backspin": {
      name: "Starker linker Seitschnitt + Unterschnitt",
      description: "Maximaler kombinierter Schnitt aus der Pendelbewegung. Der Ball kurvt, fällt ab und bremst stark. Der Markenzeichen-Aufschlag vieler Weltklassespieler.",
    },
    corkspin: {
      name: "Korkenzieherschnitt",
      description: "Eine gyroskopische Rotationsachse, die ein unberechenbares Absprungverhalten erzeugt. Der Ball scheint im Flug zu eiern und die Richtung zu wechseln.",
    },
  },

  bounces: {
    "short-low": {
      label: "Kurz (2. Aufsprung auf dem Tisch)",
      secondBouncePosition: "Auf dem Tisch nahe am Netz",
    },
    "short-medium": {
      label: "Kurz (2. Aufsprung nahe der Grundlinie)",
      secondBouncePosition: "Nahe der Grundlinie",
    },
    "half-long": {
      label: "Halblang",
      secondBouncePosition: "Genau auf der Grundlinie, Länge schwer einzuschätzen",
    },
    "long-medium": {
      label: "Lang (tief)",
      secondBouncePosition: "Würde deutlich hinter dem Tisch aufkommen",
    },
    "long-high": {
      label: "Lang (schnell und tief)",
      secondBouncePosition: "Weit hinter dem Tisch",
    },
    "deep-long": {
      label: "Sehr lang (an die Grundlinie)",
      secondBouncePosition: "Genau an der Grundlinie des Gegners. Trotz der Länge engt ein gut platzierter langer Aufschlag den Gegner ein und erschwert einen guten Angriff.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Maximiert das Schnittpotenzial. Gibt dir mehr Zeit, dich auf den nächsten Ball vorzubereiten.",
    },
    medium: {
      tacticalNote: "Gleichgewicht aus Schnitt und Tempo. Verkürzt die Reaktionszeit des Gegners, ohne an Kontrolle einzubüßen.",
    },
    fast: {
      tacticalNote: "Setzt den Gegner unter Zeitdruck. Opfert Schnitt für reines Tempo, um einen schwachen Rückschlag oder einen direkten Punkt zu erzwingen.",
    },
  },

  trajectories: {
    flat: {
      netClearance: "Knapp über das Netz (1–3 cm)",
    },
    "low-arc": {
      netClearance: "Flacher Bogen über das Netz (5–15 cm)",
    },
    "high-arc": {
      netClearance: "Hoher Bogen über das Netz (20+ cm)",
    },
  },

  tosses: {
    "low-legal": {
      position: "Offene Handfläche, Ball sichtbar, ca. 16 cm hochgeworfen",
    },
    "medium-legal": {
      position: "Offene Handfläche, Ball sichtbar, ca. 30–50 cm hochgeworfen",
    },
    "high-legal": {
      position: "Offene Handfläche, Ball sichtbar, 2–5 Meter hochgeworfen",
    },
    "hidden-illegal": {
      position: "Ball wird beim Hochwurf hinter Körper oder Arm verdeckt – nach ITTF-Regeln verboten",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Vorgetäuschter Unterschnitt",
      description: "Der Aufschläger imitiert eine Bewegung für starken Unterschnitt, trifft den Ball aber fast ohne Schnitt oder mit Oberschnitt. Der Gegner erwartet Rückwärtsdrall und schupft den Ball zu lang oder ins Netz.",
      counterplay: "Beobachte den Treffpunkt genau. Gleitet der Schläger unter den Ball, ist es Unterschnitt. Streift er die Rückseite, ist es wahrscheinlich ein Leerball oder Oberschnitt.",
    },
    "same-motion": {
      name: "Gleiche Bewegung, anderer Schnitt",
      description: "Mehrere Schnittarten werden aus einer identischen Aufschlagbewegung gespielt. Der Gegner kann Unterschnitt, Leerball und Seitschnitt nicht unterscheiden.",
      counterplay: "Achte auf das Treffgeräusch und die Flugbahn des Balls statt auf die Armbewegung. Trainiere, die Flugkurve des Balls zu lesen.",
    },
    "contact-hiding": {
      name: "Verdeckter Treffpunkt",
      description: "Der Aufschläger nutzt Körperstellung oder Armwinkel, um den genauen Moment und Winkel des Treffpunkts zu verschleiern.",
      counterplay: "Stell dich so, dass du am Körper des Aufschlägers vorbeisehen kannst. Ist der Treffpunkt komplett verdeckt, bitte den Schiedsrichter, die Sichtbarkeitsregeln durchzusetzen.",
    },
    "wrist-snap": {
      name: "Angetäuschter Handgelenkeinsatz",
      description: "Ein schneller Handgelenkeinsatz lässt starken Schnitt vermuten, doch der Schlägerwinkel im Treffpunkt erzeugt deutlich weniger Rotation als erwartet.",
      counterplay: "Reagiere nicht allein auf das Tempo des Handgelenks. Achte darauf, wie sich der Ball direkt nach dem Aufsprung verhält.",
    },
    "speed-variation": {
      name: "Tempowechsel",
      description: "Schnelle und langsame Aufschläge aus derselben Bewegung im Wechsel, um Timing und Beinarbeit des Gegners zu stören.",
      counterplay: "Bleib auf den Fußballen in einer neutralen Grundstellung. Lies das Balltempo früh und pass deine Ausholbewegung entsprechend an.",
    },
    "body-feint": {
      name: "Körpertäuschung",
      description: "Der Aufschläger deutet mit Schulter, Hüfte oder Kopf eine andere Platzierung oder Schnittrichtung an als die tatsächlich gespielte.",
      counterplay: "Ignoriere die Körpersprache und konzentriere dich auf Schläger und Ball. Trainiere, den Schnitt an der Rotation des Balls zu erkennen statt an der Körperbewegung des Aufschlägers.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Schwachen Rückschlag erzwingen",
      goal: "Den Gegner zu einem hohen oder langen Rückschlag zwingen, den du mit dem dritten Ball angreifen kannst.",
    },
    "set-up-fh-attack": {
      name: "Vorhandangriff vorbereiten",
      goal: "Den Aufschlag so platzieren, dass der Rückschlag auf deine Vorhandseite kommt, für einen aggressiven Topspin oder Schuss.",
    },
    "prevent-flip": {
      name: "Flip verhindern",
      goal: "Den Aufschlag so kurz und flach halten, dass der Gegner ihn weder flippen noch aggressiv angreifen kann.",
    },
    "force-push": {
      name: "Schupf erzwingen",
      goal: "Starker Unterschnitt, der den Gegner zum Schupfen zwingt und dir die Initiative für den dritten Ball gibt.",
    },
    "target-elbow": {
      name: "Auf den Ellbogen zielen",
      goal: "Auf den Ellbogen des Gegners (Umschlagpunkt zwischen Vorhand und Rückhand) zielen, um ihn zögern zu lassen.",
    },
    "go-for-ace": {
      name: "Direkter Punkt",
      goal: "Ein riskanter Aufschlag, der den Punkt direkt durch Tempo, Platzierung oder Täuschung gewinnen soll.",
    },
    "serve-plus-one-fh": {
      name: "Aufschlag + 1 mit der Vorhand",
      goal: "Aufschlagmuster, bei dem du den erwarteten Rückschlag aus vorbereiteter Position mit der Vorhand angreifst.",
    },
    "serve-plus-one-bh": {
      name: "Aufschlag + 1 mit der Rückhand",
      goal: "Aufschlagmuster, bei dem du den erwarteten Rückschlag mit einem Rückhand-Schuss oder -Topspin angreifst.",
    },
  },

  placements: {
    "fh-short": {
      label: "Vorhand kurz",
    },
    "bh-short": {
      label: "Rückhand kurz",
    },
    "fh-long": {
      label: "Vorhand lang",
    },
    "bh-long": {
      label: "Rückhand lang",
    },
    "middle-short": {
      label: "Mitte kurz (Ellbogen)",
    },
    "middle-long": {
      label: "Mitte lang (Ellbogen)",
    },
  },
};
