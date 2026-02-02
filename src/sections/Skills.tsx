import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'Angular 17', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 92 },
      { name: 'JavaScript (ES6+)', level: 95 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'Bootstrap', level: 85 },
    ],
  },
  {
    name: 'Backend & APIs',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express.js', level: 70 },
      { name: 'PostgreSQL', level: 65 },
      { name: 'Swagger', level: 70 },
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      { name: 'Jira', level: 85 },
      { name: 'VersionOne', level: 80 },
      { name: 'Sauce Labs', level: 75 },
      { name: 'VS Code', level: 95 },
      { name: 'IntelliJ IDEA', level: 80 },
      { name: 'Jenkins', level: 70 },
      { name: 'GitLab', level: 80 },
    ],
  },
  {
    name: 'Quality & Testing',
    skills: [
      { name: 'SonarQube', level: 80 },
      { name: 'ESLint', level: 90 },
      { name: 'Jest', level: 85 },
      { name: 'Jasmine', level: 80 },
      { name: 'Karma', level: 75 },
    ],
  },
];

const floatingSkills = [
  'React',
  'Angular',
  'TypeScript',
  'Next.js',
  'Node.js',
  'WCAG',
  'Git',
  'Agile',
  'Jest',
  'Redux',
  'REST API',
  'GraphQL',
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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

      // Categories animation
      const categories = categoriesRef.current?.children;
      if (categories) {
        gsap.fromTo(
          categories,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Progress bars animation
      const progressBars = sectionRef.current?.querySelectorAll('.progress-bar');
      if (progressBars) {
        progressBars.forEach((bar) => {
          const width = bar.getAttribute('data-width');
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${width}%`,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 sm:py-32 bg-void overflow-hidden"
    >
      {/* Floating skills orbit background */}
      <div
        ref={orbitRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
      >
        <div className="relative w-[600px] h-[600px]">
          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-3xl" />
          
          {/* Orbiting skills */}
          {floatingSkills.map((skill, index) => {
            const angle = (index / floatingSkills.length) * 360;
            const radius = 200 + (index % 3) * 50;
            const duration = 20 + (index % 5) * 5;
            
            return (
              <div
                key={skill}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  animation: `orbit ${duration}s linear infinite`,
                  animationDelay: `${-index * 2}s`,
                }}
              >
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                    hoveredSkill === skill
                      ? 'bg-cyan-500 text-void scale-125'
                      : 'bg-surface border border-cyan-500/30 text-cyan-400'
                  }`}
                  style={{
                    transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
                  }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-sm font-mono mb-4">
            Technical Expertise
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over 7+ years of professional development
          </p>
        </div>

        {/* Skills grid */}
        <div
          ref={categoriesRef}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="p-6 sm:p-8 rounded-2xl glass border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
            >
              <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-sm">
                  {categoryIndex + 1}
                </span>
                {category.name}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-sm text-cyan-400 font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-surface overflow-hidden">
                      <div
                        className="progress-bar h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                        data-width={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional expertise tags */}
        <div className="mt-16 text-center">
          <h3 className="font-heading text-lg font-semibold text-white mb-6">
            Additional Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Responsive Design',
              'Performance Optimization',
              'Accessibility (WCAG/ADA)',
              'Agile/Scrum',
              'Cross-functional Collaboration',
              'Code Review',
              'Technical Documentation',
              'Mentoring',
              'UI/UX Best Practices',
              'Design Systems',
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 border border-transparent transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;