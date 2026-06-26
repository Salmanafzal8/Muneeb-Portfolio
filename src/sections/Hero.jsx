import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import MagneticButton from "../components/ui/MagneticButton";
import { scrollToId } from "../hooks/useLenis";
import { SITE } from "../constants/site";
import { EASE } from "../animations/variants";

const TITLE_LINES = [
  ["Marketing", "brain,"],
  ["camera", "in", "hand."],
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Mouse-reactive glow + portrait tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mx, [0, 1], ["20%", "80%"]), {
    stiffness: 60,
    damping: 20,
  });
  const glowY = useSpring(useTransform(my, [0, 1], ["10%", "70%"]), {
    stiffness: 60,
    damping: 20,
  });
  const tiltX = useSpring(useTransform(my, [0, 1], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const tiltY = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
    stiffness: 120,
    damping: 18,
  });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      id="home"
      onPointerMove={onMove}
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-20"
    >
      {/* Mouse-reactive radial glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(600px circle at ${gx} ${gy}, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 70%)`
          ),
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div style={{ y: yText, opacity, scale }} className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="flex w-fit items-center gap-2 rounded-full border border-line glass px-3.5 py-1.5 text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            </span>
            Open to opportunities · {SITE.location}
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.95]">
            {TITLE_LINES.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span className="flex flex-wrap gap-x-[0.25em]">
                  {line.map((word) => {
                    const i = wordIndex++;
                    const isAccent = word === "camera" || word === "Marketing";
                    return (
                      <motion.span
                        key={word + i}
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 1,
                          ease: EASE,
                          delay: 0.4 + i * 0.08,
                        }}
                        className={isAccent ? "inline-block text-gradient" : "inline-block"}
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
            className="max-w-xl text-lg leading-relaxed text-muted"
          >
            Hey, I'm{" "}
            <span className="font-medium text-[var(--fg)]">Muneeb</span> — a
            Berlin-based business student building content that grabs attention
            and selling ideas, products, and startups to the right people.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              as="a"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              className="group items-center gap-2 rounded-full bg-[var(--fg)] px-6 py-3.5 text-sm font-medium text-[var(--bg)] transition-shadow hover:shadow-glow"
            >
              Let's work together
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("experience");
              }}
              strength={0.2}
              className="items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-[var(--fg)] transition-colors hover:bg-[var(--card)]"
            >
              View my journey
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line glass shadow-card">
            {/* Fallback placeholder sits behind the photo */}
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[var(--color-accent)]/15 via-transparent to-[var(--color-accent-2)]/15">
              <span className="font-display text-[7rem] font-semibold text-[var(--fg)]/15">
                M
              </span>
            </div>
            {/* Drop a real photo at /public/muneeb.jpg to replace the placeholder */}
            <img
              src="/muneeb.jpg"
              alt="Portrait of Muneeb"
              loading="eager"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass border border-line px-4 py-3 text-xs">
              <span className="flex items-center gap-1.5 text-muted">
                <MapPin size={13} /> Berlin
              </span>
              <span className="font-medium">European Business Mgmt</span>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-5 -top-5 rounded-2xl glass border border-line px-4 py-3 shadow-card"
          >
            <p className="font-display text-2xl font-semibold">3+ yrs</p>
            <p className="text-[11px] text-muted">hands-on work</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToId("about")}
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted md:flex"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownRight size={15} />
        </motion.span>
      </motion.button>
    </section>
  );
}
