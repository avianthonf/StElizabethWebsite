import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

// Font optimization with next/font/google
// Preload critical fonts to eliminate FOIT on hero sections
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  preload: true,
  fallback: ["Georgia", "serif"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "St. Elizabeth High School | Pomburpa, Goa",
  description: "A Catholic high school in Pomburpa, Goa, India, dedicated to academic excellence, faith formation, and service. Empowering students through values-driven education.",
  keywords: ["St. Elizabeth High School", "Catholic school Goa", "Pomburpa school", "high school Goa", "Christian education India"],
  authors: [{ name: "St. Elizabeth High School" }],
  openGraph: {
    title: "St. Elizabeth High School | Pomburpa, Goa",
    description: "A Catholic high school in Pomburpa, Goa, dedicated to academic excellence, faith formation, and service.",
    url: "https://stelizabethhighschool.edu.in",
    siteName: "St. Elizabeth High School",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} min-h-full flex flex-col font-sans antialiased`}>{children}</body>
    </html>
  );
}
