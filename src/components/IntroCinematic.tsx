"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "rs-intro-seen";

export default function IntroCinematic() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    setVisible(true);
  }, [reduceMotion]);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [visible]);

  const skip = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={skip}
            className="absolute right-5 top-5 z-10 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-ash transition hover:text-bone"
          >
            Skip
          </button>

          <div className="relative px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(3rem,16vw,7rem)] font-bold tracking-[-0.04em] text-bone"
            >
              RELOAD
            </motion.p>
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.15em" }}
              animate={{ opacity: 1, letterSpacing: "0.55em" }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="mt-2 pl-[0.55em] font-sans text-sm font-light uppercase text-mist"
            >
              Souls
            </motion.p>
            <motion.div
              aria-hidden
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mx-auto mt-6 h-px w-28 origin-center bg-flare"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4, 1, 0] }}
              transition={{ duration: 1.1, delay: 0.7 }}
              className="mt-6 font-sans text-[0.65rem] uppercase tracking-[0.35em] text-flare"
            >
              Presión sonora
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
