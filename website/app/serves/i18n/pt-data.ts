/**
 * Brazilian Portuguese translations for all data entities.
 * Keyed by entity ID, each value contains the translatable text fields.
 * Non-text fields (numbers, IDs, booleans, coordinates) are NOT included.
 */

import type { DataTranslations } from "./es-data";

export const ptData: DataTranslations = {
  serves: {
    "pendulum-backspin-short": {
      name: "Pêndulo curto com backspin",
      description: "O saque arroz com feijão. Curto, com backspin e efeito lateral esquerdo, no backhand ou no meio. Costuma provocar um push na recepção e prepara o ataque na terceira bola.",
      contactPoint: "Faça contato com a parte de baixo e de trás da bola, com a raquete aberta. Roce para baixo e um pouco para a direita, deixando o punho acompanhar naturalmente o arco do pêndulo. O contato fino maximiza o backspin, e a finalização lateral acrescenta o efeito lateral.",
      returnAdvice: "Pegue a bola cedo, logo depois do quique, com a raquete aberta e um push curto roçando a bola para acrescentar backspin. Devolva curto ou faça um push longo no backhand ou no cotovelo do sacador, mirando um pouco contra o efeito lateral. Se a bola subir, um flip controlado é mais seguro do que levantá-la.",
    },
    "pendulum-sidespin-long": {
      name: "Pêndulo longo com efeito lateral",
      description: "Pêndulo rápido nos cantos, com efeito lateral e backspin. A curva dificulta uma devolução de qualidade e abre caminho para a terceira bola.",
      contactPoint: "Faça contato com a parte de trás e da esquerda da bola, com a raquete levemente fechada. Roce para a frente e de lado, com mais velocidade e um contato mais grosso do que na versão curta. O punho acelera no contato para dar mais velocidade.",
      returnAdvice: "Se vier longo, dê um passo para trás e faça um topspin ou drive controlado, levantando um pouco mais para compensar o backspin. Mire um pouco no backhand do sacador para neutralizar o efeito lateral e mantenha a bola baixa. Se não der para atacar, um push rápido e com bastante efeito é a opção segura.",
    },
    "pendulum-no-spin": {
      name: "Pêndulo sem efeito",
      description: "Parece o pêndulo com backspin, mas a bola vai sem efeito. O adversário que faz push esperando backspin costuma levantar a bola.",
      contactPoint: "Faça contato com a parte de trás e do centro da bola, com a raquete quase reta. A raquete desliza por trás da bola em vez de roçar por baixo, com um contato curto e grosso. O braço e o punho finalizam como se estivessem dando efeito, mas o ângulo reto anula a rotação.",
      returnAdvice: "Coloque seu próprio efeito para ter controle: um push compacto ou um flip/drive controlado com a raquete levemente fechada. Evite o toque morto, que tende a levantar a bola. Mantenha a bola baixa e coloque nos cantos.",
    },
    "pendulum-topspin": {
      name: "Pêndulo com topspin",
      description: "Disfarçado de backspin, mas na verdade tem topspin. A bola acelera para a frente no quique e pega desprevenido quem tenta fazer push.",
      contactPoint: "Faça contato com a parte de trás e de cima da bola, com a raquete levemente fechada. Roce para cima e para a frente, pegando a metade superior da bola. O movimento de pêndulo disfarça o roçar para cima: o punho gira sobre a bola no contato para gerar topspin enquanto o braço segue de lado.",
      returnAdvice: "Não faça push. Feche a raquete e bloqueie ou devolva com topspin cedo, antes de a bola acelerar. Mire um pouco no backhand do sacador para neutralizar o efeito lateral e mantenha a bola baixa.",
    },
    "reverse-pendulum-sidespin-short": {
      name: "Pêndulo inverso curto",
      description: "Saque curto com efeito lateral direito e backspin. A curva contrária à do pêndulo comum é difícil de ler, principalmente para quem está acostumado com saques tradicionais.",
      contactPoint: "Faça contato com a parte de baixo e de trás da bola, com a raquete aberta. Roce para baixo e para a esquerda (o contrário do pêndulo comum), com um movimento do punho para fora. No contato, a raquete cruza a frente do corpo da esquerda para a direita.",
      returnAdvice: "Pegue cedo, com a raquete aberta e um push curto roçando a bola para acrescentar backspin. Mire um pouco no forehand do sacador para neutralizar o lateral direito e mantenha a bola baixa. Se ela subir, um flip suave é mais seguro do que levantá-la.",
    },
    "reverse-pendulum-topspin-long": {
      name: "Pêndulo inverso longo com topspin",
      description: "Saque longo com efeito lateral direito e topspin. A bola faz curva para a esquerda do sacador e escapa para o lado no quique, o que dificulta um ataque de qualidade.",
      contactPoint: "Faça contato com a parte de trás e da direita da bola, com a raquete levemente fechada. Roce para cima e para a esquerda. O movimento de pêndulo inverso gera o lateral direito, e o componente para cima acrescenta topspin.",
      returnAdvice: "Feche a raquete e bloqueie, faça um drive ou devolva com topspin, pegando a bola cedo. Mire um pouco no forehand do sacador para neutralizar o efeito lateral. Se fizer topspin, roce por cima da bola e mantenha a parábola baixa.",
    },
    "tomahawk-sidespin-long": {
      name: "Tomahawk longo",
      description: "Saque longo e agressivo, com muito efeito lateral direito e topspin. Depois do quique, a bola escapa com força para o lado e apressa o adversário.",
      contactPoint: "Faça contato com a parte de trás e da direita da bola, com a raquete quase na vertical. Roce para a frente e bruscamente para a esquerda, como quem arremessa uma machadinha. O punho estala para fora no contato e gera um lateral direito forte, com o topspin que vem do arco ascendente do movimento.",
      returnAdvice: "Pegue cedo, com a raquete fechada e um bloqueio ou drive compacto. Mire um pouco no forehand do sacador para neutralizar o efeito lateral e mantenha a bola baixa. Se tiver tempo, um topspin controlado é a melhor opção.",
    },
    "tomahawk-backspin-short": {
      name: "Tomahawk curto com backspin",
      description: "Um tomahawk curto com backspin, pouco comum. O movimento incomum, somado à colocação curta, torna esse saque muito difícil de ler e de devolver com agressividade.",
      contactPoint: "Faça contato com a parte de baixo da bola, com a raquete aberta e inclinada de lado. Roce para baixo e para a esquerda, seguindo o arco do tomahawk. O contato fino por baixo gera o backspin, e o movimento lateral acrescenta o efeito lateral. Um estalo de punho mais suave e lento mantém a bola curta.",
      returnAdvice: "Use a raquete aberta e um push curto roçando a bola para mantê-la baixa. Mire um pouco no forehand do sacador para neutralizar o efeito lateral. Devolva curto, a menos que consiga fazer um push longo com bom efeito.",
    },
    "reverse-tomahawk-topspin-long": {
      name: "Tomahawk inverso longo",
      description: "O saque característico de Ding Ning. Começa igual a um tomahawk comum, mas no último instante passa a fazer o contato com o lado do backhand e produz lateral esquerdo com topspin, em vez do lateral direito esperado. Por causa do topspin, a bola cai rápido e, depois do quique, escapa com força para o lado oposto. Exige agachar bastante e um timing preciso. Engana mais quando é misturado com tomahawks comuns.",
      contactPoint: "Faça contato com a parte de trás e da esquerda da bola usando a borracha do backhand, com a raquete quase na vertical. No final do movimento de tomahawk, gire o punho para dentro para roçar para a frente e para a direita. Isso inverte o sentido do efeito lateral em relação ao tomahawk comum e produz lateral esquerdo com topspin.",
      returnAdvice: "Feche a raquete e pegue cedo com um bloqueio compacto ou devolvendo com topspin. Mire um pouco no backhand do sacador para neutralizar o lateral esquerdo. Não faça push: o topspin vai mandar a bola para fora. Se não estiver claro para que lado vai o efeito lateral, mire no meio para reduzir o risco.",
    },
    "backhand-backspin-short": {
      name: "Backhand curto com backspin",
      description: "Saque de backhand compacto, com backspin puro e colocação curta. É rápido de executar e deixa você pronto logo para a próxima bola. Comum em todos os níveis.",
      contactPoint: "Faça contato com a parte de baixo da bola, com a raquete aberta. Roce reto para baixo com uma batida curta de punho, mantendo o movimento compacto e controlado. A raquete quase não vai para a frente: praticamente todo o movimento é para baixo, para criar backspin puro.",
      returnAdvice: "Abra a raquete e roce a bola por baixo com um push curto, pegando cedo. Devolva curto ou, se quiser alongar, faça um push longo nos cantos. Priorize manter a bola baixa em vez de levantá-la.",
    },
    "backhand-no-spin-long": {
      name: "Backhand rápido e longo",
      description: "Saque de backhand rápido nos cantos e quase sem efeito. A velocidade pega o adversário desprevenido, principalmente quando misturado com saques curtos com backspin.",
      contactPoint: "Faça contato com a parte de trás e do centro da bola, com a raquete quase reta. Empurre a bola com um golpe rápido e seco, em vez de roçar. O contato grosso e reto dá o máximo de velocidade com o mínimo de efeito. O braço se estende totalmente em direção ao alvo.",
      returnAdvice: "Pegue a bola perto do ponto mais alto do quique com um bloqueio compacto ou um drive controlado, colocando um pouco de topspin para ter controle. Não basta apresentar a raquete: contra saque sem efeito, o efeito tem que ser seu. Coloque a bola longa nos cantos ou no cotovelo.",
    },
    "backhand-sidespin": {
      name: "Backhand com efeito lateral",
      description: "Saque de backhand com efeito lateral direito e backspin. O movimento compacto dificulta a leitura do efeito, e o sacador já fica posicionado para seguir com o backhand.",
      contactPoint: "Faça contato com a parte de baixo e da direita da bola, com a raquete aberta. Roce para baixo e para a esquerda com um movimento compacto de punho. O efeito lateral vem do movimento lateral do punho, e a raquete aberta gera o backspin.",
      returnAdvice: "Pegue cedo, com a raquete aberta e um push curto roçando a bola para acrescentar backspin. Mire um pouco no forehand do sacador para neutralizar o efeito lateral. Se a bola subir, um flip compacto funciona bem.",
    },
    "hook-heavy-side-short": {
      name: "Gancho curto com muito efeito lateral",
      description: "Um movimento de colher por baixo da bola que produz efeito lateral extremo. A bola escapa para o lado no quique. Muito difícil de ler por causa do ângulo incomum da raquete.",
      contactPoint: "Faça contato com o lado esquerdo da bola, com a raquete quase na horizontal, recolhendo a bola por baixo e pela lateral. O movimento de gancho roça a bola de lado, na altura do “equador”. O punho se fecha bruscamente para dentro para maximizar o efeito lateral.",
      returnAdvice: "Incline a raquete para neutralizar o forte efeito lateral e faça contato com a lateral da bola, não com a parte de trás. Um toque suave ou um flip banana é mais seguro do que uma batida forte. Mire um pouco no backhand do sacador e mantenha a bola baixa.",
    },
    "hook-backspin-short": {
      name: "Gancho curto com backspin",
      description: "Saque de gancho que combina muito efeito lateral com backspin. Essa rotação dupla torna muito difícil devolver com precisão.",
      contactPoint: "Faça contato com a parte de baixo e da esquerda da bola, com a raquete aberta e inclinada de lado. Roce para baixo e para a direita em um arco de colher, pegando ao mesmo tempo a parte de baixo e a lateral da bola. Esse roçar em dois ângulos combina backspin e efeito lateral.",
      returnAdvice: "Abra mais a raquete e levante com um push roçando a bola para lidar com o backspin forte. Mire um pouco no backhand do sacador para neutralizar o efeito lateral e mantenha a bola baixa. Evite bater reto.",
    },
    "hook-fast-long-topspin": {
      name: "Gancho rápido e longo",
      description: "Variação agressiva do saque de gancho que combina lateral direito com topspin, rápido e longo. O movimento de colher parece gerar backspin, mas depois do quique a bola acelera para a frente com efeito lateral. É mais eficaz misturado com os ganchos com backspin tradicionais, para disfarçar ao máximo.",
      contactPoint: "Faça contato com a parte de trás e da direita da bola, com a raquete levemente fechada. Roce para a frente e para a esquerda em um arco de colher rápido, pegando a parte de cima e a lateral da bola. O movimento de gancho disfarça o contato para cima que gera o topspin, e a finalização lateral acrescenta o lateral direito.",
      returnAdvice: "Feche a raquete e responda com um bloqueio compacto ou com topspin, pegando a bola bem cedo. Não faça push: o topspin vai mandar a bola para fora. Incline a raquete um pouco para a esquerda para neutralizar o lateral direito. Um topspin controlado no meio é a opção de ataque mais segura.",
    },
    "high-toss-backspin": {
      name: "Lançamento alto com muito backspin",
      description: "O lançamento alto dá mais tempo e mais energia para gerar muito efeito. Depois do quique, a bola pode até voltar para trás de forma visível. Muitos jogadores de elite usam esse saque para forçar pushes fracos.",
      contactPoint: "Faça contato com a parte mais baixa da bola, com a raquete bem aberta, quando ela cai do lançamento alto. Roce com força para baixo, aproveitando a energia da queda para aumentar o backspin. O punho estala para baixo no ponto mais baixo do movimento para gerar o máximo de efeito.",
      returnAdvice: "Use a raquete bem aberta e um push mais longo, roçando a bola e levantando um pouco mais. Se vier longo, abra o ponto com um topspin controlado em vez de bater reto. Priorize uma devolução com muito backspin e baixa.",
    },
    "high-toss-sidespin": {
      name: "Lançamento alto com efeito lateral",
      description: "Combina o lançamento alto com efeito lateral e backspin para gerar um efeito combinado muito forte. A bola pode fazer uma curva acentuada e frear na mesa. Exige um timing excepcional.",
      contactPoint: "Faça contato com a parte de baixo e da esquerda da bola, com a raquete aberta, quando ela cai do lançamento alto. Roce para baixo e para a direita em um arco de pêndulo, pegando ao mesmo tempo a parte de baixo e o lado esquerdo. A energia da queda somada ao estalo de punho produz um backspin fortíssimo com lateral esquerdo.",
      returnAdvice: "Abra a raquete e roce para cima e um pouco contra o efeito lateral. Mire um pouco no backhand do sacador para neutralizar a curva e mantenha a bola baixa. Um push suave e com efeito é mais seguro do que uma batida forte.",
    },
    "ghost-serve": {
      name: "Saque fantasma",
      description: "Um lendário saque ultracurto com backspin, famoso nas mãos de Ma Lin. A bola mal passa a rede, quica do lado do adversário e volta em direção à rede (às vezes chega até a cruzá-la de volta). Exige o máximo de backspin, gerado com o punho solto e um contato bem fino na parte de baixo da bola.",
      contactPoint: "Faça contato com a parte mais baixa da bola, com a raquete totalmente aberta (quase na horizontal). Roce com força para baixo, com um toque finíssimo: a raquete mal encosta na bola. Um punho solto e relaxado é essencial para gerar o máximo de backspin, que é o que faz a bola voltar.",
      returnAdvice: "Entre na mesa e pegue a bola logo depois do quique, com a raquete bem aberta e um toque delicado roçando a bola. Devolva curto ou faça um push longo com muito backspin. Não espere, senão a bola volta para a rede.",
    },
    "fast-long-surprise-fh": {
      name: "Rápido e longo no forehand",
      description: "Um saque rápido e de surpresa no canto do forehand do adversário, com contato de topspin/drive. É mais eficaz depois de uma série de saques curtos. A surpresa é a principal arma.",
      contactPoint: "Faça contato com a parte de trás da bola, com a raquete levemente fechada. Atravesse a bola com um golpe rápido e reto, roçando um pouco para cima para acrescentar topspin. O foco é velocidade e energia para a frente, não efeito: contato grosso e extensão rápida do braço.",
      returnAdvice: "Feche a raquete e responda com um bloqueio compacto ou com topspin, pegando a bola cedo. Não faça push. Coloque a bola longa no backhand ou no meio para reduzir o ângulo.",
    },
    "fast-long-surprise-bh": {
      name: "Rápido e longo no backhand",
      description: "Saque rápido no canto do backhand, com contato de topspin/drive. Eficaz contra adversários que ficam muito perto da mesa ou que já se prepararam para receber curto.",
      contactPoint: "Faça contato com a parte de trás da bola, com a raquete levemente fechada, pelo lado do backhand. Atravesse a bola com um golpe rápido e compacto, roçando um pouco para cima. A empunhadura de backhand fecha a raquete naturalmente e acrescenta um toque de topspin à trajetória rápida e tensa.",
      returnAdvice: "Use um bloqueio ou drive de backhand compacto, com a raquete levemente fechada. Pegue cedo e mantenha a bola baixa. Coloque a bola longa no meio ou aberta no forehand para neutralizar o ângulo.",
    },
    "pendulum-corkspin": {
      name: "Pêndulo saca-rolhas",
      description: "Saque pêndulo com eixo de rotação giroscópico, em saca-rolhas. A bola pode oscilar no ar e quicar de forma menos previsível, o que dificulta uma devolução limpa.",
      contactPoint: "Faça contato com a parte de trás e da esquerda da bola, com a raquete fechada. Roce para a frente e em volta da bola, como se a raquete a envolvesse. O punho estala para dentro no contato para criar o eixo giroscópico: o efeito entra na bola em vez de ser só lateral ou para baixo.",
      returnAdvice: "Observe o quique e pegue cedo, com a raquete em ângulo neutro para absorver a oscilação. Um bloqueio controlado ou um toque com leve topspin no meio é a opção mais segura. Ajuste-se depois do primeiro desvio em vez de forçar um ângulo aberto.",
    },
    "backhand-elbow": {
      name: "Backhand no cotovelo",
      description: "Saque de backhand de velocidade média, direto no cotovelo do adversário. O lateral direito acrescenta curva e cria a dúvida entre devolver de forehand ou de backhand.",
      contactPoint: "Faça contato com a parte de trás e da direita da bola, com a raquete levemente aberta, a partir da posição de backhand. Roce de lado para a esquerda e um pouco para baixo. O efeito lateral vem do movimento lateral do punho, e o leve ângulo para baixo acrescenta backspin suficiente para manter a bola baixa.",
      returnAdvice: "Mexa os pés e decida cedo; não estique o braço para alcançar. Se vier longo, faça um topspin ou drive controlado, levantando um pouco mais por causa do backspin. Mire longo no cotovelo ou um pouco no forehand do sacador para neutralizar o efeito lateral.",
    },
    "high-toss-no-spin": {
      name: "Lançamento alto sem efeito",
      description: "Imita quase perfeitamente o saque de lançamento alto com muito backspin, mas vai sem efeito nenhum. O adversário, esperando um backspin extremo, pode fazer o push longo ou alto demais. Exige muita sensibilidade.",
      contactPoint: "Faça contato com a parte de trás e do centro da bola, com a raquete quase reta, embora pareça aberta. A raquete desce como se fosse gerar muito backspin, mas toca a bola com o centro reto da borracha em vez de roçar. O contato grosso e curto anula o efeito, enquanto o braço finaliza o movimento para enganar.",
      returnAdvice: "Coloque seu próprio efeito para ter controle: um flip compacto ou um push com a raquete levemente fechada. Deixe a bola subir um pouco e faça um contato limpo. Evite o toque morto, que levanta a bola.",
    },
    "chop-backspin-short": {
      name: "Corte de forehand curto com backspin",
      description: "O saque mais básico do tênis de mesa. Backspin puro, sem efeito lateral, com colocação curta. É o saque mais fácil de manter baixo e curto, o que dificulta muito o ataque do adversário. Ideal contra topspinners agressivos.",
      contactPoint: "Faça contato com a parte de baixo da bola, com a raquete bem aberta. Corte reto para baixo com um golpe simples e limpo. A raquete roça a bola por baixo, sem movimento lateral, e produz backspin puro. Faça um contato fino para gerar o máximo de efeito, ou um pouco mais grosso para controlar a colocação.",
      returnAdvice: "Abra a raquete e roce a bola por baixo com um push curto, pegando cedo. Devolva curto ou faça um push longo com bom backspin. Mantenha a bola baixa em vez de levantá-la.",
    },
    "chop-no-spin": {
      name: "Corte de forehand sem efeito",
      description: "Usa o mesmo movimento de corte da versão com backspin, mas faz contato com quase nenhum efeito. O adversário, esperando muito backspin, costuma fazer o push longo ou levantar a bola, entregando uma terceira bola fácil.",
      contactPoint: "Faça contato com a parte de trás e do centro da bola, com uma raquete que parece aberta, mas na verdade está mais na vertical do que na versão com backspin. O movimento de corte continua, mas a raquete desliza por trás da bola, e não por baixo, gerando pouquíssimo efeito. A finalização imita a do saque com backspin para disfarçar.",
      returnAdvice: "Coloque seu próprio efeito com um push compacto ou um flip/drive controlado. Mantenha a raquete levemente fechada e a trajetória baixa. Evite o toque morto.",
    },
    "windshield-wiper-sidespin-short": {
      name: "Limpador de para-brisa curto com efeito lateral",
      description: "A raquete varre a bola na horizontal e produz lateral esquerdo com backspin. O mesmo movimento pode gerar qualquer efeito, dependendo do ponto do arco em que acontece o contato, o que o torna muito difícil de ler. É mais eficaz quando passa baixo sobre a rede.",
      contactPoint: "Faça contato com a parte de baixo e da esquerda da bola enquanto a raquete varre da direita para a esquerda em um arco horizontal. Roce para baixo e para a direita, pegando a parte de baixo da bola no meio do arco. A raquete aberta e o contato baixo combinam backspin com lateral esquerdo.",
      returnAdvice: "Leia o contato e responda com a raquete aberta e um push curto roçando a bola. Mire um pouco no backhand do sacador para neutralizar o efeito lateral. Mantenha a bola baixa e curta, a menos que consiga fazer um push longo com muito efeito.",
    },
    "windshield-wiper-topspin": {
      name: "Limpador de para-brisa com topspin",
      description: "O mesmo movimento de limpador de para-brisa, mas com o contato em outro ponto do arco para gerar topspin em vez de backspin. Quem lê como backspin e faz push manda a bola longa ou alta.",
      contactPoint: "Faça contato com a parte de trás e de cima da bola no final do arco, e não no meio. A raquete pega a bola mais tarde na varredura, quando o movimento já vai para cima e para a frente. Com a raquete levemente fechada, roce por cima da bola para gerar topspin, enquanto o movimento lateral acrescenta efeito lateral.",
      returnAdvice: "Não faça push. Feche a raquete e bloqueie ou devolva com topspin cedo. Mire um pouco no backhand do sacador para neutralizar o efeito lateral e mantenha a bola baixa.",
    },
    "hidden-serve": {
      name: "Saque escondido (ilegal)",
      description: "Um saque em que o ponto de contato fica escondido de propósito atrás do corpo ou do braço livre. Era permitido até a mudança na regra do saque de 1º de setembro de 2002 e ainda aparece às vezes no jogo amador.",
      contactPoint: "O contato varia: como fica escondido, o sacador pode gerar qualquer efeito. Normalmente a parte de baixo e da esquerda da bola é atingida com a raquete aberta para gerar muito efeito lateral com backspin, mas, como está escondido, o recebedor não consegue ver o ângulo exato do contato nem a direção do roçar.",
      returnAdvice: "Priorize o controle: assuma que vem efeito lateral com backspin e use a raquete aberta com um push baixo e com efeito. Mire um pouco contra o efeito e mantenha a bola baixa nos cantos. Se não deu para ver o contato, peça ao árbitro uma advertência ao sacador.",
      legalityNotes: "Ilegal pelas regras da ITTF desde 1º de setembro de 2002. Do início do saque até o momento do golpe, a bola não pode ficar escondida do recebedor, e o braço livre deve sair do espaço entre a bola e a rede. Um saque duvidoso pode receber uma advertência na primeira vez; os saques duvidosos seguintes podem custar um ponto.",
    },
    "finger-spin-serve": {
      name: "Saque com efeito de dedos (ilegal)",
      description: "O sacador usa os dedos para dar efeito à bola no lançamento, em vez de gerar o efeito com a raquete. Produz um efeito enganoso com um movimento aparentemente simples.",
      contactPoint: "O efeito é gerado pelos dedos no lançamento, não no contato com a raquete. Os dedos giram a bola ao soltá-la e dão backspin ou efeito lateral antes mesmo de a raquete tocar nela. O contato da raquete pode ser quase reto, e o efeito parece surgir do nada.",
      returnAdvice: "Observe a rotação da bola no lançamento e ajuste o ângulo da raquete a esse efeito. Use a raquete aberta e um push suave e com efeito, ou um topspin controlado se vier longo. Mantenha a devolução baixa.",
      legalityNotes: "Ilegal. O saque deve começar com a bola repousando livremente na palma da mão aberta, e o lançamento deve ser quase vertical, sem dar efeito. Dar efeito à bola com os dedos no lançamento viola essa regra.",
    },
  },

  motions: {
    pendulum: {
      name: "Pêndulo",
      description: "O saque mais comum do tênis de mesa. A raquete oscila como um pêndulo da direita para a esquerda (para destros) e gera efeito lateral combinado com backspin ou topspin. Muito versátil: o mesmo movimento permite muitas variações de efeito.",
    },
    "reverse-pendulum": {
      name: "Pêndulo inverso",
      description: "A raquete oscila da esquerda para a direita (para destros) e gera efeito lateral no sentido oposto ao do pêndulo comum. É menos comum, por isso o adversário tem mais dificuldade para ler.",
    },
    tomahawk: {
      name: "Tomahawk",
      description: "Um saque em que a raquete sai para fora em um movimento de arremesso, como quem lança uma machadinha. Gera muito efeito lateral e pode ser combinado com topspin para a bola escapar no quique. Popular no estilo de jogo asiático. Observação: não há consenso sobre o lado; a escola chinesa costuma considerá-lo um saque de forehand (o contato é feito com a borracha do forehand), enquanto alguns técnicos ocidentais o classificam como de backhand por causa da postura.",
    },
    "reverse-tomahawk": {
      name: "Tomahawk inverso",
      description: "Começa com o mesmo movimento de arremesso para fora de um tomahawk comum, mas no último instante faz o contato com o lado do backhand da raquete e gera lateral esquerdo em vez de direito. Como o início do movimento é idêntico, engana muito. Popularizado por Ding Ning e usado também por Kenta Matsudaira.",
    },
    backhand: {
      name: "Saque de backhand",
      description: "Um saque compacto feito pelo lado do backhand. Permite uma transição rápida para a próxima bola e engana naturalmente por causa da posição do punho. Muitos jogadores europeus o usam com eficiência.",
    },
    "hook-shovel": {
      name: "Gancho",
      description: "Um saque pouco convencional em que a raquete recolhe a bola por baixo com um movimento de gancho, como uma colher. Gera muito efeito lateral com backspin. O ponto de contato incomum o torna muito difícil de ler.",
    },
    chop: {
      name: "Corte de forehand",
      description: "Um movimento simples de corte para baixo com a raquete aberta, que gera backspin puro, sem efeito lateral. O saque mais básico do tênis de mesa: fácil de aprender, fácil de manter curto e eficaz para evitar devoluções agressivas. Costuma ser o primeiro saque ensinado aos iniciantes.",
    },
    "windshield-wiper": {
      name: "Limpador de para-brisa",
      description: "A raquete varre na horizontal, em um arco como um limpador de para-brisa, roçando a parte de trás da bola. Dependendo do ponto do arco em que acontece o contato, o mesmo movimento gera efeito lateral, topspin ou backspin. Como parece sempre igual, seja qual for o efeito, engana muito. Exige uma base baixa e com as pernas bem afastadas.",
    },
    "high-toss": {
      name: "Pêndulo com lançamento alto",
      description: "Um saque pêndulo com lançamento alto da bola (normalmente de 2 a 5 metros). A altura extra da queda acrescenta energia e aumenta o potencial de efeito. Exige um timing excelente, mas gera um efeito excepcionalmente forte.",
    },
  },

  spins: {
    "pure-backspin": {
      name: "Backspin puro",
      description: "Rotação para trás limpa, que faz a bola deslizar baixa e frear do lado do adversário. Se o push for feito sem compensar, a devolução tende a ir para a rede.",
    },
    "heavy-backspin": {
      name: "Backspin forte",
      description: "O máximo de rotação para trás. A bola agarra na mesa e pode até voltar em direção à rede. Extremamente difícil de atacar com flip ou topspin.",
    },
    "pure-topspin": {
      name: "Topspin puro",
      description: "Rotação para a frente que faz a bola acelerar depois do quique. Muito usado em saques rápidos e longos para apressar o adversário.",
    },
    "left-side-backspin": {
      name: "Lateral esquerdo + backspin",
      description: "A combinação clássica do pêndulo. Do ponto de vista do sacador, a bola faz curva para a direita e quica com rotação para trás. Muito comum em competição.",
    },
    "right-side-backspin": {
      name: "Lateral direito + backspin",
      description: "A combinação do pêndulo inverso ou do tomahawk. Do ponto de vista do sacador, a bola faz curva para a esquerda. É menos comum, por isso o adversário tem mais dificuldade para ler.",
    },
    "left-side-topspin": {
      name: "Lateral esquerdo + topspin",
      description: "Uma combinação enganosa: a bola parece ter backspin, mas acelera para a frente. Serve para surpreender o adversário que espera rotação para trás.",
    },
    "right-side-topspin": {
      name: "Lateral direito + topspin",
      description: "Combinação típica do tomahawk, que faz a bola escapar com força para o lado no quique. Eficaz para preparar o ataque de forehand.",
    },
    "no-spin": {
      name: "Sem efeito (bola morta)",
      description: "Uma bola morta, quase sem rotação. Imita o movimento de um saque com efeito, mas a bola flutua. O adversário que espera efeito lê a bola completamente errado.",
    },
    "pure-left-sidespin": {
      name: "Lateral esquerdo puro",
      description: "Forte rotação lateral, quase sem topspin ou backspin. A bola faz uma curva acentuada no ar e escapa para o lado no quique.",
    },
    "pure-right-sidespin": {
      name: "Lateral direito puro",
      description: "Forte rotação lateral no sentido oposto. Eficaz com os movimentos de pêndulo inverso e tomahawk.",
    },
    "light-backspin": {
      name: "Backspin leve",
      description: "Uma rotação para trás sutil, difícil de diferenciar de uma bola sem efeito. A bola flutua um pouco mais que uma bola morta e deixa o adversário em dúvida entre fazer push ou flip.",
    },
    "heavy-left-side-backspin": {
      name: "Lateral esquerdo forte + backspin",
      description: "O efeito combinado máximo do movimento de pêndulo. A bola faz curva, cai e freia com força. O saque característico de muitos jogadores de elite.",
    },
    corkspin: {
      name: "Efeito saca-rolhas",
      description: "Um eixo de rotação giroscópico que deixa o quique imprevisível. A bola parece oscilar e mudar de direção no meio do voo.",
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
      label: "Meio longo",
      secondBouncePosition: "Bem na linha de fundo: comprimento ambíguo",
    },
    "long-medium": {
      label: "Longo (profundo)",
      secondBouncePosition: "Cairia bem depois da mesa",
    },
    "long-high": {
      label: "Longo (rápido e profundo)",
      secondBouncePosition: "Bem longe da mesa",
    },
    "deep-long": {
      label: "Longo no fundo (linha de fundo)",
      secondBouncePosition: "Bem na linha de fundo do adversário. Mesmo sendo longo, um saque profundo bem colocado deixa o adversário sem espaço e dificulta um ataque de qualidade.",
    },
  },

  speeds: {
    slow: {
      tacticalNote: "Permite o máximo de efeito. Dá ao sacador mais tempo para se preparar para a próxima bola.",
    },
    medium: {
      tacticalNote: "Equilibra efeito e velocidade. Reduz o tempo de reação do adversário sem perder o controle.",
    },
    fast: {
      tacticalNote: "Apressa o adversário. Troca efeito por velocidade pura para forçar uma devolução fraca ou um ponto direto.",
    },
  },

  trajectories: {
    flat: {
      netClearance: "Rente à rede (1-3 cm)",
    },
    "low-arc": {
      netClearance: "Parábola baixa sobre a rede (5-15 cm)",
    },
    "high-arc": {
      netClearance: "Parábola alta sobre a rede (mais de 20 cm)",
    },
  },

  tosses: {
    "low-legal": {
      position: "Palma aberta, bola visível, lançada cerca de 16 cm para cima",
    },
    "medium-legal": {
      position: "Palma aberta, bola visível, lançada cerca de 30-50 cm para cima",
    },
    "high-legal": {
      position: "Palma aberta, bola visível, lançada de 2 a 5 metros para cima",
    },
    "hidden-illegal": {
      position: "Bola escondida atrás do corpo ou do braço durante o lançamento: ilegal pelas regras da ITTF",
    },
  },

  deceptions: {
    "fake-backspin": {
      name: "Falso backspin",
      description: "O sacador imita o movimento de um saque com muito backspin, mas faz contato com pouco efeito ou com topspin. O adversário espera backspin e faz o push longo ou na rede.",
      counterplay: "Observe de perto o ponto de contato. Se a raquete desliza por baixo da bola, é backspin. Se roça a parte de trás, provavelmente é sem efeito ou topspin.",
    },
    "same-motion": {
      name: "Mesmo movimento, efeitos diferentes",
      description: "Vários efeitos saem de um movimento de saque idêntico. O adversário não consegue diferenciar backspin, sem efeito e efeito lateral.",
      counterplay: "Preste atenção ao som do contato e à trajetória da bola, não ao movimento do braço. Treine a leitura do voo da bola.",
    },
    "contact-hiding": {
      name: "Esconder o ponto de contato",
      description: "O sacador usa a posição do corpo ou o ângulo do braço para esconder o momento e o ângulo exatos do contato da raquete com a bola.",
      counterplay: "Posicione-se de forma a enxergar além do corpo do sacador. Se o contato ficar totalmente escondido, peça ao árbitro que aplique as regras de visibilidade.",
    },
    "wrist-snap": {
      name: "Falso estalo de punho",
      description: "Um estalo de punho rápido sugere muito efeito, mas o ângulo da raquete no contato gera bem menos efeito do que o esperado.",
      counterplay: "Não reaja só à velocidade do punho. Observe o comportamento da bola logo depois do quique.",
    },
    "speed-variation": {
      name: "Variação de velocidade",
      description: "Alternar saques rápidos e lentos com o mesmo movimento para atrapalhar o timing e a movimentação do adversário.",
      counterplay: "Fique na ponta dos pés, em uma posição de expectativa neutra. Leia cedo a velocidade da bola e ajuste sua preparação.",
    },
    "body-feint": {
      name: "Finta de corpo",
      description: "O sacador mexe o ombro, o quadril ou a cabeça para sugerir uma colocação ou um efeito diferentes dos que realmente executa.",
      counterplay: "Ignore a linguagem corporal e foque na raquete e na bola. Treine para ler o efeito pela rotação da bola, não pelos movimentos do sacador.",
    },
  },

  tacticalPurposes: {
    "force-weak-return": {
      name: "Forçar devolução fraca",
      goal: "Fazer o adversário devolver uma bola alta ou longa que possa ser atacada na terceira bola.",
    },
    "set-up-fh-attack": {
      name: "Preparar o ataque de forehand",
      goal: "Colocar o saque para que a devolução venha no forehand, permitindo um topspin agressivo ou uma cortada.",
    },
    "prevent-flip": {
      name: "Evitar o flip",
      goal: "Manter o saque curto e baixo o bastante para que o adversário não consiga fazer flip nem atacar.",
    },
    "force-push": {
      name: "Forçar o push",
      goal: "Muito backspin para obrigar o adversário a fazer push, dando ao sacador a iniciativa na terceira bola.",
    },
    "target-elbow": {
      name: "Mirar no cotovelo",
      goal: "Mirar no cotovelo do adversário (o ponto de transição) para criar dúvida entre forehand e backhand.",
    },
    "go-for-ace": {
      name: "Buscar o ponto direto",
      goal: "Um saque de alto risco pensado para ganhar o ponto direto pela velocidade, pela colocação ou pelo disfarce.",
    },
    "serve-plus-one-fh": {
      name: "Saque + 1 de forehand",
      goal: "Padrão de saque pensado para que a devolução esperada possa ser atacada de forehand a partir de uma posição preparada.",
    },
    "serve-plus-one-bh": {
      name: "Saque + 1 de backhand",
      goal: "Padrão de saque pensado para que a devolução esperada possa ser atacada com um drive ou topspin de backhand.",
    },
  },

  placements: {
    "fh-short": {
      label: "Forehand curto",
    },
    "bh-short": {
      label: "Backhand curto",
    },
    "fh-long": {
      label: "Forehand longo",
    },
    "bh-long": {
      label: "Backhand longo",
    },
    "middle-short": {
      label: "Meio curto (cotovelo)",
    },
    "middle-long": {
      label: "Meio longo (cotovelo)",
    },
  },
};
