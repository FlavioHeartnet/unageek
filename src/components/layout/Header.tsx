"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/produtos?game=pokemon", label: "Pokémon" },
  { href: "/produtos?game=magic", label: "Magic" },
  { href: "/produtos?game=yugioh", label: "Yu-Gi-Oh!" },
  { href: "/produtos?category=accessory", label: "Acessórios" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCart();
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logounageek.jpeg"
            alt="UNAGEEK Store"
            width={40}
            height={40}
            className="rounded-full group-hover:scale-105 transition-transform duration-300 dark:invert-0 invert"
          />
          <span className="font-display text-2xl tracking-wider text-foreground group-hover:text-primary transition-colors">
            UNAGEEK
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-sans text-sm font-medium uppercase tracking-widest text-muted hover:text-foreground transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-muted hover:text-foreground transition-colors rounded-full hover:bg-surface-light"
              aria-label={theme === "dark" ? "Tema claro" : "Tema escuro"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}

          <button
            className="p-2 text-muted hover:text-foreground transition-colors rounded-full hover:bg-surface-light"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            href="/checkout"
            className="p-2 text-muted hover:text-foreground transition-colors rounded-full hover:bg-surface-light relative"
            aria-label="Carrinho"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-red">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 md:hidden text-muted hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-surface"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 font-sans text-sm uppercase tracking-widest text-muted hover:text-foreground hover:bg-surface-light rounded transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
