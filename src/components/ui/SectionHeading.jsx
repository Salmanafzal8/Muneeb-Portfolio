import Reveal from "./Reveal";
import TextReveal from "./TextReveal";
import { cn } from "../../utils/cn";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const centered = align === "center";
  return (
    <div className={cn("flex flex-col gap-5", centered && "items-center text-center")}>
      {eyebrow && (
        <Reveal as="div" className="flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <TextReveal
        text={title}
        as="h2"
        className={cn(
          "max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl",
          centered && "justify-center"
        )}
      />
      {description && (
        <Reveal
          as="p"
          delay={1}
          className={cn(
            "max-w-xl text-base leading-relaxed text-muted md:text-lg",
            centered && "mx-auto"
          )}
        >
          {description}
        </Reveal>
      )}
    </div>
  );
}
