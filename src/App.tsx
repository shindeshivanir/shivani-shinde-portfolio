import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UatBuilderDemo from "./components/UatBuilderDemo";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import EducationCertifications from "./components/EducationCertifications";
import ContactQAQueue from "./components/ContactQAQueue";
import QADashboardConsole from "./components/QADashboardConsole";
import { QAProvider } from "./context/QAContext";
import { PERSONAL_INFO } from "./data";
import { ShieldAlert, ArrowUp, Star } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor Scroll for Top Button and Nav Highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top button visibility
      setShowScrollTop(window.scrollY > 500);

      // Section intersection observer fallback mapping
      const sections = ["hero", "uat-builder", "skills", "experience", "projects", "edu-certs", "qa-queue"];
      const scrollPosition = window.scrollY + 120; // offset threshold

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToId = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <QAProvider>
      <div className="bg-[#09090b] min-h-screen text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-300 antialiased">
        
        {/* Sticky Navigation Header */}
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Main Single Page Sections */}
        <main className="flex-1">
          <Hero onScrollToSection={handleScrollToId} />
          <UatBuilderDemo />
          <Skills />
          <Experience />
          <Projects onScrollToSection={handleScrollToId} />
          <EducationCertifications />
          <ContactQAQueue />
        </main>

        {/* Footer block */}
        <footer className="bg-[#09090b] border-t border-zinc-800 py-12 text-center text-xs text-zinc-500 font-mono space-y-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <span className="font-bold text-zinc-300 block">{PERSONAL_INFO.name}</span>
              <span>{PERSONAL_INFO.title}</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">GitHub</a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-indigo-400 transition-colors">Email</a>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800/60 max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-600">
            <span>&copy; {new Date().getFullYear()} Shivani Shinde. All rights reserved.</span>
            <span className="flex items-center space-x-1">
              <span>Powered by</span>
              <Star className="w-3 h-3 text-indigo-500 fill-indigo-500" />
              <span className="text-zinc-500">Google AI Studio & Gemini LLM</span>
            </span>
          </div>
        </footer>

        {/* Floating Back-To-Top Button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 p-3 bg-gradient-to-tr from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all z-40 cursor-pointer"
            title="Back to top"
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </button>
        )}

        {/* Floating QA Diagnostics Console Overlay */}
        <QADashboardConsole />

      </div>
    </QAProvider>
  );
}
