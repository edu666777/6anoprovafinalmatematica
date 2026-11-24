/* =========================================================
   APP — navegação, exercícios, ilustrações e relatório
   ========================================================= */
const WHATSAPP = '5585992621003';           // (85) 99262-1003
const LS_KEY = 'promover_6ano_v1';
const LETRAS = ['A', 'B', 'C', 'D'];

/* ---------- estado salvo no aparelho do aluno ---------- */
let S = (() => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { return {}; } })();
S.aluno = S.aluno || { nome: '', turma: '' };
S.r = S.r || { m1: {}, m2: {} };
S.pos = S.pos || { m1: 0, m2: 0 };
const save = () => localStorage.setItem(LS_KEY, JSON.stringify(S));

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const fmt = n => Number(n).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = html => { const d = document.createElement('div'); d.innerHTML = html; return d.textContent; };

/* =========================================================
   ILUSTRAÇÕES (SVG)
   ========================================================= */
function barChart(vals, labs, o = {}) {
  const w = o.w || 340, h = o.h || 210, pl = 40, pb = 28, pt = 18, pr = 10;
  const min = o.min || 0, max = o.max || Math.max(...vals) * 1.2, ticks = o.ticks || 4;
  const cw = w - pl - pr, ch = h - pt - pb, n = vals.length, bw = cw / n * 0.58;
  let s = `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img">`;
  for (let k = 0; k <= ticks; k++) {
    const v = min + (max - min) * k / ticks, y = pt + ch - ch * k / ticks;
    s += `<line x1="${pl}" x2="${w - pr}" y1="${y}" y2="${y}" class="grid"/><text x="${pl - 6}" y="${y + 4}" class="tk" text-anchor="end">${fmt(v)}</text>`;
  }
  vals.forEach((v, i) => {
    const x = pl + cw / n * i + (cw / n - bw) / 2, bh = ch * (v - min) / (max - min), y = pt + ch - bh;
    const col = Array.isArray(o.color) ? o.color[i % o.color.length] : (o.color || '#ff6b4a');
    s += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="4" fill="${col}" class="bar" style="animation-delay:${i * 90}ms"/>`;
    s += `<text x="${x + bw / 2}" y="${y - 5}" text-anchor="middle" class="vl">${fmt(v)}${o.unit || ''}</text>`;
    s += `<text x="${x + bw / 2}" y="${h - 9}" text-anchor="middle" class="lb">${labs[i]}</text>`;
  });
  s += `<line x1="${pl}" x2="${pl}" y1="${pt}" y2="${pt + ch}" class="axis"/><line x1="${pl}" x2="${w - pr}" y1="${pt + ch}" y2="${pt + ch}" class="axis"/>`;
  if (o.ylabel) s += `<text x="${pl}" y="11" class="tk">${o.ylabel}</text>`;
  return s + '</svg>';
}

function lineChart(vals, labs, o = {}) {
  const w = o.w || 340, h = o.h || 210, pl = 40, pb = 28, pt = 20, pr = 18;
  const min = o.min || 0, max = o.max, ticks = o.ticks || 4;
  const cw = w - pl - pr, ch = h - pt - pb, n = vals.length;
  const X = i => pl + cw * (i + 0.5) / n, Y = v => pt + ch - ch * (v - min) / (max - min);
  let s = `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img">`;
  for (let k = 0; k <= ticks; k++) {
    const v = min + (max - min) * k / ticks, y = Y(v);
    s += `<line x1="${pl}" x2="${w - pr}" y1="${y}" y2="${y}" class="grid"/><text x="${pl - 6}" y="${y + 4}" class="tk" text-anchor="end">${fmt(v)}</text>`;
  }
  s += `<polyline points="${vals.map((v, i) => `${X(i)},${Y(v)}`).join(' ')}" class="linha"/>`;
  vals.forEach((v, i) => {
    s += `<circle cx="${X(i)}" cy="${Y(v)}" r="5" class="ponto"/><text x="${X(i)}" y="${Y(v) - 10}" text-anchor="middle" class="vl">${fmt(v)}</text>`;
    s += `<text x="${X(i)}" y="${h - 9}" text-anchor="middle" class="lb">${labs[i]}</text>`;
  });
  s += `<line x1="${pl}" x2="${pl}" y1="${pt}" y2="${pt + ch}" class="axis"/><line x1="${pl}" x2="${w - pr}" y1="${pt + ch}" y2="${pt + ch}" class="axis"/>`;
  return s + '</svg>';
}

function groupedBars(groups, series, o = {}) {
  const w = 340, h = 220, pl = 40, pb = 46, pt = 18, pr = 10, max = o.max, ticks = o.ticks || 4;
  const cw = w - pl - pr, ch = h - pt - pb, n = groups.length, gw = cw / n, bw = gw * 0.3;
  let s = `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img">`;
  for (let k = 0; k <= ticks; k++) {
    const v = max * k / ticks, y = pt + ch - ch * k / ticks;
    s += `<line x1="${pl}" x2="${w - pr}" y1="${y}" y2="${y}" class="grid"/><text x="${pl - 6}" y="${y + 4}" class="tk" text-anchor="end">${fmt(v)}</text>`;
  }
  groups.forEach((g, i) => {
    series.forEach((se, j) => {
      const v = se.v[i], bh = ch * v / max, x = pl + gw * i + gw * 0.18 + j * (bw + 4), y = pt + ch - bh;
      s += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="3" fill="${se.c}" class="bar"/><text x="${x + bw / 2}" y="${y - 4}" text-anchor="middle" class="vl">${v}</text>`;
    });
    s += `<text x="${pl + gw * i + gw / 2}" y="${pt + ch + 18}" text-anchor="middle" class="lb">${g}</text>`;
  });
  s += `<line x1="${pl}" x2="${w - pr}" y1="${pt + ch}" y2="${pt + ch}" class="axis"/>`;
  series.forEach((se, j) => { s += `<rect x="${90 + j * 120}" y="${h - 16}" width="12" height="12" rx="2" fill="${se.c}"/><text x="${106 + j * 120}" y="${h - 6}" class="lb">${se.l}</text>`; });
  return s + '</svg>';
}

function pieSVG(slices, size = 210) {
  const tot = slices.reduce((a, b) => a + b.v, 0), cx = size / 2, cy = size / 2, r = size / 2 - 6;
  let a0 = -Math.PI / 2, s = `<svg viewBox="0 0 ${size} ${size}" class="pie" role="img">`;
  slices.forEach(sl => {
    const f = sl.v / tot;
    if (f <= 0) return;
    if (f >= 0.9999) { s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${sl.c}" stroke="#fff" stroke-width="3"/>`; }
    else {
      const a1 = a0 + 2 * Math.PI * f, large = f > 0.5 ? 1 : 0;
      s += `<path d="M${cx},${cy} L${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 ${large} 1 ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)} Z" fill="${sl.c}" stroke="#fff" stroke-width="3"/>`;
    }
    const am = a0 + Math.PI * f;
    if (f > 0.06) s += `<text x="${cx + r * 0.6 * Math.cos(am)}" y="${cy + r * 0.6 * Math.sin(am) + 5}" text-anchor="middle" class="pl">${fmt(Math.round(f * 1000) / 10)}%</text>`;
    a0 += 2 * Math.PI * f;
  });
  return s + '</svg>';
}

function dots(n, mode) {
  const cols = 10, rows = Math.ceil(n / cols), sz = 16;
  let s = `<svg viewBox="0 0 ${cols * sz} ${rows * sz}" class="dots">`;
  for (let i = 0; i < n; i++) {
    const on = mode === 'all' || [3, 8, 14, 19, 25, 31, 36, 42, 47, 55].includes(i);
    s += `<circle cx="${(i % cols) * sz + sz / 2}" cy="${Math.floor(i / cols) * sz + sz / 2}" r="5.5" fill="${on ? '#ff6b4a' : '#d9d3c4'}"/>`;
  }
  return s + '</svg>';
}

function exemplo(t, q, r) {
  return `<div class="exemplo"><span class="tag">✏️ ${t}</span><p>${q}</p><details><summary>Ver resposta comentada</summary><p>${r}</p></details></div>`;
}

const INK = '#1f2a44';
const SVG_CIRC = `<svg viewBox="0 0 340 185" class="ilus">
  <circle cx="85" cy="85" r="65" fill="none" stroke="${INK}" stroke-width="3"/>
  <line x1="85" y1="85" x2="138.2" y2="47.7" stroke="#ff6b4a" stroke-width="3"/><text x="116" y="58" class="lbl" fill="#ff6b4a">r</text>
  <line x1="23.9" y1="62.8" x2="52.5" y2="141.3" stroke="#ffb000" stroke-width="3"/><text x="10" y="112" class="lbl" fill="#b37b00">corda</text>
  <circle cx="85" cy="85" r="3.5" fill="${INK}"/><text x="73" y="100" class="lbl">O</text>
  <text x="85" y="178" text-anchor="middle" class="cap">Circunferência (só o contorno)</text>
  <g transform="translate(170 0)">
   <circle cx="85" cy="85" r="65" fill="#bfe8e6" stroke="#159a9c" stroke-width="3"/>
   <line x1="20" y1="85" x2="150" y2="85" stroke="${INK}" stroke-width="3"/><text x="85" y="76" text-anchor="middle" class="lbl">d = 2r</text>
   <circle cx="85" cy="85" r="3.5" fill="${INK}"/><text x="80" y="102" class="lbl">O</text>
   <text x="85" y="178" text-anchor="middle" class="cap">Círculo (contorno + interior)</text>
  </g></svg>`;

const SVG_CUBO = `<svg viewBox="0 0 210 180" class="ilus sm">
  <g stroke="${INK}" stroke-width="2.5" fill="none" stroke-linejoin="round">
   <path d="M80 120 L40 160 M80 120 L80 30 M80 120 L170 120" stroke-dasharray="5 5" opacity=".55"/>
   <path d="M40 70 L80 30 L170 30 L130 70 Z" fill="#ffe7a3"/>
   <path d="M130 70 L170 30 L170 120 L130 160 Z" fill="#9fd9d6"/>
   <rect x="40" y="70" width="90" height="90" fill="#c8eeec"/></g>
  <g fill="#ff6b4a">${[[40, 70], [130, 70], [40, 160], [130, 160], [80, 30], [170, 30], [170, 120], [80, 120]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4.5"/>`).join('')}</g></svg>`;

const SVG_PIR = `<svg viewBox="0 0 210 180" class="ilus sm">
  <g stroke="${INK}" stroke-width="2.5" fill="none" stroke-linejoin="round">
   <path d="M70 115 L30 150 M70 115 L170 115 M70 115 L100 25" stroke-dasharray="5 5" opacity=".55"/>
   <path d="M100 25 L30 150 L130 150 Z" fill="#c8eeec"/>
   <path d="M100 25 L130 150 L170 115 Z" fill="#9fd9d6"/></g>
  <g fill="#ff6b4a">${[[100, 25], [30, 150], [130, 150], [170, 115], [70, 115]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4.5"/>`).join('')}</g></svg>`;

/* figuras das questões */
const FIG = {
  tab4: () => tabelaHTML('Oficinas culturais', ['Oficina', '6º A', '6º B', 'Total'], [['Coral', 14, 10, 24], ['Teatro', 12, 18, 30], ['Dança', 9, 12, 21], ['Total', 35, 40, 75]]),
  tab5: () => tabelaHTML('Ingressos da Feira de Ciências', ['Ingresso', 'Sábado', 'Domingo', 'Total'], [['Inteira', 45, '<b class="x">X</b>', 110], ['Meia-entrada', '<b class="x">Y</b>', 55, 90], ['Total', 80, 120, 200]]),
  col7: () => `<p class="figt">Arrecadação de alimentos (kg)</p>` + barChart([65, 95, 80, 120], ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], { max: 140, ticks: 7, color: '#ff6b4a' }),
  bar8: () => `<p class="figt">Torneio interclasses</p>` + groupedBars(['Alpha', 'Beta', 'Gama'], [{ l: 'Marcados', c: '#159a9c', v: [48, 54, 39] }, { l: 'Sofridos', c: '#ff6b4a', v: [32, 41, 45] }], { max: 60, ticks: 6 }),
  lin9: () => `<p class="figt">Visitantes do museu</p>` + lineChart([200, 250, 220, 330, 310], ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'], { min: 150, max: 350, ticks: 4 }),
  eng10: () => `<p class="figt">Gráfico da propaganda (eixo começa em 99!)</p>` + barChart([102, 100], ['Marca X', 'Marca Y'], { min: 99, max: 102, ticks: 3, color: ['#ff6b4a', '#9aa3b5'] }),
  pie11: () => `<div class="center">${pieSVG([{ v: 45, c: '#ff6b4a' }, { v: 35, c: '#ffb000' }, { v: 20, c: '#159a9c' }], 190)}<p class="leg"><i style="background:#ff6b4a"></i>Ônibus <i style="background:#ffb000"></i>A pé <i style="background:#159a9c"></i>Bicicleta</p></div>`,
  c1: () => `<svg viewBox="0 0 300 225" class="ilus">
     <circle cx="150" cy="110" r="85" fill="#eef8f7" stroke="${INK}" stroke-width="3"/>
     <line x1="65" y1="110" x2="235" y2="110" stroke="#159a9c" stroke-width="3"/>
     <line x1="107.5" y1="183.6" x2="215.1" y2="164.6" stroke="#ffb000" stroke-width="3"/>
     <line x1="150" y1="110" x2="192.5" y2="36.4" stroke="#ff6b4a" stroke-width="3"/>
     <circle cx="150" cy="110" r="4" fill="${INK}"/><text x="140" y="128" class="lbl">O</text>
     <text x="48" y="114" class="lbl">A</text><text x="241" y="114" class="lbl">B</text>
     <text x="96" y="203" class="lbl">C</text><text x="220" y="182" class="lbl">D</text><text x="196" y="32" class="lbl">E</text>
     <text x="176" y="80" class="lbl" fill="#ff6b4a">7,5 cm</text></svg>`,
  c2: () => `<svg viewBox="0 0 300 225" class="ilus">
     <circle cx="150" cy="110" r="80" fill="#eef8f7" stroke="${INK}" stroke-width="3"/>
     <circle cx="150" cy="110" r="4" fill="${INK}"/><text x="138" y="128" class="lbl">O</text>
     <g stroke-dasharray="4 4" stroke-width="2"><line x1="150" y1="110" x2="98" y2="80" stroke="#159a9c"/><line x1="150" y1="110" x2="219.3" y2="70" stroke="#ffb000"/><line x1="150" y1="110" x2="200" y2="196.6" stroke="#ff6b4a"/></g>
     <circle cx="98" cy="80" r="5" fill="#159a9c"/><text x="80" y="74" class="lbl">P</text><text x="108" y="84" class="sml">6</text>
     <circle cx="219.3" cy="70" r="5" fill="#ffb000"/><text x="226" y="64" class="lbl">Q</text><text x="186" y="82" class="sml">8</text>
     <circle cx="200" cy="196.6" r="5" fill="#ff6b4a"/><text x="208" y="206" class="lbl">R</text><text x="182" y="158" class="sml">10</text>
     <text x="10" y="218" class="sml">distâncias ao centro em cm</text></svg>`,
  c3: () => `<svg viewBox="0 0 240 140" class="ilus">
     <circle cx="70" cy="70" r="48" fill="#ffd97a" stroke="#b37b00" stroke-width="3"/><circle cx="154" cy="70" r="36" fill="#e3e6ec" stroke="#7d8597" stroke-width="3"/>
     <line x1="70" y1="70" x2="154" y2="70" stroke="${INK}" stroke-width="2.5"/>
     <circle cx="70" cy="70" r="3.5" fill="${INK}"/><circle cx="154" cy="70" r="3.5" fill="${INK}"/><circle cx="118" cy="70" r="3" fill="#ff6b4a"/>
     <text x="80" y="62" class="sml">r₁ = 2,4</text><text x="122" y="62" class="sml">r₂ = 1,8</text>
     <text x="112" y="134" text-anchor="middle" class="sml">distância entre os centros = ?</text></svg>`,
  c4: () => `<svg viewBox="0 0 300 180" class="ilus">
     <circle cx="90" cy="85" r="68" fill="none" stroke="${INK}" stroke-width="9"/>
     ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<line x1="90" y1="85" x2="${90 + 64 * Math.cos(a)}" y2="${85 + 64 * Math.sin(a)}" stroke="#9aa3b5" stroke-width="1.5"/>`; }).join('')}
     <circle cx="90" cy="85" r="8" fill="#ff6b4a"/>
     <line x1="22" y1="85" x2="158" y2="85" stroke="#159a9c" stroke-width="3"/><text x="96" y="78" class="lbl" fill="#0d6f70">d = 70 cm</text>
     <line x1="10" y1="160" x2="290" y2="160" stroke="${INK}" stroke-width="2"/>
     <path d="M180 140 L270 140" stroke="#ff6b4a" stroke-width="3" marker-end="url(#ar)"/>
     <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#ff6b4a"/></marker></defs>
     <text x="182" y="128" class="sml">50 voltas → ? m</text></svg>`,
  c6: () => `<svg viewBox="0 0 300 145" class="ilus">
     <path d="M70 30 L230 30 A40 40 0 0 1 230 110 L70 110 A40 40 0 0 1 70 30 Z" fill="#bfe8e6" stroke="#ff6b4a" stroke-width="10" stroke-linejoin="round"/>
     <line x1="230" y1="70" x2="270" y2="70" stroke="${INK}" stroke-width="2"/><circle cx="230" cy="70" r="3" fill="${INK}"/>
     <text x="236" y="64" class="sml">20 m</text><text x="150" y="20" text-anchor="middle" class="lbl">80 m</text><text x="150" y="134" text-anchor="middle" class="lbl">80 m</text></svg>`,
  c8: () => `<svg viewBox="0 0 240 240" class="ilus sm">
     <circle cx="120" cy="120" r="98" fill="#e3e6ec" stroke="${INK}" stroke-width="3"/>
     <circle cx="120" cy="120" r="70" fill="#bfe8e6" stroke="#159a9c" stroke-width="3"/>
     <circle cx="120" cy="120" r="30" fill="#9fd98f"/>
     <line x1="120" y1="120" x2="190" y2="120" stroke="#159a9c" stroke-width="2.5"/><line x1="120" y1="120" x2="120" y2="22" stroke="#ff6b4a" stroke-width="2.5"/>
     <text x="150" y="114" class="sml">10 m</text><text x="124" y="60" class="sml">14 m</text></svg>`
};

function tabelaHTML(titulo, head, rows) {
  return `<p class="figt">${titulo}</p><table class="dupla"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r, i) => `<tr class="${i === rows.length - 1 ? 'tot' : ''}">${r.map((c, j) => j === 0 ? `<th>${c}</th>` : `<td class="${j === r.length - 1 ? 'tot' : ''}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

