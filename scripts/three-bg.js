(() => {
  if (typeof THREE === 'undefined') return;
  const canvas = document.getElementById('three-bg');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // ---- Particle field (звёзды — остаются на всех секциях)
  const particleCount = 900;
  const positions = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - .5) * 180;
    positions[i * 3 + 1] = (Math.random() - .5) * 120;
    positions[i * 3 + 2] = (Math.random() - .5) * 120;
    speeds[i] = 0.02 + Math.random() * 0.06;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const pMat = new THREE.PointsMaterial({
    color: 0x4169E1,
    size: 0.55,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // ---- Wireframe grid (эпичный "пол" — только на hero)
  const gridSize = 140, gridDiv = 40;
  const grid = new THREE.GridHelper(gridSize, gridDiv, 0x4169E1, 0x1a1a3a);
  grid.material.transparent = true;
  grid.material.opacity = 0.18;
  grid.position.y = -30;
  scene.add(grid);

  // ---- Torus knot (эпичная "tech" фигура — только на hero)
  const knotGeo = new THREE.TorusKnotGeometry(6, 1.6, 140, 16);
  const knotMat = new THREE.MeshBasicMaterial({
    color: 0x4169E1,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const knot = new THREE.Mesh(knotGeo, knotMat);
  knot.position.set(22, 6, -10);
  scene.add(knot);

  // ---- Mouse parallax
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - .5) * 2;
    mouseY = (e.clientY / window.innerHeight - .5) * 2;
  });

  // ---- Resize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  // ---- Scroll-based fade (эпичные элементы уходят после первого экрана)
  const BASE_PARTICLE_OPACITY = 0.8;
  const BASE_KNOT_OPACITY = 0.35;
  const BASE_GRID_OPACITY = 0.18;

  const updateScrollFade = () => {
    const sy = window.scrollY;
    const vh = window.innerHeight;
    // 0 → вершина (hero), 1 → проскроллили целый экран и дальше
    const t = Math.min(1, sy / (vh * 0.8));

    // Эпичные элементы быстро уходят
    knot.material.opacity = BASE_KNOT_OPACITY * (1 - t);
    grid.material.opacity = BASE_GRID_OPACITY * (1 - t);

    // Звёзды немного тускнеют, но остаются заметными
    pMat.opacity = BASE_PARTICLE_OPACITY * (1 - t * 0.55);
  };
  window.addEventListener('scroll', updateScrollFade, { passive: true });
  updateScrollFade();

  // ---- Animate
  const clock = new THREE.Clock();
  let running = true;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) clock.start(); });

  const animate = () => {
    requestAnimationFrame(animate);
    if (!running) return;
    const t = clock.getElapsedTime();

    const pos = pGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 1] += speeds[i];
      if (pos[i * 3 + 1] > 60) pos[i * 3 + 1] = -60;
    }
    pGeo.attributes.position.needsUpdate = true;

    points.rotation.y = t * 0.02;
    knot.rotation.x = t * 0.25;
    knot.rotation.y = t * 0.3;

    camera.position.x += (mouseX * 6 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };
  animate();
})();
