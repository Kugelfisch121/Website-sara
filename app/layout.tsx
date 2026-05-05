import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tierphysio Klauser – Mobile Tierphysiotherapie in Rheurdt",
    template: "%s | Tierphysio Klauser",
  },
  description:
    "Professionelle, mobile Tierphysiotherapie für Hunde, Katzen und Pferde. Sara Klauser kommt zu Ihnen nach Hause – in Rheurdt und der Region NRW.",
  keywords: [
    "Tierphysiotherapie",
    "mobile Tierphysiotherapie",
    "Hund Physiotherapie",
    "Katze Physiotherapie",
    "Pferd Physiotherapie",
    "Rheurdt",
    "NRW",
    "Blutegeltherapie Tier",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Tierphysio Klauser",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
