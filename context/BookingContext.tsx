// context/BookingContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type BookingOption = "cabin1" | "cabin2" | "both";

interface BookingContextType {
  selectedOption: BookingOption;
  setSelectedOption: (option: BookingOption) => void;
  checkIn: string | null;
  setCheckIn: (date: string | null) => void;
  checkOut: string | null;
  setCheckOut: (date: string | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isDismissed: boolean;
  setIsDismissed: (dismissed: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedOption, setSelectedOption] = useState<BookingOption>("cabin1");
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  return (
    <BookingContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        isModalOpen,
        setIsModalOpen,
        isDismissed,
        setIsDismissed,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}