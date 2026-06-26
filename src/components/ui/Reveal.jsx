import { motion } from "framer-motion";
import { blurReveal } from "../../animations/variants";

/**
 * Scroll-triggered reveal wrapper with a blur-up entrance.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variants = blurReveal,
  amount = 0.3,
  ...props
}) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...props}
    >
      {children}
    </Comp>
  );
}
