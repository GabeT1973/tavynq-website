import { useState } from "react"
import { Play } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { SectionHeading } from "@/components/section-heading"
import { site } from "@/config/site"

const VIDEO_TITLE = `${site.offer.systemName}: the 10-minute breakdown`

// Shows a thumbnail until clicked, then loads the YouTube player. Keeps YouTube's heavy
// scripts off the initial page load.
function VideoEmbed({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={VIDEO_TITLE}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full"
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        width={480}
        height={360}
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
      <PlayBadge />
      <span className="sr-only">Play video: {VIDEO_TITLE}</span>
    </button>
  )
}

function PlayBadge() {
  return (
    <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-8 ring-blue-600/20 transition-transform group-hover:scale-105 motion-reduce:transition-none">
      <Play aria-hidden="true" className="ml-1 h-6 w-6 fill-current" />
    </span>
  )
}

// Only rendered when a YouTube ID is set in src/config/site.ts (see pages/home.tsx).
export function VslSection({ videoId }: { videoId: string }) {
  return (
    <Section id="breakdown" labelledBy="breakdown-heading">
      <SectionHeading
        id="breakdown-heading"
        eyebrow="Watch first"
        title="The 10-minute breakdown"
        description="How we find local businesses with a reason to talk, email them, and put qualified calls on your calendar."
      />
      <Reveal className="mx-auto mt-12 max-w-4xl md:mt-16">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-black/[0.06] bg-gray-100 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.35)] dark:border-white/[0.08] dark:bg-gray-900">
          <VideoEmbed videoId={videoId} />
        </div>
      </Reveal>
    </Section>
  )
}
