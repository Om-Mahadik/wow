import { Metadata } from "next";
import FAQView from "@/components/faqs/FAQView";

export const metadata: Metadata = {
  title: "FAQ | Wind Over Waters",
  description: "Frequently asked questions about your off-the-grid container glamping stay, check-in logistics, and safety boundaries at Wind Over Waters.",
};

export default function FAQPage() {
  return (
    <main className="w-full min-h-screen bg-white pt-12 pb-24">
      <FAQView />
    </main>
  );
}