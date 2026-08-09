#!/usr/bin/env node
/**
 * Monta public/index.html a partir de src/template.html + dados + fontes.
 *   node src/build.js            → nomes reais (uso interno)
 *   node src/build.js --anon     → nomes anonimizados (link público)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const anon = process.argv.includes('--anon');

const tpl    = fs.readFileSync(path.join(ROOT, 'src/template.html'), 'utf8');
const fontes = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/assets/fonts.json'), 'utf8'));
const frames = fs.readFileSync(path.join(ROOT, 'src/assets/frames.json'), 'utf8');
let crew     = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/crew.json'), 'utf8'));

// Peso 500 do display não é usado — fica de fora para economizar ~46 KB.
const faces = Object.values(fontes)
  .filter(f => !(f.fam === 'Schibsted Grotesk' && f.weight === '500'))
  .map(f => `@font-face{font-family:"${f.fam}";font-style:normal;font-weight:${f.weight};`
          + `font-display:swap;src:url(data:font/woff2;base64,${f.b64}) format("woff2")}`)
  .join('\n');

if (anon) {
  crew = crew.map(c => {
    const [primeiro, ...resto] = c.nome.trim().split(/\s+/);
    const inicial = resto.length ? ' ' + resto[resto.length - 1][0].toUpperCase() + '.' : '';
    return { ...c, nome: primeiro + inicial, port: null };
  });
}

const funcoes = [...new Set(crew.flatMap(c => c.func))]
  .filter(f => f !== 'Não informado')
  .sort((a, b) => a.localeCompare(b, 'pt'));

const html = tpl
  .replace('/*__FONTS__*/', faces)
  .replace('/*__FRAMES__*/', frames)
  .replace('/*__CREW__*/', JSON.stringify(crew))
  .replace('/*__FUNCOES__*/', JSON.stringify(funcoes));

fs.mkdirSync(path.join(ROOT, 'public'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'public/index.html'), html);

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`public/index.html — ${kb} KB · ${crew.length} cadastros · ${funcoes.length} funções` + (anon ? ' · ANONIMIZADO' : ''));
