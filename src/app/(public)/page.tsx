import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import HarvestSection from "@/components/HarvestSection";
import PerspectivesSection from "@/components/PerspectivesSection";
import HowItWorksSection from "@/components/Howitworkssection";
import RealFarmsSection from "@/components/Realfarmssection";
export default function Home() {
  return (
    <>
      <HeroSection />
      <HarvestSection />
      <PerspectivesSection />
      <HowItWorksSection />
      <RealFarmsSection />

    </>
  );
}