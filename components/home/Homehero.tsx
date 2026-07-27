'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Compass } from 'lucide-react';

export default function HomeHero() {
  const handleScrollToExplore = () => {
    window.scrollTo({
      top: window.innerHeight * 0.95,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full min-h-screen lg:min-h-[85vh] bg-[#FAF9F6] flex flex-col justify-between p-4 sm:p-6 lg:p-12 select-none overflow-hidden relative">
      
      {/* 1. TOP META ACTION BAR */}
      <div className="w-full flex items-center justify-between z-20">
        <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
          wind.over.waters
        </span>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 transition-colors text-xs font-medium"
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">@wind.over.waters</span>
        </a>
      </div>

      {/* 2. CORE IMMERSIVE CANVAS - Stacks dynamically */}
      <div className="w-full flex-grow flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 my-8 lg:max-w-[85%] lg:mx-auto">
        
        {/* MEDIA FRAME - Fully scales to fill space elegantly on phones */}
        <div className="w-full lg:w-1/2 h-[45vh] lg:h-[550px] relative rounded-[32px] overflow-hidden shadow-sm group border border-zinc-200/20">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src="/images/deck-1.jpg" 
            alt="Premium canopy lake sanctuary look" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Subtle vignette gradient to keep overlay text crisp on mobile device viewports */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-zinc-950/10 to-transparent pointer-events-none" />
          
          {/* Mobile Overlay Title: Renders cleanly pinned to bottom corner layout inside the graphic panel */}
          <div className="absolute left-6 bottom-6 right-6 z-10 lg:hidden">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Where the canopy <br />
              <span className="text-zinc-200 font-normal italic font-serif">greets the lake.</span>
            </h1>
          </div>
        </div>

        {/* TYPOGRAPHY DESCRIPTION BLOCK - Desktop Main / Mobile Secondary Details */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left justify-center lg:pl-4">
          
          {/* Main Desktop Title: Kept hidden on mobile to avoid repetitive layouts */}
          <h1 className="hidden lg:block text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
            Where the canopy <br />
            <span className="text-zinc-400 font-normal italic font-serif">greets the lake.</span>
          </h1>

          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed tracking-wide max-w-md">
            A premium lakeside escape tucked safely within the hills. 
            An intentional nature retreat structured completely around helping you disconnect, look out, and slow down.
          </p>

          {/* Micro Action Trigger Stacks */}
          <div className="mt-8 w-full sm:w-auto">
            <button 
              onClick={handleScrollToExplore}
              className="h-14 w-full sm:w-auto px-8 rounded-2xl bg-zinc-900 text-white font-medium text-sm flex items-center justify-between sm:justify-center gap-6 transition-all hover:bg-zinc-800 shadow-sm active:scale-[0.99] group"
            >
              <span>Explore Sanctuary</span>
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* 3. CORE EDITORIAL RUNNING FOOTER TRACK */}
      <div className="w-full pt-4 border-t border-zinc-200/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono tracking-wider text-zinc-400 uppercase z-20">
        <span>[ 2h outside Mumbai / Pune ]</span>
        <span>built for digital detox © 2026</span>
      </div>

    </section>
  );
}