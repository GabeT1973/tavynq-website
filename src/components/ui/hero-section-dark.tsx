import * as React from "react"
import { cn } from "@/lib/utils"

interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string
  title: {
    regular: string
    gradient: string
    end?: string
  }
  description?: string
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
        // Fade the grid out toward every edge so it reads as depth, not a pattern.
        "[mask-image:radial-gradient(ellipse_70%_60%_at_50%_75%,#000_30%,transparent_100%)]",
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid motion-reduce:animate-none will-change-transform [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-90%" />
    </div>
  )
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ className, eyebrow, title, description, gridOptions, children, ...props }, ref) => {
    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        {/* Glow + tint are sized to the hero and fade out at the bottom, so there's no hard edge. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[0] bg-blue-950/10 bg-[radial-gradient(ellipse_30%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)] dark:bg-[radial-gradient(ellipse_30%_80%_at_50%_-20%,rgba(37,99,235,0.3),rgba(255,255,255,0))]"
        />
        <section className="relative max-w-full mx-auto z-1">
          <RetroGrid {...gridOptions} />
          <div className="relative max-w-screen-xl z-10 mx-auto px-4 pt-16 pb-24 md:px-8 md:pt-28 md:pb-32">
            <div className="mx-auto max-w-4xl text-center">
              {eyebrow && (
                <p className="mx-auto w-fit rounded-full border border-black/[0.06] bg-gradient-to-tr from-zinc-300/20 via-gray-400/20 to-transparent px-4 py-1.5 text-sm text-gray-600 shadow-[inset_0_1px_0_rgb(255_255_255/0.6)] dark:border-white/[0.08] dark:from-zinc-300/5 dark:via-gray-400/5 dark:text-gray-400 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]">
                  {eyebrow}
                </p>
              )}
              <h1 className="mx-auto mt-6 text-[2.5rem] leading-[1.08] tracking-tighter bg-clip-text text-transparent text-balance sm:text-5xl md:text-[4rem] bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
                {title.regular && <>{title.regular} </>}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300">
                  {title.gradient}
                </span>
                {title.end && <> {title.end}</>}
              </h1>
              {description && (
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
                  {description}
                </p>
              )}
              {children && <div className="mt-8 space-y-5">{children}</div>}
            </div>
          </div>
        </section>
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection }
