import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AcademicHighlights from "@/components/AcademicHighlights";
import GalleryMarquee from "@/components/GalleryMarquee";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <AcademicHighlights />
      <GalleryMarquee />
    </main>
  );
}
