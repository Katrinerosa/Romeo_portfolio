"use client";

import { useId, useLayoutEffect, useRef } from "react";
import { heroLettering, heroLetterStroke } from "@/data/hero-lettering";

type HeroOverlayProps = {
  ready: boolean;
  onFadeStart: () => void;
  onFadeComplete: () => void;
};

export default function HeroOverlay({ ready, onFadeStart, onFadeComplete }: HeroOverlayProps) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const finishedRef = useRef(false);
  const maskId = "hero-letters-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || finishedRef.current) return;

    // I keep the poster visible in the local design preview.
    if (
      process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).get("hero-preview") === "1"
    ) {
      root.dataset.phase = "preview";
      return;
    }

    let cancelled = false;
    let animation: Animation | undefined;
    let holdTimer: number | undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const finish = () => {
      if (cancelled || finishedRef.current) return;
      finishedRef.current = true;
      root.dataset.phase = "complete";
      root.style.opacity = "0";
      root.style.willChange = "auto";
      onFadeComplete();
    };

    const skip = () => {
      if (cancelled || finishedRef.current) return;
      window.clearTimeout(holdTimer);
      animation?.cancel();
      onFadeStart();
      finish();
    };

    const onMotionChange = () => { if (motion.matches) skip(); };
    motion.addEventListener("change", onMotionChange);
    if (motion.matches) {
      skip();
    } else if (ready) {
      root.dataset.phase = "holding";

      // I use the carousel's exact easing curve and 1.6-second fade.
      const easing = window.getComputedStyle(root)
        .getPropertyValue("--hero-fade-ease").trim() || "cubic-bezier(0.37, 0, 0.63, 1)";
      holdTimer = window.setTimeout(() => {
        if (cancelled || finishedRef.current) return;
        root.dataset.phase = "fading";
        onFadeStart();
        animation = root.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 1600, easing, fill: "forwards" }
        );
        animation.onfinish = finish;
      }, 1500);
    }

    return () => {
      cancelled = true;
      motion.removeEventListener("change", onMotionChange);
      window.clearTimeout(holdTimer);
      animation?.cancel();
    };
  }, [ready, onFadeStart, onFadeComplete]);

  return (
    <h1
      ref={rootRef}
      className="hero-overlay"
      aria-label="Romeo"
      style={{
        position: "absolute", inset: 0, margin: 0, width: "100%",
        height: "100%", zIndex: 1, pointerEvents: "none",
        willChange: "opacity",
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <defs>
          {/* I use fixed letter outlines, available before the font loads. */}
          <mask id={maskId} x="0" y="0" width="1000" height="1000"
            maskUnits="userSpaceOnUse" style={{ maskType: "luminance" }}>
            <rect width="1000" height="1000" fill="white" />
            <g
              fill="black"
              stroke="black"
              strokeWidth={heroLetterStroke}
              strokeLinejoin="miter"
              strokeLinecap="butt"
              strokeMiterlimit={2}
              paintOrder="stroke fill"
            >
              {heroLettering.map(line => (
                <path key={line.text} d={line.path} transform={line.transform} />
              ))}
            </g>
          </mask>
        </defs>
        <rect width="1000" height="1000" mask={"url(#" + maskId + ")"} fill="#f4272f" />
      </svg>
    </h1>
  );
}
