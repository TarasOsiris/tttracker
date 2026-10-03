/**
 * Italian translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

import type { DataTranslations } from "./es-data";

export const itData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Pendolo corto tagliato",
      description: "Il servizio di base per eccellenza. Corto e tagliato, con effetto laterale sinistro, verso il rovescio o il centro. Spesso induce una risposta in spinta e prepara l'attacco di terza palla.",
      contactPoint: "Colpisci la parte inferiore-posteriore della pallina con la racchetta aperta. Spazzola verso il basso e leggermente verso destra, lasciando oscillare il polso in modo naturale lungo l'arco del pendolo. Un contatto sottile massimizza il taglio, mentre l'accompagnamento laterale aggiunge effetto laterale.",
      returnAdvice: "Prendila presto, subito dopo il rimbalzo, con la racchetta aperta e una spinta corta e spazzolata per aggiungere taglio. Tienila corta oppure spingi lungo sul rovescio o sul gomito del battitore, mirando leggermente contro l'effetto laterale. Se la palla resta alta, un flip controllato è più sicuro che sollevarla.",
    },
    "pendulum-sidespin-long": {
      name: "Pendolo laterale lungo",
      description: "Pendolo veloce negli angoli con effetto laterale e taglio. La curva può rendere difficile una risposta di qualità e apre un'occasione di terza palla.",
      contactPoint: "Colpisci il lato posteriore-sinistro della pallina con la racchetta leggermente chiusa. Spazzola in avanti e di lato attraverso la pallina, con più velocità e un contatto più pieno rispetto alla versione corta. Il polso accelera durante il contatto per dare più ritmo.",
      returnAdvice: "Se arriva lunga, fai un passo indietro e gioca un topspin/drive controllato, alzando di più la traiettoria per compensare il taglio. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale e tieni la palla bassa. Se non puoi attaccare, una spinta veloce e carica di effetto è l'alternativa più sicura.",
    },
    "pendulum-no-spin": {
      name: "Pendolo senza effetto",
      description: "Sembra il pendolo tagliato, ma la pallina galleggia senza effetto. Chi risponde in spinta aspettandosi il taglio spesso alza la palla.",
      contactPoint: "Colpisci il centro-posteriore della pallina con la racchetta quasi piatta. La racchetta scivola dietro la pallina invece di spazzolarla sotto, con un contatto breve e pieno. Braccio e polso accompagnano come se producessero effetto, ma l'angolo piatto annulla la rotazione.",
      returnAdvice: "Metti il tuo effetto per controllare la palla: usa una spinta compatta o un flip/drive controllato con la racchetta leggermente chiusa. Evita il tocco morto, che tende a far alzare la palla. Tienila bassa e piazzala negli angoli.",
    },
    "pendulum-topspin": {
      name: "Pendolo in topspin",
      description: "Sembra tagliato, ma in realtà ha topspin. La pallina schizza in avanti al rimbalzo e sorprende chi prova a rispondere in spinta.",
      contactPoint: "Colpisci la parte posteriore-superiore della pallina con la racchetta leggermente chiusa. Spazzola verso l'alto e in avanti, prendendo la metà superiore della pallina. Il movimento a pendolo maschera la spazzolata verso l'alto: al contatto il polso ruota sopra la pallina per generare topspin, mentre il braccio prosegue di lato.",
      returnAdvice: "Non rispondere in spinta. Chiudi la racchetta e blocca o gioca un controtopspin in anticipo, prima che la palla schizzi. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale e tieni la palla bassa.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Pendolo inverso corto",
      description: "Servizio corto con effetto laterale destro e taglio. La curva opposta a quella del pendolo classico può essere difficile da leggere, soprattutto per chi è abituato ai servizi standard.",
      contactPoint: "Colpisci la parte inferiore-posteriore della pallina con la racchetta aperta. Spazzola verso il basso e verso sinistra (al contrario del pendolo classico), usando il movimento del dorso del polso. Al contatto la racchetta si muove da sinistra a destra davanti al corpo.",
      returnAdvice: "Prendila presto con la racchetta aperta e una spinta corta e spazzolata per aggiungere taglio. Mira leggermente al dritto del battitore per contrastare l'effetto laterale destro, tenendo la palla bassa. Se resta alta, un flip morbido è più sicuro che sollevarla.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Pendolo inverso lungo in topspin",
      description: "Servizio lungo con effetto laterale destro e topspin. La pallina curva verso la sinistra del battitore e schizza di lato al rimbalzo, rendendo difficile un attacco di qualità.",
      contactPoint: "Colpisci il lato posteriore-destro della pallina con la racchetta leggermente chiusa. Spazzola verso l'alto e verso sinistra attraverso la pallina. Il movimento a pendolo inverso genera l'effetto laterale destro, mentre la componente verso l'alto aggiunge topspin.",
      returnAdvice: "Chiudi la racchetta e blocca, gioca un drive o un controtopspin, prendendo la palla in anticipo. Mira leggermente al dritto del battitore per contrastare l'effetto laterale. Se giochi in topspin, spazzola sopra la pallina e tieni la traiettoria bassa.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk lungo",
      description: "Servizio lungo e aggressivo con forte effetto laterale destro e topspin. Dopo il rimbalzo la pallina schizza con decisione di lato e mette fretta all'avversario.",
      contactPoint: "Colpisci il lato posteriore-destro della pallina con la racchetta quasi verticale. Spazzola in avanti e bruscamente verso sinistra, con un gesto simile a un lancio. Al contatto il polso scatta verso l'esterno, generando un forte effetto laterale destro, con il topspin che nasce dall'arco ascendente del movimento.",
      returnAdvice: "Prendila presto con la racchetta chiusa e un blocco o un drive compatto. Mira leggermente al dritto del battitore per contrastare l'effetto laterale e tieni la palla bassa. Se hai tempo, un topspin controllato è l'opzione migliore.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk corto tagliato",
      description: "Un raro tomahawk corto e tagliato. Il movimento insolito, unito al piazzamento corto, lo rende molto difficile da leggere e da attaccare in risposta.",
      contactPoint: "Colpisci la parte inferiore della pallina con la racchetta aperta e inclinata di lato. Spazzola verso il basso e verso sinistra seguendo l'arco del tomahawk. Un contatto sottile sotto la pallina produce taglio, mentre il movimento laterale aggiunge effetto laterale. Uno scatto di polso più lento e morbido tiene la palla corta.",
      returnAdvice: "Usa la racchetta aperta e una spinta corta e spazzolata per tenerla bassa. Mira leggermente al dritto del battitore per contrastare l'effetto laterale. Tienila corta, a meno che tu non riesca a spingere lungo con un buon effetto.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Tomahawk inverso lungo",
      description: "Il servizio simbolo di Ding Ning. Parte identico a un tomahawk classico, ma all'ultimo istante passa al contatto di rovescio, producendo effetto laterale sinistro con topspin invece del previsto laterale destro. Per via del topspin la pallina scende rapidamente e, dopo il rimbalzo, schizza con forza dal lato opposto. Richiede una posizione molto bassa e un tempismo preciso. È più ingannevole se alternato ai tomahawk classici.",
      contactPoint: "Colpisci il lato posteriore-sinistro della pallina con la gomma di rovescio, tenendo la racchetta quasi verticale. Nell'ultima fase del movimento da tomahawk, ruota il polso verso l'interno per spazzolare in avanti e verso destra. Così la direzione dell'effetto laterale si inverte rispetto al tomahawk classico, producendo effetto laterale sinistro con topspin.",
      returnAdvice: "Chiudi la racchetta e prendi la palla in anticipo con un blocco compatto o un controtopspin. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale sinistro. Non rispondere in spinta: il topspin la manderebbe lunga. Se la direzione dell'effetto laterale non è chiara, mira al centro per ridurre il rischio.",
    },
    "backhand-backspin-short": {
      name: "Rovescio corto tagliato",
      description: "Un servizio di rovescio compatto con taglio puro, piazzato corto. Si esegue in fretta e ti lascia subito pronto per la palla successiva. Molto diffuso a ogni livello di gioco.",
      contactPoint: "Colpisci la parte inferiore della pallina con la racchetta aperta. Spazzola dritto verso il basso con un colpo di polso compatto, mantenendo il gesto corto e controllato. La racchetta avanza appena: quasi tutto il movimento è verso il basso, per ottenere un taglio puro.",
      returnAdvice: "Apri la racchetta e spazzola sotto la pallina con una spinta corta, prendendola presto. Tienila corta oppure spingi lungo negli angoli se vuoi allungare lo scambio. Pensa a tenere la palla bassa invece di sollevarla.",
    },
    "backhand-no-spin-long": {
      name: "Rovescio lungo veloce",
      description: "Un servizio di rovescio veloce negli angoli, con pochissimo effetto. La velocità pura sorprende l'avversario impreparato, soprattutto se alternato a servizi corti tagliati.",
      contactPoint: "Colpisci il centro-posteriore della pallina con la racchetta quasi piatta. Spingi attraverso la pallina con un colpo rapido e secco, senza spazzolare. Un contatto pieno e piatto massimizza la velocità e riduce al minimo l'effetto. Il braccio si distende completamente verso il bersaglio.",
      returnAdvice: "Prendila vicino al punto più alto del rimbalzo con un blocco compatto o un drive controllato, aggiungendo un po' di topspin per controllarla. Non limitarti a mettere la racchetta: sui servizi senza effetto devi metterci il tuo. Piazzala profonda negli angoli o sul gomito.",
    },
    "backhand-sidespin": {
      name: "Rovescio con effetto laterale",
      description: "Servizio di rovescio con effetto laterale destro e taglio. Il gesto compatto rende l'effetto difficile da leggere e il battitore è già in posizione per proseguire con il rovescio.",
      contactPoint: "Colpisci la parte inferiore-destra della pallina con la racchetta aperta. Spazzola verso il basso e verso sinistra attraverso la pallina con un movimento di polso compatto. L'effetto laterale nasce dal movimento laterale del polso, mentre la racchetta aperta genera il taglio.",
      returnAdvice: "Prendila presto con la racchetta aperta e una spinta corta e spazzolata per aggiungere taglio. Mira leggermente al dritto del battitore per contrastare l'effetto laterale. Se la palla si alza, un flip compatto funziona bene.",
    },
    "hook-heavy-side-short": {
      name: "Uncino corto con forte effetto laterale",
      description: "Un movimento a cucchiaio sotto la pallina che produce un effetto laterale estremo. Al rimbalzo la pallina salta di lato. Molto difficile da leggere per via dell'angolo insolito della racchetta.",
      contactPoint: "Colpisci il lato sinistro della pallina con la racchetta quasi orizzontale, raccogliendola da sotto e girandole attorno. Il movimento a uncino spazzola di lato lungo l'equatore della pallina. Il polso si piega bruscamente verso l'interno per massimizzare la componente laterale dell'effetto.",
      returnAdvice: "Inclina la racchetta per contrastare il forte effetto laterale e colpisci il fianco della pallina, non la parte posteriore. Un tocco morbido o un flip a banana è più sicuro di un colpo forte. Mira leggermente al rovescio del battitore e tieni la palla bassa.",
    },
    "hook-backspin-short": {
      name: "Uncino corto tagliato",
      description: "Servizio a uncino che unisce un forte effetto laterale al taglio. Le due componenti dell'effetto rendono molto difficile una risposta precisa.",
      contactPoint: "Colpisci la parte inferiore-sinistra della pallina con la racchetta aperta e inclinata di lato. Spazzola verso il basso e verso destra con un arco a cucchiaio, prendendo contemporaneamente il sotto e il fianco della pallina. Questa spazzolata su due angoli crea la combinazione di taglio ed effetto laterale.",
      returnAdvice: "Apri di più la racchetta e solleva con una spinta spazzolata per gestire il taglio forte. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale e tieni la palla bassa. Evita di colpire piatto.",
    },
    "hook-fast-long-topspin": {
      name: "Uncino lungo veloce",
      description: "Una variante aggressiva del servizio a uncino che combina effetto laterale destro e topspin, servita veloce e profonda. Il movimento a cucchiaio sembra produrre taglio, ma dopo il rimbalzo la pallina schizza in avanti con effetto laterale. È più efficace se alternato ai classici servizi a uncino tagliati, per massimizzare l'inganno.",
      contactPoint: "Colpisci il lato posteriore-destro della pallina con la racchetta leggermente chiusa. Spazzola in avanti e verso sinistra con un rapido arco a cucchiaio, prendendo la parte superiore-laterale della pallina. Il movimento a uncino maschera il contatto verso l'alto che genera il topspin, mentre l'accompagnamento laterale aggiunge effetto laterale destro.",
      returnAdvice: "Chiudi la racchetta e usa un blocco compatto o un controtopspin, prendendo la palla molto presto. Non rispondere in spinta: il topspin la manderebbe lunga. Inclina la racchetta leggermente verso sinistra per contrastare l'effetto laterale destro. Un topspin controllato al centro è l'opzione d'attacco più sicura.",
    },
    "high-toss-backspin": {
      name: "Lancio alto con taglio forte",
      description: "Il lancio alto dà più tempo ed energia per un effetto molto carico. Dopo il rimbalzo si può vedere la pallina girare all'indietro. Usato da molti giocatori di alto livello per forzare spinte deboli.",
      contactPoint: "Colpisci la parte più bassa della pallina con la racchetta molto aperta, mentre scende dal lancio alto. Spazzola bruscamente verso il basso, sfruttando l'energia della pallina in caduta per amplificare il taglio. Il polso scatta verso il basso nel punto più basso del movimento per ottenere il massimo effetto.",
      returnAdvice: "Usa la racchetta molto aperta e una spinta più lunga e spazzolata, alzando di più la traiettoria. Se arriva lunga, apri con un topspin controllato invece di colpire piatto. Nella risposta punta su molto taglio e poca altezza.",
    },
    "high-toss-sidespin": {
      name: "Lancio alto con effetto laterale",
      description: "Unisce il lancio alto a effetto laterale e taglio, per un effetto combinato molto carico. La pallina può curvare in modo marcato e frenare sul tavolo. Richiede un tempismo eccezionale.",
      contactPoint: "Colpisci la parte inferiore-sinistra della pallina con la racchetta aperta, mentre scende dal lancio alto. Spazzola verso il basso e verso destra con un arco a pendolo, prendendo sia il sotto sia il lato sinistro. L'energia della caduta, unita allo scatto del polso, produce un taglio fortissimo con effetto laterale sinistro.",
      returnAdvice: "Apri la racchetta e spazzola verso l'alto e leggermente contro l'effetto laterale. Mira leggermente al rovescio del battitore per contrastare la curva e tieni la palla bassa. Una spinta morbida e carica di effetto è più sicura di un colpo forte.",
    },
    "ghost-serve": {
      name: "Servizio fantasma",
      description: "Un leggendario servizio ultracorto tagliato, reso celebre da Ma Lin. La pallina supera appena la rete, rimbalza nel campo avversario e torna indietro verso la rete (a volte la scavalca persino). Richiede il massimo taglio, generato con un polso sciolto e un contatto sottile sulla parte inferiore della pallina.",
      contactPoint: "Colpisci la parte più bassa della pallina con la racchetta completamente aperta (quasi orizzontale). Spazzola bruscamente verso il basso con un tocco sottilissimo e radente: la racchetta sfiora appena la pallina. Un polso sciolto e rilassato è essenziale per generare il taglio massimo che fa tornare indietro la pallina.",
      returnAdvice: "Entra con il corpo e prendila subito dopo il rimbalzo con la racchetta molto aperta e un tocco delicato e spazzolato. Tienila corta oppure spingi lungo con molto taglio. Non aspettare, o la pallina tornerà indietro in rete.",
    },
    "fast-long-surprise-fh": {
      name: "Lungo veloce sul dritto",
      description: "Un servizio veloce e improvviso nell'angolo di dritto dell'avversario, con un contatto da topspin/drive. È più efficace se inserito dopo una serie di servizi corti. L'arma principale è la sorpresa.",
      contactPoint: "Colpisci la parte posteriore della pallina con la racchetta leggermente chiusa. Attraversa la pallina con un colpo rapido e piatto, spazzolando leggermente verso l'alto per aggiungere topspin. Conta più la velocità e la spinta in avanti che l'effetto: contatto pieno e rapida estensione del braccio.",
      returnAdvice: "Chiudi la racchetta e usa un blocco compatto o un controtopspin, prendendo la palla in anticipo. Non rispondere in spinta. Piazzala profonda sul rovescio o al centro per ridurre l'angolo.",
    },
    "fast-long-surprise-bh": {
      name: "Lungo veloce sul rovescio",
      description: "Servizio veloce nell'angolo di rovescio, con un contatto da topspin/drive. Efficace contro chi sta troppo vicino al tavolo o si è già preparato a ricevere un servizio corto.",
      contactPoint: "Colpisci la parte posteriore della pallina con la racchetta leggermente chiusa, dal lato del rovescio. Attraversa la pallina con un colpo rapido e compatto, spazzolando leggermente verso l'alto. L'impugnatura di rovescio chiude naturalmente la racchetta e aggiunge un po' di topspin alla traiettoria veloce e tesa.",
      returnAdvice: "Usa un blocco/drive di rovescio compatto con la racchetta leggermente chiusa. Prendila presto e tienila bassa. Piazzala profonda al centro o larga sul dritto per neutralizzare l'angolo.",
    },
    "pendulum-corkspin": {
      name: "Pendolo a cavatappi",
      description: "Un servizio a pendolo con asse di rotazione giroscopico, a cavatappi. In volo la pallina può ondeggiare e al rimbalzo diventa meno prevedibile, rendendo difficile una risposta pulita.",
      contactPoint: "Colpisci il lato posteriore-sinistro della pallina con la racchetta chiusa. Spazzola in avanti e attorno alla pallina con un movimento avvolgente, come se la racchetta la abbracciasse. Al contatto il polso scatta verso l'interno per creare l'asse giroscopico: l'effetto entra nella pallina invece di andare solo di lato o verso il basso.",
      returnAdvice: "Osserva il rimbalzo e prendila presto, con la racchetta in posizione neutra per assorbire l'ondeggiamento. Un blocco controllato o un topspin morbido al centro è l'opzione più sicura. Adattati dopo il primo scarto invece di forzare un angolo ampio.",
    },
    "backhand-elbow": {
      name: "Rovescio al gomito",
      description: "Un servizio di rovescio a velocità media diretto proprio al gomito dell'avversario. L'effetto laterale destro aggiunge curva e crea indecisione tra dritto e rovescio.",
      contactPoint: "Colpisci il lato posteriore-destro della pallina con la racchetta leggermente aperta, dalla posizione di rovescio. Spazzola di lato verso sinistra e leggermente verso il basso. L'effetto laterale nasce dal movimento laterale del polso, mentre la leggera inclinazione verso il basso aggiunge abbastanza taglio da tenere bassa la pallina.",
      returnAdvice: "Muovi i piedi e decidi presto; non allungarti col braccio. Se arriva lunga, gioca un topspin/drive controllato, alzando di più la traiettoria per compensare il taglio. Mira in profondità sul gomito o leggermente al dritto del battitore per contrastare l'effetto laterale.",
    },
    "high-toss-no-spin": {
      name: "Lancio alto senza effetto",
      description: "Imita da vicino il servizio a lancio alto con taglio forte, ma non porta alcun effetto. Chi si aspetta un taglio estremo può spingere la palla lunga o alta. Richiede grande sensibilità.",
      contactPoint: "Colpisci il centro-posteriore della pallina con la racchetta quasi piatta, anche se sembra aperta. La racchetta scende come per produrre un taglio forte, ma colpisce la pallina con il centro piatto della gomma invece di spazzolarla. Un contatto pieno e breve annulla l'effetto, mentre il braccio prosegue con un accompagnamento ingannevole.",
      returnAdvice: "Metti il tuo effetto per controllare la palla: usa un flip compatto o una spinta con la racchetta leggermente chiusa. Lasciala salire un po' e colpisci in modo pulito. Evita il tocco morto, che fa alzare la palla.",
    },
    "chop-backspin-short": {
      name: "Chop di dritto corto tagliato",
      description: "Il servizio più elementare del tennistavolo. Taglio puro senza effetto laterale, piazzato corto. È il servizio più sicuro per tenere la palla bassa e corta, e per l'avversario è molto difficile da attaccare. Una scelta ideale contro i topspinner aggressivi.",
      contactPoint: "Colpisci la parte inferiore della pallina con la racchetta molto aperta. Taglia dritto verso il basso con un colpo semplice e pulito. La racchetta spazzola sotto la pallina senza movimento laterale, producendo un taglio puro. Tieni il contatto sottile per il massimo effetto o un po' più pieno per controllare meglio il piazzamento.",
      returnAdvice: "Apri la racchetta e spazzola sotto la pallina con una spinta corta, prendendola presto. Tienila corta oppure spingi lungo con un buon taglio. Tieni la palla bassa invece di sollevarla.",
    },
    "chop-no-spin": {
      name: "Chop di dritto senza effetto",
      description: "Usa lo stesso movimento di chop della versione tagliata, ma colpisce la pallina con pochissimo effetto. Chi si aspetta un taglio forte spesso spinge la palla lunga o la alza, regalando una terza palla facile.",
      contactPoint: "Colpisci il centro-posteriore della pallina con la racchetta che sembra aperta ma in realtà è più verticale rispetto alla versione tagliata. Il movimento di chop prosegue, ma la racchetta scivola dietro la pallina invece che sotto, producendo pochissimo effetto. L'accompagnamento imita la versione tagliata per ingannare.",
      returnAdvice: "Metti il tuo effetto con una spinta compatta o un flip/drive controllato. Tieni la racchetta leggermente chiusa e la traiettoria bassa. Evita il tocco morto.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Tergicristallo laterale corto",
      description: "La racchetta spazza orizzontalmente la pallina, producendo effetto laterale sinistro con taglio. Lo stesso identico movimento può dare qualsiasi tipo di effetto a seconda del punto di contatto lungo l'arco, ed è quindi molto difficile da leggere. È più efficace se tenuto basso sopra la rete.",
      contactPoint: "Colpisci la parte inferiore-sinistra della pallina mentre la racchetta spazza da destra a sinistra con un arco orizzontale. Spazzola verso il basso e verso destra attraverso la pallina, prendendo il sotto a metà dell'arco del tergicristallo. La racchetta aperta e il punto di contatto basso combinano taglio ed effetto laterale sinistro.",
      returnAdvice: "Leggi il contatto e usa la racchetta aperta con una spinta corta e spazzolata. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale. Tienila bassa e corta, a meno che tu non riesca a spingere lungo con molto effetto.",
    },
    "windshield-wiper-topspin": {
      name: "Tergicristallo in topspin",
      description: "Stesso movimento a tergicristallo, ma il contatto avviene in un punto diverso dell'arco per produrre topspin invece di taglio. Chi lo legge come tagliato e risponde in spinta manda la palla lunga o alta.",
      contactPoint: "Colpisci la parte posteriore-superiore della pallina alla fine dell'arco del tergicristallo, non a metà. La racchetta prende la pallina più tardi nella sua traiettoria, quando il movimento va verso l'alto e in avanti. La racchetta leggermente chiusa spazzola sopra la pallina, generando topspin, mentre il movimento laterale aggiunge effetto laterale.",
      returnAdvice: "Non rispondere in spinta. Chiudi la racchetta e blocca o gioca un controtopspin in anticipo. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale e tieni la palla bassa.",
    },
    "hidden-serve": {
      name: "Servizio nascosto (irregolare)",
      description: "Un servizio in cui il punto di contatto viene nascosto di proposito dietro il corpo o il braccio libero. Era regolare prima della modifica delle regole sul servizio del 1° settembre 2002 e si vede ancora a volte a livello amatoriale.",
      contactPoint: "Il contatto varia: il battitore può produrre qualsiasi effetto, perché il contatto è nascosto. Di solito la pallina viene colpita nella parte inferiore-sinistra con la racchetta aperta, per un forte effetto laterale-tagliato, ma il mascheramento impedisce al ricevitore di vedere l'esatto angolo di contatto o la direzione della spazzolata.",
      returnAdvice: "Punta sul controllo: presumi un effetto laterale-tagliato e usa la racchetta aperta con una spinta bassa e carica di effetto. Mira leggermente contro l'effetto e tieni la palla bassa verso gli angoli. Se il contatto era nascosto, chiedi all'arbitro un'ammonizione.",
      legalityNotes: "Irregolare secondo le regole ITTF dal 1° settembre 2002. Dall'inizio del servizio fino al momento in cui viene colpita, la pallina non deve essere nascosta al ricevitore, e il braccio libero va tolto dallo spazio tra la pallina e la rete. Un servizio dubbio può essere sanzionato con un'ammonizione la prima volta; i successivi servizi dubbi possono costare un punto.",
    },
    "finger-spin-serve": {
      name: "Servizio con effetto delle dita (irregolare)",
      description: "Il battitore usa le dita per dare effetto alla pallina durante il lancio, invece di generarlo con la racchetta. Produce un effetto ingannevole con un movimento all'apparenza semplice.",
      contactPoint: "L'effetto nasce dalle dita durante il lancio, non dal contatto con la racchetta. Le dita fanno rotolare la pallina mentre la rilasciano, imprimendo taglio o effetto laterale prima ancora che la racchetta la tocchi. Il contatto con la racchetta può essere quasi piatto, così l'effetto sembra venire dal nulla.",
      returnAdvice: "Osserva la rotazione della pallina durante il lancio e adatta l'angolo della racchetta a quell'effetto. Usa la racchetta aperta e una spinta morbida e carica di effetto, oppure un topspin controllato se arriva lunga. Tieni bassa la risposta.",
      legalityNotes: "Irregolare. Il servizio deve iniziare con la pallina appoggiata liberamente sul palmo aperto, e il lancio deve essere quasi verticale, senza imprimere effetto. Dare effetto alla pallina con le dita durante il lancio viola questa regola.",
    },
  },

  motions: {
    pendulum: {
      name: "Pendolo",
      description: "Il servizio più comune nel tennistavolo. La racchetta oscilla come un pendolo da destra verso sinistra (per i destrimani), generando effetto laterale combinato con taglio o topspin. Molto versatile: dallo stesso movimento si ottengono numerose varianti di effetto.",
    },
    "reverse-pendulum": {
      name: "Pendolo inverso",
      description: "La racchetta oscilla da sinistra verso destra (per i destrimani), producendo un effetto laterale opposto a quello del pendolo classico. È meno comune, e per questo l'avversario fa più fatica a leggerlo.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Un servizio in cui la racchetta si muove verso l'esterno con un gesto simile al lancio di un tomahawk. Genera un forte effetto laterale e può essere combinato con il topspin per far schizzare la palla al rimbalzo. Diffuso nello stile di gioco asiatico. Nota: la classificazione varia, perché la scuola cinese lo considera di solito un servizio di dritto (il contatto avviene con la gomma di dritto), mentre alcuni allenatori occidentali lo classificano come rovescio in base alla posizione del corpo.",
    },
    "reverse-tomahawk": {
      name: "Tomahawk inverso",
      description: "Inizia con lo stesso gesto verso l'esterno di un tomahawk classico, ma all'ultimo istante la pallina viene colpita con il lato di rovescio della racchetta, producendo effetto laterale sinistro invece che destro. Il movimento iniziale identico lo rende estremamente ingannevole. Reso celebre da Ding Ning e usato anche da Kenta Matsudaira.",
    },
    backhand: {
      name: "Servizio di rovescio",
      description: "Un servizio compatto eseguito dal lato del rovescio. Permette di passare rapidamente alla palla successiva ed è ingannevole per natura grazie alla posizione del polso. Usato con efficacia da molti giocatori europei.",
    },
    "hook-shovel": {
      name: "Uncino / paletta",
      description: "Un servizio non convenzionale in cui la racchetta raccoglie la pallina da sotto con un movimento a uncino. Produce un forte effetto laterale combinato al taglio. Il punto di contatto insolito lo rende molto difficile da leggere.",
    },
    chop: {
      name: "Chop di dritto",
      description: "Un semplice movimento di taglio verso il basso con la racchetta aperta, che produce un taglio puro senza effetto laterale. Il servizio più elementare del tennistavolo: facile da imparare, facile da tenere corto ed efficace per evitare risposte aggressive. Spesso è il primo servizio insegnato ai principianti.",
    },
    "windshield-wiper": {
      name: "Tergicristallo",
      description: "La racchetta spazza orizzontalmente con un arco simile a quello di un tergicristallo, spazzolando la parte posteriore della pallina. A seconda del punto dell'arco in cui avviene il contatto, lo stesso movimento può produrre effetto laterale, topspin o taglio. Il gesto identico, qualunque sia l'effetto, lo rende molto ingannevole. Per eseguirlo bene serve una posizione larga e bassa.",
    },
    "high-toss": {
      name: "Pendolo con lancio alto",
      description: "Un servizio a pendolo con un lancio di palla alto (di solito 2-5 metri). La maggiore altezza di caduta aggiunge energia e aumenta il potenziale di effetto. Richiede un tempismo eccellente, ma produce un effetto eccezionalmente carico.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Taglio puro",
      description: "Un taglio pulito che fa scivolare la pallina bassa e frenare nel campo avversario. Se si risponde in spinta senza compensare, la palla tende a finire in rete.",
    },
    "heavy-backspin": {
      name: "Taglio forte",
      description: "Taglio massimo. La pallina fa presa sul tavolo e può addirittura tornare indietro verso la rete. Estremamente difficile da attaccare con un flip o un topspin aggressivo.",
    },
    "pure-topspin": {
      name: "Topspin puro",
      description: "Rotazione in avanti che fa schizzare la pallina in avanti dopo il rimbalzo. Spesso usato nei servizi lunghi e veloci per mettere fretta all'avversario.",
    },
    "left-side-backspin": {
      name: "Laterale sinistro + taglio",
      description: "La combinazione classica del pendolo. Dal punto di vista del battitore la pallina curva verso destra e rimbalza con taglio. Molto comune nel gioco agonistico.",
    },
    "right-side-backspin": {
      name: "Laterale destro + taglio",
      description: "La combinazione tipica del pendolo inverso o del tomahawk. Dal punto di vista del battitore la pallina curva verso sinistra. È meno comune, quindi l'avversario fa più fatica a leggerla.",
    },
    "left-side-topspin": {
      name: "Laterale sinistro + topspin",
      description: "Una combinazione ingannevole: la pallina sembra tagliata, ma schizza in avanti. Serve a sorprendere l'avversario quando si aspetta il taglio.",
    },
    "right-side-topspin": {
      name: "Laterale destro + topspin",
      description: "Combinazione in stile tomahawk che fa schizzare la palla con decisione di lato al rimbalzo. Efficace per preparare l'attacco di dritto.",
    },
    "no-spin": {
      name: "Palla morta senza effetto",
      description: "Una palla morta, con rotazione minima. Imita il movimento di un servizio con effetto, ma la pallina galleggia. Chi si aspetta l'effetto sbaglierà completamente la lettura.",
    },
    "pure-left-sidespin": {
      name: "Laterale sinistro puro",
      description: "Forte rotazione laterale senza una componente significativa di topspin o di taglio. La pallina curva in modo marcato in aria e schizza di lato al rimbalzo.",
    },
    "pure-right-sidespin": {
      name: "Laterale destro puro",
      description: "Forte rotazione laterale in direzione opposta. Efficace con i movimenti a pendolo inverso e tomahawk.",
    },
    "light-backspin": {
      name: "Taglio leggero",
      description: "Un taglio appena accennato, difficile da distinguere da una palla senza effetto. La pallina galleggia un po' più a lungo di una palla morta e lascia l'avversario indeciso tra spinta e flip.",
    },
    "heavy-left-side-backspin": {
      name: "Laterale sinistro forte + taglio",
      description: "L'effetto combinato massimo ottenibile con il pendolo. La pallina curva, scende e frena in modo aggressivo. Il servizio simbolo di molti giocatori d'élite.",
    },
    corkspin: {
      name: "Effetto a cavatappi",
      description: "Un asse di rotazione giroscopico che rende il rimbalzo imprevedibile. La pallina sembra ondeggiare e cambiare direzione in volo.",
    },
  },

  bounces: {
    "short-low": {
      label: "Corto (2° rimbalzo sul tavolo)",
      secondBouncePosition: "Sul tavolo, vicino alla rete",
    },
    "short-medium": {
      label: "Corto (2° rimbalzo vicino alla linea di fondo)",
      secondBouncePosition: "Vicino alla linea di fondo del tavolo",
    },
    "half-long": {
      label: "Semilungo",
      secondBouncePosition: "Proprio sulla linea di fondo: lunghezza ambigua",
    },
    "long-medium": {
      label: "Lungo (profondo)",
      secondBouncePosition: "Cadrebbe ben oltre il tavolo",
    },
    "long-high": {
      label: "Lungo (veloce e profondo)",
      secondBouncePosition: "Molto oltre il tavolo",
    },
    "deep-long": {
      label: "Lungo profondo (linea di fondo)",
      secondBouncePosition: "Proprio sulla linea di fondo dell'avversario. Pur essendo lungo, un servizio profondo ben piazzato toglie spazio all'avversario e rende difficile un attacco di qualità.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Massimizza il potenziale di effetto. Lascia al battitore più tempo per prepararsi alla palla successiva.",
    },
    medium: {
      tacticalNote: "Bilancia effetto e velocità. Riduce il tempo di reazione dell'avversario senza perdere il controllo.",
    },
    fast: {
      tacticalNote: "Mette fretta all'avversario. Sacrifica l'effetto in favore della velocità pura per forzare una risposta debole o fare direttamente punto.",
    },
  },

  trajectories: {
    flat: {
      netClearance: "Appena sopra la rete (1-3 cm)",
    },
    "low-arc": {
      netClearance: "Arco basso sopra la rete (5-15 cm)",
    },
    "high-arc": {
      netClearance: "Arco alto sopra la rete (oltre 20 cm)",
    },
  },

  tosses: {
    "low-legal": {
      position: "Palmo aperto, pallina visibile, lanciata verso l'alto di circa 16 cm",
    },
    "medium-legal": {
      position: "Palmo aperto, pallina visibile, lanciata verso l'alto di circa 30-50 cm",
    },
    "high-legal": {
      position: "Palmo aperto, pallina visibile, lanciata verso l'alto di 2-5 metri",
    },
    "hidden-illegal": {
      position: "Pallina nascosta dietro il corpo o il braccio durante il lancio: irregolare secondo le regole ITTF",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Finto taglio",
      description: "Il battitore simula un movimento da taglio forte, ma colpisce la pallina con pochissimo effetto o con topspin. L'avversario si aspetta il taglio e spinge la palla lunga o in rete.",
      counterplay: "Osserva con attenzione il punto di contatto. Se la racchetta scivola sotto la pallina, è taglio. Se spazzola la parte posteriore, probabilmente è senza effetto o in topspin.",
    },
    "same-motion": {
      name: "Variazioni con lo stesso movimento",
      description: "Effetti diversi eseguiti con un movimento di servizio identico. L'avversario non riesce a distinguere tra taglio, senza effetto ed effetto laterale.",
      counterplay: "Concentrati sul rumore del contatto e sulla traiettoria della pallina, non sul movimento del braccio. Allenati a leggere il volo della pallina.",
    },
    "contact-hiding": {
      name: "Mascheramento del contatto",
      description: "Il battitore sfrutta la posizione del corpo o l'angolo del braccio per nascondere il momento e l'angolo esatti del contatto tra racchetta e pallina.",
      counterplay: "Posizionati in modo da vedere oltre l'angolazione del corpo del battitore. Se il contatto è completamente nascosto, chiedi all'arbitro di far rispettare le regole sulla visibilità.",
    },
    "wrist-snap": {
      name: "Finto colpo di polso",
      description: "Un rapido colpo di polso fa pensare a un effetto molto carico, ma l'angolo della racchetta al contatto produce molto meno effetto del previsto.",
      counterplay: "Non reagire solo alla velocità del polso. Concentrati sul comportamento della pallina subito dopo il rimbalzo.",
    },
    "speed-variation": {
      name: "Variazione di velocità",
      description: "Alternare servizi veloci e lenti con lo stesso movimento per rompere il tempo di gioco e gli spostamenti dell'avversario.",
      counterplay: "Resta sulle punte in una posizione di attesa neutra. Leggi presto la velocità della pallina e adatta di conseguenza la preparazione del colpo.",
    },
    "body-feint": {
      name: "Finta con il corpo",
      description: "Il battitore usa spalle, fianchi o testa per suggerire un piazzamento o una direzione dell'effetto diversi da quelli reali.",
      counterplay: "Ignora il linguaggio del corpo e concentrati su racchetta e pallina. Allenati a leggere l'effetto dalla rotazione della pallina, non dai movimenti del battitore.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Forzare una risposta debole",
      goal: "Indurre l'avversario a una risposta alta o lunga da attaccare sulla terza palla.",
    },
    "set-up-fh-attack": {
      name: "Preparare l'attacco di dritto",
      goal: "Piazzare il servizio in modo che la risposta arrivi sul dritto, per un topspin aggressivo o una schiacciata.",
    },
    "prevent-flip": {
      name: "Impedire il flip",
      goal: "Tenere il servizio così corto e basso che l'avversario non possa giocare un flip o attaccare con decisione.",
    },
    "force-push": {
      name: "Forzare la spinta",
      goal: "Un taglio forte che costringe l'avversario a rispondere in spinta, lasciando al battitore l'iniziativa sulla terza palla.",
    },
    "target-elbow": {
      name: "Mirare al gomito",
      goal: "Mirare al gomito dell'avversario (il punto di passaggio tra dritto e rovescio) per creare indecisione.",
    },
    "go-for-ace": {
      name: "Cercare il punto diretto",
      goal: "Un servizio ad alto rischio pensato per vincere direttamente il punto con velocità, piazzamento o inganno.",
    },
    "serve-plus-one-fh": {
      name: "Servizio+1 di dritto",
      goal: "Schema di servizio pensato perché la risposta prevista si possa attaccare di dritto da una posizione già preparata.",
    },
    "serve-plus-one-bh": {
      name: "Servizio+1 di rovescio",
      goal: "Schema di servizio pensato perché la risposta prevista si possa attaccare con un colpo secco o un topspin di rovescio.",
    },
  },

  placements: {
    "fh-short": {
      label: "Dritto corto",
    },
    "bh-short": {
      label: "Rovescio corto",
    },
    "fh-long": {
      label: "Dritto lungo",
    },
    "bh-long": {
      label: "Rovescio lungo",
    },
    "middle-short": {
      label: "Centro corto (gomito)",
    },
    "middle-long": {
      label: "Centro lungo (gomito)",
    },
  },
};
