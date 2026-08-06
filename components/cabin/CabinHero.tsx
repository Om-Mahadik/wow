"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    id: "deck",
    category: "Deck",
    subtitle: "Beautiful Deck to enjoy the Nature View",
    images: [
      { id: "deck-1", src: "/images/deck/deck-1.avif" },
      { id: "deck-2", src: "/images/deck/deck-2.avif" },
      { id: "deck-3", src: "/images/deck/deck-3.jpg" },
      { id: "deck-4", src: "/images/deck/deck-4.jpg" },
      { id: "deck-5", src: "/images/deck/deck-5.jpg" },
      { id: "deck-6", src: "/images/deck/deck-6.jpg" },
      { id: "deck-7", src: "/images/deck/deck-7.jpg" },
      { id: "deck-8", src: "/images/deck/deck-8.heic" },
    ],
  },
  {
    id: "kitchen",
    category: "Kitchen",
    subtitle: "Modern Kitchen for Culinary Delights",
    images: [
      { id: "kitchen-1", src: "/images/kitchen/kitchen-1.jpg" },
      { id: "kitchen-2", src: "/images/kitchen/kitchen-2.avif" },
    ],
  },
  {
    id: "bathroom",
    category: "Bathroom",
    subtitle: "Clean & Neat Bathroom for Relaxation",
    images: [
      { id: "bathroom-1", src: "/images/bathroom/bathroom-1.jpg" },
      { id: "bathroom-2", src: "/images/bathroom/bathroom-2.jpg" },
      { id: "bathroom-3", src: "/images/bathroom/bathroom-3.png" },
    ],
  },
  {
    id: "external",
    category: "External",
    subtitle: "Beautiful External Spaces for Entertainment",
    images: [
      { id: "external-1", src: "/images/external/external-1.avif" },
      { id: "external-2", src: "/images/external/external-2.jpg" },
      { id: "external-3", src: "/images/external/external-3.jpg" },
      { id: "external-4", src: "/images/external/external-4.avif" },
      { id: "external-5", src: "/images/external/external-5.jpg" },
      { id: "external-6", src: "/images/external/external-6.jpg" },
      { id: "external-7", src: "/images/external/external-7.jpg" },
      { id: "external-8", src: "/images/external/external-8.avif" },
    ],
  },
  {
    id: "cabin",
    category: "Cabin",
    subtitle: "Cozy Cabin for Relaxation",
    images: [
      { id: "cabin-1", src: "/images/cabin/cabin-1.avif" },
      { id: "cabin-2", src: "/images/cabin/cabin-2.jpg" },
      { id: "cabin-3", src: "/images/cabin/cabin-3.jpg" },
      { id: "cabin-4", src: "/images/cabin/cabin-4.jpg" },
      { id: "cabin-5", src: "/images/cabin/cabin-5.jpg" },
      { id: "cabin-6", src: "/images/cabin/cabin-6.jpg" },
    ],
  },
  {
    id: "parking",
    category: "Parking",
    subtitle: "Spacious Parking for Your Vehicle",
    images: [
      { id: "parking-1", src: "/images/parking/parking-1.avif" },
      { id: "parking-2", src: "/images/parking/parking-2.heic" },
      { id: "parking-3", src: "/images/parking/parking-3.avif" },
    ],
  },
];

// Extract all image paths from the categories object
const images = categories.flatMap((cat) => cat.images.map((img) => img.src));

export default function CabinHero() {
  const [isOpened, setIsOpened] = useState(false);

  // Desktop active indices for 3 slots
  const [activeIndices, setActiveIndices] = useState([0, 1, 2]);
  // Keeps track of which of the 3 desktop slots will update next
  const [activeSlot, setActiveSlot] = useState(0);

  useEffect(() => {
    // Initial reveal drawer timer
    const openTimer = setTimeout(() => {
      setIsOpened(true);
    }, 600);

    // Rotate ONE image at a time across slots 0 -> 1 -> 2 using a random image
    const interval = setInterval(() => {
      setActiveIndices((prev) => {
        const next = [...prev];
        let randIndex: number;

        // Select a random image index that is not currently visible in any slot
        do {
          randIndex = Math.floor(Math.random() * images.length);
        } while (next.includes(randIndex));

        next[activeSlot] = randIndex;
        return next;
      });

      // Move to next slot for the subsequent update cycle
      setActiveSlot((prev) => (prev + 1) % 3);
    }, 3500);

    return () => {
      clearTimeout(openTimer);
      clearInterval(interval);
    };
  }, [activeSlot]);

  const smoothDrawerEase = [0.25, 1, 0.5, 1] as const;

  return (
    <div className="w-full flex justify-center bg-white select-none">
      <div className="w-full md:max-w-[80vw] flex flex-col items-center justify-start px-4 md:px-0">
        <motion.section
          animate={{
            height: isOpened ? "48vh" : "80px",
            borderRadius: isOpened ? "24px" : "9999px",
          }}
          transition={{
            duration: 1.8,
            ease: smoothDrawerEase,
          }}
          className="w-full relative overflow-hidden bg-zinc-950 shadow-sm origin-top mt-4"
        >
          {/* Background Container */}
          <div className="absolute inset-0 z-0 flex">
            {/* Mobile Single Image Layout */}
            <div className="relative w-full h-full md:hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndices[0]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={images[activeIndices[0]]}
                    alt="Wind over Waters"
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                    sizes="100vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop 3-Column Grid Layout with Glass Dividers */}
            <div className="hidden md:grid grid-cols-3 w-full h-full relative">
              {activeIndices.map((imgIndex, slotIndex) => (
                <div key={slotIndex} className="relative w-full h-full overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={imgIndex}
                      initial={{ opacity: 0, x: 20, scale: 1.05 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.95 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={images[imgIndex]}
                        alt={`Wind over Waters ${slotIndex + 1}`}
                        fill
                        priority
                        unoptimized
                        className="object-cover"
                        sizes="30vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Vertical Frosted Glass Dividers (Between Slot 0|1 and 1|2) */}
                  {slotIndex < 2 && (
                    <div className="absolute right-0 top-0 bottom-0 z-10 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent backdrop-blur-sm shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
                  )}
                </div>
              ))}
            </div>

            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
          </div>

          {/* Content Layout Split */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-10 text-white pointer-events-none">
            <div className="w-full flex items-end justify-between">
              {/* Left Side Elements */}
              <div className="flex flex-col overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: isOpened ? 1 : 0, y: isOpened ? 0 : 24 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: smoothDrawerEase }}
                  className="text-xl md:text-3xl font-bold tracking-tight"
                >
                  Wind over Waters
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: isOpened ? 0.8 : 0, y: isOpened ? 0 : 16 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: smoothDrawerEase }}
                  className="flex items-center gap-1 text-xs font-light text-zinc-300 tracking-wider uppercase mt-1"
                >
                  <span>📍</span>
                  <span>Panshet, MH</span>
                </motion.div>
              </div>

              {/* Right Side Elements */}
              <div className="flex items-center text-xs font-medium tracking-widest uppercase text-zinc-200 overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{
                    opacity: isOpened ? 1 : 0,
                    y: isOpened ? 0 : 20,
                    scale: isOpened ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.8, delay: 0.8, ease: smoothDrawerEase }}
                  className="text-amber-400 font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm block"
                >
                  4.7 ★
                </motion.span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}