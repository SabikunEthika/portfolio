import { useEffect, useRef } from "react";

type Mote = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  phase: number;
  r: number;
};

type Card = {
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  vy: number;
  z: number;
};

const TAU = Math.PI * 2;

function ArchiveBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let motes: Mote[] = [];
    let cards: Card[] = [];
    let tx = -9999;
    let ty = -9999;
    let mx = -9999;
    let my = -9999;
    let raf = 0;
    let last = performance.now();
    let time = 0;

    const seed = () => {
      const moteCount = Math.round(
        Math.min(110, Math.max(40, (w * h) / 18000))
      );

      motes = Array.from({ length: moteCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.2 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * 6,
        vy: -(2 + Math.random() * 7),
        phase: Math.random() * TAU,
        r: 0.8 + Math.random() * 1.8,
      }));

      const cardCount = w < 700 ? 3 : 7;

      cards = Array.from({ length: cardCount }, () => {
        const cw = 100 + Math.random() * 50;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          w: cw,
          h: cw * 0.6,
          rot: (Math.random() - 0.5) * 1.0,
          vr: (Math.random() - 0.5) * 0.04,
          vy: -(4 + Math.random() * 6),
          z: 0.4 + Math.random() * 0.6,
        };
      });
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduce) frame(0);
    };

    // Warp helper: pushes grid points away from the cursor
    let wx = 0;
    let wy = 0;
    const R = 170;
    const PUSH = 34;
    const inv = 1 / (2 * R * R);

    const warp = (x: number, y: number) => {
      const dx = x - mx;
      const dy = y - my;
      const d2 = dx * dx + dy * dy;

      if (d2 > R * R * 9) {
        wx = x;
        wy = y;
        return;
      }

      const d = Math.sqrt(d2) + 0.001;
      const f = Math.exp(-d2 * inv) * PUSH;
      wx = x + (dx / d) * f;
      wy = y + (dy / d) * f;
    };

    function frame(dt: number) {
      time += dt;

      const k = 1 - Math.exp(-6 * dt);
      if (mx < -9000) {
        mx = tx;
        my = ty;
      } else {
        mx += (tx - mx) * k;
        my += (ty - my) * k;
      }

      const px = mx < -9000 ? 0 : mx / w - 0.5;
      const py = my < -9000 ? 0 : my / h - 0.5;
      const scroll = window.scrollY;

      ctx!.clearRect(0, 0, w, h);

      /* ---------- 1. Astrolabe rings ---------- */
      const base = Math.min(w, h) * 0.34;
      const cx = w * 0.76 - px * 40;
      const cy = h * 0.45 - py * 40;
      const rot = time * 0.03 + scroll * 0.0006;

      const circle = (r: number) => {
        ctx!.beginPath();
        ctx!.arc(0, 0, r, 0, TAU);
        ctx!.stroke();
      };

      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = "rgba(208, 161, 109, 0.13)";

      // Outer ring with tick marks
      ctx!.save();
      ctx!.rotate(rot);
      circle(base);
      circle(base - 18);
      ctx!.beginPath();
      for (let i = 0; i < 72; i++) {
        const a = (i / 72) * TAU;
        const len = i % 6 === 0 ? 14 : 7;
        ctx!.moveTo(Math.cos(a) * base, Math.sin(a) * base);
        ctx!.lineTo(Math.cos(a) * (base - len), Math.sin(a) * (base - len));
      }
      ctx!.stroke();
      ctx!.restore();

      // Middle dashed ring (turns the other way)
      ctx!.save();
      ctx!.rotate(-rot * 1.6);
      ctx!.setLineDash([2, 10]);
      circle(base * 0.8);
      ctx!.setLineDash([]);
      circle(base * 0.72);
      ctx!.restore();

      // Compass star
      ctx!.save();
      ctx!.rotate(rot * 0.5);
      ctx!.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * TAU;
        const len = i % 2 === 0 ? base * 0.62 : base * 0.4;
        ctx!.moveTo(0, 0);
        ctx!.lineTo(Math.cos(a) * len, Math.sin(a) * len);
      }
      ctx!.stroke();
      circle(base * 0.12);
      circle(base * 0.4);
      ctx!.restore();

      ctx!.restore();

      /* ---------- 2. Catalog grid ---------- */
      const G = 72;
      const SEG = 18;
      const oy = -((scroll * 0.2) % G);

      ctx!.lineWidth = 1;
      ctx!.strokeStyle = "rgba(208, 161, 109, 0.07)";

      for (let x = 0; x <= w + G; x += G) {
        ctx!.beginPath();
        for (let y = -SEG; y <= h + SEG; y += SEG) {
          warp(x, y);
          if (y === -SEG) ctx!.moveTo(wx, wy);
          else ctx!.lineTo(wx, wy);
        }
        ctx!.stroke();
      }

      for (let y = oy; y <= h + G; y += G) {
        ctx!.beginPath();
        for (let x = -SEG; x <= w + SEG; x += SEG) {
          warp(x, y);
          if (x === -SEG) ctx!.moveTo(wx, wy);
          else ctx!.lineTo(wx, wy);
        }
        ctx!.stroke();
      }

      /* ---------- 3. Floating index cards ---------- */
      for (const c of cards) {
        c.y += c.vy * dt;
        c.rot += c.vr * dt;

        if (c.y < -80) {
          c.y = h + 80;
          c.x = Math.random() * w;
        }

        const x = c.x - px * 60 * c.z;
        const y = c.y - py * 40 * c.z;
        const cw = c.w * c.z;
        const ch = c.h * c.z;

        ctx!.save();
        ctx!.translate(x, y);
        ctx!.rotate(c.rot + px * 0.15 * c.z);

        ctx!.fillStyle = "rgba(233, 217, 196, 0.03)";
        ctx!.strokeStyle = "rgba(208, 161, 109, 0.15)";
        ctx!.lineWidth = 1;
        ctx!.fillRect(-cw / 2, -ch / 2, cw, ch);
        ctx!.strokeRect(-cw / 2, -ch / 2, cw, ch);

        // red header line
        ctx!.strokeStyle = "rgba(129, 67, 74, 0.35)";
        ctx!.beginPath();
        ctx!.moveTo(-cw / 2, -ch / 2 + ch * 0.28);
        ctx!.lineTo(cw / 2, -ch / 2 + ch * 0.28);
        ctx!.stroke();

        // ruled lines
        ctx!.strokeStyle = "rgba(208, 161, 109, 0.09)";
        for (const f of [0.5, 0.68, 0.86]) {
          ctx!.beginPath();
          ctx!.moveTo(-cw / 2 + 6, -ch / 2 + ch * f);
          ctx!.lineTo(cw / 2 - 6, -ch / 2 + ch * f);
          ctx!.stroke();
        }

        // punch hole
        ctx!.beginPath();
        ctx!.arc(0, ch / 2 - ch * 0.08, 2.2 * c.z + 0.6, 0, TAU);
        ctx!.stroke();

        ctx!.restore();
      }

      /* ---------- 4. Dust motes ---------- */
      for (const m of motes) {
        m.x += m.vx * dt * m.z;
        m.y += m.vy * dt * m.z;

        const dx = m.x - mx;
        const dy = m.y - my;
        const d2 = dx * dx + dy * dy;

        if (d2 < 150 * 150 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const push = (150 - d) * 3 * dt;
          m.x += (dx / d) * push;
          m.y += (dy / d) * push;
        }

        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        if (m.x < -10) m.x = w + 10;
        if (m.x > w + 10) m.x = -10;

        const a =
          0.12 + 0.4 * m.z * (0.5 + 0.5 * Math.sin(time * 1.2 + m.phase));

        ctx!.fillStyle = `rgba(244, 216, 160, ${a})`;
        ctx!.beginPath();
        ctx!.arc(
          m.x - px * 30 * m.z,
          m.y - py * 20 * m.z,
          m.r * m.z + 0.4,
          0,
          TAU
        );
        ctx!.fill();
      }
    }

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      frame(dt);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    resize();
    if (!reduce) raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="archive-bg" aria-hidden="true" />;
}

export default ArchiveBackground;