# Estudar Matemática – 6º Ano (Mentoria Educacional Promover)

Site de estudo com teoria ilustrada, exemplos interativos, 30 questões com resolução comentada e **relatório de erros enviado pelo WhatsApp** para (85) 99262-1003.

## Conteúdo
- **Matemática 1:** Pesquisa estatística, tabela de dupla entrada, gráficos de colunas/barras/linhas e gráfico de setores (15 questões)
- **Matemática 2:** Círculo e circunferência, comprimento da circunferência, Relação de Euler e poliedros regulares em 3D (15 questões)

## Publicar no GitHub Pages
1. Crie um repositório novo (ex.: `estudo-6ano`) e envie os arquivos: `index.html`, `style.css`, `dados.js`, `app.js`, `solidos.js`.
2. Vá em **Settings → Pages**, em *Source* escolha **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.
3. Em 1–2 minutos o site fica em `https://SEU-USUARIO.github.io/estudo-6ano/`. Mande esse link para os alunos.

## Como funciona o relatório
- O aluno digita nome e turma, responde as questões e abre **Relatório**.
- Conta como acerto só a **1ª tentativa**; se refizer e acertar, aparece "corrigiu depois".
- O botão **Enviar pelo WhatsApp** abre a conversa com o número já configurado e a mensagem pronta (nota, erros por questão e tópicos para revisar).
- O progresso fica salvo no navegador do aluno (localStorage); nada vai para servidor.

## Editar
- Questões e teoria: `dados.js` (`c` = alternativa correta, 0=A … 3=D).
- Número do WhatsApp: primeira linha de `app.js` (`WHATSAPP`).

**Obs.:** o visualizador 3D dos sólidos usa Three.js de `artifactcdn.diabrowser.engineering`. Se não carregar no GitHub Pages, troque a URL no topo de `solidos.js` por `https://unpkg.com/three@0.180.0/build/three.module.js`.
