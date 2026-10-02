import { Link } from "react-router-dom"
import { BookCallLink } from "@/components/book-call-link"
import { Reveal } from "@/components/reveal"

export function FinalCta() {
  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      className="relative overflow-hidden border-t border-black/5 dark:border-white/5"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_120%,rgba(37,99,235,0.12),transparent)] dark:bg-[radial-gradient(ellipse_50%_80%_at_50%_120%,rgba(37,99,235,0.25),transparent)]"
      />
      <Reveal className="relative mx-auto max-w-screen-xl px-4 py-24 text-center md:px-8">
        <h2
          id="book-heading"
          className="text-3xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white md:text-4xl"
        >
          Ready to stop waiting on referrals?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
          Book a call. We'll look at your market, show you who we'd target, and tell you
          honestly whether the system is a fit.
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
      </Reveal>
    </section>
  )
}
