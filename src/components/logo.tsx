import { site } from "@/config/site"
import { cn } from "@/lib/utils"

// The Tavynq wordmark: live text (crisp at any size) with a soft sheen across it.
// The sheen sweeps across on hover of the surrounding link; see .wordmark in index.css.
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("wordmark text-xl font-semibold tracking-tight", className)}>
      {site.name}
    </span>
  )
}
