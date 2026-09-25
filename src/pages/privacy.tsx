export function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Last updated: September 24, 2026
      </p>

      <div className="mt-10 space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Overview
          </h2>
          <p className="mt-3 leading-relaxed">
            Tavynq Automation provides automation software to home service businesses. This
            policy explains what information Tavynq collects through tavynq.com, our
            contact form, and our own communications with prospects and customers, and how
            we use it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Information We Collect
          </h2>
          <p className="mt-3 leading-relaxed">
            When you submit our contact form at tavynq.com/contact, we collect the
            information you provide: your name, email address, phone number, company name,
            and message. If you check the SMS consent box, we also record your consent and
            the date and time it was given.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            How We Use This Information
          </h2>
          <p className="mt-3 leading-relaxed">
            We use the information we collect to respond to your inquiry, schedule
            consultations, and send product demonstrations you request.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            SMS / Text Messaging
          </h2>
          <p className="mt-3 leading-relaxed">
            Tavynq Automation sends text messages only to individuals who request them,
            either by checking the SMS consent box on our contact form at
            tavynq.com/contact or by texting START to our number. These messages relate to
            your inquiry, scheduled appointments, and product demonstrations you request.
            Message frequency varies. Message and data rates may apply. Reply STOP at any
            time to opt out, or HELP for help.
          </p>
          <p className="mt-3 leading-relaxed">
            No mobile information will be shared with third parties or affiliates for
            marketing or promotional purposes. Text messaging originator opt-in data and
            consent will not be shared with any third parties, except service providers
            that deliver messages on our behalf, such as our messaging carrier.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Services We Provide to Businesses
          </h2>
          <p className="mt-3 leading-relaxed">
            Businesses that use Tavynq's services send messages from phone numbers
            registered separately to those businesses, under their own brand and consent
            practices. When we provide these services, we process information on that
            business's behalf as a service provider, and that business's own privacy
            policy governs how its customers' information is used.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            We Do Not Sell or Share Your Data
          </h2>
          <p className="mt-3 leading-relaxed">
            We do not sell or share your personal information with third parties for
            marketing purposes. Information is shared only with service providers (such as
            our SMS carrier and hosting infrastructure) strictly as needed to operate our
            contact form, email, and text messaging systems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Opting Out &amp; Contact
          </h2>
          <p className="mt-3 leading-relaxed">
            Reply STOP at any time to stop receiving text messages from us, or HELP for
            help. If you have questions about this Privacy Policy or how we handle your
            information, please contact us at{" "}
            <a href="mailto:gabe@tavynq.com" className="underline underline-offset-2">
              gabe@tavynq.com
            </a>
            .
          </p>
          <p className="mt-3 leading-relaxed">
            Tavynq
            <br />
            20078 Stella Wy Apt. 365
            <br />
            Lutz, FL
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Legal Notices
          </h2>
          <p className="mt-3 leading-relaxed">
            &copy; {new Date().getFullYear()} Tavynq Automation. All rights reserved. This
            Privacy Policy and the Tavynq service are provided by Tavynq Automation "as
            is," without warranty of any kind, express or implied.
          </p>
        </section>
      </div>
    </div>
  )
}
