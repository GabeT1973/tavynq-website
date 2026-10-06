import mark28png from "@/assets/brand/signalfill-mark-28.png"
import mark28webp from "@/assets/brand/signalfill-mark-28.webp"
import mark56png from "@/assets/brand/signalfill-mark-56.png"
import mark56webp from "@/assets/brand/signalfill-mark-56.webp"
import mark84png from "@/assets/brand/signalfill-mark-84.png"
import mark84webp from "@/assets/brand/signalfill-mark-84.webp"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

// Generated from src/assets/brand/signalfill-logo-master.png by scripts/generate-brand-assets.mjs.
const MARK_WIDTH = 28
const MARK_HEIGHT = 28

// Logo mark + wordmark. The mark is decorative (the wordmark text already says "SignalFill").
// The wordmark keeps its sheen (.wordmark in index.css). The glow behind the mark is CSS only
// (drop-shadow), never baked into the image: a gentle blue halo in dark mode so the mark pops
// off the near-black header, and a much fainter version in light mode so it doesn't read muddy
// on white. `size="small"` (footer, mobile) scales the glow down to match the smaller mark.
export function Logo({
  className,
  markClassName,
  size = "default",
}: {
  className?: string
  markClassName?: string
  size?: "default" | "small"
}) {
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
            "block h-7 w-auto",
            size === "default"
              ? "[filter:drop-shadow(0_0_3px_rgb(59_130_246/0.18))] dark:[filter:brightness(1.3)_saturate(1.1)_drop-shadow(0_0_4px_rgb(59_130_246/0.7))_drop-shadow(0_0_9px_rgb(59_130_246/0.35))]"
              : "[filter:drop-shadow(0_0_2px_rgb(59_130_246/0.15))] dark:[filter:brightness(1.3)_saturate(1.1)_drop-shadow(0_0_3px_rgb(59_130_246/0.65))_drop-shadow(0_0_7px_rgb(59_130_246/0.3))]",
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
