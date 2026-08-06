"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ContactForm() {
  const smoothEase = [0.25, 1, 0.5, 1] as const;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    durationDays: "1 Day",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Official Google Maps Place Target Link
  const googleMapsUrl = "https://maps.app.goo.gl/uvEhh6GcFYdzJenq5";

  // Calendar State
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());

  const dropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const durationOptions = [
    "1 Day",
    "2 Days",
    "3 Days",
    "4+ Days (Extended Stay)",
  ];

  // Close custom popovers on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      durationDays: "1 Day",
      message: "",
    });
    setSubmitted(false);
  };

  // Calendar Helper Logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    return { days, firstDayIndex, year, month };
  };

  const handleSelectDate = (day: number) => {
    const selected = new Date(
      currentCalendarMonth.getFullYear(),
      currentCalendarMonth.getMonth(),
      day
    );
    const formatted = selected.toISOString().split("T")[0];
    setFormData({ ...formData, preferredDate: formatted });
    setIsDatePickerOpen(false);
  };

  const handleQuickPreset = (preset: "today" | "tomorrow" | "weekend") => {
    const target = new Date();
    if (preset === "tomorrow") {
      target.setDate(target.getDate() + 1);
    } else if (preset === "weekend") {
      const day = target.getDay();
      const diff = day === 0 ? 6 : 6 - day;
      target.setDate(target.getDate() + diff);
    }
    const formatted = target.toISOString().split("T")[0];
    setFormData({ ...formData, preferredDate: formatted });
    setIsDatePickerOpen(false);
  };

  const { days, firstDayIndex, year, month } = getDaysInMonth(currentCalendarMonth);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formContainerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: smoothEase, staggerChildren: 0.06 },
    },
  };

  const fieldVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: smoothEase },
    },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.98, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: smoothEase },
    },
  };

  return (
    <div className="w-full bg-white select-none py-10">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-16">
        
        {/* Desktop Split Grid: Form (Left) | Ambient Showcase Image (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT COLUMN: Contact Form Card */}
          <motion.div
            variants={formContainerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 bg-zinc-50/80 border border-zinc-200/80 rounded-[32px] p-6 md:p-10 shadow-2xs flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <motion.div variants={fieldVariants} className="space-y-1.5 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
                  Get in Touch
                </h2>
                <p className="text-base text-zinc-500 font-light leading-relaxed">
                  Fill out the form below and we will respond to you shortly.
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-7"
                  >
                    {/* 1. Full Name */}
                    <motion.div variants={fieldVariants} className="relative flex flex-col">
                      <motion.label
                        htmlFor="name"
                        animate={{
                          y: focusedField === "name" || formData.name ? -10 : 18,
                          scale: focusedField === "name" || formData.name ? 0.8 : 1,
                          color: focusedField === "name" ? "#18181b" : "#71717a",
                        }}
                        transition={{ duration: 0.2, ease: smoothEase }}
                        className="absolute left-3.5 top-0 pointer-events-none origin-top-left font-semibold text-xs uppercase tracking-wider z-10 bg-white px-1.5 rounded-md"
                      >
                        Full Name <span className="text-rose-500">*</span>
                      </motion.label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={focusedField === "name" ? "e.g. Rahul Sharma" : ""}
                        className="w-full px-4 pt-4 pb-3 rounded-2xl bg-white border border-zinc-200/80 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                      />
                    </motion.div>

                    {/* 2. Email & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-5">
                      {/* Email */}
                      <motion.div variants={fieldVariants} className="relative flex flex-col">
                        <motion.label
                          htmlFor="email"
                          animate={{
                            y: focusedField === "email" || formData.email ? -10 : 18,
                            scale: focusedField === "email" || formData.email ? 0.8 : 1,
                            color: focusedField === "email" ? "#18181b" : "#71717a",
                          }}
                          transition={{ duration: 0.2, ease: smoothEase }}
                          className="absolute left-3.5 top-0 pointer-events-none origin-top-left font-semibold text-xs uppercase tracking-wider z-10 bg-white px-1.5 rounded-md"
                        >
                          Email Address <span className="text-rose-500">*</span>
                        </motion.label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={focusedField === "email" ? "name@example.com" : ""}
                          className="w-full px-4 pt-4 pb-3 rounded-2xl bg-white border border-zinc-200/80 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                        />
                      </motion.div>

                      {/* Phone */}
                      <motion.div variants={fieldVariants} className="relative flex flex-col">
                        <motion.label
                          htmlFor="phone"
                          animate={{
                            y: focusedField === "phone" || formData.phone ? -10 : 18,
                            scale: focusedField === "phone" || formData.phone ? 0.8 : 1,
                            color: focusedField === "phone" ? "#18181b" : "#71717a",
                          }}
                          transition={{ duration: 0.2, ease: smoothEase }}
                          className="absolute left-3.5 top-0 pointer-events-none origin-top-left font-semibold text-xs uppercase tracking-wider z-10 bg-white px-1.5 rounded-md"
                        >
                          Phone Number <span className="text-rose-500">*</span>
                        </motion.label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onFocus={() => setFocusedField("phone")}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={focusedField === "phone" ? "+91 98765 43210" : ""}
                          className="w-full px-4 pt-4 pb-3 rounded-2xl bg-white border border-zinc-200/80 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200"
                        />
                      </motion.div>
                    </div>

                    {/* 3. Custom Date Picker & Custom Dropdown Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-5">
                      {/* Custom Date Picker */}
                      <motion.div variants={fieldVariants} ref={datePickerRef} className="relative flex flex-col">
                        <motion.span
                          animate={{
                            y: isDatePickerOpen || formData.preferredDate ? -10 : 18,
                            scale: isDatePickerOpen || formData.preferredDate ? 0.8 : 1,
                            color: isDatePickerOpen ? "#18181b" : "#71717a",
                          }}
                          transition={{ duration: 0.2, ease: smoothEase }}
                          className="absolute left-3.5 top-0 pointer-events-none origin-top-left font-semibold text-xs uppercase tracking-wider z-10 bg-white px-1.5 rounded-md"
                        >
                          Preferred Date
                        </motion.span>
                        <button
                          type="button"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                          className={`w-full px-4 pt-4 pb-3 rounded-2xl bg-white border text-left text-base flex items-center justify-between transition-all duration-200 cursor-pointer ${
                            isDatePickerOpen ? "border-zinc-900 ring-1 ring-zinc-900" : "border-zinc-200/80"
                          }`}
                        >
                          <span className="text-zinc-900 font-medium min-h-[1.5rem] flex items-center">
                            {formData.preferredDate ? (
                              formData.preferredDate
                            ) : isDatePickerOpen ? (
                              <span className="text-zinc-400 text-sm font-normal">Select a date</span>
                            ) : (
                              ""
                            )}
                          </span>
                          <CalendarIcon />
                        </button>

                        {/* Popover Calendar Modal */}
                        <AnimatePresence>
                          {isDatePickerOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.98 }}
                              transition={{ duration: 0.2, ease: smoothEase }}
                              className="absolute left-0 top-full mt-2 z-30 w-full sm:w-80 bg-white border border-zinc-200 rounded-2xl p-4 shadow-xl"
                            >
                              {/* Calendar Month Controls */}
                              <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-100">
                                <span className="text-sm font-bold text-zinc-800">
                                  {monthNames[month]} {year}
                                </span>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => setCurrentCalendarMonth(new Date(year, month - 1, 1))}
                                    className="w-7 h-7 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-600 cursor-pointer"
                                  >
                                    ‹
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setCurrentCalendarMonth(new Date(year, month + 1, 1))}
                                    className="w-7 h-7 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-600 cursor-pointer"
                                  >
                                    ›
                                  </button>
                                </div>
                              </div>

                              {/* Days Header */}
                              <div className="grid grid-cols-7 text-center text-xs font-bold text-zinc-400 uppercase mb-2">
                                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                              </div>

                              {/* Days Grid */}
                              <div className="grid grid-cols-7 gap-1 text-center">
                                {Array.from({ length: firstDayIndex }).map((_, i) => (
                                  <div key={`empty-${i}`} />
                                ))}
                                {Array.from({ length: days }).map((_, i) => {
                                  const dayNum = i + 1;
                                  return (
                                    <button
                                      key={dayNum}
                                      type="button"
                                      onClick={() => handleSelectDate(dayNum)}
                                      className="h-8 w-8 rounded-lg text-xs font-medium hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center mx-auto"
                                    >
                                      {dayNum}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Presets */}
                              <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-100 text-xs font-semibold text-zinc-500">
                                <button type="button" onClick={() => handleQuickPreset("today")} className="hover:text-zinc-900 cursor-pointer">Today</button>
                                <button type="button" onClick={() => handleQuickPreset("tomorrow")} className="hover:text-zinc-900 cursor-pointer">Tomorrow</button>
                                <button type="button" onClick={() => handleQuickPreset("weekend")} className="hover:text-zinc-900 cursor-pointer">This Weekend</button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Custom Dropdown */}
                      <motion.div variants={fieldVariants} ref={dropdownRef} className="relative flex flex-col">
                        <motion.span
                          animate={{
                            y: isDropdownOpen || formData.durationDays ? -10 : 18,
                            scale: isDropdownOpen || formData.durationDays ? 0.8 : 1,
                            color: isDropdownOpen ? "#18181b" : "#71717a",
                          }}
                          transition={{ duration: 0.2, ease: smoothEase }}
                          className="absolute left-3.5 top-0 pointer-events-none origin-top-left font-semibold text-xs uppercase tracking-wider z-10 bg-white px-1.5 rounded-md"
                        >
                          Duration (Days)
                        </motion.span>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`w-full px-4 pt-4 pb-3 rounded-2xl bg-white border text-left text-base flex items-center justify-between transition-all duration-200 cursor-pointer ${
                            isDropdownOpen ? "border-zinc-900 ring-1 ring-zinc-900" : "border-zinc-200/80"
                          }`}
                        >
                          <span className="text-zinc-900 font-medium text-base">{formData.durationDays}</span>
                          <ChevronDownIcon isOpen={isDropdownOpen} />
                        </button>

                        {/* Dropdown Options List */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.98 }}
                              transition={{ duration: 0.2, ease: smoothEase }}
                              className="absolute left-0 top-full mt-2 z-30 w-full bg-white border border-zinc-200 rounded-2xl p-1.5 shadow-xl flex flex-col gap-1"
                            >
                              {durationOptions.map((option, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, durationDays: option });
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                                    formData.durationDays === option
                                      ? "bg-zinc-900 text-white"
                                      : "text-zinc-700 hover:bg-zinc-100"
                                  }`}
                                >
                                  <span>{option}</span>
                                  {formData.durationDays === option && <CheckIcon />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    {/* 4. Special Message / Requirements */}
                    <motion.div variants={fieldVariants} className="relative flex flex-col">
                      <motion.label
                        htmlFor="message"
                        animate={{
                          y: focusedField === "message" || formData.message ? -10 : 18,
                          scale: focusedField === "message" || formData.message ? 0.8 : 1,
                          color: focusedField === "message" ? "#18181b" : "#71717a",
                        }}
                        transition={{ duration: 0.2, ease: smoothEase }}
                        className="absolute left-3.5 top-0 pointer-events-none origin-top-left font-semibold text-xs uppercase tracking-wider z-10 bg-white px-1.5 rounded-md"
                      >
                        Message / Special Requirements
                      </motion.label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={focusedField === "message" ? "Enter your message or special requirements..." : ""}
                        className="w-full px-4 pt-4 pb-3 rounded-2xl bg-white border border-zinc-200/80 text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all duration-200 resize-none"
                      />
                      <div className="flex justify-end pt-1 pr-1">
                        <span className="text-xs text-zinc-400 font-mono">
                          {formData.message.length} chars
                        </span>
                      </div>
                    </motion.div>

                    {/* 5. Submit Button */}
                    <motion.div variants={fieldVariants} className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-600 text-white font-bold text-xs uppercase tracking-[0.15em] rounded-2xl transition-all duration-300 shadow-2xs active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          "Submit Message"
                        )}
                      </button>
                    </motion.div>
                  </motion.form>
                ) : (
                  /* Success State */
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                    className="flex flex-col items-center justify-center text-center py-8 px-4 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                      <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-zinc-900">Message Sent</h3>
                      <p className="text-base text-zinc-500 font-light max-w-sm">
                        Thank you, <span className="font-semibold text-zinc-800">{formData.name}</span>. Your message has been submitted. We will reach out to you shortly.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-2 px-6 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-semibold text-zinc-700 tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Desktop Showcase Image Card with Google Maps Navigation Link */}
          <motion.div
            variants={imageVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            className="hidden lg:flex lg:col-span-5 relative rounded-[32px] overflow-hidden border border-zinc-200/80 min-h-[560px] shadow-sm transform-gpu isolate group flex-col justify-between p-8"
          >
            {/* Background Image with Gentle Scale-on-Hover */}
            <Image
              src="/images/cabin/cabin-1.avif"
              alt="Wind Over Waters Glamping Sanctuary"
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none z-0"
            />

            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-10" />

            {/* Top Badge Overlay linked directly to your Google Maps location */}
            <div className="relative z-20 flex items-center justify-between w-full">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1.5 border border-white/20 text-white text-xs font-semibold tracking-wide hover:bg-white/20 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Wind Over Waters
              </a>
            </div>

            {/* Bottom Content Overlay */}
            <div className="relative z-20 space-y-2 text-white">
              <h3 className="text-2xl font-bold tracking-tight leading-snug">
                Experience Tranquility Off the Grid
              </h3>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                Nestled directly along Panshet Lake, surrounded by untouched natural beauty and foggy hills.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// VECTOR ICONS
// ==========================================

function CalendarIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-400 shrink-0 stroke-[1.8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ChevronDownIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 stroke-[2] ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-white stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}