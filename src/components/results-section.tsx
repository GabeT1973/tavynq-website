import { SectionHeading } from "@/components/section-heading"

// Real client results ONLY. No made-up numbers, quotes, or logos.
// Add an entry once a client has agreed to be featured, then un-comment
// <ResultsSection /> in src/pages/home.tsx.
type Result = {
  client: string // e.g. "Acme IT" (with permission) or "A 15-person MSP in Ohio"
  outcome: string // a real, verifiable result in plain words
  detail?: string // optional one- or two-sentence summary
}

const results: Result[] = []

export function ResultsSection() {
  if (results.length === 0) return null

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="mx-auto max-w-screen-xl px-4 py-20 md:px-8"
    >
      <SectionHeading id="results-heading" eyebrow="Results" title="What clients have seen" />
      <ul className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {results.map((result) => (
          <li
            key={result.client}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-gray-900"
          >
            <p className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {result.outcome}
            </p>
            <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
              {result.client}
            </p>
            {result.detail && (
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {result.detail}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
