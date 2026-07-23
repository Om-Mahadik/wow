"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 'sm:hidden' keeps this layout completely isolated to mobile viewports
    <header className="sm:hidden absolute top-0 left-0 w-full z-50 flex items-center justify-between px-0 py-4 bg-transparent">
      
      {/* 1. Left Side: Refined Capsule Canopy Module shifted leftward */}
      <Link 
        href="/" 
        className="flex items-center bg-black rounded-r-full pl-5 pr-5 py-4 -ml-3 overflow-hidden shadow-lg h-[72px] w-[150px]"
      >
        {/* Logo scaled up inside the optimized capsule box */}
        <div className="relative w-full h-full">
          <Image
            src="/brand/black-bg-logo.png"
            alt="Wind Over Waters"
            fill
            className="object-contain object-center scale-125"
            priority
          />
        </div>
      </Link>

      {/* 2. Right Side: Premium White Capsule Menu Trigger */}
      <div className="pr-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-13 px-7 items-center justify-center rounded-full bg-white text-black text-sm font-semibold tracking-wide shadow-md active:scale-95 transition-transform"
        >
          Book Now
        </button>
      </div>

      {/* 3. High-End Fullscreen Overlay Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-zinc-950 text-white z-[99] flex flex-col justify-between p-8 animate-in fade-in duration-300">
          
          {/* Top of drawer: Close Header line */}
          <div className="flex items-center justify-between w-full mt-2">
            <span className="text-zinc-500 font-medium tracking-widest text-xs uppercase">Menu</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-11 h-11 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 active:scale-90 transition-transform"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Center of drawer: Clean, large navigational links */}
          <nav className="flex flex-col gap-6 font-semibold text-3xl tracking-tight my-auto pl-4">
            <Link onClick={() => setIsOpen(false)} href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
            <Link onClick={() => setIsOpen(false)} href="/gallery" className="hover:text-zinc-400 transition-colors">Gallery</Link>
            <Link onClick={() => setIsOpen(false)} href="/about" className="hover:text-zinc-400 transition-colors">About</Link>
            <Link onClick={() => setIsOpen(false)} href="/faqs" className="hover:text-zinc-400 transition-colors">FAQs</Link>
            <Link onClick={() => setIsOpen(false)} href="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
          </nav>

          {/* Bottom of drawer: Final Actions */}
          <div className="w-full flex flex-col gap-4">
            <Link
              onClick={() => setIsOpen(false)}
              href="/book"
              className="w-full h-14 flex items-center justify-center rounded-full bg-white text-black font-semibold text-base shadow-lg"
            >
              Book Now
            </Link>
            <p className="text-[10px] text-zinc-600 tracking-wider text-center uppercase mt-2">
              © 2026 Winds Over Waters
            </p>
          </div>

        </div>
      )}
    </header>
  );
}