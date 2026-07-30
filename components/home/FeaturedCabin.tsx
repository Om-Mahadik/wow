'use client';

import Link from 'next/link';

interface FeaturedCabinProps {
  slug?: string;
  imageSrc?: string;
  name?: string;
  location?: string;
  pricePerNight?: number;
  maxGuests?: number;
}

export default function FeaturedCabin({
  slug = 'wow-cabin-panshet',
  imageSrc = '/images/deck-1.jpg',
  name = 'WOW Cabin',
  location = 'Panshet, Maharashtra',
  pricePerNight = 4250,
  maxGuests = 4,
}: FeaturedCabinProps) {
  
  const formattedPrice = new Intl.NumberFormat('en-IN').format(pricePerNight);

  return (
    <div className="w-full bg-white py-16 px-4 select-none">
      <div className="max-w-[380px] mx-auto">
        <Link 
          href={`/cabin`} 
          className="group block w-full bg-white rounded-[32px] p-4 border border-zinc-200/60 shadow-[0_12px_38px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_16px_44px_-8px_rgba(0,0,0,0.12)] hover:border-zinc-300"
        >
          {/* 1. Image Block Container */}
          <div className="relative w-full aspect-[4/4] rounded-[24px] overflow-hidden bg-zinc-100 border border-zinc-100/50">
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              loading="lazy"
            />
          </div>

          {/* 2. Text Details Area */}
          <div className="mt-5 px-1 flex flex-col gap-1">
            
            {/* Meta tags line */}
            <div className="flex items-center justify-between text-[11px] tracking-wider text-zinc-400 uppercase font-semibold">
              <span>{location}</span>
              
              {/* Clean Inline Guest Layout */}
              <div className="flex items-center gap-1 text-zinc-400 normal-case font-medium">
                <svg 
                  className="w-3.5 h-3.5 opacity-80" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{maxGuests} Guests</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-normal text-zinc-950 tracking-tight leading-snug mt-1 group-hover:text-zinc-700 transition-colors">
              {name}
            </h3>

            {/* 3. Bottom Price Action Panel */}
            <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">From</span>
                <span className="text-2xl font-normal text-zinc-950 tracking-tight mt-0.5">
                  ₹{formattedPrice} <span className="text-xs text-zinc-400 font-light tracking-normal">/ night</span>
                </span>
              </div>

              {/* Minimal Circle Arrow Button */}
              <div className="w-10 h-10 rounded-full bg-zinc-950 text-white flex items-center justify-center transition-colors group-hover:bg-zinc-800 shadow-sm">
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>

          </div>
        </Link>
      </div>
    </div>
  );
}