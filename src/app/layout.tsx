import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus Gear | Premium Gamer E-commerce",
  description: "High-performance gaming hardware and battle stations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${rajdhani.variable} antialiased bg-background text-foreground selection:bg-primary/30 selection:text-primary min-h-screen relative flex flex-col`}
      >
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
