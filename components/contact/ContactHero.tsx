"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const headline = "Other ways to connect";
  const words = headline.split(" ");

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: smoothEase },
    },
  };

  const wordVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: smoothEase },
    },
  };

  return (
    <div className="w-full bg-white select-none py-12 md:py-16 relative overflow-hidden">
      {/* Subtle Ambient Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-16 flex flex-col space-y-8 relative z-10"
      >
        {/* Section Header */}
        <div className="space-y-2">
          <motion.div variants={itemVariants} className="flex items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Direct Contact
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] flex flex-wrap gap-x-[0.25em]">
            {words.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden py-0.5">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            variants={itemVariants}
            className="text-base text-zinc-500 font-light max-w-2xl leading-relaxed tracking-wide"
          >
            Prefer instant communication? Reach out directly via phone, WhatsApp, or email, or drop by our location.
          </motion.p>
        </div>

        {/* Direct Channel Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Phone / WhatsApp Card */}
          <a
            href="tel:+919876543210"
            className="flex flex-col justify-between p-5 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/70 transition-all duration-300 group cursor-pointer shadow-2xs hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 transition-colors">
                Phone & WhatsApp
              </span>
              <div className="w-8 h-8 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shadow-2xs">
                <PhoneIcon />
              </div>
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors">
                +91 98765 43210
              </span>
              <p className="text-xs text-zinc-400 font-light mt-0.5">Available 9:00 AM – 8:00 PM IST</p>
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:stay@windoverwaters.com"
            className="flex flex-col justify-between p-5 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/70 transition-all duration-300 group cursor-pointer shadow-2xs hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 transition-colors">
                Email Inquiries
              </span>
              <div className="w-8 h-8 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shadow-2xs">
                <MailIcon />
              </div>
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors">
                stay@windoverwaters.com
              </span>
              <p className="text-xs text-zinc-400 font-light mt-0.5">Response within a few hours</p>
            </div>
          </a>

          {/* Location Card */}
          <a
            href="https://maps.app.goo.gl/2VgWzuaBRBH4hq8n8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between p-5 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/70 transition-all duration-300 group cursor-pointer shadow-2xs hover:-translate-y-0.5 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 transition-colors">
                Property Location
              </span>
              <div className="w-8 h-8 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shadow-2xs">
                <LocationIcon />
              </div>
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors">
                Panshet Lake, MH
              </span>
              <p className="text-xs text-zinc-400 font-light mt-0.5">Wind Over Waters — Glamping</p>
            </div>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ==========================================
// VECTOR ICONS
// ==========================================

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.828-1.015-5.183-3.37-6.198-6.198l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}