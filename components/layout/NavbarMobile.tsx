"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const smoothEase = [0.16, 1, 0.3, 1] as const; 

  // Dynamic destination for the Book button
  const bookNowHref =
    pathname === "/cabin"
      ? "https://www.airbnb.co.in/rooms/1233873689915292788?source_impression_id=p3_1786212915_P3nnVgfUeMWInI2U"
      : "/cabin";

  const isExternal = bookNowHref.startsWith("http");

  const rowOne = [
    { name: "Home", path: "/" },
    { name: "Cabin", path: "/cabin" }
  ];

  const rowTwo = [
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "FAQs", path: "/faqs" }
  ];

  const rowThree = [
    { name: "Contact", path: "/contact" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/legal/privacy" },
    { name: "Terms of Service", path: "/legal/terms" }
  ];

  const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.03, delayChildren: 0.05 }
    },
    exit: {
      transition: { staggerChildren: 0.02, staggerDirection: -1 }
    }
  };

  const pillVariants = {
    initial: { opacity: 0, scale: 0.96, y: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.45, ease: smoothEase } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.96, 
      y: -6, 
      transition: { duration: 0.2, ease: smoothEase } 
    }
  };

  return (
    <>
      {/* 1. Full-Screen Premium Ambient Canvas Takeover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="fixed inset-0 bg-black z-40 pointer-events-auto sm:hidden flex flex-col justify-end pb-8"
            onClick={() => setIsOpen(false)}
          >
            {/* Ambient Blurs */}
            <div className="absolute top-[-10%] right-[-10%] w-[280px] h-[280px] rounded-full bg-zinc-800/20 blur-[90px] pointer-events-none" />
            
            {/* Pushed Completely to the Bottom Layout of Black Takeover Screen */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.2, ease: smoothEase }}
              className="w-full flex items-center justify-center gap-6 px-6 z-50 mt-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  onClick={() => setIsOpen(false)}
                  href={link.path}
                  className="text-xs tracking-wide text-zinc-500 hover:text-zinc-400 font-medium transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Global Mobile Header Frame */}
      <header className="sm:hidden fixed top-4 left-0 w-full z-50 flex items-center justify-between px-0 select-none">
        
        {/* Left Side Dynamic Logo Capsule */}
        <motion.div
          animate={{
            width: isOpen ? "180px" : "150px",
            height: isOpen ? "84px" : "72px"
          }}
          transition={{
            duration: 0.5,
            ease: smoothEase
          }}
          className="bg-black rounded-r-full pl-5 pr-5 py-4 -ml-3 overflow-hidden relative z-50 shadow-lg"
        >
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="w-full h-full block relative active:scale-98 transition-transform"
          >
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
        </motion.div>

        {/* Right Side - Static Anchor Trigger & Directory Grid */}
        <div className="pr-4 relative z-50 flex flex-col items-end">
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-13 h-13 flex items-center justify-center rounded-full bg-zinc-950 text-white border border-zinc-800 relative z-50 active:scale-90 transition-transform shadow-none"
            aria-label="Toggle Layout"
          >
            {isOpen ? <X className="w-4 h-4 stroke-[2.5]" /> : (
              <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 24 24" fill="none">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          {/* Staggered Floating Rows */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute top-18 right-0 w-[85vw] max-w-[340px] flex flex-col items-end gap-3.5 pt-1 pr-3"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* ROW 1 */}
                <div className="flex items-center justify-end gap-2.5 w-full">
                  {rowOne.map((link) => (
                    <motion.div key={link.name} variants={pillVariants}>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href={link.path}
                        className="h-12 px-6 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xl font-medium rounded-full flex items-center justify-center transition-colors active:scale-95 shadow-none"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* ROW 2 */}
                <div className="flex items-center justify-end gap-2.5 w-full pr-4">
                  {rowTwo.map((link) => (
                    <motion.div key={link.name} variants={pillVariants}>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href={link.path}
                        className="h-12 px-5.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xl font-medium rounded-full flex items-center justify-center transition-colors active:scale-95 shadow-none"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* ROW 3 */}
                <div className="flex items-center justify-end gap-3 w-full">
                  {rowThree.map((link) => (
                    <motion.div key={link.name} variants={pillVariants}>
                      <Link
                        onClick={() => setIsOpen(false)}
                        href={link.path}
                        className="h-12 px-6 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xl font-medium rounded-full flex items-center justify-center transition-colors active:scale-95 shadow-none"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* High-Contrast Action Block */}
                  <motion.div variants={pillVariants}>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href={bookNowHref}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="h-12 px-6 bg-white text-black font-bold text-sm uppercase tracking-wider rounded-full flex items-center justify-center border border-white hover:bg-zinc-100 active:scale-95 transition-all shadow-none"
                    >
                      Book Stay
                    </Link>
                  </motion.div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </header>
    </>
  );
}