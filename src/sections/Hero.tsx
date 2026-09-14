import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Download } from "lucide-react";
import { profile } from "../data/resume";

/**
 * Hero mirrors the cinematic-portfolio reel pattern:
 * fixed right-side walk video (keyed on black) + left copy.
 * @see https://github.com/lohithadamisetti123/cinematic-portfolio
 */
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hasVideo, setHasVideo] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 22, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.14,
          delay: 0.2,
          ease: "power3.out",
        },
      );

      if (!hasVideo) {
        gsap.fromTo(
          ".hero-figure",
          { opacity: 0, x: 120 },
          {
            opacity: 1,
            x: 0,
            duration: 1.8,
            delay: 0.25,
            ease: "power1.inOut",
          },
        );
        gsap.to(".hero-figure-bob", {
          y: -8,
          duration: 0.35,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 9,
          delay: 0.25,
        });
        gsap.to(".hero-figure-bob", {
          y: -5,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2.2,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [hasVideo]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-black text-[#E8DFD8]"
    >
      {/* Fixed video / figure layer — same structure as cinematic-portfolio */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black flex items-end justify-center lg:items-center lg:justify-end">
        {hasVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/hero-poster.png"
            className="h-[85vh] lg:h-screen w-auto max-w-none object-contain origin-bottom lg:origin-right scale-95 md:scale-[0.98] lg:scale-100"
            onError={() => setHasVideo(false)}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="hero-figure relative h-[75vh] lg:h-[90vh] flex items-end justify-center lg:justify-end pr-0 lg:pr-8">
            <div className="hero-figure-bob will-change-transform">
              <img
                src="/videos/walk-start.png"
                alt={profile.name}
                className="h-[75vh] lg:h-[90vh] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        )}

        {/* Soft left blend so copy sits on solid black */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none lg:hidden" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end lg:justify-center h-full w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-16 pt-28">
        <div className="max-w-[20rem] sm:max-w-md md:max-w-lg lg:max-w-[36rem] relative z-20">
          <p className="hero-reveal section-label mb-5 text-[#D4AF37]">
            {profile.brand}
          </p>

          <h1 className="hero-reveal font-heading font-extrabold uppercase tracking-tight leading-[0.85] select-none">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#D5CBC0] to-[#605448]">
              I BUILD
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
              DIGITAL
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] text-transparent bg-clip-text bg-gradient-to-b from-[#DFBE8A] via-[#9B7640] to-[#342410]">
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

          {!hasVideo && (
            <p className="hero-reveal mt-6 text-[10px] font-mono tracking-wider text-[#8C6D4F]/80">
              Walk clip loading from Flow · poster fallback active
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
