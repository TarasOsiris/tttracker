/**
 * French translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

import type { DataTranslations } from "./es-data";

export const frData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Pendule coupé court",
      description: "Le service de base par excellence. Coupé court avec effet latéral gauche, vers le revers ou le milieu de l'adversaire. Il entraîne souvent une remise en poussette et prépare l'attaque en troisième balle.",
      contactPoint: "Touchez l'arrière-bas de la balle, raquette ouverte. Brossez vers le bas et légèrement vers la droite en laissant le poignet accompagner naturellement l'arc du pendule. Un contact fin maximise le coupé, tandis que l'accompagnement latéral ajoute l'effet latéral.",
      returnAdvice: "Prenez la balle tôt, juste après le rebond, raquette ouverte, avec une poussette courte et brossée pour remettre du coupé. Remettez court, ou poussez long dans le revers ou le coude du serveur en visant légèrement contre l'effet latéral. Si la balle monte, un flip contrôlé est plus sûr que de la soulever.",
    },
    "pendulum-sidespin-long": {
      name: "Pendule latéral long",
      description: "Pendule rapide dans les coins, avec effet latéral et coupé. La courbe de la balle complique une remise de qualité et ouvre une occasion en troisième balle.",
      contactPoint: "Touchez le côté arrière-gauche de la balle, raquette légèrement fermée. Brossez vers l'avant et sur le côté, avec plus de vitesse et un contact plus plein que pour la version courte. Le poignet accélère au contact pour donner plus de vitesse.",
      returnAdvice: "Si la balle sort long, reculez et jouez un topspin ou un drive contrôlé, en relevant davantage pour compenser le coupé. Visez légèrement le revers du serveur pour contrer l'effet latéral et gardez la balle basse. Si vous ne pouvez pas attaquer, une poussette rapide et bien coupée reste l'option la plus sûre.",
    },
    "pendulum-no-spin": {
      name: "Pendule sans effet",
      description: "Ressemble au pendule coupé, mais la balle flotte sans effet. L'adversaire qui pousse en s'attendant à du coupé fait souvent monter la balle.",
      contactPoint: "Touchez l'arrière-centre de la balle avec une face de raquette presque plate. La raquette glisse derrière la balle au lieu de brosser dessous, avec un contact bref et plein. Le bras et le poignet accompagnent comme pour donner de l'effet, mais l'angle plat annule la rotation.",
      returnAdvice: "Donnez votre propre effet pour garder le contrôle : poussette compacte ou flip/drive contrôlé, raquette légèrement fermée. Évitez le simple contact passif, qui fait monter la balle. Gardez-la basse et placez-la dans les coins.",
    },
    "pendulum-topspin": {
      name: "Pendule lifté",
      description: "Déguisé en coupé, il porte en réalité du lifté. La balle accélère vers l'avant au rebond et piège l'adversaire qui tente de la pousser.",
      contactPoint: "Touchez l'arrière-haut de la balle, raquette légèrement fermée. Brossez vers le haut et vers l'avant en prenant la moitié supérieure de la balle. Le mouvement de pendule masque ce brossage ascendant : le poignet s'enroule par-dessus au contact pour générer le lifté, tandis que le bras poursuit sur le côté.",
      returnAdvice: "Ne poussez pas. Fermez la raquette et jouez un bloc ou un contre-topspin tôt, avant que la balle n'accélère. Visez légèrement le revers du serveur pour contrer l'effet latéral et gardez la balle basse.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Pendule inversé court",
      description: "Service court avec effet latéral droit et coupé. Sa courbe, opposée à celle du pendule classique, peut être difficile à lire, surtout pour les adversaires habitués aux services standards.",
      contactPoint: "Touchez l'arrière-bas de la balle, raquette ouverte. Brossez vers le bas et vers la gauche (à l'inverse du pendule classique) en utilisant le dos du poignet. La raquette traverse le corps de gauche à droite au moment du contact.",
      returnAdvice: "Prenez la balle tôt, raquette ouverte, avec une poussette courte et brossée pour remettre du coupé. Visez légèrement le coup droit du serveur pour contrer l'effet latéral droit, en gardant la balle basse. Si elle monte, un flip en souplesse est plus sûr que de la soulever.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Pendule inversé lifté long",
      description: "Service long avec effet latéral droit et lifté. La balle s'incurve vers la gauche du serveur et part sur le côté au rebond, ce qui rend difficile une attaque de qualité.",
      contactPoint: "Touchez le côté arrière-droit de la balle, raquette légèrement fermée. Brossez vers le haut et vers la gauche. Le mouvement de pendule inversé génère l'effet latéral droit, et la composante ascendante ajoute du lifté.",
      returnAdvice: "Fermez la raquette et jouez un bloc, un drive ou un contre-topspin en prenant la balle tôt. Visez légèrement le coup droit du serveur pour contrer l'effet latéral. Si vous jouez en topspin, brossez par-dessus la balle et gardez une trajectoire basse.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk long",
      description: "Service long et agressif avec fort effet latéral droit et lifté. Après le rebond, la balle part violemment sur le côté et bouscule l'adversaire.",
      contactPoint: "Touchez le côté arrière-droit de la balle, face de raquette presque verticale. Brossez vers l'avant et franchement vers la gauche, dans un mouvement de lancer. Le poignet fouette vers l'extérieur au contact et génère un puissant effet latéral droit, avec du lifté venant de l'arc ascendant du geste.",
      returnAdvice: "Prenez la balle tôt, raquette fermée, avec un bloc ou un drive compact. Visez légèrement le coup droit du serveur pour contrer l'effet latéral et gardez la balle basse. Si vous avez le temps, un topspin contrôlé est la meilleure option.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk coupé court",
      description: "Un tomahawk court et coupé, plutôt rare. Le geste inhabituel, combiné au placement court, le rend très difficile à lire et à remettre de façon agressive.",
      contactPoint: "Touchez le dessous de la balle, face de raquette ouverte et inclinée sur le côté. Brossez vers le bas et vers la gauche dans l'arc du tomahawk. Le contact fin sous la balle produit le coupé, tandis que le mouvement latéral ajoute l'effet latéral. Un coup de poignet plus doux et plus lent garde la balle courte.",
      returnAdvice: "Raquette ouverte, jouez une poussette courte et brossée pour garder la balle basse. Visez légèrement le coup droit du serveur pour contrer l'effet latéral. Remettez court, sauf si vous pouvez pousser long avec un bon effet.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Tomahawk inversé long",
      description: "Le service emblématique de Ding Ning. Il commence exactement comme un tomahawk classique, mais bascule au dernier instant sur un contact côté revers, ce qui produit un effet latéral gauche lifté au lieu de l'effet latéral droit attendu. Le lifté fait plonger la balle rapidement, puis elle part violemment du côté opposé après le rebond. Il exige une flexion profonde et un timing précis. Il est d'autant plus trompeur qu'il est mélangé à des tomahawks classiques.",
      contactPoint: "Touchez le côté arrière-gauche de la balle avec le revêtement revers, face de raquette presque verticale. À la toute fin du geste de tomahawk, retournez le poignet vers l'intérieur pour brosser vers l'avant et vers la droite. Le sens de l'effet latéral s'inverse par rapport à un tomahawk classique : vous obtenez un effet latéral gauche lifté.",
      returnAdvice: "Fermez la raquette et prenez la balle tôt avec un bloc compact ou un contre-topspin. Visez légèrement le revers du serveur pour contrer l'effet latéral gauche. Ne poussez pas : le lifté enverrait la balle long. Si le sens de l'effet latéral n'est pas clair, visez le milieu pour limiter le risque.",
    },
    "backhand-backspin-short": {
      name: "Revers coupé court",
      description: "Un service revers compact, purement coupé et placé court. Rapide à exécuter, il vous laisse aussitôt prêt pour la balle suivante. Courant à de nombreux niveaux de jeu.",
      contactPoint: "Touchez le dessous de la balle, face de raquette ouverte. Brossez droit vers le bas avec un petit coup de poignet compact, en gardant un geste court et contrôlé. La raquette avance à peine : presque tout le mouvement va vers le bas pour créer un coupé pur.",
      returnAdvice: "Ouvrez la raquette et brossez sous la balle avec une poussette courte, en la prenant tôt. Remettez court, ou poussez long dans les coins si vous voulez allonger. Cherchez à garder la balle basse plutôt qu'à la soulever.",
    },
    "backhand-no-spin-long": {
      name: "Revers rapide long",
      description: "Un service revers rapide dans les coins, avec très peu d'effet. La vitesse pure surprend l'adversaire, surtout en alternance avec des services courts coupés.",
      contactPoint: "Touchez l'arrière-centre de la balle avec une face de raquette presque plate. Poussez à travers la balle d'un geste vif et percutant plutôt que de la brosser. Un contact plein et à plat maximise la vitesse en limitant l'effet. Le bras s'allonge complètement vers la cible.",
      returnAdvice: "Prenez la balle vers le sommet du rebond avec un bloc compact ou un drive contrôlé, en ajoutant un peu de lifté pour le contrôle. Ne vous contentez pas de présenter la raquette : une balle sans effet exige que vous donniez votre propre effet. Placez long dans les coins ou dans le coude.",
    },
    "backhand-sidespin": {
      name: "Revers latéral",
      description: "Service revers avec effet latéral droit et coupé. Le geste compact rend l'effet difficile à lire, et le serveur est déjà en position pour enchaîner en revers.",
      contactPoint: "Touchez le bas-droit de la balle, raquette ouverte. Brossez vers le bas et vers la gauche en travers de la balle avec un mouvement de poignet compact. L'effet latéral vient du mouvement latéral du poignet, et la face ouverte génère le coupé.",
      returnAdvice: "Prenez la balle tôt, raquette ouverte, avec une poussette courte et brossée pour remettre du coupé. Visez légèrement le coup droit du serveur pour contrer l'effet latéral. Si la balle monte, un flip compact fonctionne bien.",
    },
    "hook-heavy-side-short": {
      name: "Crochet latéral appuyé court",
      description: "Un geste en cuillère sous la balle qui produit un effet latéral extrême. La balle part sur le côté au rebond. Très difficile à lire en raison de l'angle inhabituel de la raquette.",
      contactPoint: "Touchez le côté gauche de la balle, face de raquette presque horizontale, en la ramassant par-dessous et autour. Le mouvement en crochet brosse latéralement l'équateur de la balle. Le poignet s'enroule vivement vers l'intérieur pour maximiser la composante latérale de l'effet.",
      returnAdvice: "Inclinez la raquette pour contrer le fort effet latéral et touchez le côté de la balle, pas l'arrière. Une remise en souplesse ou un flip banane est plus sûr qu'une frappe. Visez légèrement le revers du serveur et gardez la balle basse.",
    },
    "hook-backspin-short": {
      name: "Crochet coupé court",
      description: "Service en crochet combinant fort effet latéral et coupé. Cette double composante rend une remise précise très délicate.",
      contactPoint: "Touchez le bas-gauche de la balle, face de raquette ouverte et inclinée sur le côté. Brossez vers le bas et vers la droite dans un arc en cuillère, en prenant à la fois le dessous et le côté de la balle. Ce brossage selon deux angles crée la combinaison de coupé et d'effet latéral.",
      returnAdvice: "Ouvrez davantage la raquette et relevez avec une poussette brossée pour gérer le fort coupé. Visez légèrement le revers du serveur pour contrer l'effet latéral et gardez la balle basse. Évitez de frapper à plat.",
    },
    "hook-fast-long-topspin": {
      name: "Crochet rapide long",
      description: "Une variante agressive du service en crochet qui combine effet latéral droit et lifté, servie vite et long. Le geste en cuillère laisse croire à du coupé, mais après le rebond la balle accélère vers l'avant avec de l'effet latéral. Plus efficace en alternance avec des crochets coupés classiques, pour maximiser la feinte.",
      contactPoint: "Touchez le côté arrière-droit de la balle, face de raquette légèrement fermée. Brossez vers l'avant et vers la gauche dans un arc en cuillère rapide, en prenant la partie haute du côté de la balle. Le geste en crochet masque le contact ascendant qui génère le lifté, tandis que l'accompagnement latéral ajoute l'effet latéral droit.",
      returnAdvice: "Fermez la raquette et jouez un bloc compact ou un contre-topspin en prenant la balle très tôt. Ne poussez pas : le lifté enverrait la balle long. Inclinez légèrement la raquette vers la gauche pour contrer l'effet latéral droit. Un topspin contrôlé au milieu est l'option offensive la plus sûre.",
    },
    "high-toss-backspin": {
      name: "Lancer haut coupé appuyé",
      description: "Le lancer haut donne plus de temps et d'énergie pour un effet appuyé. La balle peut revenir visiblement en arrière après le rebond. Utilisé par de nombreux joueurs de haut niveau pour provoquer des poussettes faibles.",
      contactPoint: "Touchez le tout bas de la balle, face de raquette très ouverte, alors qu'elle retombe du lancer haut. Brossez franchement vers le bas en utilisant la vitesse de chute de la balle pour amplifier le coupé. Le poignet fouette vers le bas au point le plus bas du geste pour un effet maximal.",
      returnAdvice: "Raquette très ouverte, jouez une poussette plus longue et brossée, en relevant davantage. Si la balle est longue, ouvrez avec un topspin contrôlé plutôt qu'une frappe à plat. Privilégiez un coupé appuyé et une remise basse.",
    },
    "high-toss-sidespin": {
      name: "Lancer haut latéral",
      description: "Associe le lancer haut à l'effet latéral et au coupé pour un effet combiné très appuyé. La balle peut s'incurver fortement et freiner sur la table. Exige un timing exceptionnel.",
      contactPoint: "Touchez le bas-gauche de la balle, raquette ouverte, alors qu'elle retombe du lancer haut. Brossez vers le bas et vers la droite dans un arc de pendule, en prenant à la fois le dessous et le côté gauche. La vitesse de chute combinée au coup de poignet produit un coupé extrêmement appuyé avec effet latéral gauche.",
      returnAdvice: "Ouvrez la raquette et brossez vers le haut, légèrement contre l'effet latéral. Visez légèrement le revers du serveur pour compenser la courbe et gardez la balle basse. Une poussette souple et bien coupée est plus sûre qu'une frappe.",
    },
    "ghost-serve": {
      name: "Service fantôme",
      description: "Un service coupé ultra-court devenu légendaire, rendu célèbre par Ma Lin. La balle passe le filet de justesse, rebondit chez l'adversaire puis revient vers le filet (parfois même en le repassant). Il exige un coupé maximal, obtenu grâce à un poignet relâché et un contact fin sous la balle.",
      contactPoint: "Touchez le tout bas de la balle, face de raquette complètement ouverte (presque horizontale). Brossez franchement vers le bas avec un contact extrêmement fin, qui ne fait qu'effleurer la balle. Un poignet souple et relâché est indispensable pour générer le coupé maximal qui fait revenir la balle en arrière.",
      returnAdvice: "Avancez et prenez la balle juste après le rebond, raquette très ouverte, avec un toucher brossé tout en finesse. Remettez court ou poussez long avec un coupé appuyé. N'attendez pas, sinon elle reviendra dans le filet.",
    },
    "fast-long-surprise-fh": {
      name: "Rapide long dans le coup droit",
      description: "Un service rapide et soudain dans le coin coup droit de l'adversaire, avec un contact proche d'un drive lifté. Plus efficace glissé après une série de services courts : l'effet de surprise est l'arme principale.",
      contactPoint: "Touchez l'arrière de la balle, raquette légèrement fermée. Traversez la balle d'un geste rapide et à plat, en brossant légèrement vers le haut pour ajouter du lifté. L'accent est mis sur la vitesse et l'énergie vers l'avant plutôt que sur l'effet : contact plein et extension rapide du bras.",
      returnAdvice: "Fermez la raquette et jouez un bloc compact ou un contre-topspin en prenant la balle tôt. Ne poussez pas. Placez long dans le revers ou au milieu pour réduire l'angle.",
    },
    "fast-long-surprise-bh": {
      name: "Rapide long dans le revers",
      description: "Service rapide dans le coin revers, avec un contact proche d'un drive lifté. Efficace contre un adversaire trop près de la table ou qui s'est déjà engagé sur une remise courte.",
      contactPoint: "Touchez l'arrière de la balle, raquette légèrement fermée, côté revers. Traversez la balle d'une frappe rapide et compacte, en brossant légèrement vers le haut. La prise revers ferme naturellement la raquette et ajoute une touche de lifté à cette trajectoire rapide et tendue.",
      returnAdvice: "Jouez un bloc ou un drive revers compact, raquette légèrement fermée. Prenez la balle tôt et gardez-la basse. Placez long au milieu ou en plein coup droit pour neutraliser l'angle.",
    },
    "pendulum-corkspin": {
      name: "Pendule tire-bouchon",
      description: "Un service pendule à l'axe de rotation gyroscopique, en tire-bouchon. La balle peut flotter en vol et rebondir de façon moins prévisible, ce qui complique une remise propre.",
      contactPoint: "Touchez le côté arrière-gauche de la balle, raquette fermée. Brossez vers l'avant et autour de la balle dans un mouvement en crochet, comme si vous l'enveloppiez avec la raquette. Le poignet fouette vers l'intérieur au contact pour créer l'axe gyroscopique : l'effet s'enfonce dans la balle au lieu d'être purement latéral ou coupé.",
      returnAdvice: "Observez le rebond et prenez la balle tôt avec un angle de raquette neutre pour absorber le flottement. Un bloc contrôlé ou une remise roulée au milieu est l'option la plus sûre. Ajustez-vous après le premier saut de la balle plutôt que de forcer un angle large.",
    },
    "backhand-elbow": {
      name: "Revers dans le coude",
      description: "Un service revers à vitesse moyenne qui vise directement le coude de l'adversaire. L'effet latéral droit courbe la balle et crée l'hésitation entre coup droit et revers.",
      contactPoint: "Touchez l'arrière-droit de la balle, raquette légèrement ouverte, en position revers. Brossez latéralement vers la gauche et légèrement vers le bas. L'effet latéral vient du mouvement latéral du poignet, et le léger angle vers le bas ajoute juste assez de coupé pour garder la balle basse.",
      returnAdvice: "Bougez les pieds et décidez tôt ; ne tendez pas le bras. Si la balle est longue, jouez un topspin ou un drive contrôlé en relevant davantage pour compenser le coupé. Visez long dans le coude ou légèrement le coup droit du serveur pour contrer l'effet latéral.",
    },
    "high-toss-no-spin": {
      name: "Lancer haut sans effet",
      description: "Imite de près le lancer haut coupé appuyé, mais sans aucun effet. L'adversaire qui s'attend à un coupé extrême peut pousser la balle long ou haut. Exige un excellent toucher de balle.",
      contactPoint: "Touchez l'arrière-centre de la balle avec une face presque plate, malgré l'apparence ouverte. La raquette descend comme pour produire un coupé appuyé, mais touche la balle à plat avec le centre du revêtement au lieu de la brosser. Un contact plein et bref annule l'effet, tandis que l'accompagnement du bras trompe l'adversaire.",
      returnAdvice: "Donnez votre propre effet pour garder le contrôle : flip compact ou poussette, raquette légèrement fermée. Laissez la balle monter un peu et gardez un contact franc. Évitez le simple contact passif, qui fait monter la balle.",
    },
    "chop-backspin-short": {
      name: "Coupé coup droit court",
      description: "Le service le plus fondamental du tennis de table. Coupé pur, sans effet latéral, placé court. C'est le service le plus sûr pour rester bas et court, ce qui le rend très difficile à attaquer. Un choix idéal contre les attaquants qui jouent en topspin.",
      contactPoint: "Touchez le dessous de la balle, face de raquette très ouverte. Coupez droit vers le bas d'un geste simple et net. La raquette brosse sous la balle sans mouvement latéral et produit un coupé pur. Gardez un contact fin pour un effet maximal, ou un peu plus plein pour mieux contrôler le placement.",
      returnAdvice: "Ouvrez la raquette et brossez sous la balle avec une poussette courte, en la prenant tôt. Remettez court ou poussez long avec un bon coupé. Gardez la balle basse plutôt que de la soulever.",
    },
    "chop-no-spin": {
      name: "Faux coupé coup droit",
      description: "Reprend le même geste que le coupé coup droit, mais touche la balle avec très peu d'effet. L'adversaire qui attend un coupé appuyé pousse souvent long ou fait monter la balle, ce qui offre une troisième balle facile.",
      contactPoint: "Touchez l'arrière-centre de la balle avec une face qui paraît ouverte mais qui est en réalité plus verticale que pour la version coupée. Le geste de coupe se poursuit, mais la raquette glisse derrière la balle plutôt que dessous et produit très peu d'effet. L'accompagnement imite la version coupée pour tromper l'adversaire.",
      returnAdvice: "Donnez votre propre effet avec une poussette compacte ou un flip/drive contrôlé. Gardez la raquette légèrement fermée et une trajectoire basse. Évitez le simple contact passif.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Essuie-glace latéral court",
      description: "La raquette balaie la balle horizontalement et produit un effet latéral gauche coupé. Le même geste peut produire n'importe quel effet selon le point de contact dans l'arc, ce qui le rend très difficile à lire. Plus efficace quand il reste bas au-dessus du filet.",
      contactPoint: "Touchez le bas-gauche de la balle alors que la raquette balaie de droite à gauche dans un arc horizontal. Brossez vers le bas et vers la droite en prenant le dessous de la balle au milieu de l'arc. La face ouverte et le point de contact bas combinent coupé et effet latéral gauche.",
      returnAdvice: "Lisez le contact et jouez une poussette courte et brossée, raquette ouverte. Visez légèrement le revers du serveur pour contrer l'effet latéral. Remettez bas et court, sauf si vous pouvez pousser long avec un effet appuyé.",
    },
    "windshield-wiper-topspin": {
      name: "Essuie-glace lifté",
      description: "Même geste d'essuie-glace, mais le contact a lieu à un autre point de l'arc pour produire du lifté au lieu du coupé. L'adversaire qui le lit comme du coupé et pousse envoie la balle long ou haut.",
      contactPoint: "Touchez l'arrière-haut de la balle à la fin de l'arc d'essuie-glace plutôt qu'au milieu. La raquette prend la balle plus tard dans son balayage, là où le mouvement monte et avance. Une face légèrement fermée brosse le dessus de la balle et génère le lifté, tandis que le mouvement latéral ajoute l'effet latéral.",
      returnAdvice: "Ne poussez pas. Fermez la raquette et jouez un bloc ou un contre-topspin tôt. Visez légèrement le revers du serveur pour contrer l'effet latéral et gardez la balle basse.",
    },
    "hidden-serve": {
      name: "Service masqué (illégal)",
      description: "Un service dont le point de contact est volontairement caché derrière le corps ou le bras libre. Il était légal avant le changement de règle du 1er septembre 2002 et se voit encore parfois chez les joueurs loisir.",
      contactPoint: "Le contact varie : le serveur peut produire n'importe quel effet puisque le contact est caché. Le plus souvent, il touche le bas-gauche de la balle, raquette ouverte, pour un latéral-coupé appuyé, mais la dissimulation empêche le relanceur de voir l'angle exact du contact et le sens du brossage.",
      returnAdvice: "Privilégiez le contrôle : partez du principe qu'il s'agit de latéral-coupé et jouez une poussette basse et bien coupée, raquette ouverte. Visez légèrement contre l'effet et gardez la balle basse dans les coins. Si le contact était masqué, demandez un avertissement.",
      legalityNotes: "Illégal selon les règles de l'ITTF depuis le 1er septembre 2002. Du début du service jusqu'à la frappe, la balle ne doit pas être cachée au relanceur, et le bras libre doit être retiré de l'espace entre la balle et le filet. Un service douteux peut valoir un avertissement la première fois ; les services douteux suivants peuvent coûter un point.",
    },
    "finger-spin-serve": {
      name: "Service à effet de doigts (illégal)",
      description: "Le serveur donne de l'effet à la balle avec ses doigts pendant le lancer, au lieu de le créer avec la raquette. Il produit un effet trompeur à partir d'un geste en apparence simple.",
      contactPoint: "L'effet est créé par les doigts pendant le lancer, et non au contact de la raquette. Les doigts font rouler la balle en la lâchant et lui donnent du coupé ou de l'effet latéral avant même que la raquette ne la touche. Le contact de raquette lui-même peut être presque plat, si bien que l'effet semble sortir de nulle part.",
      returnAdvice: "Observez la rotation de la balle au lancer et adaptez l'angle de votre raquette à cet effet. Jouez une poussette souple et bien coupée, raquette ouverte, ou un topspin contrôlé si la balle est longue. Gardez la remise basse.",
      legalityNotes: "Illégal. Le service doit commencer avec la balle posée librement sur la paume ouverte, et le lancer doit être quasi vertical, sans donner d'effet. Faire tourner la balle avec les doigts pendant le lancer enfreint cette règle.",
    },
  },

  motions: {
    pendulum: {
      name: "Pendule",
      description: "Le service le plus courant au tennis de table. La raquette oscille comme un pendule, de droite à gauche (pour un droitier), et génère un effet latéral combiné à du coupé ou du lifté. Très polyvalent : un même geste permet de nombreuses variations d'effet.",
    },
    "reverse-pendulum": {
      name: "Pendule inversé",
      description: "La raquette oscille de gauche à droite (pour un droitier) et produit un effet latéral dans le sens opposé au pendule classique. Moins courant, il est donc plus difficile à lire pour l'adversaire.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Un service où la raquette part vers l'extérieur dans un mouvement de lancer, comme un tomahawk. Il génère un fort effet latéral et peut être combiné à du lifté pour faire gicler la balle au rebond. Populaire dans le jeu asiatique. À noter : la classification varie selon les écoles. L'entraînement chinois le considère généralement comme un service coup droit (le contact se fait sur le revêtement coup droit), tandis que certains entraîneurs occidentaux le classent en revers en raison de la position du corps.",
    },
    "reverse-tomahawk": {
      name: "Tomahawk inversé",
      description: "Commence par le même mouvement de lancer vers l'extérieur qu'un tomahawk classique, mais bascule au dernier instant sur un contact avec la face revers de la raquette, ce qui produit un effet latéral gauche au lieu de droit. Le début de geste identique le rend extrêmement trompeur. Popularisé par Ding Ning et utilisé aussi par Kenta Matsudaira.",
    },
    backhand: {
      name: "Service revers",
      description: "Un service compact exécuté côté revers. Il permet d'enchaîner rapidement sur la balle suivante et reste naturellement trompeur grâce à la position du poignet. Utilisé avec efficacité par de nombreux joueurs européens.",
    },
    "hook-shovel": {
      name: "Crochet / pelle",
      description: "Un service atypique où la raquette ramasse la balle par-dessous d'un mouvement en crochet. Il produit un fort effet latéral combiné à du coupé. Son point de contact inhabituel le rend très difficile à lire.",
    },
    chop: {
      name: "Coupé coup droit",
      description: "Un simple geste de coupe vers le bas, face de raquette ouverte, qui produit un coupé pur sans effet latéral. Le service le plus fondamental du tennis de table : facile à apprendre, facile à garder court et efficace pour empêcher les remises agressives. C'est souvent le premier service enseigné aux débutants.",
    },
    "windshield-wiper": {
      name: "Essuie-glace",
      description: "La raquette balaie horizontalement en arc, comme un essuie-glace, en brossant l'arrière de la balle. Selon l'endroit de l'arc où la balle est touchée, le même geste produit de l'effet latéral, du lifté ou du coupé. Son apparence identique quel que soit l'effet le rend très trompeur. Exige une position basse et large pour être bien exécuté.",
    },
    "high-toss": {
      name: "Pendule à lancer haut",
      description: "Un service pendule avec un lancer de balle haut (généralement 2 à 5 mètres). La hauteur de chute supplémentaire apporte de l'énergie et augmente le potentiel d'effet. Exige un excellent timing, mais produit un effet exceptionnellement appuyé.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Coupé pur",
      description: "Un coupé net qui fait glisser la balle bas et la freine chez l'adversaire. Une poussette mal compensée a tendance à finir dans le filet.",
    },
    "heavy-backspin": {
      name: "Coupé appuyé",
      description: "Coupé maximal. La balle accroche la table et peut même revenir vers le filet. Extrêmement difficile à flipper ou à attaquer en topspin.",
    },
    "pure-topspin": {
      name: "Lifté pur",
      description: "Une rotation vers l'avant qui fait accélérer la balle après le rebond. Souvent utilisé sur les services longs et rapides pour bousculer l'adversaire.",
    },
    "left-side-backspin": {
      name: "Latéral gauche + coupé",
      description: "La combinaison classique du pendule. La balle s'incurve vers la droite du point de vue du serveur et rebondit avec du coupé. Très courante en compétition.",
    },
    "right-side-backspin": {
      name: "Latéral droit + coupé",
      description: "Combinaison du pendule inversé ou du tomahawk. La balle s'incurve vers la gauche du point de vue du serveur. Moins courante, donc plus difficile à lire pour l'adversaire.",
    },
    "left-side-topspin": {
      name: "Latéral gauche + lifté",
      description: "Une combinaison trompeuse : la balle semble coupée mais accélère vers l'avant. Sert à piéger l'adversaire qui s'attend à du coupé.",
    },
    "right-side-topspin": {
      name: "Latéral droit + lifté",
      description: "Combinaison typique du tomahawk, qui fait fortement gicler la balle sur le côté au rebond. Efficace pour préparer une attaque en coup droit.",
    },
    "no-spin": {
      name: "Balle flottante sans effet",
      description: "Une balle morte, avec très peu de rotation. Elle imite le geste d'un service à effet mais produit une balle qui flotte. L'adversaire qui attend de l'effet se trompe complètement de lecture.",
    },
    "pure-left-sidespin": {
      name: "Latéral gauche pur",
      description: "Une forte rotation latérale, sans lifté ni coupé notable. La balle s'incurve nettement en l'air et part sur le côté au rebond.",
    },
    "pure-right-sidespin": {
      name: "Latéral droit pur",
      description: "Une forte rotation latérale dans le sens opposé. Efficace avec les mouvements de pendule inversé et de tomahawk.",
    },
    "light-backspin": {
      name: "Coupé léger",
      description: "Un coupé subtil, difficile à distinguer d'une balle sans effet. La balle flotte un peu plus longtemps qu'une balle morte et laisse l'adversaire hésiter entre poussette et flip.",
    },
    "heavy-left-side-backspin": {
      name: "Latéral gauche appuyé + coupé",
      description: "L'effet combiné maximal du mouvement de pendule. La balle s'incurve, plonge et freine fortement. Le service signature de nombreux joueurs de haut niveau.",
    },
    corkspin: {
      name: "Effet tire-bouchon",
      description: "Un axe de rotation gyroscopique qui rend le rebond imprévisible. La balle semble flotter et changer de direction en plein vol.",
    },
  },

  bounces: {
    "short-low": {
      label: "Court (2e rebond sur la table)",
      secondBouncePosition: "Sur la table, près du filet",
    },
    "short-medium": {
      label: "Court (2e rebond près de la ligne de fond)",
      secondBouncePosition: "Près de la ligne de fond",
    },
    "half-long": {
      label: "Mi-long",
      secondBouncePosition: "Juste sur la ligne de fond : longueur ambiguë",
    },
    "long-medium": {
      label: "Long (profond)",
      secondBouncePosition: "Tomberait bien au-delà de la table",
    },
    "long-high": {
      label: "Long (rapide et profond)",
      secondBouncePosition: "Bien au-delà de la table",
    },
    "deep-long": {
      label: "Long profond (ligne de fond)",
      secondBouncePosition: "Juste sur la ligne de fond adverse. Malgré sa longueur, un service long bien placé gêne l'adversaire et rend une attaque de qualité difficile.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Maximise le potentiel d'effet. Laisse au serveur plus de temps pour se préparer à la balle suivante.",
    },
    medium: {
      tacticalNote: "Équilibre effet et vitesse. Réduit le temps de réaction de l'adversaire tout en gardant le contrôle.",
    },
    fast: {
      tacticalNote: "Bouscule l'adversaire. Sacrifie l'effet au profit de la vitesse pure pour forcer une remise faible ou un ace direct.",
    },
  },

  trajectories: {
    flat: {
      netClearance: "Juste au-dessus du filet (1-3 cm)",
    },
    "low-arc": {
      netClearance: "Trajectoire basse au-dessus du filet (5-15 cm)",
    },
    "high-arc": {
      netClearance: "Trajectoire haute au-dessus du filet (20 cm et plus)",
    },
  },

  tosses: {
    "low-legal": {
      position: "Paume ouverte, balle visible, lancée à ~16 cm de hauteur",
    },
    "medium-legal": {
      position: "Paume ouverte, balle visible, lancée à ~30-50 cm de hauteur",
    },
    "high-legal": {
      position: "Paume ouverte, balle visible, lancée à 2-5 mètres de hauteur",
    },
    "hidden-illegal": {
      position: "Balle cachée derrière le corps ou le bras pendant le lancer : illégal selon les règles de l'ITTF",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Faux coupé",
      description: "Le serveur imite un geste de coupé appuyé mais touche la balle avec très peu d'effet, voire du lifté. L'adversaire attend du coupé et pousse la balle long ou dans le filet.",
      counterplay: "Observez attentivement le point de contact. Si la raquette passe sous la balle, c'est du coupé. Si elle brosse l'arrière, c'est probablement sans effet ou lifté.",
    },
    "same-motion": {
      name: "Même geste, effets variés",
      description: "Plusieurs effets sont produits à partir d'un geste de service identique. L'adversaire ne peut pas distinguer le coupé, le sans-effet et le latéral.",
      counterplay: "Concentrez-vous sur le bruit du contact et la trajectoire de la balle plutôt que sur le mouvement du bras. Entraînez-vous à lire la trajectoire de la balle.",
    },
    "contact-hiding": {
      name: "Dissimulation du point de contact",
      description: "Le serveur utilise la position de son corps ou l'angle de son bras pour masquer le moment et l'angle exacts du contact entre la raquette et la balle.",
      counterplay: "Placez-vous de façon à voir au-delà du corps du serveur. Demandez à l'arbitre de faire respecter les règles de visibilité si le contact est entièrement caché.",
    },
    "wrist-snap": {
      name: "Faux coup de poignet",
      description: "Un coup de poignet rapide suggère un effet appuyé, mais l'angle de la raquette au contact produit beaucoup moins d'effet que prévu.",
      counterplay: "Ne réagissez pas à la seule vitesse du poignet. Concentrez-vous sur le comportement de la balle juste après le rebond.",
    },
    "speed-variation": {
      name: "Variation de vitesse",
      description: "Alterner services rapides et lents avec le même geste pour dérégler le timing et le jeu de jambes de l'adversaire.",
      counterplay: "Restez sur l'avant des pieds, en position d'attente neutre. Lisez tôt la vitesse de la balle et adaptez votre préparation en conséquence.",
    },
    "body-feint": {
      name: "Feinte de corps",
      description: "Le serveur utilise un mouvement d'épaule, de hanche ou de tête pour suggérer un placement ou un sens d'effet différent de celui qu'il joue réellement.",
      counterplay: "Ignorez le langage corporel et concentrez-vous sur la raquette et la balle. Entraînez-vous à lire l'effet à la rotation de la balle plutôt qu'aux mouvements du serveur.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Forcer une remise faible",
      goal: "Pousser l'adversaire à une remise haute ou longue, attaquable en troisième balle.",
    },
    "set-up-fh-attack": {
      name: "Préparer l'attaque en coup droit",
      goal: "Placer le service pour que la remise arrive côté coup droit, en vue d'un topspin ou d'un smash agressif.",
    },
    "prevent-flip": {
      name: "Empêcher le flip",
      goal: "Garder le service assez court et bas pour que l'adversaire ne puisse ni flipper ni attaquer franchement.",
    },
    "force-push": {
      name: "Forcer la poussette",
      goal: "Un coupé appuyé qui oblige l'adversaire à pousser, donnant au serveur l'initiative en troisième balle.",
    },
    "target-elbow": {
      name: "Viser le coude",
      goal: "Viser le coude de l'adversaire (point de bascule entre coup droit et revers) pour créer l'hésitation.",
    },
    "go-for-ace": {
      name: "Chercher l'ace",
      goal: "Un service risqué, conçu pour gagner le point directement grâce à la vitesse, au placement ou à la feinte.",
    },
    "serve-plus-one-fh": {
      name: "Service + 1 en coup droit",
      goal: "Schéma de service conçu pour que la remise attendue puisse être attaquée en coup droit depuis une position préparée.",
    },
    "serve-plus-one-bh": {
      name: "Service + 1 en revers",
      goal: "Schéma de service conçu pour que la remise attendue puisse être attaquée en revers, en frappe ou en topspin.",
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
      label: "Milieu court (coude)",
    },
    "middle-long": {
      label: "Milieu long (coude)",
    },
  },
};
