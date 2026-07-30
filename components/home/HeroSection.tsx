'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [isShrunk, setIsShrunk] = useState(false);

  // Optimized scroll toggle using a flag to prevent unnecessary state re-renders
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 20) {
            setIsShrunk(true);
          } else {
            setIsShrunk(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Premium snappy spring transition configuration with strict literal inference
  const springConfig = {
    type: "spring",
    stiffness: 100,
    damping: 22,
    mass: 0.8
  } as const;

  const titleLines = ["Where the Wind,", "Forest & Water Meet"];

  return (
    // Cleaned container: exactly h-screen to eliminate any dead space below
    <div className="w-full h-screen bg-white relative z-10 m-0 p-0">
      
      {/* Frame Wrapper */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        
        {/* The Snapping Canvas Shell */}
        <motion.section 
          animate={{
            width: isShrunk ? "85%" : "100%",      
            height: isShrunk ? "75vh" : "100vh",    
            borderRadius: isShrunk ? "48px" : "0px", 
            y: isShrunk ? 10 : 0
          }}
          transition={springConfig}
          className="relative overflow-hidden bg-zinc-950 text-white select-none shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] flex flex-col justify-end w-full h-full transform-gpu"
        >
          
          {/* Background Drone Image Asset Container */}
          <motion.div 
            animate={{ scale: isShrunk ? 1.12 : 1.05 }}
            transition={springConfig}
            className="absolute inset-0 z-0 w-full h-full"
          >
            <Image
              src="/images/drone/drone-1.jpg"
              alt="Wind over Waters aerial view"
              fill
              priority
              className="object-cover object-center animate-[subtle-zoom_25s_ease-out_infinite_alternate]"
            />
            
            {/* Native Contrast Pop */}
            <div className="absolute inset-0 backdrop-contrast-[1.15] backdrop-brightness-[0.95] backdrop-saturation-[1.3] pointer-events-none" />

            {/* Rich Cinematic Black Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none z-10" />
          </motion.div>

          {/* Hero Content Interface Layout */}
          <AnimatePresence>
            {!isShrunk && (
              <motion.div 
                initial={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15, transition: { duration: 0.2, ease: "easeOut" } }}
                className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-12 pb-16 md:pb-24 pt-28"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end w-full">
                  
                  {/* Left Column: Masked Typography */}
                  <div className="flex flex-col max-w-xl text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.15] mb-4">
                      {titleLines.map((line, idx) => (
                        <span key={idx} className="block overflow-hidden relative pb-1">
                          <motion.span
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.7, delay: 0.08 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="block"
                          >
                            {line}
                          </motion.span>
                        </span>
                      ))}
                    </h1>
                    
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.28 }}
                      className="w-16 h-[1px] bg-white/30 my-2 origin-left"
                    />
                    
                    <div className="overflow-hidden mt-2">
                      <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.32 }}
                        className="text-zinc-300 text-sm md:text-base font-light leading-relaxed tracking-wide"
                      >
                        Your premium off-the-grid staycation. Swap the city noise for a cozy cabin retreat surrounded by the wild.
                      </motion.p>
                    </div>
                  </div>

                  {/* Right Column: Interactive CTA Button */}
                  <div className="flex justify-start md:justify-end">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      whileHover="hover"
                      className="relative flex items-center justify-between bg-white text-zinc-950 font-medium text-base pl-6 pr-2 py-2.5 rounded-full shadow-2xl min-w-[180px] overflow-hidden group"
                    >
                      <span className="relative z-10">Explore</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <motion.div 
                        variants={{ hover: { x: 4, scale: 1.02 } }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white ml-4 shadow-md"
                      >
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.div>
                    </motion.button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.section>
      </div>
    </div>
  );
}