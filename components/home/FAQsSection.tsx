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
      question: "Is this a resort or hotel?",
      answer: "No, there's no reception, restaurant, or on-site staff. This property consists of two standalone, self-contained, lakeside cabins which are installed side-by-side. It's designed for glamping, adventure seekers, and nature lovers who are planning to disconnect.",
    },
    {
      question: "Will there be network and phone signal?",
      answer: "Jio tends to work, but coverage is patchy. Wi-Fi is basic and not dependable for work. Plan for occasional power cuts and disconnection.",
    },
    {
      question: "Is there a caretaker on-site?",
      answer: "No, there's no staff living on the property, but the team is available on call for anything you need.",
    },
    {
      question: "How do meals work?",
      answer: "There's a kitchenette with an induction stove, fridge, and microwave, so you can self-cook, bring your own food/ingredients, or pre-order from a nearby farmstay.",
    },
    {
      question: "Is the property and road safe?",
      answer: "Yes. The property is fully fenced, including between the two cabins for privacy, and there’s a farmstay right next door. It's remote by design, being a glamping property, but the road leads directly to the cabins, so just drive up, park, and walk down the steps to your cabins. We'd recommend arriving before dark.",
    },
    {
      question: "What's the check-in/checkout time?",
      answer: "Check-in is at 1 PM, and checkout is at 11 AM. Late checkout can be requested, subject to availability and an extra cost.",
    },
    {
      question: "How do I get to the property?",
      answer: "There's a bridge en route that shows as closed or non-functional on Google Maps — it's actually completely open and is the only route in. Cross the bridge first, then follow the property's shared location pin.",
    },
    {
      question: "How does check-in work?",
      answer: "This is a no-reception property featuring a seamless self-check-in workflow via a secure lockbox. Your individual lockbox access code will be shared automatically on the day of check-in.",
    },
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