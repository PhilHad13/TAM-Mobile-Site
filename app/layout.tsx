import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TAM Client Valuation",
  description: "Mobile portfolio summary preview using demonstration data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
