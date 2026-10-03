import { Link } from "react-router-dom"
import { BookCallLink } from "@/components/book-call-link"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"

export function FinalCta() {
  return (
    <Section id="book" labelledBy="book-heading" className="pt-8 md:pt-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white px-6 py-16 text-center shadow-[0_1px_2px_rgb(0_0_0/0.04),0_24px_60px_-28px_rgb(37_99_235/0.35)] md:px-12 md:py-20 dark:border-white/[0.08] dark:bg-gray-900 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.05),0_24px_70px_-28px_rgb(59_130_246/0.4)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_90%_at_50%_120%,rgba(37,99,235,0.14),transparent)] dark:bg-[radial-gradient(ellipse_60%_90%_at_50%_120%,rgba(37,99,235,0.3),transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          />
          <div className="relative">
            <h2
              id="book-heading"
              className="text-3xl font-semibold tracking-tight text-balance text-gray-900 md:text-[2.75rem] md:leading-[1.1] dark:text-white"
            >
              Is your metro still open?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-300">
              We work with one MSP per metro. Book a call and we'll check yours, show you the
              kinds of signals we'd target, and tell you honestly whether it's a fit.
            </p>
            <BookCallLink className="mt-8" />
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              Prefer to write?{" "}
              <Link
                to="/contact"
                className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
              >
                Send us a message
              </Link>
              .
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
