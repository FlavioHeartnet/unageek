"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { GAME_LABELS, RARITY_LABELS, type Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const gameColors: Record<string, string> = {
  pokemon: "text-primary",
  magic: "text-foreground",
  yugioh: "text-primary",
};

const rarityBg: Record<string, string> = {
  common: "bg-border text-muted",
  uncommon: "bg-border-light text-foreground",
  rare: "bg-primary/20 text-primary",
  "ultra-rare": "bg-primary/30 text-primary",
  "secret-rare": "bg-primary text-white",
  mythic: "bg-foreground text-background",
};

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group relative bg-surface border border-border hover:border-primary/40 overflow-hidden transition-all duration-300 flex flex-col card-hover-glow",
        className
      )}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span className="badge-rarity bg-primary text-white">Novo</span>
        )}
        {product.originalPrice && (
          <span className="badge-rarity bg-foreground text-background">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Image Container */}
      <Link href={`/produto/${product.id}`}>
        <div className="relative aspect-square p-6 flex items-center justify-center bg-surface-light overflow-hidden cursor-pointer">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

          {product.image ? (
            <div className="relative z-10 w-28 h-40 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.1)] transition-all duration-500">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-lg"
                sizes="(max-width: 768px) 112px, 112px"
              />
            </div>
          ) : (
            <div className="relative z-10 w-28 h-40 bg-gradient-to-br from-surface to-border rounded-lg border border-border-light flex flex-col items-center justify-center gap-2 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.1)] transition-all duration-500">
              <span className="text-3xl opacity-60">{product.game === "pokemon" ? "⚡" : product.game === "magic" ? "✦" : "◆"}</span>
              <span className="text-[9px] text-muted uppercase tracking-wider text-center px-2 leading-tight">{product.name}</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow gap-3 border-t border-border">
        {/* Game & Rarity */}
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-semibold uppercase tracking-widest ${gameColors[product.game] || "text-muted"}`}>
            {GAME_LABELS[product.game]}
          </span>
          {product.rarity && (
            <span className={`badge-rarity ${rarityBg[product.rarity] || "bg-border text-muted"}`}>
              {RARITY_LABELS[product.rarity]}
            </span>
          )}
        </div>

        {/* Name */}
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-sans text-sm font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Details */}
        {product.set && (
          <span className="text-[11px] text-muted">{product.set}</span>
        )}

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-muted line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-display text-2xl tracking-wide">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => addItem(product)}
            className="w-10 h-10 bg-surface-light border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
