import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ach-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
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
    <section ref={sectionRef} id="achievements" className="relative py-24 sm:py-32 bg-void">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="ach-reveal mb-14 sm:mb-16 max-w-2xl">
          <p className="section-label mb-4">Recognition</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Achievements & <span className="text-gold-gradient">Milestones</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
          {achievements.map((item, i) => (
            <div key={item.title} className="ach-reveal space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <span className="font-mono text-xs text-muted-foreground">{item.year}</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gold/80">{item.org}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <blockquote className="ach-reveal mt-20 max-w-3xl mx-auto text-center">
          <p className="font-heading text-xl sm:text-2xl text-muted-foreground leading-relaxed italic">
            “Excellence is not a destination but a continuous journey — every project is a chance to deliver beyond the brief.”
          </p>
          <footer className="mt-6 section-label">— Shubham Mishra</footer>
        </blockquote>
      </div>
    </section>
  );
};

export default Achievements;
