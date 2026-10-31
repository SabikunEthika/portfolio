import { useEffect, useRef } from "react";

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rot: number;
    vr: number;
    size: number;
    life: number;
    max: number;
    kind: "scrap" | "ink";
    color: string;
};

type Ripple = { x: number; y: number; life: number };

const COLORS = ["#E9D9C4", "#D0A16D", "#B47750", "#81434A", "#D4BE9D"];

function CustomCursor() {
    const dot = useRef<HTMLDivElement>(null);
    const ring = useRef<HTMLDivElement>(null);
    const glow = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Skip on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const c = canvas.current;
        const ctx = c?.getContext("2d");
        if (!c || !ctx) return;

        document.documentElement.classList.add("has-custom-cursor");

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const resize = () => {
            c.width = window.innerWidth * dpr;
            c.height = window.innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        let mx = -300, my = -300;
        let rx = mx, ry = my;
        let gx = mx, gy = my;
        let first = true;
        let raf = 0;
        let last = performance.now();

        const particles: Particle[] = [];
        const ripples: Ripple[] = [];

        const burst = (x: number, y: number) => {
            ripples.push({ x, y, life: 0 });

            // a few tiny paper flecks
            for (let i = 0; i < 6; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 40 + Math.random() * 90;
                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 25,
                    rot: Math.random() * Math.PI * 2,
                    vr: (Math.random() - 0.5) * 8,
                    size: 2.5 + Math.random() * 2.5,
                    life: 0,
                    max: 0.35 + Math.random() * 0.25,
                    kind: "scrap",
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                });
            }

            // a few tiny ink specks
            for (let i = 0; i < 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 30 + Math.random() * 70;
                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    rot: 0,
                    vr: 0,
                    size: 0.8 + Math.random() * 1.2,
                    life: 0,
                    max: 0.3 + Math.random() * 0.25,
                    kind: "ink",
                    color: Math.random() > 0.5 ? "#D0A16D" : "#E9D9C4",
                });
            }
        };

        const onMove = (e: PointerEvent) => {
            mx = e.clientX;
            my = e.clientY;

            if (first) {
                rx = gx = mx;
                ry = gy = my;
                first = false;
            }

            const target = e.target as HTMLElement | null;
            const hovering = !!target?.closest("a, button, [role='button']");
            ring.current?.classList.toggle("is-hover", hovering);
        };

        const onDown = (e: PointerEvent) => {
            burst(e.clientX, e.clientY);
            ring.current?.classList.add("is-pressed");
        };

        const onUp = () => ring.current?.classList.remove("is-pressed");

        const tick = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;

            // Smooth following (frame-rate independent)
            const kRing = 1 - Math.exp(-16 * dt);
            const kGlow = 1 - Math.exp(-5 * dt);
            rx += (mx - rx) * kRing;
            ry += (my - ry) * kRing;
            gx += (mx - gx) * kGlow;
            gy += (my - gy) * kGlow;

            if (dot.current)
                dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
            if (ring.current)
                ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
            if (glow.current)
                glow.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;

            // Draw click effects
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.life += dt;
                const t = r.life / 0.4;
                if (t >= 1) {
                    ripples.splice(i, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.arc(r.x, r.y, 4 + t * 20, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(208, 161, 109, ${0.45 * (1 - t)})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life += dt;
                if (p.life >= p.max) {
                    particles.splice(i, 1);
                    continue;
                }
                p.vy += 260 * dt; // gravity
                p.vx *= 1 - 1.6 * dt; // air drag
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.rot += p.vr * dt;

                const alpha = 1 - p.life / p.max;
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.fillStyle = p.color;
                ctx.translate(p.x, p.y);

                if (p.kind === "scrap") {
                    ctx.rotate(p.rot);
                    ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerdown", onDown);
        window.addEventListener("pointerup", onUp);
        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("resize", resize);
            document.documentElement.classList.remove("has-custom-cursor");
        };
    }, []);

    return (
        <>
            <div ref={glow} className="cursor-glow" aria-hidden="true" />
            <canvas ref={canvas} className="cursor-canvas" aria-hidden="true" />
            <div ref={ring} className="cursor-ring" aria-hidden="true" />
            <div ref={dot} className="cursor-dot" aria-hidden="true" />
        </>
    );
}

export default CustomCursor;