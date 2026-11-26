try {
/* ---------- nav: mobile menu + scrollspy ---------- */
const menuBtn = document.querySelector('.menu-btn'), links = document.getElementById('navlinks');
menuBtn.addEventListener('click', () => { const o = links.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
links.addEventListener('click', e => { if (e.target.closest('a')) { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });
const spy = [...links.querySelectorAll('a:not(.btn)')], secs = spy.map(a => document.querySelector(a.getAttribute('href')));
addEventListener('scroll', () => { const p = scrollY + innerHeight * .4; let cur = null; secs.forEach(s => { if (s && s.offsetTop <= p) cur = s.id; }); spy.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur)); }, { passive: true });
} catch (e) { /* bloque sin sus elementos en esta página */ }

try {
/* ---------- reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} catch (e) { /* bloque sin sus elementos en esta página */ }

try {
/* ---------- BCN clock ---------- */
const clk = document.getElementById('clock');
const tickClk = () => clk.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date());
tickClk(); setInterval(tickClk, 30000);
} catch (e) { /* bloque sin sus elementos en esta página */ }

try {
/* ---------- forms ---------- */
const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
// Waitlist. MAQUETA: sustituir por el endpoint del servicio elegido (MailerLite / Buttondown / Kit), con doble confirmación.
document.querySelectorAll('.js-signup').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const ok = validEmail(f.email.value.trim()) && f.consent.checked;
  f.classList.toggle('invalid', !ok);
  if (!ok) return;
  // Hasta conectar el servicio de lista (MailerLite / Buttondown), se envía por correo.
  location.href = 'mailto:hello@renderly.art?subject=' + encodeURIComponent('Join the Renderly list') + '&body=' + encodeURIComponent('Please add ' + f.email.value.trim() + ' to the Renderly list.');
  f.classList.add('sent');
}));
// Enquiry: sin servidor, abre el correo con los datos rellenados. MAQUETA: cambiar por Formspree / Web3Forms.
document.querySelectorAll('.js-enquiry').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const ok = f.name.value.trim() && validEmail(f.email.value.trim()) && f.msg.value.trim() && f.consent.checked;
  f.classList.toggle('invalid', !ok);
  if (!ok) return;
  const body = `Name: ${f.name.value}\nEmail: ${f.email.value}\nNeed: ${f.type.value}\nEngine: ${f.engine.value}\nBudget: ${f.budget.value}\nTimeline: ${f.when.value}\n\n${f.msg.value}`;
  location.href = 'mailto:hello@renderly.art?subject=' + encodeURIComponent('Project enquiry — ' + f.type.value) + '&body=' + encodeURIComponent(body);
  f.classList.add('sent');
}));
} catch (e) { /* bloque sin sus elementos en esta página */ }

try {
/* ---------- botones 'Book an audit': preseleccionan el tipo en el formulario ---------- */
document.querySelectorAll('.js-need').forEach(a => a.addEventListener('click', () => { const sel = document.getElementById('cf-type'); if (sel) sel.value = a.dataset.need; }));
} catch (e) { /* bloque sin sus elementos en esta página */ }

try {
/* ---------- Renderly Lab: cada 10 lanzamientos sube de versión (v1, v2…) ---------- */
(function(){
  const st = document.querySelector('.lab-strip[data-released]'); if (!st) return;
  const n = Math.max(0, parseInt(st.dataset.released, 10) || 0), v = Math.floor(n / 10), r = n % 10;
  st.querySelector('.js-labname').textContent = 'Renderly Lab' + (v ? ' v' + v : '');
  st.querySelector('.js-labcount').textContent = String(r).padStart(2, '0') + ' / 10';
  st.querySelector('.bar i').style.right = (100 - r * 10) + '%';
})();
} catch (e) { /* bloque sin sus elementos en esta página */ }

try {
/* ---------- copy email ---------- */
const toast = document.querySelector('.toast'); let tt;
document.querySelectorAll('.js-copy').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  (navigator.clipboard ? navigator.clipboard.writeText(a.dataset.email) : Promise.reject()).then(() => { toast.style.opacity = 1; clearTimeout(tt); tt = setTimeout(() => toast.style.opacity = 0, 1700); }).catch(() => location.href = 'mailto:' + a.dataset.email);
}));
} catch (e) { /* bloque sin sus elementos en esta página */ }

try {
/* ---------- cabecera de marca: el logo pequeño de la barra solo aparece al pasar la cabecera ---------- */
(function(){
  const nav = document.getElementById('siteNav'), hb = document.getElementById('brandHeader');
  new IntersectionObserver(([e]) => nav.classList.toggle('brand-off', e.isIntersecting), { rootMargin: '-140px 0px 0px 0px', threshold: .02 }).observe(hb);
})();
} catch (e) { /* bloque sin sus elementos en esta página */ }

