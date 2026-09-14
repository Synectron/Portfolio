import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDownRight, ChevronDown } from "lucide-react";
import { profile } from "../data/resume";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const walkerRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const tl = gsap.timeline({ delay: 0.12 });

      tl.fromTo(
        ".hero-brand",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
      )
        .fromTo(
          ".hero-line",
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-meta",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.35",
        );

      if (reduceMotion) {
        gsap.set(walkerRef.current, { opacity: 1, x: 0, y: 0 });
        return;
      }

      // Walk in from off-stage with step bounce (reel-style)
      const walk = gsap.timeline({ delay: 0.2 });

      walk.fromTo(
        walkerRef.current,
        { opacity: 0, x: 220 },
        { opacity: 1, x: 0, duration: 1.8, ease: "power1.inOut" },
        0,
      );

      walk.fromTo(
        figureRef.current,
        { y: 0 },
        {
          keyframes: [
            { y: -14, duration: 0.18, ease: "sine.out" },
            { y: 0, duration: 0.18, ease: "sine.in" },
            { y: -12, duration: 0.18, ease: "sine.out" },
            { y: 0, duration: 0.18, ease: "sine.in" },
            { y: -14, duration: 0.18, ease: "sine.out" },
            { y: 0, duration: 0.18, ease: "sine.in" },
            { y: -10, duration: 0.18, ease: "sine.out" },
            { y: 0, duration: 0.18, ease: "sine.in" },
            { y: -8, duration: 0.18, ease: "sine.out" },
            { y: 0, duration: 0.18, ease: "power2.out" },
          ],
        },
        0,
      );

      walk.fromTo(
        ".hero-shadow",
        { scaleX: 0.55, opacity: 0 },
        {
          keyframes: [
            { scaleX: 0.75, opacity: 0.25, duration: 0.18 },
            { scaleX: 1, opacity: 0.5, duration: 0.18 },
            { scaleX: 0.78, opacity: 0.28, duration: 0.18 },
            { scaleX: 1, opacity: 0.5, duration: 0.18 },
            { scaleX: 0.76, opacity: 0.28, duration: 0.18 },
            { scaleX: 1, opacity: 0.5, duration: 0.18 },
            { scaleX: 0.8, opacity: 0.3, duration: 0.18 },
            { scaleX: 1, opacity: 0.48, duration: 0.18 },
            { scaleX: 0.85, opacity: 0.32, duration: 0.18 },
            { scaleX: 1, opacity: 0.42, duration: 0.18 },
          ],
        },
        0,
      );

      // Soft idle sway after arrival
      walk.to(
        figureRef.current,
        {
          y: -5,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        "+=0.1",
      );
      walk.to(
        ".hero-shadow",
        {
          scaleX: 0.9,
          opacity: 0.32,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        "<",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-end sm:items-center overflow-hidden cinema-grain"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-gold-deep/10 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-24 sm:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-4 items-end">
          <div className="lg:col-span-6 xl:col-span-7 order-2 lg:order-1 pb-4 lg:pb-16">
            <p className="hero-brand section-label mb-6 sm:mb-8">
              {profile.brand}
            </p>

            <h1 className="font-heading font-extrabold tracking-tight text-white leading-[0.95]">
              <span className="hero-line block text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                {profile.headline}
              </span>
              <span className="hero-line block text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-gold-gradient mt-1">
                {profile.headlineAccent}
              </span>
            </h1>

            <p className="hero-meta mt-6 sm:mt-8 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {profile.roles.join("  ·  ")}
            </p>

            <p className="hero-meta mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {profile.tagline}
            </p>

            <div className="hero-meta mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <button onClick={() => scrollTo("projects")} className="btn-ghost">
                Explore My Work
                <ArrowDownRight className="w-4 h-4" />
              </button>
              <a href={profile.resumeUrl} download className="btn-primary">
                Download Resume
              </a>
            </div>
          </div>

          {/* Walking figure stage */}
          <div className="lg:col-span-6 xl:col-span-5 order-1 lg:order-2 relative h-[52vh] sm:h-[60vh] lg:h-[78vh] min-h-[320px]">
            <p
              aria-hidden
              className="pointer-events-none absolute right-0 top-10 hidden lg:block font-heading text-8xl font-bold text-white/[0.035] tracking-[0.2em] select-none"
            >
              WALK
            </p>

            <div
              ref={walkerRef}
              className="absolute inset-x-0 bottom-0 flex justify-center lg:justify-end opacity-0 will-change-transform"
            >
              <div className="relative w-[78%] max-w-[420px]">
                <div
                  ref={figureRef}
                  className="relative will-change-transform portrait-fade"
                >
                  <img
                    src="/profile-photo-final.jpg"
                    alt={profile.name}
                    className="w-full h-auto max-h-[72vh] object-cover object-top drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                  />
                </div>

                {/* Ground shadow under walking figure */}
                <div
                  className="hero-shadow absolute left-1/2 -translate-x-1/2 bottom-2 h-4 w-[70%] rounded-[100%] bg-black/70 blur-md origin-center"
                  aria-hidden
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70 pointer-events-none">
              <span>{profile.location}</span>
              <span>Available</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
        aria-label="Scroll to about"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
