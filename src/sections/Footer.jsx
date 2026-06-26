import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { SITE, NAV_LINKS } from "../constants/site";
import { scrollToId } from "../hooks/useLenis";

const SOCIAL_ICONS = { mail: Mail, linkedin: Linkedin, instagram: Instagram };

const SOCIALS = [
  { label: "Email", href: `mailto:${SITE.email}`, icon: "mail" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Oversized name watermark */}
      <div className="pointer-events-none select-none px-6 pt-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-display text-[clamp(3.5rem,18vw,16rem)] font-semibold leading-none text-gradient"
        >
          Muneeb
        </motion.h2>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 border-t border-line pt-10 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-semibold">
              {SITE.name}
              <span className="text-[var(--color-accent)]">.</span>
            </p>
            <p className="mt-1 text-sm text-muted">{SITE.role}</p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => scrollToId(l.id)}
                className="text-sm text-muted transition-colors hover:text-[var(--fg)]"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--fg)]"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
          <p>
            © {year} {SITE.name}. Built with care in Berlin.
          </p>
          <button
            type="button"
            onClick={() => scrollToId("home")}
            className="flex items-center gap-1.5 transition-colors hover:text-[var(--fg)]"
          >
            Back to top <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
