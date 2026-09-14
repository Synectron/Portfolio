import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDownRight, ChevronDown } from "lucide-react";
import { profile } from "../data/resume";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        ".hero-brand",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      )
        .fromTo(
          ".hero-line",
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
          "-=0.35",
        )
        .fromTo(
          ".hero-meta",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
          "-=0.85",
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

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-24 sm:py-28"
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-end lg:items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="hero-brand section-label mb-6 sm:mb-8">{profile.brand}</p>

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

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div ref={imageRef} className="relative w-full max-w-md">
              <p
                aria-hidden
                className="pointer-events-none absolute -right-2 top-8 hidden lg:block font-heading text-7xl font-bold text-white/[0.04] rotate-90 origin-right tracking-widest select-none"
              >
                MISHRA
              </p>
              <div className="relative portrait-fade">
                <img
                  src="/profile-photo-final.jpg"
                  alt={profile.name}
                  className="w-full h-auto max-h-[70vh] object-cover object-top"
                />
              </div>
              <div className="absolute bottom-6 left-0 right-0 flex justify-between items-end px-1 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/80">
                <span>{profile.location}</span>
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
        aria-label="Scroll to about"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
