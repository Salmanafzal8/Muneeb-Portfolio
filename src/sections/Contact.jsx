import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Check, Copy, ArrowUpRight } from "lucide-react";
import TextReveal from "../components/ui/TextReveal";
import Reveal from "../components/ui/Reveal";
import MagneticButton from "../components/ui/MagneticButton";
import { SITE } from "../constants/site";
import { staggerContainer, fadeUp } from "../animations/variants";

function ContactCard({ icon: Icon, label, value, copyValue, href }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.a
      variants={fadeUp}
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      whileHover={{ y: -5 }}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-line bg-[var(--card)] p-5 transition-colors hover:border-[var(--color-accent)]/40"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] transition-transform group-hover:scale-110">
        <Icon size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
      {copyValue && (
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${label}`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-[var(--fg)]"
        >
          {copied ? (
            <Check size={15} className="text-[var(--color-accent)]" />
          ) : (
            <Copy size={15} />
          )}
        </button>
      )}
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-[var(--card)] px-6 py-16 md:px-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%)",
          }}
        />

        <div className="relative flex flex-col items-center text-center">
          <Reveal as="div" className="flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--color-accent)]" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Contact
            </span>
            <span className="h-px w-8 bg-[var(--color-accent)]" />
          </Reveal>

          <TextReveal
            text="Let's build something amazing."
            as="h2"
            className="mt-6 max-w-3xl justify-center text-center text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl"
          />

          <Reveal
            as="p"
            delay={1}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            Got an idea, a product, or a startup that needs a story? Let's make
            it happen. I'm always up for a good conversation.
          </Reveal>

          <Reveal as="div" delay={2} className="mt-8">
            <MagneticButton
              as="a"
              href={`mailto:${SITE.email}`}
              className="group items-center gap-2 rounded-full bg-[var(--fg)] px-7 py-4 text-sm font-medium text-[var(--bg)] transition-shadow hover:shadow-glow"
            >
              Start a conversation
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </MagneticButton>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3"
          >
            <ContactCard
              icon={MapPin}
              label="Location"
              value={SITE.location}
              href="https://maps.google.com/?q=Berlin,Germany"
            />
            <ContactCard
              icon={Mail}
              label="Email"
              value={SITE.email}
              copyValue={SITE.email}
              href={`mailto:${SITE.email}`}
            />
            <ContactCard
              icon={Phone}
              label="Phone"
              value={SITE.phone}
              copyValue={SITE.phoneHref}
              href={`tel:${SITE.phoneHref}`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
