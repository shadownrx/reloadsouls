"use client";

import { useState } from "react";

type ShareButtonProps = {
  title: string;
  text: string;
  url: string;
  className?: string;
  label?: string;
};

export default function ShareButton({
  title,
  text,
  url,
  className = "",
  label = "Compartir",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const absolute =
      url.startsWith("http") ? url : `${window.location.origin}${url}`;

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
    <button
      type="button"
      onClick={() => void share()}
      className={className}
    >
      {copied ? "Link copiado" : label}
    </button>
  );
}
