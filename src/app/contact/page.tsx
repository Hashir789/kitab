import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kitaab. Contact us for support, questions, or feedback about your digital record of deeds.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Contact | Kitaab",
    description: "Get in touch with Kitaab. Contact us for support, questions, or feedback about your digital record of deeds.",
    url: "https://kitaab.me/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact | Kitaab",
    description: "Get in touch with Kitaab. Contact us for support, questions, or feedback about your digital record of deeds.",
  },
  alternates: {
    canonical: "https://kitaab.me/contact",
  },
};

export default function Contact() {
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
