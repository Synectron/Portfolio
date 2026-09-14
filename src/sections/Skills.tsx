import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
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
    <section ref={sectionRef} id="skills" className="relative py-24 sm:py-32 bg-void">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="skill-reveal mb-14 sm:mb-16 max-w-2xl">
          <p className="section-label mb-4">Capabilities</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Skills & <span className="text-gold-gradient">Technologies</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A toolkit shaped by enterprise delivery — APIs, integrations, frontend systems, and AI-assisted workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
          {skillGroups.map((group, i) => (
            <div key={group.name} className="skill-reveal">
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <h3 className="font-heading text-xl font-semibold text-white">{group.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm text-muted-foreground border border-white/10 hover:border-gold/40 hover:text-gold transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
