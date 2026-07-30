"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    // Changed to 'absolute top-0 left-0 bg-transparent' so it floats over the actual content
    // Changed 'py-6' to 'py-4' to make the layout thinner
    <header className="hidden sm:block absolute top-0 left-0 w-full bg-transparent z-50 px-4 md:px-12 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Left Side: Exact Brand Capsule Canopy Module */}
        {/* Made padding slightly smaller (py-3.5 to py-2.5) for a slimmer footprint */}
        <Link 
          href="/" 
          className="flex items-center bg-black rounded-r-full pl-8 pr-10 py-2.5 -ml-4 md:-ml-12 overflow-hidden transition-opacity hover:opacity-95 shadow-md"
        >
          {/* Sized down width and height slightly for a smaller logo container */}
          <div className="relative w-24 h-9 md:w-28 md:h-10">
            <Image
              src="/brand/black-bg-logo.png"
              alt="Wind Over Waters"
              fill
              className="object-contain object-center scale-110"
              priority
            />
          </div>
        </Link>

        {/* Center Navigation Pill Container */}
        {/* Made padding thinner (py-4 to py-2.5) and added an elegant low-opacity white blur background */}
        <nav className="hidden md:flex items-center bg-white/20 backdrop-blur-md rounded-full px-8 py-2.5 gap-8 border border-white/10 shadow-sm">
          <Link href="/" className="text-xs font-medium text-white hover:opacity-70 transition-opacity">Home</Link>
          <Link href="/gallery" className="text-xs font-medium text-white hover:opacity-70 transition-opacity">Gallery</Link>
          <Link href="/about" className="text-xs font-medium text-white hover:opacity-70 transition-opacity">About</Link>
          <Link href="/faqs" className="text-xs font-medium text-white hover:opacity-70 transition-opacity">FAQs</Link>
          <Link href="/contact" className="text-xs font-medium text-white hover:opacity-70 transition-opacity">Contact</Link>
        </nav>

        {/* Right Side: Exact Book Now Capsule CTA */}
        {/* Trimmed height down from h-14 to h-11 and text down to text-xs */}
        <div className="hidden md:block">
          <Link 
            href="/book" 
            className="inline-flex h-11 px-7 items-center justify-center rounded-full bg-white text-zinc-950 text-xs font-semibold tracking-wide transition-all hover:bg-zinc-200 active:scale-[0.98] shadow-md"
          >
            Book Now
          </Link>
        </div>

      </div>
    </header>
  );
}