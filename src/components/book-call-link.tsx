import { ArrowRight } from "lucide-react"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

export const pillPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"

export const pillSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/60 font-semibold text-gray-900 backdrop-blur transition-colors hover:border-blue-600/40 hover:text-blue-600 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-blue-400/40 dark:hover:text-blue-400"

// The site's main call to action: opens the Calendly booking page in a new tab.
export function BookCallLink({
  size = "lg",
  label = "Book a call",
  className,
}: {
  size?: "sm" | "lg"
  label?: string
  className?: string
}) {
  return (
    <a
      href={site.calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        pillPrimary,
        size === "lg" ? "px-6 py-3 text-sm" : "px-5 py-2.5 text-sm",
        className,
      )}
    >
      {label}
      {size === "lg" && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
