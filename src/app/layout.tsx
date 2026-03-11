import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const nowFont = localFont({
  src: [
    {
      path: "../fonts/now/Now-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/now/Now-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-now",
  display: "swap",
});

const aileronFont = localFont({
  src: [
    {
      path: "../fonts/aileron/Aileron-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/aileron/Aileron-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/aileron/Aileron-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-aileron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UNAGEEK Store | Cartas TCG & Acessórios",
  description:
    "Loja especializada em cartas avulsas de Pokémon TCG, Magic: The Gathering, Yu-Gi-Oh! e acessórios. Encontre as melhores cartas para sua coleção.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${nowFont.variable} ${aileronFont.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <CartProvider>
            <Header />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
