import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PlatformSettingsProvider } from "@/lib/platform-settings";
import { MetricMotion } from "@/components/ui/metric-motion";
import "./globals.css";

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
    default: "WeConnect — AI-Powered Hiring. Verified Talent. Real Growth.",
    template: "%s | WeConnect",
  },
  description:
    "WeConnect is an AI-powered developer talent development and hiring platform. Developers prove ability through assessments, challenges and real projects.",
  icons: {
    icon: "/brand/weconnect-logo.png",
    apple: "/brand/weconnect-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy">
        <PlatformSettingsProvider>
          {children}
          <MetricMotion />
        </PlatformSettingsProvider>
      </body>
    </html>
  );
}
