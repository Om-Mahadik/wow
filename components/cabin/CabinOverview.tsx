"use client";

import { motion } from "framer-motion";

export default function CabinOverview() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const textString =
    "The wind, the waters & the forest await to give you a serene experience at the Wind over Waters. This is a glamping property with 2 Coons, aka cabins.";
  const words = textString.split(" ");

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 2.0,
      },
    },
  };

  const titleRevealVariants = {
    initial: { opacity: 0, y: 32 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: smoothEase },
    },
  };

  const paraContainerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const wordVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  };

  const pillVariants = {
    initial: { opacity: 0, scale: 0.96, y: 16 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  };

  return (
    <div className="w-full flex justify-center bg-white select-none pt-6">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-5%" }}
        className="w-full md:max-w-[80vw] flex flex-col justify-start px-4 md:px-0 space-y-4"
      >
        {/* Title */}
        <div className="overflow-hidden py-0.5">
          <motion.h2
            variants={titleRevealVariants}
            className="text-2xl font-bold tracking-tight text-zinc-900"
          >
            Overview
          </motion.h2>
        </div>

        {/* Word-Level Paragraph Animation */}
        <motion.p
          variants={paraContainerVariants}
          className="text-base md:text-lg text-zinc-500 font-light max-w-3xl leading-snug tracking-wide flex flex-wrap gap-x-[0.25em] -my-0.5"
        >
          {words.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden py-0.5">
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>

        {/* Spec Pills Row */}
        {/* Increased padding-top from pt-1 to pt-5 to separate pills from the paragraph */}
        <motion.div
          variants={containerVariants}
          className="flex flex-wrap items-center gap-3 pt-5"
        >
          {/* Beds Pill */}
          <motion.div
            variants={pillVariants}
            whileHover={{ y: -3, boxShadow: "0 6px 16px rgba(0,0,0,0.04)" }}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-zinc-200/60 bg-[#fafafa] text-zinc-700 shadow-sm transition-all duration-300 origin-left"
          >
            <svg
              className="w-5 h-5 text-zinc-800 stroke-[1.5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5M3 5.25h18v13.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25Z"
              />
            </svg>
            <span className="text-sm font-medium tracking-wide">2 Beds</span>
          </motion.div>

          {/* Guests Pill */}
          <motion.div
            variants={pillVariants}
            whileHover={{ y: -3, boxShadow: "0 6px 16px rgba(0,0,0,0.04)" }}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-zinc-200/60 bg-[#fafafa] text-zinc-700 shadow-sm transition-all duration-300 origin-left"
          >
            <svg
              className="w-5 h-5 text-zinc-800 stroke-[1.5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            <span className="text-sm font-medium tracking-wide">4 Guests</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}