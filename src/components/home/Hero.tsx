"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden noise-bg">
      {/* Pokéball Decorative Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0 rounded-full border-2 border-foreground" />
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-foreground" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-foreground" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-foreground" />
      </div>

      {/* Red diagonal accent */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 [clip-path:polygon(0_100%,100%_100%,0_0)]" />

      <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 w-fit mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-red" />
            <span className="text-xs font-sans font-semibold tracking-widest text-primary uppercase">
              Cartas Avulsas &amp; Acessórios
            </span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.9] tracking-wide text-foreground">
            PREÇOS ABAIXO DA
            <br />
            <span className="text-primary">LIGA</span>
          </h1>

          <p className="text-muted text-lg sm:text-xl max-w-xl leading-relaxed mx-auto lg:mx-0">
            Pokémon TCG, Magic: The Gathering e Yu-Gi-Oh! — cartas avulsas selecionadas para colecionar e competir.
            <br /><span className="text-bold">frete grátis acima de R$ 200,00</span>
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2 justify-center lg:justify-start">
            <Link
              href="/produtos"
              className="group relative px-8 py-4 bg-primary text-white font-sans font-bold text-sm uppercase tracking-wider overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
            >
              <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full" />
              <span className="relative flex items-center gap-2">
                Ver Catálogo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/produtos?game=pokemon"
              className="px-8 py-4 border border-border hover:border-primary font-sans font-bold text-sm uppercase tracking-wider text-foreground transition-all hover:bg-primary/5"
            >
              Pokémon TCG
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-8 mt-8 border-t border-border pt-8 max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <span className="block text-sm font-semibold text-foreground">Garantia</span>
                <span className="text-xs text-muted">Carta verificada</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-primary" />
              <div>
                <span className="block text-sm font-semibold text-foreground">Envio Rápido</span>
                <span className="text-xs text-muted">Para todo Brasil</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Logo Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Background glow */}
          <div className="absolute w-80 h-80 rounded-full bg-primary/10 blur-[100px]" />

          {/* Logo container */}
          <div className="relative w-[400px] h-[400px] flex items-center justify-center">
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-border"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
            </motion.div>

            {/* Inner ring */}
            <div className="absolute inset-8 rounded-full border border-border/50" />

            {/* Logo */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Image
                src="/image.png"
                alt="UNAGEEK Store"
                width={260}
                height={260}
                className="drop-shadow-[0_0_40px_rgba(220,38,38,0.15)]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
