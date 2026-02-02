import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'EPAM Systems',
    role: 'Senior Software Developer',
    period: 'May 2024 – Present',
    location: 'Remote',
    project: 'Digital Customer Journey Modernization',
    client: 'American Express',
    domain: 'BFSI',
    description:
      'Leading modernization of customer-facing digital journeys focusing on performance, accessibility, and scalable UI architecture.',
    achievements: [
      'Built responsive, WCAG-compliant UI components aligned to enterprise design systems',
      'Migrated/refactored legacy UI components to modern frameworks',
      'Delivered reusable UI components consumed across multiple customer journeys',
      'Collaborated with Product Owners, UX, backend engineers, and QA',
      'Resolved defects and improved UI performance',
    ],
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    company: 'Wipro Limited',
    role: 'Senior Project Engineer',
    period: 'Nov 2018 – May 2024',
    location: 'India',
    project: 'National Private Banking Development',
    client: 'National Private Banking',
    domain: 'BFSI',
    description:
      'Developed wealth management and loan processing portal used by advisors, bankers, and clients.',
    achievements: [
      'Reduced business processing time from 26 days to 3 days, achieving 1-day SLA',
      'Implemented features following Agile/Scrum methodology',
      'Ensured ADA compliance throughout the application',
      'Built mobile-responsive UI pages and improved performance',
      'Wrote unit tests and maintained industry-standard code coverage',
    ],
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline line draw animation
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 sm:py-32 bg-void"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-sm font-mono mb-4">
            Work History
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            7+ years of building enterprise-grade applications in the BFSI domain
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div
            ref={timelineRef}
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent hidden sm:block"
          />

          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`relative flex flex-col sm:flex-row items-start gap-8 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-void z-10 hidden sm:block" />

                {/* Card */}
                <div
                  className={`flex-1 ${index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'} ml-8 sm:ml-0`}
                >
                  <div
                    className={`relative p-6 sm:p-8 rounded-2xl glass border ${exp.borderColor} overflow-hidden group hover:border-cyan-500/50 transition-all duration-500`}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-50 group-hover:opacity-70 transition-opacity`}
                    />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="w-5 h-5 text-cyan-400" />
                            <span className="text-sm text-cyan-400 font-mono">
                              {exp.domain}
                            </span>
                          </div>
                          <h3 className="font-heading text-2xl font-bold text-white mb-1">
                            {exp.company}
                          </h3>
                          <p className="text-lg text-muted-foreground">{exp.role}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Project info */}
                      <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-white/5">
                        <ExternalLink className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-white">
                          Project: <span className="text-cyan-400">{exp.project}</span>
                        </span>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-sm text-muted-foreground">Client: {exp.client}</span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4">{exp.description}</p>

                      {/* Achievements */}
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;