import { useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { site } from "@/config/site"

const linkClasses =
  "text-blue-600 underline underline-offset-2 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "How do you find businesses with a reason to talk?",
    answer:
      "Public records and public signals only: things like published email security records, job postings for in-house IT roles, new office announcements, and visible headcount growth. We never scan, probe, or test anyone's systems.",
  },
  {
    question: "Do you email from my domain?",
    answer:
      "No. We send from separate domains and inboxes we set up and warm up for you, so your main domain's reputation is never at risk. You approve every message before it's sent, and if you leave, the domains are yours.",
  },
  {
    question: "What's in the Meeting Brief?",
    answer:
      "A one-page summary you get before every call: company size, email provider, any gaps in their public email security records, the signal that triggered our outreach, their exact reply, and suggested opening questions.",
  },
  {
    question: "What counts as a qualified call?",
    answer: (
      <>
        A business that fits the ideal client profile we agree on in writing, a
        decision-maker on the call (or one they bring), a call they booked themselves, and
        they actually show up. See the{" "}
        <a href="#qualified-call" className={linkClasses}>
          full checklist
        </a>
        .
      </>
    ),
  },
  {
    question: "What happens if a call is a bad fit?",
    answer: `You have ${site.badFitWindowHours} hours after the call to flag it as a bad fit against our written criteria. Flagged calls aren't billed, and neither are no-shows. We also use the feedback to tighten targeting.`,
  },
  {
    question: "Do you work with other MSPs in my area?",
    answer:
      "No. We work with one MSP per metro and never with your local competitor.",
  },
  {
    question: "How long until calls start?",
    answer:
      "Usually about 3–4 weeks. Most of that is the 14-day inbox warmup, which protects deliverability. Once campaigns go live, calls start booking as replies come in.",
  },
  {
    question: "Is there a contract?",
    answer:
      "No long-term contract. Setup is a one-time fee, then you're billed per qualified call. Either side can stop with 14 days' notice, and you keep the domains, lists, and copy.",
  },
  {
    question: "Will anyone cold call prospects in my name?",
    answer:
      "Never. It's email only, no cold callers. The only calls on your calendar are ones prospects booked themselves after replying.",
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto max-w-screen-xl px-4 py-20 md:px-8"
    >
      <SectionHeading
        id="faq-heading"
        eyebrow="FAQ"
        title="Questions, answered"
        description="What MSP owners usually ask before booking a call."
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/5 dark:bg-gray-900"
            >
              <h3>
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left text-base font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                >
                  {faq.question}
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-blue-600 transition-transform duration-300 motion-reduce:transition-none dark:text-blue-400 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
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
