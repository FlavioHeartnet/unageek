"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingCart, Shield, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { mockProducts } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";
import { GAME_LABELS, RARITY_LABELS, CONDITION_LABELS } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = mockProducts.find((p) => p.id === productId);
  const { addItem } = useCart();

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="font-display text-4xl tracking-wider">PRODUTO NÃO ENCONTRADO</h1>
        <Link href="/produtos" className="text-primary hover:text-primary-light text-sm font-semibold">
          ← Voltar ao Catálogo
        </Link>
      </main>
    );
  }

  const relatedProducts = mockProducts
    .filter((p) => p.game === product.game && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Catálogo
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-surface border border-border flex items-center justify-center relative overflow-hidden">
              {/* Subtle grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]" />

              {/* Red corner accent */}
              <div className="absolute top-0 left-0 w-16 h-[2px] bg-primary" />
              <div className="absolute top-0 left-0 h-16 w-[2px] bg-primary" />
              <div className="absolute bottom-0 right-0 w-16 h-[2px] bg-primary" />
              <div className="absolute bottom-0 right-0 h-16 w-[2px] bg-primary" />

              {/* Card Placeholder */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative z-10 w-48 h-72 bg-gradient-to-br from-surface-light to-border rounded-lg border border-border-light flex flex-col items-center justify-center gap-3 shadow-[0_0_40px_rgba(220,38,38,0.08)]"
              >
                <span className="text-5xl opacity-60">
                  {product.game === "pokemon" ? "⚡" : product.game === "magic" ? "✦" : "◆"}
                </span>
                <span className="text-xs text-muted uppercase tracking-wider text-center px-4 leading-tight">
                  {product.name}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Game Badge */}
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {GAME_LABELS[product.game]}
            </span>

            {/* Name */}
            <h1 className="font-display text-4xl md:text-5xl tracking-wider leading-tight">
              {product.name}
            </h1>

            {/* Pokéball divider */}
            <div className="pokeball-divider" />

            {/* Description */}
            <p className="text-muted leading-relaxed">{product.description}</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
              {product.set && (
                <div className="bg-surface border border-border p-3">
                  <span className="text-[10px] text-muted uppercase tracking-wider block mb-1">Coleção</span>
                  <span className="text-sm font-semibold">{product.set}</span>
                </div>
              )}
              {product.rarity && (
                <div className="bg-surface border border-border p-3">
                  <span className="text-[10px] text-muted uppercase tracking-wider block mb-1">Raridade</span>
                  <span className="text-sm font-semibold">{RARITY_LABELS[product.rarity]}</span>
                </div>
              )}
              {product.condition && (
                <div className="bg-surface border border-border p-3">
                  <span className="text-[10px] text-muted uppercase tracking-wider block mb-1">Condição</span>
                  <span className="text-sm font-semibold">{CONDITION_LABELS[product.condition]}</span>
                </div>
              )}
              {product.language && (
                <div className="bg-surface border border-border p-3">
                  <span className="text-[10px] text-muted uppercase tracking-wider block mb-1">Idioma</span>
                  <span className="text-sm font-semibold">{product.language}</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-2">
              {product.originalPrice && (
                <span className="text-lg text-muted line-through">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="font-display text-5xl tracking-wide text-foreground">
                R$ {product.price.toFixed(2)}
              </span>
            </div>

            {/* Installments */}
            <p className="text-sm text-muted">
              ou 3x de R$ {(product.price / 3).toFixed(2)} sem juros
            </p>

            {/* Add to cart */}
            <button
              onClick={() => addItem(product)}
              className="group w-full py-4 bg-primary text-white font-sans font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Adicionar ao Carrinho
            </button>

            {/* Trust */}
            <div className="flex items-center gap-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Shield className="w-4 h-4 text-primary" />
                Carta verificada
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Package className="w-4 h-4 text-primary" />
                Embalagem protetora
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border bg-surface py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="accent-line mb-3" />
                <h2 className="font-display text-3xl tracking-wider">RELACIONADOS</h2>
              </div>
              <Link
                href={`/produtos?game=${product.game}`}
                className="text-sm text-primary hover:text-primary-light font-semibold uppercase tracking-wider"
              >
                Ver mais →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <ProductCard product={p} className="h-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
