import { useEffect, useRef, useState, type ReactNode } from "react"
import { PhoneMissed, PhoneOutgoing } from "lucide-react"

type Party = "business" | "customer"

const FINAL_STEP = 8
const STEP_DELAYS = [800, 2000, 1400, 2200, 1400, 2000, 1400, 1800]
const HOLD_MS = 5000
const FADE_MS = 600

const messages: {
  from: Party
  text: string
  typingStep: number
  showStep: number
  automatic?: boolean
}[] = [
  {
    from: "business",
    text: "Hi, sorry we missed your call! What can we help you with today, and is this urgent?",
    typingStep: 2,
    showStep: 3,
    automatic: true,
  },
  {
    from: "customer",
    text: "AC stopped cooling, not urgent but need someone this week",
    typingStep: 4,
    showStep: 5,
  },
  {
    from: "business",
    text: "Thanks for the info! We'll have someone reach out shortly to get you scheduled.",
    typingStep: 6,
    showStep: 7,
    automatic: true,
  },
]

const enter = "animate-in fade-in slide-in-from-bottom-2 duration-500"

function TypingBubble() {
  return (
    <div
      className={`${enter} flex w-fit items-center gap-1 self-start rounded-[1.1rem] bg-[#e9e9eb] px-3.5 py-3 dark:bg-[#262629]`}
    >
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}

function Phone({
  label,
  caption,
  contactName,
  contactDetail,
  initials,
  fading,
  children,
}: {
  label: string
  caption: string
  contactName: string
  contactDetail: string
  initials: string
  fading: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{label}</h3>
      <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">{caption}</p>
      <div className="relative w-[280px] overflow-hidden rounded-[2.75rem] border-[10px] border-gray-900 bg-white shadow-xl dark:border-gray-700 dark:bg-black">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="flex flex-col items-center border-b border-black/5 bg-gray-50 pb-2 pt-9 dark:border-white/10 dark:bg-[#1c1c1e]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-gray-300 to-gray-400 text-xs font-medium text-white">
            {initials}
          </div>
          <p className="mt-1 text-[11px] font-medium text-gray-900 dark:text-white">
            {contactName}
          </p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">{contactDetail}</p>
        </div>
        <div
          className={`flex h-[450px] flex-col justify-end gap-2 overflow-hidden px-3 pb-3 pt-3 text-[13px] transition-opacity ease-out ${
            fading ? "opacity-0" : "opacity-100"
          }`}
          style={{ transitionDuration: `${FADE_MS}ms` }}
        >
          {children}
        </div>
        <div className="px-3 pb-4">
          <div className="rounded-full border border-black/10 px-3 py-1.5 text-xs text-gray-400 dark:border-white/15">
            iMessage
          </div>
        </div>
      </div>
    </div>
  )
}

function Bubble({
  sent,
  automatic,
  children,
}: {
  sent: boolean
  automatic?: boolean
  children: ReactNode
}) {
  return (
    <>
      <div
        className={`${enter} max-w-[80%] rounded-[1.1rem] px-3 py-2 leading-snug ${
          sent
            ? "self-end bg-[#0b84ff] text-white"
            : "self-start bg-[#e9e9eb] text-black dark:bg-[#262629] dark:text-white"
        }`}
      >
        {children}
      </div>
      {sent && automatic && (
        <p className={`${enter} -mt-1 self-end pr-1 text-[10px] text-gray-400`}>
          Sent automatically
        </p>
      )}
    </>
  )
}

function Thread({ viewer, step }: { viewer: Party; step: number }) {
  return (
    <>
      {step >= 1 && (
        <div
          className={`${enter} flex items-center gap-1.5 self-center rounded-full bg-gray-100 px-3 py-1 text-[11px] text-gray-500 dark:bg-white/10 dark:text-gray-400`}
        >
          {viewer === "business" ? (
            <>
              <PhoneMissed className="h-3 w-3 text-red-500" />
              Missed call
            </>
          ) : (
            <>
              <PhoneOutgoing className="h-3 w-3" />
              Called · No answer
            </>
          )}
        </div>
      )}
      {messages.map((message) => (
        <div key={message.text} className="contents">
          {step >= message.showStep ? (
            <Bubble sent={message.from === viewer} automatic={message.automatic}>
              {message.text}
            </Bubble>
          ) : (
            step === message.typingStep && message.from !== viewer && <TypingBubble />
          )}
        </div>
      ))}
      {viewer === "business" && step >= FINAL_STEP && (
        <div
          className={`${enter} mt-1 self-center rounded-full border border-blue-600/20 bg-blue-50 px-3 py-1.5 text-[12px] font-medium text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/15 dark:text-blue-300`}
        >
          ✅ Lead sent to team
        </div>
      )}
    </>
  )
}

export function ExampleSection() {
  const phonesRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [step, setStep] = useState(0)
  const [fading, setFading] = useState(false)
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const shownStep = reducedMotion ? FINAL_STEP : step

  useEffect(() => {
    const node = phonesRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (!entry.isIntersecting) {
          setStep(0)
          setFading(false)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || reducedMotion) return

    const timers: number[] = []

    function playOnce() {
      let elapsed = 0
      STEP_DELAYS.forEach((delay, index) => {
        elapsed += delay
        timers.push(window.setTimeout(() => setStep(index + 1), elapsed))
      })
      timers.push(window.setTimeout(() => setFading(true), elapsed + HOLD_MS))
      timers.push(
        window.setTimeout(() => {
          setStep(0)
          setFading(false)
          playOnce()
        }, elapsed + HOLD_MS + FADE_MS),
      )
    }

    playOnce()
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [inView, reducedMotion])

  return (
    <section id="example" className="mx-auto max-w-screen-xl px-4 py-20 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-blue-600 dark:text-blue-400 md:text-4xl">
          Example
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Here's what happens when a customer calls and nobody can pick up.
        </p>
      </div>
      <p className="sr-only">
        A customer calls a business and no one answers. The business automatically texts
        back asking what the customer needs and whether it's urgent. The customer replies
        that their AC stopped cooling and they need someone this week. The business
        confirms someone will reach out shortly, and the lead is sent to the team.
      </p>
      <div
        ref={phonesRef}
        aria-hidden="true"
        className="mt-12 grid items-start justify-items-center gap-12 sm:grid-cols-2"
      >
        <Phone
          label="John Doe Air Cooling"
          caption="Business owner's view"
          contactName="Mike Johnson"
          contactDetail="(813) 555-0142"
          initials="MJ"
          fading={fading}
        >
          <Thread viewer="business" step={shownStep} />
        </Phone>
        <Phone
          label="Customer"
          caption="Customer's view"
          contactName="John Doe Air Cooling"
          contactDetail="(813) 555-0100"
          initials="JD"
          fading={fading}
        >
          <Thread viewer="customer" step={shownStep} />
        </Phone>
      </div>
    </section>
  )
}
