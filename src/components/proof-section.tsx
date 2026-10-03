import { MailCheck } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"

export function ProofSection() {
  return (
    <Section label="Proof" className="py-12 md:py-16">
      <Reveal className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-to-b from-white to-gray-50 px-6 py-12 text-center shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_40px_-20px_rgb(0_0_0/0.12)] dark:border-white/[0.07] dark:from-gray-900 dark:to-gray-950 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          />
          <MailCheck aria-hidden="true" className="mx-auto h-7 w-7 text-blue-600 dark:text-blue-400" />
          <p className="mx-auto mt-5 max-w-xl text-xl font-medium tracking-tight text-balance text-gray-900 md:text-2xl dark:text-white">
            If you found us through a cold email, you've already seen the system work.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
