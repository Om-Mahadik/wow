"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default function HomeInstagramEmbeds() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

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

  const embedsData = [
    { id: 1, url: "https://www.instagram.com/reel/DaDDGKiIgMc/" },
    { id: 2, url: "https://www.instagram.com/reel/DYoZJ90RBUW/" },
    { id: 3, url: "https://www.instagram.com/reel/DaJ0eGVIyOh/" },
    { id: 4, url: "https://www.instagram.com/reel/DZjdZeioIxx/" },
  ];

  useEffect(() => {
    if (!window.instgrm) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.instgrm) window.instgrm.Embeds.process();
      };
      document.body.appendChild(script);
    } else {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <div className="w-full flex justify-center bg-white select-none pt-16 pb-12 overflow-hidden">
      {/* Dynamic Style Override injection to strip Instagram's default ugly container frames */}
      <style dangerouslySetInnerHTML={{__html: `
        .instagram-media { 
          min-width: 100% !important; 
          width: 100% !important; 
          border-radius: 1rem !important;
          border: none !important;
          box-shadow: none !important;
          margin: 0 !important;
        }
      `}} />

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
        className="w-full md:max-w-[85vw] flex flex-col items-center px-4 md:px-0 space-y-6"
      >
        {/* Minimal Centered Header Stack */}
        <div className="space-y-2 text-center flex flex-col items-center">
          <motion.div variants={fadeInUpVariants} className="overflow-hidden py-0.5">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
              Follow Us on Instagram
            </h2>
          </motion.div>
          <motion.p 
            variants={fadeInUpVariants} 
            className="text-base text-zinc-500 font-light max-w-2xl leading-relaxed tracking-wide"
          >
            Check out our latest reels straight from the feed. Tap to watch on Instagram.
          </motion.p>
        </div>

        {/* Clean Peek Track Slider */}
        <motion.div 
          variants={fadeInUpVariants}
          className="w-full pt-4 cursor-grab active:cursor-grabbing"
        >
          <div className="flex overflow-x-auto gap-6 scrollbar-none snap-x snap-mandatory px-0 pb-4 max-w-full after:content-[''] after:inline-block after:min-w-[20%] after:shrink-0 md:after:hidden md:grid md:grid-cols-4">
            {embedsData.map((embed) => (
              <div 
                key={embed.id} 
                className="min-w-[76%] md:min-w-0 snap-start flex flex-col"
              >
                {/* Borderless Glass Frame Container */}
                <div className="w-full relative overflow-hidden rounded-2xl bg-zinc-50 transition-all duration-500 shadow-sm hover:shadow-md min-h-[490px] md:min-h-[550px] flex flex-col justify-between">
                  
                  <blockquote
                    className="instagram-media w-full h-full m-0 p-0"
                    data-instgrm-permalink={embed.url}
                    data-instgrm-captioned={false}
                    data-instgrm-version="14"
                  >
                    {/* Minimal clean loading ring states */}
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-50/50">
                      <div className="w-5 h-5 rounded-full border border-zinc-200 border-t-zinc-800 animate-spin" />
                    </div>
                  </blockquote>

                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}