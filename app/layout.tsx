import type { Metadata, Viewport } from "next";
import { NTR } from "next/font/google";
import { resume } from "@/data/resume";
import "./globals.css";

const ntr = NTR({ weight: "400", subsets: ["latin"], variable: "--font-ntr", display: "swap" });

const { name, role, summary } = resume.basics;

export const metadata: Metadata = {
  title: `${name} | ${role}`,
  description: summary,
  openGraph: {
    title: `${name} | ${role}`,
    description: summary,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a192f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ntr.variable}>
      <body className="font-sans">
        {/* Fade-in sections rely on JS; show them immediately when it is unavailable. */}
        <noscript>
          <style>{".fade-in-section{opacity:1;transform:none}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
