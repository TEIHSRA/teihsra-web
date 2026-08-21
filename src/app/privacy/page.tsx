import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the TEIHSRA Health Intelligence website.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#060609] text-[#F5F3F8]">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-10 sm:py-20">
        <Link
          href="/"
          className="text-xs tracking-[0.24em] text-[#9B91FF] transition hover:text-white"
        >
          ← TEIHSRA
        </Link>

        <div className="mt-16 border-b border-white/10 pb-12">
          <p className="text-xs tracking-[0.3em] text-[#9B91FF]">
            LEGAL
          </p>

          <h1 className="mt-5 text-4xl font-light tracking-[-0.04em] sm:text-6xl">
            Privacy Policy
          </h1>

          <p className="mt-5 text-sm text-white/40">
            Effective 21 August 2026
          </p>
        </div>

        <div className="space-y-12 py-14 text-[15px] leading-8 text-white/60">
          <section>
            <h2 className="text-xl font-normal text-white">
              1. About this policy
            </h2>

            <p className="mt-4">
              This Privacy Policy describes how TEIHSRA Health Intelligence
              (“TEIHSRA”, “we”, “us” or “our”) handles information in
              connection with the public website at teihsra.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              2. Information collected
            </h2>

            <p className="mt-4">
              When you visit this website, limited technical and usage
              information may be collected automatically. This can include
              information such as browser type, device type, approximate
              location, pages visited, referral source and interaction with
              the website.
            </p>

            <p className="mt-4">
              If you contact TEIHSRA by email, we may retain the information
              you voluntarily provide in order to respond to your enquiry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              3. Analytics
            </h2>

            <p className="mt-4">
              This website uses Google Analytics to understand website usage
              and improve our digital presence. Google Analytics may use
              cookies or similar technologies and may process technical
              information about visits to the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              4. Clinical and patient information
            </h2>

            <p className="mt-4">
              The public TEIHSRA website is not intended for the submission
              of patient records, clinical documents, medical images,
              protected health information or other sensitive clinical data.
              Please do not send patient-identifiable information through the
              public website or general contact email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              5. How information may be used
            </h2>

            <p className="mt-4">
              Information collected through this website may be used to
              operate and improve the website, understand aggregate usage,
              maintain security, respond to communications and support
              legitimate organisational activities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              6. Third-party services
            </h2>

            <p className="mt-4">
              TEIHSRA may use third-party infrastructure and services for
              website hosting, analytics, email and related functionality.
              Those providers may process limited information according to
              their own applicable terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              7. Data security
            </h2>

            <p className="mt-4">
              Reasonable technical and organisational measures are used to
              protect information associated with the website. However, no
              internet-based system can be guaranteed to be completely
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              8. Changes to this policy
            </h2>

            <p className="mt-4">
              This policy may be updated as TEIHSRA, its website and its
              services evolve. The effective date above will be revised when
              material changes are published.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              9. Contact
            </h2>

            <p className="mt-4">
              For privacy-related enquiries, contact{" "}
              <a
                href="mailto:connect@teihsra.com"
                className="text-[#B7ADFF] transition hover:text-white"
              >
                connect@teihsra.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}