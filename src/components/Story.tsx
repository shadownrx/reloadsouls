"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const chapters = [
  {
    label: "El proyecto",
    text: "Reload Souls nace como presión sonora: techno crudo, bajo que atraviesa y una identidad visual forjada en humo, silencio y luz roja.",
  },
  {
    label: "En SoundCloud",
    text: "Los primeros drops — ID, 2AM, 3AM, Midnight Keeps Calling y X — definen el terreno: noche industrial, kicks pesados y cero adorno.",
  },
  {
    label: "XyZ",
    text: "Con Blas llega el capítulo más oscuro: atmósferas góticas, coros y máquina. Un descenso al caos que se estrena el 20 de julio de 2026.",
  },
  {
    label: "Ahora",
    text: "No es música. Es presión sonora. Del underground digital a Spotify y el resto del mundo — el reload no se apaga.",
  },
];

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.15, 0.35, 0.1]);

  return (
    <section
      id="historia"
      ref={ref}
      className="relative overflow-hidden section-pad py-16 sm:py-24 md:py-36"
    >
      <motion.div
        style={{ y: glowY, opacity: glowOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(196,18,47,0.35),transparent_65%)] blur-3xl sm:h-[40rem] sm:w-[40rem]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 sm:gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-ember">
            Manifiesto
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl md:text-5xl">
            Reload Souls
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-mist sm:mt-6 sm:text-lg">
            Techno diseñado para que el bajo te atraviese. Sin adornos: presión,
            noche y el reload que vuelve a encender el cuerpo.
          </p>
        </motion.div>

        <ol className="relative space-y-0 border-l border-copper/30 pl-6 sm:pl-8 md:pl-12">
          {chapters.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative pb-10 last:pb-0 sm:pb-12"
            >
              <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-ember shadow-[0_0_20px_rgba(232,37,69,0.7)] sm:-left-[2.15rem] sm:h-3 sm:w-3 md:-left-[3.15rem]" />
              <p className="font-display text-xl font-semibold text-flare sm:text-2xl md:text-3xl">
                {item.label}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist sm:mt-3 sm:text-base">
                {item.text}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
