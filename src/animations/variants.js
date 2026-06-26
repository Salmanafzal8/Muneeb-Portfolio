export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: i * 0.08 },
  }),
};

export const blurReveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay: i * 0.06 },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: (stagger = 0.08) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const wordReveal = {
  hidden: { y: "110%" },
  visible: (i = 0) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: i * 0.05 },
  }),
};
