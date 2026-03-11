"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export function ProductGrid({ title, subtitle, products }: ProductGridProps) {
  return (
    <section className="py-16 md:py-24 container mx-auto px-4 relative">
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          {subtitle && (
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">
              {subtitle}
            </span>
          )}
          <h2 className="font-display text-4xl md:text-5xl tracking-wider text-foreground flex items-center gap-4">
            {title}
            <div className="flex-grow h-px bg-border ml-4 max-w-sm hidden md:block" />
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <ProductCard product={product} className="h-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
