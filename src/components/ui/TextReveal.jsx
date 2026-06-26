import { motion } from "framer-motion";
import { wordReveal, staggerContainer } from "../../animations/variants";
import { cn } from "../../utils/cn";

/**
 * Splits text into words and reveals each from behind a mask on scroll.
 */
export default function TextReveal({
  text,
  as: Tag = "h2",
  className,
  stagger = 0.06,
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag] ?? motion.h2;

  return (
    <MotionTag
      className={cn("flex flex-wrap", className)}
      variants={staggerContainer}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em]"
        >
          <motion.span variants={wordReveal} custom={i} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
