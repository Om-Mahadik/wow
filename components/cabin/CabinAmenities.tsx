"use client";

import React, { useState } from "react";
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

  // Showcase layout rows
  const featuredAmenities = [
    { name: "Lake Access", icon: <WaterIcon /> },
    { name: "Free Car Park", icon: <ParkingIcon /> },
    { name: "Air Conditioning", icon: <AcIcon /> },
    { name: "Free Wifi", icon: <WifiIcon /> },
    { name: "Kitchenette", icon: <KitchenIcon /> },
    { name: "Patio or Balcony", icon: <DeckIcon /> },
    { name: "Water Purifier", icon: <PurifierIcon /> },
    { name: "Hammock", icon: <HammockIcon /> },
  ];

  // Map distinct semantic icons across all catalog targets
  const categorizedAmenities = [
    {
      category: "Bathroom",
      items: [
        { name: "Cleaning products", icon: <SparklesIcon /> },
        { name: "Shampoo", icon: <SoapIcon /> },
        { name: "Hot water", icon: <FlameIcon /> },
        { name: "Shower gel", icon: <SoapIcon /> },
        { name: "Towels, bed sheets, soap and toilet paper", icon: <TowelIcon /> },
      ],
    },
    {
      category: "Bed linen",
      items: [
        { name: "Extra pillows and blankets", icon: <BedIcon /> },
        { name: "Room-darkening blinds", icon: <BlindsIcon /> },
        { name: "Air conditioning", icon: <AcIcon /> },
      ],
    },
    {
      category: "Home safety",
      items: [
        { name: "Fire extinguisher", icon: <ShieldIcon /> },
        { name: "First aid kit", icon: <ShieldIcon /> },
      ],
    },
    {
      category: "Internet and office",
      items: [
        { name: "Wifi", icon: <WifiIcon /> },
      ],
    },
    {
      category: "Kitchen and dining",
      items: [
        { name: "Induction stove", icon: <StoveIcon /> },
        { name: "Fridge & Mini fridge", icon: <FridgeIcon /> },
        { name: "Microwave", icon: <MicrowaveIcon /> },
        { name: "Cooking basics", icon: <KitchenIcon /> },
        { name: "Crockery and cutlery", icon: <UtensilsIcon /> },
        { name: "Freezer", icon: <FridgeIcon /> },
        { name: "Wine glasses", icon: <WineIcon /> },
        { name: "Coffee setup", icon: <CoffeeIcon /> },
        { name: "Water purifier", icon: <PurifierIcon /> },
        { name: "Camping Stove and camping gas", icon: <StoveIcon /> },
      ],
    },
    {
      category: "Location features",
      items: [
        { name: "Waterfront (Right next to a body of water)", icon: <WaterIcon /> },
        { name: "Lake access (Path or dock access)", icon: <WaterIcon /> },
      ],
    },
    {
      category: "Outdoor",
      items: [
        { name: "Patio or balcony", icon: <DeckIcon /> },
        { name: "Outdoor furniture", icon: <DeckIcon /> },
        { name: "Hammock", icon: <HammockIcon /> },
      ],
    },
    {
      category: "Parking and facilities",
      items: [
        { name: "Free car park on premises", icon: <ParkingIcon /> },
      ],
    },
    {
      category: "Services",
      items: [
        { name: "Smoking allowed", icon: <SmokingIcon /> },
        { name: "Self check-in via Lockbox", icon: <KeyIcon /> },
      ],
    },
  ];

  const totalCount = categorizedAmenities.reduce((acc, curr) => acc + curr.items.length, 0);

  return (
    <div className="w-full flex justify-center bg-white select-none pt-8">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full md:max-w-[80vw] flex flex-col justify-start px-4 md:px-0 space-y-4"
      >
        {/* Title Stack with Naturally Integrated Wilderness Context */}
        <div className="space-y-2">
          <div className="overflow-hidden py-0.5">
            <motion.h2 variants={itemVariants} className="text-2xl font-bold tracking-tight text-zinc-900">
              Amenities
            </motion.h2>
          </div>
          <motion.p 
            variants={itemVariants} 
            className="text-base text-zinc-500 font-light max-w-3xl leading-relaxed tracking-wide"
          >
            Everything you need for a comfortable stay. Plan for it like you're going camping — power and network may fluctuate, and that's part of the magic.
          </motion.p>
        </div>

        {/* Showcase Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 pt-2">
          {featuredAmenities.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="flex items-center gap-3.5 group py-1">
              <div className="text-black transition-transform duration-300 group-hover:scale-105 shrink-0">
                {item.icon}
              </div>
              <span className="text-sm md:text-base text-zinc-500 font-light tracking-wide truncate">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Interactive Open Actions */}
        <motion.div variants={itemVariants} className="pt-3 w-full">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="w-full py-4 bg-zinc-50 hover:bg-zinc-100 active:scale-[0.99] transition-all duration-300 rounded-xl border border-zinc-200/60 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-zinc-800 transition-colors group-hover:text-black">
              Show all {totalCount} Amenities
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Drawer Overlay Mechanism */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto bg-white rounded-t-[36px] p-6 md:p-10 flex justify-center border-t border-zinc-100"
            >
              <div className="w-full md:max-w-[55vw] flex flex-col relative">
                <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mb-6 shrink-0" />
                
                <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900">All Amenities</h3>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-9 h-9 bg-zinc-100 hover:bg-zinc-200 rounded-full flex items-center justify-center text-zinc-800 transition-colors cursor-pointer text-sm"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-10 pt-8 pb-16">
                  {categorizedAmenities.map((cat, idx) => (
                    <div key={idx} className="flex flex-col space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                        {cat.category}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                        {cat.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-3 py-1.5">
                            <div className="text-black shrink-0 mt-0.5">{item.icon}</div>
                            <span className="text-base text-zinc-500 font-light tracking-wide leading-snug">
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

// ==========================================
// MATTE VECTOR LINE ART STROKES
// ==========================================

function WaterIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 14c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M3 18c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" /></svg>; }
function ParkingIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7h4a3 3 0 0 1 0 6H9" /></svg>; }
function AcIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M20 4l-16 16M4 4l16 16" /></svg>; }
function WifiIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.53 16.11a6 6 0 0 1 6.95 0M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0" /><circle cx="12" cy="20" r="1" className="fill-black" /></svg>; }
function KitchenIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M4 7h16M4 12h16M4 17h16" /></svg>; }
function DeckIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" /></svg>; }
function PurifierIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s9.75 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>; }
function HammockIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2 8s4 6 10 6 10-6 10-6M2 8v4m20-4v4" /></svg>; }

// CATEGORY ICON EXTENSIONS
function SparklesIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15.087l5.096-.813L9 9l.813 5.274 5.096.813-5.096.817zM19.071 4.929l-.356 2.23-2.23.356 2.23.356.356 2.23.356-2.23 2.23-.356-2.23-.356-.356-2.23z" /></svg>; }
function SoapIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><rect width="14" height="18" x="5" y="3" rx="4" /><path d="M9 7h6M9 11h6" /></svg>; }
function FlameIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
function TowelIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v14H4zM4 10h16M4 15h16" /></svg>; }
function BedIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2 4v16M2 11h20M22 4v16M6 8h4M2 16h20" /></svg>; }
function BlindsIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18" /></svg>; }
function ShieldIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>; }
function StoveIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="8" cy="9" r="2" /><circle cx="16" cy="9" r="2" /><circle cx="8" cy="16" r="1" /><circle cx="16" cy="16" r="1" /></svg>; }
function FridgeIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><rect width="14" height="20" x="5" y="2" rx="2" /><path d="M5 10h14M9 5v2M9 14v3" /></svg>; }
function MicrowaveIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><rect width="18" height="14" x="3" y="5" rx="2" /><rect width="10" height="8" x="6" y="8" rx="1" /><circle cx="18" cy="9" r="1" /><circle cx="18" cy="12" r="1" /></svg>; }
function UtensilsIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 3v7a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V3M8 3v18M20 21v-8a3 3 0 0 0-3-3h-1V3h4" /></svg>; }
function WineIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15a5 5 0 0 0 5-5V4H7v6a5 5 0 0 0 5 5zm0 0v5m-4 0h8" /></svg>; }
function CoffeeIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8zM6 2v2M10 2v2M14 2v2" /></svg>; }
// Using a universal custom icon variant placeholder to avoid complex path issues
function SmokingIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 12H3m15 0h3M18 9v6M3 15h9m6-11c.5 1-.5 2-1 3.5s.5 2 1 3.5" /></svg>; }
function KeyIcon() { return <svg className="w-5 h-5 stroke-black fill-none stroke-[1.5]" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 1 1-7.029-5.912c.056-.007.113-.005.168-.005H21v3.75H18v3H15.75v1.75l-1.5 1.5-1.5-1.5V8.25z" /></svg>; }