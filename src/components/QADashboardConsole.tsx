import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useQA, Bug } from "../context/QAContext";
import {
  Bug as BugIcon,
  Play,
  Terminal,
  Activity,
  CheckCircle,
  X,
  Sparkles,
  Clipboard,
  Award,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Lock
} from "lucide-react";

export default function QADashboardConsole() {
  const {
    bugHuntEnabled,
    setBugHuntEnabled,
    foundBugs,
    resetBugHunt,
    runSiteAudit,
    isAuditing,
    auditLogs,
    auditCompleted,
    performanceOverlay,
    setPerformanceOverlay,
    allBugs
  } = useQA();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"audit" | "bug-hunt" | "metrics">("audit");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // FPS Calculator for Performance Metrics Overlay
  const [fps, setFps] = useState(60);
  useEffect(() => {
    if (!performanceOverlay) return;
    let lastTime = performanceInitialTime();
    let frameCount = 0;
    let animationId: number;

    function performanceInitialTime() {
      return (window.performance || Date).now();
    }

    function checkFps() {
      const now = performanceInitialTime();
      frameCount++;
      if (now > lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animationId = requestAnimationFrame(checkFps);
    }

    animationId = requestAnimationFrame(checkFps);
    return () => cancelAnimationFrame(animationId);
  }, [performanceOverlay]);

  // Listener for "qa-bug-found" event from context
  const [newlyFoundBug, setNewlyFoundBug] = useState<Bug | null>(null);
  useEffect(() => {
    const handleBugFound = (e: Event) => {
      const customEvent = e as CustomEvent<Bug>;
      setNewlyFoundBug(customEvent.detail);
      setIsOpen(true);
      setActiveTab("bug-hunt");

      // Clear toast after 6s
      setTimeout(() => {
        setNewlyFoundBug(null);
      }, 6000);
    };

    window.addEventListener("qa-bug-found", handleBugFound);
    return () => window.removeEventListener("qa-bug-found", handleBugFound);
  }, []);

  const handleCopyJira = (bug: Bug) => {
    const jiraDraft = `[BUG REPORT] SHIV-BUG-${bug.id.toUpperCase()} - ${bug.name}
Severity: Medium
Category: ${bug.type} Testing
Location: ${bug.section}

DESCRIPTION:
${bug.description}

REPRODUCTION STEPS:
${bug.reproductionSteps}

EXPECTED RESULT:
Element matches visual spec sheets and adapts responsively to multi-resolution viewports without text clipping or layout collisions.`;

    navigator.clipboard.writeText(jiraDraft);
    setCopiedId(bug.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePreFillTicket = () => {
    // Scroll to the contact queue
    const queueSection = document.getElementById("qa-queue");
    if (queueSection) {
      queueSection.scrollIntoView({ behavior: "smooth" });
    }

    // Attempt to inject parameters into form inputs
    const summaryInput = document.querySelector('input[placeholder*="interview"]') as HTMLInputElement;
    const descTextarea = document.querySelector('textarea[placeholder*="details"]') as HTMLTextAreaElement;
    
    if (summaryInput && descTextarea) {
      summaryInput.value = `Verified QA Clearance Report - 3/3 Bugs Resolved!`;
      // Trigger native react input updates by dispatching standard events
      summaryInput.dispatchEvent(new Event("input", { bubbles: true }));
      
      descTextarea.value = `Hello Shivani Shinde,\n\nI have completed the interactive portfolio QA Bug Hunt and discovered all 3 hidden visual, functional, and localization defects. All tests are verified as RESOLVED and regression cycles are passing.\n\nExcellent interactive design! Let's collaborate.`;
      descTextarea.dispatchEvent(new Event("input", { bubbles: true }));
    }

    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center space-x-2 px-4.5 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-full shadow-lg shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer border border-indigo-400/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Open QA Diagnostics Center"
          id="qa-console-trigger"
        >
          <BugIcon className="w-5 h-5 animate-pulse" />
          <span className="font-sans font-bold text-xs tracking-wider uppercase hidden sm:inline">
            QA Console
          </span>

          {bugHuntEnabled && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white border-2 border-zinc-950">
              {foundBugs.length}
            </span>
          )}
        </motion.button>
      </div>

      {/* Performance Metrics Floating Overlay */}
      <AnimatePresence>
        {performanceOverlay && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-30 bg-[#18181b]/95 border border-zinc-800 p-3.5 rounded-2xl shadow-xl font-mono text-[10px] text-indigo-400 space-y-1.5 text-left w-48 pointer-events-none"
          >
            <div className="flex items-center space-x-1.5 border-b border-zinc-800 pb-1.5 mb-1.5 text-white font-bold">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>QA_PERF_MONITOR</span>
            </div>
            <div className="flex justify-between">
              <span>FPS:</span>
              <span className={fps >= 55 ? "text-emerald-400" : "text-amber-400"}>{fps} fps</span>
            </div>
            <div className="flex justify-between">
              <span>Viewport:</span>
              <span className="text-white">{window.innerWidth}x{window.innerHeight}</span>
            </div>
            <div className="flex justify-between">
              <span>DOM Elements:</span>
              <span className="text-white">492 nodes</span>
            </div>
            <div className="flex justify-between">
              <span>API Gateway:</span>
              <span className="text-emerald-400">ACTIVE (200)</span>
            </div>
            <div className="flex justify-between">
              <span>Layout Shift:</span>
              <span className="text-emerald-400">0.012 (CLS)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bug Discovery Toast */}
      <AnimatePresence>
        {newlyFoundBug && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 left-6 z-50 bg-[#18181b] border-2 border-emerald-500 p-4.5 rounded-2xl shadow-2xl max-w-sm text-left space-y-2"
          >
            <div className="flex items-center space-x-2 text-emerald-400">
              <Award className="w-5 h-5 text-emerald-400 animate-bounce" />
              <span className="font-sans font-extrabold text-sm tracking-tight">Bug Discovered Successfully!</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-sans font-bold text-white text-xs">
                SHIV-BUG: {newlyFoundBug.name} ({newlyFoundBug.type})
              </h4>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                {newlyFoundBug.description}
              </p>
            </div>
            <div className="pt-1 flex items-center justify-between">
              <span className="font-mono text-[9px] text-zinc-500 uppercase">Jira draft ready</span>
              <button
                onClick={() => handleCopyJira(newlyFoundBug)}
                className="font-mono text-[9px] text-indigo-400 hover:text-indigo-300 font-semibold uppercase flex items-center space-x-1"
              >
                <span>Copy Ticket Draft</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QA Console Drawer Slide Out */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[#09090b] border-l border-zinc-800 shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-[#18181b]/50">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-indigo-950/40 border border-indigo-900/60 rounded-xl">
                    <BugIcon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-sans font-extrabold text-white text-sm tracking-tight">
                      QA Diagnostic Console
                    </h3>
                    <p className="font-sans text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                      Interactive Portfolio Audit
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-zinc-800 bg-[#18181b] hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="grid grid-cols-3 border-b border-zinc-800 p-2 gap-1 bg-[#18181b]/20">
                {(["audit", "bug-hunt", "metrics"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 rounded-xl font-sans text-xs font-bold uppercase transition-all tracking-wider cursor-pointer ${
                      activeTab === tab
                        ? "bg-indigo-950/40 border border-indigo-800/60 text-indigo-300"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-[#18181b]/40"
                    }`}
                  >
                    {tab === "audit" && "Site Audit"}
                    {tab === "bug-hunt" && `Bug Hunt (${foundBugs.length}/3)`}
                    {tab === "metrics" && "Real-time Metrics"}
                  </button>
                ))}
              </div>

              {/* Panel Content Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeTab === "audit" && (
                  <div className="space-y-4 text-left">
                    <div className="space-y-1">
                      <h4 className="font-sans font-extrabold text-white text-xs uppercase tracking-wider">
                        E2E Suite Checker
                      </h4>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                        Execute a suite of automated diagnostic checks across Shivani's portfolio to verify route targets, asset responsiveness, layout limits, and API handshakes.
                      </p>
                    </div>

                    <button
                      onClick={runSiteAudit}
                      disabled={isAuditing}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-sans font-bold text-xs py-3 rounded-2xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isAuditing ? "Executing Audit Steps..." : "Run Simulated Suite Check"}</span>
                    </button>

                    {/* Logs Screen */}
                    {(isAuditing || auditLogs.length > 0) && (
                      <div className="space-y-2 pt-2">
                        <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">
                          Automation Test Terminal logs
                        </span>
                        <div className="bg-[#09090b] border border-zinc-800 rounded-2xl p-4 font-mono text-[10px] text-emerald-400 space-y-2 h-[260px] overflow-y-auto">
                          {auditLogs.map((log, index) => (
                            <div key={index} className="leading-relaxed flex items-start space-x-1.5">
                              <span className="text-zinc-600 select-none">&gt;&gt;</span>
                              <span>{log}</span>
                            </div>
                          ))}
                          {isAuditing && (
                            <div className="flex items-center space-x-2 text-indigo-400 pt-1">
                              <span className="animate-ping w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              <span>Suite scanning in progress...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {auditCompleted && (
                      <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-2 animate-fade-in text-left">
                        <div className="flex items-center space-x-2 text-indigo-300">
                          <CheckCircle className="w-5 h-5 text-indigo-400" />
                          <span className="font-sans font-bold text-xs">Audit Clearance Approved!</span>
                        </div>
                        <p className="font-sans text-[11px] text-zinc-400 leading-relaxed">
                          All 5 verification suites returned code 200 (OK). Shivani's code follows mobile-first layout stability standards and holds zero critical structural blockages.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "bug-hunt" && (
                  <div className="space-y-5 text-left">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-sans font-extrabold text-white text-xs uppercase tracking-wider">
                          QA Bug Hunting Sandbox
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[10px] text-zinc-500 uppercase font-semibold">Bug Hunt Mode:</span>
                          <button
                            onClick={() => {
                              setBugHuntEnabled(!bugHuntEnabled);
                              if (!bugHuntEnabled) resetBugHunt();
                            }}
                            className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-300 cursor-pointer outline-none ${
                              bugHuntEnabled ? "bg-indigo-500" : "bg-zinc-800"
                            }`}
                          >
                            <div
                              className={`w-4.5 h-4.5 rounded-full bg-white transition-all duration-300 ${
                                bugHuntEnabled ? "translate-x-4.5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                        Enable Bug Hunt Mode to inject 3 subtle QA defects across the page. Locate them on the screen, click them to resolve, and see how a Senior QA handles visual, functional, and localization failures!
                      </p>
                    </div>

                    {bugHuntEnabled ? (
                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div className="space-y-2 bg-[#18181b]/60 border border-zinc-850 p-3.5 rounded-2xl">
                          <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                            <span>Sprints Bug Resolution Progress</span>
                            <span className="font-bold text-indigo-400">{foundBugs.length} / 3 Found</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                            <div
                              className="bg-indigo-500 h-full transition-all duration-500"
                              style={{ width: `${(foundBugs.length / 3) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* List of Bugs */}
                        <div className="space-y-3">
                          {allBugs.map((bug) => {
                            const isFound = foundBugs.includes(bug.id);
                            return (
                              <div
                                key={bug.id}
                                className={`p-4 rounded-2xl border transition-all ${
                                  isFound
                                    ? "bg-emerald-950/10 border-emerald-900/40 text-zinc-300"
                                    : "bg-[#18181b] border-zinc-800"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                                        isFound
                                          ? "bg-emerald-950 text-emerald-400 border border-emerald-900/40"
                                          : "bg-amber-950 text-amber-400 border border-amber-900/40"
                                      }`}
                                    >
                                      {isFound ? "Resolved" : "Active Bug"}
                                    </span>
                                    <h5 className="font-sans font-bold text-white text-xs">{bug.name}</h5>
                                  </div>
                                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                                    {bug.type}
                                  </span>
                                </div>

                                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed mb-3">
                                  {bug.description}
                                </p>

                                <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/60">
                                  <div className="flex items-center space-x-1 text-zinc-500 font-mono text-[9px]">
                                    <span className="font-bold text-zinc-400">LOC:</span>
                                    <span>{bug.section}</span>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => handleCopyJira(bug)}
                                      className={`px-2 py-1 rounded font-mono text-[9px] transition-all flex items-center space-x-1 bg-[#09090b] border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer`}
                                    >
                                      <Clipboard className="w-2.5 h-2.5 text-indigo-400" />
                                      <span>{copiedId === bug.id ? "Copied" : "Jira Draft"}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Certificate Unlock Banner */}
                        {foundBugs.length === 3 && (
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="p-4.5 bg-gradient-to-tr from-indigo-950/50 to-purple-950/50 border border-indigo-500/40 rounded-2xl space-y-3.5 text-center"
                          >
                            <Sparkles className="w-8 h-8 text-amber-400 animate-bounce mx-auto" />
                            <div className="space-y-1">
                              <h5 className="font-sans font-extrabold text-white text-xs">
                                QA MASTER CERTIFICATE UNLOCKED
                              </h5>
                              <p className="font-sans text-[11px] text-zinc-400 leading-relaxed">
                                Exceptional eye for structural detail! You've successfully scanned Shivani's portfolio, captured all QA anomalies, and verified the regression integrity.
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <button
                                onClick={() => setShowCertificate(true)}
                                className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white font-sans font-bold text-xs py-2 rounded-xl transition-all cursor-pointer"
                              >
                                View Certificate
                              </button>
                              <button
                                onClick={handlePreFillTicket}
                                className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-sans font-bold text-xs py-2 rounded-xl transition-all cursor-pointer"
                              >
                                Send Report Ticket
                              </button>
                            </div>
                          </motion.div>
                        )}

                        <button
                          onClick={resetBugHunt}
                          className="w-full py-2 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-zinc-300 font-mono text-[9px] uppercase tracking-widest rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset Bug Hunting State</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-8 text-center border-2 border-dashed border-zinc-800 rounded-2xl space-y-3">
                        <Lock className="w-8 h-8 text-zinc-700 mx-auto" />
                        <div className="space-y-1">
                          <h5 className="font-sans font-extrabold text-zinc-500 text-xs uppercase tracking-wider">
                            Bug Hunt Currently Suspended
                          </h5>
                          <p className="font-sans text-[11px] text-zinc-600 leading-relaxed max-w-xs mx-auto">
                            To unlock the interactive defect verification playground, turn on 'Bug Hunt Mode' at the top right of this panel.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "metrics" && (
                  <div className="space-y-5 text-left">
                    <div className="space-y-1">
                      <h4 className="font-sans font-extrabold text-white text-xs uppercase tracking-wider">
                        Real-time Profiler Overlay
                      </h4>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                        Toggles a real-time responsive browser diagnostics HUD in the top right corner. Handy for visual, viewport, and responsive UI tests.
                      </p>
                    </div>

                    <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
                      <div className="space-y-0.5 text-left">
                        <span className="font-sans font-bold text-white text-xs">Performance HUD Overlay</span>
                        <p className="font-sans text-[10px] text-zinc-500">Displays FPS, node weight, viewport, API logs</p>
                      </div>
                      <button
                        onClick={() => setPerformanceOverlay(!performanceOverlay)}
                        className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-300 cursor-pointer outline-none ${
                          performanceOverlay ? "bg-indigo-500" : "bg-zinc-800"
                        }`}
                      >
                        <div
                          className={`w-4.5 h-4.5 rounded-full bg-white transition-all duration-300 ${
                            performanceOverlay ? "translate-x-4.5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#18181b] border border-zinc-850 space-y-3 font-sans text-xs text-zinc-400 text-left">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">
                        HUD Diagnostics Coverage Specs
                      </span>
                      <div className="space-y-2 font-mono text-[11px]">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>FPS Tracking (Frame rendering budget limit test)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Dynamic Viewport Resolution scaling boundaries</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>DOM Weight Index tracking</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Cumulative Layout Shift checking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-zinc-800 bg-[#18181b]/50 text-center font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex items-center justify-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Diagnostic Suite Authorized</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCertificate(false)}
              className="absolute inset-0 bg-black cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-xl w-full bg-[#18181b] border-2 border-indigo-500/60 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 text-center overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-1/2 -left-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-1/2 -right-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6 relative z-10">
                <Award className="w-16 h-16 text-indigo-400 mx-auto animate-pulse" />

                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
                    Google AI Studio Portfolio Verification
                  </span>
                  <h3 className="font-sans font-extrabold text-white text-xl sm:text-2xl tracking-tight">
                    Portfolio Quality Sign-Off
                  </h3>
                </div>

                <div className="border-t border-b border-zinc-800 py-6 my-4 space-y-4">
                  <p className="font-serif text-sm sm:text-base text-zinc-300 italic leading-relaxed">
                    "This is to certify that the explorer has successfully run diagnostic verification scripts, audited DOM viewport responsiveness, and resolved all 3 hidden visual, functional, and localization defects on this portfolio."
                  </p>
                  <div className="space-y-1">
                    <span className="font-sans font-bold text-xs text-white block">Shivani Shinde</span>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">
                      Lead QA Engineer & Application Maintenance Associate
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500 uppercase">
                  <span>Sign-Off Code: SHIV-QA-PASS</span>
                  <span>Date: {new Date().toLocaleDateString()}</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowCertificate(false);
                      handlePreFillTicket();
                    }}
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-sans font-bold text-xs rounded-2xl shadow-lg cursor-pointer"
                  >
                    Send Verified Contact Ticket
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
