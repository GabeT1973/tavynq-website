import { ContactSection } from "@/components/contact-section"
import { HeroSection } from "@/components/ui/hero-section-dark"
import { HowItWorks } from "@/components/how-it-works"

export function Home() {
  return (
    <>
      <HeroSection
        title="AI Automation for Home Service Businesses"
        subtitle={{
          regular: "Never lose a job to a ",
          gradient: "missed call again",
        }}
        description="Tavynq builds AI-powered systems for HVAC, plumbing, and roofing companies. When you miss a call, our system instantly texts the caller back so you don't lose the job to a competitor."
        ctaText="Get in Touch"
        ctaHref="#contact"
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      />
      <HowItWorks />
      <ContactSection />
    </>
  )
}
