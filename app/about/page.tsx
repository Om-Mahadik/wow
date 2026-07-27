import { Metadata } from "next";
import AboutView from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About Us | Wind Over Waters",
  description: "Learn about the architectural vision and design philosophy behind our premium lakeside digital detox sanctuaries.",
};

export default function AboutPage() {
  return (
    // Clean canvas with structural top padding buffer to accommodate your fixed Navbar safely
    <main className="w-full min-h-screen bg-white pt-24 pb-24">
      <AboutView />
    </main>
  );
}