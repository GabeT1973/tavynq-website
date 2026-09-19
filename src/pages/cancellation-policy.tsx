export function CancellationPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Cancellation Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Last updated: September 18, 2026
      </p>

      <div className="mt-10 space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            No Long-Term Contracts
          </h2>
          <p className="mt-3 leading-relaxed">
            Tavynq operates month-to-month — cancel anytime with no penalty and no
            cancellation fee.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            How to Cancel
          </h2>
          <p className="mt-3 leading-relaxed">
            To cancel, just email us at{" "}
            <a href="mailto:gabe@tavynq.com" className="underline underline-offset-2">
              gabe@tavynq.com
            </a>{" "}
            at least 5 business days before your next billing date. Your service will
            continue through the end of your current billing period, and you won't be
            charged again after that.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Refunds
          </h2>
          <p className="mt-3 leading-relaxed">
            Monthly service fees are not prorated or refunded for partial months.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Coming Back
          </h2>
          <p className="mt-3 leading-relaxed">
            If you cancel and want to come back later, just reach out — we'll get you set
            up again with no hassle.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Legal Notices
          </h2>
          <p className="mt-3 leading-relaxed">
            &copy; {new Date().getFullYear()} Tavynq Automation. All rights reserved. This
            Cancellation Policy and the Tavynq service are provided by Tavynq Automation
            "as is," without warranty of any kind, express or implied.
          </p>
        </section>
      </div>
    </div>
  )
}