try {
/* ---------- partículas tipo PS5 bajo el agua: rayos de luz, cáusticas, purpurina y turbulencia suave; solo en el apartado B2B ---------- */
(function(){
  const cv = document.getElementById('bokeh'), ctx = cv.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, dpr = 1, parts = [], running = false, op = 0, last = 0, t0 = performance.now(), lastScroll = scrollY;
  const tones = [[237,232,221],[246,214,176],[220,153,47]];
  const sprite = (rgb, kind) => {
    const c = document.createElement('canvas'), S = 128; c.width = c.height = S; const g = c.getContext('2d');
    const gr = g.createRadialGradient(S/2, S/2, 0, S/2, S/2, S/2), [r, gg, b] = rgb, col = a => `rgba(${r},${gg},${b},${a})`;
    if (kind === 'bokeh') { gr.addColorStop(0, col(.5)); gr.addColorStop(.55, col(.42)); gr.addColorStop(.8, col(.2)); gr.addColorStop(1, col(0)); }
    else { gr.addColorStop(0, col(1)); gr.addColorStop(.3, col(.85)); gr.addColorStop(.6, col(.22)); gr.addColorStop(1, col(0)); }
    g.fillStyle = gr; g.fillRect(0, 0, S, S); return c;
  };
  const SP = tones.map(t => ({ dot: sprite(t, 'dot'), bokeh: sprite(t, 'bokeh') }));
  // haces de luz desde arriba a la izquierda, como luz entrando en el agua
  const beams = [ { x: .16, w: .10, a: .16, sp: .07, ph: 0 }, { x: .34, w: .06, a: .11, sp: .05, ph: 2 }, { x: .58, w: .13, a: .08, sp: .04, ph: 4 } ];
  const tilt = .42; // inclinación de los haces
  const beamX = (b, y, t) => (b.x + .025 * Math.sin(t * b.sp * 6.283 + b.ph)) * W + y * tilt;
  const lightAt = (x, y, t) => {
    let l = 0;
    for (const b of beams) { const d = (x - beamX(b, y, t)) / (b.w * W); l += b.a * 5 * Math.exp(-d * d) * (1 - .55 * y / H); }
    const caus = .5 + .5 * Math.sin(x * .021 + t * .9) * Math.sin(y * .017 - t * .7 + Math.sin(x * .008 + t * .4));
    return Math.min(1.4, l * (.75 + .5 * caus) + .1 * caus);
  };
  // cinta de partículas tipo PS5: una banda ondulada que cruza la pantalla y cambia de grosor como si girara
  const band = (x, t) => H * (.56 + .12 * Math.sin(x / W * 4.4 + t * .045) + .045 * Math.sin(x / W * 10 - t * .07));
  const thick = (x, t) => H * (.035 + .06 * Math.abs(Math.sin(x / W * 2.6 + t * .03 + .8)));
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  const make = () => {
    const u = Math.random(), x = Math.random() * W;
    // 76 % polvo diminuto nítido · 17 % puntos pequeños suaves · 7 % bokeh grande desenfocado
    const z = u < .76 ? Math.random() * .3 : (u < .93 ? .3 + Math.random() * .25 : .6 + Math.random() * .4), soft = z > .55;
    const tone = Math.random() < .7 ? 0 : (Math.random() < .7 ? 1 : 2);
    const glit = !soft && Math.random() < .12 ? Array.from({ length: 1 + (Math.random() * 3 | 0) }, () => ({ dx: (Math.random() - .5) * 34, dy: (Math.random() - .5) * 34, ph: Math.random() * 6.283, f: 1.2 + Math.random() * 2.2, s: .7 + Math.random() * .8 })) : null;
    const off = gauss() * (soft ? 2.2 : 1);               // desplazamiento dentro de la cinta (el bokeh se sale más)
    return { x, off, y: band(x, 0) + off * thick(x, 0), z, tone, soft, glit,
             r: (soft ? 4 + z * 9 : .55 + z * 5) * (innerWidth < 760 ? .85 : 1),
             a: soft ? .1 + Math.random() * .13 : .35 + Math.random() * .55,
             ph: Math.random() * 6.283, sp: .4 + Math.random() * .9 };
  };
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts = Array.from({ length: innerWidth < 760 ? 150 : 340 }, make);
  };
  resize(); addEventListener('resize', resize);
  const drawBeams = t => {
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const b of beams) {
      const x0 = beamX(b, 0, t), x1 = beamX(b, H, t), w = b.w * W * 1.1;
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, `rgba(245,236,214,${b.a * .6})`); g.addColorStop(.65, `rgba(245,236,214,${b.a * .16})`); g.addColorStop(1, 'rgba(245,236,214,0)');
      ctx.fillStyle = g; ctx.filter = 'blur(28px)';
      ctx.beginPath(); ctx.moveTo(x0 - w * .4, 0); ctx.lineTo(x0 + w * .4, 0); ctx.lineTo(x1 + w, H); ctx.lineTo(x1 - w, H); ctx.closePath(); ctx.fill();
    }
    ctx.filter = 'none'; ctx.restore();
  };
  const glint = (x, y, s, a) => { // purpurina: punto con destello en cruz muy fino
    ctx.globalAlpha = a; ctx.fillStyle = '#fffaf0'; ctx.fillRect(x - .6 * s, y - .6 * s, 1.2 * s, 1.2 * s);
    if (a > .35) { ctx.globalAlpha = a * .55; ctx.fillRect(x - 3.5 * s, y - .25, 7 * s, .5); ctx.fillRect(x - .25, y - 3.5 * s, .5, 7 * s); }
  };
  const step = now => {
    const t = (now - t0) / 1000, dt = Math.min(.05, (now - last) / 1000 || .016); last = now;
    const ds = Math.max(-25, Math.min(25, scrollY - lastScroll)); lastScroll = scrollY;
    ctx.clearRect(0, 0, W, H); drawBeams(t); ctx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      if (!reduced) {
        // turbulencia bajo el agua: campo de senos + remolino lento
        const k = .4 + p.z * .95;
        const sw = Math.sin(t * .17 + p.ph) * 4;
        // flujo a lo largo de la cinta (de izquierda a derecha) + turbulencia suave
        const vx = 16 + 7 * Math.sin(p.y * .006 + t * .38 + p.ph) + 5 * Math.sin((p.x + p.y) * .003 - t * .24) + sw * Math.cos(p.y * .01 + t * .3);
        const target = band(p.x, t) + p.off * thick(p.x, t);
        const vy = 6 * Math.cos(p.x * .005 + t * .32 + p.ph) + 4 * Math.sin(p.x * .011 + t * .52) + sw * Math.sin(p.x * .009 - t * .27) + (target - p.y) * .35;
        p.x += vx * k * dt; p.y += vy * k * dt - ds * (.15 + p.z * .35);
        if (p.x > W + 40) p.x = -40; if (p.x < -40) p.x = W + 40;
        if (p.y > H + 60 || p.y < -60) { p.y = band(p.x, t) + p.off * thick(p.x, t); }
      }
      const L = lightAt(p.x, p.y, t);                         // la luz las ilumina al cruzar los haces
      const tw = p.z < .3 ? .45 + .55 * Math.pow(.5 + .5 * Math.sin(t * p.sp * 2.2 + p.ph), 3) : .72 + .28 * Math.sin(t * p.sp + p.ph);
      const s = p.r * 2 * (p.soft ? 1 : (.85 + .15 * tw)) * (1 + .12 * L);
      const tone = L > .7 && p.tone === 2 ? 1 : p.tone;      // en la luz el honey se aclara
      ctx.globalAlpha = Math.min(1, p.a * tw * (.32 + .95 * L));
      ctx.drawImage(SP[tone][p.soft ? 'bokeh' : 'dot'], p.x - s, p.y - s, s * 2, s * 2);
      if (p.glit) for (const g of p.glit) {
        const f = Math.pow(.5 + .5 * Math.sin(t * g.f + g.ph), 14);   // destello corto y esporádico
        const a = f * (.25 + .9 * L);
        if (a > .03) glint(p.x + g.dx, p.y + g.dy, g.s, Math.min(.95, a));
      }
    }
    ctx.globalAlpha = 1;
  };
  const loop = now => {
    const target = window.__b2b || 0; op += (target - op) * .12; cv.style.opacity = op.toFixed(3);
    if (op < .01 && target < .01) { running = false; ctx.clearRect(0, 0, W, H); return; }
    step(now); requestAnimationFrame(loop);
  };
  const kick = () => { if (!running && (window.__b2b || 0) > .01) { running = true; last = performance.now(); requestAnimationFrame(loop); } };
  addEventListener('scroll', kick, { passive: true }); setInterval(kick, 500);
})();
} catch (e) { /* bloque sin sus elementos en esta página */ }

