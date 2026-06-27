import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bug, Plus, Clock, ClipboardList, CheckCircle2, Terminal, RefreshCw, Sparkles } from "lucide-react";
import { ContactTicket } from "../types";
import { PERSONAL_INFO } from "../data";

export default function ContactQAQueue() {
  const [summary, setSummary] = useState("");
  const [reporter, setReporter] = useState("");
  const [email, setEmail] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [ticketIdCounter, setTicketIdCounter] = useState(104); // Start after preloads

  // Initial mock tickets preloaded for visual effect
  const [tickets, setTickets] = useState<ContactTicket[]>([
    {
      id: "SHIV-101",
      summary: "Explore hiring for contract manual automation QA consultant",
      description: "Looking for an expert with strong end-to-end UAT ownership, Agile methodology expertise, and basic scripting competency.",
      reporter: "Recruitment Lead (TechCorp)",
      reporterEmail: "hr@techcorp.com",
      priority: "High",
      status: "In Progress",
      createdAt: "2026-06-25, 02:40 PM"
    },
    {
      id: "SHIV-102",
      summary: "Inquire about AI UAT Builder integration parameters",
      description: "Very impressed with the Gemini API script builder demo. Would like to schedule a call to see how it cuts down manual drafting times.",
      reporter: "Engineering Director",
      reporterEmail: "cto@solutions.org",
      priority: "Medium",
      status: "Backlog",
      createdAt: "2026-06-25, 05:15 PM"
    },
    {
      id: "SHIV-103",
      summary: "Add automated Playwright script assertions review",
      description: "Reviewed your automated script generator in the playground. Excellent implementation, let's schedule a technical pairing session.",
      reporter: "QA Automation Architect",
      reporterEmail: "architect@test.io",
      priority: "Low",
      status: "Resolved",
      createdAt: "2026-06-26, 09:12 AM"
    }
  ]);

  const handleCreateTicket = (e: FormEvent) => {
    e.preventDefault();
    if (!summary || !reporter || !email || !description) return;

    setLoading(true);
    setLogMessages([]);

    const logs = [
      "Establishing connection to DevOps environment...",
      "Validating issue schema parameters...",
      "Generating unique issue signature: SHIV-" + ticketIdCounter + "...",
      "Injecting priority level: " + priority.toUpperCase() + "...",
      "Mapping reporter contact meta: [" + email + "]...",
      "Dispatching local visual backlog callback webhook...",
      "System logs: Ticket SHIV-" + ticketIdCounter + " successfully created!"
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logs.length) {
        setLogMessages((prev) => [...prev, logs[step]]);
        step++;
      } else {
        clearInterval(interval);
        
        // Add new ticket
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateNow = new Date().toLocaleDateString();
        const newTicket: ContactTicket = {
          id: `SHIV-${ticketIdCounter}`,
          summary,
          description,
          reporter,
          reporterEmail: email,
          priority,
          status: "Backlog",
          createdAt: `${dateNow}, ${timeNow}`
        };

        setTickets((prev) => [newTicket, ...prev]);
        setTicketIdCounter((prev) => prev + 1);

        // Reset fields
        setSummary("");
        setDescription("");
        setPriority("Medium");
        
        setLoading(false);
      }
    }, 500);
  };

  const handleUpdateStatus = (id: string, currentStatus: "Backlog" | "In Progress" | "Resolved") => {
    const nextStatusMap: Record<string, "Backlog" | "In Progress" | "Resolved"> = {
      Backlog: "In Progress",
      "In Progress": "Resolved",
      Resolved: "Backlog"
    };

    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatusMap[currentStatus] } : t))
    );
  };

  const handleDeleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const getPriorityColor = (p: "High" | "Medium" | "Low") => {
    switch (p) {
      case "High": return "bg-rose-950/60 border-rose-900/60 text-rose-400";
      case "Medium": return "bg-amber-950/60 border-amber-900/60 text-amber-400";
      case "Low": return "bg-slate-900 border-slate-800 text-slate-400";
    }
  };

  const getStatusColor = (s: "Backlog" | "In Progress" | "Resolved") => {
    switch (s) {
      case "Backlog": return "bg-slate-900 border-slate-800 text-slate-400";
      case "In Progress": return "bg-cyan-950 border-cyan-900 text-cyan-400";
      case "Resolved": return "bg-emerald-950 border-emerald-900 text-emerald-400";
    }
  };

  return (
    <section id="qa-queue" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-950/60 border border-cyan-800 rounded-full">
            <Bug className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold text-cyan-300 uppercase tracking-wider">
              DevOps Contact Interface
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
            Thematic Contact Queue
          </h2>
          <p className="font-sans text-slate-400 text-base sm:text-lg">
            Let's keep it fun! Submit a mock QA request or recruitment inquiry ticket to Shivani's personal backlog queue. Watch it generate and interact with its lifecycle status below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: File a Ticket Form */}
          <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-850 flex flex-col justify-between shadow-2xl text-left">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
                <Plus className="w-5 h-5 text-cyan-400" />
                <h3 className="font-sans font-bold text-white text-base">File New DevOps Ticket</h3>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-4">
                
                {/* Summary */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs text-slate-400 font-medium block">
                    Ticket Summary (Subject)
                  </label>
                  <input
                    type="text"
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="e.g., Schedule an interview or request a meeting"
                    className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 font-sans text-xs text-slate-200 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Reporter Name */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs text-slate-400 font-medium block">
                      Reporter Name
                    </label>
                    <input
                      type="text"
                      required
                      value={reporter}
                      onChange={(e) => setReporter(e.target.value)}
                      placeholder="e.g., Jane Doe"
                      className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 font-sans text-xs text-slate-200 outline-none"
                    />
                  </div>

                  {/* Reporter Email */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs text-slate-400 font-medium block">
                      Reporter Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., hr@company.com"
                      className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 font-sans text-xs text-slate-200 outline-none"
                    />
                  </div>
                </div>

                {/* Priority Selector */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs text-slate-400 font-medium block">
                    Ticket Severity / Priority
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["High", "Medium", "Low"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`py-2 px-3 rounded-xl font-sans text-xs font-semibold border transition-all ${
                          priority === p
                            ? p === "High"
                              ? "bg-rose-950 border-rose-500 text-rose-300 shadow-inner"
                              : p === "Medium"
                              ? "bg-amber-950 border-amber-500 text-amber-300 shadow-inner"
                              : "bg-slate-800 border-slate-500 text-slate-200 shadow-inner"
                            : "bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-300 hover:border-slate-800"
                        }`}
                      >
                        {p} Priority
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detailed description */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs text-slate-400 font-medium block">
                    Ticket Description (Message Body)
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your message details, scheduling hours, or inquiries here..."
                    className="w-full h-28 bg-slate-950 border border-slate-850 focus:border-cyan-500 rounded-xl p-3.5 font-sans text-xs text-slate-200 placeholder-slate-600 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit trigger */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-sans font-semibold text-xs py-3 rounded-xl shadow-lg disabled:opacity-50 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>File DevOps Ticket</span>
                </button>

              </form>
            </div>

            {/* Simulated Live Logs */}
            <AnimatePresence>
              {(loading || logMessages.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-4 border-t border-slate-800 space-y-2 overflow-hidden"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                    <span className="flex items-center space-x-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>TERMINAL // web_hook_dispatch</span>
                    </span>
                    {loading && <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />}
                  </div>

                  <div className="bg-slate-950 p-3.5 border border-slate-850 rounded-xl h-36 overflow-y-auto font-mono text-[10px] text-emerald-400 space-y-1 text-left">
                    {logMessages.map((msg, index) => (
                      <div key={index} className="leading-relaxed">
                        <span className="text-slate-600 select-none">&gt;&gt;</span> {msg}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Block: Live Ticket Queue Backlog */}
          <div className="lg:col-span-7 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-850/80 shadow-2xl flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <ClipboardList className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-sans font-bold text-slate-300 text-sm sm:text-base">Shivani's Active QA Queue ({tickets.length})</h3>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-[9px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-900 font-semibold">
                  <span>Backlog Dashboard</span>
                </div>
              </div>

              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Recruiters and visitors can click status buttons to change columns on her personal board in real-time.
              </p>

              {/* Tickets List */}
              <div className="space-y-4 h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {tickets.map((t) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-850/60 shadow-md space-y-3 relative group"
                    >
                      {/* Ticket Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[10px] text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-bold">
                            {t.id}
                          </span>
                          <span className={`px-2 py-0.5 border rounded text-[9px] font-mono font-bold uppercase ${getPriorityColor(t.priority)}`}>
                            {t.priority}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[9px] text-slate-500">
                            {t.createdAt}
                          </span>
                        </div>
                      </div>

                      {/* Ticket Content */}
                      <div className="space-y-1.5">
                        <h4 className="font-sans font-bold text-white text-xs sm:text-sm">
                          {t.summary}
                        </h4>
                        <p className="font-sans text-xs text-slate-400 leading-relaxed">
                          {t.description}
                        </p>
                      </div>

                      {/* Ticket Footer / Interactive Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-900">
                        <div className="flex items-center space-x-1 font-sans text-[10px] text-slate-500">
                          <span className="font-semibold text-slate-400">Reporter:</span>
                          <span>{t.reporter}</span>
                          <span className="text-slate-600">({t.reporterEmail})</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateStatus(t.id, t.status)}
                            className={`px-2.5 py-1 rounded border font-mono text-[9px] font-bold uppercase transition-all flex items-center space-x-1 ${getStatusColor(
                              t.status
                            )}`}
                            title="Click to toggle issue lifecycle columns"
                          >
                            <span>Status: {t.status}</span>
                            <span className="text-[8px] opacity-60">⇅</span>
                          </button>

                          {t.id.startsWith("SHIV-104") || t.id.startsWith("SHIV-105") || t.id.startsWith("SHIV-106") || t.id.startsWith("SHIV-107") ? (
                            <button
                              onClick={() => handleDeleteTicket(t.id)}
                              className="p-1 rounded bg-slate-900 border border-slate-850 text-red-400 hover:bg-red-950/20 hover:border-red-900 transition-colors"
                              title="Delete filed ticket"
                            >
                              ✕
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Summary details */}
            <div className="pt-4 border-t border-slate-800 text-center font-mono text-[10px] text-slate-500 uppercase tracking-widest flex items-center justify-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real-Time Inbound DevOps Synced</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
