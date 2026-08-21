import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEIHSRA Health Intelligence",
  description:
    "Technology-Empowered Intelligence for Healthcare Systems, Research and Advancement.",
  metadataBase: new URL("https://teihsra.com"),
  openGraph: {
    title: "TEIHSRA Health Intelligence",
    description:
      "Technology-Empowered Intelligence for Healthcare Systems, Research and Advancement.",
    url: "https://teihsra.com",
    siteName: "TEIHSRA Health Intelligence",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}