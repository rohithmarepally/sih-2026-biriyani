import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Procurewise | Procurement dashboard",
  description: "Review bidder compliance and procurement risk."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
