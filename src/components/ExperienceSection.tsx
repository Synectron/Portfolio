import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences, education, achievements } from '../data/resume';

interface RouteStop {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
}

const journey: RouteStop[] = [
  ...experiences.map((exp, i) => ({
    id: String(i + 1).padStart(2, '0'),
    year: exp.period.toUpperCase(),
    title: exp.role.toUpperCase(),
    organization: exp.company.toUpperCase(),
    description: exp.description,
  })),
  {
    id: String(experiences.length + 1).padStart(2, '0'),
    year: education.period.toUpperCase(),
    title: education.degree.toUpperCase(),
    organization: education.school.toUpperCase(),
    description: 'Foundation in Information Technology — systems, software engineering, and product delivery.',
  },
];

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-4 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#D4AF37]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            04 / EXPERIENCE
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl tracking-tight uppercase leading-[0.9] mb-14"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#D5CBC0] to-[#605448]">
            THE ROUTE
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
            SO FAR.
          </span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-px bg-[#8C6D4F]/25" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[11px] sm:left-[15px] top-2 w-px bg-gradient-to-b from-[#D4AF37] to-[#8C6D4F] origin-top"
          />

          <div className="space-y-12">
            {journey.map((stop, index) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
                className="relative pl-10 sm:pl-14 group"
              >
                <div className="absolute left-0 top-1.5 flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 group-hover:scale-150 transition-all duration-700 ease-out" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#120F0C] border border-[#8C6D4F] group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_12px_#D4AF37] transition-colors duration-300" />
                </div>

                <span className="text-[10px] font-mono tracking-[0.2em] text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors">
                  {stop.year}
                </span>
                <h3
                  className="text-2xl sm:text-3xl tracking-wide text-white group-hover:text-[#F7E7C4] transition-colors mb-1 leading-none mt-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {stop.title}
                </h3>
                <p
                  className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {stop.organization}
                </p>
                <p
                  className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-[1.7] max-w-lg group-hover:text-[#D5CBC0] transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {stop.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-14 border-t border-[#8C6D4F]/20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-4 mb-6"
          >
            <span
              className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              REWARDS & RECOGNITION
            </span>
            <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl tracking-tight uppercase leading-[0.9] mb-10"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[#D5CBC0] to-[#605448]">
              MARKS ON{' '}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
              THE ROUTE.
            </span>
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((reward, index) => (
              <motion.div
                key={reward.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="relative group border border-[#8C6D4F]/35 bg-[#100D0B]/80 p-5 sm:p-6 hover:border-[#D4AF37]/70 transition-colors duration-300"
              >
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors" />

                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="text-[10px] font-mono tracking-[0.22em] text-[#D4AF37]">
                    {reward.year}
                  </span>
                  <span
                    className="text-[9px] tracking-[0.18em] uppercase text-[#8C6D4F] text-right"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {reward.org}
                  </span>
                </div>
                <h4
                  className="text-xl sm:text-2xl tracking-wide text-white group-hover:text-[#F7E7C4] transition-colors mb-2 leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {reward.title}
                </h4>
                <p
                  className="text-xs font-light text-[#A8988B] leading-relaxed group-hover:text-[#D5CBC0] transition-colors"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {reward.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
