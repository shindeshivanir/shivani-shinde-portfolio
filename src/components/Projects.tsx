import { motion } from "motion/react";
import { FolderGit2, Cpu, GraduationCap, Settings, ArrowUpRight, Github, AlertTriangle } from "lucide-react";
import { PROJECTS } from "../data";
import { useQA } from "../context/QAContext";

interface ProjectsProps {
  onScrollToSection: (id: string) => void;
}

export default function Projects({ onScrollToSection }: ProjectsProps) {
  const { bugHuntEnabled, foundBugs, findBug } = useQA();
  const isBugActive = bugHuntEnabled && !foundBugs.includes("bug-visual-layer");
  
  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-purple-400" />;
      case "Settings":
        return <Settings className="w-5 h-5 text-pink-400" />;
      default:
        return <FolderGit2 className="w-5 h-5 text-zinc-400" />;
    }
  };

  const getBorderAccent = (id: string) => {
    switch (id) {
      case "uat-builder": return "hover:border-indigo-500/50 shadow-indigo-500/[0.01]";
      case "my-campus": return "hover:border-purple-500/50 shadow-purple-500/[0.01]";
      case "wingd": return "hover:border-pink-500/50 shadow-pink-500/[0.01]";
      default: return "hover:border-zinc-700";
    }
  };

  return (
    <section id="projects" className="py-24 bg-[#09090b] relative overflow-hidden border-b border-zinc-800">
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-950/40 border border-indigo-800 rounded-full">
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              Project Portfolio
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
            Key Project Showcases
          </h2>
          <p className="font-sans text-zinc-400 text-base sm:text-lg">
            Practical application of QA frameworks, test script architectures, and AI integration systems demonstrated across diverse domains.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-[#18181b] p-6 rounded-3xl border border-zinc-800 flex flex-col justify-between shadow-2xl transition-all duration-300 ${getBorderAccent(
                  project.id
                )}`}
              >
                <div className="space-y-5 text-left">
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-[#09090b] border border-zinc-800 rounded-2xl">
                      {getProjectIcon(project.iconName)}
                    </div>
                    
                    <span className="font-mono text-[10px] text-zinc-500 font-semibold tracking-wider uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & subtitle */}
                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-white text-lg tracking-tight">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs text-indigo-400 font-medium">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 border-t border-zinc-800 pt-4 text-left">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="font-sans text-zinc-350 text-[11px] leading-relaxed flex items-start space-x-2">
                        <span className="text-indigo-400 font-bold select-none mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link / CTA */}
                <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  {project.id === "uat-builder" ? (
                    isBugActive ? (
                      <div className="relative z-10">
                        <button
                          onClick={() => findBug("bug-visual-layer")}
                          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-rose-950/50 border-2 border-dashed border-rose-500 hover:border-rose-400 font-sans text-xs text-rose-300 font-medium transition-all cursor-pointer -translate-y-4 -translate-x-1 opacity-65 animate-pulse"
                          title="Visual Layering Bug detected! Click to file Jira ticket and repair element."
                        >
                          <AlertTriangle className="w-3 h-3 text-rose-400 animate-bounce" />
                          <span>Try Interactive Tool</span>
                          <span className="text-[8px] text-rose-400 font-mono font-bold bg-rose-950 px-1 py-0.5 rounded-lg ml-1">Z_INDEX</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onScrollToSection("uat-builder")}
                        className="flex items-center space-x-1 px-4 py-2 rounded-full bg-indigo-950/40 border border-indigo-900 hover:border-indigo-750 font-sans text-xs text-indigo-300 font-medium transition-colors cursor-pointer"
                      >
                        <span>Try Interactive Tool</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )
                  ) : (
                    <div className="h-4" /> // empty spacer
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-[#09090b] border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
