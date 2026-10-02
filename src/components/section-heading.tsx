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
        <p className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl"
      >
        {title}
      </h2>
      {description && <p className="mt-3 text-gray-600 dark:text-gray-300">{description}</p>}
    </Reveal>
  )
}
