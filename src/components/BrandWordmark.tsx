"use client";

import { motion, useReducedMotion } from "framer-motion";

type BrandWordmarkProps = {
  className?: string;
};

const reloadLetters = "RELOAD".split("");

export default function BrandWordmark({ className = "" }: BrandWordmarkProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`mx-auto flex w-full max-w-4xl flex-col items-center ${className}`}
      animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <h1 className="sr-only">Reload Souls</h1>

      <div className="flex items-end justify-center" aria-hidden>
        {reloadLetters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.1 + index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block overflow-hidden"
          >
            <motion.span
              className="inline-block font-display text-[clamp(3.4rem,14vw,8.5rem)] font-bold leading-none tracking-[-0.04em] text-bone"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -5, 0], rotate: [0, index % 2 === 0 ? -0.6 : 0.6, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 3 + index * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2 + index * 0.1,
                    }
              }
            >
              {letter}
            </motion.span>
          </motion.span>
        ))}
      </div>

      <motion.p
        aria-hidden
        initial={
          reduceMotion ? false : { opacity: 0, letterSpacing: "0.18em", y: 14 }
        }
        animate={
          reduceMotion
            ? { opacity: 1, letterSpacing: "0.55em", y: 0 }
            : {
                opacity: 1,
                y: 0,
                letterSpacing: ["0.42em", "0.68em", "0.42em"],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                opacity: { duration: 0.85, delay: 0.55 },
                y: { duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] },
                letterSpacing: {
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.4,
                },
              }
        }
        className="mt-[0.35em] pl-[0.55em] font-sans text-[clamp(0.7rem,2.4vw,1.15rem)] font-light uppercase text-bone"
      >
        Souls
      </motion.p>

      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none mt-4 h-px w-24 origin-center bg-gradient-to-r from-transparent via-flare/70 to-transparent"
          animate={{ scaleX: [0.55, 1.2, 0.55], opacity: [0.3, 0.95, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </motion.div>
  );
}
