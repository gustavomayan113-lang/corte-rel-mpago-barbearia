// Gerador de arte vetorial (SVG) para o site da Corte Relampago.
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = 'C:/Users/Gustavo/Desktop/barbearia-portfoilio';
const IMG = path.join(RAIZ, 'estaticos/img');

function salvar(rel, conteudo) {
  const alvo = path.join(IMG, rel);
  fs.mkdirSync(path.dirname(alvo), { recursive: true });
  fs.writeFileSync(alvo, conteudo.trim() + '\n', 'utf8');
  console.log('ok ->', rel);
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const lg = (id, a, b, x1 = 0, y1 = 0, x2 = 1, y2 = 1) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

const raio = (id, c, o = 0.2) =>
  `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;

function escurecer(hex, q) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.round(((n >> 16) & 255) * q));
  const g = Math.max(0, Math.round(((n >> 8) & 255) * q));
  const b = Math.max(0, Math.round((n & 255) * q));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function clarear(hex, q) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) * q));
  const g = Math.min(255, Math.round(((n >> 8) & 255) * q));
  const b = Math.min(255, Math.round((n & 255) * q));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

/* ------------------------------------------------------------------ */
/* retratos                                                            */
/* ------------------------------------------------------------------ */

const CABECAS = {
  // topo: cabelo (com clip na cabeca), nu: acessarios/extras
  degrade: (c, c2) => ({
    clip: [200, 205, 94, 112],
    topo: `
      <path d="M104 218C98 132 144 88 200 88s102 44 96 130c-6-34-22-52-48-60-30-9-66-9-96 0-26 8-42 26-48 60Z" fill="${c}"/>
      <path d="M118 196c-4 16-5 32-4 48 2-20 7-36 16-48Z" fill="${escurecer(c, 0.72)}"/>
      <path d="M282 196c4 16 5 32 4 48-2-20-7-36-16-48Z" fill="${escurecer(c, 0.72)}"/>
      <path d="M132 152c14-14 34-22 58-23M152 140c14-9 30-13 46-13" stroke="${c2}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".55"/>
      <path d="M170 120c16-8 40-9 58-2" stroke="${c2}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".4"/>`,
  }),
  social: (c, c2) => ({
    clip: [200, 205, 94, 112],
    topo: `
      <path d="M108 204c-4-58 32-98 92-98s96 40 92 98c-2-30-8-48-18-58-34-14-114-14-148 0-10 10-16 28-18 58Z" fill="${c}"/>
      <path d="M108 200h184v-16c-46-16-138-16-184 0Z" fill="${escurecer(c, 0.8)}"/>
      <path d="M130 168c30-10 110-10 140 0" stroke="${c2}" stroke-width="3" stroke-linecap="round" fill="none" opacity=".45"/>`,
  }),
  topete: (c, c2) => ({
    clip: [200, 176, 100, 142],
    topo: `
      <path d="M110 224c-10-64 12-118 62-130 40-10 84 6 104 42 14 26 12 56 4 84-6-30-16-52-34-64-30-20-84-18-116 4-20 14-28 38-20 64Z" fill="${c}"/>
      <path d="M150 122c22-26 74-32 108-12-24-6-58 2-84 20-10 6-18 4-24-8Z" fill="${c2}" opacity=".6"/>
      <path d="M162 140c20-16 58-22 86-10" stroke="${c2}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".45"/>
      <path d="M114 206c-3 16-3 30 0 44 3-16 6-30 10-42ZM286 206c3 16 3 30 0 44-3-16-6-30-10-42Z" fill="${escurecer(c, 0.7)}"/>`,
  }),
  cacheado: (c, c2) => {
    let bolhas = '';
    for (let i = 0; i < 7; i++) {
      const x = 118 + i * 27.3;
      const y = 168 - Math.abs(3 - i) * 9;
      bolhas += `<circle cx="${x.toFixed(0)}" cy="${y}" r="${(25 - Math.abs(3 - i) * 2.2).toFixed(0)}" fill="${i % 2 ? c : c2}" opacity="${i % 2 ? 0.95 : 0.7}"/>`;
    }
    return {
      clip: [200, 200, 98, 116],
      topo: `${bolhas}
      <path d="M110 214c-4-40 10-72 34-88 26 14 96 14 122 0 24 16 38 48 34 88-6-28-20-42-44-48-32-8-70-8-102 0-24 6-38 20-44 48Z" fill="${c}"/>
      <circle cx="150" cy="150" r="16" fill="${c2}" opacity=".5"/>
      <circle cx="252" cy="146" r="14" fill="${c2}" opacity=".45"/>`,
    };
  },
  careca: () => ({
    clip: [200, 205, 94, 112],
    topo: `<path d="M110 206c0-56 40-100 90-100s90 44 90 100c-14-30-46-44-90-44s-76 14-90 44Z" fill="#000" opacity=".07"/>
      <path d="M120 190c6-26 24-44 44-54" stroke="#000" stroke-width="5" stroke-linecap="round" opacity=".12" fill="none"/>`,
  }),
  militar: (c, c2) => ({
    clip: [200, 205, 94, 112],
    topo: `<path d="M106 212c-2-62 40-108 94-108s96 46 94 108c-6-36-22-56-48-64-28-9-64-9-92 0-26 8-42 28-48 64Z" fill="${c}"/>
      ${[0, 1, 2, 3, 4].map((i) => `<path d="M${128 + i * 36} 150l6 10h-12Z" fill="${c2}" opacity=".45"/>`).join('')}
      <path d="M116 200c-3 14-3 28-1 42 2-16 5-28 9-40ZM284 200c3 14 3 28 1 42-2-16-5-28-9-40Z" fill="${escurecer(c, 0.65)}"/>`,
  }),
  repartido: (c, c2) => ({
    clip: [200, 205, 94, 112],
    topo: `<path d="M104 214c-2-70 40-116 96-116s98 46 96 116c-4-30-10-50-24-62-8 22-30 34-64 36-34 2-58 12-64 34-14 6-28 0-40-8Z" fill="${c}"/>
      <path d="M200 100c-34 4-58 26-62 58 22 6 46 2 62-14Z" fill="${c2}" opacity=".45"/>
      <path d="M124 170c-6 14-7 28-6 42 3-16 6-28 11-38Z" fill="${escurecer(c, 0.72)}"/>`,
  }),
};

