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

  // Mobile Showcase Items (8 Items)
  const mobileFeaturedAmenities = [
    { name: "Lake Access", icon: <LakeWaterfrontIcon /> },
    { name: "Free Car Park", icon: <ParkingIcon /> },
    { name: "Air Conditioning", icon: <AcIcon /> },
    { name: "Free Wifi", icon: <WifiIcon /> },
    { name: "Kitchenette", icon: <KitchenetteIcon /> },
    { name: "Patio or Balcony", icon: <PatioDeckIcon /> },
    { name: "Water Purifier", icon: <WaterPurifierIcon /> },
    { name: "Hammock", icon: <HammockIcon /> },
  ];

  // Desktop Showcase Items (16 Items for a full 4x4 grid)
  const desktopFeaturedAmenities = [
    { name: "Lake Access", icon: <LakeWaterfrontIcon /> },
    { name: "Free Car Park", icon: <ParkingIcon /> },
    { name: "Air Conditioning", icon: <AcIcon /> },
    { name: "Free Wifi", icon: <WifiIcon /> },
    { name: "Kitchenette", icon: <KitchenetteIcon /> },
    { name: "Patio or Balcony", icon: <PatioDeckIcon /> },
    { name: "Water Purifier", icon: <WaterPurifierIcon /> },
    { name: "Hammock", icon: <HammockIcon /> },
    { name: "Induction Stove", icon: <InductionStoveIcon /> },
    { name: "Fridge & Mini Fridge", icon: <FridgeIcon /> },
    { name: "Hot Water", icon: <HotWaterShowerIcon /> },
    { name: "Coffee Setup", icon: <CoffeeMakerIcon /> },
    { name: "Outdoor Furniture", icon: <OutdoorFurnitureIcon /> },
    { name: "First Aid Kit", icon: <FirstAidIcon /> },
    { name: "Self Check-in", icon: <LockboxKeyIcon /> },

  ];

  // Categorized Catalog Items with 100% matched icons
  const categorizedAmenities = [
    {
      category: "Bathroom",
      items: [
        { name: "Cleaning products", icon: <CleaningProductsIcon /> },
        { name: "Shampoo", icon: <ShampooIcon /> },
        { name: "Hot water", icon: <HotWaterShowerIcon /> },
        { name: "Shower gel", icon: <ShowerGelIcon /> },
        { name: "Towels, bed sheets, soap and toilet paper", icon: <TowelsLinenIcon /> },
      ],
    },
    {
      category: "Bed linen & Comfort",
      items: [
        { name: "Extra pillows and blankets", icon: <PillowsBlanketsIcon /> },
        { name: "Room-darkening blinds", icon: <DarkeningBlindsIcon /> },
        { name: "Air conditioning", icon: <AcIcon /> },
      ],
    },
    {
      category: "Home safety",
      items: [
        { name: "Fire extinguisher", icon: <FireExtinguisherIcon /> },
        { name: "First aid kit", icon: <FirstAidIcon /> },
      ],
    },
    {
      category: "Internet & Connectivity",
      items: [
        { name: "Wifi", icon: <WifiIcon /> },
      ],
    },
    {
      category: "Kitchen and dining",
      items: [
        { name: "Induction stove", icon: <InductionStoveIcon /> },
        { name: "Fridge & Mini fridge", icon: <FridgeIcon /> },
        { name: "Microwave", icon: <MicrowaveIcon /> },
        { name: "Cooking basics", icon: <KitchenetteIcon /> },
        { name: "Crockery and cutlery", icon: <CrockeryCutleryIcon /> },
        { name: "Freezer", icon: <FreezerIcon /> },

        { name: "Coffee setup", icon: <CoffeeMakerIcon /> },
        { name: "Water purifier", icon: <WaterPurifierIcon /> },
        { name: "Camping Stove and gas", icon: <CampingStoveIcon /> },
      ],
    },
    {
      category: "Location features",
      items: [
        { name: "Waterfront (Right next to a body of water)", icon: <WaterfrontIcon /> },
        { name: "Lake access (Path or dock access)", icon: <LakeWaterfrontIcon /> },
      ],
    },
    {
      category: "Outdoor Space",
      items: [
        { name: "Patio or balcony", icon: <PatioDeckIcon /> },
        { name: "Outdoor furniture", icon: <OutdoorFurnitureIcon /> },
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
        { name: "Self check-in via Lockbox", icon: <LockboxKeyIcon /> },
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
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
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

        {/* Mobile Showcase Items Grid (8 Items) */}
        <div className="grid grid-cols-2 md:hidden gap-y-4 gap-x-6 pt-2">
          {mobileFeaturedAmenities.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="flex items-center gap-3.5 group py-1">
              <div className="text-zinc-900 transition-transform duration-300 group-hover:scale-105 shrink-0">
                {item.icon}
              </div>
              <span className="text-sm text-zinc-500 font-light tracking-wide truncate">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Desktop Showcase Items Grid (16 Items - 4x4 Grid) */}
        <div className="hidden md:grid md:grid-cols-4 gap-y-6 gap-x-8 pt-4">
          {desktopFeaturedAmenities.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="flex items-center gap-4 group py-1.5">
              <div className="text-zinc-900 transition-transform duration-300 group-hover:scale-110 shrink-0">
                {item.icon}
              </div>
              <span className="text-base text-zinc-600 font-light tracking-wide truncate group-hover:text-zinc-900 transition-colors">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Interactive Open Actions */}
        <motion.div variants={itemVariants} className="pt-4 w-full">
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
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto bg-white rounded-t-[36px] p-6 md:p-10 flex justify-center border-t border-zinc-100 shadow-2xl"
            >
              <div className="w-full md:max-w-[55vw] flex flex-col relative">
                <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mb-6 shrink-0" />
                
                <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900">All Amenities</h3>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-9 h-9 bg-zinc-100 hover:bg-zinc-200 rounded-full flex items-center justify-center text-zinc-800 transition-colors cursor-pointer text-sm font-bold"
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
                            <div className="text-zinc-900 shrink-0 mt-0.5">{item.icon}</div>
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
// PRECISE SEMANTIC VECTOR ICONS
// ==========================================

function LakeWaterfrontIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 18c2.5 0 2.5-1.5 5-1.5s2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5M2 21c2.5 0 2.5-1.5 5-1.5s2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 13l3.5-6L11 13m4 0l2.5-4L20 13" />
    </svg>
  );
}

function WaterfrontIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v10m0 0l-3-3m3 3l3-3M2 18c2.5 0 2.5-1.5 5-1.5s2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7h4.5a3 3 0 110 6H9" />
    </svg>
  );
}

function AcIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="8" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12v3m5-3v4m5-4v3M6 8h.01M18 8h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18c.5 1 1 1.5 2 1.5s1.5-.5 2-1.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8.5 14.5a5 5 0 017 0M5 11a10 10 0 0114 0M1.5 7.5a15 15 0 0121 0" />
    </svg>
  );
}

function KitchenetteIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 10h18M3 14h18M3 18h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v18M19 3v18" />
    </svg>
  );
}

function PatioDeckIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16M4 14h16M4 10h16M4 6h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v18M18 3v18" />
    </svg>
  );
}

function WaterPurifierIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-4.5 5.5-7 8.5-7 11.75a7 7 0 0014 0c0-3.25-2.5-6.25-7-11.75z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l2 2 4-4" />
    </svg>
  );
}

function HammockIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6v12M21 6v12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9c0 6 4.5 10 9 10s9-4 9-10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
    </svg>
  );
}

function InductionStoveIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="2.5" />
      <circle cx="15.5" cy="8.5" r="2.5" />
      <circle cx="12" cy="15.5" r="2" />
    </svg>
  );
}

function CampingStoveIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4M8 4l2 3M16 4l-2 3" />
      <rect x="6" y="11" width="12" height="10" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6v4H9z" />
    </svg>
  );
}

function FridgeIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10h14M8 6v2M8 14v4" />
    </svg>
  );
}

function FreezerIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v3M10.5 6h3" />
    </svg>
  );
}

function HotWaterShowerIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h7a4 4 0 014 4v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10h6l1 3H11l1-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v2M15 17v2M18 17v2" />
    </svg>
  );
}

function CoffeeMakerIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h1a3 3 0 010 6h-1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h13v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 3c.5 1 0 2 0 3M10 3c.5 1 0 2 0 3M14 3c.5 1 0 2 0 3" />
    </svg>
  );
}

function OutdoorFurnitureIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M5 12V6a2 2 0 012-2h10a2 2 0 012 2v6M6 12v8M18 12v8" />
    </svg>
  );
}

function FirstAidIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6v3H9zM12 10v6M9 13h6" />
    </svg>
  );
}

function LockboxKeyIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4M12 15v2" />
    </svg>
  );
}

function WineGlassesIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3h8l-1 7a3 3 0 01-6 0L8 3zM12 10v9M9 19h6" />
    </svg>
  );
}

function CleaningProductsIcon() {
  return (
    <svg className="w-5 h-5 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4v4M15 7l4-4" />
      <rect x="5" y="10" width="10" height="11" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h2v4h-2z" />
    </svg>
  );
}

function ShampooIcon() {
  return (
    <svg className="w-5 h-5 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="7" y="8" width="10" height="13" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 3h4v5h-4zM9 3h6" />
    </svg>
  );
}

function ShowerGelIcon() {
  return (
    <svg className="w-5 h-5 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="6" y="7" width="12" height="14" rx="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 3h4v4h-4zM12 11v4M10 13h4" />
    </svg>
  );
}

function TowelsLinenIcon() {
  return (
    <svg className="w-5 h-5 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="6" rx="2" />
      <rect x="4" y="11" width="16" height="6" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16" />
    </svg>
  );
}

function PillowsBlanketsIcon() {
  return (
    <svg className="w-5 h-5 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M3 12h18" />
    </svg>
  );
}

function DarkeningBlindsIcon() {
  return (
    <svg className="w-5 h-5 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19v3" />
    </svg>
  );
}

function FireExtinguisherIcon() {
  return (
    <svg className="w-5 h-5 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="8" y="7" width="8" height="14" rx="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 3h4M12 3v4M8 10h8M16 5l3-2" />
    </svg>
  );
}

function MicrowaveIcon() {
  return (
    <svg className="w-5 h-5 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <rect x="5" y="8" width="10" height="8" rx="1" />
      <circle cx="18" cy="9" r="1" />
      <circle cx="18" cy="12" r="1" />
      <circle cx="18" cy="15" r="1" />
    </svg>
  );
}

function CrockeryCutleryIcon() {
  return (
    <svg className="w-5 h-5 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v8a2 2 0 002 2h0a2 2 0 002-2V3M8 13v8M17 3v18M20 3c0 4-3 5-3 8v10" />
    </svg>
  );
}

function SmokingIcon() {
  return (
    <svg className="w-5 h-5 stroke-zinc-900 fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H3m15 0h3M18 9v6M3 15h12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 6c.5 1-.5 2-1 3.5s.5 2 1 3.5" />
    </svg>
  );
}