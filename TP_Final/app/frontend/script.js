'use strict';
const $ = id => document.getElementById(id);
const form = $('predict-form');
$('products').addEventListener('input', e => { $('products-output').textContent = e.target.value; });
const apiBase = () => $('api-url').value.trim().replace(/\/+$/, '');
function setConnection(ok, message) {
  $('api-status').textContent = ok ? 'Conectada' : 'No disponible';
  $('status-note').textContent = ok ? 'API lista para recibir consultas' : 'Verificá URL, servidor y CORS';
  $('connection-label').textContent = message;
  $('connection-dot').className = ok ? 'ok' : 'fail';
}
async function checkApi() {
  $('connection-label').textContent = 'Verificando…';
  try {
    const r = await fetch(`${apiBase()}/health`, { signal: AbortSignal.timeout(75000) });
    if (!r.ok) throw Error(`HTTP ${r.status}`);
    const data = await r.json();
    if (data.estado !== 'ok') throw Error('Respuesta de salud inesperada');
    setConnection(true, 'Servicio verificado');
  } catch(e) { setConnection(false, e.message || 'Error de conexión'); }
}
$('check-api').addEventListener('click', checkApi);
form.addEventListener('submit', async event => {
  event.preventDefault(); $('form-error').hidden = true;
  if (!form.reportValidity()) return;
  const f = new FormData(form);
  const payload = {
    ProductRelated: Number(f.get('ProductRelated')),
    ProductRelated_Duration: Number(f.get('ProductRelated_Duration')),
    Administrative: Number(f.get('Administrative')),
    BounceRates: Number(f.get('BounceRates')),
    ExitRates: Number(f.get('ExitRates')),
    VisitorType: f.get('VisitorType'),
    Month: f.get('Month'),
    Weekend: f.has('Weekend')
  };
  const btn = $('predict-btn'); btn.disabled = true; btn.firstChild.textContent = 'CALCULANDO PREDICCIÓN… ';
  try {
    const r = await fetch(`${apiBase()}/predecir`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload),signal:AbortSignal.timeout(75000)});
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw Error(r.status===422 ? 'Entrada inválida (422). Revisá los valores ingresados.' : `API respondió HTTP ${r.status}.`);
    if (typeof data.probabilidad_compra !== 'number' || data.probabilidad_compra < 0 || data.probabilidad_compra > 1) throw Error('La API no devolvió una probabilidad válida');
    const pct = Math.round(data.probabilidad_compra*1000)/10;
    $('gauge').style.background = `conic-gradient(#8e76fb ${pct}%, #2a3650 ${pct}%)`;
    $('gauge-number').textContent = `${pct.toLocaleString('es-AR')}%`;
    $('result-description').textContent = `${data.etiqueta}. Probabilidad estimada por el modelo: ${pct.toLocaleString('es-AR')}%. No es una garantía de compra.`;
    setConnection(true,'Predicción completada');
  } catch(e) { $('form-error').textContent = e.message.includes('fetch') ? 'No se pudo conectar con la API. Comprobá que esté encendida y que CORS permita este origen.' : e.message; $('form-error').hidden = false; }
  finally {btn.disabled = false;btn.firstChild.textContent = 'GENERAR PREDICCIÓN ';}
});
checkApi();

/* Navegación accesible: menú lateral, sección activa y enlaces internos. */
const sidebar = $('sidebar');
const menuToggle = $('menu-toggle');
const navLinks = [...document.querySelectorAll('.sidebar .nav[href^="#"]')];
const pageSections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const nameFor = a => a.textContent.trim();
function closeMenu() {
  sidebar.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
}
function setActiveSection(id) {
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', active);
    if (active) {
      link.setAttribute('aria-current', 'page');
      $('section-label').textContent = nameFor(link);
    } else link.removeAttribute('aria-current');
  });
}
menuToggle.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  const id = link.getAttribute('href').slice(1);
  setActiveSection(id);
  closeMenu();
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', event => {
  if (document.body.classList.contains('menu-open') &&
      !sidebar.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) setActiveSection(visible[0].target.id);
  }, { rootMargin: '-15% 0px -65% 0px', threshold: [0, 0.1, 0.3] });
  pageSections.forEach(section => observer.observe(section));
}
const initialSection = window.location.hash.slice(1);
if (pageSections.some(s => s.id === initialSection)) setActiveSection(initialSection);
