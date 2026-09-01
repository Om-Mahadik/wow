"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking, BookingOption } from "@/context/BookingContext";

interface CabinActionsProps {
  cabin1IcalUrl?: string;
  cabin2IcalUrl?: string;
  bothCabinsIcalUrl?: string;

  cabin1ListingUrl?: string;
  cabin2ListingUrl?: string;
  bothCabinsListingUrl?: string;
}

type AirbnbEventType = "reserved" | "unavailable" | "other";

interface AirbnbEvent {
  uid: string | null;
  summary: string | null;
  startDate: string | null;
  endDate: string | null;
  type: AirbnbEventType;
}

interface AirbnbCalendarResponse {
  success: boolean;
  blockedDates: string[];
  events: AirbnbEvent[];
  error?: string;
  details?: string;
}

const DEFAULT_CABIN_1_ICAL =
  "https://www.airbnb.co.in/calendar/ical/1232353131595460643.ics?t=d72c55e47aa24e37a1a5fe6411091e01";
const DEFAULT_CABIN_2_ICAL =
  "https://www.airbnb.co.in/calendar/ical/1233873689915292788.ics?t=b7318970bf6a4216ae1993e56c7b442a";
const DEFAULT_BOTH_CABINS_ICAL =
  "https://www.airbnb.co.in/calendar/ical/1246955097837650964.ics?t=6fb3f9d3ac404487b317eb4181e5a7ef";

const DEFAULT_CABIN_1_LISTING =
  "https://www.airbnb.co.in/rooms/1232353131595460643";
const DEFAULT_CABIN_2_LISTING =
  "https://www.airbnb.co.in/rooms/1233873689915292788";
const DEFAULT_BOTH_CABINS_LISTING =
  "https://www.airbnb.co.in/rooms/1246955097837650964";

