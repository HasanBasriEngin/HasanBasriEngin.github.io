import { useEffect, useRef } from "react";

/**
 * Full-viewport topographic layer. It is masked away except for:
 *   - a soft circle that follows the pointer, and
 *   - a few patches that slowly fade in and out ("breathing") at random
 *     positions, so parts of the pattern keep lighting up even when the
 *     pointer is still.
 * Positions / strengths are pushed into CSS custom properties each frame.
 * Breathing is skipped when the user prefers reduced motion.
 */
const BLOBS = 3;

interface Blob {
  x: number;
  y: number;
  t: number;
  dur: number;
  delay: number;
}

export function TopoField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover && reduce) return; // nothing to animate

    let mx = -500;
    let my = -500;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    if (canHover) window.addEventListener("mousemove", onMove, { passive: true });

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const respawn = (b: Blob) => {
      b.x = rand(0.06, 0.94) * window.innerWidth;
      b.y = rand(0.06, 0.94) * window.innerHeight;
      b.t = 0;
      b.dur = rand(2800, 5600);
      b.delay = rand(200, 1800);
    };
    const blobs: Blob[] = [];
    if (!reduce) {
      for (let i = 0; i < BLOBS; i++) {
        const b: Blob = { x: 0, y: 0, t: 0, dur: 0, delay: 0 };
        respawn(b);
        b.delay = rand(0, 2600); // stagger the first cycle
        blobs.push(b);
      }
    }

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - last, 60);
      last = now;

      el.style.setProperty("--mx", `${mx}px`);
      el.style.setProperty("--my", `${my}px`);

      for (let i = 0; i < BLOBS; i++) {
        const b = blobs[i];
        if (!b) continue;
        if (b.delay > 0) {
          b.delay -= dt;
          el.style.setProperty(`--b${i}o`, "0");
          continue;
        }
        b.t += dt;
        if (b.t >= b.dur) respawn(b);
        const p = b.t / b.dur;
        const o = (0.5 - 0.5 * Math.cos(p * Math.PI * 2)) * 0.8; // 0 -> 1 -> 0
        el.style.setProperty(`--b${i}x`, `${b.x}px`);
        el.style.setProperty(`--b${i}y`, `${b.y}px`);
        el.style.setProperty(`--b${i}o`, o.toFixed(3));
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      if (canHover) window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="topo" aria-hidden="true" />;
}
