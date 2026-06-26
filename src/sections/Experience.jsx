import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import { EXPERIENCE } from "../data/experience";
import { EASE } from "../animations/variants";

function TimelineItem({ item }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative pl-12 md:pl-20"
    >
      {/* Node */}
      <span className="absolute left-[14px] top-2 z-10 grid h-3.5 w-3.5 -translate-x-1/2 place-items-center md:left-[22px]">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="h-3.5 w-3.5 rounded-full border-2 border-[var(--color-accent)] bg-[var(--bg)]"
        />
        {item.current && (
          <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
        )}
      </span>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
        whileHover={{ y: -4 }}
        className="group mb-10 rounded-3xl border border-line bg-[var(--card)] p-6 transition-colors hover:border-[var(--color-accent)]/40 md:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold md:text-2xl">
              {item.role}
            </h3>
            <p className="mt-1 text-[var(--color-accent)]">{item.company}</p>
            <p className="text-sm text-muted">{item.location}</p>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted">
            {item.current && (
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            )}
            {item.period}
          </span>
        </div>

        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {item.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {item.points.map((point) => (
            <li
              key={point}
              className="rounded-full border border-line bg-[var(--bg)] px-3 py-1.5 text-xs text-muted transition-colors group-hover:border-[var(--line)]"
            >
              {point}
            </li>
          ))}
        </ul>
      </motion.article>
    </motion.div>
  );
}

export default function Experience() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.6", "end 0.5"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-5xl scroll-mt-24 px-6 py-28 md:py-36"
    >
      <SectionHeading
        eyebrow="Experience"
        title="The journey so far."
        description="From recruiting in Pakistan to business IT at Roche and front-desk ops in Germany — here's where I've been building."
      />

      <div ref={lineRef} className="relative mt-16">
        {/* Track */}
        <div className="absolute left-[14px] top-0 h-full w-px bg-[var(--line)] md:left-[22px]" />
        {/* Progress fill */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-[14px] top-0 h-full w-px origin-top bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent-3)] md:left-[22px]"
        />

        {EXPERIENCE.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
