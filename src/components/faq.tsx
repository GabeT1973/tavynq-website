import { useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"

function CancellationLink() {
  return (
    <Link
      to="/cancellation-policy"
      className="text-blue-600 underline underline-offset-2 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
    >
      Cancellation Policy
    </Link>
  )
}

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Do I need a new phone number?",
    answer:
      "Yes, we set up a dedicated number that forwards from your existing business line. Customers never see a difference — they call your regular number like always.",
  },
  {
    question: "Will the texts sound like a robot?",
    answer:
      "No. The messages are written to sound like they're coming from a real person at your business, not an automated bot.",
  },
  {
    question: "What if a customer texts back with a real question, not just 'yes'?",
    answer:
      "You'll get notified right away so you or your team can jump in and respond personally. The automation just makes sure nobody gets ignored while you're on a job.",
  },
  {
    question: "Does this book the job automatically, or just get me the lead?",
    answer:
      "Right now, Tavynq captures the lead and details automatically, then notifies you right away so you can follow up and close the job yourself. Auto-booking directly into your calendar is something we can build for you down the road if you want it.",
  },
  {
    question: "How much does this cost?",
    answer: (
      <>
        $500 one-time setup, then $199/month. No long-term contract — see our{" "}
        <CancellationLink />. Most businesses cover the cost with a single job they
        would've otherwise lost to a missed call.
      </>
    ),
  },
  {
    question: "How long does setup take?",
    answer:
      "Most businesses are up and running within a day or two. We handle the technical setup — you don't need to do anything on your end besides forwarding your calls.",
  },
  {
    question: "Can I cancel anytime?",
    answer: (
      <>
        Yes, anytime — no contracts and no penalty. See our full <CancellationLink />{" "}
        for details.
      </>
    ),
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="mx-auto max-w-screen-xl px-4 py-20 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          FAQ
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Quick answers to what business owners ask us most.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-gray-900"
            >
              <button
                type="button"
                id={`faq-question-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left text-base font-medium text-gray-900 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600 dark:text-white dark:hover:text-blue-400"
              >
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 shrink-0 text-blue-600 transition-transform duration-300 dark:text-blue-400 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div
                  className={`overflow-hidden transition-[visibility] duration-300 ${
                    isOpen ? "visible" : "invisible"
                  }`}
                >
                  <p className="px-6 pb-5 leading-relaxed text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
