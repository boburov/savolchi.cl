import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Savolchi | Boburov’s Project | Best Test Platform",
    template: "%s | Savolchi by Boburov",
  },
  description:
    "Savolchi — Boburov tomonidan yaratilgan innovatsion test platforma. Bu yerda siz testlar yaratish, yechish va natijalarni tahlil qilish imkoniga egasiz. Eng yaxshi test app — Boburov’s Savolchi project!",
  keywords: [
    "Savolchi",
    "Boburov Savolchi",
    "Boburov’s project",
    "test app",
    "test platform",
    "best test platform",
    "online test system",
    "Savolchi app",
    "Savolchi testlar",
    "Boburov test app",
    "education platform",
    "learning tests",
    "interactive tests",
  ],
  authors: [{ name: "Boburov Shukurullo" }],
  creator: "Boburov Shukurullo",
  publisher: "Savolchi",
  openGraph: {
    title: "Savolchi | Boburov’s Project | Best Test Platform",
    description:
      "Savolchi — Boburov tomonidan ishlab chiqilgan eng yaxshi test platforma. Sinovlar, testlar va bilim tahlili bir joyda.",
    url: "https://savolchi.uz",
    siteName: "Savolchi",
    images: [
      {
        url: "/savolchi.svg",
        width: 1200,
        height: 630,
        alt: "Savolchi Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/savolchi.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Savolchi — Boburov’s Project",
    description:
      "Savolchi — innovatsion test platforma, Boburov tomonidan yaratilgan.",
    images: ["/savolchi.svg"],
    creator: "@boburov",
  },
  alternates: {
    canonical: "https://savolchi.uz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="SUekuXNlaNhW_wY6SHvAPG0u7YIva8OfSXytYvps4WA"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} montserrat-500`}
      >
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
