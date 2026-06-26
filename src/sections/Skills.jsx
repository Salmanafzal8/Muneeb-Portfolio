import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Clapperboard,
  Target,
  TrendingUp,
  Sparkles,
  HandCoins,
  Camera,
  Video,
  Table2,
  Workflow,
  Hotel,
  MonitorCog,
  UsersRound,
  MessagesSquare,
  Headset,
  Lightbulb,
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import { SKILLS, SKILL_CATEGORIES } from "../data/skills";
import { cn } from "../utils/cn";

const ICONS = {
  Megaphone,
  Clapperboard,
  Target,
  TrendingUp,
  Sparkles,
  HandCoins,
  Camera,
  Video,
  Table2,
  Workflow,
  Hotel,
  MonitorCog,
  UsersRound,
  MessagesSquare,
  Headset,
  Lightbulb,
};

function SkillCard({ skill, index }) {
  const Icon = ICONS[skill.icon] ?? Sparkles;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-[var(--card)] p-5"
    >
      {/* Hover spotlight */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent" />
      </div>

      <div className="relative flex flex-col gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--bg)] text-[var(--color-accent)] ring-1 ring-[var(--line)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:text-white">
          <Icon size={22} />
        </span>
        <div>
          <h3 className="font-display text-base font-semibold leading-tight">
            {skill.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted">
            {skill.category}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? SKILLS : SKILLS.filter((s) => s.category === filter);

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36"
    >
      <SectionHeading
        eyebrow="Skills"
        title="What I bring to the table."
        description="A blend of marketing creativity, business operations, and the tools that keep it all running."
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              filter === cat
                ? "border-transparent bg-[var(--fg)] text-[var(--bg)]"
                : "border-line text-muted hover:text-[var(--fg)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
