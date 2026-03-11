"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    game: "pokemon",
    title: "POKÉMON TCG",
    subtitle: "Cartas avulsas e seladas",
    description: "Charizard, Pikachu, Mewtwo e mais. Do básico ao competitivo.",
    accent: "border-primary",
    hoverBg: "hover:bg-primary/5",
    icon: "⚡",
  },
  {
    game: "magic",
    title: "MAGIC: THE GATHERING",
    subtitle: "Standard, Modern & Commander",
    description: "Encontre as peças que faltam no seu deck. Cartas de todas as coleções.",
    accent: "border-foreground",
    hoverBg: "hover:bg-foreground/5",
    icon: "✦",
  },
  {
    game: "yugioh",
    title: "YU-GI-OH!",
    subtitle: "TCG & OCG",
    description: "Staples, tech cards e colecionáveis. Estoque atualizado semanalmente.",
    accent: "border-primary",
    hoverBg: "hover:bg-primary/5",
    icon: "◆",
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="accent-line mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl tracking-wider">
            ESCOLHA SEU <span className="text-primary">JOGO</span>
          </h2>
          <p className="text-muted mt-3 text-sm uppercase tracking-widest">
            Cartas selecionadas dos maiores TCGs do mundo
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.game}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={`/produtos?game=${cat.game}`}>
                <div
                  className={`group relative h-72 border ${cat.accent} border-opacity-20 bg-surface p-8 flex flex-col justify-between ${cat.hoverBg} transition-all duration-300 overflow-hidden card-hover-glow`}
                >
                  {/* Background Icon */}
                  <span className="absolute top-4 right-6 text-6xl opacity-[0.04] group-hover:opacity-[0.08] transition-opacity font-display">
                    {cat.icon}
                  </span>

                  {/* Top corner accent */}
                  <div className="absolute top-0 left-0 w-12 h-[2px] bg-primary group-hover:w-20 transition-all duration-500" />
                  <div className="absolute top-0 left-0 h-12 w-[2px] bg-primary group-hover:h-20 transition-all duration-500" />

                  <div>
                    <span className="text-xs text-muted uppercase tracking-widest">
                      {cat.subtitle}
                    </span>
                    <h3 className="font-display text-3xl tracking-wider mt-2 group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-muted text-sm mb-4">{cat.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                      Ver cartas <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
