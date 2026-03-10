"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, Zap } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  category: "GPU" | "CPU" | "Motherboard" | "Memory" | "Cooling";
  price: number;
  rating: number;
  image: string;
  benchmarks: {
    label: string;
    value: string;
  }[];
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "group relative bg-zinc-900/50 border border-zinc-800 hover:border-primary/50 rounded-sm overflow-hidden transition-colors flex flex-col",
        className
      )}
    >
      {/* Tech corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-800 group-hover:bg-primary/20 transition-colors [clip-path:polygon(100%_0,0_0,100%_100%)] z-10" />
      
      {product.isNew && (
        <div className="absolute top-3 left-3 z-10 font-rajdhani text-[10px] font-bold text-black bg-primary px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-[0_0_10px_rgba(0,240,255,0.4)]">
          New Arrival
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square p-6 flex flex-col items-center justify-center bg-zinc-950/50 overflow-hidden">
        {/* Subtle grid background for the image area */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem]" />
        
        {/* Mock Product Image */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
            {/* Fallback visual for MVP since we don't have real product images */}
           <div className="w-16 h-16 sm:w-24 sm:h-24 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <div className="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-600 rounded-lg border border-zinc-600 shadow-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-zinc-400 group-hover:text-primary transition-colors" />
                </div>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow gap-4 border-t border-zinc-800 group-hover:border-primary/20 transition-colors">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-rajdhani uppercase tracking-widest text-zinc-500">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span className="text-xs font-mono text-zinc-400">{product.rating}</span>
            </div>
          </div>
          <h3 className="font-rajdhani text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Benchmarks / Specs (The "Performance first" aspect) */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {product.benchmarks.map((bench, i) => (
            <div key={i} className="bg-black/40 border border-zinc-800/80 rounded pl-2 pr-1 py-1 flex justify-between items-center group-hover:border-zinc-700 transition-colors">
              <span className="text-[10px] text-zinc-500 uppercase font-rajdhani">{bench.label}</span>
              <span className="text-xs font-mono text-primary font-bold">{bench.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-rajdhani text-2xl font-bold tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          <button className="w-10 h-10 rounded-sm bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-black transition-all group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
