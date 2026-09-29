"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookingOption } from "@/context/BookingContext";

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;

  selectedOption: BookingOption;
  onOptionChange: (option: BookingOption) => void;

  checkIn: string | null;
  checkOut: string | null;
  setCheckIn: (date: string | null) => void;
  setCheckOut: (date: string | null) => void;

  cabin1IcalUrl: string;
  cabin2IcalUrl: string;
  bothCabinsIcalUrl: string;

  selectedOptionTitle: string;
  reservationUrl: string;

  isCompleteBooking: boolean;
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

const bookingOptions = [
  {
    id: "cabin1" as BookingOption,
    title: "WOW Cabin 01",
    subtitle: "Private cabin",
  },
  {
    id: "cabin2" as BookingOption,
    title: "WOW Cabin 02",
    subtitle: "Private cabin",
  },
  {
    id: "both" as BookingOption,
    title: "Both Cabins",
    subtitle: "Entire retreat",
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AvailabilityModal({
  isOpen,
  onClose,
  selectedOption,
  onOptionChange,
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  cabin1IcalUrl,
  cabin2IcalUrl,
  bothCabinsIcalUrl,
  selectedOptionTitle,
  reservationUrl,
  isCompleteBooking,
}: AvailabilityModalProps) {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  /*
   * Today's date at local midnight.
   */
  const today = useMemo(() => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    return date;
  }, []);

  /*
   * First day of the current month.
   *
   * The calendar cannot navigate before this month.
   */
  const currentMonthStart = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
    [today],
  );

  /*
   * Resolve the correct Airbnb iCal URL.
   */
  const selectedIcalUrl = useMemo(() => {
    switch (selectedOption) {
      case "cabin1":
        return cabin1IcalUrl;

      case "cabin2":
        return cabin2IcalUrl;

      case "both":
        return bothCabinsIcalUrl;

      default:
        return "";
    }
  }, [selectedOption, cabin1IcalUrl, cabin2IcalUrl, bothCabinsIcalUrl]);

  /*
   * Convert YYYY-MM-DD into a local Date.
   *
   * Avoids timezone issues caused by:
   * new Date("YYYY-MM-DD")
   */
  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day);
  };

  /*
   * Convert Date -> YYYY-MM-DD.
   */
  const formatDate = (date: Date) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /*
   * Load Airbnb availability.
   *
   * Runs when:
   * - modal opens
   * - selected cabin changes
   * - selected iCal URL changes
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!selectedIcalUrl) {
      setBlockedDates([]);
      setCalendarError("Availability calendar is not configured.");
      setIsLoading(false);

      return;
    }

    let cancelled = false;

    async function fetchCalendar() {
      try {
        setIsLoading(true);
        setCalendarError(null);

        const apiUrl = `/api/airbnb-calendar?icalUrl=${encodeURIComponent(
          selectedIcalUrl,
        )}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = (await response.json()) as AirbnbCalendarResponse;

        if (!data.success) {
          throw new Error(data.error || "Failed to load calendar");
        }

        if (cancelled) {
          return;
        }

        setBlockedDates(
          Array.isArray(data.blockedDates) ? data.blockedDates : [],
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Availability calendar error:", error);

        setBlockedDates([]);

        setCalendarError("Unable to load latest availability.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchCalendar();

    return () => {
      cancelled = true;
    };
  }, [isOpen, selectedIcalUrl]);

  /*
   * Reset calendar position whenever
   * the modal opens.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));

    setCalendarError(null);
  }, [isOpen, today]);

  /*
   * Lock page scrolling while modal is open.
   *
   * This prevents the page behind the modal
   * from moving on desktop/mobile.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  /*
   * Escape key closes the modal.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayIndex = new Date(year, month, 1).getDay();

  /*
   * Check if date is blocked by Airbnb.
   */
  const isBlockedDate = (dateString: string) => {
    return blockedDates.includes(dateString);
  };

  /*
   * Check if date is before today.
   */
  const isPastDate = (dateString: string) => {
    return parseDate(dateString) < today;
  };

  /*
   * Check if date is inside selected range.
   */
  const isDateInRange = (dateString: string) => {
    if (!checkIn || !checkOut) {
      return false;
    }

    const current = parseDate(dateString);
    const start = parseDate(checkIn);
    const end = parseDate(checkOut);

    return current > start && current < end;
  };

  /*
   * Check whether a potential booking range
   * contains a blocked date.
   *
   * The checkout date itself is excluded.
   */
  const doesRangeContainBlockedDate = (startDate: string, endDate: string) => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    const cursor = new Date(start);

    /*
     * Start checking from the day after
     * check-in.
     */
    cursor.setDate(cursor.getDate() + 1);

    while (cursor < end) {
      const dateString = formatDate(cursor);

      if (isBlockedDate(dateString)) {
        return true;
      }

      cursor.setDate(cursor.getDate() + 1);
    }

    return false;
  };

  /*
   * Determine if a date can be used
   * as checkout for the current check-in.
   */
  const isInvalidCheckoutDate = (dateString: string) => {
    if (!checkIn || checkOut) {
      return false;
    }

    const candidate = parseDate(dateString);

    const start = parseDate(checkIn);

    if (candidate <= start) {
      return false;
    }

    return doesRangeContainBlockedDate(checkIn, dateString);
  };

  /*
   * Previous month.
   */
  const handlePrevMonth = () => {
    const previousMonth = new Date(year, month - 1, 1);

    if (previousMonth < currentMonthStart) {
      return;
    }

    setCurrentDate(previousMonth);
  };

  /*
   * Next month.
   */
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  /*
   * Cabin selection.
   *
   * Important:
   * Dates are cleared because each cabin has
   * its own availability calendar.
   */
  const handleOptionChange = (option: BookingOption) => {
    if (option === selectedOption) {
      return;
    }

    onOptionChange(option);

    setCheckIn(null);
    setCheckOut(null);

    setBlockedDates([]);
    setCalendarError(null);
  };

  /*
   * Date selection.
   */
  const handleDateClick = (dateString: string, disabled: boolean) => {
    if (disabled || isPastDate(dateString)) {
      return;
    }

    /*
     * No check-in yet OR previous selection
     * was already complete.
     *
     * Start a fresh selection.
     */
    if (!checkIn || checkOut) {
      setCheckIn(dateString);
      setCheckOut(null);

      return;
    }

    const clickedDate = parseDate(dateString);

    const checkInDate = parseDate(checkIn);

    /*
     * Clicking before check-in moves
     * the check-in date.
     */
    if (clickedDate < checkInDate) {
      setCheckIn(dateString);
      setCheckOut(null);

      return;
    }

    /*
     * Same date cannot be checkout.
     */
    if (dateString === checkIn) {
      return;
    }

    /*
     * Prevent a range that crosses
     * unavailable Airbnb dates.
     */
    if (doesRangeContainBlockedDate(checkIn, dateString)) {
      return;
    }

    setCheckOut(dateString);
  };

  /*
   * Free cancellation text.
   */
  const freeCancellationText = useMemo(() => {
    if (!checkIn) {
      return null;
    }

    const checkInDate = parseDate(checkIn);

    const cutoffDate = new Date(checkInDate);

    cutoffDate.setDate(cutoffDate.getDate() - 5);

    cutoffDate.setHours(0, 0, 0, 0);

    const msPerDay = 24 * 60 * 60 * 1000;

    const daysAhead = Math.round(
      (cutoffDate.getTime() - today.getTime()) / msPerDay,
    );

    if (daysAhead < 2) {
      return null;
    }

    const cancelDay = cutoffDate.getDate();

    const cancelMonth = monthNames[cutoffDate.getMonth()];

    return `Free cancellation before ${cancelDay} ${cancelMonth}`;
  }, [checkIn, today]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Check availability"
        >
          {/* 
            BACKDROP

            Deliberately NO backdrop-blur here.

            This prevents the white/washed-out
            appearance behind the modal.
          */}
          <motion.button
            type="button"
            aria-label="Close availability modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: smoothEase,
            }}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-zinc-950/45"
          />

          {/* MODAL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.97,
              y: 14,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              y: 14,
            }}
            transition={{
              duration: 0.35,
              ease: smoothEase,
            }}
            onClick={(event) => event.stopPropagation()}
            className="relative z-10 flex w-full max-w-lg max-h-[calc(100dvh-24px)] flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:max-h-[calc(100dvh-32px)] sm:p-6"
          >
            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-zinc-900">
                  Select Dates
                </h3>

                <p className="mt-0.5 text-xs font-light text-zinc-500">
                  Real-time calendar availability
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            {/* CABIN TABS */}
            <div className="relative mt-3 grid shrink-0 grid-cols-3 rounded-[18px] border border-zinc-200/70 bg-zinc-50 p-1">
              {bookingOptions.map((option) => {
                const isSelected = selectedOption === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleOptionChange(option.id)}
                    className="relative z-10 cursor-pointer rounded-[14px] px-1 py-2.5 text-center transition-colors"
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeCabinTab"
                        className="absolute inset-0 -z-10 rounded-[14px] border border-zinc-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 32,
                        }}
                      />
                    )}

                    <span
                      className={`block truncate text-xs font-semibold tracking-tight ${
                        isSelected ? "text-zinc-900" : "text-zinc-500"
                      }`}
                    >
                      {option.title}
                    </span>

                    <span
                      className={`mt-0.5 block truncate text-[10px] font-light ${
                        isSelected ? "text-zinc-400" : "text-zinc-400/80"
                      }`}
                    >
                      {option.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* MONTH NAVIGATION */}
            <div className="mt-4 flex shrink-0 items-center justify-between px-1">
              <span className="text-sm font-bold tracking-tight text-zinc-900">
                {monthNames[month]} {year}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={
                    year === today.getFullYear() && month === today.getMonth()
                  }
                  aria-label="Previous month"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-20"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Next month"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
                >
                  →
                </button>
              </div>
            </div>

            {/* CALENDAR */}
            <div className="relative mt-2 min-h-[225px] shrink-0">
              {/* Loading overlay */}

              {isLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/90">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-950" />

                  <span className="text-[10px] font-medium text-zinc-500">
                    Updating availability
                  </span>
                </div>
              )}

              {calendarError ? (
                <div className="flex min-h-[225px] items-center justify-center">
                  <div className="w-full rounded-2xl border border-red-100 bg-red-50/60 p-5 text-center">
                    <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm text-red-500">
                      !
                    </div>

                    <p className="text-xs font-semibold text-red-600">
                      Availability unavailable
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-red-400">
                      Please try again in a moment.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setCalendarError(null);

                        /*
                         * Trigger a fresh
                         * request by briefly
                         * resetting blocked dates.
                         */
                        setBlockedDates([]);
                      }}
                      className="mt-3 rounded-lg bg-red-600 px-3 py-1.5 text-[10px] font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* WEEKDAYS */}
                  <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </div>

                  {/* DAYS */}
                  <div className="grid grid-cols-7 gap-y-1">
                    {/* Empty days */}
                    {Array.from({
                      length: firstDayIndex,
                    }).map((_, index) => (
                      <div key={`empty-${index}`} className="h-8" />
                    ))}

                    {/* Actual days */}
                    {Array.from({
                      length: daysInMonth,
                    }).map((_, index) => {
                      const dayNumber = index + 1;

                      const formattedDate = `${year}-${String(
                        month + 1,
                      ).padStart(2, "0")}-${String(dayNumber).padStart(
                        2,
                        "0",
                      )}`;

                      const blocked = isBlockedDate(formattedDate);

                      const past = isPastDate(formattedDate);

                      const isCheckIn = formattedDate === checkIn;

                      const isCheckOut = formattedDate === checkOut;

                      const isSelected = isCheckIn || isCheckOut;

                      const inRange = isDateInRange(formattedDate);

                      const invalidRangeDate =
                        isInvalidCheckoutDate(formattedDate);

                      const disabled = blocked || past || invalidRangeDate;

                      return (
                        <div
                          key={formattedDate}
                          className={`relative flex h-8 items-center justify-center ${
                            inRange ? "bg-zinc-100" : ""
                          } ${
                            isCheckIn && checkOut
                              ? "rounded-l-full bg-zinc-100"
                              : ""
                          } ${isCheckOut ? "rounded-r-full bg-zinc-100" : ""}`}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              handleDateClick(formattedDate, disabled)
                            }
                            disabled={disabled}
                            aria-label={`${monthNames[month]} ${dayNumber}, ${year}`}
                            className={`
                                relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all
                                ${
                                  blocked
                                    ? "cursor-not-allowed text-zinc-300 line-through"
                                    : past || invalidRangeDate
                                      ? "cursor-not-allowed text-zinc-300"
                                      : isSelected
                                        ? "scale-95 bg-zinc-950 font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                                        : inRange
                                          ? "cursor-pointer text-zinc-900 hover:bg-zinc-200"
                                          : "cursor-pointer text-zinc-700 hover:bg-zinc-100"
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

            {/* SUMMARY */}
            <div className="mt-1 flex shrink-0 flex-col gap-2.5 border-t border-zinc-100 pt-3">
              <div className="flex flex-col gap-1 rounded-[18px] border border-zinc-200/60 bg-[#fafafa] px-4 py-3">
                <div className="flex items-center justify-between">
                  {/* Check-in */}
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                      Check-in
                    </div>

                    <div className="mt-0.5 text-xs font-semibold text-zinc-900">
                      {checkIn || "Select date"}
                    </div>
                  </div>

                  <div className="h-7 w-px bg-zinc-200" />

                  {/* Check-out */}
                  <div className="text-right">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                      Check-out
                    </div>

                    <div className="mt-0.5 text-xs font-semibold text-zinc-900">
                      {checkOut || "Select date"}
                    </div>
                  </div>
                </div>

                {freeCancellationText && (
                  <div className="flex items-center gap-1.5 border-t border-zinc-200/60 pt-1.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />

                    <span className="text-[11px] font-medium tracking-wide text-emerald-800">
                      {freeCancellationText}
                    </span>
                  </div>
                )}
              </div>

              {/* CONTINUE */}
              <div>
                <a
                  href={isCompleteBooking ? reservationUrl : undefined}
                  target={isCompleteBooking ? "_blank" : undefined}
                  rel={isCompleteBooking ? "noopener noreferrer" : undefined}
                  aria-disabled={!isCompleteBooking}
                  onClick={(event) => {
                    if (!isCompleteBooking) {
                      event.preventDefault();
                    }
                  }}
                  className={`
                    relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-3 text-xs font-semibold tracking-wide transition-all
                    ${
                      isCompleteBooking
                        ? "cursor-pointer bg-zinc-950 text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:bg-zinc-800 active:scale-[0.98]"
                        : "cursor-not-allowed bg-zinc-100 text-zinc-400"
                    }
                  `}
                >
                  <span>
                    {isCompleteBooking
                      ? `Continue to Airbnb · ${selectedOptionTitle}`
                      : checkIn
                        ? "Select Check-out Date"
                        : "Select Dates to Continue"}
                  </span>

                  {isCompleteBooking && (
                    <svg
                      className="h-3.5 w-3.5"
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

                <p className="mt-1.5 text-center text-[10px] font-light text-zinc-400">
                  You’ll complete your reservation securely on Airbnb.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
