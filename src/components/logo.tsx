import { useEffect, useState } from "react"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

// Vector mark recreated from src/assets/brand/signalfill-logo-master.png (no vector source
// existed - paths were traced/measured from that raster; see git history around 2026-10-10
// for the process). Animations in src/index.css: a bright light travels around each shape's
// own outline (two independent loops - the ribbon and panel don't touch, so one shared loop
// would have to jump across that gap), a slower breathing pulse underneath, and a dark sweep
// along the heartbeat line. The static navy fill + pale heartbeat line are the "clean" layers
// with no baked glow; the blue outline and heartbeat sweep are both animation-only, never
// visible at rest.
const RIBBON_PATH =
  "M 370.742 49.374 C 358.051 64.074, 339.399 72.687, 307.428 78.610 C 305.818 78.909, 300.225 79.780, 295 80.547 C 267.854 84.530, 233.116 92.418, 222.500 97.009 C 221.400 97.485, 219.375 98.171, 218 98.533 C 216.625 98.896, 208.668 102.526, 200.317 106.600 C 169.425 121.670, 146.879 143.664, 138.248 167.150 L 135.546 174.500 135.228 223.371 L 134.910 272.242 144.205 271.807 C 156.383 271.236, 165.752 268.025, 179.500 259.710 C 180.600 259.044, 181.725 258.269, 182 257.986 C 182.275 257.704, 184.913 255.482, 187.862 253.049 C 190.811 250.617, 198.324 242.266, 204.557 234.492 C 226.545 207.071, 246.023 193.015, 273 185.101 C 285.585 181.409, 286.137 181.264, 298 178.536 C 344.341 167.879, 366.194 152.605, 374.780 124.869 C 376.610 118.960, 377.912 46.512, 376.219 44.819 C 375.763 44.363, 373.299 46.413, 370.742 49.374 Z"

const PANEL_PATH =
  "M 358 227.579 C 349.475 231.156, 341.600 234.476, 340.500 234.958 C 339.400 235.440, 335.350 237.187, 331.500 238.840 C 327.650 240.492, 320.450 243.657, 315.500 245.871 C 310.550 248.086, 303.238 251.271, 299.250 252.949 C 283.095 259.748, 278.254 261.824, 273 264.209 C 269.975 265.581, 263 268.631, 257.500 270.986 C 242.894 277.238, 236.700 279.969, 234.929 280.935 C 234.066 281.407, 230.241 283.017, 226.429 284.514 C 222.618 286.010, 216.197 288.757, 212.161 290.617 C 208.124 292.478, 204.481 294, 204.065 294 C 203.648 294, 202.001 294.646, 200.404 295.436 C 196.601 297.316, 156.075 315, 155.568 315 C 155.354 315, 151.876 316.499, 147.839 318.331 C 143.803 320.163, 139.262 322.178, 137.750 322.809 L 135 323.957 135 390.420 C 135 439.489, 135.301 457.068, 136.152 457.594 C 137.486 458.418, 374.772 458.259, 376.109 457.433 C 376.622 457.115, 377 406.886, 377 338.941 C 377 227.268, 376.907 221.002, 375.250 221.038 C 374.288 221.059, 366.525 224.003, 358 227.579 Z"

const HEARTBEAT_PATH = "M 193,371 L 222,371 L 240,332 L 267,400 L 285,371 L 346,371"

const RIBBON_DASH = "86 633.4"
const PANEL_DASH = "104 766.1"

function useTabHiddenClass() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    function onVisibility() {
      setHidden(document.hidden)
    }
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])
  return hidden
}

function Mark({ className }: { className?: string }) {
  const hidden = useTabHiddenClass()

  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      className={cn(
        "block w-auto shrink-0 [filter:drop-shadow(0_0_3px_rgb(59_130_246/0.18))] dark:[filter:brightness(1.3)_saturate(1.1)_drop-shadow(0_0_4px_rgb(59_130_246/0.7))_drop-shadow(0_0_9px_rgb(59_130_246/0.35))]",
        hidden && "logo-anim-paused",
        className,
      )}
    >
      <path d={RIBBON_PATH} fill="#002050" />
      <path d={PANEL_PATH} fill="#002050" />

      {/* Slow breathing glow: a soft blurred stroke around both shapes, opacity only. */}
      <g className="logo-glow-breathe" opacity={0.6}>
        <path d={RIBBON_PATH} fill="none" stroke="#3b82f6" strokeWidth={10} style={{ filter: "blur(4px)" }} />
        <path d={PANEL_PATH} fill="none" stroke="#3b82f6" strokeWidth={10} style={{ filter: "blur(4px)" }} />
      </g>

      {/* Brighter light traveling around each shape's own outline - independent loops so
          there's never a jump across the gap between the two shapes. */}
      <path
        className="logo-ring-ribbon"
        d={RIBBON_PATH}
        fill="none"
        stroke="#7cb8ff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={RIBBON_DASH}
      />
      <path
        className="logo-ring-panel"
        d={PANEL_PATH}
        fill="none"
        stroke="#7cb8ff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={PANEL_DASH}
      />

      {/* Heartbeat: static pale line, plus a dark sweep (edge + core) traveling left to right. */}
      <path
        d={HEARTBEAT_PATH}
        fill="none"
        stroke="#d9f5ff"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="logo-heartbeat-edge"
        d={HEARTBEAT_PATH}
        fill="none"
        stroke="#eafcff"
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="55 1000"
        opacity={0.55}
      />
      <path
        className="logo-heartbeat-core"
        d={HEARTBEAT_PATH}
        fill="none"
        stroke="#000"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="55 1000"
      />
    </svg>
  )
}

// Logo mark + wordmark. The mark is decorative (the wordmark text already says "SignalFill").
// The wordmark keeps its sheen (.wordmark in index.css), untouched by this file.
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
    <span className="inline-flex items-center gap-2.5">
      <Mark className={cn(size === "default" ? "h-[34px] md:h-10" : "h-[34px]", markClassName)} />
      <span className={cn("wordmark text-2xl font-semibold tracking-tight", className)}>
        {site.name}
      </span>
    </span>
  )
}
