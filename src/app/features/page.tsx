import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description: "Discover Kitaab features: daily deed tracking, self-accountability, habit tracking, life reflection, and mindful living tools.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Features | Kitaab",
    description: "Discover Kitaab features: daily deed tracking, self-accountability, habit tracking, life reflection, and mindful living tools.",
    url: "https://kitaab.me/features",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Features | Kitaab",
    description: "Discover Kitaab features: daily deed tracking, self-accountability, habit tracking, life reflection, and mindful living tools.",
  },
  alternates: {
    canonical: "https://kitaab.me/features",
  },
};

export default function Features() {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        minHeight: '150vh',
        fontFamily: '"Google Sans Flex", system-ui, sans-serif',
        fontSize: '18px',
        color: 'rgb(100, 100, 100)',
        padding: '40px 20px',
        paddingTop: '100px'
      }}>
        <p>This page is under construction</p>
      </div>
    );
}
