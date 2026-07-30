"use client";

import { useState } from "react";
import { CalendarDays, Users, Search, ChevronDown } from "lucide-react";

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    console.log({
      checkIn,
      checkOut,
      guests,
    });

    // Example:
    // router.push(`/cabin?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <section className="relative z-20 -mt-20 px-5">
      <div className="mx-auto max-w-7xl rounded-[30px] border border-white/30 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">

        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-green-700">
            Plan Your Escape
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-neutral-900">
            Book Your Stay
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_220px]">

          {/* Check In */}
          <div className="rounded-2xl border border-neutral-200 p-4 transition hover:border-green-700">
            <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
              <CalendarDays size={16} />
              Check In
            </label>

            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-lg font-medium outline-none"
            />
          </div>

          {/* Check Out */}
          <div className="rounded-2xl border border-neutral-200 p-4 transition hover:border-green-700">
            <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
              <CalendarDays size={16} />
              Check Out
            </label>

            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-lg font-medium outline-none"
            />
          </div>

          {/* Guests */}
          <div className="rounded-2xl border border-neutral-200 p-4 transition hover:border-green-700">
            <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
              <Users size={16} />
              Guests
            </label>

            <div className="relative">
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full appearance-none bg-transparent text-lg font-medium outline-none"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} Guest{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-3 rounded-2xl bg-green-700 px-8 py-5 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl"
          >
            <Search size={20} />
            Find Stay
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-5 text-sm text-neutral-600">
          <span>⭐ 4.9 Guest Rating</span>
          <span>✓ Instant Confirmation</span>
          <span>✓ Free Parking</span>
          <span>✓ Bonfire Available</span>
        </div>

      </div>
    </section>
  );
}