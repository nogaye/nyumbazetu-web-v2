/**
 * Sign-in “mega Ankara” backdrop: saturated wax-print bands, diamond patchwork, zigzag
 * rows, shell repeats, corner sunbursts, slow drift animation, and fabric grain. Stacks
 * above SavannahGradient; pointer-events none. Motion respects prefers-reduced-motion via
 * globals.css (.auth-ankara-* classes).
 */

import { cn } from "@/lib/utils";

export interface AuthAnkaraSubtleLayerProps {
  /** Merged onto the root overlay (absolute inset-0). */
  className?: string;
}

/**
 * Full-bleed decorative stack: bold African wax-print energy while the frosted sign-in
 * card stays the focal point (lighter vignette in the centre).
 *
 * @param props.className — Optional root classes.
 * @returns Layered SVG/CSS artwork, aria-hidden.
 */
export function AuthAnkaraSubtleLayer({ className }: AuthAnkaraSubtleLayerProps) {
  /** Vertical colour bars — coral, teal, indigo, gold, magenta — classic wax rhythm. */
  const waxBands =
    "linear-gradient(92deg," +
    "rgba(220,38,38,0.11) 0%, rgba(220,38,38,0.11) 6%, transparent 6% 10%, " +
    "rgba(13,148,136,0.12) 10%, rgba(13,148,136,0.12) 16%, transparent 16% 20%, " +
    "rgba(67,56,202,0.1) 20%, rgba(67,56,202,0.1) 28%, transparent 28% 34%, " +
    "rgba(202,138,4,0.13) 34%, rgba(202,138,4,0.13) 42%, transparent 42% 48%, " +
    "rgba(190,24,93,0.08) 48%, rgba(190,24,93,0.08) 54%, transparent 54% 60%, " +
    "rgba(13,148,136,0.09) 60%, rgba(13,148,136,0.09) 68%, transparent 68% 100%)";

  /** Animated diagonal mesh (background-size + auth-ankara-stripe-shift). */
  const driftStripes = {
    backgroundImage: [
      "repeating-linear-gradient(52deg, rgba(234,179,8,0.07) 0 2px, transparent 2px 28px)",
      "repeating-linear-gradient(-38deg, rgba(220,38,38,0.06) 0 3px, transparent 3px 36px)",
      "repeating-linear-gradient(128deg, rgba(79,70,229,0.05) 0 2px, transparent 2px 32px)",
    ].join(","),
    backgroundSize: "180px 180px, 220px 220px, 200px 200px",
  } as const;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      {/* Saturated vertical wax stripes */}
      <div
        className="absolute inset-0 dark:opacity-90"
        style={{ backgroundImage: waxBands }}
      />

      {/* Large rotated colour fields — slow float */}
      <div
        className={cn(
          "auth-ankara-float absolute -left-[20%] top-[-15%] h-[70%] w-[80%] rotate-[11deg] rounded-[40%] bg-gradient-to-br from-amber-400/25 via-orange-500/15 to-transparent blur-2xl dark:from-amber-500/20 dark:via-orange-600/12"
        )}
      />
      <div
        className={cn(
          "auth-ankara-float-reverse absolute -bottom-[10%] -right-[15%] h-[65%] w-[75%] rotate-[-8deg] rounded-[45%] bg-gradient-to-tl from-teal-500/22 via-emerald-600/14 to-transparent blur-2xl dark:from-teal-400/18"
        )}
      />
      <div
        className={cn(
          "auth-ankara-bloom-pulse absolute left-[5%] bottom-[15%] h-72 w-72 rounded-full bg-fuchsia-600/12 blur-3xl dark:bg-fuchsia-500/15"
        )}
      />
      <div
        className={cn(
          "auth-ankara-bloom-pulse absolute right-[8%] top-[20%] h-56 w-56 rounded-full bg-indigo-500/14 blur-3xl [animation-delay:-3s] dark:bg-indigo-400/12"
        )}
      />

      {/* Shifting diagonal stripe mesh */}
      <div
        className={cn(
          "auth-ankara-stripe-shift absolute inset-[-8%] opacity-90 mix-blend-multiply dark:mix-blend-soft-light dark:opacity-70"
        )}
        style={driftStripes}
      />

      {/* Diamond patchwork — filled wax cells */}
      <svg
        className="auth-ankara-float absolute inset-0 h-full w-full mix-blend-multiply opacity-[0.42] dark:opacity-[0.38] dark:mix-blend-soft-light"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="ankara-patch"
            width="112"
            height="112"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M56 4 L108 56 L56 108 L4 56 Z"
              fill="none"
              stroke="#b45309"
              strokeWidth="1.4"
              opacity="0.65"
            />
            <path
              d="M56 22 L88 56 L56 90 L24 56 Z"
              fill="#dc2626"
              opacity="0.11"
            />
            <path
              d="M56 34 L76 56 L56 78 L36 56 Z"
              fill="#0f766e"
              opacity="0.14"
            />
            <circle cx="56" cy="56" r="5" fill="#ca8a04" opacity="0.2" />
            <circle cx="56" cy="56" r="2.2" fill="#4338ca" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ankara-patch)" />
      </svg>

      {/* Zigzag river — iconic wax lines */}
      <svg
        className="auth-ankara-float-reverse absolute inset-0 h-full w-full mix-blend-multiply opacity-[0.28] dark:opacity-[0.32] dark:mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="ankara-zig"
            width="96"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 16 L12 6 L24 16 L36 6 L48 16 L60 6 L72 16 L84 6 L96 16 L96 26 L84 16 L72 26 L60 16 L48 26 L36 16 L24 26 L12 16 L0 26 Z"
              fill="#7c2d12"
              opacity="0.14"
            />
            <path
              d="M0 16 L12 26 L24 16 L36 26 L48 16 L60 26 L72 16 L84 26 L96 16"
              fill="none"
              stroke="#92400e"
              strokeWidth="0.9"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ankara-zig)" />
      </svg>

      {/* Cowrie / shell repeat */}
      <svg
        className="absolute inset-0 h-full w-full mix-blend-multiply opacity-[0.22] dark:opacity-[0.26]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="ankara-shell"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(8 32 32)"
          >
            <path
              d="M32 8 Q48 24 32 44 Q16 24 32 8"
              fill="none"
              stroke="#1e1b4b"
              strokeWidth="1"
              opacity="0.4"
            />
            <path
              d="M8 48 Q24 40 32 52 Q40 40 56 48"
              fill="none"
              stroke="#0f766e"
              strokeWidth="0.75"
              opacity="0.45"
            />
            <circle cx="48" cy="20" r="2.5" fill="#ca8a04" opacity="0.35" />
            <circle cx="16" cy="44" r="2" fill="#be185d" opacity="0.28" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ankara-shell)" />
      </svg>

      {/* Corner sunbursts — quarter-circle fans (top-right & bottom-left). */}
      <svg
        className="pointer-events-none absolute right-0 top-0 h-[min(45vw,380px)] w-[min(45vw,380px)] text-amber-500 opacity-40 dark:opacity-30"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M200 0 A200 200 0 0 0 0 200 L200 200 Z"
          fill="currentColor"
          className="text-amber-500/50"
        />
        <path
          d="M200 40 A160 160 0 0 0 40 200 L200 200 Z"
          fill="none"
          stroke="#ea580c"
          strokeWidth="3"
          opacity="0.35"
        />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-[min(42vw,340px)] w-[min(42vw,340px)] opacity-45 dark:opacity-35"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M200 200 A200 200 0 0 1 0 0 L0 200 Z"
          fill="#0d9488"
          opacity="0.3"
        />
        <path
          d="M180 200 A160 160 0 0 1 20 20 L0 200"
          fill="none"
          stroke="#4338ca"
          strokeWidth="2.5"
          opacity="0.45"
        />
      </svg>
      <svg
        className="pointer-events-none absolute left-0 top-0 h-[min(38vw,300px)] w-[min(38vw,300px)] opacity-38 dark:opacity-28"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M200 0 A200 200 0 0 0 0 200 L0 0 Z"
          fill="#db2777"
          opacity="0.2"
        />
        <path
          d="M160 0 A160 160 0 0 0 0 160 L0 0"
          fill="none"
          stroke="#ca8a04"
          strokeWidth="2.5"
          opacity="0.5"
        />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-0 right-0 h-[min(40vw,320px)] w-[min(40vw,320px)] opacity-40 dark:opacity-30"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M0 200 A200 200 0 0 1 200 0 L200 200 Z"
          fill="#4f46e5"
          opacity="0.22"
        />
        <path
          d="M40 200 A160 160 0 0 1 200 40 L200 200"
          fill="none"
          stroke="#ea580c"
          strokeWidth="2.5"
          opacity="0.42"
        />
      </svg>

      {/* Wax selvedge — rainbow band like fabric edge */}
      <div
        className="absolute left-0 right-0 top-0 h-2 opacity-80 shadow-sm dark:opacity-65"
        style={{
          backgroundImage:
            "linear-gradient(90deg,#dc2626 0%,#f59e0b 14%,#eab308 28%,#0d9488 42%,#4f46e5 56%,#db2777 70%,#ea580c 84%,#dc2626 100%)",
        }}
      />

      {/* Centre spotlight — keeps card area calm */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_48%,rgba(255,253,248,0.92)_0%,rgba(255,250,240,0.45)_42%,transparent_68%)] dark:bg-[radial-gradient(ellipse_55%_50%_at_50%_48%,rgba(15,23,42,0.55)_0%,rgba(15,23,42,0.2)_45%,transparent_70%)]"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_85%_at_50%_50%,transparent_25%,rgba(250,245,235,0.35)_78%,rgba(235,220,200,0.5)_100%)] dark:bg-[radial-gradient(ellipse_90%_85%_at_50%_50%,transparent_20%,rgba(30,27,20,0.35)_75%,rgba(15,23,42,0.55)_100%)]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-amber-50/10 to-amber-100/15 dark:from-slate-900/30 dark:via-transparent dark:to-slate-950/40" />

      {/* Grain */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.055] mix-blend-overlay dark:opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="ankara-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
              result="n"
            />
            <feColorMatrix type="saturate" values="0" in="n" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#ankara-grain)" />
      </svg>
    </div>
  );
}
