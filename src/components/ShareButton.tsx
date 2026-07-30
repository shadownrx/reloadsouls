"use client";

import { useState } from "react";

type ShareProps = {
  title: string;
  text: string;
  url: string;
  className?: string;
  label?: string;
};

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reloadsouls.vercel.app";

function absoluteUrl(url: string) {
  if (url.startsWith("http")) return url;
  const origin =
    typeof window !== "undefined" ? window.location.origin : SITE;
  return `${origin}${url.startsWith("/") ? url : `/${url}`}`;
}

function whatsappHref(title: string, text: string, url: string) {
  const absolute = absoluteUrl(url);
  const shortText = text.length > 160 ? `${text.slice(0, 157)}…` : text;
  const message = `${title}\n${shortText}\n\n${absolute}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function WhatsAppShareButton({
  title,
  text,
  url,
  className = "",
  label = "WhatsApp",
}: ShareProps) {
  return (
    <a
      href={whatsappHref(title, text, url)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}

export default function ShareButton({
  title,
  text,
  url,
  className = "",
  label = "Compartir",
}: ShareProps) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const absolute = absoluteUrl(url);

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: absolute });
        return;
      } catch {
        // user cancelled or unsupported path → fallback
      }
    }

    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <button type="button" onClick={() => void share()} className={className}>
      {copied ? "Link copiado" : label}
    </button>
  );
}
