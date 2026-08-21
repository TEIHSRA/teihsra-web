import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TEIHSRA Health Intelligence",
    template: "%s | TEIHSRA",
  },

  description:
    "Technology-Empowered Intelligence for Healthcare Systems, Research and Advancement.",

  metadataBase: new URL("https://teihsra.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "TEIHSRA Health Intelligence",
    description:
      "Technology-Empowered Intelligence for Healthcare Systems, Research and Advancement.",
    url: "https://teihsra.com",
    siteName: "TEIHSRA Health Intelligence",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TEIHSRA Health Intelligence",
    description:
      "Technology-Empowered Intelligence for Healthcare Systems, Research and Advancement.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TEIHSRA Health Intelligence",
  alternateName: "TEIHSRA",
  url: "https://teihsra.com",
  email: "connect@teihsra.com",
  description:
    "Technology-Empowered Intelligence for Healthcare Systems, Research and Advancement.",
  sameAs: [
    "linkedin.com/company/teihsra",
    "https://x.com/teihsra",
    "https://www.instagram.com/teihsra",
    "https://www.threads.com/@teihsra",
    "https://www.youtube.com/@teihsra",
    "https://github.com/TEIHSRA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationSchema),
  }}
/>
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KYEG98XYLE"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KYEG98XYLE');
          `}
        </Script>
      </body>
    </html>
  );
}