import { Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-screen-xl px-4 py-20 text-center md:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Get in Touch
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-600 dark:text-gray-300">
          Ready to stop losing jobs to missed calls? Reach out and we'll walk you through
          how Tavynq works for your business.
        </p>
        <a
          href="mailto:hello@tavynq.com"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-input bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent px-6 py-3 text-sm font-medium text-gray-900 transition-all hover:from-zinc-300/30 hover:via-purple-400/40 dark:from-zinc-300/5 dark:via-purple-400/20 dark:text-white dark:hover:via-purple-400/30"
        >
          <Mail className="h-4 w-4" />
          hello@tavynq.com
        </a>
      </div>
    </section>
  )
}
