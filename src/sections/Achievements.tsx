import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Trophy, Star, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: Trophy,
    title: 'Inspiring Performance Award',
    organization: 'Wipro Limited',
    year: '2019',
    description:
      'Recognized for exceptional performance and significant contributions to project success.',
    color: 'from-yellow-500/20 to-amber-500/20',
    borderColor: 'border-yellow-500/30',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Award,
    title: 'Certificate of Appreciation',
    organization: 'Personality Development Program',
    year: '2018',
    description:
      'SRM Institute of Science & Technology - For active participation and leadership in personality development initiatives.',
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Users,
    title: 'Leadership Role',
    organization: 'College Fest Management',
    year: '2014-2018',
    description:
      'Supervised management and sponsorship team for college fests, demonstrating leadership and organizational skills.',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
  },
  {
    icon: Star,
    title: 'Process Optimization',
    organization: 'National Private Banking',
    year: '2018-2024',
    description:
      'Contributed to reducing business processing time from 26 days to 3 days, achieving 1-day SLA compliance.',
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-400',
  },
];

const Achievements = () => {
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

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, rotateX: -15 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.7,
              delay: index * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
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
      id="achievements"
      className="relative py-24 sm:py-32 bg-void"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-sm font-mono mb-4">
            Recognition
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Achievements & <span className="text-gradient">Awards</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milestones and recognition earned throughout my professional journey
          </p>
        </div>

        {/* Achievements grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`group relative p-6 sm:p-8 rounded-2xl border ${achievement.borderColor} overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-1`}
              style={{ perspective: '1000px' }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl glass flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <achievement.icon className={`w-7 h-7 ${achievement.iconColor}`} />
                  </div>

                  {/* Title and org */}
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {achievement.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">
                        {achievement.organization}
                      </span>
                      <span className="text-cyan-500">•</span>
                      <span className="text-cyan-400 font-mono">{achievement.year}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>

              {/* Decorative corner */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity`}
              >
                <div
                  className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 ${achievement.borderColor.replace('border-', 'border-')}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quote section */}
        <div className="mt-16 text-center">
          <div className="relative inline-block max-w-3xl">
            <div className="absolute -top-4 -left-4 text-6xl text-cyan-500/20 font-serif">
              "
            </div>
            <blockquote className="text-xl sm:text-2xl text-muted-foreground italic leading-relaxed px-8">
              Excellence is not a destination but a continuous journey. Every project is an
              opportunity to learn, grow, and deliver value that exceeds expectations.
            </blockquote>
            <div className="absolute -bottom-4 -right-4 text-6xl text-cyan-500/20 font-serif rotate-180">
              "
            </div>
          </div>
          <div className="mt-6">
            <span className="text-cyan-400 font-heading font-semibold">— Shubham Mishra</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;