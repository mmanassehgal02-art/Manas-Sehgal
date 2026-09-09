import React, { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Bookmark, 
  HelpCircle, 
  RotateCcw,
  Tag,
  FileSpreadsheet,
  ExternalLink,
  Loader2
} from "lucide-react";
import { ModuleCategory, QuizQuestion } from "../types";
import { exportQuizToGoogleForms } from "../services/googleWorkspace";

interface TopicQuizzesViewProps {
  questions: QuizQuestion[];
  modules: ModuleCategory[];
  initialModuleId?: string;
  bookmarkedQuestionIds: string[];
  toggleBookmarkQuestion: (id: string) => void;
  onQuestionAnswered: (isCorrect: boolean) => void;
  accessToken?: string | null;
  onGoogleSignIn?: () => void;
}

export const TopicQuizzesView: React.FC<TopicQuizzesViewProps> = ({
  questions,
  modules,
  initialModuleId,
  bookmarkedQuestionIds,
  toggleBookmarkQuestion,
  onQuestionAnswered,
  accessToken,
  onGoogleSignIn,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(initialModuleId || "all");
  // Map of questionId -> selectedOptionIndex
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isExportingToForms, setIsExportingToForms] = useState(false);
  const [formsUrl, setFormsUrl] = useState<string | null>(null);
  const [formsError, setFormsError] = useState<string | null>(null);

  const filteredQuestions = selectedModuleId === "all"
    ? questions
    : questions.filter((q) => q.moduleId === selectedModuleId);

  const handleSelectOption = (question: QuizQuestion, optionIndex: number) => {
    if (userAnswers[question.id] !== undefined) return; // already answered

    setUserAnswers((prev) => ({
      ...prev,
      [question.id]: optionIndex,
    }));

    const isCorrect = optionIndex === question.correctAnswerIndex;
    onQuestionAnswered(isCorrect);
  };

  const handleResetModule = () => {
    const updated = { ...userAnswers };
    filteredQuestions.forEach((q) => {
      delete updated[q.id];
    });
    setUserAnswers(updated);
  };

  const answeredCount = filteredQuestions.filter((q) => userAnswers[q.id] !== undefined).length;
  const correctCount = filteredQuestions.filter((q) => userAnswers[q.id] === q.correctAnswerIndex).length;

  const currentModuleName = selectedModuleId === "all"
    ? "All UPSC & UPPSC Topics"
    : modules.find((m) => m.id === selectedModuleId)?.title || "UPSC Practice Quiz";

  const handleExportToGoogleForms = async () => {
    setFormsError(null);
    setFormsUrl(null);

    if (!accessToken) {
      if (onGoogleSignIn) {
        onGoogleSignIn();
      } else {
        setFormsError("Please sign in with Google to export this quiz to Google Forms.");
      }
      return;
    }

    setIsExportingToForms(true);

    try {
      const formattedQuestions = filteredQuestions.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswerIndex: q.correctAnswerIndex,
        explanation: q.explanation,
      }));

      const res = await exportQuizToGoogleForms(currentModuleName, formattedQuestions, accessToken);
      setFormsUrl(res.responderUri);
    } catch (err: any) {
      setFormsError(err.message || "Failed to create Google Form.");
    } finally {
      setIsExportingToForms(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header & Module Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Topic-Wise Prelims Quizzes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Practice UPSC Civil Services Prelims questions with statement evaluation and elimination traps
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-950">
              Completed: <strong>{answeredCount}/{filteredQuestions.length}</strong>
              {answeredCount > 0 && (
                <span className="ml-2 text-emerald-700 font-bold">
                  ({correctCount} correct)
                </span>
              )}
            </div>

            {/* Export Quiz to Google Forms Button */}
            <button
              onClick={handleExportToGoogleForms}
              disabled={isExportingToForms}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-purple-900 flex items-center gap-1.5 shadow-2xs transition disabled:opacity-50"
              title="Export this quiz directly into a Google Form"
            >
              {isExportingToForms ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-700" />
              ) : (
                <FileSpreadsheet className="w-3.5 h-3.5 text-purple-600" />
              )}
              <span className="hidden sm:inline">Export to Google Forms</span>
            </button>

            {answeredCount > 0 && (
              <button
                onClick={handleResetModule}
                className="p-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition flex items-center gap-1"
                title="Reset this quiz section"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Google Forms Export Notification Banner */}
        {formsUrl && (
          <div className="mt-4 px-4 py-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between gap-3 text-xs text-purple-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span>
                <strong>Google Form Created!</strong> Your {filteredQuestions.length} quiz questions are now live in Google Forms.
              </span>
            </div>
            <a
              href={formsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg text-xs transition"
            >
              Open Form <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Google Forms Export Error Banner */}
        {formsError && (
          <div className="mt-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-xs text-amber-900">
            <span>{formsError}</span>
            <button
              onClick={() => setFormsError(null)}
              className="text-slate-400 hover:text-slate-600 text-xs px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Module Filter Pills */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedModuleId("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              selectedModuleId === "all"
                ? "bg-amber-900 text-amber-50 shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Questions ({questions.length})
          </button>

          {modules.map((mod) => {
            const count = questions.filter((q) => q.moduleId === mod.id).length;
            const isSelected = selectedModuleId === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? "bg-amber-900 text-amber-50 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {mod.title.split(".")[1] || mod.title} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const selectedOption = userAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isBookmarked = bookmarkedQuestionIds.includes(q.id);

          return (
            <div 
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-7 transition hover:border-slate-300"
            >
              {/* Question Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                    Question #{idx + 1}
                  </span>
                  <span className="text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs">
                    {q.topicTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {q.pyqYear && (
                    <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      {q.pyqYear}
                    </span>
                  )}
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {q.difficulty}
                  </span>
                  <button
                    onClick={() => toggleBookmarkQuestion(q.id)}
                    className={`p-1 rounded-md transition ${
                      isBookmarked
                        ? "text-amber-700 bg-amber-50"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                    title="Bookmark question for review"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-700" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-3 mb-5">
                <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                  {q.question}
                </p>

                {/* Numbered Statements if multi-statement */}
                {q.statements && q.statements.length > 0 && (
                  <div className="pl-3 sm:pl-4 space-y-2 border-l-2 border-amber-800/30 my-3">
                    {q.statements.map((stmt, sIdx) => (
                      <div key={sIdx} className="text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-2">
                        <span className="font-bold text-amber-900 shrink-0">
                          {sIdx + 1}.
                        </span>
                        <span>{stmt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                {q.options.map((opt, optIdx) => {
                  const optionLabel = ["A", "B", "C", "D"][optIdx];
                  const isUserSelection = selectedOption === optIdx;
                  const isCorrect = q.correctAnswerIndex === optIdx;

                  let buttonStyles = "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800";

                  if (isAnswered) {
                    if (isCorrect) {
                      buttonStyles = "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400";
                    } else if (isUserSelection) {
                      buttonStyles = "bg-red-50 border-red-400 text-red-950 font-semibold ring-1 ring-red-400";
                    } else {
                      buttonStyles = "bg-slate-50/50 border-slate-200/60 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(q, optIdx)}
                      className={`p-3 text-left rounded-xl border text-xs sm:text-sm transition flex items-start gap-2.5 ${buttonStyles} ${
                        !isAnswered ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isAnswered && isCorrect
                          ? "bg-emerald-600 text-white"
                          : isAnswered && isUserSelection
                          ? "bg-red-600 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}>
                        {optionLabel}
                      </span>
                      <span className="flex-1 leading-normal">{opt}</span>

                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isUserSelection && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Detailed Explanation Reveal */}
              {isAnswered && (
                <div className="pt-4 border-t border-slate-100 animate-fadeIn space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                      Detailed Explanation & Elimination Logic
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Correct: Option {["A", "B", "C", "D"][q.correctAnswerIndex]}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
                    {q.explanation}
                  </p>

                  {q.trapAlert && (
                    <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-start gap-2 text-xs text-amber-950">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[11px] uppercase tracking-wider font-bold text-amber-900">
                          UPSC Examiner's Trap
                        </strong>
                        <span className="leading-relaxed">{q.trapAlert}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
