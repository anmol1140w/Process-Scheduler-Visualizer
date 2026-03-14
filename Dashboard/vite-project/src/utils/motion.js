export const TRANSITIONS = {
  fast: { duration: 0.1, ease: "easeOut" },
  normal: { duration: 0.15, ease: "easeOut" },
  slow: { duration: 0.25, ease: "easeOut" },
  bounce: { type: "spring", stiffness: 500, damping: 30 },
};

export const VARIANTS = {
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05,
      },
    },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: TRANSITIONS.normal,
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: TRANSITIONS.fast,
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: TRANSITIONS.bounce,
    },
  },
  timelineContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02, 
      },
    },
  },
  timelineBlock: {
    hidden: { opacity: 0, scale: 0.95 },
    show: { 
      opacity: 1, 
      scale: 1, 
      transition: TRANSITIONS.fast
    },
  }
};
