import { Camera, Rocket, Sparkles } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../animations/variants";

const TRAITS = [
  {
    icon: Camera,
    title: "Content that grabs attention",
    body: "Shooting video, telling stories, and building brands people actually stop to watch.",
  },
  {
    icon: Rocket,
    title: "Selling ideas & startups",
    body: "Figuring out how to position products and pitch them to exactly the right people.",
  },
  {
    icon: Sparkles,
    title: "Let's-make-it-happen energy",
    body: "I bring curiosity and momentum to every shoot, pitch, and deal I'm part of.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
      <SectionHeading
        eyebrow="About me"
        title="A camera in one hand, a marketing brain in the other."
      />

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Reveal as="div" className="space-y-6 text-lg leading-relaxed text-muted">
          <p>
            I'm studying{" "}
            <span className="font-medium text-[var(--fg)]">
              European Business Management
            </span>
            , majoring in Digital Marketing — but honestly, what gets me excited
            is <span className="font-medium text-[var(--fg)]">building things</span>
            : creating content that grabs attention and figuring out how to sell
            ideas, products, and startups to the right people.
          </p>
          <p>
            I love the hustle of business just as much as I love the creativity
            of content. Whether it's shooting a video, pitching an idea, or
            closing a deal, I bring energy, curiosity, and a{" "}
            <span className="text-gradient font-medium">
              "let's make it happen"
            </span>{" "}
            attitude.
          </p>
          <p className="text-[var(--fg)]">Always learning. Always building.</p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          {TRAITS.map((t) => (
            <motion.div
              key={t.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group flex gap-4 rounded-2xl border border-line bg-[var(--card)] p-5 transition-colors hover:border-[var(--color-accent)]/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] transition-transform group-hover:scale-110">
                <t.icon size={20} />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{t.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
