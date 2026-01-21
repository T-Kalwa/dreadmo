import Hero from "./components/Hero";
import ConceptBanner from "./components/ConceptBanner";
import HairCategories from "./components/HairCategories";
import PopularTreatments from "./components/PopularTreatments";
import SalonsFeatured from "./components/SalonsFeatured";
import Testimonials from "./components/Testimonials";
import ProSignup from "./components/ProSignup";

export default function Home() {
  return (
    <main>
      <Hero />
      <ConceptBanner />
      <HairCategories />
      <PopularTreatments />
      <SalonsFeatured />
      <Testimonials />
      <ProSignup />
    </main>
  );
}