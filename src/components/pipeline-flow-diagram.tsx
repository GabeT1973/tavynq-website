import { CalendarCheck, MessageSquareReply, PenLine, Radar } from "lucide-react"
import { cardBase, cardHover, iconChip } from "@/components/card"
import { cn } from "@/lib/utils"

type Node = {
  id: "1" | "2" | "3" | "4"
  title: string
  description: string
  icon: typeof Radar
}

const nodes: Node[] = [
  {
    id: "1",
    title: "Find signals",
    description: "Local businesses with a real reason to talk.",
    icon: Radar,
  },
  {
    id: "2",
    title: "Personalized outreach",
    description: "Short emails you approve.",
    icon: PenLine,
  },
  {
    id: "3",
    title: "Fast follow-up",
    description: "Replies answered within minutes.",
    icon: MessageSquareReply,
  },
  {
    id: "4",
    title: "Qualified call + Meeting Brief",
    description: "Booked on your calendar, brief included.",
    icon: CalendarCheck,
  },
]

const arrowLabels = {
  a: "Targeted",
  b: "Interested reply",
  c: "Ready now",
  d: "Booked",
  e: "Results sharpen targeting",
} as const

const n = (id: Node["id"]) => nodes.find((node) => node.id === id)!

// Shared marker, reused by both layouts' <defs>.
function ArrowheadDef({ id }: { id: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M0,0 L10,5 L0,10 z" className="fill-gray-400 dark:fill-gray-500" />
    </marker>
  )
}

// One dashed, flowing, glowing connector. Animates even with prefers-reduced-motion (owner
// exception, same as the hero grid); the box pulses below do respect it. `vectorEffect` keeps
// the stroke width constant even though the viewBox is stretched non-uniformly to fill its box.
function FlowPath({
  d,
  markerId,
  dashArray = "7 7",
}: {
  d: string
  markerId: string
  dashArray?: string
}) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeDasharray={dashArray}
      pathLength={100}
      vectorEffect="non-scaling-stroke"
      markerEnd={`url(#${markerId})`}
      className="flow-dash stroke-gray-300 [filter:drop-shadow(0_0_2px_var(--flow-glow))] dark:stroke-gray-600"
    />
  )
}

function FlowBox({
  node,
  pulseDelay,
  className,
}: {
  node: Node
  pulseDelay: string
  className?: string
}) {
  return (
    <div
      style={{ animationDelay: pulseDelay }}
      className={cn(
        cardBase,
        cardHover,
        "flow-pulse relative flex flex-col gap-2 p-4 text-left sm:p-5",
        className,
      )}
    >
      <div className={cn(iconChip, "h-9 w-9 sm:h-10 sm:w-10")}>
        <node.icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <h3 className="text-sm font-medium text-gray-900 sm:text-base dark:text-white">
        {node.title}
      </h3>
      <p className="text-xs leading-relaxed text-gray-600 sm:text-sm dark:text-gray-300">
        {node.description}
      </p>
    </div>
  )
}

// `wrap`: the two mobile side-curve labels ("Ready now", "Results sharpen targeting") sit in a
// narrow gutter beside the box stack, with no room for a single nowrap line at small widths -
// they wrap onto up to 2 lines instead. Every other label has room to stay on one line.
function ArrowLabel({
  className,
  children,
  wrap = false,
}: {
  className: string
  children: string
  wrap?: boolean
}) {
  return (
    <span
      className={cn(
        "absolute z-10 rounded-full border border-black/[0.06] bg-white/95 px-2 py-0.5 text-center text-[11px] font-medium leading-tight text-gray-500 shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-gray-950/90 dark:text-gray-400",
        wrap ? "w-[60px]" : "whitespace-nowrap",
        className,
      )}
    >
      {children}
    </span>
  )
}

export function PipelineFlowDiagram() {
  return (
    <section
      aria-label="How the SignalFill pipeline flows, from signal to booked call and back"
      className="mx-auto mt-4 max-w-5xl"
    >
      {/* Desktop / tablet: 1 top-center, 2/3/4 in a row, curved returns above and below.
          Boxes are positioned absolutely, so this wrapper needs an explicit shape to size
          against; the SVG below is authored in plain 0-100 percentage coordinates
          (preserveAspectRatio="none") so it always lines up with the percentage-positioned
          boxes regardless of the wrapper's actual rendered width. */}
      <div className="relative hidden md:block" style={{ aspectRatio: "1000 / 560" }}>
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <ArrowheadDef id="flow-arrow-desktop" />
          </defs>
          {/* a: 1 -> 2, curved top-left */}
          <FlowPath markerId="flow-arrow-desktop" d="M 41,30.4 C 30,35.9 20,40.2 15.5,51.1" />
          {/* b: 2 -> 3, straight */}
          <FlowPath markerId="flow-arrow-desktop" d="M 26.5,65.2 L 38.5,65.2" dashArray="1.8 1.8" />
          {/* d: 3 -> 4, straight */}
          <FlowPath markerId="flow-arrow-desktop" d="M 61.5,65.2 L 73.5,65.2" dashArray="1.8 1.8" />
          {/* c: 2 -> 4, curved underneath, bypassing 3 */}
          <FlowPath markerId="flow-arrow-desktop" d="M 15,79.3 C 34,96.7 66,96.7 85,79.3" dashArray="2 2.6" />
          {/* e: 4 -> 1, curved top-right, loops back */}
          <FlowPath markerId="flow-arrow-desktop" d="M 89.5,51.1 C 95.5,25 76,9.8 61.5,20.7" />
        </svg>

        <FlowBox node={n("1")} pulseDelay="0s" className="absolute left-[39%] top-[4.3%] w-[22%]" />
        <FlowBox node={n("2")} pulseDelay="1.5s" className="absolute left-[4%] top-[52.2%] w-[22%]" />
        <FlowBox node={n("3")} pulseDelay="3s" className="absolute left-[39%] top-[52.2%] w-[22%]" />
        <FlowBox node={n("4")} pulseDelay="4.5s" className="absolute left-[74%] top-[52.2%] w-[22%]" />

        <ArrowLabel className="left-[19%] top-[37%]">{arrowLabels.a}</ArrowLabel>
        <ArrowLabel className="left-[32.5%] top-[61.5%] -translate-x-1/2">{arrowLabels.b}</ArrowLabel>
        <ArrowLabel className="left-1/2 top-[94.5%] -translate-x-1/2">{arrowLabels.c}</ArrowLabel>
        <ArrowLabel className="left-[67.5%] top-[61.5%] -translate-x-1/2">{arrowLabels.d}</ArrowLabel>
        <ArrowLabel className="left-[78%] top-[34%]">{arrowLabels.e}</ArrowLabel>
      </div>

      {/* Mobile: a plain vertical stack (real flex flow, so box heights are never guessed),
          with "e" curving back up the right side and "c" bypassing down the left, drawn as a
          decorative overlay sized to whatever height the stack actually ends up being. The
          stack width and the curve/label positions are both percentages of the SAME outer
          container, so the gutter they share stays proportionally correct at every width
          instead of a fixed-px stack width leaving a gutter too narrow at small screens. */}
      <div className="relative md:hidden">
        <div className="mx-auto flex w-[58%] min-w-[168px] flex-col items-stretch">
          <FlowBox node={n("1")} pulseDelay="0s" />
          <MobileConnector label={arrowLabels.a} />
          <FlowBox node={n("2")} pulseDelay="1.5s" />
          <MobileConnector label={arrowLabels.b} />
          <FlowBox node={n("3")} pulseDelay="3s" />
          <MobileConnector label={arrowLabels.d} />
          <FlowBox node={n("4")} pulseDelay="4.5s" />
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <ArrowheadDef id="flow-arrow-mobile" />
          </defs>
          {/* c: 2 -> 4, curved bypass down the left side (box2 starts ~26%, box4 ends ~100%) */}
          <FlowPath markerId="flow-arrow-mobile" d="M 10.5,30 C 2,55 2,78 10.5,92" dashArray="2 2.6" />
          {/* e: 4 -> 1, curved return up the right side */}
          <FlowPath markerId="flow-arrow-mobile" d="M 89.5,92 C 98,55 98,22 89.5,6" />
        </svg>

        <ArrowLabel wrap className="left-[10.5%] top-[58%] -translate-x-1/2 -translate-y-1/2">
          {arrowLabels.c}
        </ArrowLabel>
        <ArrowLabel wrap className="left-[89.5%] top-[50%] -translate-x-1/2 -translate-y-1/2">
          {arrowLabels.e}
        </ArrowLabel>
      </div>
    </section>
  )
}

// A short straight connector between two stacked mobile boxes: a small dashed vertical arrow
// with its label beside it. Real flow layout (not absolutely positioned), so it can never
// overlap the boxes above or below it.
function MobileConnector({ label }: { label: string }) {
  return (
    <div className="relative flex h-14 items-center justify-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 10 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <ArrowheadDef id={`flow-arrow-mobile-connector-${label}`} />
        </defs>
        <FlowPath
          markerId={`flow-arrow-mobile-connector-${label}`}
          d="M 5,2 L 5,92"
          dashArray="6 6"
        />
      </svg>
      <ArrowLabel className="static">{label}</ArrowLabel>
    </div>
  )
}
