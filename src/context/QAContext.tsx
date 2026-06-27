import React, { createContext, useContext, useState, useEffect } from "react";

export interface Bug {
  id: string;
  name: string;
  type: "Visual" | "Functional" | "Localization";
  description: string;
  reproductionSteps: string;
  section: string;
}

interface QAContextType {
  bugHuntEnabled: boolean;
  setBugHuntEnabled: (enabled: boolean) => void;
  foundBugs: string[];
  findBug: (id: string) => void;
  resetBugHunt: () => void;
  runSiteAudit: () => void;
  isAuditing: boolean;
  auditLogs: string[];
  auditCompleted: boolean;
  performanceOverlay: boolean;
  setPerformanceOverlay: (enabled: boolean) => void;
  allBugs: Bug[];
}

const QAContext = createContext<QAContextType | undefined>(undefined);

export const ALL_BUGS: Bug[] = [
  {
    id: "bug-visual-layer",
    name: "Z-Index Layering Clump",
    type: "Visual",
    description: "The 'Interactive Tool' CTA badge is trapped beneath its surrounding background gradient block.",
    reproductionSteps: "1. Scroll to Key Project Showcases.\n2. Observe the 'Interactive Tool' button's visual clipping.\n3. Click to isolate element layers.",
    section: "Projects Section"
  },
  {
    id: "bug-responsive-overflow",
    name: "Label Layout Overflow",
    type: "Functional",
    description: "The associated tools section on the Java Developer intern card suffers from text clipping and overflow.",
    reproductionSteps: "1. Scroll to Employment Timeline.\n2. Open the Java Intern Card.\n3. Note the misaligned and clipped tool badges on small resolutions.",
    section: "Experience Section"
  },
  {
    id: "bug-spelling-cert",
    name: "Spelling Check Typo Fail",
    type: "Localization",
    description: "The verified certifications header displays 'Verified Certificatiions' with a typo (double-i).",
    reproductionSteps: "1. Scroll to Education & Certifications.\n2. Scan the sub-card heading.\n3. Note spelling deviation from English dictionary standard.",
    section: "Certifications Sub-Card"
  }
];

export function QAProvider({ children }: { children: React.ReactNode }) {
  const [bugHuntEnabled, setBugHuntEnabled] = useState(false);
  const [foundBugs, setFoundBugs] = useState<string[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [auditCompleted, setAuditCompleted] = useState(false);
  const [performanceOverlay, setPerformanceOverlay] = useState(false);

  // Sync with local storage to persist the gamified state nicely
  useEffect(() => {
    const saved = localStorage.getItem("qa_portfolio_found_bugs");
    if (saved) {
      setFoundBugs(JSON.parse(saved));
    }
    const mode = localStorage.getItem("qa_portfolio_bughunt_mode");
    if (mode === "true") {
      setBugHuntEnabled(true);
    }
  }, []);

  const findBug = (id: string) => {
    if (!bugHuntEnabled || foundBugs.includes(id)) return;
    const next = [...foundBugs, id];
    setFoundBugs(next);
    localStorage.setItem("qa_portfolio_found_bugs", JSON.stringify(next));

    // Show custom alert
    const bug = ALL_BUGS.find(b => b.id === id);
    if (bug) {
      // Create global event or trigger some notification
      const event = new CustomEvent("qa-bug-found", { detail: bug });
      window.dispatchEvent(event);
    }
  };

  const resetBugHunt = () => {
    setFoundBugs([]);
    localStorage.removeItem("qa_portfolio_found_bugs");
  };

  const runSiteAudit = () => {
    setIsAuditing(true);
    setAuditCompleted(false);
    setAuditLogs([]);

    const steps = [
      "Initializing AI Studio Sandbox Audit Runner v1.4.2...",
      "SCANNING: Testing global viewport scaling (Target >= 320px)...",
      "[PASS] Viewport layout fluid. Flex and grid parameters fully adaptive.",
      "SCANNING: Auditing anchor link routes for DOM node presence...",
      "[PASS] Anchors: #hero, #uat-builder, #skills, #experience, #projects, #edu-certs, #qa-queue successfully mapped.",
      "SCANNING: Calculating relative element target sizing (Accessibility guidelines)...",
      "[PASS] Interactive target area verification completed. Touch sizing >= 44px confirmed.",
      "SCANNING: Running REST API handshake simulation for Gemini model integrations...",
      "[PASS] server-side proxy route `/api/generate-uat` completed successfully (Latency: 284ms).",
      "SCANNING: Checking performance parameters & layout stability (CLS & LCP)...",
      "[PASS] Cumulative Layout Shift = 0.012, LCP = 1.1s. Portfolio meets Core Web Vitals standard.",
      "AUDIT SUMMARY: Site is fully functional, 100% compliant with professional web standards!"
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setAuditLogs((prev) => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsAuditing(false);
        setAuditCompleted(true);
      }
    }, 600);
  };

  return (
    <QAContext.Provider
      value={{
        bugHuntEnabled,
        setBugHuntEnabled: (val) => {
          setBugHuntEnabled(val);
          localStorage.setItem("qa_portfolio_bughunt_mode", String(val));
        },
        foundBugs,
        findBug,
        resetBugHunt,
        runSiteAudit,
        isAuditing,
        auditLogs,
        auditCompleted,
        performanceOverlay,
        setPerformanceOverlay,
        allBugs: ALL_BUGS
      }}
    >
      {children}
    </QAContext.Provider>
  );
}

export function useQA() {
  const context = useContext(QAContext);
  if (!context) {
    throw new Error("useQA must be used within a QAProvider");
  }
  return context;
}
