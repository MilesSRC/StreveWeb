import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const monster = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreveHost",
  description: "A simple hosting service meant for developers to strive on.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={monster.className}>{children}</body>
    </html>
  );
}
