"use client";

import { motion } from "framer-motion";

export default function ContactMap() {
  const mapUrl = "https://maps.app.goo.gl/2VgWzuaBRBH4hq8n8";

  return (
    <div className="w-full bg-white select-none py-8">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[28px] overflow-hidden border border-zinc-200/80 shadow-xs"
        >
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-200/80 shadow-2xs flex items-center gap-2 hover:bg-white transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-800 tracking-wide">Wind Over Waters — Mulshi</span>
          </a>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.1274431952514!2d73.5771637!3d18.3859574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2a1883394c8e1%3A0x6a0c441b1d7d655f!2sWind%20Over%20Waters%20-%20Glamping!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full border-0 saturate-[1.1] contrast-[1.02]"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  );
}