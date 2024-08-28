import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "eriberdy.me",
    template: "%s | eriberdy.me",
  },
  description: "Co-founder of Smartess and software engineer",
  openGraph: {
    title: "chronark.com",
    description:
      "Co-founder of Smartess and software engineer",
    url: "https://eriberdy.me",
    siteName: "eriberdy.me",
    images: [
      {
        url: "https://eriberdy.me/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Chronark",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable, 'dark'].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
