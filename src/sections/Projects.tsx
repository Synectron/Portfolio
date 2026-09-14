import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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
    <section ref={sectionRef} id="projects" className="relative py-24 sm:py-32 bg-ink">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="project-reveal mb-14 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Selected Work</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
              Key <span className="text-gold-gradient">Projects</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Enterprise systems with measurable outcomes — loyalty, banking, and digital journeys.
          </p>
        </div>

        <div className="space-y-0">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="project-reveal group grid lg:grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-14 border-t border-white/8 last:border-b"
            >
              <div className="lg:col-span-1">
                <span className="font-mono text-xs text-gold">0{index + 1}</span>
              </div>

              <div className="lg:col-span-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {project.client} · {project.period}
                </p>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="mt-4 inline-flex items-center gap-2 text-gold">
                  <span className="font-heading text-2xl font-bold">{project.metric.value}</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {project.metric.label}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                <ul className="space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                      <ArrowUpRight className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/90 border-b border-gold/30 pb-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
