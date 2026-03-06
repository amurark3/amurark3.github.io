import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aditya Murarka | Software Engineer",
  description: "Futuristic portfolio of Aditya Murarka, Software Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "'Geist', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
