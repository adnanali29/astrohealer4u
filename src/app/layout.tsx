import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ToastContainer from "@/components/ToastContainer";
import AudioButton from "@/components/AudioButton";
import BookingModal from "@/components/BookingModal";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "astrohealer4U — Only i know what you are hiding 💫",
  description: "Accurate and trusted astrology, chart analysis, and personal guidance. Book 1-on-1 consultations and unlock your cosmic blueprint.",
  keywords: "astrology, horoscope, birth chart, tarot, crystal, celestial, zodiac, astrohealer4u",
  openGraph: {
    title: "astrohealer4U — Only i know what you are hiding 💫",
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
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1860897765110948');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1860897765110948&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-N9LX9XX70Y"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N9LX9XX70Y');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans text-stone-900 bg-[#FAF9F5] selection:bg-purple-100 selection:text-purple-900 transition-all duration-300">
        <AppProvider>
          <div className="min-h-screen flex flex-col font-sans text-stone-900 bg-[#FAF9F5] relative overflow-x-hidden">
            {/* Celestial backdrop gradients */}
            <div className="absolute inset-x-0 top-0 h-[600px] overflow-hidden pointer-events-none z-0">
              <div
                className="absolute -top-32 left-[10%] w-[500px] h-[500px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(233,227,248,0.6) 0%, rgba(250,249,245,0) 70%)',
                  animation: 'pulseGlow 12s infinite ease-in-out',
                }}
              />
              <div
                className="absolute top-[10%] -right-48 w-[600px] h-[600px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(251,232,235,0.6) 0%, rgba(250,249,245,0) 70%)',
                  animation: 'pulseGlow 16s infinite ease-in-out',
                }}
              />
            </div>

            <Header />

            <main className="flex-grow relative z-10">
              {children}
            </main>

            <Footer />

            {/* Global Overlays */}
            <CartDrawer />
            <ToastContainer />
            <BookingModal />
            <WhatsAppButton />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
