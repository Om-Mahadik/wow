import HandWrittenExplain from "@/components/home/HandWrittenExplain";
import HomeAmenities from "@/components/home/HomeAmenities";
import HomeHero from "@/components/home/Homehero";
import LocationSection from "@/components/home/LocationSection";
import PeopleStories from "@/components/home/PeopleStories";

export default function Home() {
  return (
    // Changed max-w-2xl to w-full, dropped items-center, and removed the text-center constraint
    <main className="w-full min-h-screen flex flex-col gap-16 select-none overflow-x-hidden">
      <HomeHero />
      <div className="w-full h-16 lg:h-24" />
      <HomeAmenities />
      <HandWrittenExplain />
      <LocationSection />
      <PeopleStories />
    </main>
  );
}