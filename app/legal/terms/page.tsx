"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TermsOfService() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const sections = [
    {
      title: "1. Reservation and Booking",
      content: "All reservation requests are subject to site availability and check-in parameter confirmations. Guests must complete all payment milestones in advance to fully secure booking rights on the premises.",
    },
    {
      title: "2. The Wilderness Environment",
      content: "Winds Over Waters is located in an off-grid wilderness setting. Guests must plan for it like they are going camping—power grids and digital cellular networks may occasionally fluctuate. These operational environments are a natural part of the wild stay experience and do not constitute grounds for structural refunds.",
    },
    {
      title: "3. Property Liability and Conduct",
      content: "Guests are fully liable for any destruction, physical damage, or equipment degradation brought upon the cabins and surrounding waterfront premises during their stay. Illegal substances, hazardous actions, and unmanaged open fire zones are completely prohibited.",
    },
    {
      title: "4. Cancellation Framework",
      content: "Standard cancellations submitted outside specified booking windows will be assessed according to the current seasonal transaction rules. Late check-outs without clear written operational approval will result in automated penalty charges.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white select-none text-zinc-900 px-4 py-8 md:py-16 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="w-full md:max-w-[55vw] flex flex-col justify-start space-y-8"
      >
        {/* Navigation Header - Divider retained */}
        <div className="border-b border-zinc-100 pb-6" />

        {/* Headline Stack */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">
            Terms of Service
          </h1>
          <p className="text-sm text-zinc-400 font-light">
            Last Updated: July 2026 — Winds Over Waters
          </p>
        </div>

        {/* Main Document Content */}
        <div className="flex flex-col gap-8 pt-4">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col space-y-3 text-left">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                {section.title}
              </h2>
              <p className="text-base text-zinc-500 font-light tracking-wide leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note Area */}
        <div className="pt-10 border-t border-zinc-100">
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            By completing a reservation or executing operations on our digital platform, you explicitly consent to remain legally bound by these terms.
          </p>
        </div>
      </motion.div>
    </div>
  );
}