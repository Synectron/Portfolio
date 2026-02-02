import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, GitBranch, Users, Clock, TrendingDown, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Digital Customer Journey Modernization',
    company: 'American Express',
    role: 'UI Developer',
    period: 'May 2024 – Present',
    description:
      'Leading the modernization of customer-facing digital journeys for American Express, focusing on performance optimization, accessibility compliance, and scalable UI architecture.',
    highlights: [
      'Built responsive, WCAG-compliant UI components',
      'Migrated legacy components to modern frameworks',
      'Created reusable component library',
      'Improved overall application performance',
    ],
    tech: ['React', 'TypeScript', 'Angular', 'WCAG', 'Design Systems'],
    metrics: [
      { icon: Users, label: 'Users Impacted', value: 'Millions' },
      { icon: CheckCircle2, label: 'WCAG Compliance', value: 'AA Level' },
    ],
    color: 'from-blue-600/30 to-cyan-600/30',
    borderColor: 'border-blue-500/40',
    accentColor: 'text-blue-400',
  },
  {
    title: 'National Private Banking Portal',
    company: 'Wipro Limited',
    role: 'Senior Project Engineer',
    period: 'Nov 2018 – May 2024',
    description:
      'Developed a comprehensive wealth management and loan processing portal used by advisors, bankers, and clients. Achieved significant business process improvements.',
    highlights: [
      'Reduced processing time from 26 days to 3 days',
      'Achieved 1-day SLA compliance',
      'Implemented ADA compliance throughout',
      'Built mobile-responsive interfaces',
    ],
    tech: ['React', 'Angular', 'TypeScript', 'Node.js', 'PostgreSQL'],
    metrics: [
      { icon: TrendingDown, label: 'Processing Time', value: '-88%' },
      { icon: Clock, label: 'SLA Achievement', value: '1 Day' },
    ],
    color: 'from-green-600/30 to-emerald-600/30',
    borderColor: 'border-green-500/40',
    accentColor: 'text-green-400',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2,
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
      id="projects"
      className="relative py-24 sm:py-32 bg-void"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-sm font-mono mb-4">
            Featured Work
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Key <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enterprise-scale applications that delivered measurable business impact
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`group relative rounded-2xl overflow-hidden border ${project.borderColor} hover:border-cyan-500/50 transition-all duration-500`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GitBranch className={`w-5 h-5 ${project.accentColor}`} />
                      <span className={`text-sm font-mono ${project.accentColor}`}>
                        {project.company}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.period}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <ExternalLink className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">{project.description}</p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${project.accentColor} mt-0.5 flex-shrink-0`} />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg glass"
                    >
                      <metric.icon className={`w-4 h-4 ${project.accentColor}`} />
                      <span className="text-sm text-muted-foreground">{metric.label}:</span>
                      <span className={`text-sm font-semibold ${project.accentColor}`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/80 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '7+', label: 'Years Experience' },
            { value: '2', label: 'Major Enterprises' },
            { value: '88%', label: 'Process Improvement' },
            { value: 'Millions', label: 'Users Impacted' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl glass border border-cyan-500/20"
            >
              <div className="font-heading text-3xl sm:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;