import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-screen-xl px-4 py-20 text-center md:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Get in Touch
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
          Ready to stop losing jobs to missed calls? Reach out and we'll walk you through
          how Tavynq works for your business, including a live demo of the missed-call
          text-back in action.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
        >
          Contact Us
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
