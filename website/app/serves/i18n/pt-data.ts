/**
 * Brazilian Portuguese translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

import type { DataTranslations } from "./es-data";

export const ptData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Pêndulo Backspin Curto",
      description: "O saque mais básico e essencial. Backspin curto com efeito lateral esquerdo para o backhand ou o meio. Costuma provocar uma devolução em empurrada e prepara o ataque de terceira bola.",
      contactPoint: "Contate a parte de baixo e de trás da bola com a raquete em ângulo aberto. Roce para baixo e ligeiramente para a direita, deixando o pulso oscilar naturalmente ao longo do arco do pêndulo. Um contato fino maximiza o backspin, enquanto o acompanhamento lateral acrescenta efeito lateral.",
      returnAdvice: "Pegue a bola cedo, logo após o quique, com a raquete aberta e uma empurrada curta e roçada para acrescentar backspin. Mantenha-a curta ou empurre funda para o backhand ou o cotovelo do sacador, mirando ligeiramente contra o efeito lateral. Se ela subir, um flip controlado é mais seguro do que levantar.",
    },
    "pendulum-sidespin-long": {
      name: "Pêndulo Lateral Longo",
      description: "Pêndulo rápido para os cantos com efeito lateral e backspin. A curva pode dificultar uma devolução de qualidade, preparando uma oportunidade de terceira bola.",
      contactPoint: "Contate o lado de trás-esquerdo da bola com a raquete em ângulo levemente fechado. Roce para frente e de lado através da bola com mais velocidade e um contato mais grosso do que na versão curta. O pulso acelera durante o contato para dar mais ritmo.",
      returnAdvice: "Se vier longa, recue e use um topspin/drive controlado com lift extra para compensar o backspin. Mire ligeiramente para o backhand do sacador para contrariar o efeito lateral e mantenha a bola baixa. Uma empurrada rápida e com efeito é a opção mais segura se você não conseguir atacar.",
    },
    "pendulum-no-spin": {
      name: "Pêndulo Sem Efeito",
      description: "Parece o pêndulo com backspin, mas a bola flutua sem efeito. Adversários que empurram esperando backspin costumam levantar a bola.",
      contactPoint: "Contate o centro-trás da bola com a face da raquete quase plana. A raquete desliza atrás da bola em vez de roçar por baixo dela, fazendo apenas um contato breve e grosso. O braço e o pulso seguem como se estivessem produzindo efeito, mas o ângulo plano elimina a rotação.",
      returnAdvice: "Acrescente seu próprio efeito para ter controle: use uma empurrada compacta ou um flip/drive controlado com a raquete levemente fechada. Evite um toque morto, que tende a levantar a bola. Mantenha-a baixa e coloque nos cantos.",
    },
    "pendulum-topspin": {
      name: "Pêndulo Topspin",
      description: "Disfarçado de backspin, mas na verdade tem topspin. A bola salta para frente no quique, pegando adversários que tentam empurrá-la de volta.",
      contactPoint: "Contate o topo-trás da bola com a raquete em ângulo levemente fechado. Roce para cima e para frente através da bola, pegando a metade superior. O movimento de pêndulo disfarça o roçar ascendente — o pulso gira no contato para gerar topspin enquanto o braço continua lateralmente.",
      returnAdvice: "Não empurre. Feche a raquete e bloqueie ou faça contra-topspin cedo, antes do salto. Mire ligeiramente para o backhand do sacador para contrariar o efeito lateral e mantenha a bola baixa.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Pêndulo Inverso Curto",
      description: "Saque curto com efeito lateral direito e backspin. A curva oposta à do pêndulo regular pode ser difícil de ler, especialmente para adversários acostumados com saques padrão.",
      contactPoint: "Contate a parte de baixo e de trás da bola com a raquete em ângulo aberto. Roce para baixo e para a esquerda (o oposto do pêndulo regular), usando o movimento das costas do pulso. A raquete se move da esquerda para a direita cruzando o corpo no momento do contato.",
      returnAdvice: "Pegue a bola cedo com a raquete aberta e uma empurrada curta e roçada para acrescentar backspin. Mire ligeiramente para o forehand do sacador para contrariar o efeito lateral direito, mantendo-a baixa. Se ela subir, um flip suave é mais seguro do que levantar.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Pêndulo Inverso Topspin Longo",
      description: "Saque longo com efeito lateral direito e topspin. A bola curva para a esquerda do sacador e salta de lado no quique, dificultando um ataque de qualidade.",
      contactPoint: "Contate o lado de trás-direito da bola com a raquete em ângulo levemente fechado. Roce para cima e para a esquerda através da bola. O movimento de pêndulo inverso gera efeito lateral direito enquanto o componente ascendente acrescenta topspin.",
      returnAdvice: "Feche a raquete e bloqueie, dê um drive ou contra-topspin, pegando a bola cedo. Mire ligeiramente para o forehand do sacador para contrariar o efeito lateral. Se fizer um loop, roce por cima e mantenha o arco baixo.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk Longo",
      description: "Saque longo agressivo com forte efeito lateral direito e topspin. A bola salta com força para o lado depois de quicar e apressa o adversário.",
      contactPoint: "Contate o lado de trás-direito da bola com a face da raquete quase vertical. Roce para frente e bruscamente para a esquerda em um movimento de arremesso. O pulso estala para fora no contato, gerando um forte efeito lateral direito com topspin a partir do arco ascendente do movimento.",
      returnAdvice: "Pegue a bola cedo com a raquete fechada e um bloqueio ou drive compacto. Mire ligeiramente para o forehand do sacador para contrariar o efeito lateral e mantenha a bola baixa. Se tiver tempo, um topspin controlado é a melhor opção.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk Backspin Curto",
      description: "Um raro tomahawk curto com backspin. O movimento incomum combinado com a colocação curta torna esse saque muito difícil de ler e devolver agressivamente.",
      contactPoint: "Contate a parte de baixo da bola com a face da raquete aberta e inclinada de lado. Roce para baixo e para a esquerda no arco do tomahawk. Um contato fino sob a bola produz backspin enquanto o movimento lateral acrescenta efeito lateral. Um estalo de pulso mais suave e lento mantém a bola curta.",
      returnAdvice: "Use a raquete aberta e uma empurrada curta e roçada para mantê-la baixa. Mire ligeiramente para o forehand do sacador para contrariar o efeito lateral. Mantenha-a curta, a menos que consiga empurrar funda com bom efeito.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Tomahawk Inverso Longo",
      description: "O saque característico de Ding Ning. Começa exatamente como um tomahawk normal, mas muda para o contato de backhand no último instante, produzindo efeito lateral esquerdo com topspin em vez do esperado efeito lateral direito. A bola cai rapidamente por causa do topspin e salta com força para o lado oposto depois de quicar. Requer um agachamento profundo e um timing preciso. Mais enganoso quando misturado com saques tomahawk normais.",
      contactPoint: "Contate o lado de trás-esquerdo da bola usando a borracha de backhand, com a face da raquete quase vertical. No último momento do movimento de tomahawk, gire o pulso para dentro para roçar para frente e para a direita. Isso inverte a direção do efeito lateral em relação ao tomahawk normal, produzindo efeito lateral esquerdo com topspin.",
      returnAdvice: "Feche a raquete e pegue a bola cedo com um bloqueio compacto ou contra-topspin. Mire ligeiramente para o backhand do sacador para contrariar o efeito lateral esquerdo. Não empurre — o topspin vai mandar a bola longa. Se a direção do efeito lateral não estiver clara, mire no meio para reduzir o risco.",
    },
    "backhand-backspin-short": {
      name: "Backhand Backspin Curto",
      description: "Um saque de backhand compacto com backspin puro, colocado curto. Rápido de executar e permite prontidão imediata para a próxima bola. Comum em muitos níveis de jogo.",
      contactPoint: "Contate a parte de baixo da bola com a face da raquete aberta. Roce reto para baixo com um chicote de pulso compacto, mantendo o movimento curto e controlado. A raquete quase não se move para frente — quase todo o movimento é para baixo, para criar backspin puro.",
      returnAdvice: "Abra a raquete e roce por baixo da bola com uma empurrada curta, contatando cedo. Mantenha-a curta ou empurre funda para os cantos se quiser alongar o jogo. Priorize manter a bola baixa em vez de levantá-la.",
    },
    "backhand-no-spin-long": {
      name: "Backhand Rápido Longo",
      description: "Um saque de backhand rápido para os cantos com efeito mínimo. A velocidade pura pega os adversários desprevenidos, especialmente quando misturado com saques curtos de backspin.",
      contactPoint: "Contate o centro-trás da bola com a face da raquete quase plana. Empurre através da bola com um movimento rápido e seco em vez de roçar. Um contato grosso e plano maximiza a velocidade enquanto minimiza o efeito. O braço se estende totalmente em direção ao alvo.",
      returnAdvice: "Pegue a bola perto do ponto mais alto do quique com um bloqueio compacto ou drive controlado, acrescentando um pouco de topspin para ter controle. Não apenas estenda a raquete; saques sem efeito exigem que você mesmo gere efeito. Coloque a bola funda nos cantos ou no cotovelo.",
    },
    "backhand-sidespin": {
      name: "Backhand Lateral",
      description: "Saque de backhand com efeito lateral direito e backspin. O movimento compacto torna o efeito difícil de ler, e o sacador já está posicionado para um seguimento de backhand.",
      contactPoint: "Contate a parte de baixo-direita da bola com a raquete em ângulo aberto. Roce para baixo e para a esquerda através da bola com um movimento compacto de pulso. O efeito lateral vem do movimento lateral do pulso, enquanto a face aberta gera backspin.",
      returnAdvice: "Pegue a bola cedo com a raquete aberta e uma empurrada curta e roçada para acrescentar backspin. Mire ligeiramente para o forehand do sacador para contrariar o efeito lateral. Se ela subir, um flip compacto funciona bem.",
    },
    "hook-heavy-side-short": {
      name: "Gancho Lateral Pesado Curto",
      description: "Um movimento de colher por baixo da bola que produz efeito lateral extremo. A bola salta de lado no quique. Muito difícil de ler devido ao ângulo incomum da raquete.",
      contactPoint: "Contate o lado esquerdo da bola com a face da raquete quase horizontal, recolhendo por baixo e ao redor dela. O movimento de gancho roça de lado através do equador da bola. O pulso se curva bruscamente para dentro para maximizar o componente de efeito lateral.",
      returnAdvice: "Ajuste o ângulo para contrariar o forte efeito lateral e contate o lado da bola, não a parte de trás. Um toque suave ou um flip estilo banana é mais seguro do que uma batida forte. Mire ligeiramente para o backhand do sacador e mantenha a bola baixa.",
    },
    "hook-backspin-short": {
      name: "Gancho Backspin Curto",
      description: "Saque de gancho com efeito lateral pesado combinado com backspin. Os componentes de efeito duplo tornam a devolução precisa muito desafiadora.",
      contactPoint: "Contate a parte de baixo-esquerda da bola com a face da raquete aberta e inclinada de lado. Roce para baixo e para a direita em um arco de colher, pegando simultaneamente a parte de baixo e o lado da bola. Esse roçar em ângulo duplo cria a combinação de backspin e efeito lateral.",
      returnAdvice: "Abra mais a raquete e levante com uma empurrada roçada para lidar com o backspin pesado. Mire ligeiramente para o backhand do sacador para contrariar o efeito lateral e mantenha a bola baixa. Evite bater plano.",
    },
    "hook-fast-long-topspin": {
      name: "Gancho Rápido Longo",
      description: "Uma variante agressiva do saque gancho que combina efeito lateral direito com topspin, sacado rápido e fundo. O movimento de colher parece produzir backspin, mas a bola salta para frente com efeito lateral depois de quicar. Mais eficaz quando misturado com saques gancho de backspin tradicionais para maximizar o disfarce.",
      contactPoint: "Contate o lado de trás-direito da bola com a face da raquete levemente fechada. Roce para frente e para a esquerda em um arco rápido de colher, pegando a parte de cima-lateral da bola. O movimento de gancho disfarça o contato ascendente que gera topspin, enquanto o acompanhamento lateral acrescenta efeito lateral direito.",
      returnAdvice: "Feche a raquete e use um bloqueio compacto ou contra-topspin, pegando a bola bem cedo. Não empurre — o topspin vai mandar a bola longa. Incline a raquete levemente para a esquerda para contrariar o efeito lateral direito. Um loop de topspin controlado para o meio é a opção de ataque mais segura.",
    },
    "high-toss-backspin": {
      name: "Lançamento Alto Backspin Pesado",
      description: "O lançamento alto pode acrescentar tempo e energia para um efeito pesado. A bola pode girar visivelmente para trás depois de quicar. Usado por muitos jogadores de elite para forçar empurradas fracas.",
      contactPoint: "Contate a parte mais baixa da bola com a face da raquete bem aberta enquanto ela cai do lançamento alto. Roce bruscamente para baixo, usando a energia gravitacional da bola em queda para amplificar o backspin. O pulso estala para baixo no ponto mais baixo do movimento para o máximo de efeito.",
      returnAdvice: "Use uma raquete bem aberta e uma empurrada mais longa e roçada com lift extra. Se vier longa, abra com um loop controlado em vez de uma batida plana. Priorize muito backspin e pouca altura.",
    },
    "high-toss-sidespin": {
      name: "Lançamento Alto Lateral",
      description: "Combina o lançamento alto com efeito lateral e backspin para um efeito combinado pesado. A bola pode curvar dramaticamente e travar na mesa. Requer um timing excepcional.",
      contactPoint: "Contate a parte de baixo-esquerda da bola com a face da raquete aberta enquanto ela cai do lançamento alto. Roce para baixo e para a direita em um arco de pêndulo, pegando tanto a parte de baixo quanto o lado esquerdo. A energia gravitacional combinada com o estalo de pulso produz um backspin extremamente pesado com efeito lateral esquerdo.",
      returnAdvice: "Abra a raquete e roce para cima e ligeiramente contra o efeito lateral. Mire ligeiramente para o backhand do sacador para contrariar a curva e mantenha a bola baixa. Uma empurrada suave e com efeito é mais segura do que uma batida forte.",
    },
    "ghost-serve": {
      name: "Saque Fantasma",
      description: "Um saque lendário, ultracurto, de backspin, famoso por ter sido usado por Ma Lin. A bola mal passa por cima da rede, quica no lado do adversário e gira de volta em direção à rede (às vezes até passando por cima dela de novo). Requer o máximo de backspin, gerado por um pulso solto e um contato fino na parte de baixo da bola.",
      contactPoint: "Contate a parte mais baixa da bola com a face da raquete completamente aberta (quase horizontal). Roce bruscamente para baixo com um toque extremamente fino e de roçar — a raquete quase apenas beija a bola. Um pulso solto e relaxado é essencial para gerar o máximo de backspin, que faz a bola girar de volta.",
      returnAdvice: "Avance e pegue a bola assim que ela quicar, com uma raquete bem aberta e um toque delicado e roçado. Mantenha-a curta ou empurre funda com muito backspin. Não espere, ou ela vai girar de volta para a rede.",
    },
    "fast-long-surprise-fh": {
      name: "Rápido Longo para o Forehand",
      description: "Um saque rápido e repentino para o canto de forehand do adversário, com contato do tipo topspin/drive. Mais eficaz quando misturado depois de uma sequência de saques curtos. O elemento surpresa é a principal arma.",
      contactPoint: "Contate a parte de trás da bola com a face da raquete levemente fechada. Empurre através da bola com um golpe rápido e plano, roçando levemente para cima para acrescentar topspin. O foco é a velocidade e a energia para frente, e não o efeito — contato grosso com uma extensão rápida do braço.",
      returnAdvice: "Feche a raquete e use um bloqueio compacto ou contra-topspin, pegando a bola cedo. Não empurre. Coloque-a funda no backhand ou no meio para reduzir o ângulo.",
    },
    "fast-long-surprise-bh": {
      name: "Rápido Longo para o Backhand",
      description: "Saque rápido dirigido ao canto de backhand, com contato do tipo topspin/drive. Eficaz contra adversários que ficam perto demais da mesa ou que já se comprometeram a receber um saque curto.",
      contactPoint: "Contate a parte de trás da bola com a face da raquete levemente fechada, a partir do lado de backhand. Empurre através da bola com um golpe rápido e compacto, roçando levemente para cima. A empunhadura de backhand fecha naturalmente a raquete, acrescentando um toque de topspin à trajetória rápida e plana.",
      returnAdvice: "Use um bloqueio/drive de backhand compacto com a raquete levemente fechada. Pegue a bola cedo e mantenha-a baixa. Coloque-a funda no meio ou aberta no forehand para neutralizar o ângulo.",
    },
    "pendulum-corkspin": {
      name: "Pêndulo Saca-rolhas",
      description: "Um saque pêndulo com um eixo de efeito giroscópico do tipo saca-rolhas. A bola pode balançar em voo e quicar de forma menos previsível, dificultando devoluções limpas.",
      contactPoint: "Contate o lado de trás-esquerdo da bola com a raquete fechada. Roce para frente e ao redor da bola em um movimento envolvente, como se a raquete estivesse envolvendo a bola. O pulso estala para dentro no contato para criar o eixo giroscópico — o efeito entra na bola em vez de ser puramente lateral ou para baixo.",
      returnAdvice: "Observe o quique e contate a bola cedo, usando um ângulo neutro de raquete para absorver o balanço. Um bloqueio controlado ou um rolo para o meio é a opção mais segura. Ajuste-se depois do primeiro salto em vez de forçar um ângulo aberto.",
    },
    "backhand-elbow": {
      name: "Backhand no Cotovelo",
      description: "Um saque de backhand de velocidade média, dirigido diretamente ao cotovelo do adversário. O efeito lateral direito acrescenta curva, criando indecisão sobre usar forehand ou backhand.",
      contactPoint: "Contate a parte de trás-direita da bola com a face da raquete levemente aberta, a partir da posição de backhand. Roce de lado para a esquerda e ligeiramente para baixo. O efeito lateral vem do movimento lateral do pulso, enquanto o leve ângulo descendente acrescenta backspin suficiente para manter a bola baixa.",
      returnAdvice: "Mova os pés e decida cedo; não estique o braço. Se vier longa, use um topspin/drive controlado com lift extra por causa do backspin. Mire fundo no cotovelo ou ligeiramente para o forehand do sacador para contrariar o efeito lateral.",
    },
    "high-toss-no-spin": {
      name: "Lançamento Alto Sem Efeito",
      description: "Imita de perto o saque de lançamento alto com backspin pesado, mas não tem efeito nenhum. Adversários que esperam backspin extremo podem empurrar a bola longa ou alta. Requer muito tato.",
      contactPoint: "Contate o centro-trás da bola com a face da raquete quase plana, apesar da aparência aberta. A raquete se move para baixo como se estivesse produzindo backspin pesado, mas contata a bola com o centro plano da borracha em vez de roçar. Um contato grosso e breve elimina o efeito enquanto o braço segue de forma enganosa.",
      returnAdvice: "Acrescente seu próprio efeito para ter controle: use um flip compacto ou uma empurrada com a raquete levemente fechada. Deixe a bola subir um pouco e contate-a de forma limpa. Evite um toque morto, que faz a bola subir.",
    },
    "chop-backspin-short": {
      name: "Corte de Forehand Backspin Curto",
      description: "O saque mais fundamental do tênis de mesa. Backspin puro, sem efeito lateral, colocado curto. O saque mais seguro para manter baixo e curto, tornando muito difícil para os adversários atacarem. Uma opção ideal contra loopers agressivos.",
      contactPoint: "Contate a parte de baixo da bola com a face da raquete bem aberta. Corte reto para baixo com um golpe simples e limpo. A raquete roça por baixo da bola sem movimento lateral, produzindo backspin puro. Mantenha o contato fino para o máximo de efeito ou um pouco mais grosso para controlar a colocação.",
      returnAdvice: "Abra a raquete e roce por baixo da bola com uma empurrada curta, contatando cedo. Mantenha-a curta ou empurre funda com bom backspin. Mantenha-a baixa em vez de levantar.",
    },
    "chop-no-spin": {
      name: "Corte de Forehand Sem Efeito",
      description: "Usa o mesmo movimento de corte da versão com backspin, mas contata a bola com efeito mínimo. Adversários que esperam backspin pesado costumam empurrar a bola longa ou levantá-la, dando uma terceira bola fácil.",
      contactPoint: "Contate o centro-trás da bola com uma face de raquete que parece aberta, mas na verdade está mais vertical do que na versão com backspin. O movimento de corte continua, mas a raquete desliza atrás da bola em vez de por baixo dela, produzindo efeito mínimo. O acompanhamento imita a versão com backspin para disfarçar.",
      returnAdvice: "Acrescente seu próprio efeito com uma empurrada compacta ou um flip/drive controlado. Mantenha a raquete levemente fechada e a trajetória baixa. Evite um toque morto.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Limpador de Para-brisa Lateral Curto",
      description: "A raquete varre horizontalmente através da bola, produzindo efeito lateral esquerdo com backspin. O movimento idêntico pode produzir qualquer tipo de efeito dependendo do ponto de contato no arco, tornando-o muito difícil de ler. Mais eficaz quando mantido baixo sobre a rede.",
      contactPoint: "Contate a parte de baixo-esquerda da bola enquanto a raquete varre da direita para a esquerda em um arco horizontal. Roce para baixo e para a direita através da bola, pegando a parte de baixo no meio do arco do limpador. A face aberta da raquete e o ponto de contato baixo combinam backspin com efeito lateral esquerdo.",
      returnAdvice: "Leia o contato e use a raquete aberta com uma empurrada curta e roçada. Mire ligeiramente para o backhand do sacador para contrariar o efeito lateral. Mantenha-a baixa e curta, a menos que consiga empurrar funda com muito efeito.",
    },
    "windshield-wiper-topspin": {
      name: "Limpador de Para-brisa Topspin",
      description: "Mesmo movimento de limpador de para-brisa, mas o contato é feito em um ponto diferente do arco para produzir topspin em vez de backspin. Adversários que leem como backspin e empurram vão mandar a bola longa ou alta.",
      contactPoint: "Contate o topo-trás da bola no final do arco do limpador, em vez de no meio. A raquete pega a bola mais tarde na sua varredura, onde o movimento está indo para cima e para frente. Uma face de raquete levemente fechada roça por cima da parte superior da bola, gerando topspin enquanto o movimento lateral acrescenta efeito lateral.",
      returnAdvice: "Não empurre. Feche a raquete e bloqueie ou faça contra-topspin cedo. Mire ligeiramente para o backhand do sacador para contrariar o efeito lateral e mantenha a bola baixa.",
    },
    "hidden-serve": {
      name: "Saque Escondido (Ilegal)",
      description: "Um saque em que o ponto de contato é deliberadamente escondido atrás do corpo ou do braço livre. Isso era legal antes da mudança na regra de saque de 1º de setembro de 2002 e ainda é visto às vezes no jogo amador.",
      contactPoint: "O contato varia — o sacador pode produzir qualquer tipo de efeito, já que o contato está escondido. Normalmente, a parte de baixo-esquerda da bola é atingida com a face da raquete aberta para um efeito lateral-backspin pesado, mas a ocultação significa que o recebedor não consegue ver o ângulo exato de contato nem a direção do roçar.",
      returnAdvice: "Priorize o controle: presuma efeito lateral-backspin e use a raquete aberta com uma empurrada baixa e com efeito. Mire ligeiramente contra o efeito e mantenha a bola baixa nos cantos. Se o contato foi escondido, peça uma advertência.",
      legalityNotes: "Ilegal segundo as regras da ITTF desde 1º de setembro de 2002. Do início do saque até o momento em que é golpeada, a bola não pode ficar escondida do recebedor, e o braço livre deve ser retirado do espaço entre a bola e a rede. Um saque pouco claro pode receber uma advertência na primeira ocorrência; saques pouco claros subsequentes podem custar um ponto.",
    },
    "finger-spin-serve": {
      name: "Saque com Efeito de Dedos (Ilegal)",
      description: "O sacador usa os dedos para dar efeito à bola durante o lançamento, em vez de gerar efeito com a raquete. Produz um efeito enganoso a partir de um movimento aparentemente simples.",
      contactPoint: "O efeito é gerado pelos dedos durante o lançamento, não no contato com a raquete. Os dedos rolam a bola ao soltá-la, imprimindo backspin ou efeito lateral antes mesmo de a raquete tocar a bola. O contato da raquete em si pode ser quase plano, fazendo o efeito parecer surgir do nada.",
      returnAdvice: "Observe a rotação da bola no lançamento e ajuste o ângulo da sua raquete a esse efeito. Use a raquete aberta e uma empurrada suave e com efeito, ou um loop controlado se vier longa. Mantenha a devolução baixa.",
      legalityNotes: "Ilegal. O saque deve começar com a bola repousando livremente na palma aberta, e o lançamento deve ser quase vertical, sem imprimir efeito. Dar efeito à bola com os dedos durante o lançamento viola esse requisito.",
    },
  },

  motions: {
    pendulum: {
      name: "Pêndulo",
      description: "O saque mais comum no tênis de mesa. A raquete oscila como um pêndulo da direita para a esquerda (para destros), gerando efeito lateral combinado com backspin ou topspin. Extremamente versátil, com muitas variações de efeito possíveis a partir do mesmo movimento.",
    },
    "reverse-pendulum": {
      name: "Pêndulo Inverso",
      description: "A raquete oscila da esquerda para a direita (para destros), produzindo efeito lateral na direção oposta ao pêndulo padrão. Menos comum, o que dificulta a leitura pelos adversários.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Um saque em que a raquete se move para fora em um movimento de lançamento, como um tomahawk. Gera forte efeito lateral e pode ser combinado com topspin para um efeito de salto. Popular no estilo de jogo asiático. Observação: a classificação de mão varia — o treinamento chinês costuma considerar este um saque de forehand (o contato é feito com a borracha de forehand), enquanto alguns treinadores ocidentais o classificam como backhand com base na postura.",
    },
    "reverse-tomahawk": {
      name: "Tomahawk Inverso",
      description: "Começa com o mesmo movimento de lançamento para fora de um tomahawk normal, mas muda para o contato com o lado de backhand da raquete no último instante, produzindo efeito lateral esquerdo em vez de direito. O movimento inicial idêntico o torna extremamente enganoso. Popularizado por Ding Ning e também usado por Kenta Matsudaira.",
    },
    backhand: {
      name: "Saque de Backhand",
      description: "Um saque compacto executado pelo lado de backhand. Permite uma transição rápida para a próxima bola e é naturalmente enganoso devido à posição do pulso. Usado com eficácia por muitos jogadores europeus.",
    },
    "hook-shovel": {
      name: "Gancho / Colher",
      description: "Um saque pouco convencional em que a raquete recolhe por baixo da bola com um movimento de gancho. Produz efeito lateral pesado com backspin. O ponto de contato incomum o torna muito difícil de ler.",
    },
    chop: {
      name: "Corte de Forehand",
      description: "Um simples movimento de corte para baixo com a face da raquete aberta, que produz backspin puro sem efeito lateral. O saque mais fundamental do tênis de mesa — fácil de aprender, fácil de manter curto e eficaz para prevenir devoluções agressivas. Muitas vezes o primeiro saque ensinado a iniciantes.",
    },
    "windshield-wiper": {
      name: "Limpador de Para-brisa",
      description: "A raquete varre horizontalmente em um arco, como um limpador de para-brisa, roçando a parte de trás da bola. Dependendo de onde no arco a bola é contatada, o mesmo movimento pode produzir efeito lateral, topspin ou backspin. A aparência idêntica, independentemente do efeito, o torna altamente enganoso. Requer uma postura baixa e ampla para uma execução adequada.",
    },
    "high-toss": {
      name: "Pêndulo com Lançamento Alto",
      description: "Um saque pêndulo com um lançamento alto da bola (normalmente 2 a 5 metros). A altura adicional de queda acrescenta energia gravitacional, aumentando o potencial de efeito. Requer um timing excelente, mas produz um efeito excepcionalmente pesado.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Backspin Puro",
      description: "Rotação inferior limpa que faz a bola deslizar baixo e travar no lado do adversário. As devoluções tendem a ir para a rede se forem empurradas sem compensação.",
    },
    "heavy-backspin": {
      name: "Backspin Pesado",
      description: "Rotação inferior máxima. A bola agarra a superfície da mesa e pode até quicar de volta em direção à rede. Extremamente difícil de dar flip ou loop de forma agressiva.",
    },
    "pure-topspin": {
      name: "Topspin Puro",
      description: "Rotação para frente que faz a bola saltar para frente depois de quicar. Frequentemente usado em saques rápidos e longos para apressar o adversário.",
    },
    "left-side-backspin": {
      name: "Efeito Lateral Esquerdo + Backspin",
      description: "A combinação clássica do pêndulo. A bola curva para a direita do ponto de vista do sacador e quica com rotação inferior. Muito comum no jogo competitivo.",
    },
    "right-side-backspin": {
      name: "Efeito Lateral Direito + Backspin",
      description: "Combinação de pêndulo inverso ou tomahawk. A bola curva para a esquerda do ponto de vista do sacador. Menos comum, por isso é mais difícil de ler para os adversários.",
    },
    "left-side-topspin": {
      name: "Efeito Lateral Esquerdo + Topspin",
      description: "Uma combinação enganosa em que a bola parece ter backspin, mas salta para frente. Usada para pegar os adversários desprevenidos quando eles esperam rotação inferior.",
    },
    "right-side-topspin": {
      name: "Efeito Lateral Direito + Topspin",
      description: "Combinação ao estilo tomahawk que produz um quique lateral forte. Eficaz para preparar ataques de forehand.",
    },
    "no-spin": {
      name: "Flutuante Sem Efeito",
      description: "Uma bola morta com rotação mínima. Imita o movimento de um saque com efeito, mas produz um efeito flutuante. Adversários que esperam efeito vão ler a bola completamente errado.",
    },
    "pure-left-sidespin": {
      name: "Efeito Lateral Esquerdo Puro",
      description: "Forte rotação lateral sem rotação superior/inferior significativa. A bola curva dramaticamente no ar e salta lateralmente no quique.",
    },
    "pure-right-sidespin": {
      name: "Efeito Lateral Direito Puro",
      description: "Forte rotação lateral na direção oposta. Eficaz com os movimentos de pêndulo inverso e tomahawk.",
    },
    "light-backspin": {
      name: "Backspin Leve",
      description: "Rotação inferior sutil, difícil de distinguir do sem efeito. A bola flutua um pouco mais do que uma bola morta, pegando os adversários entre empurrar e dar flip.",
    },
    "heavy-left-side-backspin": {
      name: "Efeito Lateral Esquerdo Pesado + Backspin",
      description: "Efeito combinado máximo do movimento pêndulo. A bola curva, cai e trava agressivamente. O saque característico de muitos jogadores de elite.",
    },
    corkspin: {
      name: "Efeito Saca-rolhas",
      description: "Um eixo de efeito giroscópico que produz um comportamento de quique imprevisível. A bola parece balançar e mudar de direção em pleno voo.",
    },
  },

  bounces: {
    "short-low": {
      label: "Curto (2º quique na mesa)",
      secondBouncePosition: "Na mesa, perto da rede",
    },
    "short-medium": {
      label: "Curto (2º quique perto da linha de fundo)",
      secondBouncePosition: "Perto da linha de fundo da mesa",
    },
    "half-long": {
      label: "Meio-Longo",
      secondBouncePosition: "Bem na linha de fundo — comprimento ambíguo",
    },
    "long-medium": {
      label: "Longo (profundo)",
      secondBouncePosition: "Cairia bem além da mesa",
    },
    "long-high": {
      label: "Longo (rápido e profundo)",
      secondBouncePosition: "Bem longe da mesa",
    },
    "deep-long": {
      label: "Longo Profundo (linha de fundo)",
      secondBouncePosition: "Bem na linha de fundo do adversário. Apesar do comprimento longo, um saque profundo bem colocado pressiona o adversário, dificultando um ataque de qualidade.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Maximiza o potencial de efeito. Dá ao sacador mais tempo para se preparar para a próxima bola.",
    },
    medium: {
      tacticalNote: "Equilibra efeito e velocidade. Reduz o tempo de reação do adversário mantendo o controle.",
    },
    fast: {
      tacticalNote: "Apressa o adversário. Sacrifica efeito por velocidade pura para forçar uma devolução fraca ou um ace direto.",
    },
  },

  trajectories: {
    flat: {
      netClearance: "Bem rente à rede (1-3 cm)",
    },
    "low-arc": {
      netClearance: "Arco baixo sobre a rede (5-15 cm)",
    },
    "high-arc": {
      netClearance: "Arco alto sobre a rede (20+ cm)",
    },
  },

  tosses: {
    "low-legal": {
      position: "Palma aberta, bola visível, lançada ~16 cm para cima",
    },
    "medium-legal": {
      position: "Palma aberta, bola visível, lançada ~30-50 cm para cima",
    },
    "high-legal": {
      position: "Palma aberta, bola visível, lançada 2-5 metros para cima",
    },
    "hidden-illegal": {
      position: "Bola escondida atrás do corpo ou do braço durante o lançamento — ilegal segundo as regras da ITTF",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Backspin Falso",
      description: "O sacador imita um movimento de backspin pesado, mas contata a bola com efeito mínimo ou topspin. O adversário espera backspin e empurra a bola longa ou para a rede.",
      counterplay: "Observe de perto o ponto de contato. Se a raquete desliza por baixo da bola, é backspin. Se ela roça a parte de trás, provavelmente é sem efeito ou topspin.",
    },
    "same-motion": {
      name: "Variação com o Mesmo Movimento",
      description: "Vários tipos de efeito são executados a partir de um movimento de saque idêntico. O adversário não consegue distinguir entre variações de backspin, sem efeito e efeito lateral.",
      counterplay: "Concentre-se no som do contato e na trajetória da bola em vez do movimento do braço. Pratique a leitura da trajetória de voo da bola.",
    },
    "contact-hiding": {
      name: "Ocultação do Ponto de Contato",
      description: "O sacador usa o posicionamento do corpo ou o ângulo do braço para obscurecer o momento e o ângulo exatos do contato entre raquete e bola.",
      counterplay: "Posicione-se para enxergar através do ângulo do corpo do sacador. Peça ao árbitro que aplique as regras de visibilidade se o contato estiver totalmente escondido.",
    },
    "wrist-snap": {
      name: "Chicote de Pulso Falso",
      description: "Um chicote de pulso rápido sugere efeito pesado, mas o ângulo da face da raquete no contato produz muito menos efeito do que o esperado.",
      counterplay: "Não reaja apenas à velocidade do pulso. Concentre-se no comportamento da bola imediatamente após o quique.",
    },
    "speed-variation": {
      name: "Variação de Velocidade",
      description: "Alternar entre saques rápidos e lentos com o mesmo movimento para atrapalhar o tempo de reação e o posicionamento dos pés do adversário.",
      counterplay: "Fique atento com uma posição de espera neutra. Leia a velocidade da bola cedo e ajuste sua preparação de acordo.",
    },
    "body-feint": {
      name: "Finta Corporal",
      description: "O sacador usa o movimento do ombro, do quadril ou da cabeça para sugerir uma colocação ou direção de efeito diferente da que realmente é executada.",
      counterplay: "Ignore a linguagem corporal e concentre-se na raquete e na bola. Treine para ler o efeito pela rotação da bola em vez do movimento corporal do sacador.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Forçar Devolução Fraca",
      goal: "Fazer o adversário produzir uma devolução alta ou longa que possa ser atacada na terceira bola.",
    },
    "set-up-fh-attack": {
      name: "Preparar Ataque de Forehand",
      goal: "Posicionar o saque para que a devolução venha para o lado do forehand, permitindo um loop ou smash agressivo.",
    },
    "prevent-flip": {
      name: "Prevenir Flip",
      goal: "Manter o saque curto e baixo o suficiente para que o adversário não consiga dar flip ou atacar agressivamente.",
    },
    "force-push": {
      name: "Forçar Empurrada",
      goal: "Backspin pesado que obriga o adversário a empurrar, dando ao sacador a iniciativa para a terceira bola.",
    },
    "target-elbow": {
      name: "Mirar no Cotovelo",
      goal: "Mirar no cotovelo do adversário (ponto de cruzamento) para criar indecisão entre forehand e backhand.",
    },
    "go-for-ace": {
      name: "Buscar o Ace",
      goal: "Um saque de alto risco projetado para ganhar o ponto diretamente por meio de velocidade, colocação ou disfarce.",
    },
    "serve-plus-one-fh": {
      name: "Saque+1 para o Forehand",
      goal: "Padrão de saque projetado para que a devolução esperada possa ser atacada com um forehand a partir de uma posição preparada.",
    },
    "serve-plus-one-bh": {
      name: "Saque+1 para o Backhand",
      goal: "Padrão de saque projetado para que a devolução esperada possa ser atacada com um golpe ou loop de backhand.",
    },
  },

  placements: {
    "fh-short": {
      label: "Forehand Curto",
    },
    "bh-short": {
      label: "Backhand Curto",
    },
    "fh-long": {
      label: "Forehand Longo",
    },
    "bh-long": {
      label: "Backhand Longo",
    },
    "middle-short": {
      label: "Meio Curto (Cotovelo)",
    },
    "middle-long": {
      label: "Meio Longo (Cotovelo)",
    },
  },
};
