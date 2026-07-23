import { latestRelease, upcomingRelease } from "@/data/music";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Press Kit",
  description:
    "Press kit de Reload Souls: bio, logos, covers y links oficiales.",
};

const assets = [
  { label: "Logo", href: "/logo.png", file: "logo.png" },
  { label: "Cover principal", href: "/cover.png", file: "cover.png" },
  { label: "Aurelia cover", href: "/covers/aurelia.png", file: "aurelia.png" },
  { label: "XyZ cover", href: "/covers/xyz.png", file: "xyz.png" },
  { label: "X cover", href: "/covers/x.png", file: "x.png" },
];

export default function PressPage() {
  return (
    <main className="min-h-[100svh] bg-void text-bone">
      <div className="section-pad mx-auto max-w-4xl py-16 sm:py-24">
        <Link
          href="/"
          className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-ash transition hover:text-flare"
        >
          ← Reload Souls
        </Link>

        <header className="mt-10 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-ember">
            Press kit
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Reload Souls
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-mist">
            No es música. Es presión sonora. Techno industrial desde el
            underground digital — kicks pesados, bajo ácido e identidad visual
            forjada en humo y luz.
          </p>
        </header>

        <section className="mt-14 border-t border-white/8 pt-10">
          <h2 className="font-display text-2xl font-semibold">Bio corta</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ash">
            Reload Souls es un proyecto de techno centrado en la presión sonora.
            Entre drops como{" "}
            <span className="text-bone">{latestRelease.title}</span> (ya
            disponible) y el próximo{" "}
            <span className="text-bone">
              {upcomingRelease.title} · {upcomingRelease.artists}
            </span>
            , el sonido cruza lo gótico, lo industrial y el club.
          </p>
        </section>

        <section className="mt-14 border-t border-white/8 pt-10">
          <h2 className="font-display text-2xl font-semibold">Links</h2>
          <ul className="mt-5 space-y-3 font-sans text-sm text-mist">
            <li>
              Site:{" "}
              <a
                href="https://reloadsouls.vercel.app"
                className="text-flare hover:underline"
              >
                reloadsouls.vercel.app
              </a>
            </li>
            <li>
              SoundCloud:{" "}
              <a
                href="https://soundcloud.com/reload_souls"
                target="_blank"
                rel="noopener noreferrer"
                className="text-flare hover:underline"
              >
                soundcloud.com/reload_souls
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a
                href="https://www.instagram.com/reload_souls/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-flare hover:underline"
              >
                @reload_souls
              </a>
            </li>
            <li>
              Aurelia:{" "}
              <a href="/aurelia" className="text-flare hover:underline">
                /aurelia
              </a>
            </li>
            <li>
              XyZ:{" "}
              <a href="/xyz" className="text-flare hover:underline">
                /xyz
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-14 border-t border-white/8 pt-10">
          <h2 className="font-display text-2xl font-semibold">Assets</h2>
          <p className="mt-2 text-sm text-ash">
            Descargá logos y covers para prensa / bookings.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {assets.map((asset) => (
              <li
                key={asset.href}
                className="overflow-hidden border border-white/8 bg-ink/50"
              >
                <div className="relative aspect-square bg-void">
                  <Image
                    src={asset.href}
                    alt={asset.label}
                    fill
                    className="object-contain p-4"
                    sizes="300px"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="font-sans text-sm text-mist">{asset.label}</span>
                  <a
                    href={asset.href}
                    download={asset.file}
                    className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-flare transition hover:text-bone"
                  >
                    Descargar
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
