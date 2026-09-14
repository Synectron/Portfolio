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
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 22, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        },
      ).fromTo(
        ".hero-portrait",
        { opacity: 0, y: 28, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
        "-=0.75",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: -y * 16,
      rotateY: x * 16,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1400,
      transformOrigin: "center",
    });

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 1,
        duration: 0.25,
        background: `radial-gradient(circle 220px at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.32), rgba(212,175,55,0.16), transparent 80%)`,
      });
    }
  };

  const handleMouseEnter = () => setIsHovered(true);

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
      className="relative w-full min-h-screen overflow-hidden bg-black text-[#E8DFD8] cinema-grain"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-gold-deep/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-16 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="hero-reveal section-label mb-5 text-[#D4AF37]">
              {profile.brand}
            </p>

            <h1 className="hero-reveal font-heading font-extrabold uppercase tracking-tight leading-[0.85] select-none">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#D5CBC0] to-[#605448]">
                I BUILD
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
                DIGITAL
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-transparent bg-clip-text bg-gradient-to-b from-[#DFBE8A] via-[#9B7640] to-[#342410]">
                EXPERIENCES
              </span>
            </h1>

            <p className="hero-reveal mt-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#C4B29E]">
              {profile.roles.join("  ·  ")}
            </p>

            <p className="hero-reveal mt-5 text-sm sm:text-[15px] text-[#A8988B] leading-relaxed max-w-lg">
              {profile.tagline}
            </p>

            <div className="hero-reveal mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#8C6D4F] bg-black/60 text-[11px] font-medium tracking-[0.24em] uppercase text-[#EAD8C7] hover:border-[#D4AF37] transition-colors"
              >
                Explore My Work
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#8C6D4F]/40 text-[11px] font-medium tracking-[0.24em] uppercase text-[#BFA895] hover:border-[#8C6D4F] hover:text-[#EAD8C7] transition-colors"
              >
                Download Resume
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end perspective-[1400px]">
            <div className="hero-portrait relative w-full max-w-sm sm:max-w-md">
              {/* Ambient gold glow — expands on hover */}
              <div
                className={`absolute -inset-6 rounded-3xl bg-[conic-gradient(from_0deg,#D4AF37_0%,#8C6D4F_30%,transparent_60%,#D4AF37_100%)] blur-2xl pointer-events-none transition-all duration-1000 ease-out ${
                  isHovered ? "opacity-35 scale-110" : "opacity-15 scale-100"
                }`}
              />

              {/* Hover spark embers */}
              {isHovered && (
                <>
                  <span className="absolute top-1/4 -left-4 w-1.5 h-1.5 rounded-full bg-[#F3DBB3] blur-[1px] shadow-[0_0_8px_#D4AF37] pointer-events-none animate-float z-20" />
                  <span
                    className="absolute bottom-1/3 -right-4 w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px] shadow-[0_0_10px_#D4AF37] pointer-events-none animate-float z-20"
                    style={{ animationDelay: "0.4s" }}
                  />
                </>
              )}

              {/* 3D tilt card — matches cinematic-portfolio About portrait */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative p-3.5 border border-[#8C6D4F]/40 bg-[#120F0C]/85 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] cursor-pointer group transition-colors duration-500 hover:border-[#D4AF37]/80 will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Laser sweep on hover */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {isHovered && (
                    <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent skew-x-12 animate-[hero-sweep_1.8s_linear_infinite]" />
                  )}
                </div>

                {/* Gold corner brackets */}
                <div className="pointer-events-none">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                </div>

                <div className="relative overflow-hidden w-full aspect-[4/5] bg-black">
                  <img
                    src="/profile-photo-final.jpg"
                    alt={profile.name}
                    className="w-full h-full object-cover object-top filter brightness-[0.94] contrast-[1.06] saturate-[1.02] group-hover:brightness-105 group-hover:contrast-[1.12] transition-all duration-700 ease-out"
                  />

                  {/* Mouse-tracked spotlight */}
                  <div
                    ref={spotlightRef}
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C4B29E]">
                      {profile.location}
                    </span>
                    <span
                      className="text-2xl text-[#F2D8A7] drop-shadow-[0_0_12px_rgba(242,216,167,0.45)] transition-colors duration-300 group-hover:text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
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
