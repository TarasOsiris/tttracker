/**
 * French translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

import type { DataTranslations } from "./es-data";

export const frData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Pendulum coupé court",
      description: "Le service le plus fondamental. Coupé court avec effet latéral gauche vers le revers ou le centre de l'adversaire. Provoque souvent un retour en poussette et prépare l'attaque en troisième balle.",
      contactPoint: "Contactez la partie inférieure-arrière de la balle avec une raquette ouverte. Brossez vers le bas et légèrement vers la droite, en laissant le poignet osciller naturellement dans l'arc du pendulum. Un contact fin maximise le coupé tandis que le suivi latéral ajoute de l'effet latéral.",
      returnAdvice: "Prends-la tôt après le rebond avec une raquette ouverte et une poussette courte et brossée pour ajouter du backspin. Garde-la courte ou pousse long sur le revers ou le coude du serveur, en visant légèrement contre le latéral. Si elle monte, un flip contrôlé est plus sûr que lever.",
    },
    "pendulum-sidespin-long": {
      name: "Pendulum latéral long",
      description: "Pendulum rapide vers les coins avec effet latéral et coupé. La courbe peut rendre difficile un retour de qualité, préparant une opportunité de troisième balle.",
      contactPoint: "Contactez le côté arrière-gauche de la balle avec une raquette légèrement fermée. Brossez vers l'avant et latéralement à travers la balle avec plus de vitesse et un contact plus épais que la version courte. Le poignet accélère à travers le contact pour ajouter du rythme.",
      returnAdvice: "Si elle arrive longue, recule et joue un topspin/drive contrôlé avec plus de lift pour le backspin. Vise légèrement le revers du serveur pour compenser le latéral et garde-la basse. Une poussette rapide et très coupée est l'option sûre si tu ne peux pas attaquer.",
    },
    "pendulum-no-spin": {
      name: "Pendulum sans effet",
      description: "Ressemble au pendulum coupé mais la balle flotte sans effet. Les adversaires qui poussent en s'attendant à du coupé soulèvent généralement la balle.",
      contactPoint: "Contactez le centre-arrière de la balle avec une face de raquette quasi plate. La raquette glisse derrière la balle au lieu de brosser par-dessous, ne produisant qu'un contact bref et épais. Le bras et le poignet suivent comme s'ils produisaient de l'effet, mais l'angle plat tue la rotation.",
      returnAdvice: "Ajoute ton propre effet pour le contrôle: poussette compacte ou flip/drive contrôlé avec raquette légèrement fermée. Évite le contact mort, ça monte. Garde-la basse et place aux angles.",
    },
    "pendulum-topspin": {
      name: "Pendulum lifté",
      description: "Déguisé en coupé mais porte en réalité du lifté. La balle bondit vers l'avant au rebond, piégeant les adversaires qui tentent de la pousser.",
      contactPoint: "Contactez la partie arrière-haute de la balle avec une raquette légèrement fermée. Brossez vers le haut et vers l'avant à travers la balle, en attrapant la moitié supérieure. Le mouvement pendulum déguise le brossage ascendant — le poignet roule par-dessus au contact pour générer du lifté tandis que le bras continue latéralement.",
      returnAdvice: "Ne pousse pas. Ferme la raquette et bloque ou contre-topspinne tôt avant le kick. Vise légèrement le revers du serveur pour contrer le latéral et garde-la basse.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Pendulum inversé court",
      description: "Service court avec effet latéral droit et coupé. La courbe opposée au pendulum classique peut être difficile à lire, surtout pour les adversaires habitués aux services standards.",
      contactPoint: "Contactez la partie inférieure-arrière de la balle avec une raquette ouverte. Brossez vers le bas et vers la gauche (à l'opposé du pendulum classique), en utilisant le mouvement du dos du poignet. La raquette se déplace de gauche à droite en travers du corps au moment du contact.",
      returnAdvice: "Prends-la tôt avec raquette ouverte et une poussette courte et brossée pour mettre du backspin. Vise légèrement le coup droit du serveur pour compenser le latéral droit, et garde-la basse. Si elle monte, un flip doux est plus sûr que lever.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Pendulum inversé lifté long",
      description: "Service long avec effet latéral droit et lifté. La balle courbe vers la gauche du serveur et bondit latéralement au rebond, rendant difficile une attaque de qualité.",
      contactPoint: "Contactez le côté arrière-droit de la balle avec une raquette légèrement fermée. Brossez vers le haut et vers la gauche à travers la balle. Le mouvement du pendulum inversé génère un effet latéral droit tandis que la composante ascendante ajoute du lifté.",
      returnAdvice: "Ferme la raquette et bloque, drive ou contre-topspinne tôt. Vise légèrement le coup droit du serveur pour compenser le latéral. Si tu loops, frotte par-dessus et garde un arc bas.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk long",
      description: "Service long agressif avec fort effet latéral droit et lifté. La balle bondit puissamment sur le côté après le rebond et met l'adversaire sous pression.",
      contactPoint: "Contactez le côté arrière-droit de la balle avec la face de raquette presque verticale. Brossez vers l'avant et fortement vers la gauche dans un mouvement de lancer. Le poignet claque vers l'extérieur au contact, générant un puissant effet latéral droit avec du lifté provenant de l'arc ascendant du geste.",
      returnAdvice: "Prends-la tôt avec raquette fermée et un bloc ou drive compact. Vise légèrement le coup droit du serveur pour compenser le latéral et garde-la basse. Si tu as le temps, un topspin contrôlé est la meilleure option.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk coupé court",
      description: "Un rare tomahawk court avec coupé. Le mouvement inhabituel combiné au placement court le rend très difficile à lire et à retourner agressivement pour les adversaires.",
      contactPoint: "Contactez le dessous de la balle avec la face de raquette ouverte et inclinée latéralement. Brossez vers le bas et vers la gauche dans l'arc du tomahawk. Un contact fin sous la balle produit du coupé tandis que le mouvement latéral ajoute de l'effet latéral. Un claquement de poignet plus doux et plus lent maintient la balle courte.",
      returnAdvice: "Raquette ouverte et poussette courte brossée pour la garder basse. Vise légèrement le coup droit du serveur pour compenser le latéral. Garde-la courte sauf si tu peux pousser long avec bon effet.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Tomahawk Inversé Long",
      description: "Le service emblématique de Ding Ning. Commence de façon identique à un tomahawk normal mais bascule sur le contact revers au dernier instant, produisant un effet latéral gauche avec topspin au lieu du latéral droit attendu. La balle plonge rapidement grâce au topspin et rebondit fortement vers le côté opposé. Nécessite une flexion profonde et un timing précis. Plus trompeur lorsqu'il est mélangé avec des services tomahawk classiques.",
      contactPoint: "Contactez le côté arrière-gauche de la balle avec le revêtement revers, la face de raquette presque verticale. Au dernier moment du geste tomahawk, retournez le poignet vers l'intérieur pour brosser vers l'avant et vers la droite. Cela inverse la direction de l'effet latéral par rapport à un tomahawk classique, produisant un effet latéral gauche avec du lifté.",
      returnAdvice: "Fermez la raquette et prenez la balle tôt avec un bloc compact ou un contre-topspin. Visez légèrement le revers du serveur pour contrer l'effet latéral gauche. Ne poussez pas — le topspin enverra la balle longue. Si la direction du latéral n'est pas claire, visez le milieu pour réduire le risque.",
    },
    "backhand-backspin-short": {
      name: "Revers coupé court",
      description: "Un service compact en revers avec coupé pur, placé court. Rapide à exécuter et permet une préparation immédiate pour la balle suivante. Courant à tous les niveaux de jeu.",
      contactPoint: "Contactez le dessous de la balle avec une face de raquette ouverte. Brossez droit vers le bas avec un mouvement compact du poignet, en gardant le geste court et contrôlé. La raquette avance à peine — presque tout le mouvement est vers le bas pour créer du coupé pur.",
      returnAdvice: "Ouvre la raquette et brosse sous la balle avec une poussette courte, contact tôt. Garde-la courte ou pousse long dans les angles si tu veux allonger. Privilégie la balle basse plutôt que de lever.",
    },
    "backhand-no-spin-long": {
      name: "Revers rapide long",
      description: "Un service de revers rapide vers les coins avec un minimum d'effet. La vitesse pure surprend les adversaires, surtout lorsqu'il est mélangé avec des services courts coupés.",
      contactPoint: "Contactez le centre-arrière de la balle avec une face de raquette quasi plate. Poussez à travers la balle avec un mouvement rapide et percutant plutôt qu'en brossant. Un contact épais et plat maximise la vitesse tout en minimisant l'effet. Le bras s'étend complètement vers la cible.",
      returnAdvice: "Prends-la près du sommet du rebond avec un bloc compact ou un drive contrôlé en ajoutant un peu de topspin. Ne fais pas juste écran; une balle sans effet exige ton propre spin. Place profond dans les angles ou au coude.",
    },
    "backhand-sidespin": {
      name: "Revers latéral",
      description: "Service de revers avec effet latéral droit et coupé. Le mouvement compact rend l'effet difficile à lire, et le serveur est déjà en position pour un enchaînement en revers.",
      contactPoint: "Contactez la partie inférieure-droite de la balle avec une raquette ouverte. Brossez vers le bas et vers la gauche en travers de la balle avec un mouvement compact du poignet. L'effet latéral provient du mouvement latéral du poignet tandis que la face ouverte génère du coupé.",
      returnAdvice: "Prends-la tôt avec raquette ouverte et poussette courte brossée pour ajouter du backspin. Vise légèrement le coup droit du serveur pour compenser le latéral. Si elle monte, un flip compact marche bien.",
    },
    "hook-heavy-side-short": {
      name: "Crochet latéral lourd court",
      description: "Un mouvement en cuillère sous la balle qui produit un effet latéral extrême. La balle bondit latéralement au rebond. Très difficile à lire en raison de l'angle inhabituel de la raquette.",
      contactPoint: "Contactez le côté gauche de la balle avec la face de raquette presque horizontale, en ramassant par-dessous et autour de la balle. Le mouvement de crochet brosse latéralement à travers l'équateur de la balle. Le poignet s'enroule brusquement vers l'intérieur pour maximiser la composante latérale de l'effet.",
      returnAdvice: "Ajuste l'angle pour contrer le latéral lourd et touche le côté de la balle, pas l'arrière. Un toucher doux ou un flip banane est plus sûr qu'une frappe. Vise légèrement le revers du serveur et garde-la basse.",
    },
    "hook-backspin-short": {
      name: "Crochet coupé court",
      description: "Service en crochet avec effet latéral lourd combiné au coupé. Les deux composantes d'effet rendent le retour précis très difficile.",
      contactPoint: "Contactez la partie inférieure-gauche de la balle avec la face de raquette ouverte et inclinée latéralement. Brossez vers le bas et vers la droite dans un arc de ramassage, en attrapant simultanément le dessous et le côté de la balle. Ce brossage à double angle crée la combinaison coupé et effet latéral.",
      returnAdvice: "Ouvre davantage la raquette et lève avec une poussette brossée pour gérer le backspin lourd. Vise légèrement le revers du serveur pour compenser le latéral et garde-la basse. Évite de frapper à plat.",
    },
    "hook-fast-long-topspin": {
      name: "Crochet Rapide Long",
      description: "Une variante agressive du service crochet combinant effet latéral droit et topspin, servi rapide et profond. Le mouvement en cuillère semble produire du backspin, mais la balle rebondit vers l'avant avec du latéral. Plus efficace lorsqu'il est mélangé avec des services crochet backspin traditionnels pour maximiser la tromperie.",
      contactPoint: "Contactez le côté arrière-droit de la balle avec la face de raquette légèrement fermée. Brossez vers l'avant et vers la gauche dans un arc de ramassage rapide, en attrapant la partie supérieure-latérale de la balle. Le mouvement de crochet déguise le contact ascendant qui génère du lifté, tandis que le suivi latéral ajoute de l'effet latéral droit.",
      returnAdvice: "Fermez la raquette et utilisez un bloc compact ou un contre-topspin en prenant la balle très tôt. Ne poussez pas — le topspin enverra la balle longue. Inclinez la raquette légèrement à gauche pour contrer le latéral droit. Un loop topspin contrôlé au milieu est l'option d'attaque la plus sûre.",
    },
    "high-toss-backspin": {
      name: "Lancer haut coupé lourd",
      description: "Le lancer haut peut ajouter du temps et de l'énergie pour un effet lourd. La balle peut visiblement tourner en arrière après le rebond. Utilisé par de nombreux joueurs d'élite pour forcer des poussettes faibles.",
      contactPoint: "Contactez le tout bas de la balle avec une face de raquette très ouverte au moment où elle retombe du lancer haut. Brossez fortement vers le bas, en utilisant l'énergie gravitationnelle de la balle en chute pour amplifier le coupé. Le poignet claque vers le bas au point le plus bas du geste pour un effet maximal.",
      returnAdvice: "Raquette très ouverte et poussette plus longue et brossée avec plus de lift. Si elle est longue, démarre en loop contrôlé plutôt qu'à plat. Priorise beaucoup de backspin et une hauteur basse.",
    },
    "high-toss-sidespin": {
      name: "Lancer haut latéral",
      description: "Combine le lancer haut avec effet latéral et coupé pour un effet combiné lourd. La balle peut courber de façon spectaculaire et freiner sur la table. Nécessite un timing d'exécution exceptionnel.",
      contactPoint: "Contactez la partie inférieure-gauche de la balle avec une raquette ouverte au moment où elle retombe du lancer haut. Brossez vers le bas et vers la droite dans un arc pendulum, en attrapant à la fois le dessous et le côté gauche. L'énergie gravitationnelle combinée au claquement du poignet produit un coupé extrêmement lourd avec effet latéral gauche.",
      returnAdvice: "Ouvre la raquette et brosse vers le haut en allant légèrement contre le latéral. Vise légèrement le revers du serveur pour compenser la courbe et garde-la basse. Une poussette douce et très coupée est plus sûre qu'une frappe.",
    },
    "ghost-serve": {
      name: "Service fantôme",
      description: "Un service ultra-court avec coupé qui franchit à peine le filet et rebondit deux fois (ou plus) du côté de l'adversaire. La balle peut littéralement rouler en arrière vers le filet. Un favori du public lors des événements professionnels.",
      contactPoint: "Contactez le tout bas de la balle avec une face de raquette complètement ouverte (presque horizontale). Brossez fortement vers le bas avec un toucher extrêmement fin et effleurant — la raquette embrasse à peine la balle. Un poignet souple et détendu est essentiel pour générer le coupé maximal qui fait revenir la balle en arrière.",
      returnAdvice: "Avance et prends-la juste après le rebond avec une raquette très ouverte et un contact fin brossé. Garde-la courte ou pousse long avec beaucoup de backspin. N'attends pas, sinon elle revient dans le filet.",
    },
    "fast-long-surprise-fh": {
      name: "Rapide long en coup droit",
      description: "Un service rapide soudain vers le coin coup droit de l'adversaire avec un contact lifté/drive. Plus efficace lorsqu'il est mélangé après une série de services courts. L'effet de surprise est l'arme principale.",
      contactPoint: "Contactez l'arrière de la balle avec une raquette légèrement fermée. Traversez la balle avec un geste rapide et plat, en brossant légèrement vers le haut pour ajouter du lifté. L'accent est mis sur la vitesse et l'énergie vers l'avant plutôt que sur l'effet — contact épais avec une extension rapide du bras.",
      returnAdvice: "Ferme la raquette et bloque ou contre-topspinne tôt avec un geste compact. Ne pousse pas. Place profond revers ou milieu pour réduire l'angle.",
    },
    "fast-long-surprise-bh": {
      name: "Rapide long en revers",
      description: "Service rapide dirigé vers le coin revers avec un contact lifté/drive. Efficace contre les adversaires trop proches de la table ou engagés pour recevoir court.",
      contactPoint: "Contactez l'arrière de la balle avec une raquette légèrement fermée du côté revers. Traversez la balle avec un coup rapide et compact, en brossant légèrement vers le haut. La prise revers ferme naturellement la raquette, ajoutant une touche de lifté à la trajectoire rapide et plate.",
      returnAdvice: "Bloc/drive revers compact avec raquette légèrement fermée. Prends-la tôt et garde-la basse. Place profond milieu ou plein coup droit pour neutraliser l'angle.",
    },
    "pendulum-corkspin": {
      name: "Pendulum tire-bouchon",
      description: "Un service pendulum avec un axe d'effet gyroscopique en tire-bouchon. La balle peut osciller en vol et rebondir de manière moins prévisible, rendant les retours propres difficiles.",
      contactPoint: "Contactez le côté arrière-gauche de la balle avec une raquette fermée. Brossez vers l'avant et autour de la balle dans un mouvement de crochet, comme si vous enveloppiez la raquette autour d'elle. Le poignet claque vers l'intérieur au contact pour créer l'axe gyroscopique — l'effet pénètre dans la balle plutôt que d'aller purement latéralement ou vers le bas.",
      returnAdvice: "Observe le rebond et contacte tôt avec un angle neutre pour absorber le flottement. Un bloc contrôlé ou un roll au milieu est le plus sûr. Ajuste après le premier kick plutôt que de forcer un grand angle.",
    },
    "backhand-elbow": {
      name: "Revers au coude",
      description: "Un service de revers à vitesse moyenne dirigé directement vers le coude de l'adversaire. L'effet latéral droit ajoute de la courbe, créant de l'indécision sur le choix entre coup droit et revers.",
      contactPoint: "Contactez la partie arrière-droite de la balle avec une raquette légèrement ouverte depuis la position revers. Brossez latéralement vers la gauche et légèrement vers le bas. L'effet latéral provient du mouvement latéral du poignet, tandis que l'angle légèrement vers le bas ajoute assez de coupé pour garder la balle basse.",
      returnAdvice: "Bouge les pieds et décide tôt; ne tends pas le bras. Si elle est longue, joue un topspin/drive contrôlé avec plus de lift pour le backspin. Vise profond au coude ou légèrement au coup droit du serveur pour compenser le latéral.",
    },
    "high-toss-no-spin": {
      name: "Lancer haut sans effet",
      description: "Imite de près le service lancer haut avec coupé lourd mais ne porte aucun effet. Les adversaires qui s'attendent à un coupé extrême peuvent pousser la balle longue ou haute. Nécessite un grand toucher de balle.",
      contactPoint: "Contactez le centre-arrière de la balle avec une face de raquette quasi plate malgré l'apparence ouverte. La raquette descend comme pour produire un coupé lourd mais contacte la balle avec le centre plat du revêtement plutôt qu'en brossant. Un contact épais et bref tue l'effet tandis que le bras suit de manière trompeuse.",
      returnAdvice: "Ajoute ton propre effet pour le contrôle: flip compact ou poussette avec raquette légèrement fermée. Laisse-la monter un peu et contacte proprement. Évite le contact mort qui monte.",
    },
    "chop-backspin-short": {
      name: "Chop coup droit coupé court",
      description: "Le service le plus fondamental du tennis de table. Coupé pur sans effet latéral, placé court. Le service le plus sûr à maintenir bas et court, le rendant très difficile à attaquer pour les adversaires. Un choix idéal contre les attaquants agressifs en top spin.",
      contactPoint: "Contactez le dessous de la balle avec une face de raquette très ouverte. Coupez droit vers le bas avec un geste simple et propre. La raquette brosse sous la balle sans mouvement latéral, produisant du coupé pur. Gardez le contact fin pour un effet maximal ou légèrement plus épais pour contrôler le placement.",
      returnAdvice: "Ouvre la raquette et brosse sous la balle avec une poussette courte, contact tôt. Garde-la courte ou pousse long avec bon backspin. Garde-la basse plutôt que de lever.",
    },
    "chop-no-spin": {
      name: "Chop coup droit sans effet",
      description: "Utilise le même mouvement de chop que la version coupée mais contacte la balle avec un minimum d'effet. Les adversaires qui s'attendent à un coupé lourd poussent souvent long ou soulèvent la balle, offrant une troisième balle facile.",
      contactPoint: "Contactez le centre-arrière de la balle avec une face de raquette qui semble ouverte mais est en réalité plus verticale que la version coupée. Le mouvement de chop continue mais la raquette glisse derrière la balle plutôt que par-dessous, produisant un minimum d'effet. Le suivi imite la version coupée pour la tromperie.",
      returnAdvice: "Ajoute ton propre effet avec une poussette compacte ou un flip/drive contrôlé. Raquette légèrement fermée et trajectoire basse. Évite le contact mort.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Essuie-glace latéral court",
      description: "La raquette balaie horizontalement à travers la balle, produisant un effet latéral gauche avec coupé. Le mouvement identique peut produire tout type d'effet selon le point de contact dans l'arc, le rendant très difficile à lire. Plus efficace lorsqu'il est maintenu bas au-dessus du filet.",
      contactPoint: "Contactez la partie inférieure-gauche de la balle au moment où la raquette balaie de droite à gauche dans un arc horizontal. Brossez vers le bas et vers la droite à travers la balle, en attrapant le dessous au milieu de l'arc d'essuie-glace. La face ouverte de la raquette et le point de contact bas combinent coupé et effet latéral gauche.",
      returnAdvice: "Lis le contact et utilise une raquette ouverte avec une poussette courte brossée. Vise légèrement le revers du serveur pour compenser le latéral. Garde-la basse et courte sauf si tu peux pousser long avec beaucoup d'effet.",
    },
    "windshield-wiper-topspin": {
      name: "Essuie-glace lifté",
      description: "Même mouvement d'essuie-glace mais le contact se fait à un point différent de l'arc pour produire du lifté au lieu du coupé. Les adversaires qui le lisent comme du coupé et poussent enverront la balle longue ou haute.",
      contactPoint: "Contactez la partie arrière-haute de la balle à la fin de l'arc d'essuie-glace plutôt qu'au milieu. La raquette attrape la balle plus tard dans son balayage, là où le mouvement monte et avance. Une face de raquette légèrement fermée brosse par-dessus le sommet de la balle, générant du lifté tandis que le mouvement latéral ajoute de l'effet latéral.",
      returnAdvice: "Ne pousse pas. Ferme la raquette et bloque ou contre-topspinne tôt. Vise légèrement le revers du serveur pour compenser le latéral et garde-la basse.",
    },
    "hidden-serve": {
      name: "Service caché (illégal)",
      description: "Un service où le point de contact est délibérément caché derrière le corps ou le bras libre. C'était légal avant le changement de règle du 1er septembre 2002 et on le voit encore parfois dans le jeu amateur.",
      contactPoint: "Le contact varie — le serveur peut produire tout type d'effet puisque le contact est caché. Typiquement, la partie inférieure-gauche de la balle est frappée avec une raquette ouverte pour un coupé-latéral lourd, mais la dissimulation empêche le receveur de voir l'angle exact de contact ou la direction du brossage.",
      returnAdvice: "Priorise le contrôle: suppose latéral-backspin et utilise une raquette ouverte avec une poussette basse et très coupée. Vise légèrement contre l'effet et garde-la basse dans les angles. Si le contact était caché, demande un avertissement.",
      legalityNotes: "Illégal selon les règles de l'ITTF depuis le 1er sept. 2002. Du début du service jusqu'à la frappe, la balle ne doit pas être cachée du receveur, et le bras libre doit être retiré de l'espace entre la balle et le filet. Un service peu clair peut recevoir un avertissement lors de la première occurrence ; les services peu clairs suivants peuvent coûter un point.",
    },
    "finger-spin-serve": {
      name: "Service avec effet des doigts (illégal)",
      description: "Le serveur utilise ses doigts pour donner de l'effet à la balle pendant le lancer au lieu de générer l'effet avec la raquette. Produit un effet trompeur à partir d'un mouvement apparemment simple.",
      contactPoint: "L'effet est généré par les doigts pendant le lancer, pas au contact de la raquette. Les doigts roulent la balle en la relâchant, lui imprimant du coupé ou de l'effet latéral avant même que la raquette ne touche la balle. Le contact raquette lui-même peut être quasiment plat, donnant l'impression que l'effet vient de nulle part.",
      returnAdvice: "Observe la rotation au lancer et ajuste l'angle de raquette à cet effet. Raquette ouverte et poussette douce et très coupée, ou loop contrôlé si c'est long. Garde la remise basse.",
      legalityNotes: "Illégal. Le service doit commencer avec la balle reposant librement sur la paume ouverte, et le lancer doit être quasi vertical sans donner d'effet. Donner de l'effet à la balle avec les doigts pendant le lancer viole cette exigence.",
    },
  },

  motions: {
    pendulum: {
      name: "Pendulum",
      description: "Le service le plus courant au tennis de table. La raquette oscille comme un pendule de droite à gauche (pour les droitiers), générant un effet latéral combiné avec du coupé ou du lifté. Très polyvalent avec de nombreuses variations d'effet possibles à partir du même mouvement.",
    },
    "reverse-pendulum": {
      name: "Pendulum inversé",
      description: "La raquette oscille de gauche à droite (pour les droitiers), produisant un effet latéral dans la direction opposée au pendulum standard. Moins courant, ce qui le rend plus difficile à lire pour les adversaires.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Un service où la raquette est projetée vers l'extérieur dans un mouvement de lancer, comme un tomahawk. Génère un fort effet latéral et peut être combiné avec du lifté pour un effet de rebond. Populaire dans le style de jeu asiatique. Note : la classification de main varie — l'entraînement chinois considère typiquement ceci comme un service coup droit (le contact se fait sur le revêtement coup droit), tandis que certains entraîneurs occidentaux le classifient comme revers en se basant sur la posture.",
    },
    "reverse-tomahawk": {
      name: "Tomahawk Inversé",
      description: "Commence avec le même mouvement de lancer qu'un tomahawk normal, mais bascule sur le revers de la raquette au dernier instant, produisant un effet latéral gauche au lieu de droit. Le mouvement initial identique le rend extrêmement trompeur. Popularisé par Ding Ning et également utilisé par Kenta Matsudaira.",
    },
    backhand: {
      name: "Service de revers",
      description: "Un service compact réalisé du côté revers. Permet une transition rapide vers la balle suivante et est naturellement trompeur en raison de la position du poignet. Utilisé efficacement par de nombreux joueurs européens.",
    },
    "hook-shovel": {
      name: "Crochet / Pelle",
      description: "Un service non conventionnel où la raquette ramasse sous la balle avec un mouvement de crochet. Produit un effet latéral lourd avec du coupé. Le point de contact inhabituel le rend très difficile à lire.",
    },
    chop: {
      name: "Chop coup droit",
      description: "Un mouvement simple de coupe vers le bas avec la face de la raquette ouverte qui produit du coupé pur sans effet latéral. Le service le plus fondamental du tennis de table — facile à apprendre, facile à maintenir court et efficace pour empêcher les retours agressifs. Souvent le premier service enseigné aux débutants.",
    },
    "windshield-wiper": {
      name: "Essuie-glace",
      description: "La raquette balaie horizontalement en arc comme un essuie-glace, effleurant l'arrière de la balle. Selon l'endroit de l'arc où la balle est contactée, le même mouvement peut produire un effet latéral, du lifté ou du coupé. L'apparence identique quel que soit l'effet le rend hautement trompeur. Nécessite une posture basse et large pour une exécution correcte.",
    },
    "high-toss": {
      name: "Pendulum à lancer haut",
      description: "Un service pendulum avec un lancer haut de la balle (typiquement 2 à 5 mètres). La hauteur de chute supplémentaire ajoute de l'énergie gravitationnelle, augmentant le potentiel d'effet. Nécessite un excellent timing mais produit un effet exceptionnellement lourd.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Coupé pur",
      description: "Rotation inférieure nette qui fait glisser la balle bas et la freine du côté de l'adversaire. Les retours ont tendance à aller dans le filet si on pousse sans compenser.",
    },
    "heavy-backspin": {
      name: "Coupé lourd",
      description: "Rotation inférieure maximale. La balle accroche la surface de la table et peut même rebondir en arrière vers le filet. Extrêmement difficile à flipper ou à lifter agressivement.",
    },
    "pure-topspin": {
      name: "Lifté pur",
      description: "Rotation vers l'avant qui fait bondir la balle après le rebond. Souvent utilisé dans les services rapides longs pour mettre l'adversaire sous pression.",
    },
    "left-side-backspin": {
      name: "Latéral gauche + coupé",
      description: "La combinaison classique du pendulum. La balle courbe vers la droite du point de vue du serveur et rebondit avec rotation inférieure. Très courant en jeu de compétition.",
    },
    "right-side-backspin": {
      name: "Latéral droit + coupé",
      description: "Combinaison de pendulum inversé ou tomahawk. La balle courbe vers la gauche du point de vue du serveur. Moins courant, donc plus difficile à lire pour les adversaires.",
    },
    "left-side-topspin": {
      name: "Latéral gauche + lifté",
      description: "Une combinaison trompeuse où la balle semble avoir du coupé mais bondit vers l'avant. Utilisé pour piéger les adversaires quand ils s'attendent à de la rotation inférieure.",
    },
    "right-side-topspin": {
      name: "Latéral droit + lifté",
      description: "Combinaison style tomahawk qui produit un fort rebond latéral. Efficace pour préparer des attaques en coup droit.",
    },
    "no-spin": {
      name: "Flottante sans effet",
      description: "Une balle morte avec un minimum de rotation. Imite le mouvement d'un service avec effet mais produit une balle flottante. Les adversaires qui s'attendent à de l'effet lisent complètement mal la balle.",
    },
    "pure-left-sidespin": {
      name: "Latéral gauche pur",
      description: "Forte rotation latérale sans rotation supérieure/inférieure significative. La balle courbe de façon spectaculaire dans l'air et bondit latéralement au rebond.",
    },
    "pure-right-sidespin": {
      name: "Latéral droit pur",
      description: "Forte rotation latérale dans la direction opposée. Efficace avec les mouvements de pendulum inversé et de tomahawk.",
    },
    "light-backspin": {
      name: "Coupé léger",
      description: "Rotation inférieure subtile difficile à distinguer du sans effet. La balle flotte légèrement plus qu'une balle morte, piégeant les adversaires entre la poussette et le flip.",
    },
    "heavy-left-side-backspin": {
      name: "Latéral gauche lourd + coupé",
      description: "Effet combiné maximal du mouvement pendulum. La balle courbe, descend et freine agressivement. Le service signature de nombreux joueurs d'élite.",
    },
    corkspin: {
      name: "Effet tire-bouchon",
      description: "Un axe d'effet gyroscopique qui produit un comportement de rebond imprévisible. La balle semble osciller et changer de direction en plein vol.",
    },
  },

  bounces: {
    "short-low": {
      label: "Court (2e rebond sur la table)",
      secondBouncePosition: "Sur la table près du filet",
    },
    "short-medium": {
      label: "Court (2e rebond près de la ligne de fond)",
      secondBouncePosition: "Près de la ligne de fond de la table",
    },
    "half-long": {
      label: "Mi-long",
      secondBouncePosition: "Juste sur la ligne de fond — longueur ambiguë",
    },
    "long-medium": {
      label: "Long (profond)",
      secondBouncePosition: "Tomberait bien au-delà de la table",
    },
    "long-high": {
      label: "Long (rapide et profond)",
      secondBouncePosition: "Très loin de la table",
    },
    "deep-long": {
      label: "Long profond (ligne de fond)",
      secondBouncePosition: "Juste sur la ligne de fond de l'adversaire. Malgré la longueur, un service profond bien placé met l'adversaire sous pression, rendant difficile une attaque de qualité.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Maximise le potentiel d'effet. Donne au serveur plus de temps pour préparer la balle suivante.",
    },
    medium: {
      tacticalNote: "Équilibre effet et vitesse. Réduit le temps de réaction de l'adversaire tout en maintenant le contrôle.",
    },
    fast: {
      tacticalNote: "Met l'adversaire sous pression. Sacrifie l'effet pour la vitesse pure afin de forcer un retour faible ou un ace direct.",
    },
  },

  trajectories: {
    flat: {
      netClearance: "Juste au-dessus du filet (1-3 cm)",
    },
    "low-arc": {
      netClearance: "Arc bas au-dessus du filet (5-15 cm)",
    },
    "high-arc": {
      netClearance: "Arc haut au-dessus du filet (20+ cm)",
    },
  },

  tosses: {
    "low-legal": {
      position: "Paume ouverte, balle visible, lancée ~16 cm vers le haut",
    },
    "medium-legal": {
      position: "Paume ouverte, balle visible, lancée ~30-50 cm vers le haut",
    },
    "high-legal": {
      position: "Paume ouverte, balle visible, lancée 2-5 mètres vers le haut",
    },
    "hidden-illegal": {
      position: "Balle cachée derrière le corps ou le bras pendant le lancer — illégal selon les règles de l'ITTF",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Faux coupé",
      description: "Le serveur imite un mouvement de coupé lourd mais contacte la balle avec un minimum d'effet ou du lifté. L'adversaire s'attend à de la rotation inférieure et pousse la balle longue ou dans le filet.",
      counterplay: "Observez le point de contact de près. Si la raquette glisse sous la balle, c'est du coupé. Si elle effleure l'arrière, c'est probablement sans effet ou du lifté.",
    },
    "same-motion": {
      name: "Variation avec même mouvement",
      description: "Plusieurs types d'effet sont exécutés à partir d'un mouvement de service identique. L'adversaire ne peut pas distinguer entre les variations de coupé, sans effet et latéral.",
      counterplay: "Concentrez-vous sur le son du contact et la trajectoire de la balle plutôt que sur le mouvement du bras. Entraînez-vous à lire la trajectoire de vol de la balle.",
    },
    "contact-hiding": {
      name: "Dissimulation du point de contact",
      description: "Le serveur utilise le positionnement du corps ou l'angle du bras pour masquer le moment et l'angle exacts du contact raquette-balle.",
      counterplay: "Positionnez-vous pour voir à travers l'angle du corps du serveur. Demandez à l'arbitre d'appliquer les règles de visibilité si le contact est complètement caché.",
    },
    "wrist-snap": {
      name: "Faux coup de poignet",
      description: "Un mouvement rapide du poignet suggère un effet lourd, mais l'angle de la face de la raquette au contact produit beaucoup moins d'effet que prévu.",
      counterplay: "Ne réagissez pas uniquement à la vitesse du poignet. Concentrez-vous sur le comportement de la balle immédiatement après le rebond.",
    },
    "speed-variation": {
      name: "Variation de vitesse",
      description: "Alternance entre services rapides et lents avec le même mouvement pour perturber le timing et le jeu de jambes de l'adversaire.",
      counterplay: "Restez en alerte avec une position d'attente neutre. Lisez la vitesse de la balle tôt et ajustez votre préparation en conséquence.",
    },
    "body-feint": {
      name: "Feinte corporelle",
      description: "Le serveur utilise un mouvement d'épaule, de hanche ou de tête pour suggérer un placement ou une direction d'effet différent de ce qui est réellement exécuté.",
      counterplay: "Ignorez le langage corporel et concentrez-vous sur la raquette et la balle. Entraînez-vous à lire l'effet par la rotation de la balle plutôt que par le mouvement corporel du serveur.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Forcer un retour faible",
      goal: "Faire produire à l'adversaire un retour haut ou long qui peut être attaqué en troisième balle.",
    },
    "set-up-fh-attack": {
      name: "Préparer l'attaque en coup droit",
      goal: "Positionner le service pour que le retour arrive du côté coup droit pour un top spin ou un smash agressif.",
    },
    "prevent-flip": {
      name: "Empêcher le flip",
      goal: "Maintenir le service court et bas pour que l'adversaire ne puisse pas flipper ou l'attaquer agressivement.",
    },
    "force-push": {
      name: "Forcer la poussette",
      goal: "Coupé lourd qui oblige l'adversaire à pousser, donnant au serveur l'initiative pour la troisième balle.",
    },
    "target-elbow": {
      name: "Viser le coude",
      goal: "Viser le coude de l'adversaire (point de croisement) pour créer de l'indécision entre coup droit et revers.",
    },
    "go-for-ace": {
      name: "Chercher l'ace",
      goal: "Un service à haut risque conçu pour gagner le point directement par la vitesse, le placement ou la tromperie.",
    },
    "serve-plus-one-fh": {
      name: "Service+1 en coup droit",
      goal: "Schéma de service conçu pour que le retour attendu puisse être attaqué en coup droit depuis une position préparée.",
    },
    "serve-plus-one-bh": {
      name: "Service+1 en revers",
      goal: "Schéma de service conçu pour que le retour attendu puisse être attaqué avec un coup de revers ou un top spin.",
    },
  },

  placements: {
    "fh-short": {
      label: "Coup droit court",
    },
    "bh-short": {
      label: "Revers court",
    },
    "fh-long": {
      label: "Coup droit long",
    },
    "bh-long": {
      label: "Revers long",
    },
    "middle-short": {
      label: "Centre court (coude)",
    },
    "middle-long": {
      label: "Centre long (coude)",
    },
  },
};
