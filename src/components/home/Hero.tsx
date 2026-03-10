"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, Crosshair } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[100px] mix-blend-screen" />
        
        {/* Tech Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00F0FF08_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00F0FF]" />
            <span className="text-xs font-rajdhani font-semibold tracking-widest text-primary uppercase">Elite Hardware Drop Live</span>
          </div>
          
          <h1 className="font-rajdhani text-5xl sm:text-7xl font-bold uppercase leading-[0.9] tracking-tighter text-foreground drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Unlock <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary filter drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
              Max Frames
            </span>
          </h1>
          
          <p className="text-zinc-400 text-lg sm:text-xl max-w-xl font-light leading-relaxed">
            Stop guessing compatibility. We don't just sell parts; we sell the exact frames-per-second and thermal efficiency required for elite play.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link 
              href="/builds" 
              className="group relative px-8 py-4 bg-primary text-black font-rajdhani font-bold text-lg uppercase tracking-wider overflow-hidden rounded-sm transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
            >
              <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-20" />
              <span className="relative flex items-center gap-2">
                Start Rig Builder <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="/catalog" 
              className="px-8 py-4 border border-zinc-700 hover:border-secondary font-rajdhani font-bold text-lg uppercase tracking-wider text-white transition-all hover:bg-secondary/10 hover:shadow-[0_0_20px_rgba(157,0,255,0.3)] rounded-sm"
            >
              Browse Parts
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-8 border-t border-white/10 pt-8 max-w-md">
            <div className="flex flex-col gap-1">
              <Cpu className="w-6 h-6 text-primary mb-1" />
              <span className="font-rajdhani font-bold text-2xl text-white">100%</span>
              <span className="text-xs text-zinc-500 uppercase tracking-wider">Compatibility Guarantee</span>
            </div>
            <div className="flex flex-col gap-1">
              <Zap className="w-6 h-6 text-secondary mb-1" />
              <span className="font-rajdhani font-bold text-2xl text-white">&lt; 24h</span>
              <span className="text-xs text-zinc-500 uppercase tracking-wider">Rapid Dispatch</span>
            </div>
          </div>
        </motion.div>

        {/* Visual/Image Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:block h-[600px] w-full"
        >
          {/* Abstract Hardware Representation */}
          <div className="absolute inset-0 border border-primary/20 rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm shadow-[0_0_50px_rgba(0,240,255,0.1)] group">
            <div className="absolute top-4 left-4 font-rajdhani text-xs text-primary/70 uppercase tracking-widest">SYS_DIAGNOSTIC // ACTIVE</div>
            
            {/* Center object simulating a GPU/Motherboard component */}
            <motion.div 
              animate={{ rotateY: [0, 5, -5, 0], rotateX: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border border-primary/30 bg-gradient-to-br from-black to-zinc-900 shadow-[inset_0_0_20px_rgba(0,240,255,0.1)] flex flex-col justify-between p-4 transform-gpu preserve-3d"
            >
              <div className="w-full h-8 border-b border-primary/20 flex gap-2">
                <div className="h-full w-2 bg-primary/40" />
                <div className="h-full w-2 bg-primary/40" />
                <div className="h-full w-2 bg-primary/40" />
                <div className="h-full w-2 border border-primary/40" />
              </div>

              {/* Glowing center chip */}
              <div className="self-center w-32 h-32 border-2 border-secondary/50 rounded-sm relative shadow-[0_0_30px_rgba(157,0,255,0.3)] bg-black flex items-center justify-center">
                <div className="absolute inset-2 border border-primary/30" />
                <img src="/next.svg" alt="Core" className="w-12 h-12 invert opacity-50" />
              </div>

              <div className="w-full grid grid-cols-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-zinc-800 border border-zinc-700" />
                ))}
              </div>
            </motion.div>

            {/* Decorative Overlay UI */}
             <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] text-primary/10 animate-spin-slow" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
