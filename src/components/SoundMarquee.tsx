"use client";

import { tracks } from "@/data/music";
import { motion, useReducedMotion } from "framer-motion";

export default function SoundMarquee() {
  const reduceMotion = useReducedMotion();
  const items = [
    ...tracks.map((t) => t.title),
    "No es música",
    "Es presión sonora",
    "Reload Souls",
  ];
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-ink/40 py-3">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-void to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-void to-transparent"
      />

      <motion.div
        className="flex w-max gap-8 whitespace-nowrap px-4 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-ash"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 40, repeat: Infinity, ease: "linear" }
        }
      >
        {row.map((label, index) => (
          <span key={`${label}-${index}`} className="flex items-center gap-8">
            <span className="text-mist">{label}</span>
            <span className="text-flare/60">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
