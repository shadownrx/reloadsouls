import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="section-pad border-t border-white/5 py-8 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Logo variant="footer" />
        <p className="flex flex-wrap gap-x-2 gap-y-1 font-sans text-sm text-ash">
          <span>© {new Date().getFullYear()}</span>
          <span aria-hidden>·</span>
          <span>Techno</span>
          <span aria-hidden>·</span>
          <a
            href="https://open.spotify.com/search/Reload%20Souls"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-flare"
          >
            Spotify
          </a>
          <span aria-hidden>·</span>
          <a
            href="https://soundcloud.com/reload_souls"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-flare"
          >
            SoundCloud
          </a>
          <span aria-hidden>·</span>
          <a
            href="https://www.instagram.com/reload_souls/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-flare"
          >
            Instagram
          </a>
          <span aria-hidden>·</span>
          <a href="/press" className="transition hover:text-flare">
            Press
          </a>
          <span aria-hidden>·</span>
          <a
            href="https://anex-os.vercel.app/nex-music.html"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-flare"
          >
            NEX
          </a>
        </p>
      </div>
    </footer>
  );
}
