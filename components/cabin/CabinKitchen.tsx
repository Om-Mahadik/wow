"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CabinKitchen() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  // Outer container controls overall section entrance
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Staggered image container (animates images one-by-one)
  const imageContainerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2, // Time delay between image 1 and image 2
        delayChildren: 0.1,   // Small pause after text appears before first image starts
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
    <div className="w-full flex justify-center bg-white select-none pt-6 pb-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-5%" }}
        className="w-full md:max-w-[80vw] flex flex-col justify-start px-4 md:px-0"
      >
        {/* 2-Column Desktop Grid: Left (Title + Description) | Right (Images Staggered) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          
          {/* LEFT COLUMN: Title + Description Stack */}
          <motion.div variants={fadeInUpVariants} className="space-y-4 md:col-span-6 lg:col-span-5">
            {/* Title */}
            <div className="overflow-hidden py-0.5">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
                Kitchenette
              </h2>
            </div>

            {/* Clean Description */}
            <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed tracking-wide">
              The cabins come equipped with a <span className="font-normal text-zinc-900">kitchenette</span> — induction cooktop, microwave, and camping gas — so you can cook your own meals. A <span className="font-normal text-zinc-900">water purifier</span> is provided. Feel free to <span className="font-normal text-zinc-900">bring your own ingredients</span> and whip something up!
            </p>
            <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed tracking-wide">
              Prefer not to cook? You can <span className="font-normal text-zinc-900">order from the neighbouring resort or farmstay</span>, or simply bring your own food and drinks along. Meals are not included in the nightly rate.
            </p>
          </motion.div>

          {/* RIGHT COLUMN: Uncropped Images with One-by-One Sequence Animation */}
          <motion.div 
            variants={imageContainerVariants}
            className="grid grid-cols-2 gap-3 md:gap-4 md:col-span-6 lg:col-span-7"
          >
            {/* Image 1 */}
            <motion.div 
              variants={fadeInUpVariants}
              className="overflow-hidden rounded-2xl bg-zinc-50 aspect-[3/4] border border-zinc-200/50 shadow-xs"
            >
              <img 
                src="/images/kitchen/kitchen-1.jpg" 
                alt="Cabin kitchenette setup" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            
            {/* Image 2 (Animates after Image 1) */}
            <motion.div 
              variants={fadeInUpVariants}
              className="overflow-hidden rounded-2xl bg-zinc-50 aspect-[3/4] border border-zinc-200/50 shadow-xs"
            >
              <img 
                src="/images/kitchen/kitchen-2.avif" 
                alt="Dining area detail" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}