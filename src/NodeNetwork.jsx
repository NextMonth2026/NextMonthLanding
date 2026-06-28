import { useEffect, useRef } from 'react';

export default function NodeNetwork() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [];
    let links = [];
    let pulses = [];
    let center = { x: 0, y: 0 };
    let spawnTimer = 0;
    let igniteTimer = 0;
    let t0 = performance.now();
    const SIGNAL = [43, 200, 244];
    const VIOLET = [238, 40, 184];
    const rand = (a, b) => a + Math.random() * (b - a);
    const lerp = (c1, c2, m) => [
      Math.round(c1[0] + (c2[0] - c1[0]) * m),
      Math.round(c1[1] + (c2[1] - c1[1]) * m),
      Math.round(c1[2] + (c2[2] - c1[2]) * m),
    ];

    function makeNode(isCenter) {
      if (isCenter) return { x: center.x, y: center.y, baseR: 7, center: true, glow: 1, a: 1 };
      const ang = rand(0, Math.PI * 2);
      const dist = rand(70, Math.min(w, h) * 0.46);
      return { x: center.x + Math.cos(ang) * dist, y: center.y + Math.sin(ang) * dist, baseR: rand(1.4, 3.2), center: false, glow: 0, a: 0, drift: rand(0.0002, 0.0008), ph: rand(0, Math.PI * 2), ang, dist };
    }
    function connectNearest(node) {
      let target = null;
      if (Math.random() < 0.35) target = nodes[0];
      else {
        let best = Infinity;
        for (const n of nodes) {
          if (n === node) continue;
          const d = (n.x - node.x) ** 2 + (n.y - node.y) ** 2;
          if (d < best) { best = d; target = n; }
        }
      }
      if (target) links.push({ a: node, b: target, born: performance.now(), strength: 0 });
    }
    function seed() {
      nodes = [makeNode(true)];
      links = [];
      pulses = [];
      const initial = w < 640 ? 14 : 26;
      for (let i = 0; i < initial; i += 1) {
        const n = makeNode();
        n.a = 1;
        nodes.push(n);
        connectNearest(n);
      }
    }
    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      center = { x: w * 0.5, y: h * 0.62 };
      seed();
    }
    function ignite() {
      if (nodes.length < 3) return;
      const node = nodes[1 + Math.floor(Math.random() * (nodes.length - 1))];
      node.glow = 1.6;
      let target = null;
      let best = Infinity;
      for (const n of nodes) {
        if (n === node) continue;
        const d = (n.x - node.x) ** 2 + (n.y - node.y) ** 2;
        if (d < best && d > 1600) { best = d; target = n; }
      }
      if (target) {
        links.push({ a: node, b: target, born: performance.now(), strength: 0, hot: true });
        pulses.push({ a: node, b: target, p: 0 });
      }
    }
    function frame(now) {
      const dt = Math.min(now - t0, 50);
      t0 = now;
      ctx.clearRect(0, 0, w, h);
      if (!reduced) {
        spawnTimer += dt;
        if (spawnTimer > 900 && nodes.length < (w < 640 ? 34 : 64)) { spawnTimer = 0; const n = makeNode(); nodes.push(n); connectNearest(n); }
        igniteTimer += dt;
        if (igniteTimer > 2600) { igniteTimer = 0; ignite(); }
      }
      for (const l of links) {
        l.strength = Math.min(1, l.strength + dt * 0.0015);
        const col = l.hot ? lerp(SIGNAL, VIOLET, 0.4) : SIGNAL;
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${(l.hot ? 0.4 : 0.1) * l.strength * Math.min(l.a.a, l.b.a)})`;
        ctx.lineWidth = l.hot ? 1.1 : 0.6;
        ctx.beginPath(); ctx.moveTo(l.a.x, l.a.y); ctx.lineTo(l.b.x, l.b.y); ctx.stroke();
        if (l.hot && now - l.born > 5000) l.hot = false;
      }
      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const p = pulses[i];
        p.p += dt * 0.0009;
        if (p.p >= 1) { p.b.glow = Math.max(p.b.glow, 1.4); pulses.splice(i, 1); continue; }
        const px = p.a.x + (p.b.x - p.a.x) * p.p;
        const py = p.a.y + (p.b.y - p.a.y) * p.p;
        const col = lerp(SIGNAL, VIOLET, p.p);
        const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
        g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},0.9)`);
        g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
      }
      for (const n of nodes) {
        n.a = Math.min(1, n.a + dt * 0.0016);
        if (!n.center && !reduced) { n.ang += n.drift * dt; const breath = Math.sin(now * 0.001 + n.ph) * 4; n.x = center.x + Math.cos(n.ang) * (n.dist + breath); n.y = center.y + Math.sin(n.ang) * (n.dist + breath); }
        n.glow = Math.max(0, n.glow - dt * 0.0012);
        const pulse = n.center ? 0.5 + 0.5 * Math.sin(now * 0.0022) : 0;
        const radius = n.center ? n.baseR + pulse * 2 : n.baseR + n.glow * 2;
        const col = n.center ? lerp(SIGNAL, VIOLET, 0.25) : lerp(SIGNAL, VIOLET, n.glow * 0.5);
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * (n.center ? 9 : 6) * (1 + n.glow * 0.6));
        halo.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${(n.center ? 0.3 : 0.12 + n.glow * 0.4) * n.a})`);
        halo.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(n.x, n.y, radius * 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = n.center ? `rgba(220,250,255,${0.9 * n.a})` : `rgba(${200 + n.glow * 30},235,255,${(0.4 + n.glow * 0.45) * n.a})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, radius, 0, Math.PI * 2); ctx.fill();
      }
      rafRef.current = requestAnimationFrame(frame);
    }
    resize();
    if (reduced) frame(performance.now());
    else rafRef.current = requestAnimationFrame(frame);
    let resizeT;
    const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(resize, 150); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', onResize); clearTimeout(resizeT); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }} />;
}
