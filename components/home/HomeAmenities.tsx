"use client";

import { motion } from "framer-motion";

interface AmenityItem {
  label: string;
  icon: React.ReactNode;
}

export default function HomeAmenitiesMarquee() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const row1: AmenityItem[] = [
    { label: "Lake View", icon: <LakeIcon /> },
    { label: "Container Stay", icon: <ContainerIcon /> },
    { label: "Kitchen", icon: <KitchenIcon /> },
    { label: "Wi-Fi Available", icon: <WifiIcon /> },
    { label: "Private Deck", icon: <DeckIcon /> },
  ];

  const row2: AmenityItem[] = [
    { label: "Bonfire Zone", icon: <FireIcon /> },
    { label: "Air Conditioned", icon: <ACIcon /> },
    { label: "Free Parking", icon: <ParkingIcon /> },
    { label: "Container Stay", icon: <ContainerIcon /> },
    { label: "Kitchen", icon: <KitchenIcon /> },
  ];

  const row3: AmenityItem[] = [
    { label: "Lake View", icon: <LakeIcon /> },
    { label: "Pet Friendly", icon: <PetIcon /> },
    { label: "Hot Geyser", icon: <GeyserIcon /> },
    { label: "Private Deck", icon: <DeckIcon /> },
    { label: "Bonfire Zone", icon: <FireIcon /> },
  ];

  const headerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
  };

  // Shared component to render infinite seamless tracks
  const MarqueeRow = ({ items, direction }: { items: AmenityItem[]; direction: "left" | "right" }) => {
    // Duplicate items to ensure smooth continuous loop spacing without visual gaps
    const loopItems = [...items, ...items, ...items];
    
    return (
      <div className="w-full overflow-hidden flex whitespace-nowrap mask-linear-fade py-2">
        <motion.div
          animate={{
            x: direction === "left" ? [0, "-33.33%"] : ["-33.33%", 0],
          }}
          transition={{
            ease: "linear",
            duration: 22,
            repeat: Infinity,
          }}
          className="flex gap-4 shrink-0 px-2"
        >
          {loopItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-zinc-100/80 border border-zinc-200/40 text-zinc-900 px-6 py-4.5 rounded-[24px] text-base font-medium tracking-wide"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white select-none py-20 overflow-hidden flex flex-col items-center">
      
      {/* HEADER MATRIX SECTION */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="text-center flex flex-col items-center space-y-3 mb-16 px-4"
      >
        <motion.span variants={headerVariants} className="text-sm font-semibold text-zinc-400 uppercase tracking-[0.15em]">
          Amenities
        </motion.span>
        <motion.h2 
          variants={headerVariants} 
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.15] max-w-2xl transform-gpu"
        >
          Everything you need.<br />Nothing you don't.
        </motion.h2>
      </motion.div>

      {/* INFINITE ROLLING COMPONENT CONTAINER */}
      <div className="w-full max-w-[100vw] flex flex-col space-y-4 md:space-y-5 relative">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
        <MarqueeRow items={row3} direction="left" />
      </div>

      {/* Global utility mask styles via embedded injection to handle edge-to-edge transparency fades */}
      <style jsx global>{`
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
      `}</style>
    </div>
  );
}

// ==========================================
// PURE VECTOR BRAND GRAPHIC MARK ICONS
// ==========================================

function LakeIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function ContainerIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0 fill-none stroke-current stroke-2 stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  );
}

function KitchenIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0 fill-none stroke-current stroke-2 stroke-linecap-round" viewBox="0 0 24 24">
      <path d="M12 20h.01M8.5 16.5a5 5 0 017 0M5 13a10 10 0 0114 0M1.5 9.5a15 15 0 0121 0" />
    </svg>
  );
}

function DeckIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0 fill-none stroke-current stroke-2 stroke-linecap-round" viewBox="0 0 24 24">
      <path d="M4 6h16M4 10h16M4 14h16M4 18h16M7 6v12M17 6v12" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <path d="M12 2c0 0-3 3.5-3 6a3 3 0 006 0c0-2.5-3-6-3-6zM5 21h14M8 17l1-3m7 3l-1-3" />
    </svg>
  );
}

function ACIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0 fill-none stroke-current stroke-2 stroke-linecap-round" viewBox="0 0 24 24">
      <path d="M2 10h20M2 14h20M6 6v4m12-4v4M10 18l2 2 2-2" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 17V7h4a3 3 0 010 6H9" />
    </svg>
  );
}

function PetIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0 fill-none stroke-current stroke-2 stroke-linecap-round" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function GeyserIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-700 shrink-0 fill-none stroke-current stroke-2 stroke-linecap-round" viewBox="0 0 24 24">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    </svg>
  );
}