import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, Caveat, Source_Sans_3 } from "next/font/google";
import { TransitionProvider } from "@/components/transitions/TransitionProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-brand",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwritten",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-learn",
  weight: ["400", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://carmen-portfolio-iota.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Carmen Rincon | Portfolio",
    template: "%s | Carmen Rincon",
  },
  description:
    "Product designer & builder with 9+ years shipping digital products. Case studies, experiments, and process.",
  openGraph: {
    type: "website",
    siteName: "Carmen Rincon",
    locale: "en_US",
    url: siteUrl,
    title: "Carmen Rincon | Portfolio",
    description:
      "Product designer & builder with 9+ years shipping digital products.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${dmSans.variable} ${caveat.variable} ${sourceSans.variable} font-body antialiased`}
      >
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
