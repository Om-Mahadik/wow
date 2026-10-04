"use client";

import React from "react";
import { motion } from "framer-motion";

export default function InstallationStory() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const headerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  };

  const sectionReveal = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: smoothEase },
    },
  };

  return (
    <section className="w-full bg-white select-none py-20 overflow-hidden flex flex-col items-center">
      {/* HEADER SECTION */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center flex flex-col items-center space-y-3 mb-16 px-4"
      >
        <motion.span
          variants={headerVariants}
          className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]"
        >
          Our Installation Story
        </motion.span>

        <motion.h2
          variants={headerVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.15] max-w-3xl transform-gpu"
        >
          How We Built Wind Over Waters.
        </motion.h2>
      </motion.div>

      <div className="w-full max-w-5xl mx-auto px-6 space-y-16">
        {/* FIRST INSTALLATION IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: smoothEase }}
          className="aspect-[16/9] w-full overflow-hidden rounded-[36px] bg-zinc-50 border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative group transform-gpu"
        >
          <img
            src="/images/Installation/1.jpeg"
            alt="Transporting and rigging the cabins on site"
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-1000 ease-out will-change-transform"
            loading="lazy"
          />

          <div className="absolute inset-0 rounded-[36px] ring-1 ring-inset ring-black/5 pointer-events-none" />
        </motion.div>

        {/* NARRATIVE BLOCK 1 */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          className="space-y-6 w-full text-justify transform-gpu"
        >
          {/* ORIGINAL BOLD PARAGRAPH — UNCHANGED */}
          <p className="text-xl md:text-2xl text-zinc-800 font-normal leading-relaxed tracking-tight">
            Our cabins here started somewhere else — built offsite, wrapped in
            stretch film, and driven in on the back of a flatbed. The easy part
            ended there.
          </p>

          {/* UPDATED PARAGRAPH */}
          <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed tracking-wide">
            We&apos;d imagined the cabins at around six tons, and chose our
            crane on that assumption. But the access road narrows as it climbs,
            and by the time the trailers reached the backwaters, it was clear
            that crane couldn&apos;t manage the lift across the power lines
            running through the site. To make things harder, it was monsoon
            season. The parking area beside the road had been laid with
            concrete, but weeks of rain had softened the ground beneath it, and
            the crane&apos;s outriggers broke straight through the moment they
            took any weight. Boulders had to be packed in by hand to give the
            crane something solid to stand on.
          </p>
        </motion.div>

        {/* SECOND INSTALLATION IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: smoothEase }}
          className="aspect-[16/9] w-full overflow-hidden rounded-[36px] bg-zinc-50 border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative group transform-gpu"
        >
          <img
            src="/images/Installation/2.jpeg"
            alt="Heavy crane lifting cabins into position among trees"
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-1000 ease-out will-change-transform"
            loading="lazy"
          />

          <div className="absolute inset-0 rounded-[36px] ring-1 ring-inset ring-black/5 pointer-events-none" />
        </motion.div>

        {/* NARRATIVE BLOCK 2 */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          className="space-y-6 w-full text-justify transform-gpu"
        >
          {/* UPDATED PARAGRAPH */}
          <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed tracking-wide">
            Only once the crane was stable did the real number surface. The
            cabins weren&apos;t six tons, they were seven and a half. With the
            site sitting lower than the road, and the span the crane needed to
            clear, there was a real risk of it going over. We needed a bigger
            machine, a hundred and ten ton crane, and the nearest one was booked
            out for eight days. So the cabins came off the trailers and waited
            by the roadside, wrapped in plastic, watched over daily by us and by
            neighbors.
          </p>

          {/* UPDATED PARAGRAPH */}
          <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed tracking-wide">
            Four or five days later, the whole operation assembled again. Power
            was shut off once more, and the bigger crane took hours to get
            stable in the mud. Cabin by cabin, it lifted each one clear of the
            line and set it down among the trees, where both still stand today.
          </p>

          {/* ORIGINAL FINAL BOLD PARAGRAPH — UNCHANGED */}
          <p className="text-xl md:text-2xl text-zinc-800 font-normal leading-relaxed tracking-tight pt-4">
            Both cabins are still standing exactly where they were placed that
            day. It was, without question, the hardest part of building Wind
            Over Waters — and not one we&apos;d choose to repeat in July again.
          </p>
        </motion.div>

        {/* FABRICATION NOTE BOX */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full transform-gpu"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">
              Engineering & Craft
            </span>

            <h4 className="text-lg font-bold text-zinc-950">
              Fabricated by The Coon Co
            </h4>
          </div>

          <p className="text-sm text-zinc-500 font-light">
            Prefabricated tiny architecture built for resilience, isolation, and
            seamless nature integration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
