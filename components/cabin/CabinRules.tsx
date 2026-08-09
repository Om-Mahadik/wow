"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CabinRules() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const rules = [
    {
      num: "1",
      text: "Please treat the Coons and surroundings with care—as it's in a peaceful, remote location.",
    },
    {
      num: "2",
      text: "Responsible Stay, Respect the locals.",
    },
    {
      num: "3",
      text: "Quiet hours - 10 pm to 7 am.",
    },
    {
      num: "4",
      text: "No pets allowed on the property.",
    },
    {
      num: "5",
      text: "Zero waste property. Please plan to leave no trace behind.",
    },
    {
      num: "6",
      text: "Venture into the Varasgaon backwaters at your own risk.",
    },
    {
      num: "7",
      text: "Check-in from 1:00 PM to 7:00 PM, checkout by 11:00 AM. Up to 3 guests per cabin. This is a self-check-in property, so you'll have complete privacy — our team is just a call away if you need anything.",
    },
  ];

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
  };

  return (
    <div className="w-full flex justify-center bg-white select-none pt-12 pb-24">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full md:max-w-[80vw] px-4 md:px-0"
      >
        {/* Split Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT SIDE PANEL */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
            <div className="overflow-hidden py-0.5">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight text-zinc-900">
                House Rules
              </motion.h2>
            </div>

            {/* Added Discount Notice Box */}
            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-[28px] bg-zinc-50 border border-zinc-200/80 space-y-3 max-w-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h4 className="text-xs font-bold tracking-wider uppercase text-zinc-900">
                    Added Discount
                  </h4>
                </div>
                <TagIcon />
              </div>

              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                This is a zero-waste property. Take back your trash before checkout and message us directly or on the Airbnb app.
              </p>

              <div className="pt-1">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold tracking-wide">
                  10% OFF on your next stay
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE PANEL - Clean List */}
          <div className="lg:col-span-7 flex flex-col space-y-8 w-full pt-4 lg:pt-2">
            {rules.map((rule, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-6 group"
              >
                {/* Large Soft Numeric Circle Badge */}
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 font-medium text-base shrink-0 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white mt-0.5">
                  {rule.num}
                </div>
                
                {/* Rule Description Text */}
                <p className="text-base md:text-lg text-zinc-500 font-light leading-snug tracking-wide group-hover:text-zinc-950 transition-colors duration-300 max-w-xl">
                  {rule.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// VECTOR ICONS
// ==========================================

function TagIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-600 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}