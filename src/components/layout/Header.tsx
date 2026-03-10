"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-sm rotate-45 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            <div className="w-4 h-4 bg-background -rotate-45" />
          </div>
          <span className="font-rajdhani text-2xl font-bold tracking-widest uppercase text-foreground group-hover:text-primary transition-colors">
            Nexus<span className="text-primary group-hover:text-secondary transition-colors">Gear</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/catalog" className="font-rajdhani font-semibold tracking-wide text-sm uppercase hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
            Hardware
          </Link>
          <Link href="/builds" className="font-rajdhani font-semibold tracking-wide text-sm uppercase text-secondary hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(157,0,255,0.8)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-secondary hover:after:w-full after:transition-all">
            Rig Builder
          </Link>
          <Link href="/stations" className="font-rajdhani font-semibold tracking-wide text-sm uppercase hover:text-primary transition-colors">
            Battle Stations
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:text-primary transition-colors hover:bg-primary/10 rounded-full" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:text-primary transition-colors hover:bg-primary/10 rounded-full relative group" aria-label="Cart">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(157,0,255,1)] group-hover:animate-ping" />
          </button>
          <button className="p-2 hover:text-primary transition-colors hover:bg-primary/10 rounded-full hidden sm:block" aria-label="Account">
            <User className="w-5 h-5" />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="p-2 md:hidden hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (simplified for MVP) */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-primary/20 p-4 flex flex-col gap-4 shadow-2xl"
        >
          <Link href="/catalog" className="font-rajdhani text-lg uppercase">Hardware</Link>
          <Link href="/builds" className="font-rajdhani text-lg uppercase text-secondary">Rig Builder</Link>
          <Link href="/stations" className="font-rajdhani text-lg uppercase">Battle Stations</Link>
        </motion.div>
      )}
    </header>
  );
}
