import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Sparkles, Terminal, BookOpen, Layers, CheckCircle, Code, Play, RefreshCw, AlertCircle, Laptop } from "lucide-react";
import { SKILLS } from "../data";
import { Skill } from "../types";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(SKILLS[0]);

  // Code Generator State
  const [testAction, setTestAction] = useState("click");
  const [selector, setSelector] = useState("button#submit-form");
  const [inputValue, setInputValue] = useState("Shivani Shinde");

  // Simulation states
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simStep, setSimStep] = useState<"idle" | "loading" | "interacting" | "passed">("idle");
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [playgroundTab, setPlaygroundTab] = useState<"code" | "viewport">("code");
  const [simTypedText, setSimTypedText] = useState("");

  const triggerSimulation = () => {
    setIsRunningSim(true);
    setPlaygroundTab("viewport");
    setSimStep("loading");
    setSimTypedText("");
    setSimLogs(["[PLAYWRIGHT] Launching headless browser (Chromium v122)..."]);

    setTimeout(() => {
      setSimStep("interacting");
      setSimLogs((prev) => [
        ...prev,
        `[PLAYWRIGHT] page.goto('https://shivanis-portfolio-demo.app') - Response status 200`,
        `[PLAYWRIGHT] Locating selector('${selector}')...`
      ]);
    }, 1000);

    setTimeout(() => {
      if (testAction === "fill") {
        let chars = inputValue.split("");
        let current = "";
        chars.forEach((char, i) => {
          setTimeout(() => {
            current += char;
            setSimTypedText(current);
          }, i * 60);
        });
      }
      setSimLogs((prev) => [
        ...prev,
        `[PLAYWRIGHT] Triggering ${testAction.toUpperCase()} event on target locator...`
      ]);
    }, 2000);

    setTimeout(() => {
      setSimStep("passed");
      setSimLogs((prev) => [
        ...prev,
        testAction === "assert"
          ? `[PASS] expect(locator('${selector}')).toHaveText('${inputValue}') verified.`
          : `[PASS] Action completed. Suite regression check return 0.`,
        `[PLAYWRIGHT] Closing isolated browser context. Duration: 142ms.`
      ]);
      setIsRunningSim(false);
    }, 3800);
  };

  const categories = ["All", "Testing", "API Testing", "Automation", "AI & Tools", "Programming", "Process"];

  const filteredSkills = selectedCategory === "All"
    ? SKILLS
    : SKILLS.filter(s => s.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Testing": return <Shield className="w-4 h-4 text-emerald-400" />;
      case "API Testing": return <Terminal className="w-4 h-4 text-indigo-400" />;
      case "Automation": return <Code className="w-4 h-4 text-cyan-400" />;
      case "AI & Tools": return <Sparkles className="w-4 h-4 text-purple-400" />;
      case "Programming": return <BookOpen className="w-4 h-4 text-yellow-400" />;
      case "Process": return <Layers className="w-4 h-4 text-rose-400" />;
      default: return <CheckCircle className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Generate Playwright code dynamically
  const generatePlaywrightCode = () => {
    let script = `const { test, expect } = require('@playwright/test');\n\n`;
    script += `test('Verify custom user interaction flow', async ({ page }) => {\n`;
    script += `  // Navigate to application endpoint\n`;
    script += `  await page.goto('https://shivanis-portfolio-demo.app');\n\n`;

    if (testAction === "click") {
      script += `  // Click on targeted element\n`;
      script += `  const element = page.locator('${selector}');\n`;
      script += `  await expect(element).toBeVisible();\n`;
      script += `  await element.click();\n`;
    } else if (testAction === "fill") {
      script += `  // Input text into input field\n`;
      script += `  const field = page.locator('${selector}');\n`;
      script += `  await expect(field).toBeEditable();\n`;
      script += `  await field.fill('${inputValue}');\n`;
      script += `  await expect(field).toHaveValue('${inputValue}');\n`;
    } else if (testAction === "navigate") {
      script += `  // Validate redirection to secure panel\n`;
      script += `  await page.goto('${selector}');\n`;
      script += `  await expect(page).toHaveURL(new RegExp('${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'));\n`;
    } else if (testAction === "assert") {
      script += `  // Assert element state and visual matches\n`;
      script += `  const banner = page.locator('${selector}');\n`;
      script += `  await expect(banner).toBeVisible();\n`;
      script += `  await expect(banner).toContainText('${inputValue}');\n`;
    }

    script += `\n  // Assert global transaction completeness\n`;
    script += `  await expect(page.locator('.toast-success')).toBeVisible();\n`;
    script += `});`;
    return script;
  };

  return (
    <section id="skills" className="py-24 bg-[#09090b] relative overflow-hidden border-b border-zinc-800">
      {/* Lights */}
      <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-950/40 border border-indigo-800 rounded-full">
            <Code className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              Technical Competencies
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
            Comprehensive Skills Inventory
          </h2>
          <p className="font-sans text-zinc-400 text-base sm:text-lg">
            A comprehensive matrix of technical abilities spanning manual execution pipelines, API request verification, test automation scripting, and Agile workflows.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                // Auto-select first skill of that category for details
                const matched = cat === "All" ? SKILLS : SKILLS.filter(s => s.category === cat);
                setSelectedSkill(matched[0] || null);
              }}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full font-sans text-xs font-semibold border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-indigo-950 to-purple-950 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/5"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              {selectedCategory === cat && getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Grid of skills */}
          <div className="lg:col-span-7 bg-[#18181b] p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="font-sans font-bold text-zinc-300 text-sm">Targeted Skills ({filteredSkills.length})</span>
                <span className="font-mono text-[10px] text-zinc-500">CLICK_SKILL_FOR_DETAILS</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill) => {
                    const isSelected = selectedSkill?.name === skill.name;
                    return (
                      <motion.button
                        layout
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedSkill(skill)}
                        className={`text-left p-3.5 rounded-2xl border transition-all relative overflow-hidden group flex flex-col space-y-2.5 cursor-pointer ${
                          isSelected
                            ? "bg-[#09090b] border-indigo-500/60 shadow-md"
                            : "bg-[#09090b]/40 border-zinc-800/80 hover:border-zinc-700"
                        }`}
                      >
                        {/* Selected accent */}
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-indigo-500 rounded-bl-lg" />
                        )}

                        <div className="flex items-center justify-between">
                          <span className="font-sans font-semibold text-white text-xs tracking-tight group-hover:text-indigo-350 transition-colors">
                            {skill.name}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-zinc-500">
                            Lvl {skill.level}/5
                          </span>
                        </div>

                        {/* Visual rating bars */}
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((step) => (
                            <div
                              key={step}
                              className={`h-1.5 flex-1 rounded-sm ${
                                step <= skill.level
                                  ? isSelected
                                    ? "bg-indigo-500"
                                    : "bg-indigo-500/65 group-hover:bg-indigo-400"
                                  : "bg-zinc-800"
                              }`}
                            />
                          ))}
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Skill Detailed Panel */}
            {selectedSkill && (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-6 border-t border-zinc-800 space-y-2 text-left"
              >
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-lg bg-[#09090b] border border-zinc-800 font-mono text-[10px] text-indigo-400">
                    {selectedSkill.category}
                  </span>
                  <h4 className="font-sans font-extrabold text-white text-sm">{selectedSkill.name}</h4>
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  {selectedSkill.description || "Hands-on implementation experience validating software architectures to eliminate visual, structural, and functional defects prior to final delivery."}
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Block: Playwright Automation Script Simulator */}
          <div className="lg:col-span-5 bg-[#18181b] p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl space-y-6 text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-sans font-bold text-white text-base flex items-center space-x-2">
                  <Play className="w-5 h-5 text-indigo-400" />
                  <span>Automation Playground</span>
                </h3>
                <span className="font-mono text-[9px] text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded-full border border-indigo-900/40">
                  Playwright (Beginner)
                </span>
              </div>
              
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Shivani is actively expanding her competencies into automated regression test scripts. Use this builder to simulate creating an E2E script and executing it inside a virtual chromium viewport sandbox.
              </p>

              {/* Action Dropdown */}
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                    Choose Test Action
                  </label>
                  <select
                    value={testAction}
                    onChange={(e) => {
                      setTestAction(e.target.value);
                      if (e.target.value === "click") setSelector("button#submit-form");
                      else if (e.target.value === "fill") setSelector("input#user-email");
                      else if (e.target.value === "navigate") setSelector("https://shivanis-portfolio-demo.app/dashboard");
                      else if (e.target.value === "assert") setSelector("div.alert-success");
                    }}
                    className="w-full bg-[#09090b] border border-zinc-800 focus:border-indigo-500 rounded-2xl px-3 py-2.5 font-sans text-xs text-zinc-200 outline-none cursor-pointer"
                  >
                    <option value="click">Click Element (Actions)</option>
                    <option value="fill">Input Text (Form Fields)</option>
                    <option value="navigate">Check URL Redirection</option>
                    <option value="assert">Assert Text Value Visibility</option>
                  </select>
                </div>

                {/* Target CSS Selector Input */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                    {testAction === "navigate" ? "Destination URL" : "CSS Selector (Element Locator)"}
                  </label>
                  <input
                    type="text"
                    value={selector}
                    onChange={(e) => setSelector(e.target.value)}
                    className="w-full bg-[#09090b] border border-zinc-800 focus:border-indigo-500 rounded-2xl px-3.5 py-2.5 font-mono text-xs text-indigo-300 outline-none"
                  />
                </div>

                {/* Optional Value input if action is fill or assert */}
                {(testAction === "fill" || testAction === "assert") && (
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                      {testAction === "fill" ? "Input Value String" : "Assertion Subtext Match"}
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full bg-[#09090b] border border-zinc-800 focus:border-indigo-500 rounded-2xl px-3.5 py-2.5 font-sans text-xs text-zinc-200 outline-none"
                    />
                  </div>
                )}

                {/* Simulation Trigger Button */}
                <button
                  onClick={triggerSimulation}
                  disabled={isRunningSim}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-sans font-bold text-xs py-3 rounded-2xl shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isRunningSim ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                      <span>Running Web Simulator Check...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run Live Playwright Script</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code vs Simulator Workspace Tabs */}
            <div className="space-y-3 pt-4 border-t border-zinc-850">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  Test Execution Workspace
                </span>
                <div className="flex bg-[#09090b] p-1 rounded-lg border border-zinc-850 gap-1">
                  <button
                    onClick={() => setPlaygroundTab("code")}
                    className={`px-2.5 py-1 rounded font-sans text-[9px] font-bold uppercase transition-all cursor-pointer ${
                      playgroundTab === "code" ? "bg-zinc-850 text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Playwright Code
                  </button>
                  <button
                    onClick={() => setPlaygroundTab("viewport")}
                    className={`px-2.5 py-1 rounded font-sans text-[9px] font-bold uppercase transition-all cursor-pointer flex items-center space-x-1 ${
                      playgroundTab === "viewport" ? "bg-zinc-850 text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <span>Sandbox Viewport</span>
                    {isRunningSim && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                  </button>
                </div>
              </div>

              {playgroundTab === "code" ? (
                <div className="bg-[#09090b] border border-zinc-800 p-4 rounded-2xl relative group/code overflow-hidden">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatePlaywrightCode());
                    }}
                    className="absolute top-2 right-2 bg-[#18181b] border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white px-2 py-1 rounded-lg font-mono text-[9px] opacity-0 group-hover/code:opacity-100 transition-opacity cursor-pointer"
                  >
                    Copy Snippet
                  </button>
                  <pre className="font-mono text-[10px] text-emerald-400 overflow-x-auto whitespace-pre leading-normal select-all">
                    {generatePlaywrightCode()}
                  </pre>
                </div>
              ) : (
                <div className="bg-[#09090b] border border-zinc-800 rounded-2xl overflow-hidden shadow-inner flex flex-col h-[180px]">
                  {/* Address bar mockup */}
                  <div className="bg-[#18181b] border-b border-zinc-850 p-2 flex items-center justify-between shrink-0">
                    <div className="flex items-center space-x-1 sm:space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex-1 max-w-[240px] mx-auto bg-[#09090b] border border-zinc-800 rounded-lg px-2 py-0.5 text-[9px] text-zinc-500 font-mono text-center flex items-center justify-center space-x-1">
                      <Laptop className="w-2.5 h-2.5 text-zinc-600" />
                      <span>shivanis-portfolio-demo.app</span>
                    </div>
                    <div className="w-6" />
                  </div>

                  {/* Viewport Core rendering */}
                  <div className="flex-1 p-4 relative flex flex-col items-center justify-center bg-zinc-950 text-center text-xs overflow-hidden">
                    <AnimatePresence mode="wait">
                      {simStep === "idle" && (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
                          <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2 max-w-[200px] mx-auto shadow-md">
                            <span className="font-mono text-[8px] text-zinc-500 block uppercase">Mock Form Action</span>
                            
                            {testAction === "click" && (
                              <button id="submit-form" className="w-full bg-indigo-600 text-white font-sans text-[10px] font-bold py-1.5 rounded-lg border border-indigo-500 cursor-default">
                                Submit Form
                              </button>
                            )}
                            {testAction === "fill" && (
                              <input id="user-email" type="text" placeholder="user@company.com" disabled className="w-full bg-[#09090b] border border-zinc-800 rounded px-2 py-1 text-[10px] font-sans text-zinc-400" />
                            )}
                            {testAction === "navigate" && (
                              <div className="text-[10px] font-bold text-indigo-400 underline">https://shivanis-portfolio-demo.app/dashboard</div>
                            )}
                            {testAction === "assert" && (
                              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/20 px-2 py-1 border border-emerald-900/40 rounded">SUCCESS</div>
                            )}
                          </div>
                          <p className="font-sans text-[10px] text-zinc-500 leading-relaxed max-w-[220px] mx-auto">
                            Adjust test parameters above and click "Run Live Playwright Script" to simulate chromium execution.
                          </p>
                        </motion.div>
                      )}

                      {simStep === "loading" && (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-2 flex flex-col items-center"
                        >
                          <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
                          <span className="font-mono text-[10px] text-indigo-300 font-bold uppercase tracking-wider animate-pulse">Launching Chromium context...</span>
                        </motion.div>
                      )}

                      {simStep === "interacting" && (
                        <motion.div
                          key="interacting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3 relative w-full h-full flex flex-col items-center justify-center"
                        >
                          <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2 max-w-[200px] mx-auto shadow-md relative">
                            {/* Glowing Laser Border for Element Highlight */}
                            <div className="absolute inset-0 border-2 border-dashed border-indigo-500 rounded-xl animate-pulse" />
                            
                            <span className="font-mono text-[8px] text-zinc-500 block uppercase">Interacting on node</span>
                            
                            {testAction === "click" && (
                              <div className="relative">
                                <button id="submit-form" className="w-full bg-indigo-500 text-white font-sans text-[10px] font-bold py-1.5 rounded-lg border border-indigo-400 cursor-default">
                                  Submit Form
                                </button>
                                {/* cursor pointer mock */}
                                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-indigo-400 rounded-full border border-white animate-ping" />
                              </div>
                            )}
                            {testAction === "fill" && (
                              <input id="user-email" type="text" readOnly value={simTypedText} className="w-full bg-[#09090b] border border-indigo-500 rounded px-2 py-1 text-[10px] font-sans text-indigo-300" />
                            )}
                            {testAction === "navigate" && (
                              <div className="text-[10px] font-bold text-indigo-300 bg-indigo-950/20 p-1 border border-indigo-900/40 rounded animate-pulse">Redirecting to target...</div>
                            )}
                            {testAction === "assert" && (
                              <div className="text-[10px] font-mono text-emerald-300 bg-emerald-950/40 px-2 py-1 border-2 border-emerald-500 rounded animate-pulse">MATCH FOUND</div>
                            )}
                          </div>
                          <span className="font-mono text-[9px] text-indigo-400 bg-indigo-950 px-2 py-0.5 border border-indigo-900 rounded font-semibold">
                            Locator matched target node
                          </span>
                        </motion.div>
                      )}

                      {simStep === "passed" && (
                        <motion.div
                          key="passed"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-2.5 flex flex-col items-center justify-center w-full h-full bg-emerald-950/10"
                        >
                          <div className="p-2.5 bg-emerald-950 border border-emerald-800 rounded-full text-emerald-400">
                            <CheckCircle className="w-7 h-7 text-emerald-400" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-sans font-extrabold text-white text-xs">ASSERTION PASSED (200)</span>
                            <p className="font-mono text-[9px] text-emerald-400">
                              page.locator('{selector}') matched successfully.
                            </p>
                          </div>
                          <span className="font-mono text-[8px] text-zinc-500 uppercase">Passed in 142ms</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
