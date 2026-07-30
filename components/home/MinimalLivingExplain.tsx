'use client';

import { ReactNode, useRef } from 'react';

interface LivingSection {
  id: number;
  imageSrc: string;
  label: string;
  text: ReactNode;
}

const LIVING_SECTIONS: LivingSection[] = [
  {
    id: 1,
    imageSrc: '/images/deck-1.jpg',
    label: '01 / Space',
    text: <>This is where <br /> you'll live</>,
  },
  {
    id: 2,
    imageSrc: '/images/deck-2.jpg',
    label: '02 / Morning',
    text: <>Here you'll start <br /> your day</>,
  },
  {
    id: 3,
    imageSrc: '/images/deck-3.jpg',
    label: '03 / Gather',
    text: <>This is where <br /> you'll gather</>,
  },
  {
    id: 4,
    imageSrc: '/images/deck-4.jpg',
    label: '04 / Unwind',
    text: <>Here you'll sit <br /> and unwind</>,
  },
];

export default function MinimalLivingExplain() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Manual scroll helper buttons for desktop users
  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = 400;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full bg-white py-16 md:py-24 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-8">
        
        {/* Header Action Control Bar */}
        <div className="w-full flex items-end justify-between border-b border-zinc-100 pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold">
              The Experience
            </span>
            <h2 className="text-2xl font-normal text-zinc-950 tracking-tight">
              Life at WOW Cabin
            </h2>
          </div>

          {/* Desktop Only Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => scrollSlider('left')}
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center bg-transparent text-zinc-800 transition-colors hover:bg-zinc-50 hover:border-zinc-300"
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={() => scrollSlider('right')}
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center bg-transparent text-zinc-800 transition-colors hover:bg-zinc-50 hover:border-zinc-300"
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Slider Canvas */}
        <div 
          ref={sliderRef}
          className="w-full flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory overflow-y-hidden pb-4 pt-2 -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {LIVING_SECTIONS.map((section) => (
            <div 
              key={section.id}
              className="flex-none w-[80vw] sm:w-[50vw] md:w-[320px] lg:w-[360px] snap-start snap-always group flex flex-col"
            >
              {/* Image Frame Wrapper */}
              <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-zinc-50 border border-zinc-200/60 shadow-sm">
                <img
                  src={section.imageSrc}
                  alt={section.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
              </div>

              {/* Minimalist Typographic Meta Block */}
              <div className="mt-4 px-1 text-left">
                <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-400 font-semibold block mb-1">
                  {section.label}
                </span>
                <h3 className="text-lg font-normal text-zinc-950 leading-snug tracking-tight">
                  {section.text}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}