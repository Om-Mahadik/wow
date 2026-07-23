"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CabinAmenities() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: smoothEase },
    },
  };

  const featuredAmenities = [
    { name: "Lake View", icon: <LakeIcon /> },
    { name: "Car Parking", icon: <ParkingIcon /> },
    { name: "Container Stay", icon: <ContainerIcon /> },
    { name: "Free Wifi", icon: <WifiIcon /> },
    { name: "Kitchen", icon: <KitchenIcon /> },
    { name: "Air Conditions", icon: <AcIcon /> },
    { name: "Private Deck", icon: <DeckIcon /> },
    { name: "Bonfire Pit", icon: <BonfireIcon /> },
  ];

  const categorizedAmenities = [
    {
      category: "Scenic Views",
      items: [
        { name: "Lake View", icon: <LakeIcon /> },
        { name: "Mountain View", icon: <MountainIcon /> },
        { name: "Forest View", icon: <ForestIcon /> },
      ],
    },
    {
      category: "Essentials & Comfort",
      items: [
        { name: "Free Wifi", icon: <WifiIcon /> },
        { name: "Air Conditions", icon: <AcIcon /> },
        { name: "Kitchen Setup", icon: <KitchenIcon /> },
        { name: "Hot Shower", icon: <ShowerIcon /> },
        { name: "Power Backup", icon: <PowerIcon /> },
      ],
    },
    {
      category: "Outdoors & Layout",
      items: [
        { name: "Private Deck", icon: <DeckIcon /> },
        { name: "Bonfire Pit", icon: <BonfireIcon /> },
        { name: "Car Parking", icon: <ParkingIcon /> },
        { name: "Container Architecture", icon: <ContainerIcon /> },
        { name: "BBQ Grill Zone", icon: <BbqIcon /> },
      ],
    },
  ];

  return (
    <div className="w-full flex justify-center bg-white select-none pt-8">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.15 }}
        className="w-full md:max-w-[80vw] flex flex-col justify-start px-4 md:px-0 space-y-4"
      >
        {/* Title */}
        <div className="overflow-hidden py-0.5">
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold tracking-tight text-zinc-900"
          >
            Amenities
          </motion.h2>
        </div>

        {/* 2-Column Mobile, 4-Column Desktop Matrix */}
        {/* Consistent typography mapping: text-zinc-500 font-light tracking-wide */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 pt-1">
          {featuredAmenities.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center gap-3 group py-1"
            >
              <div className="text-black transition-transform duration-300 group-hover:scale-105 shrink-0">
                {item.icon}
              </div>
              <span className="text-sm md:text-base text-zinc-500 font-light tracking-wide truncate">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Interactive Drawer Button Trigger */}
        <motion.div variants={itemVariants} className="pt-2 w-full">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="w-full py-4 bg-zinc-50 hover:bg-zinc-100 active:scale-[0.99] transition-all duration-300 rounded-xl border border-zinc-200/60 flex items-center justify-center gap-2 cursor-pointer group shadow-sm"
          >
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-800 transition-colors group-hover:text-black">
              ⚡ Show all 23 Amenities
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Drawer Modal Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Darkened Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            {/* Slide-Up Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.7, ease: smoothEase }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto bg-white rounded-t-[32px] border-t border-zinc-100 p-6 md:p-10 shadow-2xl flex justify-center"
            >
              <div className="w-full md:max-w-[50vw] flex flex-col relative">
                
                {/* Pull Tab Bar */}
                <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mb-6 shrink-0" />
                
                {/* Header Container */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900">All Amenities</h3>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-9 h-9 bg-zinc-100 hover:bg-zinc-200 rounded-full flex items-center justify-center text-zinc-800 transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Categories Wrapper */}
                <div className="flex flex-col gap-8 pt-8 pb-12">
                  {categorizedAmenities.map((cat, idx) => (
                    <div key={idx} className="flex flex-col space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                        {cat.category}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cat.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-3.5 py-2.5">
                            <div className="text-black shrink-0">{item.icon}</div>
                            {/* Typography consistency: text-zinc-500 font-light */}
                            <span className="text-base text-zinc-500 font-light tracking-wide">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Inline Vector Graphics Elements (Black stroke styling layout)
function LakeIcon() { return <svg className="w-5 h-5 md:w-6 md:h-6 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18M3 21h18M5 13l2.5-2.5 3 3 4.5-4.5 4 4" /><circle cx="17" cy="6" r="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 13V5M4 8h6" /></svg>; }
function ParkingIcon() { return <svg className="w-5 h-5 md:w-6 md:h-6 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7h4a3 3 0 0 1 0 6H9" /></svg>; }
function ContainerIcon() { return <svg className="w-5 h-5 md:w-6 md:h-6 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></svg>; }
function WifiIcon() { return <svg className="w-5 h-5 md:w-6 md:h-6 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" className="fill-black" /></svg>; }
function KitchenIcon() { return <svg className="w-5 h-5 md:w-6 md:h-6 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 2v20M5 2v5a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2M16 2v20M16 2v6a4 4 0 0 1-4 4v10" /></svg>; }
function AcIcon() { return <svg className="w-5 h-5 md:w-6 md:h-6 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M20 4l-16 16M4 4l16 16M9 9l-2-2M15 9l2-2M9 15l-2 2M15 15l2 2" /></svg>; }
function DeckIcon() { return <svg className="w-5 h-5 md:w-6 md:h-6 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" /></svg>; }
function BonfireIcon() { return <svg className="w-5 h-5 md:w-6 md:h-6 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2c0 0-3.5 3.5-3.5 6.5s2.5 4.5 3.5 6.5c1-2 3.5-3.5 3.5-6.5S12 2 12 2zM7 22h10M9 19h6" /></svg>; }

// Secondary Drawer Graphic Assets
function MountainIcon() { return <svg className="w-5 h-5 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2 20L12 4l10 16H2z" /></svg>; }
function ForestIcon() { return <svg className="w-5 h-5 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.5 7H8.5L12 2zm0 6l4.5 9H7.5l4.5-9zm0 8v5" /></svg>; }
function ShowerIcon() { return <svg className="w-5 h-5 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 4a5 5 0 0 1 10 0v12a5 5 0 0 1-10 0V4zM12 16v5" /></svg>; }
function PowerIcon() { return <svg className="w-5 h-5 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>; }
function BbqIcon() { return <svg className="w-5 h-5 stroke-black" fill="none" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M4 11h16a8 8 0 0 1-16 0zM6 19l-1 3M18 19l1 3" /></svg>; }