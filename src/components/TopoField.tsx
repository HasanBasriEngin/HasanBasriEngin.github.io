import { useEffect, useRef } from "react";

/**
 * Full-viewport topographic (contour-line) layer that stays hidden until the
 * pointer moves, then reveals only a soft circle around the cursor — a
 * "spotlight" over the pattern. Pointer position drives a radial-gradient
 * mask via CSS custom properties. Disabled on touch / no-hover devices.
 */
export function TopoField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--topo-x", `${x}px`);
      el.style.setProperty("--topo-y", `${y}px`);
      el.classList.add("is-active");
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => el.classList.remove("is-active");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="topo" aria-hidden="true" />;
}
