import { MailCheck } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function ProofSection() {
  return (
    <section aria-label="Proof" className="mx-auto max-w-screen-xl px-4 py-12 md:px-8">
      <Reveal className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-black/5 bg-gradient-to-tr from-zinc-300/20 via-gray-400/10 to-transparent px-6 py-10 text-center dark:border-white/5 dark:from-zinc-300/5 dark:via-gray-400/5">
          <MailCheck aria-hidden="true" className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          <p className="text-xl font-medium tracking-tight text-balance text-gray-900 md:text-2xl dark:text-white">
            If you found us through a cold email, you've already seen the system work.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
