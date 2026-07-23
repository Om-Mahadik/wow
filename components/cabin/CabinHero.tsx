"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/deck-1.jpg",
  "/images/deck-2.jpg",
  "/images/deck-3.jpg",
  "/images/deck-4.jpg",
  "/images/deck-5.jpg",
];

export default function CabinHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    const openTimer = setTimeout(() => {
      setIsOpened(true);
    }, 600);

    return () => {
      clearInterval(timer);
      clearTimeout(openTimer);
    };
  }, []);

  // Using 'as const' fixes the TypeScript definition error for the ease array
  const smoothDrawerEase = [0.25, 1, 0.5, 1] as const;

  return (
    // Pure white background container
    <div className="w-full flex justify-center bg-white select-none">
      {/* Fixed: Removed height animation from wrapper to kill the dead zone spacing below */}
      <div className="w-full md:max-w-[80vw] flex flex-col items-center justify-start px-4 md:px-0">
        <motion.section 
          animate={{
            height: isOpened ? "48vh" : "80px",
            borderRadius: isOpened ? "24px" : "9999px",
          }}
          transition={{ 
            duration: 1.8, 
            ease: smoothDrawerEase
          }}
          className="w-full relative overflow-hidden bg-zinc-950 shadow-sm origin-top mt-4"
        >
          {/* Background Slider */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={images[currentIndex]}
                  alt="Wind over Waters"
                  fill
                  priority
                  className="object-cover"
                  sizes="80vw"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          </div>

          {/* Content Layout Split */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-10 text-white">
            <div className="w-full flex items-end justify-between">
              
              {/* Left Side Elements */}
              <div className="flex flex-col overflow-hidden">
                <motion.h1 
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: isOpened ? 1 : 0, y: isOpened ? 0 : 24 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: smoothDrawerEase }}
                  className="text-xl md:text-3xl font-bold tracking-tight"
                >
                  Wind over Waters
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: isOpened ? 0.8 : 0, y: isOpened ? 0 : 16 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: smoothDrawerEase }}
                  className="flex items-center gap-1 text-xs font-light text-zinc-300 tracking-wider uppercase mt-1"
                >
                  <span>📍</span>
                  <span>Panshet, MH</span>
                </motion.div>
              </div>
              
              {/* Right Side Elements */}
              <div className="flex items-center text-xs font-medium tracking-widest uppercase text-zinc-200 overflow-hidden">
                <motion.span 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ 
                    opacity: isOpened ? 1 : 0, 
                    y: isOpened ? 0 : 20,
                    scale: isOpened ? 1 : 0.9 
                  }}
                  transition={{ duration: 0.8, delay: 0.8, ease: smoothDrawerEase }}
                  className="text-amber-400 font-bold bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm block"
                >
                  4.7 ★
                </motion.span>
              </div>

            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}