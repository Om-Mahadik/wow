'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll timeline specifically over this component frame
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out raw scroll physics using dampening springs
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  // Kinetic Transform Maps
  const textScale = useTransform(smoothProgress, [0, 0.45], [0.92, 1]);
  const textSkewX = useTransform(smoothProgress, [0, 0.45], [-6, 0]);
  const textRotateY = useTransform(smoothProgress, [0, 0.45], [8, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.35], [0, 1]);

  const text = "Guess what? This cozy glass cabin in the Panshet forest is the ultimate nature stay. No city noise, just slow mornings, stars, and quiet vibes. The perfect reset.";
  const words = text.split(" ");

  return (
    <section 
      ref={containerRef}
      // FIXED: Set vertical padding (py-0) and margin (my-0) to absolute zero to delete all empty space gaps
      className="relative w-full flex items-center justify-center bg-white py-0 my-0 overflow-hidden select-none perspective-[1000px] z-20"
    >
      {/* Premium minimal background texture map */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Kinetic Text Ring */}
      <motion.div 
        style={{ 
          scale: textScale,
          skewX: textSkewX,
          rotateY: textRotateY,
          opacity: opacity
        }}
        className="relative z-10 max-w-4xl w-full mx-auto px-6 text-center transform-gpu"
      >
        {/* REMOVED: Upper badge label component */}

        {/* Dynamic Word Masking Grid */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 leading-[1.35] md:leading-[1.45] flex flex-wrap justify-center gap-x-3 gap-y-2.5">
          {words.map((word, i) => {
            // Sequential reveal calculations for that wave-like entrance
            const wordStart = (i / words.length) * 0.3;
            const wordEnd = wordStart + 0.12;
            
            // Words lift up organically from the baseline as you arrive
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const yOffset = useTransform(smoothProgress, [wordStart, wordEnd], [20, 0]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const wordOpacity = useTransform(smoothProgress, [wordStart, wordEnd], [0.15, 1]);

            return (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span 
                  style={{ 
                    y: yOffset,
                    opacity: wordOpacity 
                  }}
                  className="block transform-gpu origin-bottom font-sans text-zinc-900"
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </h2>
      </motion.div>
    </section>
  );
}