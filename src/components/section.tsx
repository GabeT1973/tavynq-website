import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// Shared wrapper so every homepage section uses the same width, gutters, and vertical rhythm.
export function Section({
  id,
  labelledBy,
  label,
  className,
  children,
}: {
  id?: string
  labelledBy?: string
  label?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn("mx-auto max-w-screen-xl px-4 py-20 md:px-8 md:py-28", className)}
    >
      {children}
    </section>
  )
}
