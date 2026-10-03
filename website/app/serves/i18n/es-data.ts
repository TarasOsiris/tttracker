/**
 * Spanish translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

export interface DataTranslations {
  serves: Record<string, { name: string; description: string; legalityNotes?: string; contactPoint?: string; returnAdvice?: string }>;
  motions: Record<string, { name: string; description: string }>;
  spins: Record<string, { name: string; description: string }>;
  bounces: Record<string, { label: string; secondBouncePosition: string }>;
  speeds: Record<string, { tacticalNote: string }>;
  trajectories: Record<string, { netClearance: string }>;
  tosses: Record<string, { position: string }>;
  deceptions: Record<string, { name: string; description: string; counterplay: string }>;
  tacticalPurposes: Record<string, { name: string; goal: string }>;
  placements: Record<string, { label: string; description?: string }>;
}

export const esData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Péndulo cortado corto",
      description: "El saque de toda la vida. Corto y cortado, con efecto lateral izquierdo, al revés o al centro. Suele provocar un resto de empuje y prepara el ataque de tercera bola.",
      contactPoint: "Golpea la parte inferior trasera de la pelota con la pala abierta. Roza hacia abajo y ligeramente hacia la derecha, dejando que la muñeca acompañe de forma natural el arco del péndulo. Un contacto fino maximiza el cortado, y la terminación lateral añade el efecto lateral.",
      returnAdvice: "Tómala pronto, justo después del bote, con la pala abierta y un empuje corto que roce la pelota para añadir cortado. Déjala corta o empuja largo al revés o al codo del sacador, apuntando un poco contra el efecto lateral. Si se queda alta, un flip controlado es más seguro que levantarla.",
    },
    "pendulum-sidespin-long": {
      name: "Péndulo lateral largo",
      description: "Péndulo rápido a las esquinas con efecto lateral y cortado. La curva dificulta un resto de calidad y te deja la tercera bola a favor.",
      contactPoint: "Golpea la parte trasera izquierda de la pelota con la pala ligeramente cerrada. Roza hacia delante y de lado, con más velocidad y un contacto más grueso que en la versión corta. La muñeca acelera en el contacto para dar más ritmo.",
      returnAdvice: "Si viene larga, separa un paso y haz un topspin o un golpe controlado, levantando un poco más para compensar el cortado. Apunta ligeramente al revés del sacador para contrarrestar el efecto lateral y mantén la bola baja. Si no puedes atacar, un empuje rápido y con mucho efecto es la opción segura.",
    },
    "pendulum-no-spin": {
      name: "Péndulo sin efecto",
      description: "Parece el péndulo cortado, pero la pelota va sin efecto. El rival que empuja esperando cortado suele levantarla.",
      contactPoint: "Golpea la parte trasera central de la pelota con la pala casi plana. La pala se desliza por detrás de la pelota en lugar de rozarla por debajo, con un contacto breve y grueso. El brazo y la muñeca terminan como si dieran efecto, pero el ángulo plano anula el giro.",
      returnAdvice: "Pon tú el efecto para controlar: un empuje compacto o un flip o golpe controlado con la pala un poco cerrada. Evita el toque muerto, que tiende a levantar la bola. Mantenla baja y colócala en las esquinas.",
    },
    "pendulum-topspin": {
      name: "Péndulo liftado",
      description: "Parece cortado, pero en realidad lleva liftado. La pelota sale hacia delante al botar y sorprende al rival que intenta empujarla.",
      contactPoint: "Golpea la parte trasera superior de la pelota con la pala ligeramente cerrada. Roza hacia arriba y hacia delante, tomando la mitad superior de la pelota. El movimiento de péndulo disimula el roce ascendente: la muñeca gira sobre la pelota en el contacto para generar liftado mientras el brazo sigue de lado.",
      returnAdvice: "No empujes. Cierra la pala y bloquea o haz un contratopspin pronto, antes de que la pelota salte. Apunta ligeramente al revés del sacador para contrarrestar el efecto lateral y mantén la bola baja.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Péndulo inverso corto",
      description: "Saque corto con efecto lateral derecho y cortado. La curva contraria a la del péndulo normal cuesta de leer, sobre todo a rivales acostumbrados a saques estándar.",
      contactPoint: "Golpea la parte inferior trasera de la pelota con la pala abierta. Roza hacia abajo y hacia la izquierda (al contrario que en el péndulo normal), con un movimiento de muñeca hacia fuera. En el contacto, la pala cruza por delante del cuerpo de izquierda a derecha.",
      returnAdvice: "Tómala pronto con la pala abierta y un empuje corto que roce la pelota para añadir cortado. Apunta ligeramente a la derecha del sacador para compensar el lateral derecho y mantenla baja. Si se queda alta, un flip suave es más seguro que levantarla.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Péndulo inverso liftado largo",
      description: "Saque largo con efecto lateral derecho y liftado. La pelota se curva hacia la izquierda del sacador y sale de lado al botar, lo que dificulta atacarla con calidad.",
      contactPoint: "Golpea la parte trasera derecha de la pelota con la pala ligeramente cerrada. Roza hacia arriba y hacia la izquierda. El movimiento de péndulo inverso genera el lateral derecho y el componente ascendente añade liftado.",
      returnAdvice: "Cierra la pala y bloquea, golpea o haz un contratopspin, tomándola pronto. Apunta ligeramente a la derecha del sacador para contrarrestar el efecto lateral. Si haces topspin, roza por encima de la pelota y mantén una parábola baja.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk largo",
      description: "Saque largo y agresivo con mucho efecto lateral derecho y liftado. La pelota sale con fuerza hacia un lado después de botar y mete prisa al rival.",
      contactPoint: "Golpea la parte trasera derecha de la pelota con la pala casi vertical. Roza hacia delante y bruscamente hacia la izquierda, como si lanzaras un hacha. La muñeca da un golpe seco hacia fuera en el contacto y genera un fuerte lateral derecho, con el liftado que aporta el arco ascendente del movimiento.",
      returnAdvice: "Tómala pronto con la pala cerrada y un bloqueo o golpe compacto. Apunta ligeramente a la derecha del sacador para contrarrestar el efecto lateral y mantén la bola baja. Si tienes tiempo, un topspin controlado es la mejor opción.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk cortado corto",
      description: "Un tomahawk corto y cortado, poco habitual. El movimiento inusual combinado con una colocación corta hace que al rival le cueste mucho leerlo y restarlo con agresividad.",
      contactPoint: "Golpea la parte inferior de la pelota con la pala abierta e inclinada de lado. Roza hacia abajo y hacia la izquierda siguiendo el arco del tomahawk. El contacto fino por debajo genera el cortado y el movimiento lateral añade el efecto lateral. Un golpe de muñeca más suave y lento mantiene la pelota corta.",
      returnAdvice: "Usa la pala abierta y un empuje corto que roce la pelota para mantenerla baja. Apunta ligeramente a la derecha del sacador para contrarrestar el efecto lateral. Déjala corta, salvo que puedas empujar largo con buen efecto.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Tomahawk inverso largo",
      description: "El saque emblemático de Ding Ning. Empieza igual que un tomahawk normal, pero en el último instante cambia al contacto con el revés de la pala y produce lateral izquierdo con liftado en vez del lateral derecho esperado. Por el liftado, la pelota cae rápido y, tras el bote, sale con fuerza hacia el lado contrario. Exige flexionar mucho las piernas y un timing preciso. Es más engañoso cuando se mezcla con tomahawks normales.",
      contactPoint: "Golpea la parte trasera izquierda de la pelota con la goma del revés y la pala casi vertical. En el último momento del movimiento de tomahawk, gira la muñeca hacia dentro para rozar hacia delante y hacia la derecha. Así se invierte el sentido del efecto lateral respecto al tomahawk normal y se obtiene lateral izquierdo con liftado.",
      returnAdvice: "Cierra la pala y tómala pronto con un bloqueo compacto o un contratopspin. Apunta ligeramente al revés del sacador para contrarrestar el lateral izquierdo. No empujes: el liftado mandará la bola larga. Si no tienes claro hacia dónde va el efecto lateral, apunta al centro para reducir riesgos.",
    },
    "backhand-backspin-short": {
      name: "Revés cortado corto",
      description: "Saque de revés compacto, con cortado puro y colocado corto. Se ejecuta rápido y te deja listo enseguida para la siguiente bola. Habitual en todos los niveles.",
      contactPoint: "Golpea la parte inferior de la pelota con la pala abierta. Roza recto hacia abajo con un golpe de muñeca corto, manteniendo el movimiento compacto y controlado. La pala apenas avanza: casi todo el movimiento es hacia abajo para crear cortado puro.",
      returnAdvice: "Abre la pala y roza la pelota por debajo con un empuje corto, tomándola pronto. Déjala corta o, si quieres alargar, empuja largo a las esquinas. Prioriza que vaya baja antes que levantarla.",
    },
    "backhand-no-spin-long": {
      name: "Revés rápido largo",
      description: "Saque de revés rápido a las esquinas y casi sin efecto. La velocidad pilla desprevenido al rival, sobre todo si se mezcla con saques cortos cortados.",
      contactPoint: "Golpea la parte trasera central de la pelota con la pala casi plana. Empuja la pelota con un golpe rápido y seco en lugar de rozarla. Un contacto grueso y plano da la máxima velocidad con el mínimo efecto. El brazo se estira del todo hacia el objetivo.",
      returnAdvice: "Tómala cerca del punto más alto del bote con un bloqueo compacto o un golpe controlado, añadiendo un poco de liftado para controlar. No te limites a poner la pala: contra un saque sin efecto, el efecto lo tienes que poner tú. Colócala larga a las esquinas o al codo.",
    },
    "backhand-sidespin": {
      name: "Revés lateral",
      description: "Saque de revés con efecto lateral derecho y cortado. El movimiento compacto hace que el efecto cueste de leer, y el sacador ya está colocado para seguir con el revés.",
      contactPoint: "Golpea la parte inferior derecha de la pelota con la pala abierta. Roza hacia abajo y hacia la izquierda con un movimiento de muñeca compacto. El efecto lateral sale del movimiento lateral de la muñeca y la pala abierta genera el cortado.",
      returnAdvice: "Tómala pronto con la pala abierta y un empuje corto que roce la pelota para añadir cortado. Apunta ligeramente a la derecha del sacador para contrarrestar el efecto lateral. Si sube, un flip compacto funciona bien.",
    },
    "hook-heavy-side-short": {
      name: "Gancho lateral fuerte corto",
      description: "Un movimiento en forma de cuchara por debajo de la pelota que produce un efecto lateral extremo. La pelota sale de lado al botar. Muy difícil de leer por el ángulo poco habitual de la pala.",
      contactPoint: "Golpea el lado izquierdo de la pelota con la pala casi horizontal, recogiéndola por debajo y por el costado. El movimiento de gancho roza la pelota de lado, a la altura de su ecuador. La muñeca se cierra bruscamente hacia dentro para maximizar el efecto lateral.",
      returnAdvice: "Inclina la pala para compensar el fuerte efecto lateral y golpea el costado de la pelota, no la parte de atrás. Un toque suave o un flip de plátano es más seguro que un golpe fuerte. Apunta ligeramente al revés del sacador y mantén la bola baja.",
    },
    "hook-backspin-short": {
      name: "Gancho cortado corto",
      description: "Saque de gancho que combina un fuerte efecto lateral con cortado. Esa doble rotación hace muy difícil restarlo con precisión.",
      contactPoint: "Golpea la parte inferior izquierda de la pelota con la pala abierta e inclinada de lado. Roza hacia abajo y hacia la derecha con un arco en forma de cuchara, tomando a la vez la parte de abajo y el costado de la pelota. Ese roce en doble ángulo combina cortado y efecto lateral.",
      returnAdvice: "Abre más la pala y levanta con un empuje que roce la pelota para controlar el fuerte cortado. Apunta ligeramente al revés del sacador para contrarrestar el efecto lateral y mantén la bola baja. Evita golpear plano.",
    },
    "hook-fast-long-topspin": {
      name: "Gancho rápido largo",
      description: "Variante agresiva del saque de gancho que combina lateral derecho con liftado, rápida y larga. El movimiento de cuchara parece de cortado, pero la pelota sale hacia delante con efecto lateral después de botar. Es más eficaz si se mezcla con los ganchos cortados clásicos para maximizar el engaño.",
      contactPoint: "Golpea la parte trasera derecha de la pelota con la pala ligeramente cerrada. Roza hacia delante y hacia la izquierda con un arco de cuchara rápido, tomando la parte superior lateral de la pelota. El movimiento de gancho disimula el contacto ascendente que genera el liftado, y la terminación lateral añade el lateral derecho.",
      returnAdvice: "Cierra la pala y responde con un bloqueo compacto o un contratopspin, tomándola muy pronto. No empujes: el liftado mandará la bola larga. Inclina la pala un poco hacia la izquierda para compensar el lateral derecho. Un topspin controlado al centro es la opción de ataque más segura.",
    },
    "high-toss-backspin": {
      name: "Lanzamiento alto con mucho cortado",
      description: "El lanzamiento alto da más tiempo y más energía para generar mucho efecto. Tras el bote, la pelota puede llegar a volver hacia atrás de forma visible. Muchos jugadores de élite lo usan para forzar empujes flojos.",
      contactPoint: "Golpea la parte más baja de la pelota con la pala muy abierta cuando cae del lanzamiento alto. Roza con fuerza hacia abajo, aprovechando la energía de la caída para multiplicar el cortado. La muñeca da un golpe seco hacia abajo en el punto más bajo del movimiento para lograr el máximo efecto.",
      returnAdvice: "Usa la pala muy abierta y un empuje más largo, rozando la pelota y levantando un poco más. Si es larga, abre con un topspin controlado en lugar de golpear plano. Prioriza un resto con mucho cortado y que pase bajo.",
    },
    "high-toss-sidespin": {
      name: "Lanzamiento alto lateral",
      description: "Combina el lanzamiento alto con efecto lateral y cortado para lograr un efecto combinado muy fuerte. La pelota puede curvarse mucho y frenarse en la mesa. Exige un timing excepcional.",
      contactPoint: "Golpea la parte inferior izquierda de la pelota con la pala abierta cuando cae del lanzamiento alto. Roza hacia abajo y hacia la derecha con un arco de péndulo, tomando a la vez la parte de abajo y el lado izquierdo. La energía de la caída y el golpe de muñeca producen un cortado durísimo con efecto lateral izquierdo.",
      returnAdvice: "Abre la pala y roza hacia arriba y un poco contra el efecto lateral. Apunta ligeramente al revés del sacador para compensar la curva y mantén la bola baja. Un empuje suave y con efecto es más seguro que un golpe fuerte.",
    },
    "ghost-serve": {
      name: "Saque fantasma",
      description: "Un legendario saque ultracorto y cortado que hizo famoso Ma Lin. La pelota pasa la red por muy poco, bota en el campo del rival y vuelve hacia la red (a veces incluso la cruza de vuelta). Exige el máximo cortado, generado con una muñeca suelta y un contacto muy fino en la parte inferior de la pelota.",
      contactPoint: "Golpea la parte más baja de la pelota con la pala totalmente abierta (casi horizontal). Roza bruscamente hacia abajo con un contacto finísimo: la pala apenas acaricia la pelota. Una muñeca suelta y relajada es imprescindible para generar el máximo cortado, que es lo que hace volver la pelota.",
      returnAdvice: "Entra a la mesa y tómala justo después del bote, con la pala muy abierta y un toque delicado que roce la pelota. Déjala corta o empuja largo con mucho cortado. No esperes, o volverá a la red.",
    },
    "fast-long-surprise-fh": {
      name: "Rápido largo a la derecha",
      description: "Un saque rápido y por sorpresa a la esquina de derecha del rival, con un contacto de golpe liftado. Es más eficaz después de una serie de saques cortos. La sorpresa es su arma principal.",
      contactPoint: "Golpea la parte trasera de la pelota con la pala ligeramente cerrada. Atraviesa la pelota con un golpe rápido y plano, rozando un poco hacia arriba para añadir liftado. Lo que importa es la velocidad y la energía hacia delante, no el efecto: contacto grueso y extensión rápida del brazo.",
      returnAdvice: "Cierra la pala y responde con un bloqueo compacto o un contratopspin, tomándola pronto. No empujes. Colócala larga al revés o al centro para reducir el ángulo.",
    },
    "fast-long-surprise-bh": {
      name: "Rápido largo al revés",
      description: "Saque rápido a la esquina de revés con un contacto de golpe liftado. Eficaz contra rivales que se colocan demasiado cerca de la mesa o que ya esperaban un saque corto.",
      contactPoint: "Golpea la parte trasera de la pelota con la pala ligeramente cerrada, desde el lado del revés. Atraviesa la pelota con un golpe rápido y compacto, rozando un poco hacia arriba. La empuñadura de revés cierra la pala de forma natural y añade un toque de liftado a una trayectoria rápida y tensa.",
      returnAdvice: "Responde con un bloqueo o golpe de revés compacto y la pala ligeramente cerrada. Tómala pronto y mantenla baja. Colócala larga al centro o abierta a la derecha para neutralizar el ángulo.",
    },
    "pendulum-corkspin": {
      name: "Péndulo sacacorchos",
      description: "Saque de péndulo con un eje de giro giroscópico, en sacacorchos. La pelota puede oscilar en el aire y botar de forma menos previsible, lo que dificulta un resto limpio.",
      contactPoint: "Golpea la parte trasera izquierda de la pelota con la pala cerrada. Roza hacia delante y alrededor de la pelota con un movimiento envolvente, como si la pala la rodeara. La muñeca se cierra con un golpe seco en el contacto para crear el eje giroscópico: el efecto entra en la pelota en lugar de ser solo lateral o hacia abajo.",
      returnAdvice: "Observa el bote y golpea pronto, con un ángulo de pala neutro para absorber la oscilación. Lo más seguro es un bloqueo controlado o un golpe suave al centro. Ajústate después del primer salto en lugar de forzar un ángulo abierto.",
    },
    "backhand-elbow": {
      name: "Revés al codo",
      description: "Saque de revés a velocidad media dirigido directamente al codo del rival. El lateral derecho añade curva y genera dudas entre restar de derecha o de revés.",
      contactPoint: "Golpea la parte trasera derecha de la pelota con la pala ligeramente abierta, desde la posición de revés. Roza de lado hacia la izquierda y un poco hacia abajo. El efecto lateral sale del movimiento lateral de la muñeca, y el ligero ángulo descendente añade el cortado justo para mantener la bola baja.",
      returnAdvice: "Mueve los pies y decide pronto; no estires el brazo para llegar. Si es larga, haz un topspin o un golpe controlado levantando un poco más por el cortado. Apunta largo al codo o ligeramente a la derecha del sacador para contrarrestar el efecto lateral.",
    },
    "high-toss-no-spin": {
      name: "Lanzamiento alto sin efecto",
      description: "Imita a la perfección el saque de lanzamiento alto con mucho cortado, pero va sin efecto. El rival, que espera un cortado extremo, puede empujar la bola larga o alta. Requiere mucho tacto.",
      contactPoint: "Golpea la parte trasera central de la pelota con la pala casi plana, aunque parezca abierta. La pala baja como si fuera a dar mucho cortado, pero golpea la pelota con el centro plano de la goma en lugar de rozarla. Un contacto grueso y breve anula el efecto, mientras el brazo termina el movimiento para engañar.",
      returnAdvice: "Pon tú el efecto para controlar: un flip compacto o un empuje con la pala ligeramente cerrada. Deja que suba un poco y golpéala limpia. Evita el toque muerto, que levanta la bola.",
    },
    "chop-backspin-short": {
      name: "Cortado de derecha corto",
      description: "El saque más básico del tenis de mesa. Cortado puro, sin efecto lateral y colocado corto. Es el saque más fácil de mantener bajo y corto, lo que dificulta mucho el ataque del rival. Ideal contra jugadores agresivos de topspin.",
      contactPoint: "Golpea la parte inferior de la pelota con la pala muy abierta. Corta recto hacia abajo con un golpe sencillo y limpio. La pala roza la pelota por debajo sin movimiento lateral y produce cortado puro. Haz el contacto fino para lograr el máximo efecto o algo más grueso para controlar la colocación.",
      returnAdvice: "Abre la pala y roza la pelota por debajo con un empuje corto, tomándola pronto. Déjala corta o empuja largo con buen cortado. Prioriza que vaya baja antes que levantarla.",
    },
    "chop-no-spin": {
      name: "Cortado de derecha sin efecto",
      description: "Usa el mismo movimiento de corte que la versión cortada, pero golpea la pelota casi sin efecto. El rival, que espera mucho cortado, suele empujar largo o levantar la bola, y te deja una tercera bola fácil.",
      contactPoint: "Golpea la parte trasera central de la pelota con la pala aparentemente abierta, pero en realidad más vertical que en la versión cortada. El movimiento de corte continúa, pero la pala se desliza por detrás de la pelota en lugar de por debajo, con muy poco efecto. La terminación imita la del saque cortado para engañar.",
      returnAdvice: "Pon tú el efecto con un empuje compacto o un flip o golpe controlado. Mantén la pala ligeramente cerrada y la trayectoria baja. Evita el toque muerto.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Limpiaparabrisas lateral corto",
      description: "La pala barre la pelota en horizontal y produce lateral izquierdo con cortado. El mismo movimiento puede dar cualquier efecto según el punto del arco donde se golpee, así que es muy difícil de leer. Es más eficaz si pasa bajo sobre la red.",
      contactPoint: "Golpea la parte inferior izquierda de la pelota mientras la pala barre de derecha a izquierda en un arco horizontal. Roza hacia abajo y hacia la derecha, tomando la parte de abajo de la pelota en mitad del arco. La pala abierta y el contacto bajo combinan cortado con lateral izquierdo.",
      returnAdvice: "Lee el contacto y responde con la pala abierta y un empuje corto que roce la pelota. Apunta ligeramente al revés del sacador para contrarrestar el efecto lateral. Mantenla baja y corta, salvo que puedas empujar largo con mucho efecto.",
    },
    "windshield-wiper-topspin": {
      name: "Limpiaparabrisas liftado",
      description: "El mismo movimiento de limpiaparabrisas, pero con el contacto en otro punto del arco para producir liftado en lugar de cortado. El rival que lo lee como cortado y empuja mandará la bola larga o alta.",
      contactPoint: "Golpea la parte trasera superior de la pelota al final del arco, no en el centro. La pala toma la pelota más tarde en su barrido, cuando el movimiento ya va hacia arriba y hacia delante. Con la pala ligeramente cerrada, roza por encima de la pelota para generar liftado, mientras el movimiento lateral añade efecto lateral.",
      returnAdvice: "No empujes. Cierra la pala y bloquea o haz un contratopspin pronto. Apunta ligeramente al revés del sacador para contrarrestar el efecto lateral y mantén la bola baja.",
    },
    "hidden-serve": {
      name: "Saque oculto (ilegal)",
      description: "Un saque en el que el punto de contacto se esconde a propósito detrás del cuerpo o del brazo libre. Era legal hasta el cambio de reglamento del 1 de septiembre de 2002 y aún se ve a veces en el juego aficionado.",
      contactPoint: "El contacto varía: como está oculto, el sacador puede dar cualquier efecto. Normalmente se golpea la parte inferior izquierda de la pelota con la pala abierta para dar mucho lateral-cortado, pero al estar oculto el restador no puede ver ni el ángulo exacto del contacto ni la dirección del roce.",
      returnAdvice: "Prioriza el control: da por hecho que lleva lateral-cortado y usa la pala abierta con un empuje bajo y con efecto. Apunta un poco contra el efecto y mantén la bola baja a las esquinas. Si no has podido ver el contacto, pide al árbitro que advierta al sacador.",
      legalityNotes: "Ilegal según el reglamento de la ITTF desde el 1 de septiembre de 2002. Desde el inicio del saque hasta que se golpea, la pelota no puede ocultarse al restador, y el brazo libre debe retirarse del espacio entre la pelota y la red. Un saque dudoso puede recibir una advertencia la primera vez; los siguientes saques dudosos pueden costar un punto.",
    },
    "finger-spin-serve": {
      name: "Saque con efecto de dedos (ilegal)",
      description: "El sacador da efecto a la pelota con los dedos durante el lanzamiento, en lugar de generarlo con la pala. Produce un efecto engañoso con un movimiento aparentemente sencillo.",
      contactPoint: "El efecto lo generan los dedos durante el lanzamiento, no el contacto con la pala. Los dedos hacen girar la pelota al soltarla y le dan cortado o efecto lateral antes de que la pala la toque. El contacto con la pala puede ser casi plano, así que el efecto parece salir de la nada.",
      returnAdvice: "Fíjate en cómo gira la pelota en el lanzamiento y ajusta el ángulo de la pala a ese efecto. Usa la pala abierta y un empuje suave y con efecto, o un topspin controlado si es larga. Mantén el resto bajo.",
      legalityNotes: "Ilegal. El saque debe empezar con la pelota descansando libremente sobre la palma abierta, y el lanzamiento debe ser casi vertical y sin dar efecto. Dar efecto a la pelota con los dedos durante el lanzamiento incumple esta norma.",
    },
  },

  motions: {
    pendulum: {
      name: "Péndulo",
      description: "El saque más habitual del tenis de mesa. La pala oscila como un péndulo de derecha a izquierda (en diestros) y genera efecto lateral combinado con cortado o liftado. Muy versátil: con el mismo movimiento se consiguen muchas variantes de efecto.",
    },
    "reverse-pendulum": {
      name: "Péndulo inverso",
      description: "La pala oscila de izquierda a derecha (en diestros) y produce efecto lateral en sentido contrario al del péndulo normal. Es menos habitual, por lo que al rival le cuesta más leerlo.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Un saque en el que la pala sale hacia fuera con un gesto de lanzamiento, como quien lanza un hacha. Genera mucho efecto lateral y puede combinarse con liftado para que la pelota salte al botar. Popular en el estilo de juego asiático. Nota: no hay acuerdo sobre si es de derecha o de revés; la escuela china suele considerarlo un saque de derecha (el contacto es con la goma de la derecha), mientras que algunos entrenadores occidentales lo clasifican como de revés por la postura.",
    },
    "reverse-tomahawk": {
      name: "Tomahawk inverso",
      description: "Empieza con el mismo gesto de lanzamiento hacia fuera que un tomahawk normal, pero en el último instante golpea con el lado del revés de la pala y produce lateral izquierdo en vez de derecho. Como el inicio del movimiento es idéntico, resulta muy engañoso. Lo popularizó Ding Ning y también lo usa Kenta Matsudaira.",
    },
    backhand: {
      name: "Saque de revés",
      description: "Un saque compacto que se hace desde el lado del revés. Permite pasar rápido a la siguiente bola y engaña de forma natural por la posición de la muñeca. Muchos jugadores europeos lo usan con gran eficacia.",
    },
    "hook-shovel": {
      name: "Gancho",
      description: "Un saque poco convencional en el que la pala recoge la pelota por debajo con un movimiento de gancho, como si fuera una cuchara. Produce mucho efecto lateral con cortado. El punto de contacto inusual lo hace muy difícil de leer.",
    },
    chop: {
      name: "Cortado de derecha",
      description: "Un sencillo movimiento de corte hacia abajo con la pala abierta que produce cortado puro, sin efecto lateral. El saque más básico del tenis de mesa: fácil de aprender, fácil de mantener corto y eficaz para evitar restos agresivos. Suele ser el primer saque que se enseña a los principiantes.",
    },
    "windshield-wiper": {
      name: "Limpiaparabrisas",
      description: "La pala barre en horizontal describiendo un arco, como un limpiaparabrisas, y roza la parte de atrás de la pelota. Según el punto del arco donde se golpee, el mismo movimiento produce efecto lateral, liftado o cortado. Como siempre parece igual, sea cual sea el efecto, es muy engañoso. Requiere una postura baja y con las piernas abiertas.",
    },
    "high-toss": {
      name: "Péndulo con lanzamiento alto",
      description: "Un saque de péndulo con un lanzamiento alto de la pelota (normalmente de 2 a 5 metros). La mayor altura de caída aporta energía y aumenta el efecto posible. Exige un timing excelente, pero produce un efecto excepcionalmente fuerte.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Cortado puro",
      description: "Rotación hacia atrás limpia que hace que la pelota pase baja y se frene en el campo del rival. Si se empuja sin compensar, el resto suele ir a la red.",
    },
    "heavy-backspin": {
      name: "Cortado fuerte",
      description: "La máxima rotación hacia atrás. La pelota se agarra a la mesa y puede incluso volver hacia la red. Muy difícil de atacar con un flip o un topspin.",
    },
    "pure-topspin": {
      name: "Liftado puro",
      description: "Rotación hacia delante que hace que la pelota salga disparada al botar. Se usa mucho en saques rápidos y largos para meter prisa al rival.",
    },
    "left-side-backspin": {
      name: "Lateral izquierdo + cortado",
      description: "La combinación clásica del péndulo. Desde el punto de vista del sacador, la pelota se curva hacia la derecha y bota con rotación hacia atrás. Muy habitual en competición.",
    },
    "right-side-backspin": {
      name: "Lateral derecho + cortado",
      description: "La combinación del péndulo inverso o del tomahawk. Desde el punto de vista del sacador, la pelota se curva hacia la izquierda. Es menos habitual, por lo que al rival le cuesta más leerla.",
    },
    "left-side-topspin": {
      name: "Lateral izquierdo + liftado",
      description: "Una combinación engañosa: la pelota parece cortada, pero sale hacia delante. Sirve para sorprender al rival que espera rotación hacia atrás.",
    },
    "right-side-topspin": {
      name: "Lateral derecho + liftado",
      description: "Combinación típica del tomahawk que hace que la pelota salte con fuerza hacia un lado. Eficaz para preparar el ataque de derecha.",
    },
    "no-spin": {
      name: "Sin efecto (flotante)",
      description: "Una bola muerta, casi sin rotación. Imita el gesto de un saque con efecto, pero la pelota flota. El rival que espera efecto la lee completamente mal.",
    },
    "pure-left-sidespin": {
      name: "Lateral izquierdo puro",
      description: "Fuerte rotación lateral sin apenas liftado ni cortado. La pelota se curva mucho en el aire y sale de lado al botar.",
    },
    "pure-right-sidespin": {
      name: "Lateral derecho puro",
      description: "Fuerte rotación lateral en sentido contrario. Eficaz con el péndulo inverso y el tomahawk.",
    },
    "light-backspin": {
      name: "Cortado suave",
      description: "Una rotación hacia atrás sutil, difícil de distinguir de una bola sin efecto. La pelota flota algo más que una bola muerta y deja al rival dudando entre empujar o hacer flip.",
    },
    "heavy-left-side-backspin": {
      name: "Lateral izquierdo fuerte + cortado",
      description: "El máximo efecto combinado que da el péndulo. La pelota se curva, cae y se frena de golpe. El saque característico de muchos jugadores de élite.",
    },
    corkspin: {
      name: "Efecto sacacorchos",
      description: "Un eje de giro giroscópico que hace imprevisible el bote. La pelota parece oscilar y cambiar de dirección en pleno vuelo.",
    },
  },

  bounces: {
    "short-low": {
      label: "Corto (2.º bote en la mesa)",
      secondBouncePosition: "En la mesa, cerca de la red",
    },
    "short-medium": {
      label: "Corto (2.º bote cerca de la línea de fondo)",
      secondBouncePosition: "Cerca de la línea de fondo de la mesa",
    },
    "half-long": {
      label: "Medio largo",
      secondBouncePosition: "Justo en la línea de fondo: longitud ambigua",
    },
    "long-medium": {
      label: "Largo (profundo)",
      secondBouncePosition: "Caería bastante más allá de la mesa",
    },
    "long-high": {
      label: "Largo (rápido y profundo)",
      secondBouncePosition: "Muy lejos de la mesa",
    },
    "deep-long": {
      label: "Largo al fondo (línea de fondo)",
      secondBouncePosition: "Justo en la línea de fondo del rival. Aunque sea largo, un saque profundo bien colocado deja al rival sin espacio y le dificulta atacar con calidad.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Permite el máximo efecto. Da al sacador más tiempo para prepararse para la siguiente bola.",
    },
    medium: {
      tacticalNote: "Equilibra efecto y velocidad. Reduce el tiempo de reacción del rival sin perder control.",
    },
    fast: {
      tacticalNote: "Mete prisa al rival. Sacrifica efecto por velocidad pura para forzar un resto flojo o ganar el punto directamente.",
    },
  },

  trajectories: {
    flat: {
      netClearance: "Rozando la red (1-3 cm)",
    },
    "low-arc": {
      netClearance: "Parábola baja sobre la red (5-15 cm)",
    },
    "high-arc": {
      netClearance: "Parábola alta sobre la red (más de 20 cm)",
    },
  },

  tosses: {
    "low-legal": {
      position: "Palma abierta, pelota visible, lanzada unos 16 cm hacia arriba",
    },
    "medium-legal": {
      position: "Palma abierta, pelota visible, lanzada unos 30-50 cm hacia arriba",
    },
    "high-legal": {
      position: "Palma abierta, pelota visible, lanzada de 2 a 5 metros hacia arriba",
    },
    "hidden-illegal": {
      position: "Pelota oculta tras el cuerpo o el brazo durante el lanzamiento: ilegal según el reglamento de la ITTF",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Falso cortado",
      description: "El sacador imita el gesto de un saque con mucho cortado, pero golpea la pelota casi sin efecto o con liftado. El rival espera cortado y empuja la bola larga o a la red.",
      counterplay: "Fíjate bien en el punto de contacto. Si la pala se desliza por debajo de la pelota, es cortado. Si roza la parte de atrás, probablemente va sin efecto o liftada.",
    },
    "same-motion": {
      name: "Mismo movimiento, distinto efecto",
      description: "Con un movimiento de saque idéntico se dan distintos efectos. El rival no puede distinguir entre cortado, sin efecto y lateral.",
      counterplay: "Fíjate en el sonido del contacto y en la trayectoria de la pelota, no en el movimiento del brazo. Entrena la lectura del vuelo de la pelota.",
    },
    "contact-hiding": {
      name: "Ocultar el punto de contacto",
      description: "El sacador usa la posición del cuerpo o el ángulo del brazo para ocultar el momento y el ángulo exactos en que la pala toca la pelota.",
      counterplay: "Colócate de forma que puedas ver más allá del cuerpo del sacador. Si el contacto queda totalmente oculto, pide al árbitro que aplique las normas de visibilidad.",
    },
    "wrist-snap": {
      name: "Falso golpe de muñeca",
      description: "Un golpe de muñeca rápido sugiere mucho efecto, pero el ángulo de la pala en el contacto genera mucho menos efecto del esperado.",
      counterplay: "No reacciones solo a la velocidad de la muñeca. Fíjate en cómo se comporta la pelota justo después del bote.",
    },
    "speed-variation": {
      name: "Cambio de velocidad",
      description: "Alternar saques rápidos y lentos con el mismo movimiento para descolocar el timing y el juego de pies del rival.",
      counterplay: "Mantente activo, en una posición de espera neutral. Lee pronto la velocidad de la pelota y ajusta tu preparación.",
    },
    "body-feint": {
      name: "Finta corporal",
      description: "El sacador mueve el hombro, la cadera o la cabeza para sugerir una colocación o un efecto distintos de los que realmente da.",
      counterplay: "Ignora el lenguaje corporal y céntrate en la pala y la pelota. Entrena para leer el efecto por la rotación de la pelota, no por los movimientos del sacador.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Forzar un resto flojo",
      goal: "Que el rival devuelva una bola alta o larga que se pueda atacar en la tercera bola.",
    },
    "set-up-fh-attack": {
      name: "Preparar el ataque de derecha",
      goal: "Colocar el saque para que el resto llegue a la derecha y se pueda atacar con un topspin o un remate.",
    },
    "prevent-flip": {
      name: "Evitar el flip",
      goal: "Que el saque sea lo bastante corto y bajo como para que el rival no pueda hacer flip ni atacarlo.",
    },
    "force-push": {
      name: "Obligar a empujar",
      goal: "Mucho cortado para que el rival tenga que empujar y el sacador tome la iniciativa en la tercera bola.",
    },
    "target-elbow": {
      name: "Atacar el codo",
      goal: "Apuntar al codo del rival (el punto de cruce) para que dude entre derecha y revés.",
    },
    "go-for-ace": {
      name: "Buscar el punto directo",
      goal: "Un saque arriesgado pensado para ganar el punto directamente por velocidad, colocación o engaño.",
    },
    "serve-plus-one-fh": {
      name: "Saque + 1 de derecha",
      goal: "Un patrón de saque pensado para que el resto esperado se pueda atacar de derecha desde una posición preparada.",
    },
    "serve-plus-one-bh": {
      name: "Saque + 1 de revés",
      goal: "Un patrón de saque pensado para que el resto esperado se pueda atacar con un golpe o un topspin de revés.",
    },
  },

  placements: {
    "fh-short": {
      label: "Derecha corto",
    },
    "bh-short": {
      label: "Revés corto",
    },
    "fh-long": {
      label: "Derecha largo",
    },
    "bh-long": {
      label: "Revés largo",
    },
    "middle-short": {
      label: "Centro corto (codo)",
    },
    "middle-long": {
      label: "Centro largo (codo)",
    },
  },
};