/* =========================================================
   WIDGETS INTERATIVOS DA TEORIA
   ========================================================= */
const WIDGETS = {
  classificar(el) {
    const itens = [['Esporte preferido', 0], ['Idade', 1], ['Cor dos olhos', 0], ['Altura', 1], ['Bairro onde mora', 0], ['Número de irmãos', 1], ['Turno em que estuda', 0], ['Nota da prova', 1]];
    let i = 0, ok = 0;
    const draw = (msg = '') => {
      if (i >= itens.length) { el.innerHTML = `<div class="jogo"><b>🎉 Você acertou ${ok} de ${itens.length}!</b> <button class="btn sm" id="jr">Jogar de novo</button></div>`; $('#jr', el).onclick = () => { i = 0; ok = 0; draw(); }; return; }
      el.innerHTML = `<div class="jogo"><span class="tag">🎮 Mini-jogo: classifique a variável (${i + 1}/${itens.length})</span>
        <div class="var">"${itens[i][0]}"</div>
        <div class="row"><button class="btn ql" data-v="0">🎨 Qualitativa</button><button class="btn qt" data-v="1">🔢 Quantitativa</button></div><p class="msg">${msg}</p></div>`;
      $$('[data-v]', el).forEach(b => b.onclick = () => {
        const certo = +b.dataset.v === itens[i][1]; if (certo) ok++;
        const m = certo ? '✅ Isso!' : `❌ Era ${itens[i][1] ? 'quantitativa (é um número)' : 'qualitativa (é uma categoria)'}.`;
        i++; draw(m);
      });
    };
    draw();
  },
  tabela(el) {
    const cols = ['Manhã', 'Tarde', 'Total'], rows = [['Futsal', 28, 22, 50], ['Vôlei', 18, 14, 32], ['Basquete', 12, 11, 23], ['Natação', 7, 8, 15], ['Total', 65, 55, 120]];
    el.innerHTML = `<div class="jogo"><span class="tag">👆 Toque em um número da tabela</span>
      <p class="figt">Esporte favorito no 6º ano por turno</p>
      <table class="dupla interativa"><thead><tr><th>Esporte</th>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r, ri) => `<tr class="${ri === 4 ? 'tot' : ''}"><th>${r[0]}</th>${r.slice(1).map((v, ci) => `<td data-r="${ri}" data-c="${ci}" class="${ci === 2 ? 'tot' : ''}">${v}</td>`).join('')}</tr>`).join('')}</tbody></table>
      <p class="fonte">Fonte: Coordenação de Educação Física (dados fictícios).</p><p class="msg" id="tmsg">Ex.: toque no 18 (Vôlei × Manhã).</p></div>`;
    $$('td', el).forEach(td => td.onclick = () => {
      $$('td,th', el).forEach(x => x.classList.remove('hl', 'hx'));
      const r = +td.dataset.r, c = +td.dataset.c, v = td.textContent;
      $$(`td[data-r="${r}"]`, el).forEach(x => x.classList.add('hl')); $$(`td[data-c="${c}"]`, el).forEach(x => x.classList.add('hl')); td.classList.add('hx');
      let t;
      if (r === 4 && c === 2) t = `<b>${v}</b> é o <b>total geral</b>: todos os alunos pesquisados (65 da manhã + 55 da tarde).`;
      else if (r === 4) t = `<b>${v}</b> alunos estudam no turno da <b>${cols[c]}</b> (soma da coluna).`;
      else if (c === 2) t = `<b>${v}</b> alunos preferem <b>${rows[r][0]}</b> no total (${rows[r][1]} + ${rows[r][2]}).`;
      else t = `<b>${v}</b> alunos estudam de <b>${cols[c].toLowerCase()}</b> <u>e</u> preferem <b>${rows[r][0]}</b>.`;
      $('#tmsg', el).innerHTML = t;
    });
  },
  enganoso(el) {
    const draw = zero => {
      el.innerHTML = `<div class="jogo"><div class="row"><button class="btn sm ${zero ? 'on' : ''}" data-z="1">Eixo começando no 0 ✔</button><button class="btn sm ${zero ? '' : 'on'}" data-z="0">Eixo começando no 99 ✘</button></div>
      ${zero ? barChart([102, 100], ['Marca X', 'Marca Y'], { max: 120, ticks: 4, color: ['#ff6b4a', '#9aa3b5'] }) : barChart([102, 100], ['Marca X', 'Marca Y'], { min: 99, max: 102, ticks: 3, color: ['#ff6b4a', '#9aa3b5'] })}
      <p class="msg">${zero ? 'Com o eixo no zero, dá para ver que as vendas são <b>quase iguais</b> (diferença de só 2).' : 'Começando no 99, a coluna X parece <b>3 vezes maior</b> — mas a diferença real é só de 2 unidades! Isso engana o leitor.'}</p></div>`;
      $$('[data-z]', el).forEach(b => b.onclick = () => draw(b.dataset.z === '1'));
    };
    draw(false);
  },
  pizza(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">🍕 Monte a sua pizza: arraste o controle</span>
      <div class="pizza-row"><div class="pz"></div><div><input type="range" min="0" max="100" step="5" value="25" id="pzr"><div class="formula" id="pzt"></div></div></div></div>`;
    const upd = () => {
      const p = +$('#pzr', el).value;
      $('.pz', el).innerHTML = pieSVG([{ v: p, c: '#ff6b4a' }, { v: 100 - p, c: '#e8e1cf' }], 170);
      $('#pzt', el).innerHTML = `<b style="color:#ff6b4a">${p}%</b> do círculo<br>${p} × 3,6 = <b>${fmt(p * 3.6)}°</b>`;
    };
    $('#pzr', el).oninput = upd; upd();
  },
  distancia(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">📏 O ponto está dentro do círculo? (raio = 8 cm)</span>
      <div class="pizza-row"><div class="dz"></div><div><label>Distância do ponto ao centro: <b id="dv"></b></label><input type="range" min="0" max="12" step="0.5" value="6" id="dr"><p class="msg" id="dm"></p></div></div></div>`;
    const upd = () => {
      const d = +$('#dr', el).value, s = 8, px = 75 + d * s * Math.cos(-0.6), py = 75 + d * s * Math.sin(-0.6);
      const st = d < 8 ? ['dentro do círculo ✅', '#159a9c'] : d === 8 ? ['sobre a circunferência (na borda) ✅', '#ffb000'] : ['fora do círculo ❌', '#ff6b4a'];
      $('.dz', el).innerHTML = `<svg viewBox="0 0 150 150" class="ilus xs"><circle cx="75" cy="75" r="64" fill="#bfe8e6" stroke="#159a9c" stroke-width="3"/><circle cx="75" cy="75" r="3" fill="${INK}"/><line x1="75" y1="75" x2="${px}" y2="${py}" stroke="${INK}" stroke-dasharray="4 3"/><circle cx="${px}" cy="${py}" r="6" fill="${st[1]}" stroke="#fff" stroke-width="2"/></svg>`;
      $('#dv', el).textContent = fmt(d) + ' cm';
      $('#dm', el).innerHTML = `${fmt(d)} cm ${d < 8 ? '&lt;' : d === 8 ? '=' : '&gt;'} 8 cm → <b style="color:${st[1]}">${st[0]}</b>`;
    };
    $('#dr', el).oninput = upd; upd();
  },
  comprimento(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">🧵 "Desenrole" a circunferência</span>
      <label>Raio: <b id="cv"></b></label><input type="range" min="1" max="10" step="0.5" value="5" id="cr"><div id="cz"></div><div class="formula" id="ct"></div></div>`;
    const upd = () => {
      const r = +$('#cr', el).value, C = 2 * 3.14 * r, k = 5;
      $('#cv', el).textContent = fmt(r) + ' cm';
      $('#cz', el).innerHTML = `<svg viewBox="0 0 380 130" class="ilus"><circle cx="60" cy="60" r="${r * k}" fill="#bfe8e6" stroke="#ff6b4a" stroke-width="3"/><line x1="60" y1="60" x2="${60 + r * k}" y2="60" stroke="${INK}" stroke-width="2"/><circle cx="60" cy="60" r="2.5" fill="${INK}"/>
        <line x1="20" y1="118" x2="${20 + C * k}" y2="118" stroke="#ff6b4a" stroke-width="5" stroke-linecap="round"/><text x="${24 + C * k}" y="122" class="sml">C</text>
        <line x1="20" y1="104" x2="${20 + 2 * r * k}" y2="104" stroke="#159a9c" stroke-width="4" stroke-linecap="round"/><text x="${24 + 2 * r * k}" y="108" class="sml">d</text></svg>`;
      $('#ct', el).innerHTML = `d = 2 · ${fmt(r)} = <b>${fmt(2 * r)} cm</b> &nbsp;|&nbsp; C = 2 · 3,14 · ${fmt(r)} = <b style="color:#ff6b4a">${fmt(C)} cm</b><br><small>O contorno (C) cabe ~3,14 vezes o diâmetro (d).</small>`;
    };
    $('#cr', el).oninput = upd; upd();
  },
  euler(el) {
    el.innerHTML = `<div class="jogo"><span class="tag">🧮 Calculadora de Euler: preencha 2 valores e deixe 1 vazio</span>
      <div class="row eul"><label>V<input type="number" min="0" id="eV"></label><span>+</span><label>F<input type="number" min="0" id="eF"></label><span>=</span><label>A<input type="number" min="0" id="eA"></label><span>+ 2</span></div>
      <div class="row"><button class="btn sm" id="eGo">Descobrir</button><button class="btn sm ghost" data-p="8,6,">Cubo</button><button class="btn sm ghost" data-p="5,,8">Pirâmide</button><button class="btn sm ghost" data-p=",8,18">Exemplo 2</button></div>
      <p class="msg" id="eM"></p></div>`;
    const g = id => $('#' + id, el), val = id => g(id).value === '' ? null : +g(id).value;
    $$('[data-p]', el).forEach(b => b.onclick = () => { const [v, f, a] = b.dataset.p.split(','); g('eV').value = v; g('eF').value = f; g('eA').value = a; g('eM').innerHTML = ''; });
    g('eGo').onclick = () => {
      const V = val('eV'), F = val('eF'), A = val('eA'), vazios = [V, F, A].filter(x => x === null).length;
      if (vazios !== 1) { g('eM').innerHTML = vazios === 0 ? (V + F === A + 2 ? `✅ ${V} + ${F} = ${A} + 2. Vale a Relação de Euler!` : `❌ ${V} + ${F} = ${V + F}, mas ${A} + 2 = ${A + 2}. Não fecha!`) : 'Preencha exatamente 2 valores.'; return; }
      if (V === null) { g('eV').value = A + 2 - F; g('eM').innerHTML = `V + ${F} = ${A} + 2 → V = ${A + 2} − ${F} = <b>${A + 2 - F}</b>`; }
      else if (F === null) { g('eF').value = A + 2 - V; g('eM').innerHTML = `${V} + F = ${A} + 2 → F = ${A + 2} − ${V} = <b>${A + 2 - V}</b>`; }
      else { g('eA').value = V + F - 2; g('eM').innerHTML = `${V} + ${F} = A + 2 → A = ${V + F} − 2 = <b>${V + F - 2}</b>`; }
    };
  },
  solidos(el) {
    el.innerHTML = `<div class="jogo solidos"><span class="tag">🧊 Gire o sólido com o dedo ou o mouse</span>
      <div class="row">${[['tetra', 'Tetraedro'], ['cubo', 'Cubo'], ['octa', 'Octaedro'], ['dodeca', 'Dodecaedro'], ['icosa', 'Icosaedro']].map(s => `<button class="btn sm ghost" data-s="${s[0]}">${s[1]}</button>`).join('')}</div>
      <div class="stage"><p class="carregando">Carregando 3D…</p></div><div class="info"></div></div>`;
    if (window.mountSolidos) window.mountSolidos(el); else window.__pendingSolidos = el;
  }
};
function initWidgets(root) { $$('[data-w]', root).forEach(el => WIDGETS[el.dataset.w] && WIDGETS[el.dataset.w](el)); }

/* =========================================================
   ESTATÍSTICAS
   ========================================================= */
function stats(m) {
  const qs = MODULOS[m].questoes, porTopico = MODULOS[m].topicos.map(() => ({ ok: 0, n: 0 }));
  let resp = 0, acertos = 0; const erros = [];
  qs.forEach((q, i) => {
    const r = S.r[m][i];
    if (r && r.p !== undefined) {
      resp++; porTopico[q.t].n++;
      if (r.p === q.c) { acertos++; porTopico[q.t].ok++; } else erros.push(i);
    }
  });
  return { total: qs.length, resp, acertos, erros, porTopico, pct: resp ? Math.round(acertos / resp * 100) : 0 };
}

/* =========================================================
   TELAS
   ========================================================= */
const app = () => $('#app');

function header(extra = '') {
  return `<header class="top"><a href="#" class="logo"><span class="selo">6º</span><span><b>Mentoria Educacional Promover</b><small>Estudar Matemática</small></span></a>${extra}</header>`;
}

function renderHome() {
  const cards = ['m1', 'm2'].map(m => {
    const mod = MODULOS[m], s = stats(m), prog = Math.round(s.resp / s.total * 100);
    return `<article class="mod ${m}">
      <div class="mod-top"><span class="emoji">${mod.emoji}</span><div class="anel" style="--p:${prog}"><span>${s.resp}/${s.total}</span></div></div>
      <h2>${mod.titulo}</h2><p class="sub">${mod.sub}</p>
      <ul class="tops">${mod.topicos.map((t, i) => `<li><a href="#${m}/t/${i}">${i + 1}. ${t}</a></li>`).join('')}</ul>
      <div class="row"><a class="btn" href="#${m}/t">📖 Estudar a teoria</a><a class="btn alt" href="#${m}/q">✍️ Fazer as 15 questões</a></div>
      ${s.resp ? `<p class="mini-score">Acertos na 1ª tentativa: <b>${s.acertos}/${s.resp}</b></p>` : ''}
    </article>`;
  }).join('');
  app().innerHTML = header() + `
    <section class="hero">
      <div><p class="kicker">6º Ano · Ensino Fundamental II</p>
      <h1>Hora de <mark>estudar</mark> Matemática!</h1>
      <p>Leia a teoria com ilustrações, brinque com os exemplos interativos, faça as questões e <b>envie seu relatório de erros</b> para o professor pelo WhatsApp.</p></div>
      <form class="aluno" onsubmit="return false">
        <span class="fita"></span><b>Quem está estudando?</b>
        <label>Seu nome<input id="nome" value="${esc(S.aluno.nome)}" placeholder="Digite seu nome completo" autocomplete="name"></label>
        <label>Turma<input id="turma" value="${esc(S.aluno.turma)}" placeholder="Ex.: 6º A"></label>
        <small>Fica salvo só neste aparelho.</small>
      </form>
    </section>
    <section class="passos"><span>1 📖 Estude</span><span>2 ✍️ Responda</span><span>3 📋 Veja seus erros</span><span>4 💬 Envie no WhatsApp</span></section>
    <section class="mods">${cards}</section>
    <a class="btn relat" href="#relatorio">📋 Ver meu relatório de erros</a>`;
  $('#nome').oninput = e => { S.aluno.nome = e.target.value; save(); };
  $('#turma').oninput = e => { S.aluno.turma = e.target.value; save(); };
}

function renderModulo(m, tab, arg) {
  const mod = MODULOS[m];
  app().innerHTML = header(`<a href="#relatorio" class="btn sm ghost">📋 Relatório</a>`) + `
    <div class="mhead ${m}"><a href="#" class="voltar">← Início</a><h1>${mod.emoji} ${mod.titulo}<small>${mod.sub}</small></h1>
      <nav class="tabs"><a href="#${m}/t" class="${tab === 't' ? 'on' : ''}">📖 Teoria</a><a href="#${m}/q" class="${tab === 'q' ? 'on' : ''}">✍️ Questões</a></nav></div>
    <main id="main" class="${m}"></main>`;
  if (tab === 'q') { if (arg !== undefined && !isNaN(+arg)) { S.pos[m] = +arg; save(); } renderQuestao(m); }
  else renderTeoria(m, arg);
}

function renderTeoria(m, foco) {
  const mod = MODULOS[m];
  const main = $('#main');
  main.innerHTML = `<nav class="indice">${mod.topicos.map((t, i) => `<a href="#${m}/t/${i}">${i + 1}. ${t}</a>`).join('')}</nav>` +
    TEORIA[m].map((fn, i) => {
      const primeira = mod.questoes.findIndex(q => q.t === i), qtd = mod.questoes.filter(q => q.t === i).length;
      return `<section class="topico" id="top-${i}"><span class="num">${i + 1}</span><h2>${mod.topicos[i]}</h2>${fn()}
        <a class="btn alt pratica" href="#${m}/q/${primeira}">✍️ Praticar este tópico (${qtd} questões) →</a></section>`;
    }).join('');
  initWidgets(main);
  if (foco !== undefined) setTimeout(() => { const t = $('#top-' + foco); t && t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
}

function renderQuestao(m) {
  const mod = MODULOS[m], i = Math.min(S.pos[m] || 0, mod.questoes.length - 1), q = mod.questoes[i];
  const r = S.r[m][i] || {}, feito = r.u !== undefined, s = stats(m);
  const dotsNav = mod.questoes.map((qq, k) => {
    const rr = S.r[m][k]; let c = '';
    if (rr && rr.u !== undefined) c = rr.u === qq.c ? (rr.p === qq.c ? 'ok' : 'fix') : 'err';
    else if (rr && rr.p !== undefined) c = 'err';
    return `<button class="qd ${c} ${k === i ? 'cur' : ''}" data-k="${k}" aria-label="Questão ${k + 1}">${k + 1}</button>`;
  }).join('');
  const ops = q.ops.map((o, k) => {
    let c = '';
    if (feito) { if (k === q.c) c = 'certa'; else if (k === r.u) c = 'errada'; else c = 'apagada'; }
    return `<button class="op ${c}" data-o="${k}" ${feito ? 'disabled' : ''}><span class="let">${LETRAS[k]}</span><span>${o}</span></button>`;
  }).join('');
  const acertou = feito && r.u === q.c;
  const fb = !feito ? '' : `<div class="fb ${acertou ? 'sim' : 'nao'}">
      <b>${acertou ? (r.p === q.c ? '🎉 Acertou de primeira!' : '💪 Agora sim! (conta como erro no relatório, mas você aprendeu)') : `😕 Não foi dessa vez. A resposta certa é a <span class="let">${LETRAS[q.c]}</span>.`}</b>
      <div class="exp"><span class="tag">🧑‍🏫 Resolução comentada</span><p>${q.exp}</p></div>
      ${acertou ? '' : `<a class="link" href="#${m}/t/${q.t}">📖 Rever a teoria: ${mod.topicos[q.t]}</a>`}
    </div>`;
  const todas = s.resp === s.total;
  const temErradas = mod.questoes.some((qq, k) => S.r[m][k] && S.r[m][k].u !== undefined && S.r[m][k].u !== qq.c);
  $('#main').innerHTML = `
    <div class="qnav">${dotsNav}</div>
    <p class="legenda"><i class="ok"></i>acertou <i class="fix"></i>corrigiu <i class="err"></i>errou</p>
    <article class="qcard">
      <div class="qmeta"><span class="qn">Questão ${i + 1}<small>/${mod.questoes.length}</small></span><span class="pill">${mod.topicos[q.t]}</span></div>
      <p class="enun">${q.txt}</p>
      ${q.fig ? `<div class="fig">${FIG[q.fig]()}</div>` : ''}
      ${!feito ? `<details class="dica"><summary>💡 Preciso de uma dica</summary><p>${q.dica}</p></details>` : ''}
      <div class="ops">${ops}</div>
      ${fb}
      <div class="row nav">
        <button class="btn ghost" id="ant" ${i === 0 ? 'disabled' : ''}>← Anterior</button>
        ${i < mod.questoes.length - 1 ? `<button class="btn" id="prox">Próxima →</button>` : `<a class="btn" href="#relatorio">📋 Ver relatório</a>`}
      </div>
    </article>
    ${todas ? `<div class="fim"><b>🏁 Você respondeu todas as questões de ${mod.titulo}!</b><p>Acertos na 1ª tentativa: <b>${s.acertos}/${s.total}</b> (${s.pct}%).</p>
      <div class="row">${temErradas ? `<button class="btn alt" id="refazer">🔁 Refazer só as que errei</button>` : ''}<a class="btn" href="#relatorio">📋 Ver e enviar relatório</a></div></div>` : ''}
    <p class="reset"><button class="linkbtn" id="zerar">Apagar respostas deste módulo e recomeçar</button></p>`;

  $$('.qd').forEach(b => b.onclick = () => { S.pos[m] = +b.dataset.k; save(); renderQuestao(m); scrollTo({ top: 0, behavior: 'smooth' }); });
  $$('.op:not([disabled])').forEach(b => b.onclick = () => {
    const k = +b.dataset.o, rr = S.r[m][i] || {};
    if (rr.p === undefined) rr.p = k;
    rr.u = k; rr.n = (rr.n || 0) + 1; S.r[m][i] = rr; save();
    renderQuestao(m);
    const f = $('.fb'); f && f.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (k === q.c) estrelas();
  });
  const go = d => { S.pos[m] = i + d; save(); renderQuestao(m); scrollTo({ top: 0, behavior: 'smooth' }); };
  $('#ant') && ($('#ant').onclick = () => go(-1));
  $('#prox') && ($('#prox').onclick = () => go(1));
  $('#refazer') && ($('#refazer').onclick = () => {
    let primeira = null;
    mod.questoes.forEach((qq, k) => { const rr = S.r[m][k]; if (rr && rr.u !== qq.c) { delete rr.u; if (primeira === null) primeira = k; } });
    S.pos[m] = primeira || 0; save(); renderQuestao(m); scrollTo({ top: 0 });
  });
  $('#zerar').onclick = () => { if (confirm('Apagar todas as respostas de ' + mod.titulo + '?')) { S.r[m] = {}; S.pos[m] = 0; save(); renderQuestao(m); } };
}

function estrelas() {
  const box = document.createElement('div'); box.className = 'estrelas';
  box.innerHTML = Array.from({ length: 14 }, (_, k) => `<i style="--x:${Math.cos(k / 14 * 6.28) * 140}px;--y:${Math.sin(k / 14 * 6.28) * 140}px">${['⭐', '✨', '🌟'][k % 3]}</i>`).join('');
  document.body.appendChild(box); setTimeout(() => box.remove(), 1000);
}

/* ---------------- RELATÓRIO ---------------- */
function textoRelatorio() {
  const d = new Date().toLocaleDateString('pt-BR');
  let t = `*RELATÓRIO DE ESTUDO – 6º ANO*\nMentoria Educacional Promover\n\n👤 Aluno(a): ${S.aluno.nome || '(sem nome)'}\n🏫 Turma: ${S.aluno.turma || '-'}\n📅 Data: ${d}\n`;
  const revisar = [];
  ['m1', 'm2'].forEach(m => {
    const mod = MODULOS[m], s = stats(m);
    t += `\n*${mod.titulo} – ${mod.sub}*\n`;
    if (!s.resp) { t += 'Ainda não respondeu.\n'; return; }
    t += `Respondidas: ${s.resp}/${s.total}\n✅ Acertos de 1ª: ${s.acertos}/${s.resp} (${s.pct}%)\n`;
    if (s.erros.length) {
      t += `❌ Erros (${s.erros.length}):\n`;
      s.erros.forEach(i => {
        const q = mod.questoes[i], r = S.r[m][i];
        t += `• Q${i + 1} (${mod.topicos[q.t]}): marcou ${LETRAS[r.p]}, certa ${LETRAS[q.c]}${r.u === q.c ? ' – corrigiu depois' : ''}\n`;
      });
    } else t += '🎉 Nenhum erro!\n';
    s.porTopico.forEach((p, k) => { if (p.n && p.ok / p.n < 0.7) revisar.push(`${mod.titulo}: ${mod.topicos[k]}`); });
  });
  if (revisar.length) t += `\n📌 *Preciso revisar:*\n${revisar.map(x => '• ' + x).join('\n')}\n`;
  return t;
}

function renderRelatorio() {
  const total = ['m1', 'm2'].reduce((a, m) => { const s = stats(m); a.r += s.resp; a.a += s.acertos; a.t += s.total; return a; }, { r: 0, a: 0, t: 0 });
  const bloco = m => {
    const mod = MODULOS[m], s = stats(m);
    if (!s.resp) return `<section class="rbloco ${m}"><h2>${mod.emoji} ${mod.titulo}<small>${mod.sub}</small></h2><p class="vazio">Você ainda não respondeu nenhuma questão. <a href="#${m}/q">Começar agora →</a></p></section>`;
    return `<section class="rbloco ${m}">
      <h2>${mod.emoji} ${mod.titulo}<small>${mod.sub}</small></h2>
      <div class="placar"><div class="nota"><b>${s.acertos}</b><span>de ${s.resp} respondidas</span></div><div class="nota"><b>${s.pct}%</b><span>acertos de 1ª</span></div><div class="nota"><b>${s.total - s.resp}</b><span>sem responder</span></div></div>
      <div class="barras">${mod.topicos.map((t, k) => { const p = s.porTopico[k], pc = p.n ? Math.round(p.ok / p.n * 100) : 0; return `<div class="bt"><span>${t}</span><div class="trilho"><div style="width:${pc}%;background:${!p.n ? '#ccc' : pc >= 70 ? '#2bb673' : pc >= 40 ? '#ffb000' : '#e5484d'}"></div></div><em>${p.n ? `${p.ok}/${p.n}` : '–'}</em>${p.n && pc < 70 ? `<a href="#${m}/t/${k}" class="rev no-print">revisar</a>` : ''}</div>`; }).join('')}</div>
      ${s.erros.length ? `<h3>❌ Questões que errei</h3><ol class="erros">${s.erros.map(i => {
        const q = mod.questoes[i], r = S.r[m][i];
        return `<li><div class="eh"><b>Questão ${i + 1}</b><span class="pill">${mod.topicos[q.t]}</span>${r.u === q.c ? '<span class="pill verde">corrigi depois ✔</span>' : ''}</div>
          <p class="eq">${strip(q.txt).slice(0, 170)}${strip(q.txt).length > 170 ? '…' : ''}</p>
          <p class="cmp"><span class="m">Marquei: <b>${LETRAS[r.p]}</b> ${q.ops[r.p]}</span><span class="c">Certa: <b>${LETRAS[q.c]}</b> ${q.ops[q.c]}</span></p>
          <details><summary>Ver resolução</summary><p>${q.exp}</p></details></li>`;
      }).join('')}</ol>` : '<p class="parabens">🎉 Nenhum erro nas questões respondidas!</p>'}
    </section>`;
  };
  const txt = textoRelatorio();
  app().innerHTML = header(`<a href="#" class="btn sm ghost">← Início</a>`) + `
    <section class="rel-capa">
      <p class="kicker">Relatório de erros</p>
      <h1>${S.aluno.nome ? esc(S.aluno.nome) : 'Aluno(a) sem nome'}</h1>
      <p>${S.aluno.turma ? 'Turma ' + esc(S.aluno.turma) + ' · ' : ''}${new Date().toLocaleDateString('pt-BR')} · ${total.r}/${total.t} questões respondidas · ${total.a} acertos de 1ª</p>
      <div class="aluno inline no-print"><label>Nome<input id="nome" value="${esc(S.aluno.nome)}" placeholder="Seu nome"></label><label>Turma<input id="turma" value="${esc(S.aluno.turma)}" placeholder="6º A"></label></div>
    </section>
    ${bloco('m1')}${bloco('m2')}
    <section class="enviar no-print">
      <h2>💬 Enviar para o professor</h2>
      <p>O WhatsApp vai abrir com a mensagem pronta para <b>(85) 99262-1003</b>. É só tocar em enviar.</p>
      <pre class="previa">${esc(txt)}</pre>
      <div class="row"><a class="btn whats" id="wpp" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">📲 Enviar pelo WhatsApp</a>
      <button class="btn ghost" id="copiar">📋 Copiar texto</button><button class="btn ghost" onclick="print()">🖨️ Imprimir / PDF</button></div>
      <p class="msg" id="cmsg"></p>
    </section>`;
  const upd = () => {
    save();
    const t = textoRelatorio();
    $('.previa').textContent = t;
    $('#wpp').href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
    $('.rel-capa h1').textContent = S.aluno.nome || 'Aluno(a) sem nome';
  };
  $('#nome').oninput = e => { S.aluno.nome = e.target.value; upd(); };
  $('#turma').oninput = e => { S.aluno.turma = e.target.value; upd(); };
  $('#wpp').onclick = e => { upd(); if (!S.aluno.nome.trim()) { e.preventDefault(); $('#cmsg').innerHTML = '⚠️ Escreva seu nome lá em cima antes de enviar.'; $('#nome').focus(); } };
  $('#copiar').onclick = () => { navigator.clipboard.writeText(textoRelatorio()).then(() => $('#cmsg').textContent = '✅ Copiado! Cole no WhatsApp.', () => $('#cmsg').textContent = 'Não consegui copiar — selecione o texto acima.'); };
}

/* ---------------- ROTAS ---------------- */
function route() {
  const [mod, tab, arg] = (location.hash.slice(1) || '').split('/');
  if (mod === 'm1' || mod === 'm2') renderModulo(mod, tab || 't', arg);
  else if (mod === 'relatorio') renderRelatorio();
  else renderHome();
  if (!(tab === 't' && arg !== undefined)) scrollTo(0, 0);
}
addEventListener('hashchange', route);
route();
