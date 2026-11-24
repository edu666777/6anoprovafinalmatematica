/* =========================================================
   CONTEÚDO DO SITE — Mentoria Educacional Promover (6º Ano)
   Para editar questões, mexa aqui. c = índice da correta (0=A,1=B,2=C,3=D)
   ========================================================= */
const FR = (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`;

const MODULOS = {
  m1: {
    id: 'm1',
    titulo: 'Matemática 1',
    sub: 'Pesquisa, Tabelas e Gráficos',
    emoji: '📊',
    topicos: ['Planejar uma pesquisa', 'Tabela de dupla entrada', 'Gráficos de colunas, barras e linhas', 'Gráfico de setores'],
    questoes: [
      { t: 0, txt: 'Uma escola com <b>1.200 alunos</b> realizou uma pesquisa amostral entrevistando <b>150 estudantes</b> escolhidos proporcionalmente entre todas as turmas. Na amostra, <b>48 estudantes</b> afirmaram preferir jogos de tabuleiro no recreio. Mantendo essa proporção para toda a escola, quantos alunos do total de 1.200 preferem jogos de tabuleiro?',
        ops: ['320 alunos.', '360 alunos.', '384 alunos.', '480 alunos.'], c: 2,
        dica: 'Quantas vezes a escola é maior que a amostra? Faça 1.200 ÷ 150.',
        exp: `Na amostra, 48 de 150 preferem jogos (${FR(48,150)} = 0,32 = 32%). A escola é <b>8 vezes</b> maior que a amostra (1.200 ÷ 150 = 8). Então: <b>48 × 8 = 384 alunos</b> (ou 0,32 × 1.200 = 384).` },
      { t: 0, txt: 'Ao planejar um levantamento sobre hábitos de leitura no 6º ano, a equipe fez uma ficha com quatro perguntas: (1) Gênero literário preferido; (2) Quantidade de páginas lidas por semana; (3) Turno em que estuda; (4) Tempo diário de leitura em minutos. Quantas dessas variáveis são <b>qualitativas</b> e quantas são <b>quantitativas</b>, respectivamente?',
        ops: ['1 qualitativa e 3 quantitativas.', '2 qualitativas e 2 quantitativas.', '3 qualitativas e 1 quantitativa.', '4 qualitativas e nenhuma quantitativa.'], c: 1,
        dica: 'Qualitativa = categoria (palavra). Quantitativa = número (contagem ou medida).',
        exp: '(1) gênero literário e (3) turno são <b>categorias</b> → 2 qualitativas. (2) quantidade de páginas e (4) tempo em minutos são <b>números</b> → 2 quantitativas.' },
      { t: 0, txt: 'Para decidir o horário de funcionamento da biblioteca no recreio, um grupo entrevistou <b>apenas 40 alunos que estavam na fila da quadra de esportes</b>, concluindo que a biblioteca deveria fechar nesse horário. O principal erro no planejamento dessa pesquisa foi:',
        ops: ['realizar um censo completo ouvindo todos os alunos da escola.', 'escolher uma amostra não representativa, ouvindo apenas um grupo específico em vez de estudantes de diferentes espaços e turmas.', 'utilizar perguntas objetivas com respostas fáceis de contabilizar.', 'organizar os resultados em uma tabela antes de divulgá-los.'], c: 1,
        dica: 'Quem está na fila da quadra provavelmente prefere… a quadra! A amostra representa todos?',
        exp: 'Uma amostra confiável precisa <b>representar todo o público</b>. Ouvir só quem está na fila da quadra deixa de fora quem frequenta outros lugares da escola (isso se chama <b>viés de seleção</b>).' },
      { t: 1, fig: 'tab4', txt: 'A tabela de dupla entrada mostra a inscrição de alunos nas oficinas culturais das turmas 6º A e 6º B. Cruzando as informações das linhas e colunas, assinale a afirmação <b>correta</b>:',
        ops: ['O 6º A possui mais alunos inscritos no total do que o 6º B.', 'Exatamente 40% do total geral de alunos pesquisados participam de Teatro.', 'No 6º B, a oficina de Coral supera a de Teatro.', 'A oficina de Dança reúne 25 alunos nas duas turmas.'], c: 1,
        dica: 'Teste cada alternativa olhando a linha e a coluna certas. Para porcentagem: parte ÷ total.',
        exp: `Teatro soma 12 + 18 = 30 alunos de um total geral de 75. Então ${FR(30,75)} = ${FR(2,5)} = 0,40 = <b>40%</b>. (A) é falsa: 35 &lt; 40. (C) é falsa: 10 &lt; 18. (D) é falsa: Dança tem 21.` },
      { t: 1, fig: 'tab5', txt: 'Na tabela sobre a venda de ingressos da Feira de Ciências, dois valores foram trocados pelas letras <b>X</b> e <b>Y</b>. Calculando os valores desconhecidos, a diferença <b>X − Y</b> é igual a:',
        ops: ['20.', '25.', '30.', '35.'], c: 2,
        dica: 'Use a coluna Total de cada linha: 45 + X = 110 e Y + 55 = 90.',
        exp: 'Linha "Inteira": 45 + X = 110 → <b>X = 65</b>. Linha "Meia": Y + 55 = 90 → <b>Y = 35</b>. Conferindo nas colunas: 45 + 35 = 80 ✔ e 65 + 55 = 120 ✔. Logo X − Y = 65 − 35 = <b>30</b>.' },
      { t: 1, txt: 'Considerando os dados do <b>Domingo</b> na tabela da Questão 5 (65 ingressos inteiros e 55 meias-entradas), quantos ingressos de meia-entrada <b>a mais</b> precisariam ter sido vendidos nesse dia para que a meia-entrada representasse exatamente <b>50%</b> das vendas de domingo?',
        ops: ['5 ingressos.', '10 ingressos.', '15 ingressos.', '20 ingressos.'], c: 1,
        dica: '50% de cada lado significa quantidades iguais.',
        exp: 'Para cada tipo ser 50%, as quantidades precisam ser <b>iguais</b> (65 cada). Faltam 65 − 55 = <b>10 ingressos</b> de meia-entrada (total 130, sendo 65 = 50%).' },
      { t: 2, fig: 'col7', txt: 'O gráfico de colunas apresenta a arrecadação de alimentos (em kg) durante uma campanha solidária de quatro semanas. Qual foi a <b>média semanal</b> arrecadada e quantas semanas ficaram <b>acima</b> dessa média?',
        ops: ['85 kg e 3 semanas.', '90 kg e 2 semanas.', '90 kg e 3 semanas.', '95 kg e 2 semanas.'], c: 1,
        dica: 'Média = soma de todos os valores ÷ quantidade de semanas.',
        exp: `Média = ${FR('65 + 95 + 80 + 120', 4)} = ${FR(360,4)} = <b>90 kg</b>. Acima de 90 kg ficaram só a Semana 2 (95 kg) e a Semana 4 (120 kg) → <b>2 semanas</b>.` },
      { t: 2, fig: 'bar8', txt: 'No torneio interclasses, o desempenho de três equipes foi registrado num gráfico de barras: Alpha (48 marcados e 32 sofridos), Beta (54 marcados e 41 sofridos) e Gama (39 marcados e 45 sofridos). Sendo o saldo = (Marcados − Sofridos), qual equipe alcançou o <b>maior saldo</b> e qual foi esse valor?',
        ops: ['Equipe Beta, com +13 pontos.', 'Equipe Alpha, com +16 pontos.', 'Equipe Beta, com +54 pontos.', 'Equipe Gama, com +6 pontos.'], c: 1,
        dica: 'Quem marcou mais pontos nem sempre tem o maior saldo! Faça a subtração das três.',
        exp: 'Alpha = 48 − 32 = <b>+16</b>; Beta = 54 − 41 = +13; Gama = 39 − 45 = −6. O maior saldo é da <b>Equipe Alpha (+16)</b>.' },
      { t: 2, fig: 'lin9', txt: 'O gráfico de linhas registra o número de visitantes de um museu nos cinco primeiros meses do ano. Entre quais meses consecutivos ocorreu o <b>maior crescimento</b> de visitantes, e de quanto por cento foi esse aumento em relação ao mês anterior?',
        ops: ['De Jan para Fev, com aumento de 25%.', 'De Mar para Abr, com aumento de 50%.', 'De Mar para Abr, com aumento de 110%.', 'De Abr para Mai, com aumento de 20%.'], c: 1,
        dica: 'Calcule quanto subiu em cada trecho. Depois: aumento ÷ valor do mês anterior.',
        exp: `Jan→Fev subiu 50 (250 − 200). Mar→Abr subiu <b>110</b> (330 − 220). Em relação a março: ${FR(110,220)} = ${FR(1,2)} = 0,50 = <b>50%</b>. Cuidado: 110 é o aumento em visitantes, não em porcentagem!` },
      { t: 2, fig: 'eng10', txt: 'Uma propaganda mostrou um gráfico de colunas comparando as vendas da Marca X (102 unidades) e da Marca Y (100 unidades), mas <b>começou o eixo vertical no 99</b> em vez de 0, fazendo a coluna da Marca X parecer três vezes maior. Esse gráfico é inadequado porque:',
        ops: ['omitiu o título e a fonte da pesquisa, impedindo identificar o tema.', 'distorceu a escala do eixo vertical ao não iniciá-la em zero sem avisar, exagerando uma diferença real de apenas 2 unidades.', 'utilizou setores circulares em vez de segmentos de reta.', 'apresentou porcentagens cuja soma ultrapassa 100%.'], c: 1,
        dica: 'Veja o exemplo interativo "gráfico enganoso" na teoria do tópico 3.',
        exp: 'Em gráficos de colunas, a altura deve ser proporcional ao valor <b>a partir do zero</b>. Começar no 99 sem avisar faz uma diferença de só 2 unidades parecer enorme.' },
      { t: 3, fig: 'pie11', txt: 'O gráfico de setores mostra o meio de transporte dos estudantes de uma escola. Sabendo que exatamente <b>60 alunos</b> vão de bicicleta (20%), quantos alunos vão <b>a pé</b> (35%)?',
        ops: ['90 alunos.', '105 alunos.', '120 alunos.', '135 alunos.'], c: 1,
        dica: 'Se 20% = 60, quanto vale 10%? E quanto é o total (100%)?',
        exp: 'Se 20% = 60 alunos, então o total é 60 × 5 = <b>300 alunos</b> (10% = 30). A pé: 0,35 × 300 = <b>105 alunos</b>.' },
      { t: 3, txt: 'Em uma votação sobre o destino da excursão, 90 estudantes escolheram "Parque Ecológico", 60 escolheram "Museu de Ciências" e 30 escolheram "Planetário". No gráfico de setores, qual deve ser o <b>ângulo central</b> do setor "Museu de Ciências"?',
        ops: ['60°.', '90°.', '120°.', '180°.'], c: 2,
        dica: 'Primeiro ache o total. Depois: fração do total × 360°.',
        exp: `Total = 90 + 60 + 30 = 180. Fração do Museu: ${FR(60,180)} = ${FR(1,3)}. Ângulo: ${FR(1,3)} × 360° = <b>120°</b>.` },
      { t: 3, txt: 'Um gráfico de setores ilustra a preferência musical de <b>400 jovens</b>. O setor "Pop/Rock" possui ângulo central de <b>126°</b>. Quantos jovens escolheram esse gênero?',
        ops: ['126 jovens.', '140 jovens.', '160 jovens.', '180 jovens.'], c: 1,
        dica: 'Ângulo ÷ 360° dá a fração (ou porcentagem) do círculo.',
        exp: `${FR('126°','360°')} = ${FR(7,20)} = 0,35 = 35%. Então 0,35 × 400 = <b>140 jovens</b>.` },
      { t: 3, txt: 'Um gráfico de setores tem quatro categorias (I, II, III e IV). A categoria I ocupa 30%, a categoria II corresponde a um <b>ângulo reto (90°)</b> e a categoria III representa 15%. Qual é o ângulo central da categoria IV?',
        ops: ['90°.', '108°.', '120°.', '144°.'], c: 1,
        dica: '90° é que porcentagem do círculo? Lembre: tudo junto dá 100%.',
        exp: `90° = ${FR('90°','360°')} = 25%. Somando: 30% + 25% + 15% = 70%. Categoria IV = 100% − 70% = 30% → 0,30 × 360° = <b>108°</b>.` },
      { t: 3, txt: 'Uma biblioteca classificou seu acervo de <b>600 livros</b>: Literatura (50%), Ciências (25%), História (15%) e Artes (10%). Se a escola comprar mais <b>150 livros só de Ciências</b>, qual será a nova porcentagem de Ciências no acervo total?',
        ops: ['35%.', '40%.', '45%.', '50%.'], c: 1,
        dica: 'Atenção: o total de livros também muda! Calcule a nova parte e o novo total.',
        exp: `Ciências tinha 25% de 600 = 150 livros. Com mais 150 → <b>300 livros</b>. Novo total: 600 + 150 = <b>750</b>. Nova porcentagem: ${FR(300,750)} = ${FR(2,5)} = <b>40%</b>.` }
    ]
  },

  m2: {
    id: 'm2',
    titulo: 'Matemática 2',
    sub: 'Círculo, Circunferência e Poliedros',
    emoji: '🔷',
    topicos: ['Círculo e circunferência', 'Comprimento da circunferência', 'Relação de Euler', 'Poliedros regulares'],
    questoes: [
      { t: 0, fig: 'c1', txt: 'Numa circunferência de centro O e raio <b>r = 7,5 cm</b>, foram traçados: AB passando pelo centro O, CD ligando dois pontos da circunferência sem passar por O, e OE ligando o centro a um ponto da borda. Sobre as medidas desses segmentos, é correto afirmar que:',
        ops: ['AB = 7,5 cm e CD pode medir 16 cm.', 'AB = 15 cm, OE = 7,5 cm e CD < 15 cm.', 'CD é sempre maior que AB porque não passa pelo centro.', 'AB, CD e OE possuem exatamente a mesma medida de 7,5 cm.'], c: 1,
        dica: 'AB é o diâmetro, OE é o raio e CD é uma corda. Qual é a maior corda possível?',
        exp: 'OE é um <b>raio</b> → 7,5 cm. AB é o <b>diâmetro</b> → 2 × 7,5 = 15 cm. Como o diâmetro é a <b>maior corda possível</b>, qualquer corda CD que não passe pelo centro mede menos de 15 cm.' },
      { t: 0, fig: 'c2', txt: 'Uma circunferência tem centro O e <b>diâmetro igual a 16 cm</b>. Os pontos P, Q e R estão a 6 cm, 8 cm e 10 cm do centro O, respectivamente. Quais desses pontos <b>pertencem ao círculo</b>?',
        ops: ['Apenas o ponto Q.', 'Apenas os pontos P e Q.', 'Apenas os pontos Q e R.', 'Todos os três pontos (P, Q e R).'], c: 1,
        dica: 'O círculo é o contorno + o interior. Primeiro ache o raio (diâmetro ÷ 2).',
        exp: 'Raio = 16 ÷ 2 = <b>8 cm</b>. Pertencem ao círculo os pontos com distância ≤ 8 cm: P (6 cm, dentro) e Q (8 cm, na borda). R (10 cm) está fora.' },
      { t: 0, fig: 'c3', txt: 'Duas moedas de raios <b>r₁ = 2,4 cm</b> e <b>r₂ = 1,8 cm</b> estão sobre uma mesa, encostando-se por fora em um único ponto. Qual é a distância entre os centros das duas moedas?',
        ops: ['0,6 cm.', '2,1 cm.', '4,2 cm.', '8,4 cm.'], c: 2,
        dica: 'Olhe a figura: a linha entre os centros passa por um raio de cada moeda.',
        exp: 'Quando duas circunferências se tocam por fora, a distância entre os centros é a <b>soma dos raios</b>: 2,4 + 1,8 = <b>4,2 cm</b>.' },
      { t: 1, fig: 'c4', txt: 'As rodas de uma bicicleta têm <b>diâmetro de 70 cm</b>. Adotando π = 3,14, quantos <b>metros</b> a bicicleta avança quando as rodas dão exatamente <b>50 voltas</b>?',
        ops: ['54,95 m.', '109,9 m.', '219,8 m.', '1.099,0 m.'], c: 1,
        dica: 'Use C = π · d (transforme 70 cm em 0,70 m) e depois multiplique por 50.',
        exp: '1 volta: C = π · d = 3,14 × 0,70 = 2,198 m. Em 50 voltas: 50 × 2,198 = <b>109,9 m</b>.' },
      { t: 1, txt: 'Para cercar uma piscina circular, foram necessários <b>47,1 metros</b> de corda em uma volta completa. Considerando π = 3,14, qual é o <b>diâmetro</b> da piscina?',
        ops: ['7,5 metros.', '15 metros.', '23,55 metros.', '30 metros.'], c: 1,
        dica: 'C = π · d. Se você sabe C, divida por π.',
        exp: `47,1 = 3,14 · d → d = ${FR('47,1','3,14')} = <b>15 metros</b>.` },
      { t: 1, fig: 'c6', txt: 'Uma pista de caminhada tem <b>dois trechos retos de 80 m</b> e <b>duas curvas semicirculares de raio 20 m</b>, como no esquema. Adotando π = 3,14, o comprimento de uma volta completa é:',
        ops: ['205,6 m.', '222,8 m.', '285,6 m.', '411,2 m.'], c: 2,
        dica: 'Duas meias-voltas juntas formam uma circunferência inteira!',
        exp: 'As duas curvas formam uma circunferência inteira: C = 2 · 3,14 · 20 = 125,6 m. Retas: 80 + 80 = 160 m. Total: 160 + 125,6 = <b>285,6 m</b>.' },
      { t: 1, txt: 'Um atleta quer correr exatamente <b>1.884 metros</b> numa pista circular de raio <b>r = 30 m</b>. Adotando π = 3,14, quantas voltas completas ele precisa dar?',
        ops: ['5 voltas.', '10 voltas.', '15 voltas.', '20 voltas.'], c: 1,
        dica: 'Calcule 1 volta (C = 2πr) e divida a distância total por ela.',
        exp: `1 volta: C = 2 · 3,14 · 30 = 188,4 m. Voltas: ${FR('1.884','188,4')} = <b>10 voltas</b>.` },
      { t: 1, fig: 'c8', txt: 'Numa rotatória circular, a faixa interna tem raio <b>r₁ = 10 m</b> e a faixa externa tem raio <b>r₂ = 14 m</b>. Usando π = 3,14, quantos metros <b>a mais</b> um carro percorre ao dar uma volta pela faixa externa?',
        ops: ['12,56 m.', '25,12 m.', '62,80 m.', '87,92 m.'], c: 1,
        dica: 'Calcule as duas voltas e subtraia — ou faça 2 · π · (14 − 10).',
        exp: 'ΔC = 2·π·14 − 2·π·10 = 2 · 3,14 · (14 − 10) = 6,28 × 4 = <b>25,12 m</b>.' },
      { t: 2, txt: 'Um poliedro convexo tem <b>4 faces triangulares</b> e <b>3 faces quadrangulares</b> (7 faces no total). Calculando primeiro o número de arestas e depois aplicando a Relação de Euler (V + F = A + 2), quantos <b>vértices</b> ele possui?',
        ops: ['6 vértices.', '7 vértices.', '8 vértices.', '12 vértices.'], c: 1,
        dica: 'Arestas = (soma dos lados de todas as faces) ÷ 2.',
        exp: `A = ${FR('(4 × 3) + (3 × 4)', 2)} = ${FR(24,2)} = 12 arestas. Euler: V + 7 = 12 + 2 → V = 14 − 7 = <b>7 vértices</b>.` },
      { t: 2, txt: 'Um prisma reto tem <b>duas bases octogonais</b> (8 lados) e oito faces laterais retangulares. Quantos vértices, faces e arestas ele possui, respectivamente?',
        ops: ['16, 10 e 24.', '8, 10 e 16.', '16, 8 e 22.', '24, 10 e 16.'], c: 0,
        dica: 'Prisma com base de n lados: F = n + 2, V = 2n, A = 3n.',
        exp: 'Com n = 8: F = 8 + 2 = 10; V = 2 × 8 = 16; A = 3 × 8 = 24. Conferindo Euler: 16 + 10 = 24 + 2 = 26 ✔. Resposta: <b>16, 10 e 24</b>.' },
      { t: 2, txt: 'Uma pirâmide possui exatamente <b>14 arestas</b>. Sabendo que em toda pirâmide A = 2n (n = lados da base), quantas <b>faces</b> e quantos <b>vértices</b> ela possui, respectivamente?',
        ops: ['7 faces e 7 vértices.', '8 faces e 8 vértices.', '7 faces e 8 vértices.', '9 faces e 7 vértices.'], c: 1,
        dica: 'Ache n com 2n = 14. Pirâmide: F = n + 1 e V = n + 1.',
        exp: '2n = 14 → n = 7 (base heptagonal). F = 7 + 1 = <b>8</b> e V = 7 + 1 = <b>8</b>. Euler: 8 + 8 = 14 + 2 ✔.' },
      { t: 2, txt: 'Num poliedro convexo que possui exatamente <b>9 faces</b>, o número de arestas supera o número de vértices em quantas unidades?',
        ops: ['5 unidades.', '7 unidades.', '9 unidades.', '11 unidades.'], c: 1,
        dica: 'Coloque F = 9 em V + F = A + 2 e isole A − V.',
        exp: 'V + 9 = A + 2 → A − V = 9 − 2 = <b>7 unidades</b>.' },
      { t: 3, txt: 'Uma <b>bipirâmide triangular</b> é formada pela união de duas pirâmides de base triangular, com 6 faces triangulares equiláteras iguais. Mesmo com todas as faces regulares e iguais, ela <b>não é</b> um poliedro regular porque:',
        ops: ['possui faces curvas semelhantes às de um cilindro.', 'não satisfaz a Relação de Euler (V + F = A + 2).', 'em seus vértices não chega o mesmo número de arestas (em alguns chegam 3 arestas e em outros chegam 4).', 'possui mais de 20 faces triangulares.'], c: 2,
        dica: 'Lembre as DUAS condições do poliedro regular.',
        exp: 'Poliedro regular precisa de faces regulares iguais <b>e</b> o mesmo número de arestas em todos os vértices. Na bipirâmide, nas duas pontas chegam 3 arestas e nos três vértices do meio chegam 4.' },
      { t: 3, txt: 'Um poliedro regular é construído só com <b>12 pentágonos regulares</b>. Calculando o número de arestas e aplicando a Relação de Euler, esse sólido é o:',
        ops: ['icosaedro regular, com 12 vértices e 30 arestas.', 'dodecaedro regular, com 20 vértices e 30 arestas.', 'octaedro regular, com 6 vértices e 12 arestas.', 'hexaedro regular, com 8 vértices e 12 arestas.'], c: 1,
        dica: 'A = (12 × 5) ÷ 2. Depois use Euler para achar V.',
        exp: `A = ${FR('12 × 5', 2)} = 30. Euler: V + 12 = 30 + 2 → V = 20. É o <b>dodecaedro regular</b>.` },
      { t: 3, txt: 'Comparando um <b>octaedro regular</b> (F = 8) e um <b>hexaedro regular / cubo</b> (F = 6), observa-se uma relação de "dualidade":',
        ops: ['ambos possuem 12 arestas, e o número de faces de um é igual ao número de vértices do outro.', 'ambos possuem 8 vértices e faces quadradas.', 'o octaedro possui 30 arestas e o cubo possui 12 arestas.', 'nenhum dos dois satisfaz a Relação de Euler.'], c: 0,
        dica: 'Confira a tabela dos 5 Sólidos de Platão na teoria.',
        exp: 'Octaedro: F = 8, V = 6, A = 12. Cubo: F = 6, V = 8, A = 12. Os dois têm <b>12 arestas</b> e faces e vértices <b>trocados</b> entre si.' }
    ]
  }
};

/* ---------------- TEORIA (cada tópico é uma função que devolve HTML) ---------------- */
const TEORIA = {
  m1: [
    () => `
      <p class="lead">Toda pesquisa organizada segue <b>5 etapas</b> para transformar uma pergunta do dia a dia em informação confiável.</p>
      <ol class="etapas">
        <li><span>❓</span><b>Tema e pergunta</b><small>O que queremos descobrir?</small></li>
        <li><span>🎯</span><b>Público e método</b><small>Quem? Questionário, entrevista ou medição</small></li>
        <li><span>📝</span><b>Coletar e registrar</b><small>Anotar as respostas</small></li>
        <li><span>📊</span><b>Organizar</b><small>Em tabelas e gráficos</small></li>
        <li><span>📢</span><b>Analisar e divulgar</b><small>Tirar conclusões</small></li>
      </ol>
      <h4>Censo × Amostra</h4>
      <div class="duo">
        <div class="box">${dots(35, 'all')}<b>Censo</b><p>Pesquisa <u>todos</u> os elementos. Ex.: perguntar aos 35 alunos da turma, ou o Censo do IBGE.</p></div>
        <div class="box">${dots(60, 'some')}<b>Amostra</b><p>Quando o grupo é muito grande, escolhe-se uma <u>parte representativa</u>. Ex.: 200 estudantes sorteados entre 3.000.</p></div>
      </div>
      <div class="alerta">⚠️ A amostra precisa <b>representar o grupo todo</b>. Perguntar só para quem está na fila da quadra é uma amostra "viciada"!</div>
      <h4>Tipos de variáveis</h4>
      <div class="duo">
        <div class="box ql"><b>🎨 Qualitativa</b><p>Qualidades ou categorias (não são números): esporte preferido, cor dos olhos, bairro, turno.</p></div>
        <div class="box qt"><b>🔢 Quantitativa</b><p>Medidas ou contagens (números): idade, altura, nota, número de irmãos, minutos.</p></div>
      </div>
      <div data-w="classificar"></div>`,
    () => `
      <p class="lead">A tabela de dupla entrada <b>cruza duas informações ao mesmo tempo</b>: uma nas linhas e outra nas colunas.</p>
      <ul class="lista">
        <li>Cada célula de dentro mostra quantos pertencem <b>àquela linha E àquela coluna</b>.</li>
        <li>A última coluna mostra o <b>total de cada linha</b>; a última linha mostra o <b>total de cada coluna</b>.</li>
        <li>O encontro das duas é o <b>total geral</b>.</li>
      </ul>
      <div data-w="tabela"></div>
      ${exemplo('Exemplo 1', 'Qual é a diferença entre o total de alunos que preferem Futsal e o total que prefere Natação?',
        'Na coluna "Total": Futsal = 28 + 22 = 50 e Natação = 7 + 8 = 15. Diferença: 50 − 15 = <b>35 alunos</b>.')}`,
    () => `
      <p class="lead">Todo gráfico bem feito precisa de 4 elementos:</p>
      <div class="chips"><span>🏷️ <b>Título</b> — o assunto</span><span>📚 <b>Fonte</b> — quem coletou</span><span>📏 <b>Eixos</b> — categorias e escala</span><span>🎨 <b>Legenda</b> — quando há 2+ séries</span></div>
      <div class="duo">
        <div class="box"><b>Colunas e barras → comparar</b>${barChart([5, 8, 3], ['A', 'B', 'C'], { max: 10, ticks: 5, color: ['#ff6b4a', '#ffb000', '#159a9c'] })}<p>Quanto maior a coluna (vertical) ou a barra (horizontal), maior a quantidade. Use <b>barras</b> quando os nomes forem compridos.</p></div>
        <div class="box"><b>Linhas → evolução no tempo</b>${lineChart([3, 6, 4, 7], ['Jan', 'Fev', 'Mar', 'Abr'], { max: 8, ticks: 4 })}<p>Mostra se algo <b>cresce, cai ou fica estável</b> ao longo de meses, anos ou horas.</p></div>
      </div>
      <h4>🕵️ Cuidado com gráficos enganosos!</h4>
      <div data-w="enganoso"></div>`,
    () => `
      <p class="lead">O gráfico de setores ("pizza") representa <b>o todo (100%)</b> como um círculo completo de <b>360°</b>. A soma das fatias é sempre 100%.</p>
      <div class="duo">
        <div class="box center">${pieSVG([{ v: 50, l: 'Ônibus', c: '#ff6b4a' }, { v: 25, l: 'A pé', c: '#ffb000' }, { v: 25, l: 'Carro', c: '#159a9c' }])}
          <p class="leg"><i style="background:#ff6b4a"></i>Ônibus 50% (180°) <i style="background:#ffb000"></i>A pé 25% (90°) <i style="background:#159a9c"></i>Carro 25% (90°)</p></div>
        <div class="box">
          <b>A regra de ouro (proporção)</b>
          <div class="formula">${FR('Parte', 'Total')} = ${FR('Porcentagem', '100%')} = ${FR('Ângulo', '360°')}</div>
          <table class="mini"><tr><th>%</th><th>Ângulo</th></tr>
            <tr><td>50%</td><td>180° (meia-volta)</td></tr><tr><td>25%</td><td>90° (ângulo reto)</td></tr>
            <tr><td>20%</td><td>72°</td></tr><tr><td>10%</td><td>36°</td></tr><tr><td>1%</td><td>3,6°</td></tr></table>
          <p>Truque: <b>ângulo = porcentagem × 3,6</b></p>
        </div>
      </div>
      <div data-w="pizza"></div>
      ${exemplo('Exemplo 2', 'Numa pesquisa com 200 estudantes, o setor "Aventura" tem 35%. Quantos estudantes escolheram Aventura e qual é o ângulo do setor?',
        `${FR(35, 100)} × 200 = 35 × 2 = <b>70 estudantes</b>. Ângulo: 0,35 × 360° = <b>126°</b>.`)}`
  ],
  m2: [
    () => `
      <div class="duo">
        <div class="box"><b>⭕ Circunferência</b><p>É só a <u>linha curva</u> (o contorno). Todos os pontos estão à mesma distância do <b>centro O</b>. Ex.: anel, bambolê, aro da bicicleta.</p></div>
        <div class="box"><b>🟢 Círculo</b><p>É o contorno <u>+ a região de dentro</u> (tem área). Ex.: moeda, prato, tampo de mesa redonda.</p></div>
      </div>
      ${SVG_CIRC}
      <h4>Elementos</h4>
      <div class="chips"><span>📍 <b>Raio (r)</b>: do centro até a borda</span><span>➖ <b>Corda</b>: liga dois pontos da circunferência</span><span>↔️ <b>Diâmetro (d)</b>: corda que passa pelo centro — a <b>maior</b> corda</span></div>
      <div class="formula big">d = 2 · r &nbsp;&nbsp;⟺&nbsp;&nbsp; r = ${FR('d', 2)}</div>
      <div data-w="distancia"></div>`,
    () => `
      <p class="lead">Se você "desenrolar" qualquer circunferência e dividir o comprimento pelo diâmetro, o resultado é sempre o mesmo número: <b>π (pi) ≈ 3,14</b>.</p>
      <div class="duo">
        <div class="box center"><div class="formula big">C = 2 · π · r</div><small>quando você tem o <b>raio</b></small></div>
        <div class="box center"><div class="formula big">C = π · d</div><small>quando você tem o <b>diâmetro</b></small></div>
      </div>
      <div class="alerta">🚲 Rodas e pistas: em 1 volta a roda anda C. Em <b>n voltas</b>, anda <b>D = n · C</b>.</div>
      <div data-w="comprimento"></div>
      ${exemplo('Exemplo 1', 'Uma praça circular tem raio 15 m. Com π = 3,14, quantos metros uma pessoa anda ao dar 4 voltas?',
        'C = 2 · 3,14 · 15 = 94,2 m. Em 4 voltas: 4 × 94,2 = <b>376,8 m</b>.')}`,
    () => `
      <p class="lead"><b>Poliedros</b> são sólidos com faces planas (polígonos): cubos, prismas, pirâmides. Esfera, cilindro e cone são <b>corpos redondos</b> (têm parte curva).</p>
      <div class="chips"><span>🟦 <b>Faces (F)</b>: os "lados" planos</span><span>📐 <b>Arestas (A)</b>: onde duas faces se encontram</span><span>🔺 <b>Vértices (V)</b>: as pontas</span></div>
      <div class="duo">
        <div class="box center">${SVG_CUBO}<b>Cubo</b><p>V = 8, F = 6, A = 12<br>8 + 6 = 12 + 2 ✔</p></div>
        <div class="box center">${SVG_PIR}<b>Pirâmide de base quadrada</b><p>V = 5, F = 5, A = 8<br>5 + 5 = 8 + 2 ✔</p></div>
      </div>
      <div class="formula big">V + F = A + 2</div>
      <div class="alerta">✂️ Contagem rápida de arestas: cada aresta é dividida por 2 faces, então <b>A = ${FR('soma dos lados de todas as faces', 2)}</b></div>
      <table class="mini wide"><tr><th>Base com n lados</th><th>Faces</th><th>Vértices</th><th>Arestas</th></tr>
        <tr><td>Prisma</td><td>n + 2</td><td>2n</td><td>3n</td></tr>
        <tr><td>Pirâmide</td><td>n + 1</td><td>n + 1</td><td>2n</td></tr></table>
      <div data-w="euler"></div>
      ${exemplo('Exemplo 2', 'Um poliedro convexo tem 8 faces e 18 arestas. Quantos vértices ele tem?',
        'V + 8 = 18 + 2 → V + 8 = 20 → V = <b>12 vértices</b>.')}`,
    () => `
      <p class="lead">Um poliedro é <b>regular</b> quando: (1) todas as faces são polígonos regulares <b>iguais</b> e (2) em <b>todos os vértices</b> chega o mesmo número de arestas. Existem só <b>5</b>: os Sólidos de Platão.</p>
      <div data-w="solidos"></div>
      <table class="mini wide"><tr><th>Poliedro</th><th>Faces</th><th>F</th><th>V</th><th>A</th><th>V + F = A + 2</th></tr>
        <tr><td>Tetraedro</td><td>Triângulos</td><td>4</td><td>4</td><td>6</td><td>4 + 4 = 6 + 2</td></tr>
        <tr><td>Hexaedro (Cubo)</td><td>Quadrados</td><td>6</td><td>8</td><td>12</td><td>8 + 6 = 12 + 2</td></tr>
        <tr><td>Octaedro</td><td>Triângulos</td><td>8</td><td>6</td><td>12</td><td>6 + 8 = 12 + 2</td></tr>
        <tr><td>Dodecaedro</td><td>Pentágonos</td><td>12</td><td>20</td><td>30</td><td>20 + 12 = 30 + 2</td></tr>
        <tr><td>Icosaedro</td><td>Triângulos</td><td>20</td><td>12</td><td>30</td><td>12 + 20 = 30 + 2</td></tr></table>
      <div class="alerta">🔁 Repare: cubo e octaedro têm F e V trocados (6 e 8) e as mesmas 12 arestas. Dodecaedro e icosaedro também (12 e 20, com 30 arestas)!</div>`
  ]
};
