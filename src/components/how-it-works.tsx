import { MessageSquareText, PhoneMissed, CalendarCheck } from "lucide-react"

const steps = [
  {
    icon: PhoneMissed,
    title: "Missed call comes in",
    description:
      "A potential customer calls your business, but no one is available to pick up.",
  },
  {
    icon: MessageSquareText,
    title: "AI instantly texts the caller back",
    description:
      "Within seconds, our system sends a personalized text so the caller knows you're on it.",
  },
  {
    icon: CalendarCheck,
    title: "Job gets booked",
    description:
      "The AI keeps the conversation going and gets the job scheduled, before a competitor picks up the phone.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-screen-xl px-4 py-20 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          How it works
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Three steps between a missed call and a booked job.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-gray-900"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white">
              <step.icon className="h-5 w-5" />
            </div>
            <span className="absolute right-6 top-6 text-4xl font-semibold text-gray-100 dark:text-gray-800">
              {index + 1}
            </span>
            <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
