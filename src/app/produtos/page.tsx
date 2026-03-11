"use client";

import { useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mock-data";
import { GAME_LABELS, type TCGGame, type ProductCategory } from "@/lib/types";

const GAME_FILTERS: { value: TCGGame | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "pokemon", label: "Pokémon" },
  { value: "magic", label: "Magic" },
  { value: "yugioh", label: "Yu-Gi-Oh!" },
];

const CATEGORY_FILTERS: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "card", label: "Cartas" },
  { value: "accessory", label: "Acessórios" },
];

const SORT_OPTIONS = [
  { value: "name", label: "Nome A-Z" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
  { value: "newest", label: "Mais Recentes" },
];

export default function ProdutosPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    }>
      <ProdutosContent />
    </Suspense>
  );
}

function ProdutosContent() {
  const searchParams = useSearchParams();
  const initialGame = (searchParams.get("game") as TCGGame) || "all";
  const initialCategory = (searchParams.get("category") as ProductCategory) || "all";

  const [gameFilter, setGameFilter] = useState<TCGGame | "all">(initialGame);
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">(initialCategory);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    if (gameFilter !== "all") {
      result = result.filter((p) => p.game === gameFilter);
    }
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [gameFilter, categoryFilter, sortBy]);

  const activeFiltersCount =
    (gameFilter !== "all" ? 1 : 0) + (categoryFilter !== "all" ? 1 : 0);

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="border-b border-border bg-surface py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="accent-line mb-4" />
            <h1 className="font-display text-5xl md:text-6xl tracking-wider">
              {gameFilter !== "all"
                ? GAME_LABELS[gameFilter]
                : categoryFilter === "accessory"
                  ? "ACESSÓRIOS"
                  : "CATÁLOGO"}
            </h1>
            <p className="text-muted mt-2">
              {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 border border-border text-sm font-semibold hover:border-primary transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Desktop Game Tabs */}
            <div className="hidden md:flex items-center border border-border overflow-hidden">
              {GAME_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setGameFilter(filter.value)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    gameFilter === filter.value
                      ? "bg-primary text-white"
                      : "text-muted hover:text-foreground hover:bg-surface-light"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Desktop Category Tabs */}
            <div className="hidden md:flex items-center border border-border overflow-hidden">
              {CATEGORY_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setCategoryFilter(filter.value)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    categoryFilter === filter.value
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground hover:bg-surface-light"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Clear filters */}
            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  setGameFilter("all");
                  setCategoryFilter("all");
                }}
                className="flex items-center gap-1 text-xs text-muted hover:text-primary transition-colors"
              >
                <X className="w-3 h-3" /> Limpar
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface border border-border text-sm text-foreground px-3 py-2 focus:outline-none focus:border-primary cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border border-border bg-surface p-4 mb-6 space-y-4"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">Jogo</span>
              <div className="flex flex-wrap gap-2">
                {GAME_FILTERS.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setGameFilter(filter.value)}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                      gameFilter === filter.value
                        ? "bg-primary text-white border-primary"
                        : "border-border text-muted hover:text-foreground"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">Tipo</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_FILTERS.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setCategoryFilter(filter.value)}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                      categoryFilter === filter.value
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted hover:text-foreground"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} className="h-full" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
            <button
              onClick={() => {
                setGameFilter("all");
                setCategoryFilter("all");
              }}
              className="mt-4 text-primary hover:text-primary-light text-sm font-semibold"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
