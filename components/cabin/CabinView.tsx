import CabinActions from "./CabinActions";
import CabinAmenities from "./CabinAmenities";
import CabinGallery from "./CabinGallery";
import CabinHero from "./CabinHero";
import CabinKitchen from "./CabinKitchen";
import CabinLocation from "./CabinLocation";
import CabinOverview from "./CabinOverview";
import CabinReviews from "./CabinReviews";
import CabinRules from "./CabinRules";
import CabinThingsToDo from "./CabinThingsToDo";

export default function CabinView() {
  return (
    <div className="w-full flex flex-col p-0 m-0 overflow-x-hidden scroll-smooth">
      <section className="w-full">
        <CabinHero />
      </section>

      <section className="w-full">
        <CabinOverview />
      </section>
      <section id="amenities" className="w-full">
        <CabinAmenities />
      </section>
      
      {/* 100% Full-Bleed Gallery Section */}
      <section className="w-full relative overflow-hidden my-0 py-0">
        <CabinGallery />
      </section>

      <section className="w-full">
        <CabinKitchen />
      </section>
      <section id="location" className="w-full">
        <CabinLocation />
      </section>

      {/* Target Section: Reviews */}
      <section id="reviews" className="w-full scroll-mt-10">
        <CabinReviews />
      </section>

      {/* Target Section: Rules */}
      <section id="rules" className="w-full scroll-mt-10">
        <CabinRules />
      </section>
    </div>
  );
}