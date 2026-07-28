"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function HomeReels() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;
  
  // Dynamic map to manage mute states per video ID
  const [mutedStates, setMutedStates] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  // A central object ref cache for dynamic elements
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  };

  const reelsData = [
    { 
      id: 1, 
      src: "/videos/reels/reel-1.mp4", 
      alt: "Morning mist over the cabin lake",
      name: "Wind over Waters",
      instagram: "@windoverwaters",
      avatar: "/images/profiles/avatar-1.jpg"
    },
    { 
      id: 2, 
      src: "/videos/reels/reel-2.mp4", 
      alt: "Cozy indoor fireplace vibes",
      name: "Wind over Waters",
      instagram: "@windoverwaters",
      avatar: "/images/profiles/avatar-1.jpg"
    },
    { 
      id: 3, 
      src: "/videos/reels/reel-3.mp4", 
      alt: "Sunlight hitting the A-frame deck",
      name: "Sarah Jenkins",
      instagram: "@wildtravels",
      avatar: "/images/profiles/avatar-2.jpg"
    },
    { 
      id: 4, 
      src: "/videos/reels/reel-4.mp4", 
      alt: "Sunlight hitting the A-frame deck",
      name: "Sarah Jenkins",
      instagram: "@wildtravels",
      avatar: "/brand/colour-logo.jpeg"
    },
  ];

  const toggleMute = (targetId: number, e: React.MouseEvent) => {
    e.stopPropagation();

    // Determine the next state for the clicked video
    const currentTargetVideo = videoRefs.current[targetId];
    if (!currentTargetVideo) return;
    
    const willBeMuted = !currentTargetVideo.muted;

    // Build the updated state object for all clips
    const updatedMutedStates: { [key: number]: boolean } = {};

    reelsData.forEach((reel) => {
      const videoElement = videoRefs.current[reel.id];
      if (videoElement) {
        if (reel.id === targetId) {
          // Apply toggle state to the target video
          videoElement.muted = willBeMuted;
          updatedMutedStates[reel.id] = willBeMuted;
        } else {
          // If unmuting the target, strictly force every other video to mute
          if (!willBeMuted) {
            videoElement.muted = true;
            updatedMutedStates[reel.id] = true;
          } else {
            // Keep their current state intact if just muting the target
            updatedMutedStates[reel.id] = mutedStates[reel.id];
          }
        }
      }
    });

    setMutedStates(updatedMutedStates);
  };

  return (
    <div className="w-full flex justify-center bg-white select-none pt-16 pb-12 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
        className="w-full md:max-w-[85vw] flex flex-col items-center px-4 md:px-0 space-y-6"
      >
        {/* Straightforward Centered Header Stack */}
        <div className="space-y-2 text-center flex flex-col items-center">
          <motion.div variants={fadeInUpVariants} className="overflow-hidden py-0.5">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
              Watch Our Reels
            </h2>
          </motion.div>
          <motion.p 
            variants={fadeInUpVariants} 
            className="text-base text-zinc-500 font-light max-w-2xl leading-relaxed tracking-wide"
          >
            Take a closer look at our guest experiences, cabin walkthroughs, and surroundings.
          </motion.p>
        </div>

        {/* Cinematic Horizontal Peek Track Slider */}
        <motion.div 
          variants={fadeInUpVariants}
          className="w-full pt-4 cursor-grab active:cursor-grabbing"
        >
          {/* Mobile item min-width changed to 76% to give a larger, distinct visual hint of the upcoming track item */}
          <div className="flex overflow-x-auto gap-6 scrollbar-none snap-x snap-mandatory px-0 pb-4 max-w-full after:content-[''] after:inline-block after:min-w-[20%] after:shrink-0 md:after:hidden md:grid md:grid-cols-4">
            {reelsData.map((reel) => (
              <div 
                key={reel.id} 
                className="min-w-[76%] md:min-w-0 snap-start"
              >
                <div className="w-full flex flex-col space-y-4">
                  
                  {/* Interactive Card Canvas — Completely Borderless */}
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                    className="relative overflow-hidden rounded-2xl bg-zinc-950 aspect-[9/16] w-full group shadow-md hover:shadow-xl"
                  >
                    <video
                      ref={(el) => { videoRefs.current[reel.id] = el; }}
                      src={reel.src}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                      loop
                      muted={mutedStates[reel.id] ?? true}
                      playsInline
                      autoPlay
                    />

                    {/* Ambient Lighting Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-80 pointer-events-none" />

                    {/* Premium UI Sound State Overlay Element */}
                    <button
                      onClick={(e) => toggleMute(reel.id, e)}
                      className="absolute bottom-5 right-5 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/25 hover:bg-white/20 text-white transition-all active:scale-90 shadow-sm cursor-pointer"
                      aria-label={mutedStates[reel.id] ? "Unmute video" : "Mute video"}
                    >
                      {mutedStates[reel.id] ?? true ? (
                        <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                      )}
                    </button>
                  </motion.div>

                  {/* Clean Signature Branding Row Below Card Container */}
                  <a 
                    href={`https://instagram.com/${reel.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-1 group cursor-pointer w-fit mx-auto md:mx-0"
                  >
                    <div className="relative overflow-hidden rounded-full p-[1px] bg-gradient-to-tr from-zinc-200 to-zinc-300 group-hover:from-zinc-400 group-hover:to-zinc-500 transition-all duration-300">
                      <img 
                        src={reel.avatar} 
                        alt={reel.name} 
                        className="w-9 h-9 rounded-full object-cover bg-zinc-50 border border-white"
                      />
                    </div>
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-sm font-semibold tracking-tight text-zinc-800 group-hover:text-black transition-colors truncate">
                        {reel.name}
                      </span>
                      <span className="text-xs text-zinc-400 font-light tracking-wide transition-colors group-hover:text-zinc-500 truncate">
                        {reel.instagram}
                      </span>
                    </div>
                  </a>

                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}