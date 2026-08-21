/* ═══ DADOS DA ATA ════════════════════════════════════════════════════════
   Nova reunião: acrescente um objeto em REUNIOES com a ata completa por
   assunto, e as ações novas dentro do projeto correspondente em PROJETOS.
   id da ação: chave estável — é o que liga a linha do banco à ação certa.
   ════════════════════════════════════════════════════════════════════════ */

const REUNIOES = [
  {
    id: "2026-08-21",
    data: "2026-08-21",
    titulo: "Definição do cardápio de verão",
    participantes: "Fred, Yuri e Débora",
    ata: [
      {
        id: "itens-definidos",
        titulo: "Os itens do cardápio",
        projetoId: "cardapio-verao",
        produtosDe: "cardapio-verao",
        paragrafos: [
          "Ficaram definidos os dez itens que entram no cardápio de verão: torta quente, torta gelada, Ice Cookie, cookie da felicidade, cookie com sorvete, cookie fries com sorvete, cookie no palito, panelinha, casquinha de sorvete de cookie e frozen de maracujá com manga. A ação que vencia em 31/08 fecha com dez dias de antecedência.",
          "Cada item saiu com um ponto de partida, e não só com o nome. Seis têm referência em vídeo; a torta gelada sai do cardápio de Natal e a torta quente é massa de cookie em outros sabores, ambas com três sabores; o frozen aproveita o de morango que a loja já vende, mudando só para maracujá com manga. O cookie da felicidade é o Pote da Felicidade, que existe no mercado mas a loja ainda não faz — é o que começa mais do zero.",
          "Nove dos dez itens dependem de frio. O único que não depende é a torta quente — até o cookie no palito entra, porque a cobertura dele é a mesma casquinha do sorvete e derrete fora da geladeira. É esse número que manda na logística de transporte, no espaço de freezer da loja e em boa parte do investimento em equipamento."
        ]
      },
      {
        id: "proximo-passo",
        titulo: "O próximo passo: teste, CMV e preço",
        projetoId: "cardapio-verao",
        paragrafos: [
          "Com a lista fechada, o projeto sai da ideia e entra na conta. O próximo passo é testar os produtos e levantar o CMV de cada um, porque é o CMV que diz se o preço fecha em loja. O preço precisa estar decidido antes de o cardápio impresso ir para produção, em 24/09.",
          "Três frentes novas apareceram junto com a lista, e nenhuma delas é de marketing, é de operação: os utensílios que cada loja vai ter de comprar, produto a produto; o transporte dos insumos até a loja, agora com cadeia de frio; e o espaço de armazenamento, que é o ponto mais apertado, porque nove dos dez itens precisam de frio e freezer de loja é limitado.",
          "Depois da degustação de 11/09, o que for aprovado precisa virar ficha técnica e vídeo do processo de produção nas lojas, para a equipe conseguir repetir o produto igual todos os dias. Isso não estava no cronograma fechado em 11/08 e entra na janela entre 11/09 e 01/10.",
          "Para o cardápio completo e o material impresso, ficou uma decisão em aberto: as fotos saem de uma sessão fotográfica profissional ou são geradas por IA. Enquanto não for decidida, a produção de 24/09 não começa."
        ]
      }
    ]
  },
  {
    id: "2026-08-11",
    data: "2026-08-11",
    titulo: "Reunião de Marketing — pauta sem o Bruno",
    participantes: "Fred, Yuri e Débora",
    ausentes: "Bruno",
    ata: [
      {
        id: "abertura",
        titulo: "Abertura",
        paragrafos: [
          "A reunião foi convocada para avançar os assuntos que não dependiam do Bruno, que não participou. A avaliação foi de que valia a pena reunir mesmo sem ele, para não travar o andamento de três frentes que já estavam paradas.",
          "Participaram Fred, Yuri e Débora. Ficou definido que todas as ações dos três projetos tratados são do Marketing, que executa na sequência — a analista da área não participou desta reunião."
        ]
      },
      {
        id: "lancamento",
        titulo: "Lançamentos de agosto",
        projetoId: "lancamento-agosto",
        paragrafos: [
          "Entram dois produtos novos ainda em agosto: o Cookie da França e o Brookie. Os nomes oficiais não foram confirmados na reunião e precisam ser fechados antes de qualquer peça de divulgação ser produzida.",
          "Ficou acordado que o Marketing vai registrar o aumento de vendas associado à divulgação, dia a dia — primeiro dia, segundo dia e terceiro dia. Depois da reunião, Fred observou que três dias podem não pegar a curva inteira do efeito e sugeriu estender a janela para cinco dias, o que seria mais que suficiente. A decisão entre 3 e 5 dias ainda não foi tomada.",
          "O ponto de fundo é que hoje a divulgação é avaliada no olho. A proposta é que passe a ser feita e medida por métricas de alcance e de venda — o que só funciona se houver registro diário desde o primeiro dia."
        ]
      },
      {
        id: "canais",
        titulo: "Canais de divulgação",
        projetoId: "lancamento-agosto",
        paragrafos: [
          "A divulgação não pode continuar restrita ao Instagram. A operação já tem quatro canais orgânicos de aquisição de cliente, e três deles estão parados.",
          "Instagram é o único canal usado com constância hoje. Continua sendo a peça principal, mas deixa de ser a única. Falta definir a data e o formato do post.",
          "Lista de transmissão no WhatsApp — a antiga lista de transmissão. O problema levantado é que a maioria das lojas não tem a lista montada. Não adianta escrever a mensagem antes de existir para quem mandar: primeiro é preciso montar as listas, e para isso o Marketing precisa sugerir às lojas como montar, com um passo a passo.",
          "Display de loja são, na verdade, duas peças diferentes que estavam sendo tratadas como uma só: a que fica no balcão, para quem já está dentro da loja, e a que vai dentro do pedido, para quem leva embora.",
          "Delivery ficou como pergunta em aberto. O canal existe, ninguém usa para divulgar, e não se definiu qual ação cabe ali — panfleto junto ao pedido, cupom, brinde — nem como a loja executa isso sem travar a saída dos pedidos.",
          "Em todos os casos, o plano de ação precisa descer ao nível do que a loja faz na prática, porque quem executa na ponta é a loja e não o Marketing."
        ]
      },
      {
        id: "aniversario",
        titulo: "Aniversário da marca",
        projetoId: "aniversario-marca",
        paragrafos: [
          "A campanha de aniversário tem objetivo duplo: fortalecer a marca e, ao mesmo tempo, aumentar o volume de vendas em todas as lojas — não apenas nas mais fortes.",
          "O aniversário é 7 de setembro, mas a campanha vai ocupar o mês inteiro. Isso muda completamente o prazo: para estar no ar em 1º de setembro, a campanha precisa estar fechada até 20 de agosto, no máximo, deixando margem para produzir e distribuir às lojas.",
          "Nenhum conteúdo foi definido. O projeto está travado num único ponto — marcar a data do brainstorm — e, com o limite de 20 de agosto, esse é hoje o item mais urgente dos três projetos.",
          "Também não se definiu o que “campanha o mês todo” significa na prática: uma ação por semana, uma promoção contínua, ou uma peça única que fica no ar o mês inteiro."
        ]
      },
      {
        id: "cardapio",
        titulo: "Cardápio de verão",
        projetoId: "cardapio-verao",
        paragrafos: [
          "O cardápio de verão foi o único assunto que saiu da reunião com cronograma fechado de ponta a ponta.",
          "31 de agosto: as ideias do cardápio precisam estar fechadas. 11 de setembro: degustação, para validar o que foi fechado. Até 24 de setembro: produção do cardápio completo e de todo o material impresso. 25 de setembro: abre a solicitação e os produtos são liberados na fábrica para serem comprados pelas lojas. 1º de outubro: início da venda nas lojas, com divulgação de marketing.",
          "As datas são encadeadas — atraso no fechamento das ideias empurra a degustação, a impressão e a compra de insumos. A data de 1º de outubro é a que não deveria se mexer.",
          "As lojas precisam receber esse calendário antes de 25 de setembro. É nesse dia que abre a compra na fábrica, e sem o calendário na mão a loja não se programa para comprar.",
          "A data da divulgação no Instagram do cardápio não foi definida. Provavelmente cai junto com o início da venda, mas isso ficou em aberto."
        ]
      },
      {
        id: "nao-fechados",
        titulo: "Apareceram e não foram fechados",
        paragrafos: [
          "Campanha “primeiro pedido do dia”: o primeiro pedido de cada dia ganharia em dobro, ou ganharia um cookie a mais, com um vídeo publicado todos os dias mostrando quem ganhou naquele dia. Foi levantada na gravação, mas não foi retomada nem virou ação.",
          "Custo com freelancers nas lojas: hoje o Eduardo, gerente das lojas, envia um valor fechado de pagamento, sem detalhar qual dia o freelancer trabalhou nem por quê. A intenção não é questionar a autonomia, a capacidade de decisão ou o trabalho dele, e sim conseguir ler a demanda real da loja — mas toda vez que o assunto sobe, ele é lido como questionamento. Não é assunto de marketing e não foi tratado nesta reunião."
        ]
      }
    ]
  }
];

