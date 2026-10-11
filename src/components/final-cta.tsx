import { Link } from "react-router-dom"
import { CalendlyEmbed } from "@/components/calendly-embed"
import { cardBase } from "@/components/card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

const afterBooking = [
  { when: "Walkthrough call", what: "we map your ideal clients and metro." },
  { when: "Week 1", what: "sending domains, inboxes, and your target list set up." },
  { when: "Weeks 2-3", what: "inboxes warm up while we write and approve your emails together." },
  { when: "Week 4 onward", what: "qualified calls start landing on your calendar." },
]

const trustPoints = ["30 minutes", "Straight to the founder", "No obligation", "One MSP per metro"]

function AfterBookingTimeline() {
  return (
    <div className={cn(cardBase, "h-full p-7 md:p-8")}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        What happens after you book
      </h3>
      <ol className="relative mt-6 space-y-6">
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-[0.9375rem] top-3 w-px bg-gradient-to-b from-blue-600/40 via-blue-600/20 to-transparent dark:from-blue-400/40 dark:via-blue-400/20"
        />
        {afterBooking.map((step, index) => (
          <li key={step.when} className="relative flex gap-4">
            <span
              aria-hidden="true"
              className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_4px_12px_-4px_rgb(37_99_235/0.6)]"
            >
              {index + 1}
            </span>
            <p className="pt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-white">{step.when}:</span>{" "}
              {step.what}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function FinalCta() {
  return (
    <Section id="book" labelledBy="book-heading">
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-16 mx-auto h-80 max-w-3xl bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(37,99,235,0.12),transparent)] dark:bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(37,99,235,0.25),transparent)]"
        />
        <Reveal className="relative mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
            Next quarter starts now
          </p>
          <h2
            id="book-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-balance text-gray-900 md:text-[2.75rem] md:leading-[1.1] dark:text-white"
          >
            Know where your next clients are coming from.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-300">
            Book a 30-minute walkthrough. We'll map who you want to reach in your metro, show
            you how {site.offer.systemName} would work for you, and lay out your first 90
            days. If it's not a fit, you'll still leave with a clear plan.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-start">
        <Reveal className="lg:sticky lg:top-24">
          <AfterBookingTimeline />
        </Reveal>
        <Reveal delay={100}>
          {/* Calendly's plan here doesn't honor the embed's color params (confirmed live - the
              iframe always renders its own white card), so this frame doesn't fight it with
              cardBase's dark background. Instead it stays a deliberate light panel in both
              themes, framed with a soft blue glow in dark mode so it reads as "a bright card
              on a dark page" rather than an unstyled white box. */}
          <div className="overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-16px_rgb(0_0_0/0.10)] dark:border-blue-400/20 dark:shadow-[0_0_0_1px_rgb(255_255_255/0.05),0_0_48px_-12px_rgba(59,130,246,0.45),0_20px_48px_-16px_rgb(0_0_0/0.7)]">
            <CalendlyEmbed />
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-8 max-w-3xl text-center">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm font-medium text-gray-700 sm:gap-x-3 dark:text-gray-300">
          {trustPoints.map((point, index) => (
            <li key={point} className="flex items-center gap-3">
              {index > 0 && (
                <span aria-hidden="true" className="hidden text-gray-400 sm:inline dark:text-gray-500">
                  ·
                </span>
              )}
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Not ready for a call?{" "}
          <Link
            to="/contact"
            className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-500 dark:hover:text-blue-300 dark:text-blue-400"
          >
            Ask a quick question.
          </Link>{" "}
          You'll hear back within 24-48 hours.
        </p>
      </div>
    </Section>
  )
}
