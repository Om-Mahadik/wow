import { ReactNode } from "react";
import { BookingProvider } from "@/context/BookingContext";
import GlobalBookingBar from "@/components/layout/GlobalBookingBar";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      {children}
      <GlobalBookingBar />
    </BookingProvider>
  );
}