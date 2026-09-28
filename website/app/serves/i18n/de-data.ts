/**
 * German translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

import type { DataTranslations } from "./es-data";

export const deData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Pendulum-Unterschnitt Kurz",
      description: "Der grundlegendste Aufschlag. Kurzer Unterschnitt mit linkem Seitschnitt auf die Rückhand oder Mitte. Provoziert häufig eine Schupf-Rückgabe und bereitet den Drittball-Angriff vor.",
      contactPoint: "Den Ball unten-hinten mit offener Schlägerfläche treffen. Nach unten und leicht nach rechts streichen, wobei das Handgelenk natürlich durch den Pendelbogen schwingt. Dünner Kontakt maximiert den Unterschnitt, während der seitliche Durchschwung Seitschnitt hinzufügt.",
      returnAdvice: "Nimm ihn früh nach dem Aufsprung mit offener Schlägerfläche und kurzem, streichendem Schupf, um Unterschnitt zu erzeugen. Halte ihn kurz oder schupfe lang auf Rückhand oder Ellbogen des Aufschlägers, leicht gegen den Seitschnitt. Wenn er hochkommt, ist ein kontrollierter Flip sicherer als hochheben.",
    },
    "pendulum-sidespin-long": {
      name: "Pendulum-Seitschnitt Lang",
      description: "Schneller Pendulum-Aufschlag in die Ecken mit Seit- und Unterschnitt. Die Kurve kann eine qualitativ hochwertige Rückgabe erschweren und bereitet eine Drittball-Gelegenheit vor.",
      contactPoint: "Den Ball hinten-links mit leicht geschlossener Schlägerfläche treffen. Mit mehr Tempo und dickerem Kontakt als bei der kurzen Variante vorwärts und seitlich durch den Ball streichen. Das Handgelenk beschleunigt durch den Kontakt für zusätzliche Geschwindigkeit.",
      returnAdvice: "Kommt er lang, geh zurück und spiele einen kontrollierten Topspin/Drive mit zusätzlichem Zug nach oben für den Unterschnitt. Ziele leicht auf die Rückhand des Aufschlägers, um den Seitschnitt auszugleichen, und halte ihn flach. Ein schneller, spinniger Schupf ist die sichere Alternative, wenn du nicht angreifen kannst.",
    },
    "pendulum-no-spin": {
      name: "Pendulum Ohne Rotation",
      description: "Sieht aus wie der Pendulum-Unterschnitt, aber der Ball schwebt ohne Rotation. Gegner, die auf Unterschnitt schieben, heben den Ball meist an.",
      contactPoint: "Den Ball hinten-mittig mit nahezu flacher Schlägerfläche treffen. Der Schläger gleitet hinter den Ball, anstatt unter ihm zu streichen, und erzeugt nur kurzen, dicken Kontakt. Arm und Handgelenk schwingen durch, als würden sie Rotation erzeugen, aber der flache Winkel verhindert die Drehung.",
      returnAdvice: "Gib eigenen Schnitt für Kontrolle: kurzer Schupf oder kontrollierter Flip/Drive mit leicht geschlossener Schlägerfläche. Vermeide einen toten Kontakt, der steigt oft. Halte den Ball flach und platziere in die Ecken.",
    },
    "pendulum-topspin": {
      name: "Pendulum-Topspin",
      description: "Als Unterschnitt getarnt, hat aber tatsächlich Topspin. Der Ball springt nach dem Aufsprung nach vorne, was Gegner überrascht, die versuchen ihn zu schupfen.",
      contactPoint: "Den Ball hinten-oben mit leicht geschlossener Schlägerfläche treffen. Nach oben und vorwärts durch den Ball streichen, die obere Hälfte erfassend. Die Pendelbewegung tarnt den Aufwärtsstrich — das Handgelenk rollt beim Kontakt über den Ball, um Topspin zu erzeugen, während der Arm seitlich weiterschwingt.",
      returnAdvice: "Nicht schupfen. Schläger schließen und früh blocken oder gegen-topspinnen, bevor der Kick kommt. Ziele leicht auf die Rückhand des Aufschlägers, um den Seitschnitt zu neutralisieren, und halte ihn flach.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Reverse-Pendulum Kurz",
      description: "Kurzer Aufschlag mit rechtem Seitschnitt und Unterschnitt. Die zum normalen Pendulum entgegengesetzte Kurve kann schwer zu lesen sein, besonders für Gegner, die an Standard-Aufschläge gewöhnt sind.",
      contactPoint: "Den Ball unten-hinten mit offener Schlägerfläche treffen. Nach unten und nach links streichen (entgegengesetzt zum normalen Pendulum), mit der Rückseite der Handgelenkbewegung. Der Schläger bewegt sich beim Kontakt von links nach rechts über den Körper.",
      returnAdvice: "Früh mit offener Schlägerfläche und kurzem, streichendem Schupf nehmen, um Unterschnitt zu geben. Ziele leicht auf die Vorhand des Aufschlägers, um den rechten Seitschnitt auszugleichen, und halte ihn flach. Wenn er hochkommt, ist ein weicher Flip sicherer als hochheben.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Reverse-Pendulum Topspin Lang",
      description: "Langer Aufschlag mit rechtem Seitschnitt und Topspin. Der Ball kurvt nach links vom Aufschläger aus gesehen und springt seitlich ab, was einen qualitativen Angriff erschwert.",
      contactPoint: "Den Ball hinten-rechts mit leicht geschlossener Schlägerfläche treffen. Nach oben und nach links durch den Ball streichen. Die Reverse-Pendulum-Bewegung erzeugt rechten Seitschnitt, während die Aufwärtskomponente Topspin hinzufügt.",
      returnAdvice: "Schläger schließen und früh blocken, drive oder gegen-topspinnen. Ziele leicht auf die Vorhand des Aufschlägers, um den Seitschnitt auszugleichen. Wenn du loopst, streiche über den Ball und halte die Flugkurve niedrig.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk Lang",
      description: "Aggressiver langer Aufschlag mit starkem rechtem Seitschnitt und Topspin. Der Ball springt nach dem Aufsprung kräftig zur Seite und setzt den Gegner unter Zeitdruck.",
      contactPoint: "Den Ball hinten-rechts mit nahezu senkrechter Schlägerfläche treffen. In einer Wurfbewegung vorwärts und scharf nach links streichen. Das Handgelenk schnappt beim Kontakt nach außen und erzeugt kraftvollen rechten Seitschnitt mit Topspin aus dem Aufwärtsbogen des Schwungs.",
      returnAdvice: "Früh mit geschlossener Schlägerfläche und kompaktem Block oder Drive nehmen. Ziele leicht auf die Vorhand des Aufschlägers, um den Seitschnitt auszugleichen, und halte ihn flach. Wenn du Zeit hast, ist ein kontrollierter Topspin die beste Option.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk Unterschnitt Kurz",
      description: "Ein seltener kurzer Tomahawk mit Unterschnitt. Die ungewöhnliche Bewegung kombiniert mit der kurzen Platzierung macht es den Gegnern sehr schwer, ihn zu lesen und aggressiv zurückzuspielen.",
      contactPoint: "Den Ball unten mit offener und seitlich angewinkelter Schlägerfläche treffen. Im Tomahawk-Bogen nach unten und nach links streichen. Dünner Kontakt unter dem Ball erzeugt Unterschnitt, während die Seitwärtsbewegung Seitschnitt hinzufügt. Ein weicherer, langsamerer Handgelenkschlag hält den Ball kurz.",
      returnAdvice: "Offene Schlägerfläche und kurzer, streichender Schupf, um ihn flach zu halten. Ziele leicht auf die Vorhand des Aufschlägers, um den Seitschnitt auszugleichen. Halte ihn kurz, es sei denn du kannst lang mit gutem Schnitt schupfen.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Umgekehrter Tomahawk Lang",
      description: "Ding Nings Markenzeichen-Aufschlag. Beginnt identisch wie ein normaler Tomahawk, wechselt aber im letzten Moment auf den Rückhandkontakt und erzeugt Linksdrall mit Topspin statt des erwarteten Rechtsdralls. Der Ball taucht durch den Topspin schnell ab und springt nach dem Aufprall stark zur Gegenseite. Erfordert eine tiefe Hocke und präzises Timing. Am täuschendsten in Kombination mit normalen Tomahawk-Aufschlägen.",
      contactPoint: "Den Ball hinten-links mit dem Rückhandbelag treffen, die Schlägerfläche nahezu senkrecht. Im letzten Moment des Tomahawk-Schwungs das Handgelenk nach innen drehen, um vorwärts und nach rechts zu streichen. Dies kehrt die Seitschnittrichtung im Vergleich zum normalen Tomahawk um und erzeugt linken Seitschnitt mit Topspin.",
      returnAdvice: "Schließen Sie den Schläger und nehmen Sie den Ball früh mit einem kompakten Block oder Gegentopspin an. Zielen Sie leicht auf die Rückhand des Aufschlägers, um den Linksdrall auszugleichen. Nicht schieben — der Topspin wird den Ball lang machen. Wenn die Drallrichtung unklar ist, zielen Sie zur Mitte.",
    },
    "backhand-backspin-short": {
      name: "Rückhand-Unterschnitt Kurz",
      description: "Ein kompakter Rückhand-Aufschlag mit reinem Unterschnitt, kurz platziert. Schnell auszuführen und ermöglicht sofortige Vorbereitung für den nächsten Ball. Auf vielen Spielniveaus verbreitet.",
      contactPoint: "Den Ball unten mit offener Schlägerfläche treffen. Mit einem kompakten Handgelenkschlag gerade nach unten streichen, den Schlag kurz und kontrolliert halten. Der Schläger bewegt sich kaum nach vorne — fast die gesamte Bewegung geht nach unten, um reinen Unterschnitt zu erzeugen.",
      returnAdvice: "Schläger öffnen und kurz unter den Ball streichen, früh treffen. Halte ihn kurz oder schupfe lang in die Ecken, wenn du verlängern willst. Fokus auf flach statt hochheben.",
    },
    "backhand-no-spin-long": {
      name: "Rückhand Schnell Lang",
      description: "Ein schneller Rückhand-Aufschlag in die Ecken mit minimalem Schnitt. Die reine Geschwindigkeit überrascht unvorbereitete Gegner, besonders wenn er mit kurzen Unterschnitt-Aufschlägen gemischt wird.",
      contactPoint: "Den Ball hinten-mittig mit nahezu flacher Schlägerfläche treffen. Mit einer schnellen, stoßenden Bewegung durch den Ball drücken, statt zu streichen. Dicker, flacher Kontakt maximiert die Geschwindigkeit bei minimalem Schnitt. Der Arm streckt sich vollständig zum Ziel aus.",
      returnAdvice: "Um den höchsten Punkt herum mit kompaktem Block oder kontrolliertem Drive treffen, etwas Topspin für Kontrolle geben. Nicht nur hinhalten; No-Spin braucht deinen eigenen Spin. Tief in die Ecken oder auf den Ellbogen platzieren.",
    },
    "backhand-sidespin": {
      name: "Rückhand-Seitschnitt",
      description: "Rückhand-Aufschlag mit rechtem Seitschnitt und Unterschnitt. Die kompakte Bewegung macht den Schnitt schwer lesbar, und der Aufschläger befindet sich bereits in Position für einen Rückhand-Folgeschlag.",
      contactPoint: "Den Ball unten-rechts mit offener Schlägerfläche treffen. Mit einer kompakten Handgelenkbewegung nach unten und nach links über den Ball streichen. Der Seitschnitt entsteht durch die seitliche Handgelenkbewegung, während die offene Schlägerfläche Unterschnitt erzeugt.",
      returnAdvice: "Früh mit offener Schlägerfläche und kurzem, streichendem Schupf nehmen, Unterschnitt geben. Ziele leicht auf die Vorhand des Aufschlägers, um den Seitschnitt auszugleichen. Wenn er hochkommt, funktioniert ein kompakter Flip.",
    },
    "hook-heavy-side-short": {
      name: "Haken Schwerer Seitschnitt Kurz",
      description: "Eine schöpfende Bewegung unter dem Ball, die extremen Seitschnitt erzeugt. Der Ball springt seitlich weg beim Aufsprung. Durch den ungewöhnlichen Schlägerwinkel sehr schwer zu lesen.",
      contactPoint: "Die linke Seite des Balls mit nahezu waagerechter Schlägerfläche treffen, unter und um den Ball schöpfend. Die Hakenbewegung streicht seitlich über den Äquator des Balls. Das Handgelenk kringelt sich scharf nach innen, um die seitliche Schnittkomponente zu maximieren.",
      returnAdvice: "Schlägerwinkel gegen den starken Seitschnitt einstellen und die Seite des Balls treffen, nicht die Rückseite. Ein weicher Touch oder Banana-Flip ist sicherer als hart zu schlagen. Ziele leicht auf die Rückhand des Aufschlägers und halte ihn flach.",
    },
    "hook-backspin-short": {
      name: "Haken Unterschnitt Kurz",
      description: "Haken-Aufschlag mit schwerem Seitschnitt kombiniert mit Unterschnitt. Die doppelte Schnitt-Komponente macht eine präzise Rückgabe äußerst schwierig.",
      contactPoint: "Den Ball unten-links mit offener und seitlich angewinkelter Schlägerfläche treffen. In einem schöpfenden Bogen nach unten und nach rechts streichen, gleichzeitig die Unterseite und die Seite des Balls erfassend. Dieses Streichen aus zwei Winkeln erzeugt die Kombination aus Unterschnitt und Seitschnitt.",
      returnAdvice: "Schläger weiter öffnen und mit streichendem Schupf anheben, um den starken Unterschnitt zu kontrollieren. Ziele leicht auf die Rückhand des Aufschlägers, um den Seitschnitt auszugleichen, und halte ihn flach. Nicht flach schlagen.",
    },
    "hook-fast-long-topspin": {
      name: "Haken Schnell Lang",
      description: "Eine aggressive Haken-Aufschlag-Variante, die Rechtsdrall mit Topspin kombiniert, schnell und tief serviert. Die schaufelnde Hakenbewegung scheint Unterschnitt zu erzeugen, aber der Ball springt mit Seitendrall nach vorne. Am effektivsten in Kombination mit traditionellen Haken-Unterschnitt-Aufschlägen zur Maximierung der Täuschung.",
      contactPoint: "Den Ball hinten-rechts mit leicht geschlossener Schlägerfläche treffen. In einem schnellen, schöpfenden Bogen vorwärts und nach links streichen, die obere Seite des Balls erfassend. Die Hakenbewegung tarnt den Aufwärtskontakt, der Topspin erzeugt, während der seitliche Durchschwung rechten Seitschnitt hinzufügt.",
      returnAdvice: "Schließen Sie den Schläger und verwenden Sie einen kompakten Block oder Gegentopspin, nehmen Sie den Ball sehr früh an. Nicht schieben — der Topspin wird den Ball lang machen. Neigen Sie den Schläger leicht nach links, um den Rechtsdrall auszugleichen. Ein kontrollierter Topspin-Loop zur Mitte ist die sicherste Angriffsoption.",
    },
    "high-toss-backspin": {
      name: "Hochwurf Schwerer Unterschnitt",
      description: "Der hohe Wurf kann mehr Zeit und Energie für schweren Schnitt geben. Der Ball kann nach dem Aufsprung sichtbar rückwärts rotieren. Wird von vielen Spitzenspielern verwendet, um schwache Schupfbälle zu erzwingen.",
      contactPoint: "Den Ball ganz unten mit weit geöffneter Schlägerfläche treffen, während er vom hohen Wurf herabfällt. Scharf nach unten streichen und die Gravitationsenergie des fallenden Balls nutzen, um den Unterschnitt zu verstärken. Das Handgelenk schnappt am tiefsten Punkt des Schwungs nach unten für maximalen Schnitt.",
      returnAdvice: "Sehr offene Schlägerfläche und längerer, streichender Schupf mit zusätzlichem Lift. Wenn er lang ist, mit kontrolliertem Loop eröffnen statt flach zu schlagen. Priorisiere viel Unterschnitt und niedrige Höhe.",
    },
    "high-toss-sidespin": {
      name: "Hochwurf Seitschnitt",
      description: "Kombiniert den hohen Wurf mit Seitschnitt und Unterschnitt für einen schweren kombinierten Schnitt. Der Ball kann dramatisch kurven und auf dem Tisch abbremsen. Erfordert außergewöhnliches Timing.",
      contactPoint: "Den Ball unten-links mit offener Schlägerfläche treffen, während er vom hohen Wurf herabfällt. In einem Pendelbogen nach unten und nach rechts streichen, sowohl die Unterseite als auch die linke Seite erfassend. Die kombinierte Gravitationsenergie und der Handgelenkschlag erzeugen extrem schweren Unterschnitt mit linkem Seitschnitt.",
      returnAdvice: "Schläger öffnen und nach oben sowie leicht gegen den Seitschnitt bürsten. Ziele leicht auf die Rückhand des Aufschlägers, um die Kurve auszugleichen, und halte ihn flach. Ein weicher, spinniger Schupf ist sicherer als hart zu schlagen.",
    },
    "ghost-serve": {
      name: "Geister-Aufschlag",
      description: "Ein ultra-kurzer Unterschnitt-Aufschlag, der kaum über das Netz geht und zweimal (oder öfter) auf der Gegnerseite aufspringt. Der Ball kann buchstäblich zurück zum Netz rollen. Ein Publikumsliebling bei Profi-Veranstaltungen.",
      contactPoint: "Den Ball ganz unten mit völlig geöffneter Schlägerfläche (nahezu waagerecht) treffen. Scharf nach unten streichen mit einem extrem dünnen, streifenden Kontakt — der Schläger küsst den Ball nur. Ein lockeres, entspanntes Handgelenk ist entscheidend, um den maximalen Unterschnitt zu erzeugen, der den Ball zurückspinnen lässt.",
      returnAdvice: "Reingehen und direkt nach dem Aufsprung mit sehr offener Schlägerfläche und feinem, streichendem Kontakt nehmen. Kurz halten oder lang mit viel Unterschnitt schupfen. Nicht warten, sonst zieht er zurück ins Netz.",
    },
    "fast-long-surprise-fh": {
      name: "Schnell Lang auf die Vorhand",
      description: "Ein plötzlicher schneller Aufschlag in die Vorhandecke des Gegners mit Topspin-/Drive-Kontakt. Am effektivsten, wenn er nach einer Serie von kurzen Aufschlägen eingemischt wird. Das Überraschungsmoment ist die Hauptwaffe.",
      contactPoint: "Den Ball hinten mit leicht geschlossener Schlägerfläche treffen. Mit einem schnellen, flachen Schlag durch den Ball treiben und leicht nach oben streichen, um Topspin hinzuzufügen. Der Fokus liegt auf Geschwindigkeit und Vorwärtsenergie statt auf Schnitt — dicker Kontakt mit schneller Armstreckung.",
      returnAdvice: "Schläger schließen und früh kompakt blocken oder gegen-topspinnen. Nicht schupfen. Tief auf die Rückhand oder in die Mitte platzieren, um den Winkel zu reduzieren.",
    },
    "fast-long-surprise-bh": {
      name: "Schnell Lang auf die Rückhand",
      description: "Schneller Aufschlag in die Rückhandecke mit Topspin-/Drive-Kontakt. Effektiv gegen Gegner, die zu nah am Tisch stehen oder sich auf kurze Rückgabe eingestellt haben.",
      contactPoint: "Den Ball hinten mit leicht geschlossener Schlägerfläche von der Rückhandseite treffen. Mit einem schnellen, kompakten Stoß durch den Ball treiben und leicht nach oben streichen. Der Rückhandgriff schließt den Schläger natürlich und fügt der schnellen, flachen Flugkurve einen Hauch Topspin hinzu.",
      returnAdvice: "Kompakter Rückhand-Block/Drive mit leicht geschlossener Schlägerfläche. Früh nehmen und flach halten. Tief in die Mitte oder weit in die Vorhand platzieren, um den Winkel zu neutralisieren.",
    },
    "pendulum-corkspin": {
      name: "Pendulum Korkenzieher",
      description: "Ein Pendulum-Aufschlag mit gyroskopischer Korkenzieherdrehachse. Der Ball kann im Flug oszillieren und weniger vorhersehbar aufspringen, was saubere Rückgaben erschwert.",
      contactPoint: "Den Ball hinten-links mit geschlossener Schlägerfläche treffen. Vorwärts und um den Ball herum in einer Hakenbewegung streichen, als würde man den Schläger um ihn wickeln. Das Handgelenk schnappt beim Kontakt nach innen, um die gyroskopische Achse zu erzeugen — der Schnitt geht in den Ball hinein statt rein seitlich oder nach unten.",
      returnAdvice: "Auf den Aufsprung achten und früh treffen, mit neutralem Schlägerwinkel das Wackeln absorbieren. Ein kontrollierter Block oder Roll in die Mitte ist am sichersten. Nach dem ersten Kick anpassen statt einen weiten Winkel zu erzwingen.",
    },
    "backhand-elbow": {
      name: "Rückhand auf den Ellbogen",
      description: "Ein Rückhand-Aufschlag mit mittlerer Geschwindigkeit, direkt auf den Ellbogen des Gegners. Der rechte Seitschnitt fügt Kurve hinzu und erzeugt Unentschlossenheit, ob Vorhand oder Rückhand gespielt werden soll.",
      contactPoint: "Den Ball hinten-rechts mit leicht geöffneter Schlägerfläche aus der Rückhandposition treffen. Seitlich nach links und leicht nach unten streichen. Der Seitschnitt entsteht durch die seitliche Handgelenkbewegung, während der leicht abwärts gerichtete Winkel genug Unterschnitt hinzufügt, um den Ball flach zu halten.",
      returnAdvice: "Fußarbeit, früh entscheiden; nicht strecken. Ist er lang, kontrollierten Topspin/Drive mit zusätzlichem Lift wegen Unterschnitt spielen. Tief in den Ellbogen oder leicht auf die Vorhand des Aufschlägers zielen, um den Seitschnitt auszugleichen.",
    },
    "high-toss-no-spin": {
      name: "Hochwurf Ohne Rotation",
      description: "Imitiert den schweren Hochwurf-Unterschnitt-Aufschlag sehr genau, hat aber keinen Schnitt. Gegner, die extremen Unterschnitt erwarten, können den Ball lang oder hoch schupfen. Erfordert großes Ballgefühl.",
      contactPoint: "Den Ball hinten-mittig mit nahezu flacher Schlägerfläche treffen, trotz des offenen Erscheinungsbilds. Der Schläger bewegt sich nach unten, als würde er schweren Unterschnitt erzeugen, trifft den Ball aber mit der flachen Mitte des Belags statt zu streichen. Dicker, kurzer Kontakt verhindert die Rotation, während der Arm täuschend durchschwingt.",
      returnAdvice: "Gib eigenen Schnitt für Kontrolle: kompakter Flip oder Schupf mit leicht geschlossener Schlägerfläche. Lass den Ball etwas steigen und treffe sauber. Vermeide einen toten Kontakt, der hochspringt.",
    },
    "chop-backspin-short": {
      name: "Vorhand-Chop Unterschnitt Kurz",
      description: "Der fundamentalste Aufschlag im Tischtennis. Reiner Unterschnitt ohne Seitschnitt, kurz platziert. Der sicherste Aufschlag, um den Ball niedrig und kurz zu halten, was es den Gegnern sehr schwer macht anzugreifen. Eine ideale Wahl gegen aggressive Topspinspieler.",
      contactPoint: "Den Ball unten mit weit geöffneter Schlägerfläche treffen. Gerade nach unten mit einem einfachen, sauberen Schlag schneiden. Der Schläger streicht unter dem Ball ohne seitliche Bewegung und erzeugt reinen Unterschnitt. Den Kontakt dünn halten für maximalen Schnitt oder etwas dicker für kontrollierte Platzierung.",
      returnAdvice: "Schläger öffnen und kurz unter den Ball streichen, früh treffen. Kurz halten oder lang mit gutem Unterschnitt schupfen. Flach halten statt hochheben.",
    },
    "chop-no-spin": {
      name: "Vorhand-Chop Ohne Rotation",
      description: "Verwendet dieselbe Chop-Bewegung wie die Unterschnitt-Variante, kontaktiert den Ball aber mit minimalem Schnitt. Gegner, die schweren Unterschnitt erwarten, schupfen oft lang oder heben den Ball an, was einen einfachen Drittball ergibt.",
      contactPoint: "Den Ball hinten-mittig mit einer Schlägerfläche treffen, die offen erscheint, aber tatsächlich senkrechter ist als bei der Unterschnitt-Variante. Die Chop-Bewegung wird fortgesetzt, aber der Schläger gleitet hinter den Ball statt unter ihn und erzeugt minimalen Schnitt. Der Durchschwung imitiert die Unterschnitt-Version zur Täuschung.",
      returnAdvice: "Gib eigenen Schnitt mit kompaktem Schupf oder kontrolliertem Flip/Drive. Schläger leicht geschlossen und flache Flugbahn. Vermeide einen toten Kontakt.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Scheibenwischer Seitschnitt Kurz",
      description: "Der Schläger fegt horizontal über den Ball und erzeugt linken Seitschnitt mit Unterschnitt. Die identische Bewegung kann je nach Kontaktpunkt im Bogen jeden Schnitttyp erzeugen, was ihn sehr schwer lesbar macht. Am effektivsten, wenn er niedrig über das Netz gehalten wird.",
      contactPoint: "Den Ball unten-links treffen, während der Schläger in einem horizontalen Bogen von rechts nach links fegt. Nach unten und nach rechts durch den Ball streichen, die Unterseite in der Mitte des Wischerbogens erfassend. Die offene Schlägerfläche und der tiefe Kontaktpunkt kombinieren Unterschnitt mit linkem Seitschnitt.",
      returnAdvice: "Kontakt lesen und mit offener Schlägerfläche kurz und streichend schupfen. Ziele leicht auf die Rückhand des Aufschlägers, um den Seitschnitt auszugleichen. Kurz und flach halten, es sei denn du kannst lang mit viel Schnitt schupfen.",
    },
    "windshield-wiper-topspin": {
      name: "Scheibenwischer Topspin",
      description: "Gleiche Scheibenwischer-Bewegung, aber der Kontakt erfolgt an einem anderen Punkt des Bogens, um Topspin statt Unterschnitt zu erzeugen. Gegner, die Unterschnitt lesen und schupfen, schicken den Ball lang oder hoch.",
      contactPoint: "Den Ball hinten-oben am Ende des Wischerbogens statt in der Mitte treffen. Der Schläger erfasst den Ball später im Schwung, wo die Bewegung nach oben und vorwärts geht. Eine leicht geschlossene Schlägerfläche streicht über die Oberseite des Balls und erzeugt Topspin, während die seitliche Bewegung Seitschnitt hinzufügt.",
      returnAdvice: "Nicht schupfen. Schläger schließen und früh blocken oder gegen-topspinnen. Ziele leicht auf die Rückhand des Aufschlägers, um den Seitschnitt auszugleichen, und halte ihn flach.",
    },
    "hidden-serve": {
      name: "Verdeckter Aufschlag (Illegal)",
      description: "Ein Aufschlag, bei dem der Kontaktpunkt absichtlich hinter dem Körper oder freien Arm verborgen wird. Dies war vor der Regeländerung vom 1. September 2002 legal und wird gelegentlich noch im Amateurspiel gesehen.",
      contactPoint: "Der Kontakt variiert — der Aufschläger kann jeden Schnitttyp erzeugen, da der Kontakt verborgen ist. Typischerweise wird die Unterseite-links des Balls mit offener Schlägerfläche für schweren Seitschnitt-Unterschnitt geschlagen, aber die Verdeckung bedeutet, dass der Rückschläger den genauen Kontaktwinkel oder die Streichrichtung nicht sehen kann.",
      returnAdvice: "Kontrolle priorisieren: Seitschnitt-Unterschnitt annehmen und mit offener Schlägerfläche spinnig und flach schupfen. Leicht gegen den Schnitt zielen und flach in die Ecken halten. Wenn der Kontakt verdeckt war, um Verwarnung bitten.",
      legalityNotes: "Illegal gemäß den ITTF-Regeln seit dem 1. September 2002. Vom Beginn des Aufschlags bis zum Schlag darf der Ball nicht vor dem Rückschläger verborgen werden, und der freie Arm muss aus dem Raum zwischen Ball und Netz entfernt werden. Ein unklarer Aufschlag kann beim ersten Vorfall eine Verwarnung erhalten; weitere unklare Aufschläge können einen Punkt kosten.",
    },
    "finger-spin-serve": {
      name: "Fingerspin-Aufschlag (Illegal)",
      description: "Der Aufschläger benutzt seine Finger, um dem Ball während des Hochwurfs Rotation zu verleihen, anstatt den Schnitt mit dem Schläger zu erzeugen. Erzeugt täuschende Rotation aus einer scheinbar einfachen Bewegung.",
      contactPoint: "Die Rotation wird durch die Finger beim Wurf erzeugt, nicht beim Schlägerkontakt. Die Finger rollen den Ball beim Loslassen und verleihen ihm Unterschnitt oder Seitschnitt, bevor der Schläger den Ball überhaupt berührt. Der Schlägerkontakt selbst kann nahezu flach sein, wodurch der Schnitt aus dem Nichts zu kommen scheint.",
      returnAdvice: "Ballrotation beim Wurf beobachten und Schlägerwinkel darauf einstellen. Offene Schlägerfläche und weicher, spinniger Schupf, oder kontrollierter Loop wenn lang. Rückgabe flach halten.",
      legalityNotes: "Illegal. Der Aufschlag muss mit dem Ball beginnen, der frei auf der offenen Handfläche ruht, und der Wurf muss nahezu senkrecht erfolgen, ohne dem Ball Rotation zu geben. Dem Ball mit den Fingern während des Wurfs Rotation zu verleihen, verstößt gegen diese Anforderung.",
    },
  },

  motions: {
    pendulum: {
      name: "Pendulum",
      description: "Der häufigste Aufschlag im Tischtennis. Der Schläger schwingt wie ein Pendel von rechts nach links (für Rechtshänder) und erzeugt Seitschnitt kombiniert mit Unter- oder Topspin. Sehr vielseitig mit vielen möglichen Schnittvariationen aus derselben Bewegung.",
    },
    "reverse-pendulum": {
      name: "Reverse-Pendulum",
      description: "Der Schläger schwingt von links nach rechts (für Rechtshänder) und erzeugt Seitschnitt in der entgegengesetzten Richtung zum Standard-Pendulum. Weniger verbreitet, was es für Gegner schwieriger zu lesen macht.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Ein Aufschlag, bei dem der Schläger in einer Wurfbewegung nach außen geschleudert wird, wie ein Tomahawk. Erzeugt starken Seitschnitt und kann mit Topspin für einen Sprungeffekt kombiniert werden. Beliebt im asiatischen Spielstil. Hinweis: Die Handklassifikation variiert — im chinesischen Training wird dies typischerweise als Vorhand-Aufschlag betrachtet (Kontakt auf dem Vorhandbelag), während einige westliche Trainer ihn aufgrund der Körperhaltung als Rückhand klassifizieren.",
    },
    "reverse-tomahawk": {
      name: "Umgekehrter Tomahawk",
      description: "Beginnt mit der gleichen Wurfbewegung wie ein normaler Tomahawk, wechselt aber im letzten Moment auf die Rückhandseite des Schlägers, wodurch Linksdrall statt Rechtsdrall entsteht. Die identische Anfangsbewegung macht ihn extrem täuschend. Populär gemacht von Ding Ning und auch von Kenta Matsudaira verwendet.",
    },
    backhand: {
      name: "Rückhand-Aufschlag",
      description: "Ein kompakter Aufschlag von der Rückhandseite. Ermöglicht einen schnellen Übergang zum nächsten Ball und ist durch die Handgelenkposition von Natur aus täuschend. Wird von vielen europäischen Spielern effektiv eingesetzt.",
    },
    "hook-shovel": {
      name: "Haken / Schaufel",
      description: "Ein unkonventioneller Aufschlag, bei dem der Schläger in einer Hakenbewegung unter den Ball greift. Erzeugt schweren Seitschnitt mit Unterschnitt. Der ungewöhnliche Kontaktpunkt macht ihn sehr schwer lesbar.",
    },
    chop: {
      name: "Vorhand-Chop",
      description: "Eine einfache Abwärtsbewegung mit geöffneter Schlägerfläche, die reinen Unterschnitt ohne Seitschnitt erzeugt. Der fundamentalste Aufschlag im Tischtennis — leicht zu erlernen, leicht kurz zu halten und effektiv gegen aggressive Rückgaben. Oft der erste Aufschlag, der Anfängern beigebracht wird.",
    },
    "windshield-wiper": {
      name: "Scheibenwischer",
      description: "Der Schläger fegt in einem Bogen horizontal wie ein Scheibenwischer über die Rückseite des Balls. Je nachdem, wo im Bogen der Ball kontaktiert wird, kann dieselbe Bewegung Seitschnitt, Topspin oder Unterschnitt erzeugen. Das identische Erscheinungsbild unabhängig vom Schnitt macht ihn hochgradig täuschend. Erfordert eine tiefe, breite Grundhaltung für die korrekte Ausführung.",
    },
    "high-toss": {
      name: "Pendulum mit Hochwurf",
      description: "Ein Pendulum-Aufschlag mit hohem Ballwurf (typischerweise 2-5 Meter). Die zusätzliche Fallhöhe fügt Gravitationsenergie hinzu und erhöht das Schnittpotenzial. Erfordert exzellentes Timing, erzeugt aber außergewöhnlich schweren Schnitt.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Reiner Unterschnitt",
      description: "Saubere Rückwärtsrotation, die den Ball niedrig gleiten und auf der Gegnerseite abbremsen lässt. Rückgaben gehen ins Netz, wenn ohne Kompensation geschupft wird.",
    },
    "heavy-backspin": {
      name: "Schwerer Unterschnitt",
      description: "Maximale Rückwärtsrotation. Der Ball greift auf der Tischoberfläche und kann sogar zum Netz zurückspringen. Extrem schwer zu flippen oder aggressiv mit Topspin zu spielen.",
    },
    "pure-topspin": {
      name: "Reiner Topspin",
      description: "Vorwärtsrotation, die den Ball nach dem Aufsprung nach vorne springen lässt. Wird oft bei schnellen langen Aufschlägen verwendet, um den Gegner unter Zeitdruck zu setzen.",
    },
    "left-side-backspin": {
      name: "Linker Seitschnitt + Unterschnitt",
      description: "Die klassische Pendulum-Kombination. Der Ball kurvt aus Sicht des Aufschlägers nach rechts und springt mit Rückwärtsrotation ab. Sehr verbreitet im Wettkampfspiel.",
    },
    "right-side-backspin": {
      name: "Rechter Seitschnitt + Unterschnitt",
      description: "Reverse-Pendulum- oder Tomahawk-Kombination. Der Ball kurvt aus Sicht des Aufschlägers nach links. Weniger verbreitet und daher für Gegner schwerer zu lesen.",
    },
    "left-side-topspin": {
      name: "Linker Seitschnitt + Topspin",
      description: "Eine täuschende Kombination, bei der der Ball nach Unterschnitt aussieht, aber nach vorne springt. Wird verwendet, um Gegner zu überraschen, die Rückwärtsrotation erwarten.",
    },
    "right-side-topspin": {
      name: "Rechter Seitschnitt + Topspin",
      description: "Tomahawk-artige Kombination, die einen starken seitlichen Absprung erzeugt. Effektiv zur Vorbereitung von Vorhand-Angriffen.",
    },
    "no-spin": {
      name: "Leerball Ohne Rotation",
      description: "Ein toter Ball mit minimaler Rotation. Imitiert die Bewegung eines Schnittaufschlags, erzeugt aber einen schwebenden Effekt. Gegner, die Schnitt erwarten, lesen den Ball völlig falsch.",
    },
    "pure-left-sidespin": {
      name: "Reiner Linker Seitschnitt",
      description: "Starke Seitwärtsrotation ohne nennenswerten Ober-/Unterschnitt. Der Ball kurvt dramatisch in der Luft und springt seitlich ab.",
    },
    "pure-right-sidespin": {
      name: "Reiner Rechter Seitschnitt",
      description: "Starke Seitwärtsrotation in die entgegengesetzte Richtung. Effektiv mit Reverse-Pendulum- und Tomahawk-Bewegungen.",
    },
    "light-backspin": {
      name: "Leichter Unterschnitt",
      description: "Subtile Rückwärtsrotation, die schwer von keiner Rotation zu unterscheiden ist. Der Ball schwebt etwas mehr als ein toter Ball, was Gegner zwischen Schupfen und Flippen in Unentschlossenheit bringt.",
    },
    "heavy-left-side-backspin": {
      name: "Schwerer Linker Seitschnitt + Unterschnitt",
      description: "Maximaler kombinierter Schnitt aus der Pendulum-Bewegung. Der Ball kurvt, sinkt und bremst aggressiv ab. Der Markenzeichen-Aufschlag vieler Spitzenspieler.",
    },
    corkspin: {
      name: "Korkenzieherschnitt",
      description: "Eine gyroskopische Drehachse, die ein unvorhersehbares Absprungverhalten erzeugt. Der Ball scheint im Flug zu oszillieren und die Richtung zu wechseln.",
    },
  },

  bounces: {
    "short-low": {
      label: "Kurz (2. Aufsprung auf dem Tisch)",
      secondBouncePosition: "Auf dem Tisch nahe dem Netz",
    },
    "short-medium": {
      label: "Kurz (2. Aufsprung nahe der Grundlinie)",
      secondBouncePosition: "Nahe der Tisch-Grundlinie",
    },
    "half-long": {
      label: "Halblang",
      secondBouncePosition: "Genau auf der Grundlinie — unklare Länge",
    },
    "long-medium": {
      label: "Lang (tief)",
      secondBouncePosition: "Würde weit hinter dem Tisch aufkommen",
    },
    "long-high": {
      label: "Lang (schnell und tief)",
      secondBouncePosition: "Sehr weit vom Tisch entfernt",
    },
    "deep-long": {
      label: "Tief Lang (Grundlinie)",
      secondBouncePosition: "Genau auf der Grundlinie des Gegners. Trotz der Länge setzt ein gut platzierter tiefer Aufschlag den Gegner unter Druck und erschwert einen qualitativen Angriff.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Maximiert das Schnittpotenzial. Gibt dem Aufschläger mehr Zeit, den nächsten Ball vorzubereiten.",
    },
    medium: {
      tacticalNote: "Ausgewogenheit zwischen Schnitt und Geschwindigkeit. Reduziert die Reaktionszeit des Gegners bei gleichzeitigem Erhalt der Kontrolle.",
    },
    fast: {
      tacticalNote: "Setzt den Gegner unter Zeitdruck. Opfert Schnitt zugunsten reiner Geschwindigkeit, um eine schwache Rückgabe oder einen direkten Punkt zu erzwingen.",
    },
  },

  trajectories: {
    flat: {
      netClearance: "Knapp über das Netz (1-3 cm)",
    },
    "low-arc": {
      netClearance: "Flacher Bogen über das Netz (5-15 cm)",
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
      position: "Offene Handfläche, Ball sichtbar, ca. 30-50 cm hochgeworfen",
    },
    "high-legal": {
      position: "Offene Handfläche, Ball sichtbar, 2-5 Meter hochgeworfen",
    },
    "hidden-illegal": {
      position: "Ball wird während des Wurfs hinter Körper oder Arm verborgen — illegal gemäß ITTF-Regeln",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Falscher Unterschnitt",
      description: "Der Aufschläger imitiert eine schwere Unterschnitt-Bewegung, kontaktiert den Ball aber mit minimalem Schnitt oder Topspin. Der Gegner erwartet Rückwärtsrotation und schupft den Ball lang oder ins Netz.",
      counterplay: "Den Kontaktpunkt genau beobachten. Wenn der Schläger unter den Ball gleitet, ist es Unterschnitt. Wenn er die Rückseite streift, ist es wahrscheinlich ohne Rotation oder Topspin.",
    },
    "same-motion": {
      name: "Gleiche-Bewegung-Variation",
      description: "Mehrere Schnittarten werden aus einer identischen Aufschlagbewegung ausgeführt. Der Gegner kann nicht zwischen Unterschnitt-, Leerspin- und Seitschnitt-Variationen unterscheiden.",
      counterplay: "Konzentriere dich auf das Kontaktgeräusch und die Flugbahn des Balls statt auf die Armbewegung. Übe das Lesen der Flugkurve des Balls.",
    },
    "contact-hiding": {
      name: "Verbergen des Kontaktpunkts",
      description: "Der Aufschläger nutzt seine Körperposition oder den Armwinkel, um den genauen Moment und Winkel des Schläger-Ball-Kontakts zu verschleiern.",
      counterplay: "Positioniere dich so, dass du durch den Körperwinkel des Aufschlägers sehen kannst. Bitte den Schiedsrichter, die Sichtbarkeitsregeln durchzusetzen, wenn der Kontakt vollständig verdeckt ist.",
    },
    "wrist-snap": {
      name: "Falscher Handgelenkschlag",
      description: "Eine schnelle Handgelenkbewegung suggeriert schweren Schnitt, aber der Winkel der Schlägerfläche beim Kontakt erzeugt deutlich weniger Rotation als erwartet.",
      counterplay: "Reagiere nicht nur auf die Handgelenkgeschwindigkeit. Konzentriere dich auf das Verhalten des Balls unmittelbar nach dem Aufsprung.",
    },
    "speed-variation": {
      name: "Geschwindigkeitsvariation",
      description: "Abwechslung zwischen schnellen und langsamen Aufschlägen mit derselben Bewegung, um Timing und Beinarbeit des Gegners zu stören.",
      counterplay: "Bleibe aufmerksam mit einer neutralen Grundstellung. Lies die Ballgeschwindigkeit früh und passe deine Vorbereitung entsprechend an.",
    },
    "body-feint": {
      name: "Körpertäuschung",
      description: "Der Aufschläger nutzt Schulter-, Hüft- oder Kopfbewegungen, um eine andere Platzierung oder Schnittrichtung anzudeuten als tatsächlich ausgeführt wird.",
      counterplay: "Ignoriere die Körpersprache und konzentriere dich auf Schläger und Ball. Trainiere das Lesen des Schnitts anhand der Ballrotation statt der Körperbewegung des Aufschlägers.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Schwache Rückgabe Erzwingen",
      goal: "Den Gegner zu einer hohen oder langen Rückgabe zwingen, die beim Drittball angegriffen werden kann.",
    },
    "set-up-fh-attack": {
      name: "Vorhand-Angriff Vorbereiten",
      goal: "Den Aufschlag so platzieren, dass die Rückgabe auf die Vorhandseite kommt, für einen aggressiven Topspin oder Schmetterball.",
    },
    "prevent-flip": {
      name: "Flip Verhindern",
      goal: "Den Aufschlag kurz und niedrig halten, damit der Gegner ihn nicht flippen oder aggressiv angreifen kann.",
    },
    "force-push": {
      name: "Schupf Erzwingen",
      goal: "Schwerer Unterschnitt, der den Gegner zum Schupfen zwingt und dem Aufschläger die Initiative für den Drittball gibt.",
    },
    "target-elbow": {
      name: "Auf den Ellbogen Zielen",
      goal: "Auf den Ellbogen des Gegners (Umschaltpunkt) zielen, um Unentschlossenheit zwischen Vorhand und Rückhand zu erzeugen.",
    },
    "go-for-ace": {
      name: "Ass Anstreben",
      goal: "Ein risikoreicher Aufschlag, der darauf ausgelegt ist, den Punkt direkt durch Geschwindigkeit, Platzierung oder Täuschung zu gewinnen.",
    },
    "serve-plus-one-fh": {
      name: "Aufschlag+1 Vorhand",
      goal: "Aufschlagmuster, das so gestaltet ist, dass die erwartete Rückgabe aus vorbereiteter Position mit der Vorhand angegriffen werden kann.",
    },
    "serve-plus-one-bh": {
      name: "Aufschlag+1 Rückhand",
      goal: "Aufschlagmuster, das so gestaltet ist, dass die erwartete Rückgabe mit einem Rückhand-Schlag oder -Topspin angegriffen werden kann.",
    },
  },

  placements: {
    "fh-short": {
      label: "Vorhand Kurz",
    },
    "bh-short": {
      label: "Rückhand Kurz",
    },
    "fh-long": {
      label: "Vorhand Lang",
    },
    "bh-long": {
      label: "Rückhand Lang",
    },
    "middle-short": {
      label: "Mitte Kurz (Ellbogen)",
    },
    "middle-long": {
      label: "Mitte Lang (Ellbogen)",
    },
  },
};
