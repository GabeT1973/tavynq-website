import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-3 text-3xl font-semibold tracking-tight text-balance text-gray-900 md:text-[2.75rem] md:leading-[1.1] dark:text-white"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-300">
          {description}
        </p>
      )}
    </Reveal>
  )
}
