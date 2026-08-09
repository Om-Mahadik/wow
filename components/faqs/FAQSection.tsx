"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const smoothEase = [0.25, 1, 0.5, 1] as const;
  
  const fluidSpring = {
    type: "spring" as const,
    stiffness: 240,
    damping: 26,
    mass: 0.8
  };

const faqs = [
  {
    question: "What kind of property is this?",
    answer: "Two self-contained cabins set side by side, right at the edge of forest and backwater. Each cabin is compact and equipped with a fully functional kitchenette, two beds, bathroom, and outdoor deck."
  },
  {
    question: "Is this a hotel?",
    answer: "No — it's a glamping experience, closer to stylish camping than a hotel stay."
  },
  {
    question: "Is there Wi-Fi/network coverage?",
    answer: "Mobile network can be spotty; the property has Jio coverage and inverter backup for power cuts."
  },
  {
    question: "Is there a TV?",
    answer: "No — the property is designed for disconnecting and immersing in nature."
  },
  {
    question: "What's the check-in/checkout time?",
    answer: "Check-in 1 PM, checkout 11 AM. Late checkout available on request, subject to availability and extra cost."
  },
  {
    question: "Is drinking water available?",
    answer: "Yes, via an on-site water purifier."
  },
  {
    question: "What should I pack?",
    answer: "Seasonal clothing, hiking shoes, insect repellent, and binoculars if birdwatching."
  },
  {
    question: "What can I do there?",
    answer: "Hike to the backwaters, explore forest trails, birdwatch, cycle, or just soak in the quiet."
  },
  {
    question: "Where exactly is it located?",
    answer: "Mauje Mose, Taluka Velhe, District Pune — about an hour from Pune city."
  },
  {
    question: "How do I get to the property?",
    answer: "There's a bridge en route that shows as closed/non-functional on Google Maps — it's actually open and is the only route in. Cross the bridge first, then follow the property's location pin."
  },
  {
    question: "Who do I contact for help getting there?",
    answer: "A dedicated assistance number is provided closer to check-in date."
  },
  {
    question: "What's the food arrangement?",
    answer: "Cook your own using the kitchenette, bring your own ingredients, or pre-order from nearby farm stays — vendor contact details shared post-booking."
  },
  {
    question: "How does check-in work?",
    answer: "No-reception property with self-check-in via a lockbox. The lockbox code is shared on the day of check-in."
  },
  {
    question: "What information will I get after booking?",
    answer: "House manual, exact lockbox code, Wi-Fi password, caretaker's direct contact number, specific food vendor names and numbers, and exact key drop off instructions at checkout."
  },
  {
    question: "What are the things to do around the property?",
    answer: "Hiking to the backwaters, birdwatching, cycling around the area, bonfire, and stargazing."
  },
  {
    question: "What is the cancellation policy?",
    answer: "100% refund if cancelled up to 1 week before check-in."
  }
];

  const headerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } },
  };

  const containerVariants: Variants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.04 } },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: smoothEase } },
  };

  return (
    <section className="w-full bg-white select-none py-24 overflow-hidden flex flex-col items-center">
      
      {/* HEADER MATRIX SECTION */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="text-center flex flex-col items-center space-y-3 mb-20 px-4"
      >
        <motion.span variants={headerVariants} className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">
          Common Queries
        </motion.span>
        <motion.h2 
          variants={headerVariants} 
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.15] max-w-2xl transform-gpu"
        >
          Frequently Asked Questions.
        </motion.h2>
      </motion.div>

      {/* FLOATING CARD ACCORDION STACK */}
      <motion.div 
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.05 }}
        className="w-full max-w-3xl px-6 flex flex-col space-y-5"
      >
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={`w-full p-6 md:p-8 rounded-[32px] border transition-all duration-300 cursor-pointer group transform-gpu ${
                isOpen 
                  ? "bg-zinc-50 border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.01)]" 
                  : "bg-white border-zinc-200/60 hover:border-zinc-300 hover:bg-zinc-50/20"
              }`}
            >
              {/* Trigger Row Matrix */}
              <div className="flex items-center justify-between w-full gap-5 text-left">
                <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                  isOpen ? "text-zinc-950" : "text-zinc-800 group-hover:text-zinc-950"
                }`}>
                  {faq.question}
                </span>
                
                {/* Flat, Shadowless Rotating Chevron Icon Container */}
                <motion.div 
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={fluidSpring}
                  className="w-8 h-8 flex items-center justify-center shrink-0 rounded-full bg-white border border-zinc-200 transform-gpu"
                >
                  <svg 
                    className="w-4 h-4 text-zinc-800 stroke-[2.5]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5" 
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Narrative Expand Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={fluidSpring}
                    className="overflow-hidden"
                  >
                    <div className="text-base md:text-lg text-zinc-500 font-light leading-snug tracking-wide pt-5 border-t border-zinc-200/60 mt-5 transform-gpu">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}