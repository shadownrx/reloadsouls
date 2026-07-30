export type Track = {
  id: string;
  soundcloudId: string;
  title: string;
  artist: string;
  duration: string;
  src: string;
  cover: string;
  href: string;
};

export type Release = {
  id: string;
  title: string;
  type: "Single" | "EP" | "Album" | "Mashup";
  year: string;
  cover: string;
  href: string;
  highlight?: string;
};

export type UpcomingRelease = {
  title: string;
  artists: string;
  dateLabel: string;
  dateShort: string;
  releaseAt: string | null;
  status: "scheduled" | "delayed";
  description: string;
  cover: string;
  href: string;
  notifyHref: string;
  calendarHref?: string;
};

export const upcomingRelease: UpcomingRelease = {
  title: "Ignition",
  artists: "Reload Souls x Milagro",
  dateLabel: "Próximamente",
  dateShort: "Soon",
  releaseAt: null,
  status: "scheduled",
  description:
    '"Ignition" is a cinematic journey through powerful melodies, deep atmospheres and progressive energy. Built around emotional tension and a powerful release, the track blends Progressive House and Melodic Techno influences to create an immersive experience designed for the dancefloor.\n\nFrom the first moments, the track builds a world of intensity and anticipation, leading into a powerful drop where emotion meets energy.\n\nA new chapter begins.',
  cover: "/covers/ignition.png",
  href: "/ignition",
  notifyHref: "https://www.instagram.com/reload_souls/",
};

/** Collab retrasada — smart link /xyz */
export const xyzRelease: UpcomingRelease = {
  title: "XyZ",
  artists: "Reload Souls x Blas",
  dateLabel: "Próximamente",
  dateShort: "Soon",
  releaseAt: null,
  status: "delayed",
  description:
    "XyZ es un descenso al caos. Una fusión de atmósferas góticas, coros oscuros y energía industrial donde lo sagrado colisiona con la máquina. Kicks devastadores, bajos ácidos y una intensidad sin límites definen el sonido más oscuro de Reload Souls. El estreno se retrasó — avisamos cuando caiga.",
  cover: "/covers/xyz.png",
  href: "/xyz",
  notifyHref: "https://www.instagram.com/reload_souls/",
};

export type LatestRelease = {
  title: string;
  artists: string;
  dateLabel: string;
  dateShort: string;
  cover: string;
  href: string;
  listenHref: string;
};

export const latestRelease: LatestRelease = {
  title: "TMZA",
  artists: "Reload Souls",
  dateLabel: "26 de julio de 2026",
  dateShort: "26.07.2026",
  cover: "/covers/tmza.jpg",
  href: "https://soundcloud.com/reload_souls/reload-souls-tmza",
  listenHref: "/tmza",
};

export type Platform = {
  id: string;
  name: string;
  href?: string;
  label?: string;
};

const art = (url: string) => url.replace("-large.", "-t500x500.");

export const tracks: Track[] = [
  {
    id: "tmza",
    soundcloudId: "2368047017",
    title: "TMZA",
    artist: "Reload Souls",
    duration: "5:29",
    src: "/api/soundcloud/stream/2368047017",
    cover: "/covers/tmza.jpg",
    href: "https://soundcloud.com/reload_souls/reload-souls-tmza",
  },
  {
    id: "aurelia",
    soundcloudId: "2364918044",
    title: "Aurelia",
    artist: "Reload Souls",
    duration: "4:06",
    src: "/api/soundcloud/stream/2364918044",
    cover: "/covers/aurelia.png",
    href: "https://soundcloud.com/reload_souls/aurelia",
  },
  {
    id: "x",
    soundcloudId: "2361433835",
    title: "X",
    artist: "Reload Souls",
    duration: "3:19",
    src: "/api/soundcloud/stream/2361433835",
    cover: "/covers/x.png",
    href: "https://soundcloud.com/reload_souls/x",
  },
  {
    id: "midnight-keeps-calling",
    soundcloudId: "2283449927",
    title: "Midnight Keeps Calling",
    artist: "Reload Souls",
    duration: "4:11",
    src: "/api/soundcloud/stream/2283449927",
    cover: art(
      "https://i1.sndcdn.com/artworks-01ScPqjltIkmEqmb-9HKRFg-large.png",
    ),
    href: "https://soundcloud.com/reload_souls/reload-souls-midnight-keeps",
  },
  {
    id: "id-reload-mashup",
    soundcloudId: "2278491194",
    title: "ID (Reload Mashup)",
    artist: "Reload Souls",
    duration: "3:54",
    src: "/api/soundcloud/stream/2278491194",
    cover: art(
      "https://i1.sndcdn.com/artworks-ZryNlBsSCdSJPVNU-mQyBvg-large.png",
    ),
    href: "https://soundcloud.com/reload_souls/reload-souls-id-reload-mashup",
  },
  {
    id: "2am",
    soundcloudId: "2277696752",
    title: "2AM",
    artist: "Reload Souls",
    duration: "3:40",
    src: "/api/soundcloud/stream/2277696752",
    cover: art(
      "https://i1.sndcdn.com/artworks-lgAjR0fobQAStjUI-Jz7TWA-large.png",
    ),
    href: "https://soundcloud.com/reload_souls/2am-reload-souls",
  },
  {
    id: "3am",
    soundcloudId: "2277115475",
    title: "3AM",
    artist: "Reload Souls",
    duration: "3:19",
    src: "/api/soundcloud/stream/2277115475",
    cover: art(
      "https://i1.sndcdn.com/artworks-uDplEvzP76kf4VF8-c5sn6w-large.png",
    ),
    href: "https://soundcloud.com/reload_souls/3am",
  },
  {
    id: "id",
    soundcloudId: "2275817600",
    title: "ID",
    artist: "Reload Souls",
    duration: "2:47",
    src: "/api/soundcloud/stream/2275817600",
    cover: art(
      "https://i1.sndcdn.com/artworks-f712HassG0SLFxtT-xAXeJQ-large.png",
    ),
    href: "https://soundcloud.com/reload_souls/id-reload_souls",
  },
];

