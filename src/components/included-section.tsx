import {
  ChartColumn,
  FileText,
  Inbox,
  ListFilter,
  MessageSquareReply,
  PenLine,
} from "lucide-react"
import { cardBase, cardHover } from "@/components/card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

const items = [
  {
    icon: ListFilter,
    title: "Signal research + list building",
    description:
      "Local businesses in your metro showing a public reason to talk, with verified decision-maker contacts.",
  },
  {
    icon: PenLine,
    title: "Copywriting",
    description:
      "Short, plain-text emails written for your market and readable in 20 seconds. You approve every one.",
  },
  {
    icon: Inbox,
    title: "Inbox setup + warmup",
    description:
      "Separate sending domains and inboxes, warmed up for 14 days. You own them, so your main domain is never at risk.",
  },
  {
    icon: MessageSquareReply,
    title: "Replies handled within minutes",
    description:
      "Every interested reply gets a fast answer and a booking link, so warm prospects don't go cold.",
  },
  {
    icon: FileText,
    title: "A Meeting Brief for every call",
    description:
      "Walk in knowing their size, email setup, security gaps, why we reached out, and what they said.",
  },
  {
    icon: ChartColumn,
    title: "Weekly reports",
    description:
      "A plain-English update each week: what went out, who replied, and which calls got booked.",
  },
]

export function IncludedSection() {
  return (
    <Section id="included" labelledBy="included-heading">
      <SectionHeading
        id="included-heading"
        eyebrow="What's included"
        title="Done for you, start to finish"
        description="You run your MSP. We run the outbound."
      />
      <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={(index % 3) * 75} className="h-full">
              <div className={cn(cardBase, cardHover, "flex h-full gap-4 p-6")}>
                <item.icon
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
