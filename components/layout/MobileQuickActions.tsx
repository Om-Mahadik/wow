"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export default function MobileQuickActions() {
  return (
    <motion.div 
      // Entrance from outside the right edge
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 90, 
        damping: 18, 
        delay: 0.8 
      }}
      // Positioned near the bottom right (bottom-24 avoids standard mobile UI overlaps)
      className="block sm:hidden fixed right-0 bottom-24 z-50 group"
    >
      {/* Container: Obsidian Style */}
      <div className="relative flex flex-col gap-1.5 p-2 rounded-l-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] overflow-hidden">
        
        {/* Background Layers */}
        <div className="absolute inset-0 -z-10 bg-black/95 transition-opacity" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-zinc-800 via-white/20 to-zinc-800 opacity-30 animate-pulse duration-[4s]" />

        {/* WhatsApp Icon */}
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-11 h-11 flex items-center justify-center rounded-full text-white/90 hover:text-white transition-all duration-300"
          aria-label="WhatsApp"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 opacity-0 hover:opacity-100 blur-sm transition-opacity" />
          <MessageCircle className="w-5 h-5 relative z-10" strokeWidth={1.5} />
        </a>

        {/* Minimalist Divider */}
        <div className="w-[80%] h-[1px] bg-zinc-800 mx-auto" />

        {/* Phone Icon */}
        <a
          href="tel:+1234567890"
          className="relative w-11 h-11 flex items-center justify-center rounded-full text-white/90 hover:text-white transition-all duration-300"
          aria-label="Call"
        >
          <div className="absolute inset-0 rounded-full bg-sky-500/10 opacity-0 hover:opacity-100 blur-sm transition-opacity" />
          <Phone className="w-5 h-5 relative z-10" strokeWidth={1.5} />
        </a>
      </div>
    </motion.div>
  );
}