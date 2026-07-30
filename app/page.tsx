import HandWrittenExplain from "@/components/home/HandWrittenExplain";
import HomeAmenities from "@/components/home/HomeAmenities";
import HomeHero from "@/components/home/Homehero";
import LocationSection from "@/components/home/LocationSection";
import PeopleStories from "@/components/home/PeopleStories";
import HomeReels from "@/components/home/HomeReels";
import HomeInstagramEmbeds from "@/components/home/HomeInstagramEmbeds";
import HomeAirbnbBanner from "@/components/home/HomeAirbnbBanner";

import HeroSection from "@/components/home/HeroSection";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import MinimalLivingExplain from "@/components/home/MinimalLivingExplain";
import BookingWidget from "@/components/home/BookingWidget";
import FeaturedCabin from "@/components/home/FeaturedCabin";
import FAQSection from "@/components/faqs/FAQSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col select-none overflow-x-hidden">
      {/* Hero sits full-bleed at the very top */}
      <HeroSection />
      <ShowcaseSection />
      <FeaturedCabin />
      <HomeAirbnbBanner />
      <HomeReels /> 
      <FAQSection />
      <LocationSection />

    </main>
  );
}