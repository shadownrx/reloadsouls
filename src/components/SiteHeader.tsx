"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#proximo", label: "Próximo" },
  { href: "#escuchar", label: "Música" },
  { href: "#releases", label: "Releases" },
  { href: "#historia", label: "Historia" },
  { href: "#plataformas", label: "Plataformas" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-40 section-pad"
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 border-b border-white/5 bg-void/70 py-3 backdrop-blur-md">
        <a
          href="#top"
          className="relative z-50 block shrink-0"
          aria-label="Reload Souls inicio"
          onClick={close}
        >
          <Logo variant="nav" priority />
        </a>

        <nav
          className="hidden items-center gap-6 lg:flex lg:gap-8"
          aria-label="Principal"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-xs uppercase tracking-[0.18em] text-ash transition hover:text-flare"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center border border-white/10 text-bone transition hover:border-flare/50 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar" : "Menú"}</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-current transition duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-full bg-current transition duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-px w-full bg-current transition duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-md lg:hidden"
          >
            <nav
              className="flex h-full flex-col justify-center gap-2 px-8 pt-16"
              aria-label="Móvil"
            >
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.35 }}
                  className="border-b border-white/8 py-4 font-display text-3xl font-semibold tracking-tight text-bone transition hover:text-flare"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
