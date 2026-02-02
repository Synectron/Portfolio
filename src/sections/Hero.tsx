import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Mail, Phone, MapPin } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect for image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void grid-bg"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent opacity-50" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground font-mono">
                Available for opportunities
              </span>
            </div>

            {/* Name */}
            <h1
              ref={nameRef}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
            >
              SHUBHAM
              <br />
              <span className="text-gradient">MISHRA</span>
            </h1>

            {/* Title with typing effect */}
            <p
              ref={titleRef}
              className="font-mono text-lg sm:text-xl text-cyan-400 mb-8"
            >
              SENIOR FRONTEND ENGINEER
              <span ref={cursorRef} className="animate-blink ml-1">|</span>
            </p>

            {/* Contact info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-muted-foreground mb-10">
              <a
                href="mailto:shubhammishrax@gmail.com"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">shubhammishrax@gmail.com</span>
              </a>
              <a
                href="tel:+917985307697"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>+91-7985307697</span>
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>India</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-cyan-500 text-void font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300 hover:shadow-glow"
              >
                Get in Touch
              </a>
              <a
                href="#experience"
                className="px-8 py-3 border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
              >
                View Experience
              </a>
            </div>
          </div>

          {/* Right content - Profile Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl opacity-30 animate-pulse-glow" />
              
              {/* Image container */}
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem] rounded-2xl overflow-hidden border-2 border-cyan-500/30 animate-pulse-glow shadow-2xl">
                <img
                  src="/profile-photo-final.jpg"
                  alt="Shubham Mishra"
                  className="w-full h-full object-cover object-top"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <span className="text-xs font-mono uppercase tracking-wider">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;