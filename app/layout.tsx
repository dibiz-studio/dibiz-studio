import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dibiz Studio — Scaling Brands via Content & Tech",
  description: "A content-first creative agency blending strategy, storytelling, and scale.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
  href="https://fonts.googleapis.com/css2?family=Unbounded:wght@600;700;800;900&family=Playfair+Display:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
      </head>
      <body>{children}</body>
    </html>
  );
}
