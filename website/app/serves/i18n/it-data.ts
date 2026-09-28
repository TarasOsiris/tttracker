/**
 * Italian translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

import type { DataTranslations } from "./es-data";

export const itData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Pendolo Backspin Corto",
      description: "Il servizio più classico. Backspin corto con effetto laterale sinistro verso il rovescio o il centro. Spesso provoca una risposta in spinta e prepara l'attacco di terza palla.",
      contactPoint: "Colpisci la parte inferiore-posteriore della pallina con la racchetta aperta. Spazzola verso il basso e leggermente a destra, lasciando che il polso oscilli naturalmente lungo l'arco del pendolo. Un contatto sottile massimizza il backspin mentre l'accompagnamento laterale aggiunge effetto laterale.",
      returnAdvice: "Prendila presto dopo il rimbalzo con la racchetta aperta e una spinta corta e spazzolata per aggiungere backspin. Tienila corta oppure spingi lunga sul rovescio o sul gomito del battitore, mirando leggermente contro l'effetto laterale. Se resta alta, un flip controllato è più sicuro che alzarla.",
    },
    "pendulum-sidespin-long": {
      name: "Pendolo Laterale Lungo",
      description: "Pendolo veloce agli angoli con effetto laterale e backspin. La traiettoria curva può rendere difficile una risposta di qualità, preparando un'occasione di terza palla.",
      contactPoint: "Colpisci il lato posteriore-sinistro della pallina con la racchetta leggermente chiusa. Spazzola in avanti e lateralmente attraverso la pallina con più velocità e un contatto più spesso rispetto alla versione corta. Il polso accelera durante il contatto per aggiungere ritmo.",
      returnAdvice: "Se arriva lunga, arretra e usa un topspin/drive controllato con più elevazione per compensare il backspin. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale e tenere la pallina bassa. Una spinta veloce e con effetto è l'opzione più sicura se non puoi attaccare.",
    },
    "pendulum-no-spin": {
      name: "Pendolo Senza Effetto",
      description: "Sembra il pendolo con backspin ma la pallina galleggia senza effetto. Gli avversari che spingono aspettandosi backspin spesso alzano la pallina.",
      contactPoint: "Colpisci il centro-posteriore della pallina con la faccia della racchetta quasi piatta. La racchetta scivola dietro la pallina invece di spazzolare sotto di essa, producendo solo un contatto breve e spesso. Il braccio e il polso continuano come se producessero effetto, ma l'angolo piatto elimina la rotazione.",
      returnAdvice: "Aggiungi il tuo effetto per controllare la palla: usa una spinta compatta o un flip/drive controllato con la racchetta leggermente chiusa. Evita il tocco morto, che tende ad alzare la pallina. Tienila bassa e piazzala agli angoli.",
    },
    "pendulum-topspin": {
      name: "Pendolo Topspin",
      description: "Camuffato da backspin ma in realtà ha topspin. La pallina scatta in avanti al rimbalzo, sorprendendo gli avversari che cercano di spingerla indietro.",
      contactPoint: "Colpisci la parte posteriore-superiore della pallina con la racchetta leggermente chiusa. Spazzola verso l'alto e in avanti attraverso la pallina, colpendo la metà superiore. Il movimento a pendolo camuffa la spazzolata ascendente — il polso ruota sopra la pallina al contatto per generare topspin mentre il braccio continua lateralmente.",
      returnAdvice: "Non spingere. Chiudi la racchetta e blocca o contro-topspina in anticipo prima dello scatto. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale e tieni la pallina bassa.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Pendolo Inverso Corto",
      description: "Servizio corto con effetto laterale destro e backspin. La curva opposta al pendolo normale può essere difficile da leggere, specialmente per avversari abituati ai servizi standard.",
      contactPoint: "Colpisci la parte inferiore-posteriore della pallina con la racchetta aperta. Spazzola verso il basso e verso sinistra (opposto al pendolo normale), usando il movimento del dorso del polso. La racchetta si muove da sinistra a destra attraversando il corpo al momento del contatto.",
      returnAdvice: "Prendila presto con la racchetta aperta e una spinta corta e spazzolata per aggiungere backspin. Mira leggermente al dritto del battitore per contrastare l'effetto laterale destro, tenendola bassa. Se resta alta, un flip morbido è più sicuro che alzarla.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Pendolo Inverso Topspin Lungo",
      description: "Servizio lungo con effetto laterale destro e topspin. La pallina curva verso il rovescio del battitore e scatta lateralmente al rimbalzo, rendendo difficile un attacco di qualità.",
      contactPoint: "Colpisci il lato posteriore-destro della pallina con la racchetta leggermente chiusa. Spazzola verso l'alto e verso sinistra attraverso la pallina. Il movimento del pendolo inverso genera effetto laterale destro mentre la componente ascendente aggiunge topspin.",
      returnAdvice: "Chiudi la racchetta e blocca, colpisci con drive o contro-topspina, prendendola in anticipo. Mira leggermente al dritto del battitore per contrastare l'effetto laterale. Se fai un loop, spazzola sopra la pallina e mantieni un arco basso.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk Lungo",
      description: "Servizio lungo aggressivo con forte effetto laterale destro e topspin. La pallina scatta con forza di lato dopo il rimbalzo e mette fretta all'avversario.",
      contactPoint: "Colpisci il lato posteriore-destro della pallina con la faccia della racchetta quasi verticale. Spazzola in avanti e bruscamente verso sinistra in un movimento simile a un lancio. Il polso scatta verso l'esterno al contatto, generando un potente effetto laterale destro con topspin grazie all'arco ascendente dello swing.",
      returnAdvice: "Prendila presto con la racchetta chiusa e un blocco o drive compatto. Mira leggermente al dritto del battitore per contrastare l'effetto laterale e tieni la pallina bassa. Se hai tempo, un topspin controllato è l'opzione migliore.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk Backspin Corto",
      description: "Un raro tomahawk corto con backspin. Il movimento insolito combinato con il piazzamento corto lo rende molto difficile da leggere e da rispondere aggressivamente per gli avversari.",
      contactPoint: "Colpisci la parte inferiore della pallina con la faccia della racchetta aperta e inclinata lateralmente. Spazzola verso il basso e verso sinistra nell'arco del tomahawk. Un contatto sottile sotto la pallina produce backspin mentre il movimento laterale aggiunge effetto laterale. Uno scatto di polso più lento e morbido tiene la pallina corta.",
      returnAdvice: "Usa la racchetta aperta e una spinta corta e spazzolata per tenerla bassa. Mira leggermente al dritto del battitore per contrastare l'effetto laterale. Tienila corta a meno che tu non possa spingere lunga con buon effetto.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Tomahawk Inverso Lungo",
      description: "Il servizio caratteristico di Ding Ning. Inizia in modo identico a un tomahawk normale ma passa al contatto di rovescio all'ultimo istante, producendo effetto laterale sinistro con topspin invece del previsto effetto laterale destro. La pallina scende rapidamente per il topspin e scatta con forza sul lato opposto dopo il rimbalzo. Richiede una posizione bassa e un tempismo preciso. Più ingannevole se alternato a servizi tomahawk normali.",
      contactPoint: "Colpisci il lato posteriore-sinistro della pallina usando la gomma di rovescio, con la faccia della racchetta quasi verticale. All'ultimo momento dello swing da tomahawk, gira il polso verso l'interno per spazzolare in avanti e verso destra. Questo inverte la direzione dell'effetto laterale rispetto al tomahawk normale, producendo effetto laterale sinistro con topspin.",
      returnAdvice: "Chiudi la racchetta e prendila in anticipo con un blocco compatto o contro-topspin. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale sinistro. Non spingere — il topspin la manderebbe lunga. Se la direzione dell'effetto laterale non è chiara, mira al centro per ridurre il rischio.",
    },
    "backhand-backspin-short": {
      name: "Rovescio Backspin Corto",
      description: "Un servizio compatto di rovescio con backspin puro, piazzato corto. Rapido da eseguire e permette di prepararsi subito alla palla successiva. Comune a molti livelli di gioco.",
      contactPoint: "Colpisci la parte inferiore della pallina con la faccia della racchetta aperta. Spazzola dritto verso il basso con uno scatto di polso compatto, mantenendo il colpo corto e controllato. La racchetta si muove appena in avanti — quasi tutto il movimento è verso il basso per creare backspin puro.",
      returnAdvice: "Apri la racchetta e spazzola sotto la pallina con una spinta corta, colpendo presto. Tienila corta oppure spingi lunga agli angoli se vuoi allungare lo scambio. Concentrati sul tenerla bassa piuttosto che alzarla.",
    },
    "backhand-no-spin-long": {
      name: "Rovescio Veloce Lungo",
      description: "Un servizio di rovescio veloce agli angoli con effetto minimo. La pura velocità sorprende gli avversari impreparati, specialmente se alternato a servizi corti con backspin.",
      contactPoint: "Colpisci il centro-posteriore della pallina con la faccia della racchetta quasi piatta. Spingi attraverso la pallina con un colpo rapido e secco invece di spazzolare. Un contatto spesso e piatto massimizza la velocità riducendo al minimo l'effetto. Il braccio si estende completamente verso il bersaglio.",
      returnAdvice: "Prendila vicino al punto più alto del rimbalzo con un blocco compatto o un drive controllato, aggiungendo un po' di topspin. Non limitarti a mettere la racchetta; i servizi senza effetto richiedono il tuo effetto. Piazzala profonda agli angoli o al gomito.",
    },
    "backhand-sidespin": {
      name: "Rovescio Laterale",
      description: "Servizio di rovescio con effetto laterale destro e backspin. Il movimento compatto rende l'effetto difficile da leggere, e il battitore è già in posizione per proseguire con il rovescio.",
      contactPoint: "Colpisci la parte inferiore-destra della pallina con la racchetta aperta. Spazzola verso il basso e verso sinistra attraverso la pallina con un movimento compatto del polso. L'effetto laterale deriva dal movimento laterale del polso mentre la faccia aperta genera backspin.",
      returnAdvice: "Prendila presto con la racchetta aperta e una spinta corta e spazzolata per aggiungere backspin. Mira leggermente al dritto del battitore per contrastare l'effetto laterale. Se sale, un flip compatto funziona bene.",
    },
    "hook-heavy-side-short": {
      name: "Gancio Laterale Pesante Corto",
      description: "Un movimento a cucchiaio sotto la pallina che produce un effetto laterale estremo. La pallina scatta lateralmente al rimbalzo. Molto difficile da leggere per l'angolo insolito della racchetta.",
      contactPoint: "Colpisci il lato sinistro della pallina con la faccia della racchetta quasi orizzontale, raccogliendo da sotto e intorno. Il movimento a gancio spazzola lateralmente lungo l'equatore della pallina. Il polso si curva bruscamente verso l'interno per massimizzare la componente di effetto laterale.",
      returnAdvice: "Regola l'angolo per contrastare il forte effetto laterale e colpisci il fianco della pallina, non la parte posteriore. Un tocco morbido o un flip a banana è più sicuro di un colpo forte. Mira leggermente al rovescio del battitore e tienila bassa.",
    },
    "hook-backspin-short": {
      name: "Gancio Backspin Corto",
      description: "Servizio a gancio con effetto laterale pesante combinato a backspin. Le due componenti di effetto rendono molto difficile una risposta precisa.",
      contactPoint: "Colpisci la parte inferiore-sinistra della pallina con la faccia della racchetta aperta e inclinata lateralmente. Spazzola verso il basso e verso destra in un arco a cucchiaio, colpendo simultaneamente la parte inferiore e il fianco della pallina. Questa spazzolata a doppio angolo crea la combinazione di backspin ed effetto laterale.",
      returnAdvice: "Apri di più la racchetta e alza con una spinta spazzolata per gestire il backspin pesante. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale e tienila bassa. Evita di colpire piatto.",
    },
    "hook-fast-long-topspin": {
      name: "Gancio Veloce Lungo",
      description: "Una variante aggressiva del servizio a gancio che combina effetto laterale destro e topspin, servito veloce e profondo. Il movimento a cucchiaio sembra produrre backspin, ma la pallina scatta in avanti con effetto laterale dopo il rimbalzo. Più efficace se alternato ai servizi a gancio tradizionali con backspin per massimizzare l'inganno.",
      contactPoint: "Colpisci il lato posteriore-destro della pallina con la faccia della racchetta leggermente chiusa. Spazzola in avanti e verso sinistra in un rapido arco a cucchiaio, colpendo la parte superiore-laterale della pallina. Il movimento a gancio camuffa il contatto ascendente che genera topspin, mentre l'accompagnamento laterale aggiunge effetto laterale destro.",
      returnAdvice: "Chiudi la racchetta e usa un blocco compatto o contro-topspin, prendendola molto presto. Non spingere — il topspin manderebbe la pallina lunga. Inclina la racchetta leggermente a sinistra per contrastare l'effetto laterale destro. Un loop di topspin controllato al centro è l'opzione d'attacco più sicura.",
    },
    "high-toss-backspin": {
      name: "Lancio Alto Backspin Pesante",
      description: "Il lancio alto può aggiungere tempo ed energia per un effetto pesante. La pallina può girare visibilmente all'indietro dopo il rimbalzo. Usato da molti giocatori di alto livello per forzare spinte deboli.",
      contactPoint: "Colpisci la parte più bassa della pallina con la faccia della racchetta molto aperta mentre scende dal lancio alto. Spazzola bruscamente verso il basso, usando l'energia gravitazionale della pallina in caduta per amplificare il backspin. Il polso scatta verso il basso nel punto più basso dello swing per il massimo effetto.",
      returnAdvice: "Usa la racchetta molto aperta e una spinta più lunga e spazzolata con extra elevazione. Se arriva lunga, apri con un loop controllato invece di un colpo piatto. Dai priorità a molto backspin e poca altezza.",
    },
    "high-toss-sidespin": {
      name: "Lancio Alto Laterale",
      description: "Combina il lancio alto con effetto laterale e backspin per un effetto combinato pesante. La pallina può curvare in modo drammatico e frenare sul tavolo. Richiede un tempismo eccezionale.",
      contactPoint: "Colpisci la parte inferiore-sinistra della pallina con la racchetta aperta mentre scende dal lancio alto. Spazzola verso il basso e verso destra in un arco a pendolo, colpendo sia la parte inferiore sia il lato sinistro. L'energia gravitazionale combinata allo scatto di polso produce un backspin estremamente pesante con effetto laterale sinistro.",
      returnAdvice: "Apri la racchetta e spazzola verso l'alto e leggermente contro l'effetto laterale. Mira leggermente al rovescio del battitore per contrastare la curva e tieni la pallina bassa. Una spinta morbida e con effetto è più sicura di un colpo forte.",
    },
    "ghost-serve": {
      name: "Servizio Fantasma",
      description: "Un servizio ultra-corto con backspin che supera appena la rete e rimbalza due volte (o più) sul lato dell'avversario. La pallina può letteralmente rotolare indietro verso la rete. Un favorito del pubblico negli eventi professionistici.",
      contactPoint: "Colpisci la parte più bassa della pallina con la faccia della racchetta completamente aperta (quasi orizzontale). Spazzola bruscamente verso il basso con un tocco estremamente sottile e radente — la racchetta sfiora appena la pallina. Un polso sciolto e rilassato è essenziale per generare il massimo backspin che fa tornare indietro la pallina.",
      returnAdvice: "Entra e prendila subito dopo il rimbalzo con la racchetta molto aperta e un tocco delicato e spazzolato. Tienila corta oppure spingi in profondità con molto backspin. Non aspettare o tornerà verso la rete.",
    },
    "fast-long-surprise-fh": {
      name: "Veloce Lungo al Dritto",
      description: "Un servizio improvvisamente veloce all'angolo di dritto dell'avversario con un contatto simile a topspin/drive. Più efficace se alternato dopo una serie di servizi corti. L'elemento sorpresa è l'arma principale.",
      contactPoint: "Colpisci la parte posteriore della pallina con la faccia della racchetta leggermente chiusa. Colpisci attraverso la pallina con un colpo rapido e piatto, spazzolando leggermente verso l'alto per aggiungere topspin. L'attenzione è sulla velocità e sull'energia in avanti più che sull'effetto — contatto spesso con una rapida estensione del braccio.",
      returnAdvice: "Chiudi la racchetta e usa un blocco compatto o contro-topspin, prendendola in anticipo. Non spingere. Piazzala profonda al rovescio o al centro per ridurre l'angolo.",
    },
    "fast-long-surprise-bh": {
      name: "Veloce Lungo al Rovescio",
      description: "Servizio veloce diretto all'angolo di rovescio con un contatto simile a topspin/drive. Efficace contro avversari troppo vicini al tavolo o che si sono già impegnati a ricevere corto.",
      contactPoint: "Colpisci la parte posteriore della pallina con la faccia della racchetta leggermente chiusa dal lato di rovescio. Colpisci attraverso la pallina con un colpo rapido e compatto, spazzolando leggermente verso l'alto. L'impugnatura di rovescio chiude naturalmente la racchetta, aggiungendo un tocco di topspin alla traiettoria veloce e piatta.",
      returnAdvice: "Usa un blocco/drive di rovescio compatto con la racchetta leggermente chiusa. Prendila presto e tienila bassa. Piazzala profonda al centro o aperta sul dritto per neutralizzare l'angolo.",
    },
    "pendulum-corkspin": {
      name: "Pendolo a Cavatappi",
      description: "Un servizio a pendolo con un asse di rotazione giroscopico a cavatappi. La pallina può oscillare in volo e rimbalzare in modo meno prevedibile, rendendo difficili risposte pulite.",
      contactPoint: "Colpisci il lato posteriore-sinistro della pallina con la racchetta chiusa. Spazzola in avanti e intorno alla pallina con un movimento avvolgente, come se la racchetta la circondasse. Il polso scatta verso l'interno al contatto per creare l'asse giroscopico — l'effetto entra nella pallina invece di andare puramente lateralmente o verso il basso.",
      returnAdvice: "Osserva il rimbalzo e colpisci presto, usando un angolo neutro della racchetta per assorbire l'oscillazione. Un blocco controllato o un rullaggio al centro è l'opzione più sicura. Adatta la risposta dopo il primo scatto invece di forzare un angolo ampio.",
    },
    "backhand-elbow": {
      name: "Rovescio al Gomito",
      description: "Un servizio di rovescio a velocità media diretto direttamente al gomito dell'avversario. L'effetto laterale destro aggiunge curva, creando indecisione tra usare il dritto o il rovescio.",
      contactPoint: "Colpisci il lato posteriore-destro della pallina con la faccia della racchetta leggermente aperta dalla posizione di rovescio. Spazzola lateralmente verso sinistra e leggermente verso il basso. L'effetto laterale deriva dal movimento laterale del polso, mentre il leggero angolo discendente aggiunge abbastanza backspin da tenere bassa la pallina.",
      returnAdvice: "Muovi i piedi e decidi presto; non allungarti. Se arriva lunga, usa un topspin/drive controllato con extra elevazione per compensare il backspin. Mira in profondità al gomito o leggermente al dritto del battitore per contrastare l'effetto laterale.",
    },
    "high-toss-no-spin": {
      name: "Lancio Alto Senza Effetto",
      description: "Imita da vicino il servizio a lancio alto con backspin pesante ma non porta alcun effetto. Gli avversari che si aspettano un backspin estremo possono spingere la pallina lunga o alta. Richiede grande sensibilità.",
      contactPoint: "Colpisci il centro-posteriore della pallina con la faccia della racchetta quasi piatta nonostante l'aspetto aperto. La racchetta si muove verso il basso come se producesse backspin pesante ma colpisce la pallina con il centro piatto della gomma invece di spazzolare. Un contatto spesso e breve elimina l'effetto mentre il braccio continua con un accompagnamento ingannevole.",
      returnAdvice: "Aggiungi il tuo effetto per controllare: usa un flip compatto o una spinta con la racchetta leggermente chiusa. Lasciala salire un po' e colpisci in modo pulito. Evita il tocco morto che la fa alzare.",
    },
    "chop-backspin-short": {
      name: "Chop di Dritto Backspin Corto",
      description: "Il servizio più fondamentale del tennistavolo. Backspin puro senza effetto laterale, piazzato corto. Il servizio più sicuro per tenerla bassa e corta, rendendola molto difficile da attaccare per gli avversari. Una scelta ideale contro i loopisti aggressivi.",
      contactPoint: "Colpisci la parte inferiore della pallina con la faccia della racchetta molto aperta. Taglia dritto verso il basso con un colpo semplice e pulito. La racchetta spazzola sotto la pallina senza movimento laterale, producendo backspin puro. Mantieni il contatto sottile per il massimo effetto o leggermente più spesso per controllare il piazzamento.",
      returnAdvice: "Apri la racchetta e spazzola sotto la pallina con una spinta corta, colpendo presto. Tienila corta oppure spingi in profondità con buon backspin. Tienila bassa invece di alzarla.",
    },
    "chop-no-spin": {
      name: "Chop di Dritto Senza Effetto",
      description: "Usa lo stesso movimento di chop della versione con backspin ma colpisce la pallina con effetto minimo. Gli avversari che si aspettano un backspin pesante spesso spingono lunga o alzano la pallina, regalando una terza palla facile.",
      contactPoint: "Colpisci il centro-posteriore della pallina con una faccia della racchetta che sembra aperta ma in realtà è più verticale rispetto alla versione con backspin. Il movimento di chop continua ma la racchetta scivola dietro la pallina invece che sotto, producendo effetto minimo. L'accompagnamento imita la versione con backspin per ingannare.",
      returnAdvice: "Aggiungi il tuo effetto con una spinta compatta o un flip/drive controllato. Tieni la racchetta leggermente chiusa e la traiettoria bassa. Evita il tocco morto.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Tergicristallo Laterale Corto",
      description: "La racchetta spazza orizzontalmente attraverso la pallina, producendo effetto laterale sinistro con backspin. Il movimento identico può produrre qualsiasi tipo di effetto a seconda del punto di contatto nell'arco, rendendolo molto difficile da leggere. Più efficace se tenuto basso sopra la rete.",
      contactPoint: "Colpisci la parte inferiore-sinistra della pallina mentre la racchetta spazza da destra a sinistra in un arco orizzontale. Spazzola verso il basso e verso destra attraverso la pallina, colpendo la parte inferiore a metà dell'arco del tergicristallo. La faccia aperta della racchetta e il punto di contatto basso combinano backspin ed effetto laterale sinistro.",
      returnAdvice: "Leggi il contatto e usa la racchetta aperta con una spinta corta e spazzolata. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale. Tienila bassa e corta a meno che tu non possa spingere in profondità con molto effetto.",
    },
    "windshield-wiper-topspin": {
      name: "Tergicristallo Topspin",
      description: "Stesso movimento del tergicristallo ma il contatto avviene in un punto diverso dell'arco per produrre topspin invece di backspin. Gli avversari che lo leggono come backspin e spingono manderanno la pallina lunga o alta.",
      contactPoint: "Colpisci la parte posteriore-superiore della pallina alla fine dell'arco del tergicristallo invece che a metà. La racchetta colpisce la pallina più tardi nella spazzata, dove il movimento va verso l'alto e in avanti. Una faccia della racchetta leggermente chiusa spazzola sopra la parte superiore della pallina, generando topspin mentre il movimento laterale aggiunge effetto laterale.",
      returnAdvice: "Non spingere. Chiudi la racchetta e blocca o contro-topspina in anticipo. Mira leggermente al rovescio del battitore per contrastare l'effetto laterale e tienila bassa.",
    },
    "hidden-serve": {
      name: "Servizio Nascosto (Illegale)",
      description: "Un servizio in cui il punto di contatto viene deliberatamente nascosto dietro il corpo o il braccio libero. Era legale prima della modifica alle regole del 1° settembre 2002 e si vede ancora talvolta nel gioco amatoriale.",
      contactPoint: "Il contatto varia — il battitore può produrre qualsiasi tipo di effetto poiché il contatto è nascosto. Tipicamente viene colpita la parte inferiore-sinistra della pallina con la racchetta aperta per un effetto laterale-backspin pesante, ma l'occultamento fa sì che il ricevitore non possa vedere l'esatto angolo di contatto o la direzione della spazzolata.",
      returnAdvice: "Dai priorità al controllo: presumi effetto laterale-backspin e usa la racchetta aperta con una spinta bassa e con effetto. Mira leggermente contro l'effetto e tienila bassa verso gli angoli. Se il contatto era nascosto, chiedi un avvertimento.",
      legalityNotes: "Illegale secondo le regole ITTF dal 1° settembre 2002. Dall'inizio del servizio fino al colpo, la pallina non deve essere nascosta al ricevitore, e il braccio libero deve essere allontanato dallo spazio tra la pallina e la rete. Un servizio poco chiaro può ricevere un avvertimento alla prima occorrenza; servizi poco chiari successivi possono costare un punto.",
    },
    "finger-spin-serve": {
      name: "Servizio con Effetto delle Dita (Illegale)",
      description: "Il battitore usa le dita per dare effetto alla pallina durante il lancio invece di generare effetto con la racchetta. Produce un effetto ingannevole da un movimento apparentemente semplice.",
      contactPoint: "L'effetto è generato dalle dita durante il lancio, non al contatto con la racchetta. Le dita fanno rotolare la pallina mentre la rilasciano, imprimendo backspin o effetto laterale prima ancora che la racchetta tocchi la pallina. Il contatto della racchetta può essere quasi piatto, facendo sembrare che l'effetto nasca dal nulla.",
      returnAdvice: "Osserva la rotazione durante il lancio e adatta l'angolo della racchetta a quell'effetto. Usa la racchetta aperta e una spinta morbida e con effetto, oppure un loop controllato se arriva lunga. Tieni la risposta bassa.",
      legalityNotes: "Illegale. Il servizio deve iniziare con la pallina che poggia liberamente sul palmo aperto, e il lancio deve essere quasi verticale senza imprimere effetto. Dare effetto alla pallina con le dita durante il lancio viola questo requisito.",
    },
  },

  motions: {
    pendulum: {
      name: "Pendolo",
      description: "Il servizio più comune nel tennistavolo. La racchetta oscilla come un pendolo da destra a sinistra (per i destrimani), generando effetto laterale combinato con backspin o topspin. Molto versatile, con numerose varianti di effetto possibili dallo stesso movimento.",
    },
    "reverse-pendulum": {
      name: "Pendolo Inverso",
      description: "La racchetta oscilla da sinistra a destra (per i destrimani), producendo effetto laterale nella direzione opposta rispetto al pendolo standard. Meno comune, il che lo rende più difficile da leggere per gli avversari.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Un servizio in cui la racchetta viene lanciata verso l'esterno con un movimento simile a un tomahawk. Genera un forte effetto laterale e può essere combinato con topspin per un effetto di scatto. Popolare nello stile di gioco asiatico. Nota: la classificazione della mano varia — l'allenamento cinese lo considera tipicamente un servizio di dritto (il contatto avviene sulla gomma di dritto), mentre alcuni allenatori occidentali lo classificano come rovescio in base alla postura.",
    },
    "reverse-tomahawk": {
      name: "Tomahawk Inverso",
      description: "Inizia con lo stesso movimento di lancio verso l'esterno di un tomahawk normale, ma passa al contatto con il lato di rovescio della racchetta all'ultimo istante, producendo effetto laterale sinistro invece che destro. Il movimento iniziale identico lo rende estremamente ingannevole. Reso popolare da Ding Ning e usato anche da Kenta Matsudaira.",
    },
    backhand: {
      name: "Servizio di Rovescio",
      description: "Un servizio compatto eseguito dal lato di rovescio. Permette una transizione rapida alla palla successiva ed è naturalmente ingannevole per la posizione del polso. Usato con efficacia da molti giocatori europei.",
    },
    "hook-shovel": {
      name: "Gancio / Paletta",
      description: "Un servizio non convenzionale in cui la racchetta raccoglie da sotto la pallina con un movimento a gancio. Produce un effetto laterale pesante combinato a backspin. Il punto di contatto insolito lo rende molto difficile da leggere.",
    },
    chop: {
      name: "Chop di Dritto",
      description: "Un semplice movimento di taglio verso il basso con la faccia della racchetta aperta che produce backspin puro senza effetto laterale. Il servizio più fondamentale del tennistavolo — facile da imparare, facile da tenere corto ed efficace per prevenire risposte aggressive. Spesso il primo servizio insegnato ai principianti.",
    },
    "windshield-wiper": {
      name: "Tergicristallo",
      description: "La racchetta spazza orizzontalmente in un arco come un tergicristallo, sfiorando la parte posteriore della pallina. A seconda di dove nell'arco avviene il contatto con la pallina, lo stesso movimento può produrre effetto laterale, topspin o backspin. L'aspetto identico indipendentemente dall'effetto lo rende molto ingannevole. Richiede una posizione ampia e bassa per un'esecuzione corretta.",
    },
    "high-toss": {
      name: "Pendolo con Lancio Alto",
      description: "Un servizio a pendolo con un lancio della pallina alto (tipicamente 2-5 metri). L'altezza aggiuntiva di caduta aggiunge energia gravitazionale, aumentando il potenziale di effetto. Richiede un tempismo eccellente ma produce un effetto eccezionalmente pesante.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Backspin Puro",
      description: "Rotazione inferiore pulita che fa scivolare bassa la pallina e frenarla sul lato dell'avversario. Le risposte tendono ad andare in rete se spinte senza compensare.",
    },
    "heavy-backspin": {
      name: "Backspin Pesante",
      description: "Rotazione inferiore massima. La pallina si aggrappa alla superficie del tavolo e può persino rimbalzare indietro verso la rete. Estremamente difficile da flippare o liftare aggressivamente.",
    },
    "pure-topspin": {
      name: "Topspin Puro",
      description: "Rotazione in avanti che fa scattare la pallina in avanti dopo il rimbalzo. Spesso usato nei servizi veloci e lunghi per mettere fretta all'avversario.",
    },
    "left-side-backspin": {
      name: "Laterale Sinistro + Backspin",
      description: "La combinazione classica del pendolo. La pallina curva verso destra dal punto di vista del battitore e rimbalza con rotazione inferiore. Molto comune nel gioco agonistico.",
    },
    "right-side-backspin": {
      name: "Laterale Destro + Backspin",
      description: "Combinazione tipica del pendolo inverso o del tomahawk. La pallina curva verso sinistra dal punto di vista del battitore. Meno comune, quindi più difficile da leggere per gli avversari.",
    },
    "left-side-topspin": {
      name: "Laterale Sinistro + Topspin",
      description: "Una combinazione ingannevole in cui la pallina sembra avere backspin ma scatta in avanti. Usata per sorprendere gli avversari quando si aspettano rotazione inferiore.",
    },
    "right-side-topspin": {
      name: "Laterale Destro + Topspin",
      description: "Combinazione in stile tomahawk che produce un rimbalzo laterale molto marcato. Efficace per preparare attacchi di dritto.",
    },
    "no-spin": {
      name: "Galleggiante Senza Effetto",
      description: "Una pallina morta con rotazione minima. Imita il movimento di un servizio con effetto ma produce un effetto galleggiante. Gli avversari che si aspettano effetto leggeranno completamente male la pallina.",
    },
    "pure-left-sidespin": {
      name: "Laterale Sinistro Puro",
      description: "Forte rotazione laterale senza una rotazione superiore/inferiore significativa. La pallina curva drammaticamente in aria e scatta lateralmente al rimbalzo.",
    },
    "pure-right-sidespin": {
      name: "Laterale Destro Puro",
      description: "Forte rotazione laterale nella direzione opposta. Efficace con i movimenti a pendolo inverso e tomahawk.",
    },
    "light-backspin": {
      name: "Backspin Leggero",
      description: "Rotazione inferiore sottile, difficile da distinguere dall'assenza di effetto. La pallina galleggia leggermente più a lungo di una pallina morta, sorprendendo gli avversari indecisi tra spingere e flippare.",
    },
    "heavy-left-side-backspin": {
      name: "Laterale Sinistro Pesante + Backspin",
      description: "Effetto combinato massimo dal movimento a pendolo. La pallina curva, scende e frena in modo aggressivo. Il servizio caratteristico di molti giocatori d'élite.",
    },
    corkspin: {
      name: "Effetto a Cavatappi",
      description: "Un asse di effetto giroscopico che produce un comportamento di rimbalzo imprevedibile. La pallina sembra oscillare e cambiare direzione in pieno volo.",
    },
  },

  bounces: {
    "short-low": {
      label: "Corto (2° rimbalzo sul tavolo)",
      secondBouncePosition: "Sul tavolo vicino alla rete",
    },
    "short-medium": {
      label: "Corto (2° rimbalzo vicino alla linea di fondo)",
      secondBouncePosition: "Vicino alla linea di fondo del tavolo",
    },
    "half-long": {
      label: "Medio-lungo",
      secondBouncePosition: "Esattamente sulla linea di fondo — lunghezza ambigua",
    },
    "long-medium": {
      label: "Lungo (profondo)",
      secondBouncePosition: "Cadrebbe ben oltre il tavolo",
    },
    "long-high": {
      label: "Lungo (veloce e profondo)",
      secondBouncePosition: "Molto lontano dal tavolo",
    },
    "deep-long": {
      label: "Lungo Profondo (linea di fondo)",
      secondBouncePosition: "Esattamente sulla linea di fondo dell'avversario. Nonostante la lunghezza, un servizio profondo ben piazzato mette in difficoltà l'avversario, rendendo difficile un attacco di qualità.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Massimizza il potenziale di effetto. Dà al battitore più tempo per prepararsi alla palla successiva.",
    },
    medium: {
      tacticalNote: "Bilancia effetto e velocità. Riduce il tempo di reazione dell'avversario mantenendo il controllo.",
    },
    fast: {
      tacticalNote: "Mette fretta all'avversario. Sacrifica l'effetto per la pura velocità per forzare una risposta debole o un ace diretto.",
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
      netClearance: "Arco alto sopra la rete (20+ cm)",
    },
  },

  tosses: {
    "low-legal": {
      position: "Palmo aperto, pallina visibile, lanciata circa 16 cm verso l'alto",
    },
    "medium-legal": {
      position: "Palmo aperto, pallina visibile, lanciata circa 30-50 cm verso l'alto",
    },
    "high-legal": {
      position: "Palmo aperto, pallina visibile, lanciata 2-5 metri verso l'alto",
    },
    "hidden-illegal": {
      position: "Pallina nascosta dietro il corpo o il braccio durante il lancio — illegale secondo le regole ITTF",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Backspin Finto",
      description: "Il battitore imita un movimento di backspin pesante ma colpisce la pallina con effetto minimo o topspin. L'avversario si aspetta rotazione inferiore e spinge la pallina lunga o in rete.",
      counterplay: "Osserva attentamente il punto di contatto. Se la racchetta scivola sotto la pallina, è backspin. Se sfiora la parte posteriore, è probabilmente assenza di effetto o topspin.",
    },
    "same-motion": {
      name: "Variazione a Movimento Identico",
      description: "Diversi tipi di effetto vengono eseguiti da un movimento di servizio identico. L'avversario non riesce a distinguere tra varianti di backspin, assenza di effetto ed effetto laterale.",
      counterplay: "Concentrati sul suono del contatto e sulla traiettoria della pallina invece che sul movimento del braccio. Allenati a leggere la traiettoria di volo della pallina.",
    },
    "contact-hiding": {
      name: "Occultamento del Punto di Contatto",
      description: "Il battitore usa la posizione del corpo o l'angolo del braccio per nascondere il momento e l'angolo esatti del contatto tra racchetta e pallina.",
      counterplay: "Posizionati per vedere attraverso l'angolazione del corpo del battitore. Chiedi all'arbitro di far rispettare le regole di visibilità se il contatto è completamente nascosto.",
    },
    "wrist-snap": {
      name: "Falso Scatto di Polso",
      description: "Uno scatto di polso rapido suggerisce un effetto pesante, ma l'angolo della faccia della racchetta al contatto produce molto meno effetto del previsto.",
      counterplay: "Non reagire solo alla velocità del polso. Concentrati sul comportamento della pallina subito dopo il rimbalzo.",
    },
    "speed-variation": {
      name: "Variazione di Velocità",
      description: "Alternare servizi veloci e lenti con lo stesso movimento per interrompere il tempismo e i movimenti dei piedi dell'avversario.",
      counterplay: "Resta sulla punta dei piedi in una posizione di attesa neutra. Leggi presto la velocità della pallina e adatta di conseguenza la tua preparazione.",
    },
    "body-feint": {
      name: "Finta con il Corpo",
      description: "Il battitore usa il movimento delle spalle, dei fianchi o della testa per suggerire un piazzamento o una direzione di effetto diversi da quelli effettivamente eseguiti.",
      counterplay: "Ignora il linguaggio del corpo e concentrati sulla racchetta e sulla pallina. Allenati a leggere l'effetto dalla rotazione della pallina invece che dal movimento del corpo del battitore.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Forzare una Risposta Debole",
      goal: "Far sì che l'avversario produca una risposta alta o lunga che possa essere attaccata sulla terza palla.",
    },
    "set-up-fh-attack": {
      name: "Preparare un Attacco di Dritto",
      goal: "Piazzare il servizio in modo che la risposta arrivi sul lato di dritto per un loop o uno smash aggressivo.",
    },
    "prevent-flip": {
      name: "Prevenire il Flip",
      goal: "Tenere il servizio corto e basso in modo che l'avversario non possa flipparlo o attaccarlo aggressivamente.",
    },
    "force-push": {
      name: "Forzare la Spinta",
      goal: "Backspin pesante che costringe l'avversario a spingere, dando al battitore l'iniziativa per la terza palla.",
    },
    "target-elbow": {
      name: "Puntare al Gomito",
      goal: "Puntare al gomito dell'avversario (punto di incrocio) per creare indecisione tra dritto e rovescio.",
    },
    "go-for-ace": {
      name: "Cercare l'Ace",
      goal: "Un servizio ad alto rischio pensato per vincere direttamente il punto tramite velocità, piazzamento o inganno.",
    },
    "serve-plus-one-fh": {
      name: "Servizio+1 al Dritto",
      goal: "Schema di servizio pensato in modo che la risposta prevista possa essere attaccata con un dritto da una posizione preparata.",
    },
    "serve-plus-one-bh": {
      name: "Servizio+1 al Rovescio",
      goal: "Schema di servizio pensato in modo che la risposta prevista possa essere attaccata con un colpo o un loop di rovescio.",
    },
  },

  placements: {
    "fh-short": {
      label: "Dritto Corto",
    },
    "bh-short": {
      label: "Rovescio Corto",
    },
    "fh-long": {
      label: "Dritto Lungo",
    },
    "bh-long": {
      label: "Rovescio Lungo",
    },
    "middle-short": {
      label: "Centro Corto (Gomito)",
    },
    "middle-long": {
      label: "Centro Lungo (Gomito)",
    },
  },
};