const BARBAS = {
  nenhuma: () => '',
  bigode: (c) => `<path d="M166 258c14-8 54-8 68 0-6 16-62 16-68 0Z" fill="${c}"/>
    <path d="M182 286c10 4 26 4 36 0-6 8-30 8-36 0Z" fill="${c}" opacity=".7"/>`,
  cavanhaque: (c) => `<path d="M112 206c0 88 40 128 88 128s88-40 88-128c-2 44-10 74-24 88-18 18-42 26-64 26s-46-8-64-26c-14-14-22-44-24-88Z" fill="${c}"/>
    <path d="M180 288c12 6 28 6 40 0-6 10-34 10-40 0Z" fill="#000" opacity=".18"/>`,
  cheia: (c) => `<path d="M108 198c0 100 44 148 92 148s92-48 92-148c-6 56-16 88-32 104-18 18-40 24-60 24s-42-6-60-24c-16-16-26-48-32-104Z" fill="${c}"/>
    <path d="M164 252c18-10 54-10 72 0-10 22-62 22-72 0Z" fill="${c}"/>
    <path d="M182 290c10 5 26 5 36 0-6 9-30 9-36 0Z" fill="#000" opacity=".2"/>`,
  cavanhaque_bigode: (c) => `${CABECAS_E_BARBAS.cavanhaque(c)}
    <path d="M164 250c16-9 56-9 72 0-8 18-64 18-72 0Z" fill="${c}"/>`,
  gorjeta: (c) => `<path d="M158 264c10 44 24 66 42 66s32-22 42-66c-8 30-22 44-42 44s-34-14-42-44Z" fill="${c}"/>
    <path d="M166 250c18-9 50-9 68 0-8 20-60 20-68 0Z" fill="${c}"/>`,
};
const CABECAS_E_BARBAS = BARBAS;

