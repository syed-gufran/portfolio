import { FloatingOrb } from "@/components/floating-orb";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";

export default function Home() {
  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      <FloatingOrb />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </div>
  );
}
