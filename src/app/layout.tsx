import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "astroheal4U — Only i know what you are hiding 💫",
  description: "Accurate and trusted astrology, chart analysis, and personal guidance. Book 1-on-1 consultations and unlock your cosmic blueprint.",
  keywords: "astrology, horoscope, birth chart, tarot, crystal, celestial, zodiac, astroheal4u",
  openGraph: {
    title: "astroheal4U — Only i know what you are hiding 💫",
    description: "Accurate and trusted astrology guidance. Only i know what you are hiding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans text-stone-900 bg-[#FAF9F5] selection:bg-purple-100 selection:text-purple-900 transition-all duration-300">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
