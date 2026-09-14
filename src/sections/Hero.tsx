import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "../data/resume";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const tl = gsap.timeline({ delay: 0.12 });
      tl.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        },
      ).fromTo(
        ".hero-portrait",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" },
        "-=0.55",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: -y * 12,
      rotateY: x * 12,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1400,
      transformOrigin: "center",
    });

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 1,
        duration: 0.25,
        background: `radial-gradient(circle 200px at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.28), rgba(212,175,55,0.14), transparent 80%)`,
      });
    }
  };

  const handleMouseEnter = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.55,
        ease: "power3.out",
      });
    }
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, { opacity: 0, duration: 0.35 });
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[100svh] overflow-x-clip bg-black text-[#E8DFD8] cinema-grain"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] rounded-full bg-gold-deep/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start lg:items-center min-h-[calc(100svh-7rem)]">
          {/* Copy — always first in reading order so headline never sits under the photo */}
          <div className="lg:col-span-7 relative z-20 min-w-0 order-1">
            <p className="hero-reveal section-label mb-4 sm:mb-5 text-[#D4AF37]">
              {profile.brand}
            </p>

            <h1 className="hero-reveal font-heading font-extrabold uppercase tracking-tight leading-[0.9] sm:leading-[0.86] select-none">
              <span className="block text-[clamp(2.4rem,10vw,6.25rem)] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#D5CBC0] to-[#605448]">
                I BUILD
              </span>
              <span className="block text-[clamp(2.4rem,10vw,6.25rem)] text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
                DIGITAL
              </span>
              <span className="block text-[clamp(2.15rem,8.6vw,5.75rem)] text-transparent bg-clip-text bg-gradient-to-b from-[#DFBE8A] via-[#9B7640] to-[#342410] break-words">
                EXPERIENCES
              </span>
            </h1>

            <p className="hero-reveal mt-5 sm:mt-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.28em] text-[#C4B29E]">
              {profile.roles.join("  ·  ")}
            </p>

            <p className="hero-reveal mt-4 sm:mt-5 text-sm sm:text-[15px] text-[#A8988B] leading-relaxed max-w-lg">
              {profile.tagline}
            </p>

            <div className="hero-reveal mt-7 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#8C6D4F] bg-black/60 text-[11px] font-medium tracking-[0.24em] uppercase text-[#EAD8C7] hover:border-[#D4AF37] transition-colors"
              >
                Explore My Work
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#8C6D4F]/40 text-[11px] font-medium tracking-[0.24em] uppercase text-[#BFA895] hover:border-[#8C6D4F] hover:text-[#EAD8C7] transition-colors"
              >
                Download Resume
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-5 relative z-10 order-2 flex justify-center lg:justify-end w-full perspective-[1400px]">
            <div className="hero-portrait relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[380px]">
              <div
                className={`absolute -inset-4 sm:-inset-6 rounded-3xl bg-[conic-gradient(from_0deg,#D4AF37_0%,#8C6D4F_30%,transparent_60%,#D4AF37_100%)] blur-2xl pointer-events-none transition-all duration-1000 ease-out ${
                  isHovered ? "opacity-35 scale-110" : "opacity-10 scale-100"
                }`}
              />

              {isHovered && (
                <>
                  <span className="absolute top-1/4 -left-3 w-1.5 h-1.5 rounded-full bg-[#F3DBB3] blur-[1px] shadow-[0_0_8px_#D4AF37] pointer-events-none animate-float z-20 hidden sm:block" />
                  <span
                    className="absolute bottom-1/3 -right-3 w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px] shadow-[0_0_10px_#D4AF37] pointer-events-none animate-float z-20 hidden sm:block"
                    style={{ animationDelay: "0.4s" }}
                  />
                </>
              )}

              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative p-2.5 sm:p-3.5 border border-[#8C6D4F]/40 bg-[#120F0C]/85 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] cursor-pointer group transition-colors duration-500 hover:border-[#D4AF37]/80 will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {isHovered && (
                    <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent skew-x-12 animate-[hero-sweep_1.8s_linear_infinite]" />
                  )}
                </div>

                <div className="pointer-events-none">
                  <div className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#D4AF37] transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                  <div className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#D4AF37] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#D4AF37] transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#D4AF37] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                </div>

                <div className="relative overflow-hidden w-full aspect-[4/5] bg-black">
                  <img
                    src="/profile-photo-final.jpg"
                    alt={profile.name}
                    className="w-full h-full object-cover object-top filter brightness-[0.94] contrast-[1.06] saturate-[1.02] group-hover:brightness-105 group-hover:contrast-[1.12] transition-all duration-700 ease-out"
                  />

                  <div
                    ref={spotlightRef}
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-end z-10 gap-2">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.18em] text-[#C4B29E]">
                      {profile.location}
                    </span>
                    <span className="font-heading text-lg sm:text-2xl text-[#F2D8A7] drop-shadow-[0_0_12px_rgba(242,216,167,0.45)] transition-colors duration-300 group-hover:text-white">
                      Shubham
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
