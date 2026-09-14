import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 sm:py-32 bg-ink overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="contact-reveal max-w-3xl">
          <p className="section-label mb-4">Get in Touch</p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Let’s build something{" "}
            <span className="text-gold-gradient">worth shipping</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Open to full-time roles and consulting — APIs, integrations, microfrontends, and AI-assisted delivery.
          </p>
        </div>

        <div className="contact-reveal mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-start gap-4 p-5 border border-white/8 hover:border-gold/40 transition-colors duration-300"
          >
            <Mail className="w-5 h-5 text-gold mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Email</p>
              <p className="text-white group-hover:text-gold transition-colors truncate">{profile.email}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
          </a>

          <a
            href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
            className="group flex items-start gap-4 p-5 border border-white/8 hover:border-gold/40 transition-colors duration-300"
          >
            <Phone className="w-5 h-5 text-gold mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Phone</p>
              <p className="text-white group-hover:text-gold transition-colors">{profile.phone}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-gold" />
          </a>

          <div className="flex items-start gap-4 p-5 border border-white/8">
            <MapPin className="w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Location</p>
              <p className="text-white">{profile.location}</p>
            </div>
          </div>
        </div>

        <div className="contact-reveal mt-10 flex flex-wrap items-center gap-4">
          <a href={profile.resumeUrl} download className="btn-primary">
            Download Resume
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        <div className="contact-reveal mt-12 inline-flex items-center gap-3 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Available for opportunities
        </div>
      </div>
    </section>
  );
};

export default Contact;
