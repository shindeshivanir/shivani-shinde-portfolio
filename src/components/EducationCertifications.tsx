import { motion } from "motion/react";
import { GraduationCap, Award, CheckCircle, BookOpen, AlertTriangle } from "lucide-react";
import { EDUCATION, CERTIFICATIONS, ACHIEVEMENTS } from "../data";
import { useQA } from "../context/QAContext";

export default function EducationCertifications() {
  const { bugHuntEnabled, foundBugs, findBug } = useQA();
  const isBugActive = bugHuntEnabled && !foundBugs.includes("bug-spelling-cert");
  return (
    <section id="edu-certs" className="py-24 bg-[#09090b] border-b border-zinc-800 relative">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-950/40 border border-indigo-800 rounded-full">
            <Award className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              Credentials & Accolades
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
            Education & Certifications
          </h2>
          <p className="font-sans text-zinc-400 text-base sm:text-lg">
            Academic qualifications, verified industry achievements, and technical hackathon placements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: B.Tech Education Card */}
          <div className="lg:col-span-6 bg-[#18181b] p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col justify-between text-left shadow-xl relative overflow-hidden group">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-3xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-zinc-800">
                <div className="p-3 bg-indigo-950/40 border border-indigo-800 rounded-2xl">
                  <GraduationCap className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-wider font-semibold">
                    Academic Degree
                  </span>
                  <h3 className="font-sans font-extrabold text-white text-lg tracking-tight">
                    {EDUCATION.degree}
                  </h3>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-sans font-bold text-zinc-200 text-sm">
                  {EDUCATION.institution}
                </h4>
                <div className="flex items-center space-x-4 font-mono text-xs text-zinc-400">
                  <span>Graduation: {EDUCATION.year}</span>
                  <span className="h-3 w-px bg-zinc-800" />
                  <span className="text-indigo-400 font-bold">{EDUCATION.score}</span>
                </div>
              </div>

              <ul className="space-y-3 pt-2">
                {EDUCATION.highlights.map((hl, idx) => (
                  <li key={idx} className="font-sans text-xs text-zinc-350 leading-relaxed flex items-start space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-800 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              Dr. Babasaheb Ambedkar Tech University // First Class Distinction
            </div>
          </div>

          {/* Right Block: Certifications & Achievements List */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Certifications Sub-card */}
            <div className="bg-[#18181b] p-6 rounded-3xl border border-zinc-800 text-left space-y-4 shadow-xl">
              <h3 className="font-sans font-bold text-white text-sm uppercase tracking-wider flex items-center justify-between pb-2 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4.5 h-4.5 text-indigo-400" />
                  {isBugActive ? (
                    <button
                      onClick={() => findBug("bug-spelling-cert")}
                      className="cursor-pointer border-b border-dashed border-rose-400 hover:text-rose-300 transition-colors flex items-center space-x-1 text-left outline-none"
                      title="Click to resolve localization/spelling error"
                    >
                      <span>Verified Certificatiions</span>
                      <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse inline ml-1" />
                    </button>
                  ) : (
                    <span>Verified Certifications</span>
                  )}
                </div>
                {isBugActive && (
                  <span className="font-mono text-[8px] text-rose-400 uppercase font-semibold">TYPO</span>
                )}
              </h3>

              <div className="grid gap-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 bg-[#09090b] border border-zinc-850 rounded-2xl hover:border-zinc-700 transition-colors"
                  >
                    <div className="space-y-1 text-left">
                      <h4 className="font-sans font-bold text-zinc-200 text-xs sm:text-sm">
                        {cert.name}
                      </h4>
                      <p className="font-sans text-[11px] text-zinc-500 font-medium">
                        Issuer: {cert.issuer}
                      </p>
                    </div>
                    {cert.year && (
                      <span className="font-mono text-[10px] text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-900/40 font-bold">
                        {cert.year}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Sub-card */}
            <div className="bg-[#18181b] p-6 rounded-3xl border border-zinc-800 text-left space-y-4 shadow-xl flex-1">
              <h3 className="font-sans font-bold text-white text-sm uppercase tracking-wider flex items-center space-x-2 pb-2 border-b border-zinc-800">
                <Award className="w-4.5 h-4.5 text-indigo-400 animate-pulse" />
                <span>Achievements & Honors</span>
              </h3>

              <div className="space-y-3.5">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-left">
                    <div className="mt-1 p-1 bg-indigo-950 border border-indigo-900/60 rounded-lg text-indigo-400 shrink-0">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-zinc-200 text-xs sm:text-sm">
                        {ach.title}
                      </h4>
                      <p className="font-sans text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
