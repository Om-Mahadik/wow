"use client";

import { motion } from "framer-motion";

export default function CabinLocation() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const descString = "Neither too close nor too far, perfect escape is just few miles away.";
  const words = descString.split(" ");

  const mapUrl = "https://www.google.com/maps/place/Wind+Over+Waters+-+Glamping/@18.4325016,73.4947938,17z";
  const puneDirectionsUrl = "https://www.google.com/maps/dir/Pune,+Maharashtra/Wind+Over+Waters+-+Glamping";
  const mumbaiDirectionsUrl = "https://www.google.com/maps/dir/Mumbai,+Maharashtra/Wind+Over+Waters+-+Glamping";

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } },
  };

  const paraContainerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.02 } },
  };

  const wordVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
  };

  const mapVariants = {
    initial: { opacity: 0, scale: 0.99, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } },
  };

  return (
    <div className="w-full flex justify-center bg-white select-none pt-12 pb-20">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full md:max-w-[80vw] px-4 md:px-0"
      >
        {/* Responsive Framework Matrix: 1 Column on Mobile, 2 Column Split Sidebar on Widescreen PC layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT SIDE PANEL - Branding, copy metrics, data blocks, and map CTA button triggers */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Section Heading */}
            <div className="overflow-hidden py-0.5">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight text-zinc-900">
                Location
              </motion.h2>
            </div>

            {/* Word-Level Paragraph Split */}
            <motion.p
              variants={paraContainerVariants}
              className="text-base md:text-lg text-zinc-500 font-light leading-snug tracking-wide flex flex-wrap gap-x-[0.25em] -my-0.5"
            >
              {words.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden py-0.5">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.p>

            {/* Premium Distance Matrix Info Nodes Row */}
            <div className="grid grid-cols-2 pt-6 pb-2 items-center relative w-full max-w-sm">
              
              {/* Pune City Direction Portal */}
              <motion.a 
                href={puneDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants} 
                className="flex items-center gap-3.5 pl-1 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 transition-colors duration-300">
                  <svg 
                    className="w-4 h-4 text-zinc-800 rotate-[45deg] stroke-[1.8] group-hover:text-white transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-black">33 kms</span>
                  <span className="text-xs font-medium text-zinc-400 tracking-wide mt-0.5 group-hover:text-zinc-900 transition-colors">
                    From Pune
                  </span>
                </div>
              </motion.a>

              {/* Center Line Split Divider */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-200 h-full" />

              {/* Mumbai City Direction Portal */}
              <motion.a 
                href={mumbaiDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants} 
                className="flex items-center gap-3.5 pl-6 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 transition-colors duration-300">
                  <svg 
                    className="w-4 h-4 text-zinc-800 rotate-[45deg] stroke-[1.8] group-hover:text-white transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-black">146 km</span>
                  <span className="text-xs font-medium text-zinc-400 tracking-wide mt-0.5 group-hover:text-zinc-900 transition-colors">
                    From Mumbai
                  </span>
                </div>
              </motion.a>
            </div>

            {/* Open In Maps Trigger Button - Repositioned cleanly to the bottom, casing standard text case formatting */}
            <motion.div variants={itemVariants} className="w-full max-w-sm pt-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-zinc-50 hover:bg-zinc-100 active:scale-[0.99] transition-all duration-300 rounded-xl border border-zinc-200/60 flex items-center justify-center cursor-pointer text-sm font-medium tracking-wide text-zinc-700 hover:text-black shadow-sm"
              >
                Open in Google Maps
              </a>
            </motion.div>

          </div>

          {/* RIGHT SIDE PANEL - High Vibrancy Live Interactive Embedded Map Map widget canvas view */}
          {/* Increased margin space via Tailwind gap properties separating layout structural items beautifully */}
          <motion.div 
            variants={mapVariants}
            className="lg:col-span-7 relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] rounded-[32px] overflow-hidden border border-zinc-200/40 shadow-sm transform-gpu isolate saturate-[1.3] contrast-[1.05] brightness-[1.02]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.1274431952514!2d73.4947938!3d18.4325016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2a1883394c8e1%3A0x6a0c441b1d7d655f!2sWind%20Over%20Waters%20-%20Glamping!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0"
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