import { useState, type ChangeEvent, type ClipboardEvent, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { site } from "@/config/site"
import { usePageMeta } from "@/lib/use-page-meta"

type FormState = {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
}

type FormErrors = Partial<Record<keyof FormState, string>>
type Status = "idle" | "submitting" | "success" | "error"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClasses =
  "mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"

function formatPhoneDisplay(digits: string): string {
  if (digits.length === 0) return ""
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

function caretIndexForDigitCount(display: string, digitCount: number): number {
  if (digitCount <= 0) return 0
  let seen = 0
  for (let i = 0; i < display.length; i++) {
    if (/\d/.test(display[i])) {
      seen++
      if (seen === digitCount) return i + 1
    }
  }
  return display.length
}

function validatePhone(digits: string): string | undefined {
  if (!digits) return undefined
  if (digits.length < 10) return "Please enter a 10-digit US phone number."

  const areaCode = digits.slice(0, 3)
  const exchange = digits.slice(3, 6)

  if (areaCode[0] === "0" || areaCode[0] === "1") {
    return "Please enter a valid US phone number."
  }
  if (exchange[0] === "0" || exchange[0] === "1") {
    return "Please enter a valid US phone number."
  }
  if (areaCode === "555") return "Please enter a valid US phone number."
  if (/^(\d)\1{9}$/.test(digits)) return "Please enter a valid US phone number."

  return undefined
}

function toE164(digits: string): string {
  return `+1${digits}`
}

export function Contact() {
  usePageMeta(
    `Contact | ${site.name}`,
    `Questions about ${site.name}'s B2B lead generation? Send us a message and we'll get back to you.`,
  )

  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function clearPhoneErrorIfNowValid(digits: string) {
    setErrors((prev) => (prev.phone && !validatePhone(digits) ? { ...prev, phone: undefined } : prev))
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target
    const raw = input.value
    const caretRaw = input.selectionStart ?? raw.length
    const digitsBeforeCaret = raw.slice(0, caretRaw).replace(/\D/g, "").length

    const previousFormatted = formatPhoneDisplay(form.phone)
    const rawDigits = raw.replace(/\D/g, "").slice(0, 10)

    let nextDigits = rawDigits
    let nextDigitsBeforeCaret = digitsBeforeCaret

    const deleted = raw.length < previousFormatted.length
    if (deleted && rawDigits === form.phone) {
      nextDigits = form.phone.slice(0, -1)
      nextDigitsBeforeCaret = Math.min(digitsBeforeCaret, nextDigits.length)
    }

    const nextDisplay = formatPhoneDisplay(nextDigits)
    input.value = nextDisplay
    const caretIndex = caretIndexForDigitCount(nextDisplay, nextDigitsBeforeCaret)
    input.setSelectionRange(caretIndex, caretIndex)

    update("phone", nextDigits)
    clearPhoneErrorIfNowValid(nextDigits)
  }

  function handlePhonePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    let digits = event.clipboardData.getData("text").replace(/\D/g, "")
    if (digits.length === 11 && digits.startsWith("1")) {
      digits = digits.slice(1)
    }
    digits = digits.slice(0, 10)

    update("phone", digits)
    clearPhoneErrorIfNowValid(digits)
  }

  function handlePhoneBlur() {
    setErrors((prev) => ({ ...prev, phone: validatePhone(form.phone) }))
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {}

    if (!form.name.trim()) nextErrors.name = "Please enter your name."
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address."
    } else if (!EMAIL_PATTERN.test(form.email)) {
      nextErrors.email = "Please enter a valid email address."
    }
    const phoneError = validatePhone(form.phone)
    if (phoneError) nextErrors.phone = phoneError
    if (!form.company.trim()) nextErrors.company = "Please enter your company name."
    if (!form.message.trim()) nextErrors.message = "Please tell us a little about your business."

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return

    setStatus("submitting")
    setErrorMessage("")

    try {
      const payload = {
        ...form,
        phone: form.phone ? toE164(form.phone) : "",
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      )
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center md:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Message sent
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Thanks for reaching out. We'll reply by email soon.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Get in touch
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        Tell us what you sell and who you sell to, and we'll get back to you by email.
        Rather talk it through?{" "}
        <a
          href={site.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
        >
          Book a call
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClasses}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClasses}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-white">
            Phone Number
            <span className="sr-only"> (US phone number with +1 country code)</span>
          </label>
          <div className="relative mt-2">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-2 pl-3 text-sm text-gray-400 dark:text-gray-500"
            >
              <span>+1</span>
              <span className="h-4 w-px bg-black/10 dark:bg-white/10" />
            </span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="(555) 555-0123"
              value={formatPhoneDisplay(form.phone)}
              onChange={handlePhoneChange}
              onPaste={handlePhonePaste}
              onBlur={handlePhoneBlur}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="w-full rounded-lg border border-black/10 bg-white py-2 pl-14 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Name *
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClasses}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
            How Can We Help? *
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="What you sell, who your ideal clients are, and where new business comes from today."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={inputClasses}
          />
          {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          We only use your details to reply to your message. See our{" "}
          <Link
            to="/privacy"
            className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {status === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  )
}
