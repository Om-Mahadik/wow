'use client';

import { useRef } from 'react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  stayDate: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "An incredible escape from the city. The design of the tiny cabins is genius—everything you need with a panoramic view of the backwaters. Waking up to the mist over the lake is something we won't forget.",
    author: "Rahul Mehta",
    role: "Mumbai",
    stayDate: "Dec 2025",
  },
  {
    id: 2,
    quote: "Total silence, pure wilderness, and an incredibly stylish setup. The self check-in was seamless, and cooking breakfast in the outdoor kitchenette while birdwatching was the perfect disconnect.",
    author: "Ananya Iyer",
    role: "Pune",
    stayDate: "Oct 2025",
  },
  {
    id: 3,
    quote: "The Coon cabins are architectural masterpieces. It feels like high-end glamping but completely isolated in nature. Following the bridge directions carefully was key, and the payoff was absolute peace.",
    author: "Vikram & Sneha",
    role: "Bangalore",
    stayDate: "Jan 2026",
  },
];

export default function TestimonialsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const offset = sliderRef.current.offsetWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 select-none overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Section Title Area */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full lg:sticky lg:top-24">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.2em] block">
              Guest Stories
            </span>
            <h2 className="text-2xl md:text-3xl font-normal text-zinc-950 tracking-tight leading-tight">
              Life at the backwaters
            </h2>
          </div>

          {/* Minimal Navigation Arrows */}
          <div className="hidden lg:flex items-center gap-2 mt-12">
            <button
              onClick={() => handleScroll('left')}
              className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center bg-transparent text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
              aria-label="Previous testimonial"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center bg-transparent text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
              aria-label="Next testimonial"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Minimal Slide Canvas */}
        <div className="lg:col-span-8 relative w-full overflow-visible">
          <div
            ref={sliderRef}
            className="w-full flex gap-8 md:gap-12 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 -mx-6 px-6 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: 'none' }}
          >
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="flex-none w-[80vw] sm:w-[55vw] md:w-[400px] snap-start snap-always flex flex-col justify-between pt-2 text-left"
              >
                {/* Clean, open typographic quote */}
                <p className="text-base md:text-lg font-light text-zinc-800 tracking-tight leading-relaxed mb-6">
                  “{item.quote}”
                </p>

                {/* Footer Signature */}
                <div className="flex items-baseline justify-between border-t border-zinc-100 pt-4 mt-auto">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-medium text-zinc-950 tracking-tight">
                      {item.author}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-normal">
                      • {item.role}
                    </span>
                  </div>
                  
                  <span className="text-[11px] text-zinc-400 font-light tracking-normal">
                    {item.stayDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}