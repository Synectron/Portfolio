import { ArrowUp } from "lucide-react";
import VisitorCounter from "../lib/visitorCounter";
import { profile } from "../data/resume";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative py-14 bg-void border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          <div className="max-w-sm">
            <p className="font-heading text-xl font-bold text-white mb-3">{profile.brand}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Senior Software Developer crafting APIs, integrations, and accessible digital products.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="text-sm text-muted-foreground space-y-1">
            <a href={`mailto:${profile.email}`} className="block hover:text-gold transition-colors">
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
              className="block hover:text-gold transition-colors"
            >
              {profile.phone}
            </a>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <VisitorCounter />
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-gold transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
