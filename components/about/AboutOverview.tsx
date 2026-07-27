"use client";

import React from 'react';
import { motion } from "framer-motion";

export default function AboutOverview() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const headerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: smoothEase } 
    },
  };

  const sectionReveal = {
    initial: { opacity: 0, y: 40 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: smoothEase } 
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
          Glamping Retreat
        </motion.span>
        <motion.h2 
          variants={headerVariants} 
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.15] max-w-3xl transform-gpu"
        >
          Camping with Style.
        </motion.h2>
      </motion.div>

      <div className="w-full max-w-5xl mx-auto px-6 space-y-16">
        
        {/* MAIN ESTABLISHING HERO IMAGE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: smoothEase }}
          className="aspect-[16/9] w-full overflow-hidden rounded-[36px] bg-zinc-50 border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative group transform-gpu"
        >
          <img
            src="/images/exterior-2.png" // Path for: Cabins nestled in the forest canopy
            alt="Cabins nestled in the forest canopy"
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-1000 ease-out will-change-transform"
            loading="eager"
          />
          <div className="absolute inset-0 rounded-[36px] ring-1 ring-inset ring-black/5 pointer-events-none" />
        </motion.div>

        {/* INTRODUCTION BLOCK */}
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionReveal}
          className="space-y-6 max-w-3xl transform-gpu"
        >
          <p className="text-xl md:text-2xl text-zinc-800 font-normal leading-relaxed tracking-tight">
            Where forest, wind, and waters meet, two Coons — our tiny cabins — sit tucked into the Varasgaon backwaters, about an hour from Pune. Wind Over Waters is a glamping retreat built for disconnecting: forest bathing, hiking trails, still backwaters, and quiet you can actually hear.
          </p>
          <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed tracking-wide">
            Experience Shinrin Yoku, the Japanese art of forest bathing, as you breathe in the fresh air and let nature work its magic. Get ready for a serene adventure—this is glamping, not a hotel stay.
          </p>
        </motion.div>

        {/* DETAILED FEATURES GRID */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 pt-6">
          
          {/* COLUMN 1: ABOUT & THE SPACE */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionReveal}
            className="space-y-10 transform-gpu"
          >
            {/* About Wind Over Waters */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight text-zinc-950">About Wind Over Waters</h3>
              <p className="text-base text-zinc-500 font-light leading-relaxed tracking-wide">
                Two Coons — cocoon-inspired, prefab tiny cabins — set at the edge of forest and backwater. Each hosts 2–4 guests in comfort within a compact footprint. Cook your own meals in the kitchenette, bring your own, or pre-order from a nearby resort or farmstay.
              </p>
            </div>

            {/* The Space */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight text-zinc-950">The Space</h3>
              <p className="text-base text-zinc-500 font-light leading-relaxed tracking-wide">
                The property is exclusively yours for the stay — no caretaker or staff on-site, just complete privacy, with our team on call whenever needed. Its remote setting is what gives it that stillness, and it's entirely safe.
              </p>
            </div>
          </motion.div>

          {/* COLUMN 2: GUEST ACCESS & OFF-GRID DETAILS */}
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionReveal}
            className="space-y-10 transform-gpu"
          >
            {/* Guest Access */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight text-zinc-950">Guest Access</h3>
              <p className="text-base text-zinc-500 font-light leading-relaxed tracking-wide">
                The cabin and its fenced outdoor space are yours to enjoy for the length of your stay.
              </p>
            </div>

            {/* Off-Grid Notice Box */}
            <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/50 space-y-2">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-zinc-400">Off-Grid Living Note</h4>
              <p className="text-sm text-zinc-600 font-light leading-relaxed">
                Do plan for the occasional iffy network and power cut (we run on inverter backup) — think of it as part of going off-grid. Power and mobile networks can fluctuate occasionally.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ADDITIONAL EXTERIOR & INTERIOR GALLERY */}
        <div className="grid gap-6 sm:grid-cols-2 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="aspect-[4/3] rounded-[28px] bg-zinc-50 overflow-hidden border border-zinc-100 shadow-sm transform-gpu"
          >
            <img 
              src="/images/exterior-1.png" 
              alt="Cabin Exterior Shot" 
              className="w-full h-full object-cover" 
              loading="lazy" 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase, delay: 0.1 }}
            className="aspect-[4/3] rounded-[28px] bg-zinc-50 overflow-hidden border border-zinc-100 shadow-sm transform-gpu"
          >
            <img 
              src="/images/interior-1.png" 
              alt="Cabin Interior Shot" 
              className="w-full h-full object-cover" 
              loading="lazy" 
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}