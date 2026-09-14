import React from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { projects as resumeProjects, profile } from '../data/resume';

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  tech: string[];
  metrics: { label: string; value: string }[];
}

const projects: Project[] = resumeProjects.map((p, i) => ({
  number: String(i + 1).padStart(2, '0'),
  title: p.title,
  category: `${p.client} · ${p.period}`.toUpperCase(),
  description: `${p.description} ${p.highlights.join(' ')}`,
  githubUrl: profile.links.github,
  tech: p.tech,
  metrics: [
    { label: p.metric.label.toUpperCase(), value: p.metric.value },
    { label: 'CLIENT', value: p.client },
    { label: 'STACK', value: p.tech.slice(0, 2).join(' / ') },
  ],
}));

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="work"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-8 pb-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 px-6 sm:px-12 lg:px-20 mb-6">
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
            02 / PROJECTS
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.88]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#D5CBC0] to-[#605448]">
            SELECTED
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
            SYSTEMS.
          </span>
        </motion.h2>
      </div>

      <ScrollStack
        useWindowScroll
        itemDistance={120}
        itemScale={0.04}
        itemStackDistance={36}
        stackPosition="22%"
        scaleEndPosition="6%"
        baseScale={0.88}
      >
        {projects.map((project) => (
          <ScrollStackItem key={project.number}>
            <div className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A] p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.98)] group overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <span
                    className="text-[10px] font-mono tracking-[0.28em] text-[#D4AF37] mb-3 block"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {project.number} / {project.category}
                  </span>
                  <h3
                    className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.9]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm text-[#A8988B] font-light leading-relaxed mb-6 max-w-2xl"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span>VIEW ON GITHUB</span>
                    <span>↗</span>
                  </a>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="border border-[#8C6D4F]/30 bg-[#14100D] px-5 py-4"
                    >
                      <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#8C6D4F] mb-1">
                        {m.label}
                      </p>
                      <p
                        className="text-xl text-[#F3DBB3]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};

export default ProjectsSection;