function retrato({
  arquivo,
  cabeloEstilo = 'degrade',
  barba = 'cavanhaque',
  pele = '#e0a97d',
  camisa = '#12203f',
  camisa2 = '#0b1224',
  fundoA = '#101a33',
  fundoB = '#07080d',
  destaque = '#e3b23c',
  Fade = false,
  oculos = false,
  extra = '',
}) {
  const cabeloCor = '#241a14';
  const cabeloClaro = clarear(cabeloCor, 1.5);
  const c = CABECAS[cabeloEstilo](cabeloCor, cabeloClaro);
  const peleEsc = escurecer(pele, 0.78);
  const [ccx, ccy, crx, cry] = c.clip;
  const uid = arquivo.replace(/[^a-z0-9]/gi, '');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="400" height="480" role="img" aria-label="Retrato ilustrado de cliente da Corte Relampago">
  <defs>
    ${lg('fundo' + uid, fundoA, fundoB)}
    ${lg('camisa' + uid, camisa, camisa2)}
    ${lg('cabelo' + uid, cabeloCor, escurecer(cabeloCor, 0.55))}
    ${lg('barba' + uid, escurecer(cabeloCor, 1.1), cabeloCor)}
    ${raio('brilho' + uid, destaque, 0.28)}
    <clipPath id="cabeca${uid}"><ellipse cx="${ccx}" cy="${ccy}" rx="${crx}" ry="${cry}"/></clipPath>
    <clipPath id="quadro${uid}"><rect width="400" height="480" rx="0"/></clipPath>
  </defs>
  <g clip-path="url(#quadro${uid})">
    <rect width="400" height="480" fill="url(#fundo${uid})"/>
    <circle cx="200" cy="196" r="150" fill="url(#brilho${uid})"/>
    <circle cx="200" cy="196" r="132" fill="none" stroke="${destaque}" stroke-opacity=".28" stroke-width="1.5"/>
    <circle cx="200" cy="196" r="150" fill="none" stroke="${destaque}" stroke-opacity=".1" stroke-width="1"/>
    <g opacity=".12" stroke="${destaque}" stroke-width="1">
      ${Array.from({ length: 9 }, (_, i) => `<path d="M-40 ${300 + i * 22}L${120 + i * 30} 480"/>`).join('')}
    </g>
    <path d="M300 -10 420 40 420 -10Z" fill="${destaque}" opacity=".12"/>
    <path d="M-10 120 40 96 -10 60Z" fill="#e01b2d" opacity=".18"/>

    <!-- tronco / camisa -->
    <path d="M18 480c0-84 74-124 132-140 12 26 88 26 100 0 58 16 132 56 132 140Z" fill="url(#camisa${uid})"/>
    <path d="M150 340c14 24 86 24 100 0l10 12c-18 30-102 30-120 0Z" fill="#fff" opacity=".07"/>
    <path d="M200 352 176 480h48l-24-128Z" fill="#000" opacity=".18"/>
    <path d="M126 356c22 34 44 56 74 74" stroke="${destaque}" stroke-width="2.5" fill="none" opacity=".5"/>
    <path d="M274 356c-22 34-44 56-74 74" stroke="${destaque}" stroke-width="2.5" fill="none" opacity=".5"/>

    <!-- pescoco -->
    <path d="M170 288h60v70c0 16-60 16-60 0Z" fill="${peleEsc}"/>
    <path d="M170 300c14 14 46 14 60 0v-14h-60Z" fill="#000" opacity=".22"/>

    <!-- orelhas -->
    <ellipse cx="112" cy="228" rx="15" ry="22" fill="${peleEsc}"/>
    <ellipse cx="288" cy="228" rx="15" ry="22" fill="${peleEsc}"/>

    <!-- cabeca -->
    <ellipse cx="200" cy="205" rx="88" ry="106" fill="${pele}"/>
    <path d="M200 99c48 0 88 46 88 106 0 52-38 100-88 106Z" fill="${peleEsc}" opacity=".22"/>
    <ellipse cx="162" cy="216" rx="30" ry="40" fill="#fff" opacity=".07"/>
    <ellipse cx="238" cy="216" rx="30" ry="40" fill="#000" opacity=".07"/>

    <!-- nariz / boca -->
    <path d="M200 226c-6 12-8 20-2 22h10" stroke="${peleEsc}" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M184 300c8 5 24 5 32 0" stroke="${peleEsc}" stroke-width="4" stroke-linecap="round" fill="none"/>

    <!-- olhos -->
    <ellipse cx="172" cy="232" rx="7" ry="6" fill="#14100d"/>
    <ellipse cx="228" cy="232" rx="7" ry="6" fill="#14100d"/>
    <circle cx="174" cy="230" r="2" fill="#fff" opacity=".85"/>
    <circle cx="230" cy="230" r="2" fill="#fff" opacity=".85"/>
    <path d="M156 210c8-6 22-6 30 0M214 210c8-6 22-6 30 0" stroke="${escurecer(cabeloCor, 1.1)}" stroke-width="6" stroke-linecap="round" fill="none"/>

    ${BARBAS[barba](`url(#barba${uid})`)}

    <g clip-path="url(#cabeca${uid})">${c.topo}</g>
    ${oculos ? `<g fill="none" stroke="#0d1018" stroke-width="7"><rect x="142" y="216" width="46" height="30" rx="10"/><rect x="212" y="216" width="46" height="30" rx="10"/><path d="M188 228h24M142 224l-24-4M258 224l24-4"/></g>
    <path d="M150 222h32v6h-32Z" fill="#8fc7ff" opacity=".25"/>` : ''}
    ${extra}
    ${Fade ? `<rect width="400" height="480" fill="#07080d" opacity=".28"/>` : ''}
  </g>
</svg>`;
}

/* ------------------------------------------------------------------ */
/* geracao dos retratos                                                */
/* ------------------------------------------------------------------ */

const RETRATOS = [
  { arquivo: 'retratos/cliente-01.svg', cabeloEstilo: 'degrade', barba: 'cavanhaque_bigode', pele: '#e6b189', camisa: '#132347', camisa2: '#0a0f1e', fundoA: '#12204a', fundoB: '#05070f', destaque: '#e3b23c' },
  { arquivo: 'retratos/cliente-02.svg', cabeloEstilo: 'topete', barba: 'cheia', pele: '#8a5a34', camisa: '#7d1220', camisa2: '#3d0710', fundoA: '#2a1020', fundoB: '#05070f', destaque: '#e01b2d' },
  { arquivo: 'retratos/cliente-03.svg', cabeloEstilo: 'social', barba: 'gorjeta', pele: '#f2c6a0', camisa: '#f4f5f8', camisa2: '#c9ccd6', fundoA: '#1b2b55', fundoB: '#06080f', destaque: '#3b82f6' },
  { arquivo: 'retratos/cliente-04.svg', cabeloEstilo: 'cacheado', barba: 'bigode', pele: '#a06a41', camisa: '#0f2a1d', camisa2: '#06140e', fundoA: '#0f2a3d', fundoB: '#05070f', destaque: '#37d39b' },
  { arquivo: 'retratos/cliente-05.svg', cabeloEstilo: 'repartido', barba: 'cavanhaque', pele: '#e0a97d', camisa: '#1a1d2c', camisa2: '#0a0c14', fundoA: '#241a2e', fundoB: '#05070f', destaque: '#e3b23c' },
  { arquivo: 'retratos/cliente-06.svg', cabeloEstilo: 'militar', barba: 'cheia', pele: '#c78a5b', camisa: '#123', camisa2: '#05080f', fundoA: '#0e2a5c', fundoB: '#05070f', destaque: '#e3b23c' },
  { arquivo: 'retratos/cliente-07.svg', cabeloEstilo: 'careca', barba: 'cheia', oculos: true, pele: '#f2c6a0', camisa: '#0e2a5c', camisa2: '#06122b', fundoA: '#161f3d', fundoB: '#05070f', destaque: '#e3b23c' },
  { arquivo: 'retratos/cliente-08.svg', cabeloEstilo: 'cacheado', barba: 'cheia', pele: '#7c4e2e', camisa: '#8a1424', camisa2: '#40070f', fundoA: '#3a0f1a', fundoB: '#05070f', destaque: '#e3b23c' },
];

RETRATOS.forEach((r) => salvar(r.arquivo, retrato(r)));

const EQUIPE = [
  { arquivo: 'retratos/equipe-01.svg', cabeloEstilo: 'militar', barba: 'cavanhaque', pele: '#c78a5b', camisa: '#0d1f45', camisa2: '#060c1c', fundoA: '#0e2a5c', fundoB: '#05070f', destaque: '#e3b23c' },
  { arquivo: 'retratos/equipe-02.svg', cabeloEstilo: 'topete', barba: 'cheia', pele: '#8a5a34', camisa: '#7a1220', camisa2: '#33060d', fundoA: '#2a0f1a', fundoB: '#05070f', destaque: '#e01b2d' },
  { arquivo: 'retratos/equipe-03.svg', cabeloEstilo: 'repartido', barba: 'bigode', pele: '#f2c6a0', camisa: '#101320', camisa2: '#05060b', fundoA: '#221a2c', fundoB: '#05070f', destaque: '#e3b23c' },
  { arquivo: 'retratos/equipe-04.svg', cabeloEstilo: 'careca', barba: 'cavanhaque_bigode', oculos: true, pele: '#a06a41', camisa: '#0f1a1a', camisa2: '#050c0c', fundoA: '#123030', fundoB: '#05070f', destaque: '#e3b23c' },
];

EQUIPE.forEach((r) => salvar(r.arquivo, retrato(r)));

/* ------------------------------------------------------------------ */
/* hero: cliente na cadeira + tesoura + poste                          */
/* ------------------------------------------------------------------ */

function hero() {
  const pele = '#e0a97d';
  const peleEsc = escurecer(pele, 0.78);
  const cabelo = '#221913';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 640" width="560" height="640" role="img" aria-label="Ilustracao de cliente sendo atendido na cadeira da Corte Relampago">
  <defs>
    ${lg('hfundo', '#16264f', '#05070f', 0, 0, 1, 1)}
    ${lg('hcapa', '#12224e', '#080d1c')}
    ${lg('hpole', '#f3f5fa', '#c7ccd8')}
    ${lg('houro', '#f5d06a', '#c18f1c')}
    ${raio('hbrilho', '#e3b23c', 0.34)}
    ${raio('hvermelho', '#e01b2d', 0.28)}
    <clipPath id="hcabeca"><ellipse cx="300" cy="290" rx="104" ry="124"/></clipPath>
  </defs>

  <rect width="560" height="640" fill="url(#hfundo)"/>
  <circle cx="300" cy="286" r="196" fill="url(#hbrilho)"/>
  <circle cx="300" cy="286" r="182" fill="none" stroke="#e3b23c" stroke-opacity=".35" stroke-width="1.5" stroke-dasharray="6 10"/>
  <circle cx="300" cy="286" r="206" fill="none" stroke="#e3b23c" stroke-opacity=".16" stroke-width="1"/>
  <circle cx="90" cy="120" r="120" fill="url(#hvermelho)"/>

  <g opacity=".14" stroke="#e3b23c" stroke-width="1">
    ${Array.from({ length: 12 }, (_, i) => `<path d="M-60 ${200 + i * 26}L${140 + i * 34} 660"/>`).join('')}
  </g>

  <!-- poste de barbeiro -->
  <g transform="translate(44 92)">
    <rect x="-6" y="0" width="12" height="26" rx="4" fill="url(#houro)"/>
    <rect x="-26" y="26" width="52" height="26" rx="6" fill="#0b0f1c"/>
    <rect x="-24" y="52" width="48" height="230" rx="10" fill="url(#hpole)"/>
    <g clip-path="none">
      <path d="M-24 70 24 40v34L-24 104Z" fill="#e01b2d"/>
      <path d="M-24 140 24 110v34L-24 174Z" fill="#0e2a5c"/>
      <path d="M-24 210 24 180v34L-24 244Z" fill="#e01b2d"/>
    </g>
    <rect x="-27" y="48" width="54" height="8" rx="4" fill="#0b0f1c"/>
    <rect x="-27" y="252" width="54" height="8" rx="4" fill="#0b0f1c"/>
    <rect x="-30" y="272" width="60" height="12" rx="5" fill="url(#houro)"/>
  </g>

  <!-- tesoura -->
  <g transform="translate(452 148) rotate(28)">
    <path d="M0 -70 10 -8h-20Z" fill="url(#houro)"/>
    <path d="M0 70 10 8h-20Z" fill="url(#houro)"/>
    <circle cx="0" cy="-2" r="7" fill="#f3f5fa"/>
    <ellipse cx="-16" cy="46" rx="14" ry="20" fill="none" stroke="#e01b2d" stroke-width="8"/>
    <ellipse cx="16" cy="46" rx="14" ry="20" fill="none" stroke="#e01b2d" stroke-width="8"/>
  </g>

  <!-- cadeira -->
  <g transform="translate(300 520)">
    <rect x="-150" y="-40" width="300" height="40" rx="18" fill="#0b1122"/>
    <rect x="-150" y="-70" width="46" height="40" rx="16" fill="#101a35"/>
    <rect x="104" y="-70" width="46" height="40" rx="16" fill="#101a35"/>
  </g>

  <!-- capa -->
  <path d="M120 640c0-104 88-152 180-152s180 48 180 152Z" fill="url(#hcapa)"/>
  <path d="M300 488c-26 18-46 30-60 40 20 12 40 18 60 18s40-6 60-18c-14-10-34-22-60-40Z" fill="#000" opacity=".25"/>
  <path d="M250 520c16 34 34 56 50 66 16-10 34-32 50-66" stroke="#e3b23c" stroke-width="2.5" fill="none" opacity=".55"/>
  <path d="M180 560c26 44 60 74 90 92M420 560c-26 44-60 74-90 92" stroke="#e3b23c" stroke-width="2" fill="none" opacity=".3"/>

  <!-- pescoco -->
  <path d="M262 380h76v92c0 20-76 20-76 0Z" fill="${peleEsc}"/>
  <path d="M262 394c18 18 58 18 76 0v-16h-76Z" fill="#000" opacity=".24"/>

  <!-- orelhas -->
  <ellipse cx="192" cy="318" rx="18" ry="27" fill="${peleEsc}"/>
  <ellipse cx="408" cy="318" rx="18" ry="27" fill="${peleEsc}"/>

  <!-- cabeca -->
  <ellipse cx="300" cy="290" rx="104" ry="124" fill="${pele}"/>
  <path d="M300 166c57 0 104 55 104 124 0 62-45 120-104 124Z" fill="${peleEsc}" opacity=".22"/>
  <ellipse cx="252" cy="304" rx="36" ry="48" fill="#fff" opacity=".07"/>
  <ellipse cx="348" cy="304" rx="36" ry="48" fill="#000" opacity=".07"/>
  <path d="M300 316c-8 16-10 26-2 28h14" stroke="${peleEsc}" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M278 404c10 6 32 6 42 0" stroke="${peleEsc}" stroke-width="5" stroke-linecap="round" fill="none"/>

  <!-- olhos / sobrancelhas -->
  <ellipse cx="264" cy="322" rx="8" ry="7" fill="#14100d"/>
  <ellipse cx="336" cy="322" rx="8" ry="7" fill="#14100d"/>
  <circle cx="266" cy="320" r="2.4" fill="#fff" opacity=".85"/>
  <circle cx="338" cy="320" r="2.4" fill="#fff" opacity=".85"/>
  <path d="M244 296c10-8 28-8 38 0M318 296c10-8 28-8 38 0" stroke="${cabelo}" stroke-width="8" stroke-linecap="round" fill="none"/>

  <!-- barba -->
  <path d="M192 288c0 118 48 174 108 174s108-56 108-174c-4 74-12 108-30 128-20 20-48 28-78 28s-58-8-78-28c-18-20-26-54-30-128Z" fill="${cabelo}"/>
  <path d="M258 400c20 10 44 10 62 0-6 14-56 14-62 0Z" fill="#000" opacity=".22"/>

  <!-- cabelo (degradee com topo) -->
  <g clip-path="url(#hcabeca)">
    <path d="M186 306c-8-110 52-166 114-166s122 56 114 166c-8-46-28-70-62-80-38-12-84-12-122 0-34 10-54 34-62 80Z" fill="url(#houro)"/>
    <path d="M196 268c-6 22-8 44-6 66 3-26 8-46 18-62Z" fill="#8c6314" opacity=".7"/>
    <path d="M404 268c6 22 8 44 6 66-3-26-8-46-18-62Z" fill="#8c6314" opacity=".7"/>
    <path d="M226 208c24-18 60-28 96-26M250 186c26-12 58-16 88-8" stroke="#fff2c4" stroke-width="6" stroke-linecap="round" fill="none" opacity=".45"/>
  </g>

  <!-- espelho decorativo -->
  <g transform="translate(452 396)">
    <circle r="52" fill="#0b1122" stroke="url(#houro)" stroke-width="3"/>
    <circle r="40" fill="none" stroke="#e3b23c" stroke-opacity=".3" stroke-width="1"/>
    <path d="M0 -30 10 -6H-10Z" fill="#e3b23c"/>
  </g>
</svg>`;
}
salvar('hero-relampago.svg', hero());

