import { ArrowRight } from "lucide-react"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

// Button styles with hover, press, and focus states. Focus rings come from :focus-visible in
// index.css so they look the same everywhere.
export const pillPrimary =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.12),0_8px_20px_-8px_rgb(37_99_235/0.6)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-blue-500 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_1px_2px_rgb(0_0_0/0.12),0_12px_28px_-8px_rgb(37_99_235/0.75)] active:translate-y-px active:bg-blue-700 active:shadow-[inset_0_1px_2px_rgb(0_0_0/0.2)] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"

export const pillSecondary =
  "group inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/70 font-semibold text-gray-900 shadow-sm backdrop-blur transition-[background-color,border-color,color,transform] duration-200 ease-out hover:border-blue-600/40 hover:text-blue-600 active:translate-y-px dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-blue-400/40 dark:hover:text-blue-400 motion-reduce:transition-none"

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
        size === "lg" ? "px-6 py-3 text-sm" : "px-4 py-2 text-sm",
        className,
      )}
    >
      {label}
      {size === "lg" && (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      )}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