export const releases: Release[] = [
  {
    id: "r-tmza",
    title: "TMZA",
    type: "Single",
    year: "2026",
    cover: tracks[0].cover,
    href: tracks[0].href,
    highlight: "Último lanzamiento",
  },
  {
    id: "r-aurelia",
    title: "Aurelia",
    type: "Single",
    year: "2026",
    cover: tracks[1].cover,
    href: tracks[1].href,
  },
  {
    id: "r0",
    title: "X",
    type: "Single",
    year: "2026",
    cover: tracks[2].cover,
    href: tracks[2].href,
  },
  {
    id: "r1",
    title: "Midnight Keeps Calling",
    type: "Single",
    year: "2026",
    cover: tracks[3].cover,
    href: tracks[3].href,
  },
  {
    id: "r2",
    title: "ID (Reload Mashup)",
    type: "Mashup",
    year: "2026",
    cover: tracks[4].cover,
    href: tracks[4].href,
  },
  {
    id: "r3",
    title: "2AM",
    type: "Single",
    year: "2026",
    cover: tracks[5].cover,
    href: tracks[5].href,
  },
  {
    id: "r4",
    title: "3AM",
    type: "Single",
    year: "2026",
    cover: tracks[6].cover,
    href: tracks[6].href,
  },
  {
    id: "r5",
    title: "ID",
    type: "Single",
    year: "2026",
    cover: tracks[7].cover,
    href: tracks[7].href,
  },
];

/** Plataformas principales con link directo o búsqueda */
export const platforms: Platform[] = [
  {
    id: "spotify",
    name: "Spotify",
    href: "https://open.spotify.com/search/Reload%20Souls",
    label: "Escuchar en Spotify",
  },
  {
    id: "apple",
    name: "Apple Music",
    href: "https://music.apple.com/search?term=Reload%20Souls",
    label: "Abrir en Apple Music",
  },
  {
    id: "youtube",
    name: "YouTube Music",
    href: "https://music.youtube.com/search?q=Reload%20Souls",
    label: "Ver en YouTube Music",
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    href: "https://soundcloud.com/reload_souls",
    label: "Escuchar en SoundCloud",
  },
  {
    id: "amazon",
    name: "Amazon Music",
    href: "https://music.amazon.com/search/Reload%20Souls",
    label: "Buscar en Amazon Music",
  },
  {
    id: "deezer",
    name: "Deezer",
    href: "https://www.deezer.com/search/Reload%20Souls",
    label: "Escuchar en Deezer",
  },
  {
    id: "tidal",
    name: "Tidal",
    href: "https://tidal.com/search?q=Reload%20Souls",
    label: "Escuchar en Tidal",
  },
  {
    id: "tiktok",
    name: "TikTok",
    href: "https://www.tiktok.com/search?q=Reload%20Souls",
    label: "Buscar en TikTok",
  },
  {
    id: "instagram",
    name: "Facebook & Instagram",
    href: "https://www.instagram.com/reload_souls/",
    label: "Seguir en Instagram",
  },
];

/** Catálogo completo de distribución (disponibilidad) */
export const distributionPlatforms: string[] = [
  "Amazon Music",
  "AMI Entertainment",
  "Anghami",
  "Apple Music",
  "Boomplay",
  "Deezer",
  "Facebook & Instagram",
  "iHeartRadio",
  "Claro Música",
  "JOOX",
  "KKBox",
  "MediaNet",
  "Melon Plus",
  "NetEase",
  "Pandora Plus",
  "Peloton",
  "Qobuz",
  "Saavn",
  "7digital",
  "Sound Exchange",
  "Spotify",
  "Tencent",
  "Tidal",
  "TikTok",
  "VK",
  "Yandex",
  "YouTube Music",
  "SoundCloud",
];
