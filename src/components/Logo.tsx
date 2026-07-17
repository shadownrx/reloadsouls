import Image from "next/image";

type LogoProps = {
  variant?: "hero" | "nav" | "footer";
  className?: string;
  priority?: boolean;
};

const variants = {
  hero: {
    width: 960,
    height: 540,
    className: "mx-auto h-auto w-[min(88vw,22rem)] sm:w-[min(80vw,32rem)] md:w-[min(88vw,42rem)] lg:w-[min(88vw,48rem)]",
  },
  nav: {
    width: 160,
    height: 90,
    className: "h-8 w-auto sm:h-9 md:h-10",
  },
  footer: {
    width: 140,
    height: 80,
    className: "h-7 w-auto sm:h-8",
  },
} as const;

export default function Logo({
  variant = "nav",
  className = "",
  priority = false,
}: LogoProps) {
  const config = variants[variant];

  return (
    <Image
      src="/logo.png"
      alt="Reload Souls"
      width={config.width}
      height={config.height}
      priority={priority}
      className={`mix-blend-screen select-none ${config.className} ${className}`}
    />
  );
}
