import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for the TEIHSRA Health Intelligence website.",
};

export default function TermsPage() {
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
            Terms of Use
          </h1>

          <p className="mt-5 text-sm text-white/40">
            Effective 21 August 2026
          </p>
        </div>

        <div className="space-y-12 py-14 text-[15px] leading-8 text-white/60">
          <section>
            <h2 className="text-xl font-normal text-white">
              1. Website purpose
            </h2>

            <p className="mt-4">
              teihsra.com is the public website of TEIHSRA Health
              Intelligence. It provides general information about TEIHSRA,
              its areas of interest and its work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              2. No medical advice
            </h2>

            <p className="mt-4">
              Content on this website is provided for general informational
              purposes only and is not medical advice, diagnosis, treatment,
              clinical guidance or a substitute for professional medical
              judgement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              3. No professional relationship
            </h2>

            <p className="mt-4">
              Accessing this website or communicating through its general
              contact channels does not by itself create a doctor-patient,
              clinician-patient, advisory, contractual or other professional
              relationship with TEIHSRA or any individual associated with it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              4. Accuracy and availability
            </h2>

            <p className="mt-4">
              We aim to keep information accurate and current, but we do not
              guarantee that all website content will always be complete,
              error-free or continuously available. Content may be changed
              or withdrawn without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              5. Intellectual property
            </h2>

            <p className="mt-4">
              Unless otherwise indicated, the TEIHSRA name, branding,
              website design, original text and other original materials on
              this website are associated with TEIHSRA Health Intelligence.
              Third-party names and marks remain the property of their
              respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              6. Acceptable use
            </h2>

            <p className="mt-4">
              You must not misuse the website, interfere with its operation,
              attempt unauthorised access, introduce malicious software, or
              use the website in a manner that violates applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              7. External services and links
            </h2>

            <p className="mt-4">
              The website may reference or rely on third-party websites and
              services. TEIHSRA is not responsible for the availability,
              content or practices of independent third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              8. Changes
            </h2>

            <p className="mt-4">
              These Terms may be revised as TEIHSRA and its website evolve.
              Continued use of the website after updated Terms are published
              constitutes use subject to the revised version.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-white">
              9. Contact
            </h2>

            <p className="mt-4">
              Questions about these Terms may be sent to{" "}
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