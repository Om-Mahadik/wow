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

export default function FeaturedCabinSection({
  slug = 'wow-cabin-panshet',
  imageSrc = '/images/deck-1.jpg',
  name = 'WOW Cabin',
  location = 'Panshet, Maharashtra',
  pricePerNight = 4250,
  maxGuests = 4,
}: FeaturedCabinProps) {
  const formattedPrice = new Intl.NumberFormat('en-IN').format(pricePerNight);

  const airbnbCabins = [
    {
      name: "WOW Cabin 01",
      location: "Velhe, Maharashtra",
      rating: "4.92",
      reviews: "43",
      image: "/images/deck-1.jpg",
      url: "https://www.airbnb.co.in/rooms/1232353131595460643",
    },
    {
      name: "WOW Cabin 02",
      location: "Velhe, Maharashtra",
      rating: "4.89",
      reviews: "69",
      image: "/images/deck-2.jpg",
      url: "https://www.airbnb.co.in/rooms/1233873689915292788",
    },
  ];

  return (
    <div className="w-full bg-white py-16 md:py-20 select-none">
      {/* Container set strictly to 80% of screen viewport width */}
      <div className="w-[80vw] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* COMBINED LEFT PANEL: Headline, Copy, Primary CTA & Integrated Airbnb Cards */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          
          {/* 1. Text & Information Block (Centered on mobile, Left-aligned on tablet/desktop) */}
          <div className="flex flex-col space-y-4 items-center text-center md:items-start md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 leading-[1.1]">
              Escape to nature, <br />
              stay in style.
            </h2>

            <p className="text-sm md:text-base text-zinc-600 font-light leading-relaxed max-w-xl">
              Our twin cabins are architecturally designed to offer complete privacy, untouched lake tranquility, and authentic timber design. Fully equipped for an immersive glamping experience near the city.
            </p>

            <div className="pt-2">
              <Link
                href="/cabin"
                className="inline-flex items-center justify-center gap-3 py-3.5 px-6 bg-zinc-950 text-white rounded-2xl text-xs font-semibold tracking-wide transition-all hover:bg-zinc-800 active:scale-95 shadow-md group"
              >
                <span>Explore Full Details</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
              </Link>
            </div>
          </div>

          {/* 2. Embedded Airbnb Booking Bar */}
          <div className="flex flex-col space-y-3 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 text-center md:text-left">
              Direct Airbnb Booking Portals
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {airbnbCabins.map((cabin, i) => (
                <a
                  key={i}
                  href={cabin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center p-3.5 rounded-[22px] bg-white border border-zinc-200/80 hover:border-zinc-300 hover:shadow-[0_10px_28px_-10px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  {/* Small Square Thumbnail */}
                  <div className="relative w-16 h-16 rounded-[16px] overflow-hidden shrink-0 bg-zinc-100 border border-zinc-100">
                    <img
                      src={cabin.image}
                      alt={cabin.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1 left-1 bg-zinc-950/80 backdrop-blur-xs p-0.5 rounded-full shadow-2xs">
                      <AirbnbIcon className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>

                  {/* Info Block */}
                  <div className="ml-3.5 flex-1 flex flex-col justify-center min-w-0 text-left">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-400">
                      Book Listing
                    </span>

                    <h4 className="text-sm font-semibold text-zinc-950 tracking-tight mt-0.5 group-hover:text-zinc-600 transition-colors truncate">
                      {cabin.name}
                    </h4>

                    {/* Rating & Review */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
                      <div className="flex items-center gap-1 text-zinc-900 font-semibold text-[11px]">
                        <StarIcon />
                        <span>{cabin.rating}</span>
                      </div>
                      <span className="text-zinc-300">•</span>
                      <span className="text-zinc-400 font-light text-[11px]">({cabin.reviews})</span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="w-7 h-7 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-700 group-hover:bg-zinc-950 group-hover:text-white group-hover:border-zinc-950 transition-all duration-300 shrink-0 ml-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: Original Featured Property Card with "View Details" Button */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
          <div className="w-full max-w-[420px]">
            <Link 
              href={`/cabin`} 
              className="group block w-full bg-white rounded-[32px] p-4 md:p-5 border border-zinc-200/60 shadow-[0_12px_38px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_16px_44px_-8px_rgba(0,0,0,0.12)] hover:border-zinc-300"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/4] rounded-[24px] overflow-hidden bg-zinc-100 border border-zinc-100/50">
                <img
                  src={imageSrc}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
              </div>

              {/* Card Details */}
              <div className="mt-5 px-1 flex flex-col gap-1 text-left">
                
                <div className="flex items-center justify-between text-[11px] tracking-wider text-zinc-400 uppercase font-semibold">
                  <span>{location}</span>
                  
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

                <h3 className="text-xl font-normal text-zinc-950 tracking-tight leading-snug mt-1 group-hover:text-zinc-700 transition-colors">
                  {name}
                </h3>

                {/* Bottom Price Panel */}
                <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">From</span>
                    <span className="text-2xl font-normal text-zinc-950 tracking-tight mt-0.5">
                      ₹{formattedPrice} <span className="text-xs text-zinc-400 font-light tracking-normal">/ night</span>
                    </span>
                  </div>

                  {/* "View Details" Pill Button */}
                  <div className="py-2.5 px-4 rounded-full bg-zinc-950 text-white text-xs font-medium tracking-wide flex items-center gap-1.5 transition-colors group-hover:bg-zinc-800 shadow-xs">
                    <span>View Details</span>
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-0.5"
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

      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function AirbnbIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current shrink-0`} viewBox="0 0 32 32">
      <path d="M16 1c-2.007 0-3.612 1.2-4.498 3.142l-9.865 19.57c-.604 1.258-.657 2.685-.145 3.966C2.003 28.96 3.09 29.837 4.393 30h23.213c1.304-.163 2.39-.107 2.902-1.322.512-1.28.46-2.708-.145-3.966L20.498 4.143C19.612 2.2 18.007 1 16 1zm0 3c.993 0 1.812.632 2.247 1.583l9.866 19.563c.277.577.303 1.154.075 1.72-.228.568-.748 1.05-1.402 1.134H5.214c-.655-.084-1.174-.566-1.402-1.134-.228-.566-.202-1.143.075-1.72l9.866-19.563C14.188 4.632 15.007 4 16 4zm0 9c-2.206 0-4 1.794-4 4 0 1.722 1.096 3.176 2.622 3.738L16 22.868l1.378-2.13C18.904 20.176 20 18.722 20 17c0-2.206-1.794-4-4-4zm0 2c1.106 0 2 .894 2 2 0 .74-.403 1.377-1.002 1.71L16 20.264l-.998-1.553C14.403 18.378 14 17.74 14 17c0-1.106.894-2 2-2z"/>
    </svg>
  );
}