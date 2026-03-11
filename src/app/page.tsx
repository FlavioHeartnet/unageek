import { Hero } from "@/components/home/Hero";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedCards } from "@/components/home/FeaturedCards";
import { mockProducts } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <CategoryShowcase />
      <FeaturedCards products={mockProducts} />
    </main>
  );
}
