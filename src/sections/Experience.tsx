import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-reveal",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
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
    <section ref={sectionRef} id="experience" className="relative py-24 sm:py-32 bg-ink">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="exp-reveal mb-14 sm:mb-16 max-w-2xl">
          <p className="section-label mb-4">Work History</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Professional <span className="text-gold-gradient">Experience</span>
          </h2>
        </div>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <article
              key={exp.company}
              className="exp-reveal grid lg:grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12 border-t border-white/8 last:border-b"
            >
              <div className="lg:col-span-4 space-y-3">
                <p className="font-mono text-xs text-gold tracking-wider">{exp.period}</p>
                <h3 className="font-heading text-2xl font-bold text-white">{exp.company}</h3>
                <p className="text-muted-foreground">{exp.role}</p>
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground/80">
                  {exp.domain} · {exp.location}
                </p>
              </div>

              <div className="lg:col-span-8">
                <p className="text-muted-foreground leading-relaxed mb-6">{exp.description}</p>
                <ul className="space-y-3">
                  {exp.achievements.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {index === 0 && (
                  <p className="mt-6 text-xs font-mono text-gold/70 tracking-wider">
                    0{index + 1} / 0{experiences.length}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
