import { cn } from "@/lib/utils";

/** Official stacked WeConnect mark + wordmark (1024×682) */
const LOGO_SRC = "/brand/weconnect-logo.png";
const LOGO_ASPECT = 1024 / 682;

interface LogoIconProps {
  className?: string;
  size?: number;
}

/** Icon-only crop from the official logo (top portion, no wordmark) */
export function LogoIcon({ className, size = 32 }: LogoIconProps) {
  const width = size * 1.2;
  return (
    <span
      className={cn("relative inline-block overflow-hidden shrink-0", className)}
      style={{ width, height: size }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt=""
        className="absolute left-0 top-0 w-full max-w-none object-cover object-top"
        style={{ height: size * 1.55 }}
        draggable={false}
      />
    </span>
  );
}

interface LogoMarkProps {
  className?: string;
  size?: number;
}

/** Compact mark for collapsed sidebar / favicon-style slots */
export function LogoMark({ className, size = 32 }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "rounded-[10px] bg-white flex items-center justify-center shrink-0 overflow-hidden border border-border/60",
        className
      )}
      style={{ width: size, height: size }}
    >
      <LogoIcon size={size * 0.78} />
    </span>
  );
}

interface LogoWordmarkProps {
  className?: string;
  inverted?: boolean;
}

/** Fallback text wordmark when the full image isn’t used */
export function LogoWordmark({ className, inverted }: LogoWordmarkProps) {
  return (
    <span
      className={cn(
        "text-lg tracking-tight whitespace-nowrap",
        inverted ? "text-white" : "text-navy",
        className
      )}
    >
      <span className="font-normal">We</span>
      <span className="font-bold">Connect</span>
    </span>
  );
}

type LogoVariant = "full" | "icon" | "mark";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  iconSize?: number;
  showWordmark?: boolean;
  inverted?: boolean;
  href?: string;
}

export function Logo({
  variant = "full",
  className,
  iconSize = 32,
  inverted = false,
}: LogoProps) {
  if (variant === "mark") {
    return <LogoMark className={className} size={iconSize} />;
  }

  if (variant === "icon") {
    return <LogoIcon className={className} size={iconSize} />;
  }

  // Stacked official logo — height derived from iconSize so it fits nav bars
  const height = Math.round(iconSize * 1.45);
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0 min-w-0",
        inverted && "rounded-md bg-white px-1.5 py-0.5",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="WeConnect"
        width={width}
        height={height}
        className="object-contain"
        style={{ width, height }}
        draggable={false}
      />
    </span>
  );
}

interface BrandTaglineProps {
  className?: string;
  inverted?: boolean;
}

/** AI-POWERED HIRING. VERIFIED TALENT. REAL GROWTH. */
export function BrandTagline({ className, inverted }: BrandTaglineProps) {
  return (
    <p
      className={cn(
        "text-[10px] sm:text-xs font-semibold tracking-[0.12em] uppercase leading-relaxed",
        inverted ? "text-white/80" : "text-neutral-dark",
        className
      )}
    >
      AI-Powered Hiring.{" "}
      <span className={inverted ? "text-teal" : "text-primary"}>
        Verified Talent.
      </span>{" "}
      Real Growth.
    </p>
  );
}
