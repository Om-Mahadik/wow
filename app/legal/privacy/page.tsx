"use client";

import React from "react";
import LinkComponent from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us when booking a stay, including your name, email address, phone number, and payment processing details. We also collect automated telemetry such as device information, IP address, and browser footprints when interacting with our platform.",
    },
    {
      title: "2. How We Use Your Data",
      content: "Your data is utilized to fulfill reservation requests, manage check-in pipelines, process secure payments, and optimize platform diagnostics. We do not sell or trade your personal information to third-party commercial networks.",
    },
    {
      title: "3. Data Security and Custody",
      content: "We apply industry-standard layer-encryption frameworks (SSL/TLS) to secure all client payloads. However, no data system over public server arrays can be guaranteed as entirely immune to breach. You engage with the platform at your own operational discretion.",
    },
    {
      title: "4. Cookies and Web Tracking",
      content: "Our system employs persistent and session-based cookies to maintain UI configurations, retain reservation checkout states, and track user traffic analytics to iteratively improve the digital experience.",
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
        {/* Navigation Header - Top spacing border divider retained */}
        <div className="border-b border-zinc-100 pb-6" />

        {/* Headline Stack */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900">
            Privacy Policy
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
            For specific compliance inquiries, data removal claims, or policy audits, contact the systems administrator directly via standard business channels.
          </p>
        </div>
      </motion.div>
    </div>
  );
}