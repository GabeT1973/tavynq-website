import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { BookCallLink, pillPrimary } from "@/components/book-call-link"
import { site } from "@/config/site"
import { usePageMeta } from "@/lib/use-page-meta"
import { cn } from "@/lib/utils"

type FormState = {
  name: string
  email: string
  website: string
  metro: string
  question: string
}

const initialState: FormState = {
  name: "",
  email: "",
  website: "",
  metro: "",
  question: "",
}

type FormErrors = Partial<Record<keyof FormState, string>>
type Status = "idle" | "submitting" | "success" | "error"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Accepts "acme.com", "www.acme.com", or a full https:// URL.
const WEBSITE_PATTERN = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i

const inputClasses =
  "mt-2 w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition-[border-color,box-shadow] placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15 aria-[invalid=true]:border-red-500 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"

function Field({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: {
  id: keyof FormState
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-blue-600 dark:text-blue-400">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-gray-500 dark:text-gray-400"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export function Contact() {
  usePageMeta(
    `Ask a question | ${site.name}`,
    `Have a question before you book? Send it to ${site.name} and get a straight answer from the founder within 24-48 hours.`,
  )

  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus()
  }, [status])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function describedBy(key: keyof FormState, hasHint = false) {
    if (errors[key]) return `${key}-error`
    return hasHint ? `${key}-hint` : undefined
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {}

    if (!form.name.trim()) nextErrors.name = "Please enter your name."
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your work email."
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address."
    }
    if (!form.website.trim()) {
      nextErrors.website = "Please enter your company website."
    } else if (!WEBSITE_PATTERN.test(form.website.trim())) {
      nextErrors.website = "Please enter a website like yourmsp.com."
    }
    if (!form.question.trim()) nextErrors.question = "Please type your question."

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return

    setStatus("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          website: form.website.trim(),
          metro: form.metro.trim(),
          question: form.question.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || "Something went wrong. Please try again.")
      }

      setStatus("success")
      setForm(initialState)
      setErrors({})
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      )
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-8 md:py-28">
        <h1
          ref={successHeadingRef}
          tabIndex={-1}
          className="text-3xl font-semibold tracking-tight text-gray-900 focus:outline-none md:text-[2.75rem] md:leading-[1.1] dark:text-white"
        >
          Got it.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-300">
          You'll hear back within 24-48 hours. Rather talk it through now? Grab a time, and
          we'll confirm your metro is still open.
        </p>
        <BookCallLink className="mt-8" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 md:px-8 md:py-28">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.75rem] md:leading-[1.1] dark:text-white">
        Ask a question
      </h1>
      <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-300">
        Have a question before you book? Send it here. You'll get a straight answer from me,
        the founder, within 24-48 hours.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-10 space-y-6 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-16px_rgb(0_0_0/0.10)] md:p-8 dark:border-white/[0.07] dark:bg-gray-900/60 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="name" label="Name" required error={errors.name}>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={describedBy("name")}
              className={inputClasses}
            />
          </Field>
          <Field id="email" label="Work email" required error={errors.email}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("email")}
              className={inputClasses}
            />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="website" label="Company website" required error={errors.website}>
            <input
              id="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="yourmsp.com"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.website}
              aria-describedby={describedBy("website")}
              className={inputClasses}
            />
          </Field>
          <Field id="metro" label="Metro" hint="We'll check it's still open" error={errors.metro}>
            <input
              id="metro"
              type="text"
              autoComplete="address-level2"
              value={form.metro}
              onChange={(e) => update("metro", e.target.value)}
              aria-describedby={describedBy("metro", true)}
              className={inputClasses}
            />
          </Field>
        </div>

        <Field id="question" label="Question" required error={errors.question}>
          <textarea
            id="question"
            rows={5}
            value={form.question}
            onChange={(e) => update("question", e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.question}
            aria-describedby={describedBy("question")}
            className={cn(inputClasses, "resize-y")}
          />
        </Field>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          We only use your details to answer your question. See our{" "}
          <Link
            to="/privacy"
            className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {status === "error" && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className={`${pillPrimary} w-full px-6 py-3 text-sm sm:w-auto`}
        >
          {status === "submitting" ? "Sending…" : "Send question"}
        </button>
      </form>
    </div>
  )
}
