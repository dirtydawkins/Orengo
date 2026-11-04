import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Shared";
import { site } from "@/data/portfolio";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lameck Orengo | Full-Stack Developer in Nairobi",
    template: "%s | Lameck Orengo",
  },
  description:
    "Full-stack developer based in Nairobi, Kenya. Building business websites, booking systems, payment integrations, web applications, and automation.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "Lameck Orengo",
    title: "Lameck Orengo | Full-Stack Developer",
    description:
      "Websites and systems built to work. Nairobi, Kenya. Working worldwide.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Lameck Orengo, full-stack developer in Nairobi",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
const themeBoot = `(()=>{let t='light';try{const saved=localStorage.getItem('lameck-theme');t=saved==='light'||saved==='dark'?saved:'light'}catch{}document.documentElement.dataset.theme=t;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',t==='light'?'#F2EEE6':'#0B0D10')})()`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#F2EEE6" />
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <link
          rel="preload"
          href="/fonts/manrope-latin-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div id="top" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