export default function CabinActions({
  cabin1IcalUrl = DEFAULT_CABIN_1_ICAL,
  cabin2IcalUrl = DEFAULT_CABIN_2_ICAL,
  bothCabinsIcalUrl = DEFAULT_BOTH_CABINS_ICAL,

  cabin1ListingUrl = DEFAULT_CABIN_1_LISTING,
  cabin2ListingUrl = DEFAULT_CABIN_2_LISTING,
  bothCabinsListingUrl = DEFAULT_BOTH_CABINS_LISTING,
}: CabinActionsProps) {
  const {
    selectedOption,
    setSelectedOption,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    isModalOpen,
    setIsModalOpen,
    setIsDismissed,
  } = useBooking();

  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const bookingOptions = [
    { id: "cabin1" as BookingOption, title: "WOW Cabin 01", subtitle: "Private cabin" },
    { id: "cabin2" as BookingOption, title: "WOW Cabin 02", subtitle: "Private cabin" },
    { id: "both" as BookingOption, title: "Both Cabins", subtitle: "Entire retreat" },
  ];

  const selectedOptionData = useMemo(() => {
    if (selectedOption === "cabin1") {
      return {
        title: "WOW Cabin 01",
        icalUrl: cabin1IcalUrl,
        listingUrl: cabin1ListingUrl,
      };
    }
    if (selectedOption === "cabin2") {
      return {
        title: "WOW Cabin 02",
        icalUrl: cabin2IcalUrl,
        listingUrl: cabin2ListingUrl,
      };
    }
    return {
      title: "Both Cabins",
      icalUrl: bothCabinsIcalUrl,
      listingUrl: bothCabinsListingUrl,
    };
  }, [
    selectedOption,
    cabin1IcalUrl,
    cabin2IcalUrl,
    bothCabinsIcalUrl,
    cabin1ListingUrl,
    cabin2ListingUrl,
    bothCabinsListingUrl,
  ]);

  useEffect(() => {
    if (!isModalOpen || !selectedOptionData.icalUrl) return;

    let cancelled = false;

    async function fetchCalendar() {
      try {
        setIsLoading(true);
        setCalendarError(null);

        const apiUrl = `/api/airbnb-calendar?icalUrl=${encodeURIComponent(
          selectedOptionData.icalUrl!
        )}`;

        const response = await fetch(apiUrl, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = (await response.json()) as AirbnbCalendarResponse;
        if (!data.success) throw new Error(data.error || "Failed to load");

        if (cancelled) return;
        setBlockedDates(Array.isArray(data.blockedDates) ? data.blockedDates : []);
      } catch {
        if (cancelled) return;
        setCalendarError("Unable to load latest availability.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchCalendar();

    return () => {
      cancelled = true;
    };
  }, [isModalOpen, selectedOptionData.icalUrl]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const currentMonthStart = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
    [today]
  );

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const parseDate = (dateString: string) => {
    const [y, m, d] = dateString.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDisplayDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    return `${d} ${monthNames[m - 1].slice(0, 3)}`;
  };

  const freeCancellationText = useMemo(() => {
    if (!checkIn) return null;

    const checkInDate = parseDate(checkIn);
    const cutoffDate = new Date(checkInDate);
    cutoffDate.setDate(cutoffDate.getDate() - 5);
    cutoffDate.setHours(0, 0, 0, 0);

    const msPerDay = 24 * 60 * 60 * 1000;
    const daysAhead = Math.round((cutoffDate.getTime() - today.getTime()) / msPerDay);

    if (daysAhead < 2) return null;

    const cancelDay = cutoffDate.getDate();
    const cancelMonth = monthNames[cutoffDate.getMonth()];
    return `Free cancellation before ${cancelDay} ${cancelMonth}`;
  }, [checkIn, today]);

  const isBlockedDate = (dateString: string) => blockedDates.includes(dateString);
  const isPastDate = (dateString: string) => parseDate(dateString) < today;

  const isDateInRange = (dateString: string) => {
    if (!checkIn || !checkOut) return false;
    const current = parseDate(dateString);
    const start = parseDate(checkIn);
    const end = parseDate(checkOut);
    return current > start && current < end;
  };

  const doesRangeContainBlockedDate = (startDate: string, endDate: string) => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const cursor = new Date(start);

    while (cursor < end) {
      const dateString = formatDate(cursor);
      if (isBlockedDate(dateString)) return true;
      cursor.setDate(cursor.getDate() + 1);
    }
    return false;
  };

  const handlePrevMonth = () => {
    const previousMonth = new Date(year, month - 1, 1);
    if (previousMonth < currentMonthStart) return;
    setCurrentDate(previousMonth);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleOptionChange = (option: BookingOption) => {
    if (option === selectedOption) return;
    setSelectedOption(option);
    setCalendarError(null);
  };

  const handleDateClick = (dateString: string, disabled: boolean) => {
    if (disabled || isPastDate(dateString)) return;

    if (!checkIn || checkOut) {
      setCheckIn(dateString);
      setCheckOut(null);
      return;
    }

    if (parseDate(dateString) < parseDate(checkIn)) {
      setCheckIn(dateString);
      setCheckOut(null);
      return;
    }

    if (dateString === checkIn) return;
    if (doesRangeContainBlockedDate(checkIn, dateString)) return;

    setCheckOut(dateString);
    setIsDismissed(false); // Reset dismissal on new booking selection
  };

  const openModal = () => {
    setCalendarError(null);
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const reservationUrl =
    checkIn && checkOut
      ? `${selectedOptionData.listingUrl}?check_in=${checkIn}&check_out=${checkOut}`
      : selectedOptionData.listingUrl;

  const isCompleteBooking = Boolean(checkIn && checkOut);

  return (
    <>
      {/* TRIGGER BAR: More space above, tight bottom */}
      <div className="w-full flex justify-center bg-white select-none pt-8 md:pt-10 pb-2">
        <div className="w-full md:max-w-[80vw] px-4 md:px-0">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {!isCompleteBooking ? (
                <motion.button
                  key="default-btn"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: smoothEase }}
                  onClick={openModal}
                  className="w-full h-14 bg-zinc-950 text-white rounded-full text-sm font-semibold tracking-wide flex items-center justify-center gap-2 hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-sm cursor-pointer group"
                >
                  <span>Check Availability</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </motion.button>
              ) : (
                <motion.div
                  key="selected-bar"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: smoothEase }}
                  className="w-full flex flex-col gap-2"
                >
                  <div className="w-full flex items-center gap-2.5">
                    {/* Equal Height Date Pill: h-14 */}
                    <button
                      onClick={openModal}
                      className="flex-1 min-w-0 h-14 px-4 rounded-full border border-zinc-200/80 bg-[#fafafa] text-zinc-800 shadow-sm hover:bg-white hover:border-zinc-300 transition-all duration-300 flex items-center justify-between text-left cursor-pointer group"
                    >
                      <div className="flex flex-col min-w-0 pr-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 truncate">
                          {selectedOptionData.title}
                        </span>
                        <span className="text-sm font-medium tracking-wide text-zinc-900 truncate">
                          {formatDisplayDate(checkIn)} – {formatDisplayDate(checkOut)}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors shrink-0 underline underline-offset-2">
                        Edit
                      </span>
                    </button>

                    {/* Equal Height Book Now CTA: h-14 */}
                    <a
                      href={reservationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-14 px-6 bg-zinc-950 text-white rounded-full text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-sm shrink-0 cursor-pointer"
                    >
                      <span>Book Now</span>
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {freeCancellationText && (
                    <div className="flex items-center justify-center gap-1.5 px-2">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0 bg-emerald-500" />
                      <span className="text-xs font-medium text-emerald-800 tracking-wide text-center">
                        {freeCancellationText}
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* AVAILABILITY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-zinc-950/30 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="relative w-full max-w-lg bg-white rounded-[28px] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 border border-zinc-200/80 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                    Select Dates
                  </h3>
                  <p className="text-xs text-zinc-500 font-light">
                    Real-time calendar availability
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 transition-colors text-xs font-semibold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="mt-3 grid grid-cols-3 p-1 bg-zinc-50 border border-zinc-200/60 rounded-[18px] relative">
                {bookingOptions.map((option) => {
                  const isSelected = selectedOption === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionChange(option.id)}
                      className="relative py-2 px-1 text-center rounded-[14px] transition-colors z-10 cursor-pointer"
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeCabinTab"
                          className="absolute inset-0 bg-white rounded-[14px] border border-zinc-200/80 shadow-xs -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <span
                        className={`block text-xs font-semibold tracking-tight transition-colors duration-200 truncate ${
                          isSelected ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-800"
                        }`}
                      >
                        {option.title}
                      </span>
                      <span
                        className={`block text-[10px] font-light transition-colors duration-200 truncate ${
                          isSelected ? "text-zinc-400" : "text-zinc-400/80"
                        }`}
                      >
                        {option.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Month Navigator */}
              <div className="mt-4 flex items-center justify-between px-1">
                <span className="text-sm font-bold text-zinc-900 tracking-tight">
                  {monthNames[month]} {year}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevMonth}
                    disabled={
                      year === today.getFullYear() &&
                      month === today.getMonth()
                    }
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-xs font-medium cursor-pointer"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 transition-colors text-xs font-medium cursor-pointer"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Grid */}
              <div className="relative min-h-[225px] flex flex-col justify-start mt-2">
                {isLoading && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center gap-2 rounded-xl">
                    <div className="w-5 h-5 border-2 border-zinc-200 border-t-zinc-950 rounded-full animate-spin" />
                  </div>
                )}

                {calendarError ? (
                  <div className="my-auto py-6 text-center text-xs text-red-500 font-medium bg-red-50/50 rounded-2xl p-3 border border-red-100">
                    {calendarError}
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    </div>

                    <div className="grid grid-cols-7 gap-y-1">
                      {Array.from({ length: firstDayIndex }).map((_, index) => (
                        <div key={`empty-${index}`} className="h-8" />
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, index) => {
                        const dayNumber = index + 1;
                        const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
                        const blocked = isBlockedDate(formattedDate);
                        const past = isPastDate(formattedDate);
                        const isCheckIn = formattedDate === checkIn;
                        const isCheckOut = formattedDate === checkOut;
                        const isSelected = isCheckIn || isCheckOut;
                        const inRange = isDateInRange(formattedDate);

                        let invalidRangeDate = false;
                        if (checkIn && !checkOut && parseDate(formattedDate) > parseDate(checkIn)) {
                          invalidRangeDate = doesRangeContainBlockedDate(checkIn, formattedDate);
                        }

                        const disabled = blocked || past || invalidRangeDate;

                        return (
                          <div
                            key={dayNumber}
                            className={`relative h-8 flex items-center justify-center ${
                              inRange ? "bg-zinc-100" : ""
                            } ${isCheckIn && checkOut ? "bg-gradient-to-r from-transparent to-zinc-100 rounded-l-full" : ""} ${
                              isCheckOut ? "bg-gradient-to-l from-transparent to-zinc-100 rounded-r-full" : ""
                            }`}
                          >
                            <button
                              onClick={() => handleDateClick(formattedDate, disabled)}
                              disabled={disabled}
                              className={`
                                w-8 h-8 rounded-full text-xs font-medium transition-all flex items-center justify-center relative z-10
                                ${
                                  blocked
                                    ? "text-zinc-300 line-through cursor-not-allowed"
                                    : past || invalidRangeDate
                                    ? "text-zinc-300 cursor-not-allowed"
                                    : isSelected
                                    ? "bg-zinc-950 text-white font-semibold shadow-xs scale-95"
                                    : inRange
                                    ? "text-zinc-900 font-medium hover:bg-zinc-200/60"
                                    : "text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                                }
                              `}
                            >
                              {dayNumber}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Summary */}
              <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2.5">
                <div className="flex flex-col gap-1 bg-[#fafafa] rounded-[18px] px-4 py-2.5 border border-zinc-200/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Check-in</div>
                      <div className="text-xs font-semibold text-zinc-900 mt-0.5">{checkIn || "Select date"}</div>
                    </div>

                    <div className="h-6 w-px bg-zinc-200" />

                    <div className="text-right">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Check-out</div>
                      <div className="text-xs font-semibold text-zinc-900 mt-0.5">{checkOut || "Select date"}</div>
                    </div>
                  </div>

                  {freeCancellationText && (
                    <div className="pt-1.5 border-t border-zinc-200/60 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0 bg-emerald-500" />
                      <span className="text-[11px] font-medium text-emerald-800 tracking-wide">
                        {freeCancellationText}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <a
                    href={reservationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!isCompleteBooking}
                    onClick={(e) => {
                      if (!isCompleteBooking) e.preventDefault();
                    }}
                    className={`
                      relative overflow-hidden w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs
                      ${
                        isCompleteBooking
                          ? "bg-zinc-950 text-white hover:bg-zinc-800 active:scale-[0.98] cursor-pointer"
                          : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                      }
                    `}
                  >
                    <span>
                      {isCompleteBooking
                        ? `Continue to Airbnb · ${selectedOptionData.title}`
                        : "Select Dates to Continue"}
                    </span>
                    {isCompleteBooking && (
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    )}
                  </a>

                  <p className="text-center text-[10px] text-zinc-400 mt-1.5 font-light">
                    You’ll complete your reservation securely on Airbnb.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}