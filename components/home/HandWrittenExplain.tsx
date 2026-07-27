'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Just_Me_Again_Down_Here } from 'next/font/google';

const handwrittenFont = Just_Me_Again_Down_Here({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface DeckSection {
  id: number;
  imageSrc: string;
  text: ReactNode;
  rotationClass: string;
  arrowWrapper: string;
  viewBox: string;
  pathD: string;
  headD: string;
  strokeColor: string;
}

const DECK_SECTIONS: DeckSection[] = [
  {
    id: 1,
    imageSrc: '/images/deck-1.jpg',
    text: <>This will be <br /> Your Destination</>,
    rotationClass: "lg:rotate-[1deg] lg:pt-12",
    arrowWrapper: "absolute -right-2 sm:-right-4 lg:-right-4 -top-32 w-44 h-44",
    viewBox: "0 0 160 160",
    pathD: "M 20 140 C 130 140, 150 70, 60 55",
    headD: "M 75 65 L 56 54 L 70 42",
    strokeColor: "stroke-[#FBBF24]"
  },
  {
    id: 2,
    imageSrc: '/images/deck-2.jpg',
    text: <>You'll Stay <br /> in this</>,
    rotationClass: "lg:rotate-[-1deg] lg:pt-0",
    arrowWrapper: "absolute -right-6 sm:-right-8 lg:-right-8 -top-36 w-48 h-48",
    viewBox: "0 0 160 160",
    pathD: "M 20 130 C 140 130, 160 40, 80 35",
    headD: "M 92 45 L 76 34 L 88 22",
    strokeColor: "stroke-[#FBBF24]"
  },
  {
    id: 3,
    imageSrc: '/images/deck-3.jpg',
    text: <>Here you'll stand, <br /> Enjoy the View</>,
    rotationClass: "lg:rotate-[2deg] lg:pt-24",
    arrowWrapper: "absolute -left-4 sm:-left-12 lg:-left-12 -top-24 w-40 h-40",
    viewBox: "0 0 140 140",
    pathD: "M 110 120 C 10 120, -10 60, 45 45",
    headD: "M 32 55 L 48 44 L 40 28",
    strokeColor: "stroke-[#FBBF24]"
  },
  {
    id: 4,
    imageSrc: '/images/deck-4.jpg',
    text: <>This is where <br /> you'll sleep</>,
    rotationClass: "lg:rotate-[-1.5deg] lg:pt-4",
    arrowWrapper: "absolute right-0 sm:-right-12 lg:-right-12 -top-28 w-44 h-44",
    viewBox: "0 0 160 160",
    pathD: "M 10 100 C 70 110, 120 110, 100 45",
    headD: "M 110 56 L 98 42 L 88 52",
    strokeColor: "stroke-zinc-900" 
  },
];

export default function HandWrittenExplain() {
  return (
    <div className="w-full px-6 md:px-8 lg:px-12 py-16 lg:py-24 bg-white select-none overflow-visible">
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col items-center lg:grid lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-28 lg:gap-y-36 w-full max-w-[400px] md:max-w-[600px] lg:max-w-[1600px] mx-auto"
      >
        {DECK_SECTIONS.map((section) => (
          <motion.section 
            key={section.id} 
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
            }}
            className={`relative flex flex-col w-full text-center lg:text-left ${section.rotationClass}`}
          >
            {/* Card Frame Wrapper */}
            <motion.div 
              whileHover={{ scale: 1.02, rotate: section.id % 2 === 0 ? 0.5 : -0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full aspect-[3/4] rounded-[36px] overflow-hidden shadow-lg bg-gray-100 z-0 cursor-pointer"
            >
              <img
                src={section.imageSrc}
                alt={`Deck view section ${section.id}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Content Text Block Container */}
            <div className="relative w-full mt-6 min-h-[90px] px-2">
              
              {/* Dynamic SVGs mapped directly to the parent borders */}
              <div className={`${section.arrowWrapper} pointer-events-none z-20 overflow-visible`}>
                <svg
                  viewBox={section.viewBox}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-full h-full ${section.strokeColor}`} 
                  style={{ strokeWidth: 2.75, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                >
                  <motion.path 
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      show: { pathLength: 1, opacity: 1, transition: { delay: 0.5, duration: 0.9, ease: 'easeInOut' } }
                    }} 
                    d={section.pathD} 
                  />
                  <motion.path 
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      show: { pathLength: 1, opacity: 1, transition: { delay: 0.5, duration: 0.9, ease: 'easeInOut' } }
                    }} 
                    d={section.headD} 
                  />
                </svg>
              </div>

              {/* Text rendering block matching handwriting scale preferences */}
              <h2 
                className={`${handwrittenFont.className} text-4xl lg:text-[28px] xl:text-[34px] 2xl:text-[38px] text-zinc-900 leading-tight tracking-wide lg:pl-2`}
              >
                {section.text}
              </h2>
            </div>
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
}