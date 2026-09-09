import React, { useState } from "react";
import { 
  Sparkles, 
  Send, 
  HelpCircle, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Copy, 
  Check,
  GitBranch,
  Lightbulb,
  Workflow
} from "lucide-react";
import { QuizQuestion } from "../types";

interface AIMentorViewProps {
  initialTopicPrompt?: string;
  onAddGeneratedQuestionsToQuiz?: (questions: QuizQuestion[]) => void;
}

export const AIMentorView: React.FC<AIMentorViewProps> = ({
  initialTopicPrompt,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"ask" | "shortcuts" | "quiz-gen" | "mains-eval">("ask");
  const [examFocus, setExamFocus] = useState<string>("Both UPSC & UPPSC");

  // Sub-Tab 1: Ask UPSC & UPPSC Mentor
  const [userQuery, setUserQuery] = useState(
    initialTopicPrompt ? `Explain the high-yield Prelims traps and Mains significance for: ${initialTopicPrompt}` : ""
  );
  const [askResponse, setAskResponse] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [askError, setAskError] = useState<string | null>(null);
  const [copiedAsk, setCopiedAsk] = useState(false);

  // Sub-Tab 2: 3-Minute Shortcut & Flowchart Synthesizer
  const [shortcutTopic, setShortcutTopic] = useState(
    initialTopicPrompt || "Monetary Policy Committee & Standing Deposit Facility (SDF)"
  );
  const [shortcutResult, setShortcutResult] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [shortcutError, setShortcutError] = useState<string | null>(null);
  const [copiedShortcut, setCopiedShortcut] = useState(false);

  // Sub-Tab 3: Generate Custom Prelims Quiz
  const [quizTopic, setQuizTopic] = useState("Constitutional Amendment Art 368 & Basic Structure");
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>([]);
  const [quizGenError, setQuizGenError] = useState<string | null>(null);
  const [userCustomAnswers, setUserCustomAnswers] = useState<Record<string, number>>({});

  // Sub-Tab 4: Mains Answer Writing Evaluator
  const [mainsQuestion, setMainsQuestion] = useState(
    "Analyze the structural challenges of Asymmetric Federalism in India with special reference to Sixth Schedule regions and state reorganization. (15 Marks, 250 Words)"
  );
  const [mainsAnswer, setMainsAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [mainsEvaluation, setMainsEvaluation] = useState<string | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Quick Prompt Suggestions across all subjects
  const suggestedQueries = [
    "Difference between Article 368 Special Majority vs Ratification by Half States",
    "Explain the Indian Ocean Dipole (IOD) and its interplay with El Niño in Indian Monsoon",
    "Standing Deposit Facility (SDF) vs Reverse Repo: Why collateral matters",
    "UP ODOP Flagship Districts: Kannauj, Moradabad, Aligarh, Azamgarh GI tags",
    "Article 6.2 vs Article 6.4 of Paris Agreement & ITMO Carbon Markets"
  ];

  // Handler for Ask Mentor
  const handleAskGuru = async (queryToSubmit?: string) => {
    const q = queryToSubmit || userQuery;
    if (!q.trim()) return;

    setIsAsking(true);
    setAskError(null);
    setAskResponse(null);

    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          question: q,
          examFocus: examFocus 
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from MyndMentor AI.");
      }

      const data = await res.json();
      setAskResponse(data.answer);
    } catch (err: any) {
      setAskError(err.message || "An error occurred while connecting to AI mentor.");
    } finally {
      setIsAsking(false);
    }
  };

  // Handler for Shortcut Synthesizer
  const handleSynthesizeShortcut = async () => {
    if (!shortcutTopic.trim()) return;

    setIsSynthesizing(true);
    setShortcutError(null);
    setShortcutResult(null);

    try {
      const res = await fetch("/api/ai/shortcut-revision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          topic: shortcutTopic,
          examType: examFocus 
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate revision shortcut.");
      }

      const data = await res.json();
      setShortcutResult(data.revision);
    } catch (err: any) {
      setShortcutError(err.message || "Failed to generate shortcut.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Handler for AI Quiz Generator
  const handleGenerateQuiz = async () => {
    if (!quizTopic.trim()) return;

    setIsGeneratingQuiz(true);
    setQuizGenError(null);
    setGeneratedQuestions([]);
    setUserCustomAnswers({});

    try {
      const res = await fetch("/api/ai/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: quizTopic }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate quiz questions");
      }

      const data = await res.json();
      if (Array.isArray(data.questions)) {
        setGeneratedQuestions(data.questions);
      } else {
        throw new Error("Invalid response format received.");
      }
    } catch (err: any) {
      setQuizGenError(err.message || "Failed to generate AI quiz.");
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  // Handler for Mains Answer Evaluator
  const handleEvaluateMains = async () => {
    if (!mainsQuestion.trim() || !mainsAnswer.trim()) return;

    setIsEvaluating(true);
    setEvalError(null);
    setMainsEvaluation(null);

    try {
      const res = await fetch("/api/ai/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: mainsQuestion,
          userAnswer: mainsAnswer,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to evaluate answer");
      }

      const data = await res.json();
      setMainsEvaluation(data.evaluation);
    } catch (err: any) {
      setEvalError(err.message || "Failed to evaluate answer.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const copyToClipboard = (text: string, isShortcut = false) => {
    navigator.clipboard.writeText(text);
    if (isShortcut) {
      setCopiedShortcut(true);
      setTimeout(() => setCopiedShortcut(false), 2000);
    } else {
      setCopiedAsk(true);
      setTimeout(() => setCopiedAsk(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Mentor Header */}
      <div className="bg-linear-to-r from-amber-950 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-800/80 text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                Powered by Gemini 3.8 Flash
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display tracking-tight text-amber-50">
              MyndMentor AI (UPSC & UPPSC)
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl">
              Trained on NCERT Class 6–12, Laxmikanth, Shankar IAS, Ramesh Singh, GC Leong & UP GS Papers 5 & 6.
            </p>
          </div>

          {/* Exam Focus Pill Selector */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-semibold self-start shrink-0">
            {["Both UPSC & UPPSC", "UPSC Only", "UPPSC Only"].map((f) => (
              <button
                key={f}
                onClick={() => setExamFocus(f)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  examFocus === f
                    ? "bg-amber-100 text-amber-950 font-bold"
                    : "text-amber-200 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Tabs Nav */}
        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-4 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab("ask")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === "ask"
                ? "bg-amber-100 text-amber-950 font-bold"
                : "text-amber-100 hover:bg-white/10"
            }`}
          >
            Ask Concept & Traps
          </button>
          <button
            onClick={() => setActiveSubTab("shortcuts")}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
              activeSubTab === "shortcuts"
                ? "bg-amber-100 text-amber-950 font-bold"
                : "text-amber-100 hover:bg-white/10"
            }`}
          >
            <Lightbulb size={13} />
            3-Min Revision Shortcut
          </button>
          <button
            onClick={() => setActiveSubTab("quiz-gen")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === "quiz-gen"
                ? "bg-amber-100 text-amber-950 font-bold"
                : "text-amber-100 hover:bg-white/10"
            }`}
          >
            Prelims Quiz Generator
          </button>
          <button
            onClick={() => setActiveSubTab("mains-eval")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeSubTab === "mains-eval"
                ? "bg-amber-100 text-amber-950 font-bold"
                : "text-amber-100 hover:bg-white/10"
            }`}
          >
            Mains Answer Evaluator
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: Ask UPSC & UPPSC Guru */}
      {activeSubTab === "ask" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Clear Any Concept, Elimination Trap, or NCERT Doubt
            </h3>
            <p className="text-xs text-slate-500">
              Ask for constitutional interpretations, economic trade-offs, monsoon triggers, or UPPSC GS-5/6 district data.
            </p>

            {/* Input Area */}
            <div className="space-y-3">
              <div className="relative">
                <textarea
                  rows={3}
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="e.g. Differentiate between Article 368 special majority vs ratification by states, or explain positive IOD impact on monsoon..."
                  className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition text-slate-900"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Suggestions Pills */}
                <div className="flex flex-wrap gap-1.5 max-w-xl">
                  {suggestedQueries.slice(0, 3).map((sq, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setUserQuery(sq);
                        handleAskGuru(sq);
                      }}
                      className="text-[11px] bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200/80 transition text-left"
                    >
                      {sq}
                    </button>
                  ))}
                </div>

                <button
                  disabled={isAsking || !userQuery.trim()}
                  onClick={() => handleAskGuru()}
                  className="px-5 py-2.5 bg-amber-900 hover:bg-amber-950 disabled:opacity-50 text-amber-50 text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
                >
                  {isAsking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Consulting Mentor...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Ask Mentor
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {askError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-800">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{askError}</span>
              </div>
            )}
          </div>

          {/* Response Display */}
          {askResponse && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-900">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    Mentor Answer Breakdown ({examFocus})
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(askResponse)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 p-1.5 rounded-md hover:bg-slate-100 transition"
                  title="Copy Response"
                >
                  {copiedAsk ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAsk ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-2">
                {askResponse}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: 3-Minute Shortcut & Flowchart Synthesizer */}
      {activeSubTab === "shortcuts" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Generate 3-Minute Shortcut Revision Card & Flowchart
            </h3>
            <p className="text-xs text-slate-500">
              Instantly synthesizes mnemonics, the top 3 elimination traps, high-scoring Mains phrases, and a step-by-step micro flowchart for rapid pre-exam recall.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={shortcutTopic}
                onChange={(e) => setShortcutTopic(e.target.value)}
                placeholder="Enter any topic (e.g. 74th Amendment Urban Governance, El Nino vs La Nina, Ken-Betwa Link Project)..."
                className="flex-1 p-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                disabled={isSynthesizing || !shortcutTopic.trim()}
                onClick={handleSynthesizeShortcut}
                className="px-5 py-3 bg-amber-900 hover:bg-amber-950 disabled:opacity-50 text-amber-50 text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 shrink-0"
              >
                {isSynthesizing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Synthesizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Build Shortcut
                  </>
                )}
              </button>
            </div>

            {shortcutError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800">
                {shortcutError}
              </div>
            )}
          </div>

          {shortcutResult && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                  ⚡ 3-Minute Rapid Revision: {shortcutTopic}
                </span>
                <button
                  onClick={() => copyToClipboard(shortcutResult, true)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 p-1.5 rounded-md hover:bg-slate-100 transition"
                >
                  {copiedShortcut ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedShortcut ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-amber-50/30 p-4 rounded-xl border border-amber-100">
                {shortcutResult}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: AI Prelims Quiz Generator */}
      {activeSubTab === "quiz-gen" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Generate AI Prelims MCQs on Any Topic
            </h3>
            <p className="text-xs text-slate-500">
              Gemini generates authentic UPSC & UPPSC style multi-statement questions with statement elimination pitfalls.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={quizTopic}
                onChange={(e) => setQuizTopic(e.target.value)}
                placeholder="Topic for quiz (e.g. Asymmetric Federalism, Dudhwa Tarai ecosystem, Carbon Credits)..."
                className="flex-1 p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition"
              />
              <button
                disabled={isGeneratingQuiz || !quizTopic.trim()}
                onClick={handleGenerateQuiz}
                className="px-5 py-3 bg-amber-900 hover:bg-amber-950 disabled:opacity-50 text-amber-50 text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 shrink-0"
              >
                {isGeneratingQuiz ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Drafting MCQs...
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-3.5 h-3.5" />
                    Generate 3 Questions
                  </>
                )}
              </button>
            </div>

            {quizGenError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800">
                {quizGenError}
              </div>
            )}
          </div>

          {/* Generated Questions List */}
          {generatedQuestions.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Generated Questions for: {quizTopic}
              </h4>

              {generatedQuestions.map((q, idx) => {
                const userSelected = userCustomAnswers[q.id];
                const isAnswered = userSelected !== undefined;

                return (
                  <div key={q.id || idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-900">Question {idx + 1}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                        {q.difficulty}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900">{q.question}</p>

                    {q.statements && q.statements.length > 0 && (
                      <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700">
                        {q.statements.map((st, sIdx) => (
                          <li key={sIdx}>{st}</li>
                        ))}
                      </ol>
                    )}

                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = oIdx === q.correctAnswerIndex;
                        const isChosen = userSelected === oIdx;

                        let optClass = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                        if (isAnswered) {
                          if (isCorrect) optClass = "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold";
                          else if (isChosen) optClass = "bg-red-50 border-red-300 text-red-950";
                          else optClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isAnswered}
                            onClick={() => setUserCustomAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition ${optClass}`}
                          >
                            <span className="font-bold mr-2">({String.fromCharCode(65 + oIdx)})</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 animate-in fade-in duration-200">
                        <strong className="text-slate-900 block">Explanation:</strong>
                        <p className="text-slate-600 leading-relaxed">{q.explanation}</p>
                        {q.trapAlert && (
                          <p className="text-amber-800 font-medium pt-1">
                            ⚠️ <strong>Prelims Trap:</strong> {q.trapAlert}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: Mains Answer Evaluator */}
      {activeSubTab === "mains-eval" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              UPSC & UPPSC Mains Answer Evaluator
            </h3>
            <p className="text-xs text-slate-500">
              Submit your answer draft for instant marks estimation, keyword gaps, missing committee reports/case laws, and diagram recommendations.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mains Question
                </label>
                <input
                  type="text"
                  value={mainsQuestion}
                  onChange={(e) => setMainsQuestion(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Your Answer Draft
                </label>
                <textarea
                  rows={6}
                  value={mainsAnswer}
                  onChange={(e) => setMainsAnswer(e.target.value)}
                  placeholder="Paste your typed answer (Introduction, Body arguments with points, Examples/Committees, and Conclusion)..."
                  className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition text-slate-900"
                />
              </div>

              <div className="flex justify-end">
                <button
                  disabled={isEvaluating || !mainsQuestion.trim() || !mainsAnswer.trim()}
                  onClick={handleEvaluateMains}
                  className="px-5 py-2.5 bg-amber-900 hover:bg-amber-950 disabled:opacity-50 text-amber-50 text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Evaluating Answer...
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      Evaluate My Answer
                    </>
                  )}
                </button>
              </div>
            </div>

            {evalError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800">
                {evalError}
              </div>
            )}
          </div>

          {/* Evaluation Result */}
          {mainsEvaluation && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4 animate-in fade-in duration-300">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Examiner's Assessment & Model Answer Structure
              </h4>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-amber-50/20 p-4 rounded-xl border border-amber-100">
                {mainsEvaluation}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
