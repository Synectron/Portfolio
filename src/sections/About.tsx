import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education, highlights, profile, stats } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
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
    <section ref={sectionRef} id="about" className="relative py-24 sm:py-32 bg-void">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="about-reveal section-label mb-4">About</p>
              <h2 className="about-reveal font-heading text-4xl sm:text-5xl font-bold text-white leading-tight">
                Where code
                <br />
                <span className="text-gold-gradient">meets storytelling</span>
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <p className="about-reveal text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {profile.summary}
            </p>

            <div className="about-reveal hairline" />

            <div className="about-reveal grid sm:grid-cols-2 gap-8">
              {highlights.map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="about-reveal pt-4">
              <p className="section-label mb-2">Education</p>
              <p className="font-heading text-xl text-white">{education.degree}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {education.school} · {education.period}
              </p>
            </div>
          </div>
        </div>

        <div className="about-reveal mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/5 py-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-3xl sm:text-4xl font-bold text-gold-gradient">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
