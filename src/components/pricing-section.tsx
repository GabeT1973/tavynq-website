import { CircleCheck, ShieldCheck } from "lucide-react"
import { BookCallLink } from "@/components/book-call-link"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { formatUsd, site } from "@/config/site"
import { cn } from "@/lib/utils"

export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="mx-auto max-w-screen-xl px-4 py-20 md:px-8"
    >
      <SectionHeading
        id="pricing-heading"
        eyebrow="Pricing"
        title="Pay for calls, not promises"
        description="One setup fee, then you only pay for qualified calls that actually happen. No monthly retainer."
      />

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        {site.pricing.plans.map((plan, index) => {
          const featured = plan.badge !== null

          return (
            <Reveal key={plan.name} delay={index * 100} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-white p-8 shadow-sm dark:bg-gray-900",
                  featured
                    ? "border-blue-600/40 ring-1 ring-blue-600/20 dark:border-blue-400/40 dark:ring-blue-400/20"
                    : "border-black/5 dark:border-white/5",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                  {plan.badge && (
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <dl className="mt-6 space-y-4">
                  <div>
                    <dt className="text-sm text-gray-600 dark:text-gray-400">Per qualified call</dt>
                    <dd className="mt-1 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {formatUsd(plan.perQualifiedCall)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 dark:text-gray-400">One-time setup</dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {formatUsd(plan.setupFee)}
                    </dd>
                  </div>
                </dl>
                <p className="mt-5 flex gap-2 text-sm font-medium text-gray-900 dark:text-white">
                  <ShieldCheck
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
                  />
                  No-shows are never billed, and neither are calls you flag as a bad fit.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {plan.terms}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal className="mx-auto mt-6 max-w-4xl">
        <div className="rounded-2xl border border-blue-600/20 bg-blue-50/60 p-8 dark:border-blue-400/20 dark:bg-blue-500/10">
          <h3 id="qualified-call" className="text-lg font-medium text-gray-900 dark:text-white">
            What counts as a qualified call
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            You're only billed for a call when all of these are true:
          </p>
          <ul className="mt-4 space-y-3">
            {site.qualifiedCall.map((rule) => (
              <li
                key={rule}
                className="flex gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
              >
                <CircleCheck
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                />
                {rule}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-blue-600/10 pt-6 text-sm text-gray-700 dark:border-blue-400/10 dark:text-gray-300">
            The full definition and bad-fit criteria go in your agreement, in writing, before
            anything launches.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 text-center">
        <BookCallLink />
      </div>
    </section>
  )
}
