import { useEffect, type MouseEvent } from "react"
import { useLocation } from "react-router-dom"
import { PlayCircle } from "lucide-react"
import { BookCallLink, pillSecondary } from "@/components/book-call-link"
import { DifferentSection } from "@/components/different-section"
import { Faq } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"
import { HowItWorks } from "@/components/how-it-works"
import { IncludedSection } from "@/components/included-section"
import { PricingSection } from "@/components/pricing-section"
import { ProblemSection } from "@/components/problem-section"
import { ProofSection } from "@/components/proof-section"
// import { ResultsSection } from "@/components/results-section"
import { HeroSection } from "@/components/ui/hero-section-dark"
import { VslSection } from "@/components/vsl-section"
import { site } from "@/config/site"
import { scrollToId } from "@/lib/scroll"
import { usePageMeta } from "@/lib/use-page-meta"

// The video section and its "Watch" button only show once a YouTube ID is set in the config.
const hasVideo = site.youtubeId.length > 0

export function Home() {
  const location = useLocation()
  usePageMeta(site.seo.title, site.seo.description)

  useEffect(() => {
    if (!location.hash) return
    scrollToId(decodeURIComponent(location.hash.slice(1)))
  }, [location.hash])

  function handleWatchClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    scrollToId("breakdown")
  }

  return (
    <>
      <HeroSection
        // Pull the hero up under the transparent sticky header so its glow starts at the very top.
        className="-mt-16 pt-16"
        eyebrow={site.offer.systemName}
        title={{
          regular: site.offer.headline.start,
          gradient: site.offer.headline.highlight,
          end: site.offer.headline.end,
        }}
        description={site.offer.subhead}
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#4a4a4a",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookCallLink className="w-full sm:w-auto" />
          {hasVideo && (
            <a
              href="#breakdown"
              onClick={handleWatchClick}
              className={`${pillSecondary} w-full px-6 py-3 text-sm sm:w-auto`}
            >
              <PlayCircle aria-hidden="true" className="h-4 w-4" />
              Watch the 10-minute breakdown
            </a>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Email only, no cold callers. No-shows and bad-fit calls are never billed.
        </p>
      </HeroSection>
      {hasVideo && <VslSection videoId={site.youtubeId} />}
      <ProblemSection />
      <HowItWorks />
      <DifferentSection />
      <IncludedSection />
      <PricingSection />
      <ProofSection />
      {/* Real case studies only. Add entries in results-section.tsx, then un-comment:
      <ResultsSection /> */}
      <Faq />
      <FinalCta />
    </>
  )
}
