import CabinActions from "./CabinActions";
import CabinAmenities from "./CabinAmenities";
import CabinGallery from "./CabinGallery";
import CabinHero from "./CabinHero";
import CabinLocation from "./CabinLocation";
import CabinOverview from "./CabinOverview";
import CabinReviews from "./CabinReviews";
import CabinRules from "./CabinRules";
import CabinThingsToDo from "./CabinThingsToDo";

export default function CabinView() {
  return (
    <div className="space-y-0">
      <CabinHero />
      <CabinActions />
      <CabinOverview />
      <CabinAmenities />
      <CabinGallery />
      <CabinLocation />
      <CabinReviews />
      <CabinRules />
      <CabinThingsToDo />

    </div>
  );
}