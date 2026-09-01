"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

const smoothEase = [0.25, 1, 0.5, 1] as const;

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const listingUrls: Record<string, string> = {
  cabin1: "https://www.airbnb.co.in/rooms/1232353131595460643",
  cabin2: "https://www.airbnb.co.in/rooms/1233873689915292788",
  both: "https://www.airbnb.co.in/rooms/1246955097837650964",
};

const cabinTitles: Record<string, string> = {
  cabin1: "WOW Cabin 01",
  cabin2: "WOW Cabin 02",
  both: "Both Cabins",
};

export default function GlobalBookingBar() {
  const {
    checkIn,
    checkOut,
    selectedOption,
    setIsModalOpen,
    isDismissed,
    setIsDismissed,
  } = useBooking();

  const isComplete = Boolean(checkIn && checkOut);

  const formatDisplayDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    return `${d} ${monthNames[m - 1].slice(0, 3)}`;
  };

  const freeCancellationText = useMemo(() => {
    if (!checkIn) return null;
    const [y, m, d] = checkIn.split("-").map(Number);
    const checkInDate = new Date(y, m - 1, d);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cutoffDate = new Date(checkInDate);
    cutoffDate.setDate(cutoffDate.getDate() - 5);
    cutoffDate.setHours(0, 0, 0, 0);

    const daysAhead = Math.round(
      (cutoffDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)
    );

    if (daysAhead < 2) return null;

    return `Free cancellation before ${cutoffDate.getDate()} ${
      monthNames[cutoffDate.getMonth()]
    }`;
  }, [checkIn]);

  const reservationUrl =
    checkIn && checkOut
      ? `${listingUrls[selectedOption]}?check_in=${checkIn}&check_out=${checkOut}`
      : listingUrls[selectedOption];

  return (
    <AnimatePresence>
      {isComplete && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 36, scale: 0.98 }}
          transition={{ duration: 0.45, ease: smoothEase }}
          className="fixed bottom-4 inset-x-4 mx-auto max-w-md z-40"
        >
          <div className="w-full bg-white/95 backdrop-blur-md rounded-[24px] p-3.5 border border-zinc-200/80 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.14)] flex flex-col gap-2 relative">
            <div className="flex items-center justify-between gap-2">
              {/* Date Details / Edit Trigger */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex flex-col text-left min-w-0 flex-1 cursor-pointer pr-1"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  {cabinTitles[selectedOption]}
                </span>
                <span className="text-sm font-semibold tracking-tight text-zinc-950 truncate">
                  {formatDisplayDate(checkIn)} – {formatDisplayDate(checkOut)}
                </span>
              </button>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-5 bg-zinc-950 text-white rounded-full text-xs font-semibold tracking-wide flex items-center justify-center hover:bg-zinc-800 active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  Book Now
                </a>

                {/* Close/Dismiss Button */}
                <button
                  onClick={() => setIsDismissed(true)}
                  aria-label="Dismiss booking bar"
                  className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Free Cancellation Badge */}
            {freeCancellationText && (
              <div className="pt-2 border-t border-zinc-100 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full shrink-0 bg-emerald-500" />
                <span className="text-[11px] font-medium text-emerald-800 tracking-wide truncate">
                  {freeCancellationText}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}