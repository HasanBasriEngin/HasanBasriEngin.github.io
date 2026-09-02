import { useEffect, useRef } from "react";

/**
 * Full-viewport topographic layer. It is masked away except for:
 *   - a soft circle that follows the pointer, and
 *   - one wide, amorphous region that slowly fades in and out ("breathing")
 *     and jumps to a new random spot each cycle.
 * The region is 5 overlapping sub-circles that share one opacity, so its
 * outline is lumpy — never a clean circle or a box. Positions / strength are
 * pushed into CSS custom properties each frame. Breathing is skipped when the
 * user prefers reduced motion.
 */

// relative sub-circle centres (px) — define the region's amorphous shape.
// CSS gives each of these its own radius; JS only moves them.
const SHAPE: Array<[number, number]> = [
  [0, 0],
  [140, -70],
  [-120, 80],
  [70, 130],
  [-135, -75],
];

export function TopoField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover && reduce) return;

    let mx = -800;
    let my = -800;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    if (canHover) window.addEventListener("mousemove", onMove, { passive: true });

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // one breathing region
    const region = {
      x: 0,
      y: 0,
      t: 0,
      dur: 0,
      delay: 0,
      jitter: SHAPE.map(() => [0, 0] as [number, number]),
    };
    const respawn = () => {
      region.x = rand(0.12, 0.88) * window.innerWidth;
      region.y = rand(0.12, 0.88) * window.innerHeight;
      region.t = 0;
      region.dur = rand(9000, 15000);
      region.delay = rand(900, 2600);
      region.jitter = SHAPE.map(() => [rand(-55, 55), rand(-55, 55)]);
    };
    const active = !reduce;
    if (active) {
      respawn();
      region.delay = rand(0, 1500);
    }

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - last, 60);
      last = now;

      el.style.setProperty("--mx", `${mx}px`);
      el.style.setProperty("--my", `${my}px`);

      if (active) {
        if (region.delay > 0) {
          region.delay -= dt;
          el.style.setProperty("--regO", "0");
        } else {
          region.t += dt;
          if (region.t >= region.dur) respawn();
          const p = region.t / region.dur;
          const o = (0.5 - 0.5 * Math.cos(p * Math.PI * 2)) * 0.9; // 0 -> 1 -> 0
          el.style.setProperty("--regO", o.toFixed(3));
          for (let k = 0; k < SHAPE.length; k++) {
            const rx = region.x + SHAPE[k][0] + region.jitter[k][0];
            const ry = region.y + SHAPE[k][1] + region.jitter[k][1];
            el.style.setProperty(`--r${k}x`, `${rx.toFixed(1)}px`);
            el.style.setProperty(`--r${k}y`, `${ry.toFixed(1)}px`);
          }
        }
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