try {
/* ---------- barra CTA móvil: aparece tras el hero, se oculta cerca de los formularios ---------- */
(function(){
  const bar = document.getElementById('mbar'), hero = document.querySelector('.hero');
  const forms = [...document.querySelectorAll('#updates, #custom, .footer')];
  let pastHero = false, nearForm = false;
  const upd = () => { const on = pastHero && !nearForm; bar.classList.toggle('show', on); bar.setAttribute('aria-hidden', !on); bar.querySelector('a').tabIndex = on ? 0 : -1; };
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; upd(); }).observe(hero);
  const vis = new Set();
  const io2 = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)); nearForm = vis.size > 0; upd(); }, { threshold: .05 });
  forms.forEach(f => io2.observe(f));
})();
} catch (e) { /* bloque sin sus elementos en esta página */ }

try {
/* ---------- visibilidad del formulario: enciende las chispas solo en "Start a project" ---------- */
(function(){
  const custom = document.getElementById('custom');
  const track = () => { const r = custom.getBoundingClientRect(); const vis = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / Math.min(innerHeight, r.height); window.__b2b = Math.min(1, Math.max(0, (vis - .15) / .6)); };
  addEventListener('scroll', track, { passive: true }); addEventListener('resize', track); track();
})();
} catch (e) { /* bloque sin sus elementos en esta página */ }