import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact TEIHSRA Health Intelligence.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#060609] text-[#F5F3F8]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12 sm:px-10 sm:py-20">
        <Link
          href="/"
          className="text-xs tracking-[0.24em] text-[#9B91FF] transition hover:text-white"
        >
          ← TEIHSRA
        </Link>

        <div className="my-auto py-24">
          <p className="text-xs tracking-[0.32em] text-[#9B91FF]">
            CONNECT
          </p>

          <h1 className="mt-7 max-w-4xl text-5xl font-light leading-[1.05] tracking-[-0.05em] sm:text-7xl">
            Ideas, conversations
            <br />
            <span className="text-[#A49AFF]">and possibilities.</span>
          </h1>

          <p className="mt-10 max-w-2xl text-lg font-light leading-8 text-white/45">
            For enquiries, collaborations and conversations with TEIHSRA
            Health Intelligence.
          </p>

          <a
            href="mailto:connect@teihsra.com"
            className="mt-12 inline-flex items-center gap-6 border-b border-[#9B91FF]/40 pb-3 text-sm tracking-[0.14em] text-white transition hover:border-[#B7ADFF] hover:text-[#B7ADFF]"
          >
            connect@teihsra.com
            <span>↗</span>
          </a>
        </div>

        <div className="border-t border-white/10 pt-8 text-xs text-white/30">
          TEIHSRA Health Intelligence · Mumbai, India
        </div>
      </div>
    </main>
  );
}