"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  // Dynamic destination based on current page
  const bookNowHref =
    pathname === "/cabin"
      ? "https://www.airbnb.co.in/rooms/1233873689915292788?source_impression_id=p3_1786212915_P3nnVgfUeMWInI2U"
      : "/cabin";

  const isExternal = bookNowHref.startsWith("http");

  return (
    <header className="hidden sm:block absolute top-0 left-0 w-full bg-transparent z-50 px-4 md:px-12 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand Logo Module with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link 
            href="/" 
            className="flex items-center bg-black rounded-r-full pl-8 pr-10 py-2.5 -ml-4 md:-ml-12 overflow-hidden transition-all duration-300 hover:opacity-90 shadow-md"
          >
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
        </motion.div>

        {/* Center Navigation Pill Container */}
        <motion.nav 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex items-center bg-white/10 dark:bg-black/80 backdrop-blur-md rounded-full px-8 py-2.5 gap-8 border border-white/20 dark:border-zinc-800 shadow-lg transition-all duration-500 hover:bg-black hover:border-zinc-800 group"
        >
          <Link href="/" className="text-xs font-medium text-white group-hover:text-white/90 hover:!text-white transition-colors duration-200">Home</Link>
          <Link href="/cabin" className="text-xs font-medium text-white group-hover:text-white/90 hover:!text-white transition-colors duration-200">Cabin</Link>
          <Link href="/gallery" className="text-xs font-medium text-white group-hover:text-white/90 hover:!text-white transition-colors duration-200">Gallery</Link>
          <Link href="/about" className="text-xs font-medium text-white group-hover:text-white/90 hover:!text-white transition-colors duration-200">About</Link>
          <Link href="/faqs" className="text-xs font-medium text-white group-hover:text-white/90 hover:!text-white transition-colors duration-200">FAQs</Link>
          <Link href="/contact" className="text-xs font-medium text-white group-hover:text-white/90 hover:!text-white transition-colors duration-200">Contact</Link>
        </motion.nav>

        {/* Right Side: CTA Button */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block"
        >
          <Link 
            href={bookNowHref}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex h-11 px-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold tracking-wide shadow-md transition-all duration-300 hover:bg-black hover:border-zinc-800 active:scale-[0.98]"
          >
            Book Now
          </Link>
        </motion.div>

      </div>
    </header>
  );
}