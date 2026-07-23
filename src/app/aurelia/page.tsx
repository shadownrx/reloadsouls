import { latestRelease, platforms } from "@/data/music";
import ShareButton from "@/components/ShareButton";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const description =
  "Aurelia es luz que rompe la oscuridad. Un single de Reload Souls donde el oro corta la sombra y el bajo no pide permiso.";

export const metadata: Metadata = {
  title: "Aurelia — Reload Souls",
  description,
  openGraph: {
    title: "Reload Souls — Aurelia",
    description,
    images: [latestRelease.cover],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reload Souls — Aurelia",
    description,
    images: [latestRelease.cover],
  },
};

const listenLinks = platforms.filter((p) => p.href);

export default function AureliaPage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-void text-bone">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.16),transparent_50%)]"
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-lg flex-col px-5 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="mb-8 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-ash transition hover:text-flare"
        >
          ← Reload Souls
        </Link>

        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden bg-ink">
          <Image
            src={latestRelease.cover}
            alt={`${latestRelease.artists} — ${latestRelease.title}`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>

        <div className="mt-8 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-ember">
            Ya disponible · {latestRelease.dateShort}
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-bone">
            {latestRelease.title}
          </h1>
          <p className="mt-2 font-display text-lg text-mist">
            {latestRelease.artists}
          </p>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ash">
            {description}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={latestRelease.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-flare/40 bg-ember/25 px-5 py-3.5 text-center font-sans text-xs font-medium uppercase tracking-[0.2em] text-bone transition hover:bg-ember/40"
          >
            Escuchar en SoundCloud
          </a>
          <Link
            href="/#escuchar"
            className="inline-flex min-h-12 items-center justify-center border border-white/15 px-5 py-3.5 text-center font-sans text-xs font-medium uppercase tracking-[0.2em] text-mist transition hover:border-white/30 hover:text-bone"
          >
            Abrir player
          </Link>
          <ShareButton
            title="Reload Souls — Aurelia"
            text={description}
            url="/aurelia"
            label="Compartir Aurelia"
            className="inline-flex min-h-12 items-center justify-center border border-white/15 px-5 py-3.5 text-center font-sans text-xs font-medium uppercase tracking-[0.2em] text-mist transition hover:border-flare/40 hover:text-bone"
          />
        </div>

        <div className="mt-10">
          <p className="mb-4 text-center font-sans text-[0.65rem] uppercase tracking-[0.28em] text-ash">
            También en
          </p>
          <ul className="flex flex-col gap-2">
            {listenLinks.map((platform) => (
              <li key={platform.id}>
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-12 items-center justify-between border border-white/8 bg-ink/50 px-4 py-3 transition hover:border-flare/40"
                >
                  <span className="font-display text-lg font-semibold text-bone group-hover:text-flare">
                    {platform.name}
                  </span>
                  <span className="text-flare">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-auto pt-12 text-center font-sans text-xs text-ash">
          No es música. Es presión sonora.
        </p>
      </div>
    </main>
  );
}
