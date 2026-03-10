"use client";

import { motion } from "framer-motion";
import { ProductCard, type Product } from "./ProductCard";

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export function ProductGrid({ title, subtitle, products }: ProductGridProps) {
  return (
    <section className="py-16 md:py-24 container mx-auto px-4 relative">
      {/* Decorative vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />
      
      <div className="mb-12 md:pl-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          {subtitle && (
            <span className="font-rajdhani text-sm font-bold text-secondary uppercase tracking-[0.2em]">
              {subtitle}
            </span>
          )}
          <h2 className="font-rajdhani text-4xl md:text-5xl font-bold uppercase tracking-tight text-white flex items-center gap-4">
             {title}
             <div className="flex-grow h-px bg-zinc-800 ml-4 max-w-sm hidden md:block" />
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
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} className="h-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
