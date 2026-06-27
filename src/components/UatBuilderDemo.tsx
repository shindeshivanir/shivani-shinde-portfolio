import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Sparkles, Send, RefreshCw, Copy, CheckCircle2, ListTodo, AlertCircle } from "lucide-react";
import { PRESET_TEST_STEPS } from "../data";
import { UatScript } from "../types";

export default function UatBuilderDemo() {
  const [inputText, setInputText] = useState(PRESET_TEST_STEPS[0].steps);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [result, setResult] = useState<UatScript | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Checkbox states to simulate executing the generated UAT script
  const [checkedPreconditions, setCheckedPreconditions] = useState<Record<number, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [checkedPostconditions, setCheckedPostconditions] = useState<Record<number, boolean>>({});

  const loadingMessages = [
    "Analyzing informal action sentences...",
    "Instantiating Gemini 3.5 LLM context...",
    "Extracting system state pre-conditions...",
    "Synthesizing granular steps with action-verbs...",
    "Formulating matching expected results...",
    "Assembling structured JSON payload...",
    "Reviewing test case against IEEE QA guidelines..."
  ];

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);
    setIsSimulated(false);
    setCheckedPreconditions({});
    setCheckedSteps({});
    setCheckedPostconditions({});

    // Cycle through loading messages to make it engaging
    let msgIdx = 0;
    setLoadingMessage(loadingMessages[0]);
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[msgIdx]);
    }, 1200);

    try {
      const response = await fetch("/api/generate-uat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ steps: inputText }),
      });

      const json = await response.json();
      clearInterval(interval);

      if (json.success && json.data) {
        setResult(json.data);
        setIsSimulated(!!json.simulated);
      } else {
        setError(json.error || "Failed to generate UAT script. Please try again.");
      }
    } catch (err) {
      clearInterval(interval);
      setError("Server connection issue. Please make sure the backend is active.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (!result) return;

    const markdown = `
# UAT Script: ${result.title}

## Description
${result.description}

## Pre-conditions
${result.preconditions.map((pc) => `- [ ] ${pc}`).join("\n")}

## Test Steps
| Step | Action | Expected Result |
|---|---|---|
${result.steps.map((st) => `| ${st.stepNumber} | ${st.action} | ${st.expectedResult} |`).join("\n")}

## Post-conditions
${result.postconditions.map((post) => `- [ ] ${post}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Progress metrics
  const totalItems = result 
    ? result.preconditions.length + result.steps.length + result.postconditions.length
    : 0;

  const completedItems = result
    ? Object.values(checkedPreconditions).filter(Boolean).length +
      Object.values(checkedSteps).filter(Boolean).length +
      Object.values(checkedPostconditions).filter(Boolean).length
    : 0;

  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <section id="uat-builder" className="py-24 bg-[#09090b] border-t border-b border-zinc-800 relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-950/40 border border-indigo-800 rounded-full">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              Flagship AI Project Showcase
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
            AI-Powered UAT Script Builder
          </h2>
          <p className="font-sans text-zinc-400 text-base sm:text-lg">
            Shivani built a tool using the Gemini API that bridges the gap between informal client/dev notes and professional testing templates. Try a live simulation below to see it in action!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Inputs & Presets */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#18181b] p-6 rounded-3xl border border-zinc-800 shadow-xl space-y-4 text-left">
              <h3 className="font-sans font-bold text-white text-lg flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span>1. Provide Raw Test Steps</span>
              </h3>
              
              <p className="font-sans text-xs text-zinc-400">
                Write a quick paragraph describing what steps an end-user takes, or select one of our pre-configured templates:
              </p>

              {/* Preset buttons */}
              <div className="flex flex-col gap-2.5">
                {PRESET_TEST_STEPS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(preset.steps)}
                    className={`text-left px-3.5 py-3 rounded-2xl font-sans text-xs border transition-all flex flex-col space-y-1 ${
                      inputText === preset.steps
                        ? "bg-indigo-950/40 border-indigo-500/50 text-indigo-300 shadow-inner"
                        : "bg-[#09090b] border-zinc-800 text-zinc-300 hover:border-zinc-700"
                    }`}
                  >
                    <span className="font-semibold block">{preset.label}</span>
                    <span className="text-zinc-500 block truncate max-w-md">{preset.steps}</span>
                  </button>
                ))}
              </div>

              {/* Text Area */}
              <div className="relative pt-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-44 bg-[#09090b] border border-zinc-800 focus:border-indigo-500/80 rounded-2xl p-4 font-sans text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                  placeholder="Type your custom raw test sequence here..."
                />
              </div>

              {/* Submit Trigger */}
              <button
                onClick={handleGenerate}
                disabled={loading || !inputText.trim()}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-sm py-3.5 rounded-2xl shadow-xl shadow-indigo-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing UAT Model...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate Structured UAT Script</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Result / Output */}
          <div className="lg:col-span-7">
            
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-[#18181b] border border-zinc-800 rounded-3xl p-12 flex flex-col items-center justify-center space-y-6 min-h-[480px] shadow-2xl backdrop-blur-sm"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-zinc-800 border-t-indigo-500 rounded-full animate-spin" />
                    <Sparkles className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <div className="text-center space-y-2">
                    <h4 className="font-sans font-bold text-white text-base">Assembling QA Architecture</h4>
                    <p className="font-mono text-xs text-indigo-400 h-5 transition-all">{loadingMessage}</p>
                  </div>
                </motion.div>
              )}

              {!loading && !result && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-2 border-dashed border-zinc-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[480px] bg-[#18181b]/20"
                >
                  <div className="p-4 bg-[#18181b] border border-zinc-800 rounded-3xl text-zinc-500">
                    <Cpu className="w-8 h-8" />
                  </div>
                  <div className="max-w-sm space-y-2">
                    <h4 className="font-sans font-semibold text-zinc-300">Ready for Execution</h4>
                    <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                      Select a preset scenario on the left or enter your own notes, then click generate to compile a structured test suite.
                    </p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#18181b] border border-red-900/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[480px]"
                >
                  <div className="p-3 bg-red-950/30 border border-red-800/40 rounded-2xl text-red-400">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-bold text-white">Generation Error</h4>
                  <p className="font-sans text-xs text-zinc-400 max-w-md leading-relaxed">{error}</p>
                  <button
                    onClick={handleGenerate}
                    className="flex items-center space-x-2 bg-[#09090b] border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded-2xl font-mono text-xs text-zinc-300"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Request</span>
                  </button>
                </motion.div>
              )}

              {!loading && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#18181b] p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl text-left space-y-6"
                >
                  {/* Status Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                    <div>
                      <span className="font-mono text-[10px] text-indigo-400 tracking-widest uppercase block mb-1">
                        GENERATED_OUTPUT // UAT_SUITE
                      </span>
                      <h4 className="font-sans font-extrabold text-white text-xl tracking-tight">
                        {result.title}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCopyMarkdown}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-[#09090b] border border-zinc-800 hover:border-zinc-700 text-zinc-350 font-sans text-xs transition-colors"
                        title="Copy Markdown Code"
                      >
                        <Copy className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{copied ? "Copied!" : "Copy MD"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Objective */}
                  <div className="p-4 bg-[#09090b]/60 border border-zinc-800/80 rounded-2xl space-y-1.5">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                      Test Objective
                    </span>
                    <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  {/* Simulated Execution Progress Bar */}
                  <div className="space-y-2 border-b border-zinc-800 pb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-sans font-medium text-zinc-400 flex items-center space-x-1.5">
                        <ListTodo className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Interactive Test Executor</span>
                      </span>
                      <span className="font-mono font-bold text-indigo-400">{progressPercent}% Passed</span>
                    </div>
                    <div className="h-2 bg-zinc-950 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-500 font-sans italic">
                      Tip: Check off pre-conditions and test steps below to simulate a live UAT validation cycle!
                    </p>
                  </div>

                  {/* Pre-conditions Checkbox */}
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                      1. Pre-Conditions Checkpoints
                    </span>
                    <div className="space-y-2">
                      {result.preconditions.map((pre, idx) => (
                        <label
                          key={idx}
                          className="flex items-start space-x-3 p-2.5 bg-[#09090b]/40 border border-zinc-800 hover:bg-[#09090b] rounded-2xl cursor-pointer transition-colors text-xs text-zinc-350"
                        >
                          <input
                            type="checkbox"
                            checked={!!checkedPreconditions[idx]}
                            onChange={(e) =>
                              setCheckedPreconditions({ ...checkedPreconditions, [idx]: e.target.checked })
                            }
                            className="mt-0.5 rounded border-zinc-700 text-indigo-500 focus:ring-indigo-500 bg-zinc-950 w-4 h-4"
                          />
                          <span className={checkedPreconditions[idx] ? "line-through text-zinc-500" : ""}>{pre}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Test Steps Table */}
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                      2. Step-by-Step Test Execution
                    </span>
                    
                    <div className="overflow-x-auto border border-zinc-800 rounded-2xl">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#09090b] border-b border-zinc-800">
                            <th className="py-3 px-4 font-mono font-medium text-zinc-400 w-12">Step</th>
                            <th className="py-3 px-4 font-mono font-medium text-zinc-400">Action Script</th>
                            <th className="py-3 px-4 font-mono font-medium text-zinc-400">Expected Result</th>
                            <th className="py-3 px-4 font-mono font-medium text-zinc-400 w-16 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.steps.map((st, idx) => (
                            <tr
                              key={idx}
                              className={`border-b border-zinc-850 hover:bg-[#09090b]/40 transition-all ${
                                checkedSteps[idx] ? "bg-indigo-950/10 text-zinc-500" : "text-zinc-200"
                              }`}
                            >
                              <td className="py-3.5 px-4 font-mono font-semibold">{st.stepNumber}</td>
                              <td className="py-3.5 px-4 leading-relaxed">
                                <span className={checkedSteps[idx] ? "line-through text-zinc-500" : ""}>
                                  {st.action}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-zinc-350 leading-relaxed">
                                <span className={checkedSteps[idx] ? "line-through text-zinc-500" : ""}>
                                  {st.expectedResult}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <input
                                  type="checkbox"
                                  checked={!!checkedSteps[idx]}
                                  onChange={(e) => setCheckedSteps({ ...checkedSteps, [idx]: e.target.checked })}
                                  className="rounded border-zinc-700 text-indigo-500 focus:ring-indigo-500 bg-zinc-950 w-4 h-4 cursor-pointer"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Post-conditions Checkbox */}
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                      3. Post-Execution Validation
                    </span>
                    <div className="space-y-2">
                      {result.postconditions.map((post, idx) => (
                        <label
                          key={idx}
                          className="flex items-start space-x-3 p-2.5 bg-[#09090b]/40 border border-zinc-800 hover:bg-[#09090b] rounded-2xl cursor-pointer transition-colors text-xs text-zinc-350"
                        >
                          <input
                            type="checkbox"
                            checked={!!checkedPostconditions[idx]}
                            onChange={(e) =>
                              setCheckedPostconditions({ ...checkedPostconditions, [idx]: e.target.checked })
                            }
                            className="mt-0.5 rounded border-zinc-700 text-indigo-500 focus:ring-indigo-500 bg-zinc-950 w-4 h-4"
                          />
                          <span className={checkedPostconditions[idx] ? "line-through text-zinc-500" : ""}>{post}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Simulation Tag and Instructions */}
                  <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${isSimulated ? "bg-amber-500 animate-pulse" : "bg-indigo-500"}`} />
                      <span className="font-mono text-[10px] text-zinc-400">
                        {isSimulated 
                          ? "QA_BACKUP_SIMULATOR_ENGINE // ACTIVE" 
                          : "GEMINI_COGNITIVE_API // LIVE_FEED"}
                      </span>
                    </div>

                    {progressPercent === 100 && (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-3 py-1 rounded-full font-sans font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>All QA test steps PASSED successfully!</span>
                      </motion.div>
                    )}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
