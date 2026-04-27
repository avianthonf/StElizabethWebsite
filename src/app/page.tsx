import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroBanner } from "@/components/sections/IntroBanner";
import { VideoHero } from "@/components/sections/VideoHero";
import { ValuesCarousel } from "@/components/sections/ValuesCarousel";
import { CutoutBanner } from "@/components/sections/CutoutBanner";
import { RedHeaderPanel } from "@/components/sections/RedHeaderPanel";
import { MobileHideGrid } from "@/components/sections/MobileHideGrid";
import { SplitMediaGrid } from "@/components/sections/SplitMediaGrid";
import { DesktopHalfSection } from "@/components/sections/DesktopHalfSection";
import { FeatureCarousel } from "@/components/sections/FeatureCarousel";
import { TabbedShowcase } from "@/components/sections/TabbedShowcase";
import { CenteredHeroCta } from "@/components/sections/CenteredHeroCta";

export default function Home() {
  return (
    <div className="bg-white text-zinc-900">
      <Header />
      <main>
        <IntroBanner />
        <VideoHero />
        <ValuesCarousel />
        <CutoutBanner />
        <RedHeaderPanel />
        <MobileHideGrid />
        <SplitMediaGrid />
        <DesktopHalfSection />
        <FeatureCarousel />
        <TabbedShowcase />
        <CenteredHeroCta />
      </main>
      <Footer />
    </div>
  );
}
