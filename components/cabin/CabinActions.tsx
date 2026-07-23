"use client";

import { motion } from "framer-motion";

export default function CabinActions() {
  const smoothDrawerEase = [0.25, 1, 0.5, 1] as const;

  // Structural orchestrator variant for the button row container
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.12, // The precise gap timing between button 1 and button 2
      },
    },
  };

  // Pure incoming cinematic motion footprint
  const buttonVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scaleX: 0.95 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scaleX: 1,
      transition: { 
        duration: 1.2, 
        ease: smoothDrawerEase 
      } 
    }
  };

  return (
    <div className="w-full flex justify-center bg-white select-none mt-6">
      <motion.div 
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="w-full md:max-w-[80vw] flex items-center justify-start gap-4 px-4 md:px-0"
      >
        
        {/* Book Now Button (Solid Minimal Black) */}
        <motion.button
          variants={buttonVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 md:flex-none md:w-56 h-14 bg-zinc-950 text-white rounded-full font-medium text-sm tracking-wide shadow-sm origin-left cursor-pointer"
        >
          Book Now
        </motion.button>

        {/* Check Availability Button (Clean Light Grey) */}
        <motion.button
          variants={buttonVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 md:flex-none md:w-56 h-14 bg-zinc-100 text-zinc-900 rounded-full font-medium text-sm tracking-wide shadow-sm border border-zinc-200/40 origin-left cursor-pointer"
        >
          Check Availability
        </motion.button>

      </motion.div>
    </div>
  );
}