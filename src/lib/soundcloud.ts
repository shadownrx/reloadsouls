const USER_ID = 1469559023;
const PROFILE_URL = "https://soundcloud.com/reload_souls";

let cachedClientId: { value: string; expiresAt: number } | null = null;

export async function getSoundCloudClientId(): Promise<string> {
  if (process.env.SOUNDCLOUD_CLIENT_ID) {
    return process.env.SOUNDCLOUD_CLIENT_ID;
  }

  if (cachedClientId && cachedClientId.expiresAt > Date.now()) {
    return cachedClientId.value;
  }

  const res = await fetch(PROFILE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    next: { revalidate: 3600 },
  });

  const html = await res.text();
  const hydration = html.match(/window\.__sc_hydration = (\[.*?\]);/);
  if (!hydration) {
    throw new Error("No se pudo leer el client_id de SoundCloud");
  }

  const data = JSON.parse(hydration[1]) as Array<{
    hydratable: string;
    data: { id?: string };
  }>;
  const apiClient = data.find((item) => item.hydratable === "apiClient");
  const clientId = apiClient?.data?.id;

  if (!clientId) {
    throw new Error("client_id de SoundCloud no encontrado");
  }

  cachedClientId = { value: clientId, expiresAt: Date.now() + 1000 * 60 * 60 };
  return clientId;
}

export async function resolveTrackStreamUrl(trackId: string): Promise<string> {
  const clientId = await getSoundCloudClientId();
  const trackRes = await fetch(
    `https://api-v2.soundcloud.com/tracks/${trackId}?client_id=${clientId}`,
    { next: { revalidate: 300 } },
  );

  if (!trackRes.ok) {
    throw new Error(`Track ${trackId} no disponible`);
  }

  const track = (await trackRes.json()) as {
    media?: {
      transcodings?: Array<{
        url: string;
        format: { protocol: string; mime_type: string };
      }>;
    };
  };

  const progressive = track.media?.transcodings?.find(
    (item) => item.format.protocol === "progressive",
  );

  if (!progressive) {
    throw new Error(`Sin stream progressive para ${trackId}`);
  }

  const streamRes = await fetch(`${progressive.url}?client_id=${clientId}`, {
    cache: "no-store",
  });

  if (!streamRes.ok) {
    throw new Error(`No se pudo resolver el stream de ${trackId}`);
  }

  const stream = (await streamRes.json()) as { url?: string };
  if (!stream.url) {
    throw new Error(`URL de audio vacía para ${trackId}`);
  }

  return stream.url;
}

export { USER_ID, PROFILE_URL };
