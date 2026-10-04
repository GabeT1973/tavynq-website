import mark28png from "@/assets/brand/tavynq-mark-28.png"
import mark28webp from "@/assets/brand/tavynq-mark-28.webp"
import mark56png from "@/assets/brand/tavynq-mark-56.png"
import mark56webp from "@/assets/brand/tavynq-mark-56.webp"
import mark84png from "@/assets/brand/tavynq-mark-84.png"
import mark84webp from "@/assets/brand/tavynq-mark-84.webp"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

// Generated from src/assets/brand/tavynq-logo-master.png by scripts/generate-brand-assets.mjs.
const MARK_WIDTH = 33
const MARK_HEIGHT = 28

// Logo mark + wordmark. The mark is decorative (the wordmark text already says "Tavynq").
// The wordmark keeps its sheen (.wordmark in index.css); in dark mode the mark gets a soft blue
// glow and is brightened a little so the dark metal reads on the near-black header; in light
// mode it stays clean on white.
export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <picture className="shrink-0">
        <source type="image/webp" srcSet={`${mark28webp} 1x, ${mark56webp} 2x, ${mark84webp} 3x`} />
        <img
          src={mark28png}
          srcSet={`${mark28png} 1x, ${mark56png} 2x, ${mark84png} 3x`}
          width={MARK_WIDTH}
          height={MARK_HEIGHT}
          alt=""
          decoding="async"
          className={cn(
            "block h-7 w-auto dark:[filter:brightness(1.35)_saturate(1.1)_drop-shadow(0_0_5px_rgb(59_130_246/0.75))]",
            markClassName,
          )}
        />
      </picture>
      <span className={cn("wordmark text-xl font-semibold tracking-tight", className)}>
        {site.name}
      </span>
    </span>
  )
}
