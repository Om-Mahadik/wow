"use client";

import { motion } from "framer-motion";

export default function CabinLocation() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const descString = "Neither too close nor too far, perfect escape is just a few miles away.";
  const words = descString.split(" ");

  // Exact Google Maps Place Target Links
  const mapUrl = "https://maps.app.goo.gl/2VgWzuaBRBH4hq8n8";
  const puneDirectionsUrl = "https://www.google.com/maps/dir/Pune+Railway+Station,+Pune,+Maharashtra/Wind+Over+Waters+-+Glamping";
  const mumbaiDirectionsUrl = "https://www.google.com/maps/dir/Chhatrapati+Shivaji+Maharaj+Terminus,+Mumbai,+Maharashtra/Wind+Over+Waters+-+Glamping";

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
  };

  const paraContainerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.02 } },
  };

  const wordVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
  };

  const mapVariants = {
    initial: { opacity: 0, scale: 0.99, y: 15 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
  };

  return (
    <div className="w-full flex justify-center bg-white select-none pt-10 pb-8">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full md:max-w-[80vw] px-4 md:px-0"
      >
        {/* Responsive Grid Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT SIDE PANEL */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            
            {/* Section Heading (Tightened space below) */}
            <div className="overflow-hidden py-0.5">
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
                Location
              </motion.h2>
            </div>

            {/* Word-Level Animated Paragraph (Subline) */}
            <motion.p
              variants={paraContainerVariants}
              className="text-base md:text-lg text-zinc-500 font-light leading-relaxed tracking-wide flex flex-wrap gap-x-[0.25em] -my-0.5 max-w-xl pb-3"
            >
              {words.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden py-0.5">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.p>

            {/* Distance Cards (Added clear separation above) */}
            <div className="grid grid-cols-2 gap-3 pt-3 w-full max-w-md">
              
              {/* Pune Route Card */}
              <motion.a 
                href={puneDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants} 
                className="flex flex-col justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100/90 border border-zinc-200/70 transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-700 transition-colors">
                    From Pune
                  </span>
                  <div className="w-8.5 h-8.5 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-300 shadow-2xs">
                    <RoutePathIcon />
                  </div>
                </div>
                <div>
                  <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">62 km</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <ClockIcon />
                    <p className="text-xs font-medium text-zinc-500 tracking-wide">1.5 - 2 hrs drive</p>
                  </div>
                </div>
              </motion.a>

              {/* Mumbai Route Card */}
              <motion.a 
                href={mumbaiDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants} 
                className="flex flex-col justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100/90 border border-zinc-200/70 transition-all duration-300 group cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-700 transition-colors">
                    From Mumbai
                  </span>
                  <div className="w-8.5 h-8.5 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-300 shadow-2xs">
                    <RoutePathIcon />
                  </div>
                </div>
                <div>
                  <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">155 km</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <ClockIcon />
                    <p className="text-xs font-medium text-zinc-500 tracking-wide">3.5 - 4 hrs drive</p>
                  </div>
                </div>
              </motion.a>

            </div>

            {/* Open In Maps Trigger Button */}
            <motion.div variants={itemVariants} className="w-full max-w-md pt-1">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] transition-all duration-300 rounded-2xl flex items-center justify-center gap-2 cursor-pointer text-xs font-bold tracking-[0.15em] uppercase text-white shadow-xs hover:shadow-sm"
              >
                <MapPinIcon />
                Open in Google Maps
              </a>
            </motion.div>

          </div>

          {/* RIGHT SIDE PANEL - Verified Official Google Maps Embed Canvas */}
          <motion.div 
            variants={mapVariants}
            className="lg:col-span-7 relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] rounded-[28px] overflow-hidden border border-zinc-200/80 shadow-xs transform-gpu isolate group"
          >
            {/* Top Interactive Badge */}
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-200/80 shadow-2xs flex items-center gap-2 hover:bg-white transition-all cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-800 tracking-wide">Wind Over Waters - Glamping</span>
            </a>

            {/* Embed Frame mapped directly to place ID */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.1274431952514!2d73.5771637!3d18.3859574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2a1883394c8e1%3A0x6a0c441b1d7d655f!2sWind%20Over%20Waters%20-%20Glamping!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0 saturate-[1.1] contrast-[1.02]"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// CUSTOM VECTOR ICONS
// ==========================================

function RoutePathIcon() {
  return (
    <svg 
      className="w-4 h-4 text-zinc-800 group-hover:text-white transition-colors duration-300" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.818V8.052a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-zinc-400 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-4 h-4 text-white stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}