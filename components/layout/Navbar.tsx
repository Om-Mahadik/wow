"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    // The main header wrapper now hides completely on mobile ('hidden sm:block')
    <header className="hidden sm:block w-full bg-white relative z-50 px-4 md:px-12 py-6">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Left Side: Exact Brand Capsule Canopy Module */}
        {/* Flat left edge, fully rounded right capsule tip, cuts right into the edge margin */}
        <Link 
          href="/" 
          className="flex items-center bg-black rounded-r-full pl-8 pr-10 py-3.5 -ml-4 md:-ml-12 overflow-hidden transition-opacity hover:opacity-95"
        >
          <div className="relative w-28 h-10 md:w-32 md:h-11">
            <Image
              src="/brand/black-bg-logo.png"
              alt="Wind Over Waters"
              fill
              className="object-contain object-center scale-110"
              priority
            />
          </div>
        </Link>

        {/* Center Navigation Pill Container (Visible on medium devices and up) */}
        <nav className="hidden md:flex items-center bg-[#f4f4f5] rounded-full px-10 py-4 gap-10">
          <Link href="/" className="text-sm font-medium text-zinc-950 hover:opacity-60 transition-opacity">Home</Link>
          <Link href="/gallery" className="text-sm font-medium text-zinc-950 hover:opacity-60 transition-opacity">Gallery</Link>
          <Link href="/about" className="text-sm font-medium text-zinc-950 hover:opacity-60 transition-opacity">About</Link>
          <Link href="/faqs" className="text-sm font-medium text-zinc-950 hover:opacity-60 transition-opacity">FAQs</Link>
          <Link href="/contact" className="text-sm font-medium text-zinc-950 hover:opacity-60 transition-opacity">Contact</Link>
        </nav>

        {/* Right Side: Exact Book Now Capsule CTA (Visible on medium devices and up) */}
        <div className="hidden md:block">
          <Link 
            href="/book" 
            className="inline-flex h-14 px-9 items-center justify-center rounded-full bg-black text-white text-sm font-medium tracking-wide transition-all hover:bg-zinc-900 active:scale-[0.98]"
          >
            Book Now
          </Link>
        </div>

      </div>
    </header>
  );
}