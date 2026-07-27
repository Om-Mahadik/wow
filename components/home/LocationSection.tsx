'use client';

import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';

export default function LocationSection() {
  const handleOpenMaps = () => {
    // Direct pin link for the location coordinates
    window.open('https://maps.google.com/?q=Wind+over+Waters+Mose+Bk+Maharashtra', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="w-full px-6 md:px-12 xl:px-24 py-20 bg-white select-none overflow-hidden">
      <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center">
        
        {/* Section Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-950 text-center tracking-tight leading-tight max-w-3xl mb-16"
        >
          Hidden away, yet <br className="sm:hidden" /> easily reached.
        </motion.h2>

        {/* Content Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive Embedded Google Maps Widget */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-md border border-zinc-100 bg-zinc-50"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.4746681014406!2d73.619047!3d18.416127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI0JzU4LjEiTiA3M8KwMzcnMDguNiJF!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wind over Waters Google Maps Location"
            />
          </motion.div>

          {/* Right: Distance Information */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center w-full lg:pl-6"
          >
            <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
              Located at Wind over Waters along Mose Bk, Maharashtra. A smooth, 
              scenic 2-hour drive from the city chaos makes it the perfect weekend escape.
            </p>

            {/* Travel Vectors Grid */}
            <div className="flex items-center gap-8 mb-10">
              {/* Pune */}
              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-zinc-950 rotate-[45deg] fill-zinc-950 mt-1" />
                <div>
                  <div className="text-2xl font-bold text-zinc-950 tracking-tight">33 kms</div>
                  <div className="text-sm text-zinc-400 font-medium">From Pune</div>
                </div>
              </div>

              {/* Vertical Separator */}
              <div className="h-12 w-[1px] bg-zinc-300 mx-2" />

              {/* Mumbai */}
              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-zinc-950 rotate-[45deg] fill-zinc-950 mt-1" />
                <div>
                  <div className="text-2xl font-bold text-zinc-950 tracking-tight">146 km</div>
                  <div className="text-sm text-zinc-400 font-medium">From Mumbai</div>
                </div>
              </div>
            </div>

            {/* External Button Link */}
            <button
              onClick={handleOpenMaps}
              className="w-full sm:max-w-md flex items-center justify-center gap-3 bg-zinc-100 hover:bg-zinc-200 transition-colors duration-200 py-4 px-6 rounded-2xl text-zinc-900 font-medium text-base shadow-sm group"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EA4335"/>
                <path d="M12 21.35c-.27 0-.53-.12-.7-.33C10.74 20.35 5 13.68 5 9c0-3.87 3.13-7 7-7s7 3.13 7 7c0 4.68-5.74 11.35-6.3 12.02-.17.21-.43.33-.7.33z" fill="none" stroke="#4285F4" strokeWidth="1"/>
              </svg>
              Open in Google Maps
            </button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}