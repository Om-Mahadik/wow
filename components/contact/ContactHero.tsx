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
    <div className="w-full bg-white select-none py-14 md:py-20 relative">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col space-y-10 relative z-10"
      >
        {/* Section Header */}
        <div className="space-y-3">
          <motion.div variants={itemVariants} className="flex items-center">
            <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">
              Direct Contact
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] flex flex-wrap gap-x-[0.25em]">
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
            className="text-lg text-zinc-500 font-light max-w-2xl leading-relaxed tracking-wide"
          >
            Prefer instant communication? Reach out directly via WhatsApp, Instagram, or email, or drop by our location.
          </motion.p>
        </div>

        {/* Direct Channel Cards - 1 col on mobile, 2 cols on tablet/desktop */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* WhatsApp Card */}
          <a
            href="https://wa.me/917387041204"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between p-6 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/70 transition-all duration-300 group cursor-pointer shadow-2xs hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 transition-colors">
                WhatsApp
              </span>
              <div className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shadow-2xs">
                <WhatsAppIcon />
              </div>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors block">
                +91 73870 41204
              </span>
              <p className="text-sm text-zinc-400 font-light mt-1">Available 9:00 AM – 8:00 PM IST</p>
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href="https://instagram.com/wind.over.waters"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between p-6 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/70 transition-all duration-300 group cursor-pointer shadow-2xs hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 transition-colors">
                Instagram
              </span>
              <div className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shadow-2xs">
                <InstagramIcon />
              </div>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors block">
                @wind.over.waters
              </span>
              <p className="text-sm text-zinc-400 font-light mt-1">Active daily for DMs & updates</p>
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:enquiry@windoverwaters.com"
            className="flex flex-col justify-between p-6 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/70 transition-all duration-300 group cursor-pointer shadow-2xs hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 transition-colors">
                Email Inquiries
              </span>
              <div className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shadow-2xs">
                <MailIcon />
              </div>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors truncate block">
                enquiry@windoverwaters.com
              </span>
              <p className="text-sm text-zinc-400 font-light mt-1">Response within a few hours</p>
            </div>
          </a>

          {/* Location Card */}
          <a
            href="https://maps.app.goo.gl/2VgWzuaBRBH4hq8n8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between p-6 rounded-2xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/70 transition-all duration-300 group cursor-pointer shadow-2xs hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 transition-colors">
                Property Location
              </span>
              <div className="w-10 h-10 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shadow-2xs">
                <LocationIcon />
              </div>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-black transition-colors block">
                Panshet Lake, MH
              </span>
              <p className="text-sm text-zinc-400 font-light mt-1">Wind Over Waters — Glamping</p>
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

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}