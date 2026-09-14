import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { profile } from "../data/resume";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [progress, setProgress] = useState(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);

      const sections = ["about", "experience", "skills", "projects", "achievements", "contact"];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-ink/85 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white"
            >
              {profile.brand}
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`section-label transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-gold"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href={profile.resumeUrl}
              download
              className="hidden md:inline-flex btn-ghost !px-5 !py-2 text-xs"
            >
              Resume
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className="h-px w-full bg-transparent">
          <div
            className="h-px bg-gold transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-0 z-40 md:hidden bg-ink/98">
          <div className="h-full flex flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-heading text-3xl font-semibold text-white hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href={profile.resumeUrl} download className="btn-primary mt-4">
              Download Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
