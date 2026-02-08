import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Kitaab - your digital record of deeds. Track daily actions, reflect on your life, and grow through self-accountability.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "About | Kitaab",
    description: "Learn about Kitaab - your digital record of deeds. Track daily actions, reflect on your life, and grow through self-accountability.",
    url: "https://kitaab.me/about",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About | Kitaab",
    description: "Learn about Kitaab - your digital record of deeds. Track daily actions, reflect on your life, and grow through self-accountability.",
  },
  alternates: {
    canonical: "https://kitaab.me/about",
  },
};

export default function About() {
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
