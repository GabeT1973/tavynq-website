import { FileText, KeyRound, MapPin, Radar, ShieldCheck, ThumbsDown } from "lucide-react"
import { cardBase, cardHover, iconChip } from "@/components/card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { SectionHeading } from "@/components/section-heading"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

const differences = [
  {
    icon: Radar,
    title: "Signal-based targeting",
    description:
      "We only email local businesses showing a public reason to talk: gaps in their public email security records, hiring for in-house IT, new offices, or headcount growth.",
  },
  {
    icon: ThumbsDown,
    title: "Bad-Fit Free",
    description: `After each call, you have ${site.badFitWindowHours} hours to flag it as a bad fit against our written criteria. Flagged calls and no-shows are never billed.`,
  },
  {
    icon: FileText,
    title: "Meeting Brief",
    description:
      "Before every call, a one-page brief: company size, email provider, email security gaps, the signal that triggered outreach, their exact reply, and suggested opening questions.",
  },
  {
    icon: ShieldCheck,
    title: "Your brand, protected",
    description:
      "Email only, no cold callers. You approve every message before it's sent, so nothing goes out that you wouldn't put your name on.",
  },
  {
    icon: KeyRound,
    title: "You own everything",
    description:
      "If you ever leave, you keep the sending domains, the lead lists, and the email copy. No hostage situations.",
  },
  {
    icon: MapPin,
    title: "One MSP per metro",
    description:
      "We never work with your local competitor. Once we partner with you, your metro is yours.",
  },
]

export function DifferentSection() {
  return (
    <Section id="different" labelledBy="different-heading">
      <SectionHeading
        id="different-heading"
        eyebrow={`Why ${site.name}`}
        title="Built for MSPs, not bolted on"
        description="Six commitments built into every engagement."
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
        {differences.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={(index % 3) * 90} className="h-full">
              <div className={cn(cardBase, cardHover, "h-full p-7")}>
                <div className={iconChip}>
                  <item.icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
