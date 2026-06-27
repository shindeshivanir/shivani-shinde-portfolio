import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Calendar, ChevronRight, CheckCircle2, ChevronDown, Award, AlertTriangle } from "lucide-react";
import { EXPERIENCE } from "../data";
import { useQA } from "../context/QAContext";

export default function Experience() {
  const { bugHuntEnabled, foundBugs, findBug } = useQA();
  const isBugActive = bugHuntEnabled && !foundBugs.includes("bug-responsive-overflow");
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <section id="experience" className="py-24 bg-[#09090b] border-b border-zinc-800 relative">
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-950/40 border border-indigo-800 rounded-full">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              Employment Timeline
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
            Professional Experience
          </h2>
          <p className="font-sans text-zinc-400 text-base sm:text-lg">
            Detailed tracking of my Quality Assurance and Software Engineering career, focusing on end-to-end UAT ownership and release validation.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-zinc-800 pl-6 sm:pl-10 space-y-12">
          
          {EXPERIENCE.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-left group animate-none"
              >
                {/* Timeline Dot Indicator */}
                <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isExpanded
                    ? "bg-indigo-500 border-indigo-500 scale-125 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                    : "bg-zinc-950 border-zinc-750 group-hover:border-zinc-550"
                }`}>
                  {isExpanded && <div className="w-1.5 h-1.5 bg-zinc-950 rounded-full" />}
                </div>

                {/* Main Card */}
                <div
                  className={`p-6 rounded-3xl border transition-all duration-300 ${
                    isExpanded
                      ? "bg-[#18181b] border-zinc-800 shadow-xl shadow-indigo-500/[0.01]"
                      : "bg-[#18181b]/50 border-zinc-850 hover:bg-[#18181b] cursor-pointer"
                  }`}
                  onClick={() => setExpandedIndex(index)}
                >
                  {/* Top Summary Block */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-indigo-400 font-semibold uppercase tracking-wider block">
                        {exp.company}
                      </span>
                      <h3 className="font-sans font-bold text-white text-lg sm:text-xl tracking-tight">
                        {exp.role}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-3.5 self-start sm:self-auto">
                      <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-400">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{exp.period}</span>
                      </div>
                      
                      <button
                        className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-850 hover:border-zinc-750 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        aria-label={isExpanded ? "Collapse highlights" : "Expand highlights"}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content Detail */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-6 pt-6 border-t border-zinc-850"
                      >
                        <div className="space-y-4">
                          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                            Key Accomplishments & Responsibilities
                          </span>
                          
                          <div className="space-y-3">
                            {exp.highlights.map((hl, hlIdx) => (
                              <div key={hlIdx} className="flex items-start space-x-3 text-sm">
                                <div className="mt-1 p-0.5 rounded bg-indigo-950/80 border border-indigo-900/60 text-indigo-400 shrink-0">
                                  <CheckCircle2 className="w-3 h-3" />
                                </div>
                                <p className="font-sans text-zinc-350 leading-relaxed text-xs sm:text-sm">
                                  {hl}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Tools bubble tags */}
                          <div className="space-y-2 pt-3">
                            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block flex items-center justify-between">
                              <span>Associated Stack & Tools</span>
                              {index === 1 && isBugActive && (
                                <span className="text-[9px] text-rose-400 font-bold font-mono animate-pulse uppercase flex items-center space-x-1">
                                  <AlertTriangle className="w-2.5 h-2.5" />
                                  <span>LAYOUT_OVERFLOW</span>
                                </span>
                              )}
                            </span>
                            {index === 1 && isBugActive ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  findBug("bug-responsive-overflow");
                                }}
                                className="w-full text-left p-3 rounded-2xl border-2 border-dashed border-rose-500/50 bg-rose-950/10 cursor-pointer hover:border-rose-400 transition-all flex flex-wrap gap-x-10 gap-y-0 h-8 overflow-hidden relative group"
                                title="Click to inspect responsive layout clipping bug"
                              >
                                {exp.toolsUsed.map((tool, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="px-2.5 py-1 rounded bg-[#09090b] border border-rose-800 text-rose-300 font-mono text-[10px] uppercase font-semibold rotate-2 scale-110"
                                  >
                                    {tool}
                                  </span>
                                ))}
                                <span className="absolute right-2 top-1.5 bg-rose-600 text-white font-mono text-[8px] px-1 rounded animate-bounce">
                                  CLIP
                                </span>
                              </button>
                            ) : (
                              <div className="flex flex-wrap gap-1.5">
                                {exp.toolsUsed.map((tool, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="px-2.5 py-1 rounded bg-[#09090b] border border-zinc-800 text-zinc-400 font-mono text-[10px] uppercase font-semibold"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
