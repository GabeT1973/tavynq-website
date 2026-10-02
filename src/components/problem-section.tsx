import { CalendarClock, TrendingDown, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

const problems = [
  {
    icon: CalendarClock,
    title: "You can't schedule word of mouth",
    description:
      "Referrals arrive when they arrive. When the pipeline runs dry, there's no switch to turn them back on.",
  },
  {
    icon: TrendingDown,
    title: "Feast, then famine",
    description:
      "Busy months leave no time to sell, so the quiet months that follow hit twice as hard.",
  },
  {
    icon: Users,
    title: "Your growth depends on other people",
    description:
      "If a few happy clients stop talking about you, new business stops too. That's not a plan.",
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
        title="Referrals are great. Until they stop."
        description="Most firms grow on word of mouth. It works, right up until it doesn't."
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
