"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import hero from "../../public/hero.jpg";
import hero2 from "../../public/hero2.jpg";
import hero3 from "../../public/hero3.jpg";
import hero4 from "../../public/hero4.jpg";
import HeroOverlay from "./HeroOverlay";
import { heroPreview } from "@/data/hero-preview";

const slides = [hero, hero2, hero3, hero4];
const motionPreference = "(prefers-reduced-motion: reduce)";

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(motionPreference);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(motionPreference).matches;
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(false);
  const [overlayComplete, setOverlayComplete] = useState(false);
  const [{ activeSlide, previousSlide }, setSlide] = useState<{
    activeSlide: number;
    previousSlide: number | null;
  }>({ activeSlide: 0, previousSlide: null });
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<boolean[]>(slides.map(() => false));
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getReducedMotion, () => true);
  const turnOnImage = useCallback(() => setLit(true), []);
  const finishOverlay = useCallback(() => setOverlayComplete(true), []);
  const changeSlide = useCallback((index: number) => {
    setSlide(current => current.activeSlide === index ? current : {
      activeSlide: index,
      previousSlide: current.activeSlide,
    });
  }, []);

  useEffect(() => {
    const nextSlide = (activeSlide + 1) % slides.length;
    if (!overlayComplete || paused || reducedMotion || !loaded[nextSlide]) return;

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (heroRef.current) observer.observe(heroRef.current);
    const timer = window.setInterval(() => {
      if (!document.hidden && visible) changeSlide(nextSlide);
    }, 6000);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [overlayComplete, paused, reducedMotion, activeSlide, loaded, changeSlide]);

  function showSlide(index: number) {
    setPaused(true);
    changeSlide((index + slides.length) % slides.length);
  }

  return (
    <section
      ref={heroRef}
      className="hero masked-hero"
      id="top"
      data-lit={lit}
      aria-roledescription="carousel"
      aria-label="Selected photography"
    >
      <div className="hero-background" data-lit={lit} aria-hidden="true" style={{ opacity: 1, transition: "none" }}>
        {slides.map((image, index) => (
          <div
            className="hero-slide"
            data-active={index === activeSlide}
            data-previous={index === previousSlide}
            style={index === 0 ? {
              animation: previousSlide === null ? "none" : undefined,
              backgroundImage: "url(" + heroPreview + ")",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            } : undefined}
            key={image.src}
          >
            {/* I decode the other large photographs after the overlay has finished fading. */}
            {(index === 0 || overlayComplete) && <Image
              src={image}
              alt=""
              fill
              sizes="100vw"
              preload={index === 0}
              loading={index === 0 ? undefined : "eager"}
              style={index === 0 ? {
                opacity: loaded[0] ? 1 : 0,
                transition: "opacity 600ms var(--hero-fade-ease)",
                willChange: "opacity",
              } : undefined}
              onLoad={() => setLoaded(current => current.map((ready, i) => ready || i === index))}
            />}
          </div>
        ))}
      </div>
      <div className="hero-meta hero-meta--top">
        <span>Photographer</span>
        <span>Copenhagen / Everywhere</span>
      </div>
      <HeroOverlay ready={loaded[0]} onFadeStart={turnOnImage} onFadeComplete={finishOverlay} />
      <div className="hero-meta hero-meta--bottom">
        <span aria-live={paused ? "polite" : "off"} aria-atomic="true">
          Romeo / {String(activeSlide + 1).padStart(2, "0")}—{String(slides.length).padStart(2, "0")}
        </span>
        <div className="hero-carousel-controls" role="group" aria-label="Slideshow controls" inert={!overlayComplete}>
          <button
            className="hero-carousel-button"
            type="button"
            aria-label="Previous photograph"
            disabled={!loaded[(activeSlide + slides.length - 1) % slides.length]}
            onClick={() => showSlide(activeSlide - 1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          {!reducedMotion && (
            <button
              className="hero-carousel-button"
              type="button"
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setPaused(current => !current)}
            >
              {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
          )}
          <button
            className="hero-carousel-button"
            type="button"
            aria-label="Next photograph"
            disabled={!loaded[(activeSlide + 1) % slides.length]}
            onClick={() => showSlide(activeSlide + 1)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <a href="#work">View selected work ↓</a>
      </div>
    </section>
  );
}
