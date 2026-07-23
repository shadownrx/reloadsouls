"use client";

import { tracks, type Track } from "@/data/music";
import { formatPlayCount } from "@/lib/format";
import type { TrackStats } from "@/lib/soundcloud";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type TrackPlayerProps = {
  stats?: Record<string, TrackStats>;
};

export default function TrackPlayer({ stats = {} }: TrackPlayerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Track>(tracks[0]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

  const currentPlays = stats[current.soundcloudId]?.playbackCount;

  useEffect(() => {
    const audio = new Audio(current.src);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
      audioRef.current = null;
    };
  }, [current]);

  useEffect(() => {
    if (!playing) {
      setShowSticky(false);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const updateSticky = () => {
      const rect = section.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.8 && rect.bottom > 80;
      setShowSticky(!visible);
    };

    updateSticky();
    window.addEventListener("scroll", updateSticky, { passive: true });
    window.addEventListener("resize", updateSticky);
    return () => {
      window.removeEventListener("scroll", updateSticky);
      window.removeEventListener("resize", updateSticky);
    };
  }, [playing]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const selectTrack = (track: Track) => {
    if (track.id === current.id) {
      void toggle();
      return;
    }
    setProgress(0);
    setCurrent(track);
    setPlaying(true);
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setProgress(value);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playing) return;
    void audio.play().catch(() => setPlaying(false));
  }, [current, playing]);

  return (
    <>
      <section
        id="escuchar"
        ref={sectionRef}
        className="relative section-pad py-16 sm:py-24 md:py-32"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 sm:mb-12 md:mb-16"
          >
            <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-ember">
              SoundCloud
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl md:text-5xl">
              Tracks
            </h2>
            <p className="mt-3 max-w-xl text-sm text-mist sm:mt-4 sm:text-base">
              Directo desde{" "}
              <a
                href="https://soundcloud.com/reload_souls"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-flare underline-offset-4 transition hover:underline sm:break-normal"
              >
                soundcloud.com/reload_souls
              </a>
              .
            </p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative overflow-hidden border border-white/5 bg-ink/80"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,18,47,0.25),transparent_55%)]" />

              <div className="relative flex flex-col gap-6 p-5 sm:gap-8 sm:p-6 md:p-10">
                <div className="flex items-end gap-4 sm:gap-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={
                        playing
                          ? { opacity: 1, scale: [1, 1.03, 1] }
                          : { opacity: 1, scale: 1 }
                      }
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={
                        playing
                          ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" }
                          : { duration: 0.45 }
                      }
                      className="relative h-28 w-28 shrink-0 overflow-hidden sm:h-36 sm:w-36 md:h-44 md:w-44"
                    >
                      <Image
                        src={current.cover}
                        alt={current.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 112px, 176px"
                      />
                      {playing ? (
                        <span className="pointer-events-none absolute inset-0 ring-2 ring-flare/40 ring-inset" />
                      ) : null}
                    </motion.div>
                  </AnimatePresence>

                  <div className="min-w-0 flex-1 pb-1">
                    <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-ash sm:text-xs">
                      Ahora
                    </p>
                    <h3 className="mt-1 truncate font-display text-2xl font-semibold text-bone sm:mt-2 sm:text-3xl md:text-4xl">
                      {current.title}
                    </h3>
                    <p className="mt-1 text-sm text-mist sm:text-base">
                      {current.artist}
                    </p>
                    {typeof currentPlays === "number" ? (
                      <p className="mt-2 font-sans text-xs uppercase tracking-[0.18em] text-ash">
                        <span className="text-flare">
                          {formatPlayCount(currentPlays)}
                        </span>{" "}
                        reproducciones
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={progress}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none bg-white/10 accent-ember [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-flare sm:h-1 sm:[&::-webkit-slider-thumb]:h-3 sm:[&::-webkit-slider-thumb]:w-3"
                    aria-label="Progreso del track"
                  />
                  <div className="mt-2 flex justify-between font-sans text-xs text-ash">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => void toggle()}
                    className="flex h-12 w-12 items-center justify-center border border-flare/40 bg-ember text-bone transition hover:bg-flare sm:h-14 sm:w-14"
                    aria-label={playing ? "Pausar" : "Reproducir"}
                  >
                    {playing ? (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                        <rect x="3" y="2" width="4" height="14" />
                        <rect x="11" y="2" width="4" height="14" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                        <path d="M4 2.5v13l11-6.5L4 2.5z" />
                      </svg>
                    )}
                  </button>

                  <div className="flex items-end gap-1" aria-hidden>
                    {[0.4, 0.7, 1, 0.55, 0.85, 0.5].map((h, i) => (
                      <motion.span
                        key={i}
                        className="w-1 bg-flare/80"
                        animate={
                          playing
                            ? { height: [8, 8 + h * 22, 10, 8 + h * 18, 8] }
                            : { height: 8 }
                        }
                        transition={
                          playing
                            ? {
                                duration: 0.7 + i * 0.08,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                            : { duration: 0.3 }
                        }
                      />
                    ))}
                  </div>

                  <a
                    href={current.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full font-sans text-[0.65rem] uppercase tracking-[0.2em] text-ash transition hover:text-flare sm:ml-auto sm:w-auto sm:text-xs"
                  >
                    Abrir en SoundCloud →
                  </a>
                </div>
              </div>
            </motion.div>

            <ul className="flex flex-col divide-y divide-white/5 border-y border-white/5">
              {tracks.map((track, index) => {
                const active = track.id === current.id;
                const plays = stats[track.soundcloudId]?.playbackCount;
                return (
                  <motion.li
                    key={track.id}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.5 }}
                  >
                    <button
                      type="button"
                      onClick={() => selectTrack(track)}
                      className={`group flex min-h-16 w-full items-center gap-3 py-4 text-left transition sm:gap-4 sm:py-5 ${
                        active ? "text-flare" : "text-bone hover:text-flare"
                      }`}
                    >
                      <span className="hidden w-6 font-sans text-xs text-ash sm:block">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden sm:h-12 sm:w-12">
                        <Image
                          src={track.cover}
                          alt=""
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="48px"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base font-medium sm:text-lg">
                          {track.title}
                        </span>
                        <span className="block truncate text-sm text-ash">
                          {track.artist}
                          {typeof plays === "number" ? (
                            <>
                              {" · "}
                              <span className={active ? "text-flare/80" : ""}>
                                {formatPlayCount(plays)} plays
                              </span>
                            </>
                          ) : null}
                        </span>
                      </span>
                      <span className="shrink-0 font-sans text-xs text-ash">
                        {track.duration}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showSticky ? (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-void/95 px-4 py-3 backdrop-blur-md sm:px-6"
          >
            <div className="mx-auto flex max-w-6xl items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden">
                <Image
                  src={current.cover}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold text-bone">
                  {current.title}
                </p>
                <p className="truncate text-xs text-ash">{current.artist}</p>
              </div>
              <button
                type="button"
                onClick={() => void toggle()}
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-flare/40 bg-ember text-bone"
                aria-label={playing ? "Pausar" : "Reproducir"}
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="currentColor">
                    <rect x="3" y="2" width="4" height="14" />
                    <rect x="11" y="2" width="4" height="14" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M4 2.5v13l11-6.5L4 2.5z" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
