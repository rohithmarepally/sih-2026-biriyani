import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biriyani | Full-stack starter",
  description: "A Next.js and FastAPI full-stack starter project."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
