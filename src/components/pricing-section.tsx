import { CircleCheck, ShieldCheck } from "lucide-react"
import { BookCallLink } from "@/components/book-call-link"
import { cardBase } from "@/components/card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { SectionHeading } from "@/components/section-heading"
import { formatUsd, site } from "@/config/site"
import { cn } from "@/lib/utils"

type Plan = (typeof site.pricing.plans)[number]

function PlanBody({ plan }: { plan: Plan }) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
          {plan.note && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{plan.note}</p>
          )}
        </div>
        {plan.badge && (
          <span className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_4px_12px_-4px_rgb(37_99_235/0.6)]">
            {plan.badge}
          </span>
        )}
      </div>
      <dl className="mt-8 space-y-5">
        <div>
          <dt className="text-sm text-gray-600 dark:text-gray-400">Per qualified call</dt>
          <dd className="mt-1 text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
            {formatUsd(plan.perQualifiedCall)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600 dark:text-gray-400">One-time setup</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
            {formatUsd(plan.setupFee)}
          </dd>
        </div>
      </dl>
      <p className="mt-6 flex gap-2.5 border-t border-black/[0.06] pt-6 text-sm font-medium text-gray-900 dark:border-white/[0.07] dark:text-white">
        <ShieldCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
        No-shows are never billed, and neither are calls you flag as a bad fit.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{plan.terms}</p>
    </>
  )
}

export function PricingSection() {
  return (
    <Section id="pricing" labelledBy="pricing-heading">
      <SectionHeading
        id="pricing-heading"
        eyebrow="Pricing"
        title="Pay for calls, not promises"
        description="One setup fee, then you only pay for qualified calls that actually happen. No monthly retainer."
      />

      <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-6 md:mt-16 md:grid-cols-2">
        {site.pricing.plans.map((plan, index) => (
          <Reveal key={plan.name} delay={index * 100} className="h-full">
            {plan.badge ? (
              // Highlighted plan: gradient hairline border with a soft blue glow.
              <div className="h-full rounded-2xl bg-gradient-to-b from-blue-500 via-sky-400/50 to-blue-600/20 p-px shadow-[0_24px_64px_-24px_rgb(37_99_235/0.55)] dark:from-blue-400 dark:via-sky-300/40 dark:to-blue-500/20 dark:shadow-[0_24px_72px_-20px_rgb(59_130_246/0.45)]">
                <div className="relative h-full overflow-hidden rounded-[calc(1rem-1px)] bg-white p-8 dark:bg-gray-900">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgb(37_99_235/0.10),transparent)] dark:bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgb(59_130_246/0.18),transparent)]"
                  />
                  <div className="relative">
                    <PlanBody plan={plan} />
                  </div>
                </div>
              </div>
            ) : (
              <div className={cn(cardBase, "h-full p-8")}>
                <PlanBody plan={plan} />
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-6 max-w-4xl">
        <div className="rounded-2xl border border-blue-600/15 bg-blue-50/60 p-8 dark:border-blue-400/15 dark:bg-blue-500/[0.07]">
          <h3 id="qualified-call" className="text-lg font-semibold text-gray-900 dark:text-white">
            What counts as a qualified call
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            You're only billed for a call when all of these are true:
          </p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2 md:gap-x-8">
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

      <div className="mt-12 text-center">
        <BookCallLink />
      </div>
    </Section>
  )
}
