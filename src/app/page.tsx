import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/components/product/ProductCard";

// Mock Data for MVP
const mockProducts: Product[] = [
  {
    id: "gpu-rtx-5090",
    name: "NVIDIA GeForce RTX 5090 Founders Edition",
    category: "GPU",
    price: 1999.99,
    rating: 4.9,
    image: "/images/mock-gpu.png",
    isNew: true,
    benchmarks: [
      { label: "Cyberpunk 4K", value: "144 FPS" },
      { label: "Boost Clock", value: "2.9 GHz" }
    ]
  },
  {
    id: "cpu-ryzen-9950x3d",
    name: "AMD Ryzen 9 9950X3D 16-Core Processor",
    category: "CPU",
    price: 699.00,
    rating: 4.8,
    image: "/images/mock-cpu.png",
    isNew: true,
    benchmarks: [
      { label: "Cores/Threads", value: "16C/32T" },
      { label: "L3 Cache", value: "128MB" }
    ]
  },
  {
    id: "mb-rog-crosshair",
    name: "ASUS ROG Crosshair X870E Hero",
    category: "Motherboard",
    price: 649.99,
    rating: 4.7,
    image: "/images/mock-mb.png",
    benchmarks: [
      { label: "Socket", value: "AM5" },
      { label: "Power Phase", value: "18+2+2" }
    ]
  },
  {
    id: "ram-gskill-trident",
    name: "G.Skill Trident Z5 Neo RGB 64GB (2x32GB)",
    category: "Memory",
    price: 249.99,
    rating: 4.9,
    image: "/images/mock-ram.png",
    benchmarks: [
      { label: "Speed", value: "DDR5-6000" },
      { label: "Timing", value: "CL30" }
    ]
  }
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24">
      <Hero />
      <div className="w-full bg-black relative">
        {/* Subtle top border illumination */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
        <ProductGrid 
          title="Trending Hardware" 
          subtitle="Top Tier Performance"
          products={mockProducts} 
        />
      </div>
    </main>
  );
}
