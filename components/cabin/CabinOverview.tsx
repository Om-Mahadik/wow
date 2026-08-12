'use client';

import { motion } from 'framer-motion';

export default function CabinOverview() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const textString =
    'The wind, the waters & the forest await to give you a serene experience at the Wind over Waters. This is a glamping property with 2 Coons, aka cabins.';
  const words = textString.split(' ');

  const airbnbCabins = [
    {
      name: 'WOW Cabin 01',
      rating: '4.92',
      reviews: '128',
      image: '/images/deck-1.jpg',
      url: 'https://www.airbnb.co.in/rooms/1232353131595460643',
    },
    {
      name: 'WOW Cabin 02',
      rating: '4.89',
      reviews: '48',
      image: '/images/deck-2.jpg',
      url: 'https://www.airbnb.co.in/rooms/1233873689915292788',
    },
  ];

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const titleRevealVariants = {
    initial: { opacity: 0, y: 32 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: smoothEase },
    },
  };

  const paraContainerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const wordVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  };

  const pillVariants = {
    initial: { opacity: 0, scale: 0.96, y: 16 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 24, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: smoothEase, delay: 0.4 },
    },
  };

  return (
    <div className="w-full flex justify-center bg-white select-none pt-6 pb-12">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-5%' }}
        className="w-full md:max-w-[80vw] px-4 md:px-0 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
      >
        {/* LEFT COLUMN: Overview Text & Spec Pills */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Title */}
          <div className="overflow-hidden py-0.5">
            <motion.h2
              variants={titleRevealVariants}
              className="text-2xl font-bold tracking-tight text-zinc-900"
            >
              Overview
            </motion.h2>
          </div>

          {/* Word-Level Paragraph Animation */}
          <motion.p
            variants={paraContainerVariants}
            className="text-base md:text-lg text-zinc-500 font-light max-w-2xl leading-relaxed tracking-wide flex flex-wrap gap-x-[0.25em] -my-0.5"
          >
            {words.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden py-0.5">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.p>

          {/* Spec Pills Row */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap items-center gap-3 pt-5"
          >
            {/* Beds Pill */}
            <motion.div
              variants={pillVariants}
              whileHover={{ y: -3, boxShadow: '0 6px 16px rgba(0,0,0,0.04)' }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-zinc-200/60 bg-[#fafafa] text-zinc-700 shadow-sm transition-all duration-300 origin-left"
            >
              <svg
                className="w-5 h-5 text-zinc-800 stroke-[1.5]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5M3 5.25h18v13.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25Z"
                />
              </svg>
              <span className="text-sm font-medium tracking-wide">2 Beds</span>
            </motion.div>

            {/* Guests Pill */}
            <motion.div
              variants={pillVariants}
              whileHover={{ y: -3, boxShadow: '0 6px 16px rgba(0,0,0,0.04)' }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-zinc-200/60 bg-[#fafafa] text-zinc-700 shadow-sm transition-all duration-300 origin-left"
            >
              <svg
                className="w-5 h-5 text-zinc-800 stroke-[1.5]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              <span className="text-sm font-medium tracking-wide">4 Guests</span>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Small Compact Booking Card with Links & Check Availability */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
          <motion.div
            variants={cardVariants}
            className="w-full max-w-[380px] bg-white rounded-[28px] p-5 border border-zinc-200/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] flex flex-col space-y-4"
          >
            {/* Header & Pricing */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Book via Airbnb
              </span>
              <div className="text-right">
                <span className="text-xs text-zinc-400 font-light">From </span>
                <span className="text-lg font-bold text-zinc-950">₹4,250</span>
                <span className="text-xs text-zinc-400 font-light"> /night</span>
              </div>
            </div>

            {/* Airbnb Links List */}
            <div className="flex flex-col space-y-2.5">
              {airbnbCabins.map((cabin, i) => (
                <a
                  key={i}
                  href={cabin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center p-2.5 rounded-[18px] bg-zinc-50/70 border border-zinc-200/60 hover:bg-white hover:border-zinc-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative w-12 h-12 rounded-[12px] overflow-hidden shrink-0 bg-zinc-100">
                    <img
                      src={cabin.image}
                      alt={cabin.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1 left-1 bg-zinc-950/80 p-0.5 rounded-full shadow-2xs">
                      <AirbnbIcon className="w-2 h-2 text-white" />
                    </div>
                  </div>

                  <div className="ml-3 flex-1 flex flex-col justify-center min-w-0">
                    <h4 className="text-xs font-semibold text-zinc-900 tracking-tight group-hover:text-zinc-600 transition-colors truncate">
                      {cabin.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-0.5">
                      <div className="flex items-center gap-0.5 text-zinc-900 font-medium">
                        <StarIcon />
                        <span>{cabin.rating}</span>
                      </div>
                      <span className="text-zinc-300">•</span>
                      <span className="text-zinc-400">({cabin.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-950 group-hover:text-white group-hover:border-zinc-950 transition-all duration-300 shrink-0 ml-1">
                    <svg
                      className="w-2.5 h-2.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            {/* Check Availability CTA Button */}
            <a
              href={airbnbCabins[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-zinc-950 text-white rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-zinc-800 active:scale-98 transition-all shadow-xs group"
            >
              <span>Check Availability</span>
              <svg
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function AirbnbIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={`${className} fill-current shrink-0`} viewBox="0 0 32 32">
      <path d="M16 1c-2.007 0-3.612 1.2-4.498 3.142l-9.865 19.57c-.604 1.258-.657 2.685-.145 3.966C2.003 28.96 3.09 29.837 4.393 30h23.213c1.304-.163 2.39-.107 2.902-1.322.512-1.28.46-2.708-.145-3.966L20.498 4.143C19.612 2.2 18.007 1 16 1zm0 3c.993 0 1.812.632 2.247 1.583l9.866 19.563c.277.577.303 1.154.075 1.72-.228.568-.748 1.05-1.402 1.134H5.214c-.655-.084-1.174-.566-1.402-1.134-.228-.566-.202-1.143.075-1.72l9.866-19.563C14.188 4.632 15.007 4 16 4zm0 9c-2.206 0-4 1.794-4 4 0 1.722 1.096 3.176 2.622 3.738L16 22.868l1.378-2.13C18.904 20.176 20 18.722 20 17c0-2.206-1.794-4-4-4zm0 2c1.106 0 2 .894 2 2 0 .74-.403 1.377-1.002 1.71L16 20.264l-.998-1.553C14.403 18.378 14 17.74 14 17c0-1.106.894-2 2-2z" />
    </svg>
  );
}