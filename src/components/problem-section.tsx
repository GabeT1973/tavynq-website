import { CalendarClock, ShieldAlert, Wrench } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

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
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="mx-auto max-w-screen-xl px-4 py-20 md:px-8"
    >
      <SectionHeading
        id="problem-heading"
        eyebrow="The problem"
        title="Referrals built your MSP. They can't be scheduled."
        description="Most MSPs grow on word of mouth. It works, right up until the pipeline goes quiet."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {problems.map((problem, index) => (
          <Reveal key={problem.title} delay={index * 100}>
            <div className="h-full rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-gray-900">
              <problem.icon aria-hidden="true" className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                {problem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {problem.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
