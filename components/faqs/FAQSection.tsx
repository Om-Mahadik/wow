"use client";

import { useState } from "react";
import { motion, AnimatePresence, TargetAndTransition, Variants } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const fluidSpring = {
    type: "spring" as const,
    stiffness: 240,
    damping: 26,
    mass: 0.8
  };

  const faqs = [
    {
      question: "What are the check-in and check-out timings?",
      answer: "Check-in is at 1:00 PM, and check-out is at 11:00 AM. This gives our team enough time to perfectly prepare the space for the next guest.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made up to 7 days before your arrival date will receive a full refund. Bookings canceled within 7 days of the check-in date are non-refundable.",
    },
    {
      question: "Are the architectural units air-conditioned?",
      answer: "Yes, all our luxury container units are equipped with fully integrated high-capacity air conditioning systems to keep your stay perfectly climate-controlled.",
    },
    {
      question: "Is there cellular network or Wi-Fi on the property?",
      answer: "High-speed mesh Wi-Fi covers the property grounds seamlessly. Cellular coverage depends on your network provider, but general connectivity remains reliable.",
    },
  ];

  const containerVariants: Variants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.04 } },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <div className="w-full flex justify-center bg-white select-none py-20">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-[90vw] md:max-w-[700px] px-4 md:px-0 flex flex-col items-center"
      >
        {/* EDITORIAL HEADER */}
        <div className="text-center flex flex-col items-center space-y-3 mb-12">
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="text-sm md:text-base text-zinc-400 font-light tracking-wide max-w-sm"
          >
            Everything you need to know about your stay at Wind Over Waters.
          </motion.p>
        </div>

        {/* FLOATING CARD ACCORDION STACK */}
        <div className="w-full flex flex-col space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`w-full p-6 md:p-7 rounded-[24px] border transition-all duration-300 cursor-pointer group transform-gpu ${
                  isOpen 
                    ? "bg-zinc-50/70 border-zinc-400" 
                    : "bg-white border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50/30"
                }`}
              >
                {/* Trigger Row Matrix */}
                <div className="flex items-center justify-between w-full gap-5 text-left">
                  <div className="flex items-center gap-4 flex-1">
                    <span className={`text-base md:text-[17px] font-medium tracking-wide transition-colors duration-300 ${
                      isOpen ? "text-zinc-900" : "text-zinc-700 group-hover:text-zinc-900"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Plus Icon Container */}
                  <div className="relative w-7 h-7 flex items-center justify-center shrink-0 rounded-full bg-white border border-zinc-400">
                    <motion.div 
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={fluidSpring}
                      className="absolute w-3 h-[1.5px] bg-zinc-700 rounded-full transform-gpu"
                    />
                    <motion.div 
                      animate={{ rotate: isOpen ? 225 : 90 }}
                      transition={fluidSpring}
                      className="absolute w-[1.5px] h-3 bg-zinc-700 rounded-full transform-gpu"
                    />
                  </div>
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
                      <motion.p 
                        initial={{ y: -4, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -4, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm md:text-base text-zinc-500 font-light leading-relaxed tracking-wide pt-4 pr-4 border-t border-zinc-300 mt-4 transform-gpu"
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}