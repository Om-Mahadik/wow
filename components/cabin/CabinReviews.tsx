"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CabinReviews() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Navigation button indicator states
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const summaryText = "Loved by travelers for its untouched lake tranquility, authentic construction design, and flawless hosting standard.";
  const words = summaryText.split(" ");

  const avatarStack = [
    "/images/deck-1.jpg",
    "/images/deck-2.jpg",
    "/images/deck-3.jpg",
    "/images/deck-4.jpg",
  ];

  // Primary Carousel Testimonials + Full Drawer Review Data from standard images
  const testimonials = [
    {
      num: "01",
      platform: "google",
      name: "Sabalil",
      avatar: "/images/deck-1.jpg",
      date: "July 2025",
      badgeText: "Local Guide",
      text: "This is a magical place. We had a great experience. The view along with the serenity and calmness of the surroundings makes it an ideal getaway which is not very far from the city. The lake below and trails around makes it a complete adventure. This was our second time at this place and both the times, the experience was worth it. A must visit during monsoons as the place turns into a wonderland.",
      attachedImages: ["/images/deck-2.jpg", "/images/deck-3.jpg"],
    },
    {
      num: "02",
      platform: "google",
      name: "Priyanka",
      avatar: "/images/deck-2.jpg",
      date: "1 week ago",
      badgeText: "Verified Reviewer",
      text: "This is one of the most beautiful places I have ever experienced, especially for someone from Mumbai, where spending time in nature like this is rare. I loved every moment of my stay. I wish I could have stayed longer, waking up to birdsong, a gentle natural breeze on my face, and the water body right in front of my room. Every moment felt magical, almost like being in heaven.",
      attachedImages: [],
    },
    {
      num: "03",
      platform: "google",
      name: "Mitalee",
      avatar: "/images/deck-3.jpg",
      date: "November 2024",
      badgeText: "Local Guide",
      text: "We wanted to get away from the city, and just be by ourselves one with nature. And that's what we got. Had the best kinda-glamping experience, you're completely in nature with all the amenities to make it comfortable. We cooked, swam, made a bonfire and just had the nicest time in the place. It was our first experience in a tiny home concept and was the coolest. Will definitely come back :)",
      attachedImages: ["/images/deck-4.jpg"],
    },
    {
      num: "04",
      platform: "google",
      name: "Sangram",
      avatar: "/images/deck-4.jpg",
      date: "2 weeks ago",
      badgeText: "Verified Reviewer",
      text: "All of the hosts are very responsive. The place is private, cozy, serene and rugged at the same time. Wind over waters proves its name. The breeze above the Mutha river keeps you cool. Ample parking space to park the car. Hosts provided all of the manuals about usage of the property. Best wishes ❤️",
      attachedImages: [],
    },
    {
      num: "05",
      platform: "google",
      name: "Pallav",
      avatar: "/images/deck-1.jpg",
      date: "May 2026",
      badgeText: "Local Guide",
      text: "Its a beautiful and nicely kept property, perfect getaway for couples. We had a peaceful stay, host is also supportive.",
      attachedImages: [],
    },
    {
      num: "06",
      platform: "google",
      name: "Arkajyoti",
      avatar: "/images/deck-2.jpg",
      date: "May 2026",
      badgeText: "Verified Reviewer",
      text: "A cosy secluded cabin in the middle of the wilderness. Perfect for people who are looking to get away from the crowd. Loved the experience. There's a small pathway to the water body which we loved. Fireflies putting up a show at night which was magical. Starry skies with cool breeze blowing made the overall experience amazing. Would love to come back again.",
      attachedImages: [],
    },
    {
      num: "07",
      platform: "google",
      name: "Aalish",
      avatar: "/images/deck-3.jpg",
      date: "February 2025",
      badgeText: "Local Guide",
      text: "A Truly Serene Escape\nI had the most incredible stay at this Airbnb, nestled in the heart of nature with the beautiful Mutha River right by. The surroundings are absolutely breathtaking—lush greenery, peaceful sounds of the river, and an atmosphere that instantly makes you feel at peace. It was the perfect escape from the hustle and bustle of daily life. The calmness of the place is surreal, almost like being in a dream.\nWhether you're looking to unwind, immerse yourself in nature, or simply enjoy some quiet time by the river, this place offers everything you need.\nHighly recommend for anyone seeking tranquility and a close connection to nature. I'll definitely be coming back!",
      attachedImages: [],
    },
  ];

  // Recalculate horizontal scroll state for desktop arrows
  const updateScrollState = useCallback(() => {
    if (scrollTrackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollTrackRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  // Desktop manual scroll action helpers
  const scrollReviews = (direction: "left" | "right") => {
    if (scrollTrackRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480;
      scrollTrackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll cycle timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollTrackRef.current || selectedLightboxImage || isDrawerOpen) return;
      
      const nextIndex = (activeCategoryIndex + 1) % testimonials.length;
      const container = scrollTrackRef.current;
      // Index offset +1 accounts for the before: pseudo spacer
      const targetChild = container.children[nextIndex + 1] as HTMLElement;

      if (targetChild) {
        container.scrollTo({
          left: targetChild.offsetLeft - 32,
          behavior: "smooth"
        });
        setActiveCategoryIndex(nextIndex);
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [activeCategoryIndex, testimonials.length, selectedLightboxImage, isDrawerOpen]);

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
  };

  const paraContainerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.02 } },
  };

  const wordVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
  };

  return (
    <div className="w-full bg-white select-none pt-10 pb-20 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-16 flex flex-col space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT SIDE PANEL */}
          <div className="lg:col-span-4 flex flex-col space-y-6 lg:sticky lg:top-24">
            <div className="overflow-hidden py-0.5">
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
                Reviews
              </motion.h2>
            </div>

            {/* Score Metrics + Verified Rating Card */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-5 max-w-sm w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-950">4.92</span>
                    <div className="mt-1"><StarIcon /></div>
                  </div>
                </div>

                {/* Overlapping Avatar Stack */}
                <div className="flex items-center -space-x-3.5 pl-4">
                  {avatarStack.map((src, idx) => (
                    <div key={idx} className="relative w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-white overflow-hidden bg-zinc-100 shadow-xs shrink-0">
                      <Image src={src} alt="User avatar" fill unoptimized className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Verified Google Reviews Banner */}
              <a
                href="https://www.google.com/maps/place/Wind+over+Waters/@18.3860057,73.5745869,1480m/data=!3m1!1e3!4m9!3m8!1s0x3bc2990030fdf32f:0xa894c86bb422981f!5m2!4m1!1i2!8m2!3d18.3860006!4d73.5771618!16s%2Fg%2F11vx37l_zy?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-zinc-50/80 hover:bg-zinc-100/80 border border-zinc-200/60 rounded-xl py-2.5 px-3.5 w-full shadow-2xs transition-colors duration-200 group cursor-pointer"
              >
                <GoogleIcon className="w-5 h-5 shrink-0" />
                <div className="w-[1px] h-3.5 bg-zinc-200" />
                <span className="text-xs font-semibold tracking-wide text-zinc-800 group-hover:text-black transition-colors">
                  Verified guest reviews on Google
                </span>
                <span className="ml-auto text-xs text-zinc-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </motion.div>

            {/* Subtitle / Paragraph Word Stagger */}
            <motion.div
              variants={paraContainerVariants}
              className="text-sm md:text-base text-zinc-500 font-light leading-relaxed tracking-wide flex flex-wrap gap-x-[0.25em] -my-0.5 max-w-sm"
            >
              {words.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden py-0.5">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.div>

            {/* Desktop Carousel Navigation Controls */}
            <div className="hidden lg:flex items-center gap-3 pt-2">
              <button
                onClick={() => scrollReviews("left")}
                disabled={!canScrollLeft}
                aria-label="Previous Reviews"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollLeft 
                    ? "bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-900 hover:text-white shadow-2xs" 
                    : "bg-zinc-50 text-zinc-300 border-zinc-100 cursor-not-allowed opacity-50"
                }`}
              >
                ←
              </button>
              <button
                onClick={() => scrollReviews("right")}
                disabled={!canScrollRight}
                aria-label="Next Reviews"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollRight 
                    ? "bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-900 hover:text-white shadow-2xs" 
                    : "bg-zinc-50 text-zinc-300 border-zinc-100 cursor-not-allowed opacity-50"
                }`}
              >
                →
              </button>
            </div>
          </div>

          {/* RIGHT SIDE PANEL - Horizontal Scroll Track */}
          <div className="lg:col-span-8 w-full overflow-hidden relative">
            <div 
              ref={scrollTrackRef} 
              onScroll={updateScrollState}
              className="w-full flex gap-5 md:gap-6 overflow-x-auto no-scrollbar py-2 snap-x snap-mandatory scroll-pl-4 md:scroll-pl-0 before:content-[''] before:w-1 before:shrink-0 after:content-[''] after:w-1 after:shrink-0"
            >
              {testimonials.map((review, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="w-[85vw] sm:w-[420px] lg:w-[460px] p-6 md:p-8 bg-zinc-50/70 border border-zinc-200/60 rounded-[28px] shrink-0 snap-start flex flex-col justify-between min-h-[360px] md:min-h-[380px] relative overflow-hidden group hover:bg-zinc-900 transition-all duration-500 ease-out transform-gpu isolate shadow-2xs"
                >
                  <span className="absolute -right-4 -bottom-8 text-8xl md:text-9xl font-black tracking-tighter text-zinc-200/40 group-hover:text-zinc-800/20 group-hover:scale-105 transition-all duration-500 select-none z-0">
                    {review.num}
                  </span>

                  <div className="flex flex-col space-y-4 relative z-10 w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden bg-zinc-200 border border-zinc-200/40 shrink-0 shadow-2xs">
                          <Image src={review.avatar} alt={review.name} fill unoptimized className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-semibold tracking-tight text-zinc-900 group-hover:text-white transition-colors duration-500">
                            {review.name}
                          </span>
                          <span className="text-xs text-zinc-400 font-light tracking-wide mt-0.5 group-hover:text-zinc-400 transition-colors duration-500">
                            {review.date} • {review.badgeText}
                          </span>
                        </div>
                      </div>

                      {/* Brand Icon Badge */}
                      <div className="shrink-0">
                        <GoogleIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex gap-0.5 pt-1">
                      {[...Array(5)].map((_, idx) => <StarIcon key={idx} />)}
                    </div>

                    <p className="text-sm md:text-base text-zinc-600 font-light leading-relaxed tracking-wide group-hover:text-zinc-300 transition-colors duration-500 line-clamp-6 whitespace-pre-line">
                      {review.text}
                    </p>

                    {review.attachedImages && review.attachedImages.length > 0 && (
                      <div className="flex gap-3 pt-2">
                        {review.attachedImages.map((imgSrc, imgIdx) => (
                          <div 
                            key={imgIdx} 
                            onClick={() => setSelectedLightboxImage(imgSrc)}
                            className="relative w-20 h-20 md:w-22 md:h-22 rounded-2xl overflow-hidden border border-zinc-200/80 bg-white shadow-2xs shrink-0 transform-gpu isolate cursor-zoom-in active:scale-95 transition-all duration-300 group-hover:border-zinc-700"
                          >
                            <Image src={imgSrc} alt="Review snapshot" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-500" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 w-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Open Actions Button */}
        <motion.div variants={itemVariants} className="w-full pt-2">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="w-full py-4 bg-zinc-50 hover:bg-zinc-100/80 active:scale-[0.99] transition-all duration-300 rounded-2xl border border-zinc-200/60 flex items-center justify-center cursor-pointer text-xs font-bold tracking-[0.15em] uppercase text-zinc-800 hover:text-black shadow-2xs group"
          >
            Show all {testimonials.length} reviews
          </button>
        </motion.div>
      </motion.div>

      {/* FULL REVIEWS BOTTOM DRAWER MODAL */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[88vh] overflow-y-auto bg-white rounded-t-[36px] p-6 md:p-10 flex justify-center border-t border-zinc-100 shadow-2xl"
            >
              <div className="w-full md:max-w-[60vw] flex flex-col relative">
                <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mb-6 shrink-0" />
                
                <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Guest Reviews</h3>
                    <p className="text-xs text-zinc-400 font-light mt-0.5">
                      Showing all verified reviews from Google Maps
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-9 h-9 bg-zinc-100 hover:bg-zinc-200 rounded-full flex items-center justify-center text-zinc-800 transition-colors cursor-pointer text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                {/* List of Reviews inside Drawer */}
                <div className="flex flex-col gap-8 pt-8 pb-16">
                  {testimonials.map((review, idx) => (
                    <div key={idx} className="flex flex-col space-y-3 pb-8 border-b border-zinc-100 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-11 h-11 rounded-full overflow-hidden bg-zinc-200 border border-zinc-200/40 shrink-0">
                            <Image src={review.avatar} alt={review.name} fill unoptimized className="object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-semibold tracking-tight text-zinc-900">
                              {review.name}
                            </span>
                            <span className="text-xs text-zinc-400 font-light tracking-wide">
                              {review.date} • {review.badgeText}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, starIdx) => (
                            <StarIcon key={starIdx} />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm md:text-base text-zinc-600 font-light leading-relaxed tracking-wide whitespace-pre-line pt-1">
                        {review.text}
                      </p>

                      {review.attachedImages && review.attachedImages.length > 0 && (
                        <div className="flex gap-3 pt-2">
                          {review.attachedImages.map((imgSrc, imgIdx) => (
                            <div 
                              key={imgIdx} 
                              onClick={() => setSelectedLightboxImage(imgSrc)}
                              className="relative w-20 h-20 rounded-2xl overflow-hidden border border-zinc-200/80 bg-white shadow-2xs shrink-0 cursor-zoom-in active:scale-95 transition-all duration-300"
                            >
                              <Image src={imgSrc} alt="Review snapshot" fill unoptimized className="object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedLightboxImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center text-lg hover:bg-white/20 transition-colors z-20 cursor-pointer"
            >
              ✕
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="relative w-full max-w-4xl h-[70vh] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl isolate"
            >
              <Image src={selectedLightboxImage} alt="Expanded snapshot" fill unoptimized className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StarIcon() {
  return (
    <svg className="w-4 h-4 md:w-4.5 md:h-4.5 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}