"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function CabinGallery() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Scroll indicator state for main gallery strip
  const [canScrollGalleryLeft, setCanScrollGalleryLeft] = useState(false);
  const [canScrollGalleryRight, setCanScrollGalleryRight] = useState(true);

  const galleryStripRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  // Custom Cursor Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, categoryName: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    if (hoveredCategory !== categoryName) {
      setHoveredCategory(categoryName);
    }
  };

  const categories = [
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
      category: "Exterior",
      subtitle: "Beautiful Exterior Spaces for Entertainment",
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

  // Flatten images mixed with category breakthrough break cards
  const globalTimeline: Array<{ type: "header" | "image"; name: string; subtitle?: string; src?: string }> = [];

  categories.forEach((cat) => {
    globalTimeline.push({ type: "header", name: cat.category, subtitle: cat.subtitle });
    cat.images.forEach((img) => {
      globalTimeline.push({ type: "image", name: cat.category, src: img.src });
    });
  });

  // Recalculate scroll state for gallery navigation arrows
  const updateGalleryScrollState = useCallback(() => {
    if (galleryStripRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = galleryStripRef.current;
      setCanScrollGalleryLeft(scrollLeft > 10);
      setCanScrollGalleryRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    updateGalleryScrollState();
    window.addEventListener("resize", updateGalleryScrollState);
    return () => window.removeEventListener("resize", updateGalleryScrollState);
  }, [updateGalleryScrollState]);

  // Accurate segment offset targeting without runtime render jank
  useEffect(() => {
    if (activeCategoryIndex !== null && scrollContainerRef.current) {
      const targetCategoryName = categories[activeCategoryIndex].category;
      const targetIndex = globalTimeline.findIndex(
        (item) => item.type === "header" && item.name === targetCategoryName
      );

      if (targetIndex !== -1) {
        setTimeout(() => {
          const container = scrollContainerRef.current;
          if (container) {
            // Offset by +1 to account for the before: pseudo element child
            const targetChild = container.children[targetIndex + 1] as HTMLElement;
            if (targetChild) {
              container.scrollTo({
                left: targetChild.offsetLeft - 40,
                behavior: "auto",
              });
            }
          }
        }, 50);
      }
    }
  }, [activeCategoryIndex]);

  // Main Gallery scroll action
  const scrollGallery = (direction: "left" | "right") => {
    if (galleryStripRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      galleryStripRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Modal Desktop Scroll Helpers
  const scrollTimeline = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
    <div className="w-full bg-white select-none pt-8 m-0 p-0 overflow-x-hidden">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      {/* 100% Full-Bleed Container */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full flex flex-col justify-start space-y-4 m-0 p-0"
      >
        {/* Gallery Title aligned with layout gutter */}
        <div className="w-full overflow-hidden py-0.5 px-4 md:px-12 lg:px-16 flex items-center justify-between">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight text-zinc-900">
            Gallery
          </motion.h2>
        </div>

        {/* Categories Strip Wrapper */}
        <div className="w-full pt-2 relative group/gallery">
          {/* Desktop Left Floating Arrow */}
          {canScrollGalleryLeft && (
            <button
              onClick={() => scrollGallery("left")}
              aria-label="Scroll Gallery Left"
              className="hidden md:flex absolute left-4 md:left-8 top-[40%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-zinc-800 border border-zinc-200 items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
            >
              ←
            </button>
          )}

          {/* Scroll Strip with proper left/right offset and scroll-padding */}
          <div
            ref={galleryStripRef}
            onScroll={updateGalleryScrollState}
            className="w-full flex gap-5 pb-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-12 lg:px-16 scroll-pl-4 md:scroll-pl-12 lg:scroll-pl-16 before:content-[''] before:w-1 md:before:w-2 before:shrink-0 after:content-[''] after:w-1 md:after:w-2 after:shrink-0"
          >
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                onClick={() => setActiveCategoryIndex(index)}
                onMouseEnter={() => setHoveredCategory(cat.category)}
                onMouseLeave={() => setHoveredCategory(null)}
                onMouseMove={(e) => handleMouseMove(e, cat.category)}
                className="flex flex-col space-y-3 shrink-0 snap-start cursor-pointer group w-[280px]"
              >
                <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden bg-zinc-100 shadow-sm border border-zinc-200/20 transform-gpu isolate">
                  <Image
                    src={cat.images[0]?.src || ""}
                    alt={cat.category}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />

                  {/* Mobile Tap Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10 text-white md:hidden">
                    <span className="text-[10px] font-medium tracking-wide">Tap to view</span>
                  </div>

                  {/* Desktop Mouse Pill */}
                  <AnimatePresence>
                    {hoveredCategory === cat.category && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        style={{
                          left: springX,
                          top: springY,
                        }}
                        className="hidden md:flex absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full bg-black/75 backdrop-blur-md border border-white/20 px-4 py-2 text-white shadow-xl"
                      >
                        <span className="text-xs font-semibold tracking-wide">
                          Click to view {cat.category.toLowerCase()}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex flex-col px-1">
                  <span className="text-base font-semibold tracking-tight text-zinc-900">{cat.category}</span>
                  <span className="text-sm text-zinc-500 font-light tracking-wide mt-0.5">({cat.images.length} photos)</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Right Floating Arrow */}
          {canScrollGalleryRight && (
            <button
              onClick={() => scrollGallery("right")}
              aria-label="Scroll Gallery Right"
              className="hidden md:flex absolute right-4 md:right-8 top-[40%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-zinc-800 border border-zinc-200 items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
            >
              →
            </button>
          )}
        </div>
      </motion.div>

      {/* Full-Screen Dark Theme Immersive Showcase */}
      <AnimatePresence>
        {activeCategoryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950 flex flex-col justify-between p-6 md:p-10 transform-gpu overflow-hidden"
          >
            {/* Clickable Backdrop Mask */}
            <div 
              className="absolute inset-0 z-0" 
              onClick={() => setActiveCategoryIndex(null)}
            />

            {/* Modal Control Header */}
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

            {/* Modal Navigation Arrows */}
            <button
              onClick={() => scrollTimeline("left")}
              aria-label="Scroll Left"
              className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white items-center justify-center transition-all cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
            >
              ←
            </button>
            <button
              onClick={() => scrollTimeline("right")}
              aria-label="Scroll Right"
              className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white items-center justify-center transition-all cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
            >
              →
            </button>

            {/* Timeline Track Container */}
            <div
              ref={scrollContainerRef}
              className="w-full flex gap-6 overflow-x-auto no-scrollbar py-4 items-center px-4 md:px-20 scroll-pl-4 md:scroll-pl-20 snap-x snap-mandatory relative z-10 will-change-scroll select-none my-auto before:content-[''] before:w-2 md:before:w-4 before:shrink-0 after:content-[''] after:w-2 md:after:w-4 after:shrink-0"
            >
              {globalTimeline.map((item, i) =>
                item.type === "header" ? (
                  /* BREAK SECTION DISPLAY */
                  <div
                    key={i}
                    className="relative w-[85vw] md:w-[26vw] max-h-[65vh] aspect-[3/4] md:aspect-[4/3] rounded-[24px] bg-zinc-900 border border-white/10 shrink-0 snap-center flex flex-col justify-center items-start p-6 md:p-8 shadow-2xl overflow-hidden isolate"
                  >
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-2">
                      Entering Space
                    </span>
                    <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                      {item.name}
                    </h4>
                    {item.subtitle && (
                      <p className="text-xs text-zinc-400 font-light tracking-wide mt-2">
                        {item.subtitle}
                      </p>
                    )}
                    <div className="w-8 h-[2px] bg-white/30 my-4" />
                    <span className="text-xs text-zinc-400 font-light tracking-wide flex items-center gap-2">
                      Swipe across space <span className="text-sm">→</span>
                    </span>
                  </div>
                ) : (
                  /* IMAGE CONTAINER (Preserves original aspect ratio on PC) */
                  <div
                    key={i}
                    className="relative w-[85vw] md:w-[40vw] max-h-[65vh] h-[60vh] rounded-[24px] overflow-hidden shrink-0 shadow-2xl border border-white/5 snap-center transform-gpu isolate bg-zinc-900/40 flex items-center justify-center"
                  >
                    <Image
                      src={item.src || ""}
                      alt={`${item.name} showcase`}
                      fill
                      unoptimized
                      className="object-cover md:object-contain pointer-events-none"
                      priority={i < 6}
                    />
                    <div className="absolute bottom-4 left-4 bg-zinc-900/80 backdrop-blur-md border border-white/10 text-white font-light text-xs tracking-wider px-3 py-1.5 rounded-full z-10">
                      {item.name}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Bottom Spacer */}
            <div className="w-full h-2 relative z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}