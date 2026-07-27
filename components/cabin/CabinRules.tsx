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
              className="p-6 rounded-[28px] bg-zinc-50 border border-zinc-200/60 space-y-2 max-w-sm"
            >
              <h4 className="text-xs font-bold tracking-wider uppercase text-emerald-600">Added Discount!</h4>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">
                This is a Zero waste property... take back your trash before checkout and message us directly or on the airbnb App. We'll thank you with ten percent off on your next stay.
              </p>
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