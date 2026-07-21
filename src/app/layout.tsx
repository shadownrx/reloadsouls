import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reloadsouls.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Reload Souls — Aurelia",
    template: "%s · Reload Souls",
  },
  description:
    "Aurelia — nuevo single de Reload Souls. Ya disponible. XyZ x Blas coming soon. No es música. Es presión sonora.",
  keywords: [
    "Reload Souls",
    "Aurelia",
    "XyZ",
    "Blas",
    "techno",
    "SoundCloud",
    "industrial",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Reload Souls — Aurelia",
    description:
      "Nuevo single ya disponible. No es música. Es presión sonora.",
    type: "website",
    locale: "es_AR",
    siteName: "Reload Souls",
    images: [
      {
        url: "/covers/aurelia.png",
        width: 1200,
        height: 1200,
        alt: "Reload Souls — Aurelia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reload Souls — Aurelia",
    description:
      "Nuevo single ya disponible. No es música. Es presión sonora.",
    images: ["/covers/aurelia.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="film-grain min-h-full flex flex-col bg-void text-bone">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
