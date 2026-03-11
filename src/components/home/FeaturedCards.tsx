"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

interface FeaturedCardsProps {
  products: Product[];
}

export function FeaturedCards({ products }: FeaturedCardsProps) {
  const featured = products.filter((p) => p.isFeatured);

  return (
    <section className="py-20 md:py-28 bg-surface relative">
      {/* Red top accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <div className="accent-line mb-4" />
            <h2 className="font-display text-4xl md:text-5xl tracking-wider">
              DESTAQUES
            </h2>
            <p className="text-muted mt-2 text-sm">
              As cartas mais procuradas da semana
            </p>
          </div>
          <a
            href="/produtos"
            className="text-sm font-semibold text-primary hover:text-primary-light transition-colors uppercase tracking-wider"
          >
            Ver todas →
          </a>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
