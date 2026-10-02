import { CalendarCheck, ListChecks, Rocket, Search } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { site } from "@/config/site"

const steps = [
  {
    icon: Search,
    title: "We learn your MSP",
    description:
      "A kickoff call to pin down your metro, the businesses you serve best, your services, and exactly what a qualified call means for you, in writing.",
  },
  {
    icon: ListChecks,
    title: "We find businesses with a reason to talk",
    description:
      "We build lists of local businesses showing public signals, verify every contact, and write short plain-text emails. You approve every message before it goes out.",
  },
  {
    icon: Rocket,
    title: "Campaigns go live",
    description:
      "After a 14-day inbox warmup on separate sending domains, emails go out in small daily batches. Every interested reply gets a response within minutes.",
  },
  {
    icon: CalendarCheck,
    title: "Qualified calls land on your calendar",
    description:
      "Prospects book a time that suits them, and you get a one-page Meeting Brief before every call. You show up and close.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="mx-auto max-w-screen-xl px-4 py-20 md:px-8"
    >
      <SectionHeading
        id="how-it-works-heading"
        eyebrow="How it works"
        title={site.offer.systemName}
        description="Four steps from kickoff to qualified sales calls on your calendar. Email only, no cold callers."
      />
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 100} className="h-full">
              <div className="relative h-full rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-gray-900">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white">
                  <step.icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-6 text-4xl font-semibold text-gray-100 dark:text-gray-800"
                >
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
