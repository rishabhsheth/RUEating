import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RUEating – Rutgers Dining Menus",
  description: "Search Rutgers dining menus across campuses and find your favorite meals easily.",
  metadataBase: new URL("https://ru-eating.vercel.app"),
  openGraph: {
    title: "RUEating – Rutgers Dining Menus",
    description: "Search Rutgers dining menus across campuses and find your favorite meals easily.",
    url: "https://ru-eating.vercel.app",
    siteName: "RUEating",
    images: [
      {
        url: "/og-image.jpg", // make sure this exists in /public
        width: 1200,
        height: 630,
        alt: "RUEating Open Graph Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RUEating – Rutgers Dining Menus",
    description: "Easily find and plan meals across Rutgers dining halls.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "TSjj7sgNBwaYt_E56og5uvF76HNnpBTGo66e6T3AxMo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
