"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CabinKitchen() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 24 },
    animate: {
      opacity: 1,
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
        <motion.div variants={fadeInUpVariants} className="overflow-hidden py-0.5">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Kitchenette
          </h2>
        </motion.div>

        {/* Clean Description */}
        <motion.div variants={fadeInUpVariants} className="space-y-4 max-w-3xl">
          <p className="text-base md:text-lg text-zinc-500 font-light leading-snug tracking-wide">
            The cabins come equipped with a <span className="font-normal text-zinc-900">kitchenette</span> — induction cooktop, microwave, and camping gas — so you can cook your own meals. A <span className="font-normal text-zinc-900">water purifier</span> is provided. Feel free to <span className="font-normal text-zinc-900">bring your own ingredients</span> and whip something up!
          </p>
          <p className="text-base md:text-lg text-zinc-500 font-light leading-snug tracking-wide">
            Prefer not to cook? You can <span className="font-normal text-zinc-900">order from the neighbouring resort or farmstay</span>, or simply bring your own food and drinks along. Meals are not included in the nightly rate.
          </p>
        </motion.div>

        {/* Minimal Side-by-Side Image Grid with Entry Animation */}
        <motion.div 
          variants={fadeInUpVariants}
          className="grid grid-cols-2 gap-2.5 pt-4"
        >
          <div className="overflow-hidden rounded-xl bg-zinc-50 aspect-[3/4]">
            <img 
              src="/images/kitchen/kitchen-1.jpg" 
              alt="Cabin kitchenette setup" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          <div className="overflow-hidden rounded-xl bg-zinc-50 aspect-[3/4]">
            <img 
              src="/images/kitchen/kitchen-2.avif" 
              alt="Dining area detail" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}