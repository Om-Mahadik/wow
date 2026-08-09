"use client";

import React from 'react';
import { motion } from "framer-motion";

interface Founder {
  name: string;
  role: string;
  bioText: React.ReactNode;
}

const foundersData: Founder[] = [
  {
    name: "Amruta Deshpande",
    role: "Architect",
    bioText: (
      <>
        Amruta Deshpande is an architect and founder of DnC and{" "}
        <a 
          href="https://thecoon.co" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-normal text-zinc-900 underline underline-offset-4 hover:text-zinc-600 transition-colors duration-300"
        >
          The Coon Co.
        </a>
        . With a bachelor's in architecture from the University of Pune and a master's in construction management from Texas A&M University, she brings over a decade of experience integrating design and construction into sensible, inclusive architecture. Her recent work includes portable, prefab tiny homes at The Coon Co. An avid traveler, Amruta is driven by a passion for creating spaces that uplift the soul.
      </>
    )
  },
  {
    name: "Harshvardhan Rane",
    role: "Hindi Film Actor",
    bioText: "Harshvardhan Rane is a Hindi film actor, best known for Sanam Teri Kasam. A devoted nature lover, he became India's first actor to own and live in a campervan, drawn to a life of freedom, the outdoors, and staying connected to the earth. That same longing for wild, unchained spaces is what he's poured into Wind Over Waters alongside Amruta."
  }
];

export default function Founders() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  // Header Reveal Elements
  const headerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: smoothEase } 
    },
  };

  // Upward Drift Reveal for Text Cards
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: smoothEase,
        delay: index * 0.15,
      },
    }),
  };

  return (
    <section className="w-full bg-white select-none py-24 overflow-hidden flex flex-col items-center">
      
      {/* HEADER SECTION */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center flex flex-col items-center space-y-3 mb-16 md:mb-20 px-4"
      >
        <motion.span 
          variants={headerVariants} 
          className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]"
        >
          The Team
        </motion.span>
        <motion.h2 
          variants={headerVariants} 
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.15] max-w-2xl transform-gpu"
        >
          Meet Our Founders.
        </motion.h2>
      </motion.div>

      {/* FOUNDERS GRID */}
      <div className="w-full max-w-5xl mx-auto px-6 grid gap-12 md:grid-cols-2 md:gap-16 items-start">
        {foundersData.map((founder, index) => (
          <motion.div
            key={founder.name}
            custom={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariants}
            className="flex flex-col space-y-4 p-8 rounded-[32px] bg-zinc-50/60 border border-zinc-100"
          >
            {/* Profile Info Details */}
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-950">
                {founder.name}
              </h3>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest pt-1">
                {founder.role}
              </p>
            </div>

            {/* Typography */}
            <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed tracking-wide pt-2">
              {founder.bioText}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}