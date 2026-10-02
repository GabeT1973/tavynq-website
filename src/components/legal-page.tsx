import type { ReactNode } from "react"

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: ReactNode
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Last updated: {lastUpdated}</p>
      <div className="mt-10 space-y-8 text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-medium text-gray-900 dark:text-white">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed">{children}</div>
    </section>
  )
}

export function LegalEmailLink({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className="underline underline-offset-2">
      {email}
    </a>
  )
}
