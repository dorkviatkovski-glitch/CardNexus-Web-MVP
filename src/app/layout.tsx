import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CardNexus Web MVP",
  description:
    "Scalable MVP foundation for card recognition, valuation, and collection management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
