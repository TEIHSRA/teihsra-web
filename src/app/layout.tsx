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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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