"use client";

import { useState } from "react";
import { SlidersHorizontal, LayoutGrid, RectangleHorizontal } from "lucide-react";
import { motion, Variants } from "framer-motion";

const GALLERY_DATA = [
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
    ]
  },
  {
    id: "kitchen",
    category: "Kitchen",
    subtitle: "Modern Kitchen for Culinary Delights",
    images: [
      { id: "kitchen-1", src: "/images/kitchen/kitchen-1.jpg" },
      { id: "kitchen-2", src: "/images/kitchen/kitchen-2.avif" },
    ]
  },
  {
    id: "bathroom",
    category: "Bathroom",
    subtitle: "EClean & NeatBathroom for Relaxation",
    images: [
      { id: "bathroom-1", src: "/images/bathroom/bathroom-1.jpg" },
      { id: "bathroom-2", src: "/images/bathroom/bathroom-2.jpg" },
      { id: "bathroom-3", src: "/images/bathroom/bathroom-3.png" },
    ]
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
    ]
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
    ]
  },
  {
    id: "parking",
    category: "Parking",
    subtitle: "Spacious Parking for Your Vehicle",
    images: [
      { id: "parking-1", src: "/images/parking/parking-1.avif" },
      { id: "parking-2", src: "/images/parking/parking-2.heic" },
      { id: "parking-3", src: "/images/parking/parking-3.avif" },
    ]
  },
];

// Explicitly typing variants stops the generic string type inference error
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 35,  // Lower stiffness = slower, majestic movement
      damping: 14,    // Perfect tracking without oscillation rings
      duration: 0.9
    }
  }
};

export default function GalleryView() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"pinterest" | "wide">("pinterest");

  const filteredData = currentFilter === "all" 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.id === currentFilter);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 pt-28 pb-24 select-none">
      
      {/* 1. Header Controls Panel */}
      <div className="w-full flex items-center justify-between mb-20">
        
        {/* Left Side: Filter Pill */}
        <div className="flex items-center gap-3 bg-[#ffffff hover:bg-zinc-200/70 border border-zinc-200/30 rounded-full px-5 py-2.5 cursor-pointer text-zinc-900 font-medium transition-all duration-300 group">

        </div>

        {/* Center Category Options */}
        <div className="hidden lg:flex items-center gap-2 bg-[#f4f4f5] border border-zinc-200/40 rounded-full p-1.5">
          <button 
            onClick={() => setCurrentFilter("all")}
            className={`px-6 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${currentFilter === 'all' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'}`}
          >
            All Areas
          </button>
          {GALLERY_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCurrentFilter(cat.id)}
              className={`px-6 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${currentFilter === cat.id ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'}`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Right Side: Mode Switcher */}
        <div className="flex items-center bg-[#f4f4f5] rounded-full p-1.5 border border-zinc-200/40 shadow-inner">
          <button 
            onClick={() => setViewMode("pinterest")}
            className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === "pinterest" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
            aria-label="Pinterest Layout"
          >
            <LayoutGrid className="w-4 h-4 stroke-[2]" />
          </button>
          
          <button 
            onClick={() => setViewMode("wide")}
            className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === "wide" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
            aria-label="Wide Layout"
          >
            <RectangleHorizontal className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* 2. Content Gallery Matrix */}
      <div className="flex flex-col gap-32">
        {filteredData.map((section) => (
          <section key={section.id} className="w-full flex flex-col items-center">
            
            <h2 className="text-4xl font-bold text-zinc-950 mb-3 tracking-tight">
              {section.category}
            </h2>
            <p className="text-sm md:text-base text-zinc-500 font-normal mb-14 text-center max-w-md">
              {section.subtitle}
            </p>

            {/* Grid Layout Container */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className={`w-full transition-all duration-700 ease-in-out ${
                viewMode === "pinterest" 
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start" 
                  : "flex flex-col gap-8 max-w-4xl"
              }`}
            >
              {section.images.map((img) => (
                <motion.div
                  key={img.id}
                  variants={itemVariants}
                  layout="position"
                  className="w-full relative overflow-hidden rounded-[24px] bg-zinc-50 border border-zinc-100/60 shadow-sm group"
                  transition={{
                    type: "spring",
                    stiffness: 45,
                    damping: 15,
                  }}
                >
                  <img
                    src={img.src}
                    alt="Wind Over Waters landscape asset view"
                    className="w-full h-auto object-contain block group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}