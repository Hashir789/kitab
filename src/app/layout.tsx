import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://kitaab.me"),
  title: {
    default: "Kitaab — Your Digital Kitaab of Deeds",
    template: "%s | Kitaab",
  },
  description: "Kitaab is your digital record of deeds. Track daily actions, build self-accountability, and grow through mindful living.",
  keywords: [
    "Kitaab",
    "daily deeds",
    "self accountability",
    "habit tracking",
    "life tracking",
    "personal growth",
    "mindful living",
    "self improvement",
    "digital journal",
    "personal record"
  ],
  authors: [{ name: "Kitaab" }],
  creator: "Kitaab",
  publisher: "Kitaab",
  applicationName: "Kitaab",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kitaab.me",
    siteName: "Kitaab",
    title: "Kitaab — Your Digital Kitaab of Deeds",
    description: "Track your daily actions, reflect on your life, and grow through mindful accountability.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kitaab — Your Digital Kitaab of Deeds",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitaab — Your Digital Kitaab of Deeds",
    description: "Track your daily actions, reflect on your life, and grow through mindful accountability.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://kitaab.me",
  },
  icons: {
    icon: [
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAFAF8",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kitaab",
  applicationCategory: "LifestyleApplication",
  applicationSubCategory: "Personal Accountability & Habit Tracking",
  description: "Your digital Kitaab of deeds. Track daily actions, reflect on life, and grow through mindful living.",
  url: "https://kitaab.me",
  logo: {
    "@type": "ImageObject",
    url: "https://kitaab.me/og-image.png",
    width: 1200,
    height: 630,
  },
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Daily deed tracking",
    "Self-accountability",
    "Habit tracking",
    "Life reflection",
    "Mindful living",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
