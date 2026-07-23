"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CabinReviews() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);
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

  const testimonials = [
    {
      num: "01",
      platform: "google",
      name: "Om Mahadik",
      avatar: "/images/deck-1.jpg",
      date: "1 month ago",
      text: "Bro, it's an absolute masterpiece. Waking up to total lake fog through pristine container glass walls felt entirely surreal! 🌲",
      attachedImages: ["/images/deck-2.jpg", "/images/deck-3.jpg"],
    },
    {
      num: "02",
      platform: "airbnb",
      name: "Priya Sharma",
      avatar: "/images/deck-2.jpg",
      date: "2 months ago",
      text: "Super close to Pune yet feels worlds away. The minimal aesthetic layout combined with absolute privacy makes this our new favorite weekend reset zone.",
      attachedImages: [],
    },
    {
      num: "03",
      platform: "google",
      name: "Rohan Das",
      avatar: "/images/deck-3.jpg",
      date: "3 months ago",
      text: "The architectural design of the containers is brilliant. Everything from the tight, black aesthetic accent line choices to the bonfire space feels intentional.",
      attachedImages: ["/images/deck-4.jpg"],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollTrackRef.current || selectedLightboxImage) return;
      
      const nextIndex = (activeCategoryIndex + 1) % testimonials.length;
      const container = scrollTrackRef.current;
      const targetChild = container.children[nextIndex] as HTMLElement;

      if (targetChild) {
        container.scrollTo({
          left: targetChild.offsetLeft - 16,
          behavior: "smooth"
        });
        setActiveCategoryIndex(nextIndex);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [activeCategoryIndex, testimonials.length, selectedLightboxImage]);

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
    <div className="w-full flex justify-center bg-white select-none pt-12 pb-24 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full md:max-w-[80vw] px-4 md:px-0 flex flex-col space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT SIDE PANEL */}
          <div className="lg:col-span-4 flex flex-col space-y-6 lg:sticky lg:top-20">
            <div className="overflow-hidden py-0.5">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight text-zinc-900">
                Reviews
              </motion.h2>
            </div>

            {/* Score Metrics + Scaled Logo Header Verification */}
            <motion.div variants={itemVariants} className="flex flex-col space-y-5 max-w-sm w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-6xl font-black tracking-tighter text-zinc-950">4.73</span>
                    <div className="mt-2"><StarIcon /></div>
                  </div>
                </div>

                {/* Overlapping Avatar Stack circles */}
                <div className="flex items-center -space-x-3.5 pl-4">
                  {avatarStack.map((src, idx) => (
                    <div key={idx} className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden bg-zinc-100 shadow-sm shrink-0">
                      <Image src={src} alt="User avatar face placeholder" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* UPGRADED: Expanded verification tag box holding larger logo layout */}
              <div className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-200/60 rounded-xl py-2 px-3.5 w-full shadow-sm">
                <GoogleIcon className="w-5 h-5" />
                <div className="w-[1px] h-3.5 bg-zinc-200" />
                <span className="text-[11px] font-bold tracking-wide text-zinc-800">
                  Verified reviews on Google
                </span>
              </div>
            </motion.div>

            {/* Paragraph Word Stagger */}
            <motion.div
              variants={paraContainerVariants}
              className="text-base text-zinc-500 font-light leading-snug tracking-wide flex flex-wrap gap-x-[0.25em] -my-0.5 max-w-sm"
            >
              {words.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden py-0.5">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE PANEL */}
          <div className="lg:col-span-8 w-full overflow-x-auto no-scrollbar pt-2 snap-x snap-mandatory">
            <div ref={scrollTrackRef} className="flex gap-6 pb-6 w-max min-w-full scroll-smooth">
              {testimonials.map((review, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="w-[85vw] md:w-[480px] p-8 bg-zinc-50 border border-zinc-200/40 rounded-[32px] shrink-0 snap-center flex flex-col justify-between min-h-[380px] relative overflow-hidden group hover:bg-zinc-900 transition-all duration-500 ease-out transform-gpu isolate"
                >
                  <span className="absolute -right-4 -bottom-8 text-8xl md:text-9xl font-black tracking-tighter text-zinc-200/40 group-hover:text-zinc-800/20 group-hover:scale-105 transition-all duration-500 select-none z-0">
                    {review.num}
                  </span>

                  <div className="flex flex-col space-y-4 relative z-10 w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-200 shadow-inner border border-zinc-200/10 shrink-0">
                          <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-semibold tracking-tight text-zinc-900 group-hover:text-white transition-colors duration-500">
                            {review.name}
                          </span>
                          <span className="text-xs text-zinc-400 font-light tracking-wide mt-0.5 group-hover:text-zinc-500 transition-colors duration-500">
                            {review.date} • {review.platform === "airbnb" ? "Airbnb review" : "Google review"}
                          </span>
                        </div>
                      </div>

                      {/* DYNAMIC: Conditional platform brand icon mapping per individual card entry */}
                      <div className="opacity-50 group-hover:opacity-30 transition-opacity duration-500 shrink-0">
                        {review.platform === "airbnb" ? (
                          <AirbnbIcon className="w-5 h-5 text-[#FF5A5F]" />
                        ) : (
                          <GoogleIcon className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    <div className="flex gap-0.5 pt-1">
                      {[...Array(5)].map((_, idx) => <StarIcon key={idx} />)}
                    </div>

                    <p className="text-sm md:text-base text-zinc-600 font-light leading-relaxed tracking-wide group-hover:text-zinc-300 transition-colors duration-500 max-w-[95%]">
                      {review.text}
                    </p>

                    {review.attachedImages && review.attachedImages.length > 0 && (
                      <div className="flex gap-3 pt-3">
                        {review.attachedImages.map((imgSrc, imgIdx) => (
                          <div 
                            key={imgIdx} 
                            onClick={() => setSelectedLightboxImage(imgSrc)}
                            className="relative w-24 h-24 rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-sm shrink-0 transform-gpu isolate cursor-zoom-in active:scale-95 transition-all duration-300 group-hover:border-zinc-800"
                          >
                            <Image src={imgSrc} alt="Attached snapshot view" fill className="object-cover hover:scale-105 transition-transform duration-500" />
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

        {/* Global Action Button */}
        <motion.div variants={itemVariants} className="w-full pt-4">
          <button className="w-full py-4 bg-zinc-50 hover:bg-zinc-100 active:scale-[0.99] transition-all duration-300 rounded-xl border border-zinc-200/60 flex items-center justify-center cursor-pointer text-sm font-medium tracking-wide text-zinc-700 hover:text-black shadow-sm">
            Read all reviews
          </button>
        </motion.div>
      </motion.div>

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
              <Image src={selectedLightboxImage} alt="Expanded snapshot asset screen look" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

// Reusable Google Logo with clean style extension handles
function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0`} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-1.14 2.77-2.4 3.63v3.02h3.86c2.26-2.08 3.56-5.14 3.56-8.5z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3.02c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.13C3.26 21.35 7.37 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.6H1.29C.47 8.23 0 10.06 0 12s.47 3.77 1.29 5.4l3.98-3.13z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.65 1.29 6.6l3.98 3.13c.95-2.85 3.6-4.98 6.73-4.98z" />
    </svg>
  );
}

// Geometric Vector Path Structure for Airbnb Brand Symbol Icon
function AirbnbIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={`${className} shrink-0 fill-current`} viewBox="0 0 32 32">
      <path d="M16 1c-2.007 0-3.612 1.2-4.498 3.142l-9.865 19.57c-.604 1.258-.657 2.685-.145 3.966C2.003 28.96 3.09 29.837 4.393 30h23.213c1.304-.163 2.39-.107 2.902-1.322.512-1.28.46-2.708-.145-3.966L20.498 4.143C19.612 2.2 18.007 1 16 1zm0 3c.993 0 1.812.632 2.247 1.583l9.866 19.563c.277.577.303 1.154.075 1.72-.228.568-.748 1.05-1.402 1.134H5.214c-.655-.084-1.174-.566-1.402-1.134-.228-.566-.202-1.143.075-1.72l9.866-19.563C14.188 4.632 15.007 4 16 4zm0 9c-2.206 0-4 1.794-4 4 0 1.722 1.096 3.176 2.622 3.738L16 22.868l1.378-2.13C18.904 20.176 20 18.722 20 17c0-2.206-1.794-4-4-4zm0 2c1.106 0 2 .894 2 2 0 .74-.403 1.377-1.002 1.71L16 20.264l-.998-1.553C14.403 18.378 14 17.74 14 17c0-1.106.894-2 2-2z"/>
    </svg>
  );
}