const PROJETOS = [
  {
    id: "lancamento-agosto",
    nome: "Lançamento de Agosto",
    resumo: "Dois produtos novos entram em agosto, com medição diária do efeito da divulgação sobre as vendas.",
    responsavel: "Marketing",
    detalhe: [
      "Entram dois produtos em agosto: o Cookie da França e o Brookie (nomes oficiais ainda a confirmar).",
      "A equipe de Marketing vai registrar o aumento de vendas associado à divulgação, dia a dia — D1, D2 e D3. Fora da reunião, Fred sugeriu estender a janela para 5 dias, o suficiente para pegar a curva completa de decaimento.",
      "A divulgação sai do Instagram e vai para os quatro canais orgânicos que a operação já tem. Cada canal precisa da peça pronta e da instrução de execução, porque quem roda isso na ponta é a loja."
    ],
    acoes: [
      { id: "ag-nomes",      grupo: "Produtos", o: "Confirmar os nomes oficiais dos dois produtos", prazo: null, prazoTxt: "A definir", status: "aberta", reuniao: "2026-08-11" },
      { id: "ag-listas",     grupo: "Canais de divulgação", o: "Montar a lista de transmissão nas lojas que ainda não têm — a maioria não tem", prazo: null, prazoTxt: "A definir", status: "bloqueia", reuniao: "2026-08-11" },
      { id: "ag-mensagens",  grupo: "Canais de divulgação", o: "Escrever as mensagens prontas para as lojas dispararem na lista de transmissão", prazo: null, prazoTxt: "A definir", status: "aberta", reuniao: "2026-08-11" },
      { id: "ag-display",    grupo: "Canais de divulgação", o: "Definir a peça de display: a de balcão e a que vai junto com o pedido", prazo: null, prazoTxt: "A definir", status: "aberta", reuniao: "2026-08-11" },
      { id: "ag-delivery",   grupo: "Canais de divulgação", o: "Definir qual é a ação no delivery e como a loja executa na prática", prazo: null, prazoTxt: "A definir", status: "aberta", reuniao: "2026-08-11" },
      { id: "ag-instagram",  grupo: "Canais de divulgação", o: "Definir a data e o formato do post de divulgação no Instagram", prazo: null, prazoTxt: "A definir", status: "aberta", reuniao: "2026-08-11" },
      { id: "ag-janela",     grupo: "Medição", o: "Decidir a janela de medição: 3 dias (acordado) ou 5 dias (sugestão do Fred)", prazo: null, prazoTxt: "A definir", status: "aberta", reuniao: "2026-08-11" },
      { id: "ag-medicao",    grupo: "Medição", o: "Registrar o aumento de vendas por dia de divulgação (D1, D2, D3)", prazo: null, prazoTxt: "Durante a divulgação", status: "aberta", reuniao: "2026-08-11" }
    ],
    abertos: [
      "Nenhuma ação deste projeto tem data — só janela. É o projeto mais exposto a atraso, e agosto já passou da metade.",
      "Como o Marketing chega nas lojas para montar a lista de transmissão: manda o passo a passo direto ou passa pelo Eduardo?"
    ]
  },
  {
    id: "aniversario-marca",
    nome: "Aniversário da Marca",
    resumo: "Aniversário em 7 de setembro, campanha o mês inteiro — mas tem que estar fechada até 20 de agosto.",
    responsavel: "Marketing",
    detalhe: [
      "A campanha tem objetivo duplo: fortalecer a marca e aumentar o volume de vendas em todas as lojas, não só nas mais fortes.",
      "O aniversário cai em 7 de setembro, mas a campanha ocupa o mês inteiro. Isso puxa todo o prazo para trás: ela precisa estar fechada até 20 de agosto, no máximo, para dar tempo de produzir e chegar nas lojas antes de 1º de setembro.",
      "E é o único projeto travado num ponto só: marcar a data do brainstorm. Com o limite em 20/08, esse é o item mais urgente dos três projetos."
    ],
    acoes: [
      { id: "an-data",       o: "Marcar a data do brainstorm da campanha", prazo: null, prazoTxt: "Esta semana", status: "bloqueia", reuniao: "2026-08-11" },
      { id: "an-brainstorm", o: "Rodar o brainstorm da campanha de aniversário", prazo: null, prazoTxt: "Antes de 20/08", status: "aberta", reuniao: "2026-08-11" },
      { id: "an-fechamento", o: "Campanha fechada e pronta para produção — data limite", prazo: "2026-08-20", status: "aberta", reuniao: "2026-08-11" },
      { id: "an-noar",       o: "Campanha no ar em todas as lojas — roda setembro inteiro", prazo: "2026-09-01", status: "aberta", reuniao: "2026-08-11" }
    ],
    abertos: [
      "A data do brainstorm ainda não foi marcada — e o fechamento é em 20/08.",
      "O que “campanha o mês todo” significa na prática: uma ação por semana, promoção contínua, ou peça única que fica no ar?",
      "Não há orçamento definido para a campanha."
    ]
  },
  {
    id: "cardapio-verao",
    nome: "Cardápio de Verão",
    pagina: "cardapio-verao/",
    resumo: "Os 10 produtos estão fechados e cada um já tem referência. Agora é teste, CMV e o que cada loja precisa comprar para conseguir produzir.",
    responsavel: "Marketing",
    produtos: [
      {
        id: "ice-cookie",
        nome: "Ice Cookie",
        tag: "congelado",
        base: "Cookie com sorvete no meio, no formato de sanduíche. A referência mostra os potes já montados e empilhados no freezer.",
        ref: "https://www.instagram.com/reel/DbwEaSOMMbh/",
        foto: "cardapio-verao/fotos/ice-cookie.jpg",
        fotoFonte: "capa do reel de referência",
        perguntas: [
          "Quantos sabores entram? Ainda não foi definido, e cada sabor a mais é mais espaço parado no freezer.",
          "Monta na loja na hora ou chega pronto e congelado da fábrica? Na referência vem pré-montado.",
          "Quanto ocupa por unidade no freezer e qual o giro esperado por loja.",
          "A embalagem aguenta o caminho do freezer até o cliente sem derreter, inclusive no delivery?"
        ]
      },
      {
        id: "cookie-sorvete",
        nome: "Cookie com sorvete",
        tag: "congelado",
        base: "Cookie servido com sorvete, no pote.",
        ref: "https://www.instagram.com/reels/DairYfHKOg5/",
        foto: "cardapio-verao/fotos/cookie-sorvete.jpg",
        fotoFonte: "capa do reel de referência",
        perguntas: [
          "Qual o sabor do sorvete? Ainda não foi definido.",
          "Bola porcionada na hora exige boleador, cuba e espaço de freezer para a cuba aberta. A loja tem os três?",
          "Serve em pote, em prato ou em embalagem de viagem?"
        ]
      },
      {
        id: "cookie-fries",
        nome: "Cookie fries + sorvete",
        tag: "congelado",
        base: "Cookie em formato de fritas, acompanhado de sorvete de creme — o sabor já está definido.",
        ref: "https://www.instagram.com/p/DScWHVnD2z8/",
        foto: "cardapio-verao/fotos/cookie-fries.jpg",
        fotoFonte: "capa do post de referência",
        perguntas: [
          "O sorvete vai em pote separado, para mergulhar, como na referência? Se for sorvete de máquina, é equipamento.",
          "A embalagem de fritas (cone ou caixinha) é comprada pronta e personalizada? Tem prazo de gráfica, e esse prazo não está no cronograma.",
          "Sai da mesma massa e do mesmo forno do cookie ou é massa própria?"
        ]
      },
      {
        id: "panelinha",
        nome: "Panelinha",
        tag: "quente + frio",
        base: "Cookie assado na panelinha, servido com sorvete e fruta por cima. Único item que junta quente e frio na mesma montagem.",
        ref: "https://www.instagram.com/reel/DbDmYEyu2XU/",
        foto: "cardapio-verao/fotos/panelinha.jpg",
        fotoFonte: "capa do reel de referência",
        perguntas: [
          "A panelinha é utensílio reutilizável (a loja lava e reusa) ou é descartável e entra no CMV? Muda a lista de compra e muda o custo por unidade.",
          "Se for reutilizável: quantas por loja, e o que acontece no delivery — vai embora com o cliente?",
          "Vai ao forno na hora? Se sim, prende por quanto tempo o forno que já é usado para o cookie."
        ]
      },
      {
        id: "casquinha",
        nome: "Casquinha de sorvete de cookie",
        tag: "congelado",
        base: "Sorvete servido dentro de uma casquinha de cookie.",
        ref: "https://www.instagram.com/reel/Dav43gPyvfI/",
        foto: "cardapio-verao/fotos/casquinha.jpg",
        fotoFonte: "capa do reel de referência",
        perguntas: [
          "É bola em casquinha ou sorvete de máquina? Essa é a resposta que mais muda o investimento da loja.",
          "A casquinha é comprada pronta ou é feita de massa de cookie na loja?",
          "Onde a casquinha fica estocada: ocupa espaço seco e quebra fácil no transporte."
        ]
      },
      {
        id: "cookie-palito",
        nome: "Cookie no palito",
        tag: "precisa de frio",
        base: "Cookie espetado no palito, com cobertura. A cobertura é igual à do sorvete — aquela casquinha que derrete se ficar fora da geladeira. É o que faz a diferença no produto, e é por isso que ele entra na cadeia de frio.",
        ref: "https://www.instagram.com/reel/DbJhK6vJVF2/",
        foto: "cardapio-verao/fotos/cookie-palito.jpg",
        fotoFonte: "capa do reel de referência",
        perguntas: [
          "Se não pode ficar fora da geladeira, onde ele fica exposto? Expositor de balcão comum está descartado — ou é vitrine refrigerada, ou sai do freezer só na hora.",
          "O palito entra como insumo no CMV: quantos vêm por pacote e quem compra.",
          "Quantas coberturas e quantos sabores entram? Cada um é mais tempo de montagem e mais espaço."
        ]
      },
      {
        id: "cookie-felicidade",
        nome: "Cookie da Felicidade",
        tag: "gelado · a confirmar",
        base: "É o Pote da Felicidade, algo que já existe no mercado. A loja ainda não faz — então não há receita, custo nem processo de partida, é o item que começa mais do zero.",
        foto: "cardapio-verao/fotos/cookie-felicidade.jpg",
        fotoFonte: "modelo de mercado — pote da felicidade padrão, para referência",
        perguntas: [
          "Qual o sabor do sorvete que vai nele? Ainda não foi definido.",
          "Provavelmente é gelado — precisa ser confirmado, porque muda a conta de espaço no freezer.",
          "O que entra no pote e em quantas camadas: é o que define o CMV e o tempo de montagem.",
          "O pote é comprado pronto e personalizado? Se for impresso, tem prazo de gráfica."
        ]
      },
      {
        id: "torta-quente",
        nome: "Torta quente",
        tag: "forno",
        base: "Massa de cookie em outros sabores, servida quente. São três sabores.",
        foto: "cardapio-verao/fotos/torta.jpg",
        fotoFonte: "foto da torta de cookie que a loja já faz",
        perguntas: [
          "Quais são os três sabores? Cada um é um insumo novo na lista de compra da loja.",
          "Assa na loja ou chega pronta e só é aquecida? Se assa, prende o forno do cookie por quanto tempo e em qual horário.",
          "Vai acompanhada de sorvete? Se for, ela também entra na conta do freezer.",
          "Qual embalagem de viagem aguenta o produto quente."
        ]
      },
      {
        id: "torta-gelada",
        nome: "Torta gelada",
        tag: "refrigerado",
        base: "Conforme o cardápio de Natal — a receita já existe e já rodou em loja. São três sabores.",
        foto: "cardapio-verao/fotos/torta.jpg",
        fotoFonte: "foto da torta de cookie que a loja já faz",
        perguntas: [
          "Quais são os três sabores do verão? São os mesmos do Natal ou muda?",
          "O CMV e o rendimento do Natal já estão levantados? Se estiverem, esse item entra com número na mão e economiza uma etapa.",
          "Fica em freezer ou em vitrine refrigerada, e qual a validade depois de descongelada."
        ]
      },
      {
        id: "frozen",
        nome: "Frozen de maracujá com manga",
        tag: "congelado",
        base: "A loja já tem frozen de morango. O item novo do cardápio é o de maracujá com manga — ou seja, a máquina, o copo e o processo já existem; o que entra novo é o sabor.",
        fotoFonte: "sem foto ainda — a do frozen de morango que a loja já vende resolve",
        perguntas: [
          "O equipamento do frozen de morango dá conta de mais um sabor ao mesmo tempo, ou é um de cada vez?",
          "A polpa de maracujá e a de manga são insumos novos: quem fornece e a que custo.",
          "Copo, tampa e canudo já são os mesmos do morango? Se forem, não entram como item novo na lista da loja."
        ]
      }
    ],
    detalhe: [
      "O cronograma foi fechado de ponta a ponta na reunião, encadeando fechamento de ideias, degustação, produção do material impresso, liberação de compra na fábrica e início da venda.",
      "Cada data depende da anterior: um atraso no fechamento das ideias em 31/08 empurra a degustação, a impressão e a compra de insumos — e 1º de outubro é a data que não deveria se mexer.",
      "As lojas precisam receber esse calendário antes de 25/09, porque é nesse dia que abre a solicitação de compra na fábrica. Sem o calendário na mão, a loja não se programa para comprar."
    ],
    acoes: [
      { id: "cv-ideias",        grupo: "Produto e custo", o: "Fechar as ideias do cardápio de verão", prazo: "2026-08-31", status: "aberta", reuniao: "2026-08-11" },
      { id: "cv-testes",        grupo: "Produto e custo", o: "Testar os 10 produtos na cozinha e ajustar a execução para o padrão da loja", prazo: null, prazoTxt: "Antes de 11/09", status: "aberta", reuniao: "2026-08-21" },
      { id: "cv-cmv",           grupo: "Produto e custo", o: "Levantar o CMV de cada um dos 10 produtos", prazo: null, prazoTxt: "Antes de 11/09", status: "aberta", reuniao: "2026-08-21", link: "https://fechamento-caixa-nu.vercel.app/cmv/laboratorio", linkTxt: "Laboratório de CMV, no Sistema HC" },
      { id: "cv-preco",         grupo: "Produto e custo", o: "Definir o preço de venda de cada produto a partir do CMV", prazo: null, prazoTxt: "Antes de 24/09", status: "aberta", reuniao: "2026-08-21", link: "https://fechamento-caixa-nu.vercel.app/cmv/laboratorio", linkTxt: "Preço sugerido sai do laboratório" },
      { id: "cv-degustacao",    grupo: "Produto e custo", o: "Degustação do cardápio", prazo: "2026-09-11", status: "aberta", reuniao: "2026-08-11" },
      { id: "cv-aprovados",     grupo: "Produto e custo", o: "Registrar o que foi aprovado na degustação e o que sai do cardápio", prazo: "2026-09-11", status: "aberta", reuniao: "2026-08-21" },

      { id: "cv-utensilios",    grupo: "O que a loja precisa", o: "Listar, produto a produto, os utensílios que cada loja precisa comprar", prazo: null, prazoTxt: "Depois do teste, antes de 25/09", status: "aberta", reuniao: "2026-08-21" },
      { id: "cv-logistica",     grupo: "O que a loja precisa", o: "Viabilizar o transporte dos insumos até a loja, com cadeia de frio para os congelados", prazo: null, prazoTxt: "Antes de 25/09", status: "aberta", reuniao: "2026-08-21" },
      { id: "cv-armazenamento", grupo: "O que a loja precisa", o: "Calcular o espaço de armazenamento por loja — 9 dos 10 itens dependem de frio", prazo: null, prazoTxt: "Antes de 25/09", status: "aberta", reuniao: "2026-08-21" },

      { id: "cv-fichas",        grupo: "Ficha técnica e treino", o: "Criar a ficha técnica de cada produto aprovado", prazo: null, prazoTxt: "Depois de 11/09", status: "aberta", reuniao: "2026-08-21" },
      { id: "cv-videos",        grupo: "Ficha técnica e treino", o: "Gravar o vídeo do processo de produção de cada produto nas lojas", prazo: null, prazoTxt: "Depois de 11/09", status: "aberta", reuniao: "2026-08-21" },
      { id: "cv-repasse",       grupo: "Ficha técnica e treino", o: "Entregar as fichas e os vídeos às lojas antes de a venda começar", prazo: null, prazoTxt: "Antes de 01/10", status: "aberta", reuniao: "2026-08-21" },

      { id: "cv-imagens",       grupo: "Material e divulgação", o: "Decidir como saem as fotos do cardápio: sessão fotográfica profissional ou IA", prazo: null, prazoTxt: "Trava a produção de 24/09", status: "aberta", reuniao: "2026-08-21" },
      { id: "cv-producao",      grupo: "Material e divulgação", o: "Produzir o cardápio completo e o material impresso", prazo: "2026-09-24", status: "aberta", reuniao: "2026-08-11" },
      { id: "cv-instagram",     grupo: "Material e divulgação", o: "Definir a data da divulgação no Instagram do cardápio de verão", prazo: null, prazoTxt: "Antes de 01/10", status: "aberta", reuniao: "2026-08-11" },

      { id: "cv-calendario",    grupo: "Calendário e liberação", o: "Apresentar o calendário às lojas: liberação de compra, divulgação no Instagram e início da venda", prazo: null, prazoTxt: "Antes de 25/09", status: "aberta", reuniao: "2026-08-11" },
      { id: "cv-fabrica",       grupo: "Calendário e liberação", o: "Abrir a solicitação e liberar os produtos na fábrica para compra", prazo: "2026-09-25", status: "aberta", reuniao: "2026-08-11" },
      { id: "cv-venda",         grupo: "Calendário e liberação", o: "Início da venda nas lojas, com divulgação de marketing", prazo: "2026-10-01", status: "aberta", reuniao: "2026-08-11" }
    ],
    abertos: [
      "As fotos do cardápio saem de sessão profissional ou de IA? A decisão trava a produção do material impresso de 24/09 e ninguém ficou responsável por ela.",
      "Nove dos dez itens dependem de frio. Não se sabe se o freezer que a loja já tem comporta o volume — nem quem paga o freezer novo, se não comportar.",
      "Os utensílios: cada loja compra por conta ou a compra é centralizada e rateada? Muda o prazo, porque compra centralizada tem lead time.",
      "A casquinha e o cookie fries podem exigir sorvete de máquina. Se exigirem, é investimento por loja e precisa entrar na conta antes de 25/09.",
      "Faltam sabores definidos: quantos entram no Ice Cookie, qual o sorvete do cookie com sorvete e do cookie da felicidade, e quais são os três sabores de cada torta.",
      "O laboratório de CMV do Sistema HC já tem os 10 produtos com um rascunho de ficha e alvo de 40%, mas as quantidades não foram validadas e o frozen ainda está lá com o nome antigo, de morango. Precisa ser revisado produto a produto.",
      "O Marketing aciona a fábrica direto no dia 25/09 ou depende da operação para liberar?",
      "Onde acontece a degustação de 11/09 e quem participa.",
      "A divulgação no Instagram cai antes ou no mesmo dia da venda?"
    ]
  }
];
