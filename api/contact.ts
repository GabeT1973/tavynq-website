import type { VercelRequest, VercelResponse } from "@vercel/node"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Sent through Resend (https://resend.com/docs/api-reference/emails/send-email).
// notify.signalfill.com must be a verified domain in Resend.
const RESEND_ENDPOINT = "https://api.resend.com/emails"
const FROM_ADDRESS = "SignalFill Website <website@notify.signalfill.com>"
const DEFAULT_TO = "gabe@signalfill.com"

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function parseBody(body: unknown): Record<string, unknown> | null {
  if (typeof body === "string") {
    try {
      return JSON.parse(body || "{}")
    } catch {
      return null
    }
  }
  return body && typeof body === "object" ? (body as Record<string, unknown>) : {}
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const body = parseBody(req.body)
  if (!body) {
    return res.status(400).json({ error: "Invalid request." })
  }

  const { name, email, website, metro, question } = body

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(website) ||
    !isNonEmptyString(question)
  ) {
    return res.status(400).json({ error: "Please fill in all required fields." })
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL } = process.env

  if (!RESEND_API_KEY) {
    console.error("Contact form: RESEND_API_KEY is not set")
    return res.status(500).json({ error: "Email service is not configured." })
  }

  const metroText = isNonEmptyString(metro) ? metro : "Not provided"

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: CONTACT_TO_EMAIL || DEFAULT_TO,
        reply_to: email,
        subject: `New question from ${name} (${website})`,
        text: [
          "New question from the signalfill.com contact page.",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Website: ${website}`,
          `Metro: ${metroText}`,
          "",
          "Question:",
          question,
          "",
          "Reply to this email to answer directly (promised: within 24-48 hours).",
        ].join("\n"),
      }),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => "")
      console.error(`Contact form: Resend returned ${response.status}`, detail)
      return res.status(500).json({ error: "Failed to send message. Please try again later." })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Contact form: failed to reach Resend", error)
    return res.status(500).json({ error: "Failed to send message. Please try again later." })
  }
}
