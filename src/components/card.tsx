// Shared card styles: one radius, border, shadow, and hover lift across the site.

export const cardBase =
  "rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-16px_rgb(0_0_0/0.10)] dark:border-white/[0.07] dark:bg-gray-900 dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.04),0_12px_32px_-16px_rgb(0_0_0/0.6)]"

export const cardHover =
  "transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-black/10 hover:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_20px_40px_-16px_rgb(0_0_0/0.16)] dark:hover:border-white/[0.12] dark:hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_20px_40px_-16px_rgb(0_0_0/0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"

// Round icon chip used at the top of feature cards.
export const iconChip =
  "flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 ring-1 ring-inset ring-blue-600/15 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/20"
