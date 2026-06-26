import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import { LANGUAGES } from "../data/languages";
import { EASE, staggerContainer, fadeUp } from "../animations/variants";

function LanguageCard({ lang }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-[var(--card)] p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>
            {lang.flag}
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold">{lang.name}</h3>
            <p className="text-sm text-muted">{lang.level}</p>
          </div>
        </div>
        <span className="font-display text-sm font-medium text-[var(--color-accent)]">
          {lang.value}%
        </span>
      </div>

      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg)]">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: lang.value / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="h-full origin-left rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
        />
      </div>
    </motion.div>
  );
}

export default function Languages() {
  return (
    <section
      id="languages"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36"
    >
      <SectionHeading
        eyebrow="Languages"
        title="Speaking the world's languages."
        description="Comfortable across cultures and currently adding German to the mix."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {LANGUAGES.map((lang) => (
          <LanguageCard key={lang.name} lang={lang} />
        ))}
      </motion.div>
    </section>
  );
}
