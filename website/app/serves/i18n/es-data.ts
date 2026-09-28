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
      name: "Péndulo Cortado Corto",
      description: "El saque más básico. Cortado corto con efecto lateral izquierdo al revés o al centro. A menudo provoca una devolución en empuje y prepara el ataque de tercera bola.",
      contactPoint: "Contacta la parte inferior-trasera de la pelota con la pala abierta. Cepilla hacia abajo y ligeramente hacia la derecha, dejando que la muñeca oscile naturalmente a través del arco del péndulo. Un contacto fino maximiza el cortado mientras el seguimiento lateral añade efecto lateral.",
      returnAdvice: "Tómala temprano tras el bote con la pala abierta y un empuje corto y cepillado para añadir cortado. Manténla corta o empuja largo al revés o al codo del servidor, apuntando ligeramente contra el lateral. Si queda alta, un flip controlado es más seguro que levantar.",
    },
    "pendulum-sidespin-long": {
      name: "Péndulo Lateral Largo",
      description: "Péndulo rápido a las esquinas con efecto lateral y cortado. La curva puede dificultar la devolución con calidad, preparando una oportunidad de tercera bola.",
      contactPoint: "Contacta la parte trasera-izquierda de la pelota con la pala ligeramente cerrada. Cepilla hacia adelante y lateralmente a través de la pelota con más velocidad y un contacto más grueso que la versión corta. La muñeca acelera a través del contacto para generar más ritmo.",
      returnAdvice: "Si viene larga, retrocede y usa un topspin/drive controlado con más lift para el cortado. Apunta ligeramente al revés del servidor para contrarrestar el lateral y mantenerla baja. Un empuje rápido y con efecto es la opción segura si no puedes atacar.",
    },
    "pendulum-no-spin": {
      name: "Péndulo Sin Efecto",
      description: "Parece el péndulo cortado pero la pelota flota sin efecto. Los oponentes que empujan esperando cortado suelen levantar la pelota.",
      contactPoint: "Contacta la parte trasera-central de la pelota con la cara de la pala casi plana. La pala se desliza detrás de la pelota en lugar de cepillar por debajo, haciendo solo un contacto breve y grueso. El brazo y la muñeca continúan como si produjeran efecto, pero el ángulo plano elimina la rotación.",
      returnAdvice: "Añade tu propio efecto para controlar: empuje compacto o flip/drive controlado con la pala un poco cerrada. Evita el toque muerto, suele subir. Manténla baja y coloca a las esquinas.",
    },
    "pendulum-topspin": {
      name: "Péndulo Liftado",
      description: "Disfrazado de cortado pero en realidad tiene liftado. La pelota salta hacia adelante en el bote, atrapando a los oponentes que intentan empujarla.",
      contactPoint: "Contacta la parte trasera-superior de la pelota con la pala ligeramente cerrada. Cepilla hacia arriba y hacia adelante a través de la pelota, atrapando la mitad superior. El movimiento de péndulo disfraza el cepillado ascendente — la muñeca rota sobre la pelota al contacto para generar liftado mientras el brazo continúa lateralmente.",
      returnAdvice: "No empujes. Cierra la pala y bloquea o contra-topspinea temprano antes del kick. Apunta ligeramente al revés del servidor para contrarrestar el lateral y mantenerla baja.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Péndulo Inverso Corto",
      description: "Saque corto con efecto lateral derecho y cortado. La curva opuesta al péndulo regular puede ser difícil de leer, especialmente para oponentes acostumbrados a saques estándar.",
      contactPoint: "Contacta la parte inferior-trasera de la pelota con la pala abierta. Cepilla hacia abajo y hacia la izquierda (opuesto al péndulo regular), usando el movimiento del dorso de la muñeca. La pala se mueve de izquierda a derecha cruzando el cuerpo en el momento del contacto.",
      returnAdvice: "Tómala temprano con la pala abierta y un empuje corto y cepillado para añadir cortado. Apunta ligeramente a la derecha del servidor para compensar el lateral derecho y mantenerla baja. Si queda alta, un flip suave es más seguro que levantar.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Péndulo Inverso Liftado Largo",
      description: "Saque largo con efecto lateral derecho y liftado. La pelota curva hacia la izquierda del servidor y salta lateralmente en el bote, dificultando el ataque con calidad.",
      contactPoint: "Contacta la parte trasera-derecha de la pelota con la pala ligeramente cerrada. Cepilla hacia arriba y hacia la izquierda a través de la pelota. El movimiento del péndulo inverso genera efecto lateral derecho mientras el componente ascendente añade liftado.",
      returnAdvice: "Cierra la pala y bloquea, golpea o contra-topspinea, tomándola temprano. Apunta ligeramente a la derecha del servidor para contrarrestar el lateral. Si haces loop, roza por encima y mantén un arco bajo.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk Largo",
      description: "Saque largo agresivo con fuerte efecto lateral derecho y liftado. La pelota salta con fuerza hacia un lado después de botar y apura al oponente.",
      contactPoint: "Contacta la parte trasera-derecha de la pelota con la cara de la pala casi vertical. Cepilla hacia adelante y bruscamente hacia la izquierda en un movimiento de lanzamiento. La muñeca chasquea hacia afuera en el contacto, generando un potente efecto lateral derecho con liftado por el arco ascendente del swing.",
      returnAdvice: "Tómala temprano con la pala cerrada y un bloqueo o drive compacto. Apunta ligeramente a la derecha del servidor para contrarrestar el lateral y mantenerla baja. Si tienes tiempo, un topspin controlado es la mejor opción.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk Cortado Corto",
      description: "Un raro tomahawk corto con cortado. El movimiento inusual combinado con la colocación corta hace que sea muy difícil de leer y devolver agresivamente para los oponentes.",
      contactPoint: "Contacta la parte inferior de la pelota con la cara de la pala abierta e inclinada lateralmente. Cepilla hacia abajo y hacia la izquierda en el arco del tomahawk. Un contacto fino bajo la pelota produce cortado mientras el movimiento lateral añade efecto lateral. Un chasqueo de muñeca más suave y lento mantiene la pelota corta.",
      returnAdvice: "Usa la pala abierta y un empuje corto y cepillado para mantenerla baja. Apunta ligeramente a la derecha del servidor para contrarrestar el lateral. Manténla corta a menos que puedas empujar largo con buen efecto.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Tomahawk Inverso Largo",
      description: "El saque emblemático de Ding Ning. Comienza idénticamente a un tomahawk normal pero cambia al contacto con el revés en el último instante, produciendo efecto lateral izquierdo con liftado en vez del esperado lateral derecho. La pelota cae rápidamente por el liftado y salta fuerte hacia el lado opuesto tras botar. Requiere una flexión profunda y un timing preciso. Más engañoso cuando se mezcla con saques tomahawk normales.",
      contactPoint: "Contacta la parte trasera-izquierda de la pelota usando la goma de revés, con la cara de la pala casi vertical. En el último momento del swing de tomahawk, gira la muñeca hacia adentro para cepillar hacia adelante y hacia la derecha. Esto invierte la dirección del efecto lateral respecto al tomahawk normal, produciendo efecto lateral izquierdo con liftado.",
      returnAdvice: "Cierra la pala y tómala temprano con un bloqueo compacto o contra-topspin. Apunta ligeramente al revés del servidor para contrarrestar el efecto lateral izquierdo. No empujes — el liftado la mandará larga. Si la dirección del lateral no está clara, apunta al centro para reducir riesgo.",
    },
    "backhand-backspin-short": {
      name: "Revés Cortado Corto",
      description: "Un saque compacto de revés con cortado puro, colocado corto. Rápido de ejecutar y permite preparación inmediata para la siguiente bola. Común en muchos niveles de juego.",
      contactPoint: "Contacta la parte inferior de la pelota con la cara de la pala abierta. Cepilla recto hacia abajo con un golpe de muñeca compacto, manteniendo el golpe corto y controlado. La pala apenas se mueve hacia adelante — casi todo el movimiento es descendente para crear cortado puro.",
      returnAdvice: "Abre la pala y cepilla por debajo con un empuje corto, contactando temprano. Manténla corta o empuja largo a las esquinas si quieres alargar. Prioriza mantenerla baja en vez de levantar.",
    },
    "backhand-no-spin-long": {
      name: "Revés Rápido Largo",
      description: "Un saque de revés rápido a las esquinas con mínimo efecto. La velocidad pura atrapa a los oponentes desprevenidos, especialmente cuando se mezcla con saques cortos cortados.",
      contactPoint: "Contacta la parte trasera-central de la pelota con la cara de la pala casi plana. Empuja a través de la pelota con un movimiento rápido y de golpe seco en lugar de cepillar. Un contacto grueso y plano maximiza la velocidad mientras minimiza el efecto. El brazo se extiende completamente hacia el objetivo.",
      returnAdvice: "Tómala cerca del punto más alto con un bloqueo compacto o drive controlado, añadiendo un poco de topspin. No solo pongas la pala; los saques sin efecto necesitan tu propio efecto. Colócala profunda a las esquinas o al codo.",
    },
    "backhand-sidespin": {
      name: "Revés Lateral",
      description: "Saque de revés con efecto lateral derecho y cortado. El movimiento compacto hace que el efecto sea difícil de leer, y el servidor ya está en posición para un seguimiento de revés.",
      contactPoint: "Contacta la parte inferior-derecha de la pelota con la pala abierta. Cepilla hacia abajo y hacia la izquierda a través de la pelota con un movimiento compacto de muñeca. El efecto lateral proviene del movimiento lateral de la muñeca mientras la cara abierta genera cortado.",
      returnAdvice: "Tómala temprano con la pala abierta y un empuje corto y cepillado para añadir cortado. Apunta ligeramente a la derecha del servidor para contrarrestar el lateral. Si sube, un flip compacto funciona bien.",
    },
    "hook-heavy-side-short": {
      name: "Gancho Lateral Pesado Corto",
      description: "Un movimiento de cuchara bajo la pelota que produce efecto lateral extremo. La pelota salta lateralmente en el bote. Muy difícil de leer debido al ángulo inusual de la paleta.",
      contactPoint: "Contacta el lado izquierdo de la pelota con la cara de la pala casi horizontal, recogiendo por debajo y alrededor. El movimiento de gancho cepilla lateralmente a través del ecuador de la pelota. La muñeca se curva bruscamente hacia adentro para maximizar el componente de efecto lateral.",
      returnAdvice: "Ajusta el ángulo para contrarrestar el lateral fuerte y contacta el costado de la pelota, no la parte trasera. Un toque suave o un flip tipo banana es más seguro que pegar fuerte. Apunta ligeramente al revés del servidor y mantenla baja.",
    },
    "hook-backspin-short": {
      name: "Gancho Cortado Corto",
      description: "Saque de gancho con efecto lateral pesado combinado con cortado. Los componentes de doble efecto hacen que devolver con precisión sea muy desafiante.",
      contactPoint: "Contacta la parte inferior-izquierda de la pelota con la cara de la pala abierta e inclinada lateralmente. Cepilla hacia abajo y hacia la derecha en un arco de cuchara, atrapando simultáneamente la parte inferior y el costado de la pelota. Este cepillado de doble ángulo crea la combinación de cortado y efecto lateral.",
      returnAdvice: "Abre más la pala y levanta con un empuje cepillado para manejar el cortado pesado. Apunta ligeramente al revés del servidor para contrarrestar el lateral y mantenerla baja. Evita golpear plano.",
    },
    "hook-fast-long-topspin": {
      name: "Gancho Rápido Largo",
      description: "Una variante agresiva del saque gancho que combina efecto lateral derecho con liftado, servido rápido y profundo. El movimiento de cuchara parece producir cortado, pero la pelota salta hacia adelante con lateral tras botar. Más efectivo cuando se mezcla con saques gancho cortados tradicionales para maximizar el engaño.",
      contactPoint: "Contacta la parte trasera-derecha de la pelota con la cara de la pala ligeramente cerrada. Cepilla hacia adelante y hacia la izquierda en un arco rápido de cuchara, atrapando la parte superior-lateral de la pelota. El movimiento de gancho disfraza el contacto ascendente que genera liftado, mientras el seguimiento lateral añade efecto lateral derecho.",
      returnAdvice: "Cierra la pala y usa un bloqueo compacto o contra-topspin, tomándola muy temprano. No empujes — el liftado mandará la pelota larga. Inclina la pala ligeramente a la izquierda para contrarrestar el lateral derecho. Un loop de topspin controlado al centro es la opción de ataque más segura.",
    },
    "high-toss-backspin": {
      name: "Lanzamiento Alto Cortado Pesado",
      description: "El lanzamiento alto puede añadir tiempo y energía para un efecto pesado. La pelota puede girar visiblemente hacia atrás después de botar. Usado por muchos jugadores de élite para forzar empujes débiles.",
      contactPoint: "Contacta la parte más baja de la pelota con la cara de la pala bien abierta mientras cae del lanzamiento alto. Cepilla bruscamente hacia abajo, usando la energía gravitacional de la pelota en caída para amplificar el cortado. La muñeca chasquea hacia abajo en el punto más bajo del swing para máximo efecto.",
      returnAdvice: "Usa la pala muy abierta y un empuje más largo y cepillado con extra lift. Si viene larga, abre con un loop controlado en lugar de un golpe plano. Prioriza mucho cortado y poca altura.",
    },
    "high-toss-sidespin": {
      name: "Lanzamiento Alto Lateral",
      description: "Combina el lanzamiento alto con efecto lateral y cortado para un efecto combinado pesado. La pelota puede curvarse dramáticamente y frenar en la mesa. Requiere un tiempo de ejecución excepcional.",
      contactPoint: "Contacta la parte inferior-izquierda de la pelota con la cara de la pala abierta mientras cae del lanzamiento alto. Cepilla hacia abajo y hacia la derecha en un arco de péndulo, atrapando tanto la parte inferior como el lado izquierdo. La energía gravitacional combinada con el chasqueo de muñeca produce un cortado extremadamente pesado con efecto lateral izquierdo.",
      returnAdvice: "Abre la pala y cepilla hacia arriba y ligeramente contra el lateral. Apunta ligeramente al revés del servidor para contrarrestar la curva y mantenerla baja. Un empuje suave y con efecto es más seguro que golpear fuerte.",
    },
    "ghost-serve": {
      name: "Saque Fantasma",
      description: "Un saque ultra-corto con cortado que apenas cruza la red y bota dos veces (o más) en el lado del oponente. La pelota puede literalmente rodar de vuelta hacia la red. Un favorito del público en eventos profesionales.",
      contactPoint: "Contacta la parte más baja de la pelota con la cara de la pala completamente abierta (casi horizontal). Cepilla bruscamente hacia abajo con un toque extremadamente fino y rozante — la pala apenas besa la pelota. Una muñeca suelta y relajada es esencial para generar el máximo cortado que hace que la pelota gire hacia atrás.",
      returnAdvice: "Entra y tómala justo tras el bote con la pala muy abierta y un toque cepillado delicado. Manténla corta o empuja profundo con mucho cortado. No esperes o volverá hacia la red.",
    },
    "fast-long-surprise-fh": {
      name: "Rápido Largo a la Derecha",
      description: "Un saque rápido repentino a la esquina de derecha del oponente con contacto de liftado/drive. Más efectivo cuando se mezcla después de una serie de saques cortos. El elemento sorpresa es el arma principal.",
      contactPoint: "Contacta la parte trasera de la pelota con la cara de la pala ligeramente cerrada. Golpea a través de la pelota con un golpe rápido y plano, cepillando ligeramente hacia arriba para añadir liftado. El enfoque es la velocidad y la energía hacia adelante en lugar del efecto — contacto grueso con una extensión rápida del brazo.",
      returnAdvice: "Cierra la pala y usa un bloqueo compacto o contra-topspin, tomándola temprano. No empujes. Colócala profunda al revés o al centro para reducir el ángulo.",
    },
    "fast-long-surprise-bh": {
      name: "Rápido Largo al Revés",
      description: "Saque rápido dirigido a la esquina de revés con contacto de liftado/drive. Efectivo contra oponentes que están demasiado cerca de la mesa o que se han comprometido a recibir corto.",
      contactPoint: "Contacta la parte trasera de la pelota con la cara de la pala ligeramente cerrada desde el lado de revés. Golpea a través de la pelota con un golpe rápido y compacto, cepillando ligeramente hacia arriba. La empuñadura de revés cierra naturalmente la pala, añadiendo un toque de liftado a la trayectoria rápida y plana.",
      returnAdvice: "Usa un bloqueo/drive de revés compacto con la pala ligeramente cerrada. Tómala temprano y mantenla baja. Colócala profunda al centro o abierta a la derecha para neutralizar el ángulo.",
    },
    "pendulum-corkspin": {
      name: "Péndulo Sacacorchos",
      description: "Un saque péndulo con un eje de efecto giroscópico sacacorchos. La pelota puede oscilar en vuelo y botar de forma menos predecible, dificultando devoluciones limpias.",
      contactPoint: "Contacta la parte trasera-izquierda de la pelota con la pala cerrada. Cepilla hacia adelante y alrededor de la pelota en un movimiento envolvente, como si la pala rodeara la pelota. La muñeca chasquea hacia adentro en el contacto para crear el eje giroscópico — el efecto entra en la pelota en lugar de ir puramente lateral o hacia abajo.",
      returnAdvice: "Mira el bote y contacta temprano, usando un ángulo neutral para absorber el bamboleo. Un bloqueo controlado o un rollo al medio es lo más seguro. Ajusta después del primer kick en lugar de forzar un ángulo abierto.",
    },
    "backhand-elbow": {
      name: "Revés al Codo",
      description: "Un saque de revés a velocidad media dirigido directamente al codo del oponente. El efecto lateral derecho añade curva, creando indecisión sobre si usar derecha o revés.",
      contactPoint: "Contacta la parte trasera-derecha de la pelota con la cara de la pala ligeramente abierta desde la posición de revés. Cepilla lateralmente hacia la izquierda y ligeramente hacia abajo. El efecto lateral proviene del movimiento lateral de la muñeca, mientras el ligero ángulo descendente añade suficiente cortado para mantener la pelota baja.",
      returnAdvice: "Mueve los pies y decide temprano; no alcances. Si viene larga, usa un topspin/drive controlado con extra lift por el cortado. Apunta profundo al codo o ligeramente a la derecha del servidor para contrarrestar el lateral.",
    },
    "high-toss-no-spin": {
      name: "Lanzamiento Alto Sin Efecto",
      description: "Imita de cerca el saque de lanzamiento alto con cortado pesado pero no lleva efecto. Los oponentes que esperan cortado extremo pueden empujar la pelota larga o alta. Requiere gran tacto.",
      contactPoint: "Contacta la parte trasera-central de la pelota con la cara de la pala casi plana a pesar de su apariencia abierta. La pala se mueve hacia abajo como si produjera cortado pesado pero contacta la pelota con el centro plano de la goma en lugar de cepillar. Un contacto grueso y breve elimina el efecto mientras el brazo continúa con un seguimiento engañoso.",
      returnAdvice: "Añade tu propio efecto para controlar: flip compacto o empuje con la pala ligeramente cerrada. Deja que suba un poco y contacta limpio. Evita el toque muerto que se eleva.",
    },
    "chop-backspin-short": {
      name: "Chop de Derecha Cortado Corto",
      description: "El saque más fundamental del tenis de mesa. Cortado puro sin efecto lateral, colocado corto. El saque más seguro para mantener bajo y corto, haciéndolo muy difícil de atacar para los oponentes. Una opción ideal contra loopers agresivos.",
      contactPoint: "Contacta la parte inferior de la pelota con la cara de la pala bien abierta. Corta recto hacia abajo con un golpe simple y limpio. La pala cepilla por debajo de la pelota sin movimiento lateral, produciendo cortado puro. Mantén el contacto fino para máximo efecto o ligeramente más grueso para controlar la colocación.",
      returnAdvice: "Abre la pala y cepilla por debajo con un empuje corto, contactando temprano. Manténla corta o empuja profunda con buen cortado. Manténla baja en vez de levantar.",
    },
    "chop-no-spin": {
      name: "Chop de Derecha Sin Efecto",
      description: "Usa el mismo movimiento de chop que la versión cortada pero contacta la pelota con mínimo efecto. Los oponentes que esperan cortado pesado suelen empujar largo o levantar la pelota, dando una tercera bola fácil.",
      contactPoint: "Contacta la parte trasera-central de la pelota con la cara de la pala que parece abierta pero en realidad es más vertical que la versión cortada. El movimiento de chop continúa pero la pala se desliza detrás de la pelota en lugar de por debajo, produciendo mínimo efecto. El seguimiento imita la versión cortada para el engaño.",
      returnAdvice: "Añade tu propio efecto con un empuje compacto o un flip/drive controlado. Mantén la pala ligeramente cerrada y la trayectoria baja. Evita el toque muerto.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Limpiaparabrisas Lateral Corto",
      description: "La paleta barre horizontalmente a través de la pelota, produciendo efecto lateral izquierdo con cortado. El movimiento idéntico puede producir cualquier tipo de efecto según el punto de contacto en el arco, haciéndolo muy difícil de leer. Más efectivo cuando se mantiene bajo sobre la red.",
      contactPoint: "Contacta la parte inferior-izquierda de la pelota mientras la pala barre de derecha a izquierda en un arco horizontal. Cepilla hacia abajo y hacia la derecha a través de la pelota, atrapando la parte inferior en la mitad del arco del limpiaparabrisas. La cara abierta de la pala y el punto bajo de contacto combinan cortado con efecto lateral izquierdo.",
      returnAdvice: "Lee el contacto y usa la pala abierta con un empuje corto y cepillado. Apunta ligeramente al revés del servidor para contrarrestar el lateral. Manténla baja y corta salvo que puedas empujar profundo con mucho efecto.",
    },
    "windshield-wiper-topspin": {
      name: "Limpiaparabrisas Liftado",
      description: "Mismo movimiento de limpiaparabrisas pero el contacto se hace en un punto diferente del arco para producir liftado en lugar de cortado. Los oponentes que lo leen como cortado y empujan enviarán la pelota larga o alta.",
      contactPoint: "Contacta la parte trasera-superior de la pelota al final del arco del limpiaparabrisas en lugar de en la mitad. La pala atrapa la pelota más tarde en su barrido, donde el movimiento va hacia arriba y hacia adelante. Una cara de pala ligeramente cerrada cepilla por encima y sobre la parte superior de la pelota, generando liftado mientras el movimiento lateral añade efecto lateral.",
      returnAdvice: "No empujes. Cierra la pala y bloquea o contra-topspinea temprano. Apunta ligeramente al revés del servidor para contrarrestar el lateral y mantenerla baja.",
    },
    "hidden-serve": {
      name: "Saque Oculto (Ilegal)",
      description: "Un saque donde el punto de contacto se oculta deliberadamente detrás del cuerpo o brazo libre. Esto era legal antes del cambio de regla del 1 de septiembre de 2002 y todavía se ve a veces en el juego amateur.",
      contactPoint: "El contacto varía — el servidor puede producir cualquier tipo de efecto ya que el contacto está oculto. Normalmente se golpea la parte inferior-izquierda de la pelota con la cara de la pala abierta para un lateral-cortado pesado, pero la ocultación significa que el receptor no puede ver el ángulo exacto de contacto ni la dirección del cepillado.",
      returnAdvice: "Prioriza el control: asume lateral-cortado y usa la pala abierta con un empuje bajo y con efecto. Apunta ligeramente contra el efecto y manténla baja a las esquinas. Si el contacto estuvo oculto, pide advertencia.",
      legalityNotes: "Ilegal según las reglas de la ITTF desde el 1 de sept. de 2002. Desde el inicio del saque hasta que se golpea, la pelota no debe ocultarse del receptor, y el brazo libre debe retirarse del espacio entre la pelota y la red. Un saque poco claro puede recibir una advertencia en la primera ocurrencia; saques poco claros posteriores pueden costar un punto.",
    },
    "finger-spin-serve": {
      name: "Saque con Efecto de Dedos (Ilegal)",
      description: "El servidor usa sus dedos para dar efecto a la pelota durante el lanzamiento en lugar de generar efecto con la paleta. Produce un efecto engañoso desde un movimiento aparentemente simple.",
      contactPoint: "El efecto lo generan los dedos durante el lanzamiento, no en el contacto con la pala. Los dedos ruedan la pelota al soltarla, imprimiendo cortado o efecto lateral antes de que la pala siquiera toque la pelota. El contacto de la pala puede ser casi plano, haciendo que el efecto parezca surgir de la nada.",
      returnAdvice: "Observa la rotación en el lanzamiento y ajusta el ángulo de la pala a ese efecto. Usa la pala abierta y un empuje suave y con efecto, o un loop controlado si viene larga. Mantén la devolución baja.",
      legalityNotes: "Ilegal. El saque debe comenzar con la pelota reposando libremente en la palma abierta, y el lanzamiento debe ser casi vertical sin dar efecto. Dar efecto a la pelota con los dedos durante el lanzamiento viola este requisito.",
    },
  },

  motions: {
    pendulum: {
      name: "Péndulo",
      description: "El saque más común en el tenis de mesa. La paleta oscila como un péndulo de derecha a izquierda (para diestros), generando efecto lateral combinado con cortado o liftado. Muy versátil con muchas variaciones de efecto posibles desde el mismo movimiento.",
    },
    "reverse-pendulum": {
      name: "Péndulo Inverso",
      description: "La paleta oscila de izquierda a derecha (para diestros), produciendo efecto lateral en la dirección opuesta al péndulo estándar. Menos común, lo que dificulta la lectura para los oponentes.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Un saque donde la paleta se lanza hacia afuera en un movimiento de lanzamiento, como un tomahawk. Genera un fuerte efecto lateral y puede combinarse con liftado para un efecto de salto. Popular en el estilo de juego asiático. Nota: la clasificación de mano varía — el entrenamiento chino típicamente considera esto un saque de derecha (el contacto es en la goma de derecha), mientras que algunos entrenadores occidentales lo clasifican como revés basándose en la postura.",
    },
    "reverse-tomahawk": {
      name: "Tomahawk Inverso",
      description: "Comienza con el mismo movimiento de lanzamiento que un tomahawk normal, pero cambia al contacto con el revés de la paleta en el último instante, produciendo efecto lateral izquierdo en vez de derecho. El movimiento inicial idéntico lo hace extremadamente engañoso. Popularizado por Ding Ning y también usado por Kenta Matsudaira.",
    },
    backhand: {
      name: "Saque de Revés",
      description: "Un saque compacto realizado desde el lado de revés. Permite una transición rápida a la siguiente bola y es naturalmente engañoso debido a la posición de la muñeca. Usado efectivamente por muchos jugadores europeos.",
    },
    "hook-shovel": {
      name: "Gancho / Pala",
      description: "Un saque poco convencional donde la paleta recoge bajo la pelota con un movimiento de gancho. Produce efecto lateral pesado con cortado. El punto de contacto inusual lo hace muy difícil de leer.",
    },
    chop: {
      name: "Chop de Derecha",
      description: "Un movimiento simple de corte hacia abajo con la cara de la paleta abierta que produce cortado puro sin efecto lateral. El saque más fundamental del tenis de mesa — fácil de aprender, fácil de mantener corto y efectivo para prevenir devoluciones agresivas. A menudo el primer saque que se enseña a principiantes.",
    },
    "windshield-wiper": {
      name: "Limpiaparabrisas",
      description: "La paleta barre horizontalmente en un arco como un limpiaparabrisas, rozando la parte trasera de la pelota. Dependiendo de dónde en el arco se contacte la pelota, el mismo movimiento puede producir efecto lateral, liftado o cortado. La apariencia idéntica sin importar el efecto lo hace altamente engañoso. Requiere una postura baja y amplia para una ejecución adecuada.",
    },
    "high-toss": {
      name: "Péndulo con Lanzamiento Alto",
      description: "Un saque péndulo con un lanzamiento alto de la pelota (típicamente 2-5 metros). La altura adicional de caída añade energía gravitacional, aumentando el potencial de efecto. Requiere un tiempo de ejecución excelente pero produce un efecto excepcionalmente pesado.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Cortado Puro",
      description: "Rotación inferior limpia que causa que la pelota se deslice bajo y frene en el lado del oponente. Las devoluciones tienden a ir a la red si se empujan sin compensar.",
    },
    "heavy-backspin": {
      name: "Cortado Pesado",
      description: "Máxima rotación inferior. La pelota agarra la superficie de la mesa y puede incluso rebotar de vuelta hacia la red. Extremadamente difícil de flipar o liftear agresivamente.",
    },
    "pure-topspin": {
      name: "Liftado Puro",
      description: "Rotación hacia adelante que causa que la pelota salte hacia adelante después de botar. A menudo usado en saques rápidos largos para apurar al oponente.",
    },
    "left-side-backspin": {
      name: "Lateral Izquierdo + Cortado",
      description: "La combinación clásica del péndulo. La pelota curva hacia la derecha desde la perspectiva del servidor y bota con rotación inferior. Muy común en juego competitivo.",
    },
    "right-side-backspin": {
      name: "Lateral Derecho + Cortado",
      description: "Combinación de péndulo inverso o tomahawk. La pelota curva hacia la izquierda desde la perspectiva del servidor. Menos común, por lo que es más difícil de leer para los oponentes.",
    },
    "left-side-topspin": {
      name: "Lateral Izquierdo + Liftado",
      description: "Una combinación engañosa donde la pelota parece tener cortado pero salta hacia adelante. Se usa para atrapar a los oponentes desprevenidos cuando esperan rotación inferior.",
    },
    "right-side-topspin": {
      name: "Lateral Derecho + Liftado",
      description: "Combinación estilo tomahawk que produce un fuerte bote lateral. Efectivo para preparar ataques de derecha.",
    },
    "no-spin": {
      name: "Flotante Sin Efecto",
      description: "Una pelota muerta con mínima rotación. Imita el movimiento de un saque con efecto pero produce un efecto flotante. Los oponentes que esperan efecto leerán mal la pelota por completo.",
    },
    "pure-left-sidespin": {
      name: "Lateral Izquierdo Puro",
      description: "Fuerte rotación lateral sin rotación superior/inferior significativa. La pelota curva dramáticamente en el aire y salta lateralmente en el bote.",
    },
    "pure-right-sidespin": {
      name: "Lateral Derecho Puro",
      description: "Fuerte rotación lateral en la dirección opuesta. Efectivo con movimientos de péndulo inverso y tomahawk.",
    },
    "light-backspin": {
      name: "Cortado Ligero",
      description: "Rotación inferior sutil que es difícil de distinguir del sin efecto. La pelota flota ligeramente más que una pelota muerta, atrapando a los oponentes entre empujar y flipar.",
    },
    "heavy-left-side-backspin": {
      name: "Lateral Izquierdo Pesado + Cortado",
      description: "Máximo efecto combinado del movimiento péndulo. La pelota curva, baja y frena agresivamente. El saque característico de muchos jugadores de élite.",
    },
    corkspin: {
      name: "Efecto Sacacorchos",
      description: "Un eje de efecto giroscópico que produce un comportamiento de bote impredecible. La pelota parece oscilar y cambiar de dirección en pleno vuelo.",
    },
  },

  bounces: {
    "short-low": {
      label: "Corto (2do bote en la mesa)",
      secondBouncePosition: "En la mesa cerca de la red",
    },
    "short-medium": {
      label: "Corto (2do bote cerca de la línea de fondo)",
      secondBouncePosition: "Cerca de la línea de fondo de la mesa",
    },
    "half-long": {
      label: "Medio-largo",
      secondBouncePosition: "Justo en la línea de fondo — longitud ambigua",
    },
    "long-medium": {
      label: "Largo (profundo)",
      secondBouncePosition: "Caería bien más allá de la mesa",
    },
    "long-high": {
      label: "Largo (rápido y profundo)",
      secondBouncePosition: "Muy lejos de la mesa",
    },
    "deep-long": {
      label: "Largo Profundo (línea de fondo)",
      secondBouncePosition: "Justo en la línea de fondo del oponente. A pesar de la longitud, un saque profundo bien colocado aprieta al oponente, dificultando un ataque de calidad.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Maximiza el potencial de efecto. Da al servidor más tiempo para preparar la siguiente bola.",
    },
    medium: {
      tacticalNote: "Equilibra efecto y velocidad. Reduce el tiempo de reacción del oponente manteniendo el control.",
    },
    fast: {
      tacticalNote: "Apura al oponente. Sacrifica efecto por velocidad pura para forzar una devolución débil o un ace directo.",
    },
  },

  trajectories: {
    flat: {
      netClearance: "Justo sobre la red (1-3 cm)",
    },
    "low-arc": {
      netClearance: "Arco bajo sobre la red (5-15 cm)",
    },
    "high-arc": {
      netClearance: "Arco alto sobre la red (20+ cm)",
    },
  },

  tosses: {
    "low-legal": {
      position: "Palma abierta, pelota visible, lanzada ~16 cm hacia arriba",
    },
    "medium-legal": {
      position: "Palma abierta, pelota visible, lanzada ~30-50 cm hacia arriba",
    },
    "high-legal": {
      position: "Palma abierta, pelota visible, lanzada 2-5 metros hacia arriba",
    },
    "hidden-illegal": {
      position: "Pelota oculta detrás del cuerpo o brazo durante el lanzamiento — ilegal según las reglas de la ITTF",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Cortado Falso",
      description: "El servidor imita un movimiento de cortado pesado pero contacta la pelota con mínimo efecto o liftado. El oponente espera rotación inferior y empuja la pelota larga o a la red.",
      counterplay: "Observa el punto de contacto de cerca. Si la paleta se desliza bajo la pelota, es cortado. Si roza la parte trasera, probablemente es sin efecto o liftado.",
    },
    "same-motion": {
      name: "Variación con Mismo Movimiento",
      description: "Múltiples tipos de efecto se ejecutan desde un movimiento de saque idéntico. El oponente no puede distinguir entre variaciones de cortado, sin efecto y lateral.",
      counterplay: "Concéntrate en el sonido del contacto y la trayectoria de la pelota en lugar del movimiento del brazo. Practica la lectura de la trayectoria de vuelo de la pelota.",
    },
    "contact-hiding": {
      name: "Ocultación del Punto de Contacto",
      description: "El servidor usa el posicionamiento del cuerpo o el ángulo del brazo para oscurecer el momento y ángulo exactos del contacto paleta-pelota.",
      counterplay: "Posiciónate para ver a través del ángulo del cuerpo del servidor. Solicita al árbitro que aplique las reglas de visibilidad si el contacto está completamente oculto.",
    },
    "wrist-snap": {
      name: "Muñecazo Falso",
      description: "Un movimiento rápido de muñeca sugiere efecto pesado, pero el ángulo de la cara de la paleta en el contacto produce mucho menos efecto del esperado.",
      counterplay: "No reacciones solo a la velocidad de la muñeca. Concéntrate en el comportamiento de la pelota inmediatamente después del bote.",
    },
    "speed-variation": {
      name: "Variación de Velocidad",
      description: "Alternando entre saques rápidos y lentos con el mismo movimiento para interrumpir el tiempo y juego de pies del oponente.",
      counterplay: "Mantente alerta con una posición de espera neutral. Lee la velocidad de la pelota temprano y ajusta tu preparación en consecuencia.",
    },
    "body-feint": {
      name: "Finta Corporal",
      description: "El servidor usa movimiento de hombro, cadera o cabeza para sugerir una colocación o dirección de efecto diferente a la que realmente se ejecuta.",
      counterplay: "Ignora el lenguaje corporal y concéntrate en la paleta y la pelota. Entrena para leer el efecto por la rotación de la pelota en lugar del movimiento corporal del servidor.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Forzar Devolución Débil",
      goal: "Hacer que el oponente produzca una devolución alta o larga que pueda atacarse en la tercera bola.",
    },
    "set-up-fh-attack": {
      name: "Preparar Ataque de Derecha",
      goal: "Posicionar el saque para que la devolución venga al lado de derecha para un loop o smash agresivo.",
    },
    "prevent-flip": {
      name: "Prevenir Flip",
      goal: "Mantener el saque corto y bajo para que el oponente no pueda flipar o atacarlo agresivamente.",
    },
    "force-push": {
      name: "Forzar Empuje",
      goal: "Cortado pesado que obliga al oponente a empujar, dando al servidor la iniciativa para la tercera bola.",
    },
    "target-elbow": {
      name: "Apuntar al Codo",
      goal: "Apuntar al codo del oponente (punto de cruce) para crear indecisión entre derecha y revés.",
    },
    "go-for-ace": {
      name: "Buscar el Ace",
      goal: "Un saque de alto riesgo diseñado para ganar el punto directamente mediante velocidad, colocación o engaño.",
    },
    "serve-plus-one-fh": {
      name: "Saque+1 a la Derecha",
      goal: "Patrón de saque diseñado para que la devolución esperada pueda atacarse con derecha desde una posición preparada.",
    },
    "serve-plus-one-bh": {
      name: "Saque+1 al Revés",
      goal: "Patrón de saque diseñado para que la devolución esperada pueda atacarse con un golpe de revés o loop.",
    },
  },

  placements: {
    "fh-short": {
      label: "Derecha Corto",
    },
    "bh-short": {
      label: "Revés Corto",
    },
    "fh-long": {
      label: "Derecha Largo",
    },
    "bh-long": {
      label: "Revés Largo",
    },
    "middle-short": {
      label: "Centro Corto (Codo)",
    },
    "middle-long": {
      label: "Centro Largo (Codo)",
    },
  },
};
