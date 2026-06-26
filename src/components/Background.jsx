import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Ambient background: animated gradient blobs (GPU-accelerated), a faint
 * grid, floating particles, and a fixed noise texture overlay.
 */
export default function Background() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  const particles = Array.from({ length: 14 });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      {/* Blobs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full opacity-50 blur-[120px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, var(--color-accent), transparent 60%)",
            animation: "float-blob 18s ease-in-out infinite",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full opacity-40 blur-[130px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 40%, var(--color-accent-2), transparent 60%)",
            animation: "float-blob 22s ease-in-out infinite reverse",
          }}
        />
      </motion.div>

      <div
        className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-3), transparent 60%)",
          animation: "float-blob 26s ease-in-out infinite",
        }}
      />

      {/* Floating particles */}
      {particles.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37 + 8) % 100;
        const dur = 8 + (i % 6);
        const size = 2 + (i % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[var(--fg)]/30"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ y: [0, -24, 0], opacity: [0, 0.6, 0] }}
            transition={{
              duration: dur,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        );
      })}

      <div className="noise" />
    </div>
  );
}
