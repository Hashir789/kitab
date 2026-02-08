import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kitaab.me"),
  title: {
    default: "Kitaab - Be Your Own Accountant",
    template: "%s | Kitaab",
  },
  description: "Kitaab is your digital record of deeds. Track daily actions, reflect on your life, and grow through self-accountability.",
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
    "personal record",
    "Hasanaat",
    "Sayyi'at",
    "deed tracker",
    "accountability journal",
    "personal development",
    "self reflection",
    "daily journal",
    "habit formation",
    "goal tracking",
    "mindfulness app",
    "self awareness",
    "personal deeds",
    "life accountability",
    "spiritual journal",
    "Islamic deeds tracker"
  ],
  authors: [{ name: "Kitaab" }],
  creator: "Kitaab",
  publisher: "Kitaab",
  applicationName: "Kitaab",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  classification: "Lifestyle Application",
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kitaab.me",
    siteName: "Kitaab",
    title: "Kitaab - Be Your Own Accountant",
    description: "Kitaab is your digital record of deeds. Track daily actions, reflect on your life, and grow through self-accountability.",
    images: [
      {
        url: "https://kitaab.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kitaab - Be Your Own Accountant",
        type: "image/png",
        secureUrl: "https://kitaab.me/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitaab - Be Your Own Accountant",
    description: "Kitaab is your digital record of deeds. Track daily actions, reflect on your life, and grow through self-accountability.",
    images: ["https://kitaab.me/og-image.png"],
    creator: "@kitaab", // Update with actual Twitter handle if available
    site: "@kitaab", // Update with actual Twitter handle if available
  },
  alternates: {
    canonical: "https://kitaab.me",
    languages: {
      "en-US": "https://kitaab.me",
    },
  },
  manifest: "/manifest.json",
  verification: {
    // Add when you have verification codes
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  category: "Lifestyle",
  appLinks: {
    web: {
      url: "https://kitaab.me",
      should_fallback: false,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kitaab",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [
      { url: "/favicon.ico" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f8f9fa",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kitaab",
  applicationCategory: "LifestyleApplication",
  applicationSubCategory: "Personal Accountability & Habit Tracking",
  description: "Your digital Kitaab of deeds. Track daily actions, reflect on life, and grow through mindful living. Record Hasanaat (good deeds) and Sayyi'at (bad deeds) to build self-accountability and personal growth.",
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
    "Hasanaat and Sayyi'at tracking",
    "Progress monitoring",
    "Daily reflections",
    "Merits and targets",
    "Privacy and encryption",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "1",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kitaab",
  url: "https://kitaab.me",
  logo: "https://kitaab.me/og-image.png",
  description: "Kitaab - Your digital record of deeds. Track daily actions, build self-accountability, and grow through mindful living.",
  sameAs: [],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Kitaab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kitaab is your digital record of deeds. It's a personal accountability and self-improvement journal that helps you track your daily actions, record your good deeds (Hasanaat) and bad deeds (Sayyi'at), reflect on your life, and monitor your personal growth over time. Kitaab is designed for mindful living, spiritual growth, and building lasting habits through consistent tracking and reflection.",
      },
    },
    {
      "@type": "Question",
      name: "How does Kitaab help with self-accountability?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kitaab helps you be your own accountant by tracking your daily actions and decisions. You can record Hasanaat (good deeds) and Sayyi'at (bad deeds), reflect on your day, set targets, and monitor your progress. This consistent tracking builds self-awareness and accountability, helping you make better decisions and improve your life through personal development and habit formation.",
      },
    },
    {
      "@type": "Question",
      name: "What features does Kitaab offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kitaab offers daily deed tracking, hierarchical organization of actions, daily reflections, progress monitoring with analytics, merits and targets for goal setting, privacy and encryption for secure data storage, and the ability to share selectively with trusted connections. The app includes habit tracking, life tracking, personal growth monitoring, and comprehensive accountability tools.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data secure in Kitaab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Kitaab uses client-side encryption to protect your data. Your personal records are encrypted, and you have complete control over who can access your information. You can share selectively with trusted connections while maintaining privacy. All sensitive data including your spiritual journal, personal deeds, and accountability records are protected with advanced encryption.",
      },
    },
    {
      "@type": "Question",
      name: "Can I track both Hasanaat and Sayyi'at in Kitaab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Kitaab allows you to track both Hasanaat (good deeds) and Sayyi'at (bad deeds) separately. You can organize them hierarchically, set different scales or counts for each, and monitor your progress in both categories. This comprehensive tracking helps you build self-awareness and work towards personal improvement.",
      },
    },
    {
      "@type": "Question",
      name: "How does daily reflection work in Kitaab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kitaab's daily reflection feature allows you to write thoughtful journal entries for each day. You can reflect on your Hasanaat and Sayyi'at, capture insights, learn from experiences, and deepen your self-awareness. These reflections help you practice mindfulness and make meaningful changes in your life through intentional living.",
      },
    },
    {
      "@type": "Question",
      name: "Is Kitaab free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Kitaab is free to use. You can start tracking your deeds, reflecting on your life, and building self-accountability at no cost. Create your free account today and begin your journey towards mindful living and personal growth.",
      },
    },
    {
      "@type": "Question",
      name: "Can I share my deeds with others?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Kitaab allows you to share your deeds selectively with trusted connections. You can grant read or write permissions to specific deed items while maintaining complete control over your privacy. All shared data remains encrypted and secure.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://kitaab.me",
    },
  ],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kitaab",
  url: "https://kitaab.me",
  description: "Kitaab - Your digital record of deeds. Track daily actions, reflect on your life, and grow through self-accountability.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://kitaab.me/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
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
        <Script
          id="json-ld-application"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="json-ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Script
          id="json-ld-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <Script 
          src="https://code.highcharts.com/highcharts.js" 
          strategy="afterInteractive"
        />
        <Script 
          src="https://code.highcharts.com/modules/variable-pie.js" 
          strategy="lazyOnload"
        />
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
