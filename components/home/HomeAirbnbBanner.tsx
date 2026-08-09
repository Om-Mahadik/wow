"use client";

import React from "react";
import { motion } from "framer-motion";

interface HomeAirbnbBannerProps {
  url?: string;
}

export default function HomeAirbnbBanner({ url = "https://www.airbnb.co.in/rooms/1233873689915292788?source_impression_id=p3_1786270078_P3IJ2HBrqqao_lqg" }: HomeAirbnbBannerProps) {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: smoothEase },
    },
  };

  return (
    <div className="w-full flex justify-center bg-white select-none pt-0 pb-0">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-5%" }}
        className="flex flex-col items-center justify-center space-y-3 px-4 w-full"
      >
        {/* The Capsule CTA Card */}
        {/* Shadow increased to shadow-xl / shadow-lg, horizontal padding tightened from px-7 to px-4 */}
        <motion.a
          variants={fadeInUpVariants}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 bg-white border border-zinc-100/80 px-4 py-4 rounded-[40px] shadow-[0_12px_38px_rgba(0,0,0,0.07)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.1)] active:scale-[0.99] transition-all duration-300 w-full max-w-[290px] sm:max-w-[360px] cursor-pointer group"
        >
          {/* Headline Callout */}
          <span className="text-sm sm:text-base text-zinc-900 font-medium leading-tight tracking-tight text-left max-w-[110px] sm:max-w-[130px]">
            Also Available to Book on
          </span>

          {/* Airbnb Vector Branding Logo */}
          {/* Logo height increased from h-7/h-8 to h-8.5/h-10 */}
          <img
            src="/others/airbnb.svg"
            alt="Airbnb logo"
            className="h-8.5 sm:h-10 object-contain group-hover:scale-[1.02] transition-transform duration-300 shrink-0"
          />
        </motion.a>

        {/* Live Catalog Performance Metric Label */}
        <motion.span 
          variants={fadeInUpVariants}
          className="text-[11px] sm:text-xs text-zinc-400 font-light tracking-wide"
        >
          4.79 Ratings with 62 Reviews
        </motion.span>
      </motion.div>
    </div>
  );
}