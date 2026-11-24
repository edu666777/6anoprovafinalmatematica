// Sólidos de Platão em 3D (Three.js)
import * as THREE from 'https://artifactcdn.diabrowser.engineering/ajax/libs/three.js/three.module.js';

const SOL = {
  tetra:  { n: 'Tetraedro regular', f: 'triângulos equiláteros', F: 4,  V: 4,  A: 6,  g: () => new THREE.TetrahedronGeometry(1.45) },
  cubo:   { n: 'Hexaedro regular (Cubo)', f: 'quadrados',        F: 6,  V: 8,  A: 12, g: () => new THREE.BoxGeometry(1.55, 1.55, 1.55) },
  octa:   { n: 'Octaedro regular', f: 'triângulos equiláteros',  F: 8,  V: 6,  A: 12, g: () => new THREE.OctahedronGeometry(1.45) },
  dodeca: { n: 'Dodecaedro regular', f: 'pentágonos regulares',  F: 12, V: 20, A: 30, g: () => new THREE.DodecahedronGeometry(1.35) },
  icosa:  { n: 'Icosaedro regular', f: 'triângulos equiláteros', F: 20, V: 12, A: 30, g: () => new THREE.IcosahedronGeometry(1.4) }
};

let renderer, scene, camera, group, host, ro, rx = 0.45, ry = 0.3, drag = null;

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 5.4);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xffe7a3, 1.6));
  const d = new THREE.DirectionalLight(0xffffff, 2.2); d.position.set(3, 4, 5); scene.add(d);
  const c = renderer.domElement;
  c.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY }; c.setPointerCapture(e.pointerId); });
  c.addEventListener('pointermove', e => { if (!drag) return; ry += (e.clientX - drag.x) * 0.012; rx += (e.clientY - drag.y) * 0.012; drag = { x: e.clientX, y: e.clientY }; });
  c.addEventListener('pointerup', () => drag = null);
  c.addEventListener('pointercancel', () => drag = null);
  (function loop() {
    requestAnimationFrame(loop);
    if (!group || !c.isConnected) return;
    if (!drag) ry += 0.006;
    group.rotation.set(rx, ry, 0);
    renderer.render(scene, camera);
  })();
}

function fit() {
  const st = host && host.querySelector('.stage'); if (!st) return;
  const w = st.clientWidth, h = st.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}

function show(key) {
  const s = SOL[key];
  if (group) { scene.remove(group); group.traverse(o => { o.geometry && o.geometry.dispose(); }); }
  group = new THREE.Group();
  const geo = s.g();
  group.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x5cc8c4, roughness: 0.45, metalness: 0.05, flatShading: true, transparent: true, opacity: 0.92 })));
  group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x1f2a44 })));
  // vértices em destaque
  const pos = geo.attributes.position, seen = new Set(), dotGeo = new THREE.SphereGeometry(0.075, 16, 12), dotMat = new THREE.MeshStandardMaterial({ color: 0xff6b4a });
  for (let i = 0; i < pos.count; i++) {
    const k = [pos.getX(i), pos.getY(i), pos.getZ(i)].map(v => v.toFixed(3)).join(',');
    if (seen.has(k)) continue; seen.add(k);
    const m = new THREE.Mesh(dotGeo, dotMat); m.position.set(pos.getX(i), pos.getY(i), pos.getZ(i)); group.add(m);
  }
  scene.add(group);
  host.querySelectorAll('[data-s]').forEach(b => b.classList.toggle('on', b.dataset.s === key));
  host.querySelector('.info').innerHTML = `<b>${s.n}</b> — faces: ${s.f}<div class="fva"><span>F = ${s.F}</span><span>V = ${s.V}</span><span>A = ${s.A}</span><span class="ok">${s.V} + ${s.F} = ${s.A} + 2 ✔</span></div>`;
}

function mount(el) {
  if (!renderer) init();
  host = el;
  const st = el.querySelector('.stage');
  st.innerHTML = ''; st.appendChild(renderer.domElement);
  if (ro) ro.disconnect();
  ro = new ResizeObserver(fit); ro.observe(st); fit();
  el.querySelectorAll('[data-s]').forEach(b => b.onclick = () => show(b.dataset.s));
  show('cubo');
}

window.mountSolidos = mount;
if (window.__pendingSolidos && window.__pendingSolidos.isConnected) mount(window.__pendingSolidos);
