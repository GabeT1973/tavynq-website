import { Check, CircleCheck, RefreshCw, SlidersHorizontal } from "lucide-react"
import { BookCallLink } from "@/components/book-call-link"
import { cardBase } from "@/components/card"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { SectionHeading } from "@/components/section-heading"
import { formatUsd, site } from "@/config/site"
import { cn } from "@/lib/utils"

type Plan = (typeof site.pricing.plans)[number]

// The founding plan stops being promoted once all its spots are taken (config flag).
function isFilled(plan: Plan) {
  return plan.founding && site.pricing.foundingSpotsFilled
}

function PlanBody({ plan }: { plan: Plan }) {
  const filled = isFilled(plan)
  const features = [...plan.perks, ...site.pricing.included]

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
          {plan.note && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{plan.note}</p>
          )}
        </div>
        {filled ? (
          <span className="rounded-full border border-black/10 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-300">
            Founding spots filled
          </span>
        ) : (
          plan.badge && (
            <span className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_4px_12px_-4px_rgb(37_99_235/0.6)]">
              {plan.badge}
            </span>
          )
        )}
      </div>
      <p className="mt-8 flex items-baseline gap-1.5">
        <span className="text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
          {formatUsd(plan.monthlyPrice)}
        </span>
        <span className="text-base text-gray-600 dark:text-gray-400">/month</span>
      </p>
      <ul className="mt-6 space-y-3 border-t border-black/[0.06] pt-6 dark:border-white/[0.07]">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex gap-2.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
          >
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
            />
            {feature}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{plan.terms}</p>
    </>
  )
}

export function PricingSection() {
  return (
    <Section id="pricing" labelledBy="pricing-heading">
      <SectionHeading
        id="pricing-heading"
        eyebrow="Pricing"
        title="One flat monthly rate"
        description={`No setup fee. Start with ${site.initialTermDays} days, then go month-to-month.`}
      />

      <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-6 md:mt-16 md:grid-cols-2">
        {site.pricing.plans.map((plan, index) => (
          <Reveal key={plan.name} delay={index * 100} className="h-full">
            {plan.highlight && !isFilled(plan) ? (
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
        <div className={cn(cardBase, "flex gap-4 p-6 md:p-7")}>
          <SlidersHorizontal
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Tailored plans</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {site.pricing.tailoredNote}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-6 max-w-4xl">
        <div className="rounded-2xl border border-blue-600/15 bg-blue-50/60 p-8 dark:border-blue-400/15 dark:bg-blue-500/[0.07]">
          <h3 id="qualified-call" className="text-lg font-semibold text-gray-900 dark:text-white">
            What counts as a qualified call
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Every call we book is aimed at all of these:
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
          <p className="mt-6 flex gap-2.5 border-t border-blue-600/10 pt-6 text-sm font-medium text-gray-900 dark:border-blue-400/10 dark:text-white">
            <RefreshCw
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
            />
            <span>
              If a call misses any of these, or you flag it as a bad fit within{" "}
              {site.badFitWindowHours} hours, we replace it at no extra cost.
            </span>
          </p>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
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
