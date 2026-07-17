"use client";

import { motion } from "framer-motion";

const NEX_URL = "https://anex-os.vercel.app/nex-music.html";

export default function Sponsor() {
  return (
    <section id="sponsor" className="relative section-pad py-16 sm:py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden border border-white/8 bg-ink/60 px-5 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(196,18,47,0.16),transparent_45%)]"
        />

        <div className="relative flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-ember">
              Sponsor
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl md:text-5xl">
              NEX Music
            </h2>
            <p className="mt-3 text-base leading-relaxed text-mist sm:mt-4 sm:text-lg">
              Si te interesa, podés seguir a nuestro sponsor{" "}
              <span className="text-bone">NEX</span> — plataforma de música,
              listas y salas en vivo.
            </p>
          </div>

          <a
            href={NEX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 border border-flare/40 bg-ember/15 px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-bone transition hover:border-flare hover:bg-ember/35 sm:w-auto sm:text-sm"
          >
            Visitar NEX
            <span
              aria-hidden
              className="transition duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
