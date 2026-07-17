"use client";

import { upcomingRelease } from "@/data/music";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import Logo from "./Logo";

const Atmosphere = dynamic(() => import("./Atmosphere"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden px-5 pb-20 pt-24 sm:px-6 sm:pb-16 sm:pt-28 md:justify-center md:pb-24"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/cover.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] sm:object-center"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-t from-void via-void/65 to-void/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(0,0,0,0.65)_100%)]"
      />

      <Atmosphere />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-1 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <Logo variant="hero" priority />
          <h1 className="sr-only">Reload Souls</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[18rem] text-balance font-sans text-base text-mist sm:mt-8 sm:max-w-md sm:text-lg md:text-xl"
        >
          No es música. Es presión sonora.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-flare sm:text-xs"
        >
          {upcomingRelease.title} · {upcomingRelease.dateShort} ·{" "}
          {upcomingRelease.artists}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row"
        >
          <a
            href="#proximo"
            className="group inline-flex min-h-12 items-center gap-3 border border-flare/40 bg-ember/20 px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-bone transition duration-500 hover:border-flare hover:bg-ember/40 sm:px-7 sm:text-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flare opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-flare" />
            </span>
            XyZ · 20.07
            <span
              aria-hidden
              className="translate-x-0 transition duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
          <a
            href="#escuchar"
            className="inline-flex min-h-12 items-center gap-2 border border-white/15 px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-mist transition hover:border-white/30 hover:text-bone sm:text-sm"
          >
            Escuchar
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-sans text-[0.65rem] uppercase tracking-[0.35em] text-ash sm:bottom-6"
      >
        Scroll
      </motion.div>
    </section>
  );
}