/* ------------------------------------------------------------------ */
/* logo + favicon                                                      */
/* ------------------------------------------------------------------ */

function logo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Corte Relampago">
  <defs>${lg('lg1', '#f5d06a', '#c18f1c', 0, 0, 1, 1)}${lg('lg2', '#f3f5fa', '#c9ccd8', 0, 0, 1, 1)}</defs>
  <path d="M32 3 57 12v22c0 14-10 23-25 27C17 57 7 48 7 34V12Z" fill="#0b1122"/>
  <path d="M32 3 57 12v22c0 14-10 23-25 27C17 57 7 48 7 34V12Z" fill="none" stroke="url(#lg1)" stroke-width="2.4"/>
  <path d="M35 12 21 34h10l-4 18 16-24H32Z" fill="url(#lg1)"/>
  <g stroke="url(#lg2)" stroke-width="2.6" stroke-linecap="round" fill="none">
    <path d="M15 22 24 40M49 22 40 40"/>
  </g>
  <circle cx="32" cy="41" r="3" fill="#e01b2d"/>
</svg>`;
}
salvar('logo.svg', logo());

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>${lg('fg', '#f5d06a', '#c18f1c', 0, 0, 1, 1)}</defs>
  <rect width="64" height="64" rx="14" fill="#0b1122"/>
  <path d="M36 10 20 35h11l-4 19 17-26H33Z" fill="url(#fg)"/>
</svg>`;
}
salvar('favicon.svg', favicon());

