import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Layers, Zap, Accessibility } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code following best practices',
  },
  {
    icon: Layers,
    title: 'Modern Architecture',
    description: 'Building robust frontend architectures with React & Angular',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Optimizing for speed, reducing load times significantly',
  },
  {
    icon: Accessibility,
    title: 'Accessibility',
    description: 'WCAG/ADA compliant interfaces for all users',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 bg-void"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left column - Label */}
          <div className="lg:col-span-4">
            <h2
              ref={headingRef}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white sticky top-32"
            >
              <span className="text-cyan-500">(</span>
              ABOUT
              <span className="text-cyan-500">)</span>
            </h2>
          </div>

          {/* Right column - Content */}
          <div className="lg:col-span-8">
            <p
              ref={textRef}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-12"
            >
              I craft <span className="text-white font-medium">digital experiences</span> that are{' '}
              <span className="text-cyan-400">robust</span>,{' '}
              <span className="text-cyan-400">accessible</span>, and{' '}
              <span className="text-cyan-400">performant</span>. With a strong foundation in{' '}
              <span className="text-white font-medium">React</span> and{' '}
              <span className="text-white font-medium">Angular</span>, I bridge the gap between
              design and engineering to build products that scale.
            </p>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-16">
              With <span className="text-white font-medium">7+ years of experience</span> in the
              BFSI and enterprise domains, I've led modernization efforts, reduced business processing
              times from <span className="text-cyan-400">26 days to 3 days</span>, and delivered
              high-quality, WCAG-compliant interfaces used by millions. I thrive in agile
              environments and excel at cross-functional collaboration.
            </p>

            {/* Highlight cards */}
            <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-xl glass hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute left-0 top-1/2 w-32 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
    </section>
  );
};

export default About;