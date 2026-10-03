import { CalendarClock, ShieldAlert, Wrench } from "lucide-react"
import { cardBase, cardHover, iconChip } from "@/components/card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

const problems = [
  {
    icon: CalendarClock,
    title: "Referrals don't run on a schedule",
    description:
      "A happy client mentions you to a friend, and a deal shows up. Great when it happens, impossible to plan a hire or a quarter around.",
  },
  {
    icon: Wrench,
    title: "The owner is the sales team",
    description:
      "When you're closing deals, managing techs, and handling escalations, prospecting is the first thing that slips.",
  },
  {
    icon: ShieldAlert,
    title: "Outbound feels like a risk to your name",
    description:
      "Spammy blasts and pushy cold callers can damage a reputation you spent years building. So most MSPs never start.",
  },
]

export function ProblemSection() {
  return (
    <Section id="problem" labelledBy="problem-heading">
      <SectionHeading
        id="problem-heading"
        eyebrow="The problem"
        title="Referrals built your MSP. They can't be scheduled."
        description="Most MSPs grow on word of mouth. It works, right up until the pipeline goes quiet."
      />
      <ul className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
        {problems.map((problem, index) => (
          <li key={problem.title}>
            <Reveal delay={index * 90} className="h-full">
              <div className={cn(cardBase, cardHover, "h-full p-7")}>
                <div className={iconChip}>
                  <problem.icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {problem.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
