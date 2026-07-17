"use client";

import { upcomingRelease } from "@/data/music";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function getDaysLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function UpcomingRelease() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    setDaysLeft(getDaysLeft(new Date(upcomingRelease.releaseAt)));
  }, []);

  return (
    <section
      id="proximo"
      ref={ref}
      className="relative overflow-hidden border-y border-white/5 section-pad py-16 sm:py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(196,18,47,0.18),transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 sm:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md sm:max-w-none"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-ink md:aspect-[4/5] lg:aspect-square">
            <motion.div style={{ y: imageY }} className="absolute inset-0">
              <Image
                src={upcomingRelease.cover}
                alt={`${upcomingRelease.artists} — ${upcomingRelease.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 z-10 font-sans text-[0.65rem] uppercase tracking-[0.28em] text-flare sm:bottom-5 sm:left-5">
              Próximo estreno
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-ember">
            Coming soon
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl md:text-6xl">
            {upcomingRelease.title}
          </h2>
          <p className="mt-2 font-display text-lg text-mist sm:mt-3 sm:text-xl md:text-2xl">
            {upcomingRelease.artists}
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-mist sm:mt-6 sm:text-base">
            {upcomingRelease.description}
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ash sm:mt-6 sm:text-lg">
            Se estrena el{" "}
            <span className="text-bone">{upcomingRelease.dateLabel}</span>.
            {daysLeft !== null && daysLeft > 0 ? (
              <>
                {" "}
                Faltan{" "}
                <span className="text-flare">
                  {daysLeft === 1 ? "1 día" : `${daysLeft} días`}
                </span>
                .
              </>
            ) : null}
            {daysLeft === 0 ? (
              <>
                {" "}
                <span className="text-flare">Ya disponible</span>.
              </>
            ) : null}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={upcomingRelease.href}
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-flare/40 bg-ember/20 px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-bone transition hover:border-flare hover:bg-ember/40 sm:text-sm"
            >
              Smart link XyZ
              <span aria-hidden>→</span>
            </a>
            <a
              href={upcomingRelease.notifyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/15 px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-mist transition hover:border-white/30 hover:text-bone sm:text-sm"
            >
              Avisame en Instagram
            </a>
            <a
              href={upcomingRelease.calendarHref}
              download="reload-souls-xyz.ics"
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/15 px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-mist transition hover:border-white/30 hover:text-bone sm:text-sm"
            >
              Calendario
            </a>
            <p className="text-center font-sans text-xs uppercase tracking-[0.22em] text-ash sm:ml-2 sm:text-left">
              {upcomingRelease.dateShort}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
