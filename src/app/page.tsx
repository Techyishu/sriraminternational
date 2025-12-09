import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import GalleryMarquee from "@/components/GalleryMarquee";
import WelcomeSection from "@/components/WelcomeSection";
import ProgramsSection from "@/components/ProgramsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <WelcomeSection />
      <ProgramsSection />
      <Stats />
      <GalleryMarquee />
    </main>
  );
}
