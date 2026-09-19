import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ContactSection } from "@/components/contact-section"
import { HeroSection } from "@/components/ui/hero-section-dark"
import { HowItWorks } from "@/components/how-it-works"
import { Faq } from "@/components/faq"
import { ExampleSection } from "@/components/example-section"

export function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const target = document.querySelector(location.hash)
    target?.scrollIntoView({ behavior: "smooth" })
  }, [location.hash])

  return (
    <>
      <HeroSection
        title="AI Automation for Home Service Businesses"
        subtitle={{
          regular: "Never lose a job to a ",
          gradient: "missed call again",
        }}
        description="Tavynq builds AI-powered systems for HVAC, plumbing, and roofing companies. When you miss a call, our system instantly texts the caller back so you don't lose the job to a competitor."
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      />
      <HowItWorks />
      <ExampleSection />
      <Faq />
      <ContactSection />
    </>
  )
}
