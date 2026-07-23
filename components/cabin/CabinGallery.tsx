"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CabinGallery() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const categories = [
    {
      id: "bedroom",
      name: "Bedroom",
      count: 5,
      cover: "/images/deck-1.jpg",
      images: [
        "/images/deck-1.jpg",
        "/images/deck-2.jpg",
        "/images/deck-3.jpg",
        "/images/deck-4.jpg",
        "/images/deck-5.jpg",
      ],
    },
    {
      id: "washroom",
      name: "Washroom",
      count: 3,
      cover: "/images/deck-2.jpg",
      images: [
        "/images/deck-2.jpg",
        "/images/deck-3.jpg",
        "/images/deck-4.jpg",
      ],
    },
    {
      id: "outdoors",
      name: "Outdoors",
      count: 4,
      cover: "/images/deck-3.jpg",
      images: [
        "/images/deck-3.jpg",
        "/images/deck-4.jpg",
        "/images/deck-5.jpg",
        "/images/deck-1.jpg",
      ],
    },
    {
      id: "lounge",
      name: "Lounge Area",
      count: 3,
      cover: "/images/deck-4.jpg",
      images: [
        "/images/deck-4.jpg",
        "/images/deck-5.jpg",
        "/images/deck-1.jpg",
      ],
    },
  ];

  // Flatten images mixed with category breakthrough break cards
  const globalTimeline: Array<{ type: "header" | "image"; name: string; src?: string }> = [];
  
  categories.forEach((cat) => {
    globalTimeline.push({ type: "header", name: cat.name });
    cat.images.forEach((img) => {
      globalTimeline.push({ type: "image", name: cat.name, src: img });
    });
  });

  // Accurate segment offset targeting without runtime render jank
  useEffect(() => {
    if (activeCategoryIndex !== null && scrollContainerRef.current) {
      const targetCategoryName = categories[activeCategoryIndex].name;
      const targetIndex = globalTimeline.findIndex(
        (item) => item.type === "header" && item.name === targetCategoryName
      );

      if (targetIndex !== -1) {
        setTimeout(() => {
          const container = scrollContainerRef.current;
          if (container && container.children[targetIndex]) {
            const targetChild = container.children[targetIndex] as HTMLElement;
            container.scrollTo({
              left: targetChild.offsetLeft - 40,
              behavior: "auto",
            });
          }
        }, 50);
      }
    }
  }, [activeCategoryIndex]);

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.04 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: smoothEase },
    },
  };

  return (
    <div className="w-full flex justify-center bg-white select-none pt-8 overflow-hidden">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full md:max-w-[80vw] flex flex-col justify-start px-4 md:px-0 space-y-4"
      >
        {/* Header Branding Row */}
        <div className="overflow-hidden py-0.5 flex items-baseline justify-between">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight text-zinc-900">
            Gallery
          </motion.h2>
          <motion.span variants={itemVariants} className="text-xs font-medium tracking-wider text-zinc-400 animate-pulse">
            Tap card to enter view ↗
          </motion.span>
        </div>

        {/* Categories Strip */}
        <div className="w-full pt-2">
          <div className="flex gap-5 pb-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                onClick={() => setActiveCategoryIndex(index)}
                className="flex flex-col space-y-3 shrink-0 snap-start cursor-pointer group w-[280px]"
              >
                {/* overflow-hidden and isolate explicitly forces rounded corners to persist on PC chrome */}
                <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden bg-zinc-100 shadow-sm border border-zinc-200/20 transform-gpu isolate">
                  <Image
                    src={cat.cover}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-zinc-900 text-xs font-bold tracking-widest uppercase py-2.5 px-5 rounded-full shadow-md">
                      Open Space
                    </span>
                  </div>
                </div>
                <div className="flex flex-col px-1">
                  <span className="text-base font-semibold tracking-tight text-zinc-900">{cat.name}</span>
                  <span className="text-sm text-zinc-500 font-light tracking-wide mt-0.5">({cat.count} photos)</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Full-Screen Dark Theme Immersive Showcase */}
      <AnimatePresence>
        {activeCategoryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950 flex flex-col justify-between p-6 md:p-10 transform-gpu"
          >
            {/* Clickable Backdrop Mask */}
            <div 
              className="absolute inset-0 z-0" 
              onClick={() => setActiveCategoryIndex(null)}
            />

            {/* Modal Navigation Control Header */}
            <div className="w-full flex justify-between items-center text-white relative z-10 select-none">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Wind over Waters</h3>
                <p className="text-xs text-zinc-400 font-light tracking-wide mt-0.5">
                  Immersive Crossover Walkthrough Showcase
                </p>
              </div>
              <button
                onClick={() => setActiveCategoryIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Optimized Timeline Track Container */}
            {/* Minimized height variations, added will-change-scroll for seamless performance */}
            <div
              ref={scrollContainerRef}
              className="w-full flex gap-6 overflow-x-auto no-scrollbar py-2 items-center px-4 md:px-20 snap-x snap-mandatory relative z-10 will-change-scroll select-none"
            >
              {globalTimeline.map((item, i) =>
                item.type === "header" ? (
                  /* BREAK SECTION DISPLAY */
                  <div
                    key={i}
                    className="relative w-[85vw] md:w-[35vw] aspect-[3/4] rounded-[24px] bg-zinc-900 border border-white/10 shrink-0 snap-center flex flex-col justify-center items-start p-8 md:p-12 shadow-2xl overflow-hidden isolate"
                  >
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-2">
                      Entering Space
                    </span>
                    <h4 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                      {item.name}
                    </h4>
                    <div className="w-8 h-[2px] bg-white/30 my-6" />
                    <span className="text-sm text-zinc-400 font-light tracking-wide flex items-center gap-2">
                      Swipe across space <span className="text-base">→</span>
                    </span>
                  </div>
                ) : (
                  /* IMAGE CONTAINER: Shows multi-image flow on widescreen grid configurations */
                  <div
                    key={i}
                    className="relative w-[85vw] md:w-[45vw] lg:w-[42vw] aspect-[3/4] md:aspect-[4/5] rounded-[24px] overflow-hidden shrink-0 shadow-2xl border border-white/5 snap-center transform-gpu isolate"
                  >
                    <Image
                      src={item.src || ""}
                      alt={`${item.name} showcase`}
                      fill
                      className="object-cover pointer-events-none"
                      priority={i < 6}
                    />
                    <div className="absolute bottom-4 left-4 bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white font-light text-xs tracking-wider px-3 py-1.5 rounded-full z-10">
                      {item.name}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Spacer row replacing the old removed bottom text line */}
            <div className="w-full h-2 relative z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}