/* ------------------------------------------------------------------ */
/* texturas                                                            */
/* ------------------------------------------------------------------ */

salvar(
  'texturas/grade.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><path d="M80 0H0v80" fill="none" stroke="#e3b23c" stroke-opacity=".22" stroke-width="1"/></svg>`
);

salvar(
  'texturas/pontos.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><circle cx="2" cy="2" r="1.3" fill="#e3b23c" fill-opacity=".3"/></svg>`
);

salvar(
  'texturas/raios.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600"><g fill="#e3b23c" fill-opacity=".07">${Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 * Math.PI) / 180;
    return `<path d="M300 300 0 ${-60} 0 60Z" transform="rotate(${(i * 22.5).toFixed(1)} 300 300)"/>`;
  }).join('')}</g></svg>`
);

salvar(
  'texturas/faixa.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" width="200" height="44"><g fill="none" stroke-linecap="round" stroke-width="6"><path d="M10 22 26 10l16 12 16-12 16 12 16-12 16 12 16-12 16 12 16-12" stroke="#e3b23c" stroke-opacity=".5"/><path d="M10 34 26 22l16 12 16-12 16 12 16-12 16 12 16-12 16 12 16-12 16 12" stroke="#e01b2d" stroke-opacity=".35"/></g></svg>`
);

salvar(
  'texturas/textura-papel.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="180" height="180" filter="url(#n)" opacity=".35"/></svg>`
);

/* ------------------------------------------------------------------ */
/* selo redondo (usado no rodape / selo de qualidade)                  */
/* ------------------------------------------------------------------ */

salvar(
  'selo.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>${lg('sg', '#f5d06a', '#c18f1c', 0, 0, 1, 1)}</defs>
  <circle cx="100" cy="100" r="92" fill="none" stroke="url(#sg)" stroke-width="2"/>
  <circle cx="100" cy="100" r="76" fill="none" stroke="#e01b2d" stroke-width="1.5" stroke-dasharray="4 8"/>
  <path d="M108 52 78 104h20l-6 42 32-56h-22Z" fill="url(#sg)"/>
  <text x="100" y="168" text-anchor="middle" font-family="Barlow Condensed, Arial, sans-serif" font-size="14" letter-spacing="4" fill="#e3b23c">DESDE 2009</text>
</svg>`
);

console.log('arte concluida');
