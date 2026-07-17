"use client";

import { releases } from "@/data/music";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Releases() {
  return (
    <section id="releases" className="relative section-pad py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14 md:mb-20"
        >
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-ember">
            Discografía
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl md:text-5xl">
            Releases
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 xl:grid-cols-6">
          {releases.map((release, index) => (
            <motion.article
              key={release.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href={release.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden bg-ink">
                  <Image
                    src={release.cover}
                    alt={release.title}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                  {release.highlight ? (
                    <p className="absolute bottom-2 left-2 max-w-[90%] font-sans text-[0.55rem] uppercase leading-tight tracking-[0.14em] text-flare sm:bottom-3 sm:left-3 sm:text-[0.65rem] sm:tracking-[0.2em]">
                      {release.highlight}
                    </p>
                  ) : null}
                </div>
                <div className="mt-3 sm:mt-4">
                  <h3 className="font-display text-base font-semibold leading-snug text-bone transition group-hover:text-flare sm:text-xl">
                    {release.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs text-ash sm:text-sm">
                    {release.type} · {release.year}
                  </p>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
