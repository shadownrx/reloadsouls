"use client";

import { latestRelease, upcomingRelease } from "@/data/music";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import BrandWordmark from "./BrandWordmark";

const Atmosphere = dynamic(() => import("./Atmosphere"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const wordmarkX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const wordmarkY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={reduceMotion ? undefined : { x: wordmarkX, y: wordmarkY }}
          className="w-full"
        >
          <BrandWordmark />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-[18rem] text-balance font-sans text-base text-mist sm:mt-8 sm:max-w-md sm:text-lg md:text-xl"
        >
          No es música. Es presión sonora.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-flare sm:text-xs"
        >
          {latestRelease.title} · Ya disponible · {latestRelease.dateShort}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row"
        >
          <a
            href={latestRelease.listenHref}
            className="group inline-flex min-h-12 items-center gap-3 border border-flare/40 bg-ember/20 px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-bone transition duration-500 hover:border-flare hover:bg-ember/40 sm:px-7 sm:text-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flare opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-flare" />
            </span>
            Escuchar Aurelia
            <span
              aria-hidden
              className="translate-x-0 transition duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
          <a
            href="#proximo"
            className="inline-flex min-h-12 items-center gap-2 border border-white/15 px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-mist transition hover:border-white/30 hover:text-bone sm:text-sm"
          >
            {upcomingRelease.title} · Soon
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: [0, 6, 0] }
        }
        transition={
          reduceMotion
            ? { delay: 1.2, duration: 1 }
            : { delay: 1.2, duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-sans text-[0.65rem] uppercase tracking-[0.35em] text-ash sm:bottom-6"
      >
        Scroll
      </motion.div>
    </section>
  );
}
