import { ChartColumn, Inbox, ListFilter, MessageSquareReply, PenLine } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

const items = [
  {
    icon: ListFilter,
    title: "List building",
    description: "Targeted lists of decision-makers who match your ideal client, verified before we send.",
  },
  {
    icon: PenLine,
    title: "Copywriting",
    description: "Short, plain-text emails written for your market. Readable in 20 seconds.",
  },
  {
    icon: Inbox,
    title: "Inbox setup + warmup",
    description: "Separate sending domains and inboxes, warmed up for 14 days so emails land in the inbox.",
  },
  {
    icon: MessageSquareReply,
    title: "Replies handled within minutes",
    description: "Every interested reply gets a fast answer and a booking link, so warm leads don't go cold.",
  },
  {
    icon: ChartColumn,
    title: "Weekly reports",
    description: "A plain-English update each week: what went out, who replied, and which calls got booked.",
  },
]

export function IncludedSection() {
  return (
    <section
      id="included"
      aria-labelledby="included-heading"
      className="mx-auto max-w-screen-xl px-4 py-20 md:px-8"
    >
      <SectionHeading
        id="included-heading"
        eyebrow="What's included"
        title="Done for you, start to finish"
        description="You run your business. We run the outbound."
      />
      <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 75} className="h-full">
              <div className="flex h-full gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-gray-900">
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
    </section>
  )
}
