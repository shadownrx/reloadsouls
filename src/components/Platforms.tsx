"use client";

import { distributionPlatforms, platforms } from "@/data/music";
import { motion } from "framer-motion";

export default function Platforms() {
  return (
    <section id="plataformas" className="relative section-pad py-16 sm:py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-2xl sm:mb-12 md:mb-16"
        >
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-ember">
            Streaming
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl md:text-5xl">
            En todas partes
          </h2>
          <p className="mt-3 text-sm text-mist sm:mt-4 sm:text-base">
            Reload Souls llega a Spotify y al resto de las plataformas. Empezá
            por las principales o explorá el catálogo completo.
          </p>
        </motion.div>

        <ul className="mb-14 flex flex-col sm:mb-20">
          {platforms.map((platform, index) => (
            <motion.li
              key={platform.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.04, 0.35), duration: 0.5 }}
            >
              <a
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-14 items-center justify-between gap-4 border-t border-white/8 py-4 transition last:border-b hover:border-ember/40 sm:min-h-16 sm:py-5"
              >
                <span className="min-w-0 font-display text-xl font-semibold text-bone transition group-hover:text-flare sm:text-2xl md:text-3xl">
                  {platform.name}
                </span>
                <span className="flex shrink-0 items-center gap-3 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-ash transition group-hover:text-mist sm:text-xs sm:tracking-[0.22em]">
                  <span className="hidden md:inline">{platform.label}</span>
                  <span className="text-flare transition duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 font-sans text-xs uppercase tracking-[0.3em] text-ember">
            También disponible en
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {distributionPlatforms.map((name, index) => (
              <motion.li
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.02, 0.4), duration: 0.4 }}
                className="border-t border-white/8 pt-3 font-sans text-sm text-mist"
              >
                {name}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
