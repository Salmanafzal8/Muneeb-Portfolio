import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "../constants/site";

/**
 * Animated page loader. Counts up to 100, then curtain-wipes away.
 * Calls onDone once it leaves so the page can run entrance animations.
 */
export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1500;

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--bg)]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
              {SITE.name}
              <span className="text-[var(--color-accent)]">.</span>
            </span>
            <div className="h-px w-44 overflow-hidden bg-[var(--line)]">
              <motion.div
                className="h-full bg-[var(--color-accent)]"
                style={{ width: `${count}%` }}
              />
            </div>
          </motion.div>

          <span className="absolute bottom-10 right-8 font-display text-6xl font-medium tabular-nums text-muted md:text-8xl">
            {count}
            <span className="text-2xl align-super md:text-3xl">%</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
