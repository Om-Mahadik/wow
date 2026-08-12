"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CabinActionsProps {
  airbnbIcalUrl?: string;
  airbnbListingUrl?: string;
}

export default function CabinActions({
  // Pass your Airbnb Export iCal feed URL here
  airbnbIcalUrl = "https://www.airbnb.com/calendar/ical/1233873689915292788.ics?s=your_token",
  airbnbListingUrl = "https://www.airbnb.co.in/rooms/1233873689915292788",
}: CabinActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Date selection state
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  // Calendar month management
  const [currentDate, setCurrentDate] = useState(new Date());

  const smoothDrawerEase = [0.25, 1, 0.5, 1] as const;

  const containerVariants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20, scaleX: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scaleX: 1,
      transition: { duration: 1.2, ease: smoothDrawerEase },
    },
  };

  // Fetch blocked dates when modal opens
  useEffect(() => {
    if (!isModalOpen || !airbnbIcalUrl) return;

    async function fetchCalendar() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `/api/airbnb-calendar?icalUrl=${encodeURIComponent(airbnbIcalUrl)}`
        );
        const data = await res.json();

        if (data.blockedDates) {
          setBlockedDates(data.blockedDates);
        }
      } catch (err) {
        console.error("Failed to load Airbnb calendar dates:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCalendar();
  }, [isModalOpen, airbnbIcalUrl]);

  // Calendar Navigation Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Date Selection Logic
  const handleDateClick = (dateStr: string, isBlocked: boolean) => {
    if (isBlocked) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (new Date(dateStr) < new Date(checkIn)) {
        setCheckIn(dateStr);
      } else {
        setCheckOut(dateStr);
      }
    }
  };

  const isDateSelected = (dateStr: string) => dateStr === checkIn || dateStr === checkOut;
  const isDateInRange = (dateStr: string) => {
    if (!checkIn || !checkOut) return false;
    const current = new Date(dateStr);
    return current > new Date(checkIn) && current < new Date(checkOut);
  };

  return (
    <div className="w-full flex justify-center bg-white select-none mt-6">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="w-full md:max-w-[80vw] flex items-center justify-start gap-4 px-4 md:px-0"
      >
        {/* Book Now Button (Direct External Link to Airbnb) */}
        <a
          href={airbnbListingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 md:flex-none md:w-56 h-14 bg-zinc-950 text-white rounded-full font-medium text-sm tracking-wide shadow-sm flex items-center justify-center cursor-pointer transition-transform hover:-translate-y-0.5 active:scale-98"
        >
          Book Now
        </a>

        {/* Check Availability Button (Opens Modal) */}
        <motion.button
          variants={buttonVariants}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="flex-1 md:flex-none md:w-56 h-14 bg-zinc-100 text-zinc-900 rounded-full font-medium text-sm tracking-wide shadow-sm border border-zinc-200/40 origin-left cursor-pointer"
        >
          Check Availability
        </motion.button>
      </motion.div>

      {/* AVAILABILITY CALENDAR MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl z-10 border border-zinc-100 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                  <h3 className="text-lg font-bold text-zinc-950">Select Dates</h3>
                  <p className="text-xs text-zinc-500">Live sync with Airbnb availability</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Month Header & Controls */}
              <div className="flex items-center justify-between my-4 px-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 text-zinc-600 hover:text-zinc-950 transition-colors text-sm font-bold"
                >
                  ←
                </button>
                <span className="text-sm font-semibold text-zinc-900">
                  {monthNames[month]} {year}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-2 text-zinc-600 hover:text-zinc-950 transition-colors text-sm font-bold"
                >
                  →
                </button>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-400 mb-2">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* Calendar Days Grid */}
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Empty cells for starting day shift */}
                  {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-10" />
                  ))}

                  {/* Days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
                      dayNum
                    ).padStart(2, "0")}`;

                    const isBlocked = blockedDates.includes(formattedDate);
                    const isSelected = isDateSelected(formattedDate);
                    const isInRange = isDateInRange(formattedDate);

                    return (
                      <button
                        key={dayNum}
                        onClick={() => handleDateClick(formattedDate, isBlocked)}
                        disabled={isBlocked}
                        className={`h-10 rounded-xl text-xs font-medium transition-all relative flex items-center justify-center ${
                          isBlocked
                            ? "bg-zinc-100 text-zinc-300 line-through cursor-not-allowed"
                            : isSelected
                            ? "bg-zinc-950 text-white font-bold shadow-md"
                            : isInRange
                            ? "bg-zinc-100 text-zinc-900 rounded-none"
                            : "hover:bg-zinc-100 text-zinc-800"
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Legend & Action Panel */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-100 border border-zinc-300" />
                    <span>Reserved</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
                    <span>Selected</span>
                  </div>
                </div>

                <a
                  href={`${airbnbListingUrl}${
                    checkIn && checkOut
                      ? `?check_in=${checkIn}&check_out=${checkOut}`
                      : ""
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 bg-zinc-950 text-white rounded-full text-xs font-semibold hover:bg-zinc-800 transition-colors"
                >
                  Reserve on Airbnb
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}