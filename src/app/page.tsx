import { EnhancedHeader } from "@/components/layout/EnhancedHeader";
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
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <div className="bg-white text-zinc-900">
      <EnhancedHeader />
      <main>
        <ScrollReveal>
          <IntroBanner />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <VideoHero />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <ValuesCarousel />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <CutoutBanner />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <RedHeaderPanel />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <MobileHideGrid />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <SplitMediaGrid />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <DesktopHalfSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <FeatureCarousel />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <TabbedShowcase />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <CenteredHeroCta />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
