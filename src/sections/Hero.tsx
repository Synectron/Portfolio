import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "../data/resume";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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
        { opacity: 0, x: 48 },
        { opacity: 1, x: 0, duration: 1.1, ease: "power3.out" },
        "-=0.75",
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

          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="hero-portrait relative w-full max-w-sm sm:max-w-md">
              <p
                aria-hidden
                className="pointer-events-none absolute -right-2 top-10 hidden lg:block font-heading text-7xl font-bold text-white/[0.04] rotate-90 origin-right tracking-widest select-none"
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
              <div className="absolute bottom-4 left-0 right-0 flex justify-between px-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C6D4F]/90">
                <span>{profile.location}</span>
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
