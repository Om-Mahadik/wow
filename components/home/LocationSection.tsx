'use client';

import { motion } from 'framer-motion';

export default function LocationSection() {
  // Exact Google Maps Target Links
  const mapUrl = "https://maps.app.goo.gl/2VgWzuaBRBH4hq8n8";
  const puneDirectionsUrl = "https://www.google.com/maps/dir/Pune+Railway+Station,+Pune,+Maharashtra/Wind+Over+Waters+-+Glamping";
  const mumbaiDirectionsUrl = "https://www.google.com/maps/dir/Chhatrapati+Shivaji+Maharaj+Terminus,+Mumbai,+Maharashtra/Wind+Over+Waters+-+Glamping";

  const handleOpenMaps = () => {
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
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
            className="lg:col-span-6 relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-md border border-zinc-100 bg-zinc-50 group"
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

            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.1274431952514!2d73.5771637!3d18.3859574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2a1883394c8e1%3A0x6a0c441b1d7d655f!2sWind%20Over%20Waters%20-%20Glamping!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
              className="w-full h-full border-0 saturate-[1.1] contrast-[1.02]"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wind Over Waters Google Maps Location"
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
              Located along Varasgaon backwaters, Panshet, Maharashtra. A smooth scenic 1.5 hrs drive from the city chaos makes it a perfect weekend getaway.
            </p>

            {/* Travel Vectors Grid */}
            <div className="flex items-center gap-8 mb-10">
              {/* Pune */}
              <a 
                href={puneDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group cursor-pointer"
              >
                <RoutePathIcon />
                <div>
                  <div className="text-2xl font-bold text-zinc-950 tracking-tight group-hover:text-zinc-700 transition-colors">62 km</div>
                  <div className="text-sm text-zinc-400 font-medium">From Pune</div>
                  <div className="text-xs text-zinc-500 font-medium mt-0.5">1.5 - 2 hrs drive</div>
                </div>
              </a>

              {/* Vertical Separator */}
              <div className="h-14 w-[1px] bg-zinc-300 mx-2" />

              {/* Mumbai */}
              <a 
                href={mumbaiDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group cursor-pointer"
              >
                <RoutePathIcon />
                <div>
                  <div className="text-2xl font-bold text-zinc-950 tracking-tight group-hover:text-zinc-700 transition-colors">155 km</div>
                  <div className="text-sm text-zinc-400 font-medium">From Mumbai</div>
                  <div className="text-xs text-zinc-500 font-medium mt-0.5">3.5 - 4 hrs drive</div>
                </div>
              </a>
            </div>

            {/* Original Shape Minimal Premium Button */}
            <button
              onClick={handleOpenMaps}
              className="w-full sm:max-w-md py-4 px-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] transition-all duration-300 flex items-center justify-center cursor-pointer text-xs font-bold tracking-[0.15em] uppercase text-white shadow-xs hover:shadow-sm"
            >
              Open in Maps
            </button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

function RoutePathIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 group-hover:bg-zinc-900 transition-all duration-300 mt-0.5">
      <svg 
        className="w-4 h-4 text-zinc-800 group-hover:text-white transition-colors duration-300" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.818V8.052a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    </div>
  );
}