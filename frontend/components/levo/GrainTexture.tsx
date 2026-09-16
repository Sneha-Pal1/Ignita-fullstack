"use client";

export function GrainTexture() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.04] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg className="h-full w-full">
        <filter id="levo-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#levo-grain)" />
      </svg>
    </div>
  );
}
