"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function CabinThingsToDo() {
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const timelineSchedule = [
    {
      time: "07:30 AM",
      title: "Lake Fog Watch",
      desc: "Watch the morning mist rise directly above the lake water lines from the glass balcony room with a freshly brewed cup of pour-over coffee.",
      image: "/images/deck-1.jpg",
    },
    {
      time: "11:00 AM",
      title: "Kayaking & Hidden Coves",
      desc: "Launch out straight from the property front bank to explore the quiet corners of the lake. Life vests are available right by the deck docking racks.",
      image: "/images/deck-2.jpg",
    },
    {
      time: "04:30 PM",
      title: "Golden Hour Trek",
      desc: "Take a gentle stroll along the natural hillside paths tracing the water's edge. The light cuts perfectly across the container framework here.",
      image: null,
    },
    {
      time: "08:00 PM",
      title: "Bonfire & Stargazing",
      desc: "Wind down around the open firepit base. Total lack of city ambient light maps out an uncompromised night sky canvas view.",
      image: "/images/deck-4.jpg",
    },
  ];

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } },
  };

  return (
    <div className="w-full flex justify-center bg-white select-none pt-12 pb-24">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="w-full md:max-w-[80vw] px-4 md:px-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT SIDE PANEL - Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-20">
            <div className="overflow-hidden py-0.5">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight text-zinc-900">
                Things to Do
              </motion.h2>
              <motion.p variants={itemVariants} className="text-sm text-zinc-400 font-light mt-2 tracking-wide max-w-xs">
                A curated, time-wise ideal sequence to experience the absolute magic of Wind over Waters.
              </motion.p>
            </div>
          </div>

          {/* RIGHT SIDE PANEL - Uncompromising Vertical Timeline Track for Both Mobile & Desktop */}
          <div className="lg:col-span-8 flex flex-col space-y-12 w-full pt-6 relative pl-8 md:pl-0">
            
            {/* Native Vertical Track Line: Left side relative positioning rules handle mobile, md: filters handle desktop spacing layout offsets */}
            <div className="absolute left-[14px] md:left-[44px] top-4 bottom-4 w-[1px] bg-zinc-200/70" />

            {timelineSchedule.map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col md:flex-row gap-4 md:gap-6 items-start relative group w-full"
              >
                {/* Custom Chronological Node Pillar Marker */}
                {/* On mobile, this perfectly scales to dot indicator nodes aligning over the track */}
                <div className="absolute -left-[23px] md:relative md:left-0 top-1.5 w-3 h-3 rounded-full bg-zinc-200 border-2 border-white group-hover:bg-zinc-900 group-hover:scale-110 transition-all duration-300 md:hidden z-20" />

                {/* Desktop Time Badge Element Box (Hidden on mobile grid in place of indicator pins) */}
                <div className="px-3 py-1.5 bg-zinc-50 border border-zinc-200/60 rounded-full text-xs font-bold tracking-wider text-zinc-800 shadow-sm shrink-0 w-24 text-center relative z-10 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-colors duration-300 hidden md:block">
                  {step.time}
                </div>

                {/* Mobile Specific Time String Metric Header Row */}
                <div className="text-xs font-bold tracking-widest text-zinc-400 uppercase md:hidden">
                  {step.time}
                </div>

                {/* Content Track Flow */}
                <div className="flex-1 flex flex-col space-y-4 w-full">
                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-lg font-bold tracking-tight text-zinc-900">
                      {step.title}
                    </h3>
                    <p className="text-base text-zinc-500 font-light leading-relaxed tracking-wide max-w-xl">
                      {step.desc}
                    </p>
                  </div>

                  {/* Dynamic Landscape Photo Cards */}
                  {step.image && (
                    <div 
                      onClick={() => setActiveLightboxImage(step.image)}
                      className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[24px] overflow-hidden border border-zinc-200/40 bg-zinc-50 shadow-sm cursor-zoom-in group-hover:border-zinc-300 transition-colors duration-500 isolate transform-gpu"
                    >
                      <Image
                        src={step.image}
                        alt={`${step.title} overview display canvas`}
                        fill
                        className="object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out pointer-events-none"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>

      {/* FULL-SCREEN IMMERSIVE RUNWAY LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center text-lg hover:bg-white/20 transition-colors z-20 cursor-pointer"
            >
              ✕
            </button>
            
            <motion.div 
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="relative w-full max-w-5xl h-[75vh] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl isolate"
            >
              <Image 
                src={activeLightboxImage} 
                alt="Expanded view snapshot screen visual layout" 
                fill 
                className="object-contain" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}