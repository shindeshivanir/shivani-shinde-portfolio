import { motion } from "motion/react";
import { Mail, Phone, MapPin, Linkedin, Github, ArrowRight, ShieldCheck, Bug, Cpu, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const stats = [
    { label: "QA Experience", value: "1.10 Years", icon: ShieldCheck, color: "text-emerald-400" },
    { label: "UAT Scripts Owned", value: "50+", icon: Terminal, color: "text-indigo-400" },
    { label: "Test Cases in Azure DevOps", value: "50+", icon: Bug, color: "text-purple-400" },
    { label: "AI Tools Engineered", value: "1", icon: Cpu, color: "text-pink-400" },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-[#09090b]">
      {/* Decorative Grid and Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40" />
      
      {/* Light highlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-indigo-950/40 border border-indigo-800/50 px-3.5 py-1.5 rounded-full"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span className="font-mono text-xs font-semibold text-indigo-300 tracking-wide uppercase">
                Active Release QA Certification
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans font-extrabold text-white tracking-tight text-4xl sm:text-5xl lg:text-6xl"
              >
                Hi, I'm <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">{PERSONAL_INFO.name}</span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans font-medium text-zinc-300 text-lg sm:text-xl lg:text-2xl tracking-normal"
              >
                {PERSONAL_INFO.title}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-sans text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              {PERSONAL_INFO.summary}
            </motion.p>

            {/* Quick Contact & Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 text-sm font-mono text-zinc-300"
            >
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#18181b] border border-zinc-800 hover:border-zinc-750 hover:text-white transition-all">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#18181b] border border-zinc-800 hover:border-zinc-750 hover:text-white transition-all">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 {PERSONAL_INFO.phone}</span>
              </a>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#18181b] border border-zinc-800 text-zinc-300">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Maharashtra, India</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => onScrollToSection("uat-builder")}
                className="group flex items-center space-x-2.5 bg-white hover:bg-zinc-200 text-black font-sans font-extrabold text-sm px-6 py-3.5 rounded-full shadow-lg hover:scale-[1.01] transition-all"
              >
                <span>Try Live AI UAT Builder</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => onScrollToSection("qa-queue")}
                className="flex items-center space-x-2 bg-[#18181b] border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 text-zinc-200 font-sans font-semibold text-sm px-6 py-3.5 rounded-full transition-all"
              >
                <span>File QA Contact Ticket</span>
              </button>

              <div className="flex items-center space-x-3 sm:ml-4">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-[#18181b] border border-zinc-800 hover:border-zinc-700 hover:text-indigo-400 text-zinc-400 rounded-full transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-[#18181b] border border-zinc-800 hover:border-zinc-700 hover:text-indigo-400 text-zinc-400 rounded-full transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Stats & Visual Card (Right Side) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative p-6 sm:p-8 bg-[#18181b] border border-zinc-800 rounded-3xl shadow-2xl"
            >
              {/* Outer floating accents */}
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-indigo-500 rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-indigo-500 rounded-bl-lg" />

              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                      UAT_ENGINE_STATUS: ONLINE
                    </span>
                  </div>
                  <span className="font-mono text-xs text-indigo-400">v2.5</span>
                </div>

                {/* Grid of stats */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex flex-col space-y-2 hover:border-zinc-700 transition-all group text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs text-zinc-400 font-medium">
                            {stat.label}
                          </span>
                          <Icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                        </div>
                        <span className="font-mono text-lg sm:text-xl font-bold text-white tracking-tight">
                          {stat.value}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Micro UAT Console view */}
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-left">
                  <span className="font-mono text-[11px] text-indigo-400 block mb-2 font-semibold">
                    $ playwright test --project=chromium
                  </span>
                  <div className="font-mono text-xs text-zinc-400 space-y-1">
                    <div className="flex items-center space-x-1.5 text-emerald-400">
                      <span>✓</span>
                      <span>Verify login redirect (1.2s)</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-emerald-400">
                      <span>✓</span>
                      <span>Add item to cart validation (0.8s)</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-indigo-400">
                      <span>ℹ</span>
                      <span>AI Builder script generated matching template.</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
