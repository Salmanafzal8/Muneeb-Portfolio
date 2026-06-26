import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom dual-ring cursor. Grows on interactive elements and hides on
 * touch devices. Native cursor is hidden via CSS for fine pointers.
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, [data-cursor="hover"]'
      );
      setHovering(Boolean(interactive));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-[var(--color-accent)]"
        style={{ x, y, width: 7, height: 7, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-[var(--color-accent)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: visible ? (hovering ? 1 : 0.5) : 0,
          backgroundColor: hovering
            ? "color-mix(in srgb, var(--color-accent) 12%, transparent)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
      />
    </div>
  );
}
