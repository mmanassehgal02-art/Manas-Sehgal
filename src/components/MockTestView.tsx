import React, { useState, useEffect } from "react";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Flag,
  ArrowRight,
  ArrowLeft,
  Award,
  AlertTriangle
} from "lucide-react";
import { QuizQuestion, QuizResult } from "../types";

interface MockTestViewProps {
  allQuestions: QuizQuestion[];
  onTestCompleted: (result: QuizResult) => void;
}

export const MockTestView: React.FC<MockTestViewProps> = ({
  allQuestions,
  onTestCompleted,
}) => {
  // Test configuration & states
  const [testActive, setTestActive] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // User answers & flagged questions
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());

  // Timer state (seconds remaining)
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes default
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Start Test handler
  const handleStartTest = () => {
    // Shuffle and pick N questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const subset = shuffled.slice(0, Math.min(questionCount, allQuestions.length));
    setSelectedQuestions(subset);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setMarkedForReview(new Set());
    setTimeLeft(questionCount * 60); // 1 minute per question
    setTimeSpent(0);
    setTestActive(true);
    setTestFinished(false);
  };

  // Timer countdown
  useEffect(() => {
    if (!testActive || testFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [testActive, testFinished]);

  // Submit test and calculate UPSC marks (+2 for correct, -0.66 for incorrect)
  const handleSubmitTest = () => {
    setTestFinished(true);
    setTestActive(false);

    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    const answerDetails = selectedQuestions.map((q) => {
      const userChoice = selectedAnswers[q.id];
      if (userChoice === undefined) {
        unattempted++;
        return {
          questionId: q.id,
          selectedOptionIndex: null,
          isCorrect: false,
        };
      }

      const isCorr = userChoice === q.correctAnswerIndex;
      if (isCorr) {
        correct++;
      } else {
        incorrect++;
      }

      return {
        questionId: q.id,
        selectedOptionIndex: userChoice,
        isCorrect: isCorr,
      };
    });

    // UPSC Prelims marking: +2 for correct, -0.66 for incorrect
    const rawScore = correct * 2.0 - incorrect * 0.66;
    const finalScore = Math.max(0, Math.round(rawScore * 100) / 100);
    const accuracy = correct + incorrect > 0 
      ? Math.round((correct / (correct + incorrect)) * 100) 
      : 0;

    const result: QuizResult = {
      totalQuestions: selectedQuestions.length,
      attempted: correct + incorrect,
      correct,
      incorrect,
      unattempted,
      score: finalScore,
      accuracyPercentage: accuracy,
      timeSpentSeconds: timeSpent,
      date: new Date().toLocaleDateString(),
      answers: answerDetails,
    };

    onTestCompleted(result);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Toggle Marked for Review
  const toggleMarkReview = (qId: string) => {
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  // Clear current response
  const handleClearResponse = (qId: string) => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      delete updated[qId];
      return updated;
    });
  };

  // 1. Initial State: Test Setup Screen
  if (!testActive && !testFinished) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs text-center space-y-5">
          
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 mx-auto flex items-center justify-center ring-8 ring-amber-50">
            <Clock className="w-7 h-7 text-amber-800" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              UPSC Prelims Mock Exam Simulator
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto mt-1">
              Experience the authentic UPSC Civil Services Examination environment with negative marking and question palette navigation.
            </p>
          </div>

          {/* Exam Pattern Rules Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left text-xs sm:text-sm space-y-2.5 max-w-lg mx-auto">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-2">
              Official Marking Scheme & Rules
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 font-medium">
                Correct Answer: <strong className="text-emerald-800">+2.00 Marks</strong>
              </div>
              <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-red-950 font-medium">
                Incorrect Answer: <strong className="text-red-800">-0.66 Marks (1/3rd)</strong>
              </div>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              • Unattempted questions incur no penalty (0.00 marks).
              <br />• Multi-statement questions reflect standard UPSC elimination traps.
              <br />• You can mark questions for review and revisit anytime before final submission.
            </p>
          </div>

          {/* Test Length Selection */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs font-semibold text-slate-600">Select Test Size:</span>
            <button
              onClick={() => setQuestionCount(10)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition ${
                questionCount === 10
                  ? "bg-amber-900 text-amber-50 border-amber-900 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              10 Questions (10 Mins)
            </button>
            <button
              onClick={() => setQuestionCount(15)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition ${
                questionCount === 15
                  ? "bg-amber-900 text-amber-50 border-amber-900 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              15 Questions (15 Mins)
            </button>
          </div>

          <button
            onClick={handleStartTest}
            className="w-full sm:w-auto px-8 py-3 bg-amber-900 hover:bg-amber-950 text-amber-50 text-sm font-bold rounded-xl shadow-xs transition"
          >
            Begin Prelims Mock Test
          </button>
        </div>
      </div>
    );
  }

  // 2. Active Test Interface
  if (testActive && !testFinished) {
    const currentQ = selectedQuestions[currentIndex];
    const userChoice = selectedAnswers[currentQ.id];
    const isMarked = markedForReview.has(currentQ.id);

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Test Header with Live Timer & Submit */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-950 border border-amber-200">
              UPSC GS-1 Mock Exam
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Question {currentIndex + 1} of {selectedQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Countdown Clock */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-sm font-bold ${
              timeLeft < 120
                ? "bg-red-50 border-red-300 text-red-700 animate-pulse"
                : "bg-slate-50 border-slate-200 text-slate-800"
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleSubmitTest}
              className="px-4 py-2 bg-red-800 hover:bg-red-900 text-white text-xs font-bold rounded-lg shadow-xs transition"
            >
              Finish & Submit Test
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Question Panel */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                {currentQ.topicTitle}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-medium">
                  Marks: +2.00 / -0.66
                </span>
                <button
                  onClick={() => toggleMarkReview(currentQ.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition border ${
                    isMarked
                      ? "bg-purple-100 text-purple-900 border-purple-300"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${isMarked ? "fill-purple-900 text-purple-900" : ""}`} />
                  <span>{isMarked ? "Marked for Review" : "Mark for Review"}</span>
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                {currentQ.question}
              </p>

              {currentQ.statements && currentQ.statements.length > 0 && (
                <div className="pl-3 sm:pl-4 space-y-2 border-l-2 border-amber-800/30 my-3">
                  {currentQ.statements.map((stmt, sIdx) => (
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

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const label = ["A", "B", "C", "D"][optIdx];
                const isSelected = userChoice === optIdx;

                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      setSelectedAnswers((prev) => ({
                        ...prev,
                        [currentQ.id]: optIdx,
                      }));
                    }}
                    className={`w-full p-3.5 text-left rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 ${
                      isSelected
                        ? "bg-amber-100/70 border-amber-700 text-amber-950 font-bold ring-1 ring-amber-700"
                        : "bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-800"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? "bg-amber-900 text-white" : "bg-slate-200 text-slate-700"
                    }`}>
                      {label}
                    </span>
                    <span className="flex-1 leading-normal">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Question Navigation Controls */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {userChoice !== undefined && (
                  <button
                    onClick={() => handleClearResponse(currentQ.id)}
                    className="px-2.5 py-1.5 text-slate-500 hover:text-red-700 text-xs font-medium transition"
                  >
                    Clear Response
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentIndex < selectedQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-4 py-1.5 bg-amber-900 hover:bg-amber-950 text-amber-50 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <span>Save & Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition shadow-xs"
                  >
                    Submit Exam
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Question Palette */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
              Question Palette
            </h3>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600" />
                <span>Attempted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-600" />
                <span>Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span>Unattempted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full border-2 border-amber-800" />
                <span>Current</span>
              </div>
            </div>

            {/* Question Buttons Grid */}
            <div className="grid grid-cols-5 gap-2">
              {selectedQuestions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAns = selectedAnswers[q.id] !== undefined;
                const isRev = markedForReview.has(q.id);

                let btnStyle = "bg-slate-100 text-slate-700 hover:bg-slate-200";

                if (isAns) {
                  btnStyle = "bg-emerald-600 text-white font-bold";
                } else if (isRev) {
                  btnStyle = "bg-purple-600 text-white font-bold";
                }

                if (isCurrent) {
                  btnStyle += " ring-2 ring-amber-800 ring-offset-2";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg text-xs transition flex items-center justify-center ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Summary Counters */}
            <div className="pt-2 text-xs space-y-1 text-slate-500">
              <div className="flex justify-between">
                <span>Attempted:</span>
                <strong className="text-slate-800">{Object.keys(selectedAnswers).length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Marked for Review:</span>
                <strong className="text-slate-800">{markedForReview.size}</strong>
              </div>
              <div className="flex justify-between">
                <span>Unattempted:</span>
                <strong className="text-slate-800">
                  {selectedQuestions.length - Object.keys(selectedAnswers).length}
                </strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // 3. Post-Submission Diagnostic Scorecard & In-depth Review
  const attemptedCount = Object.keys(selectedAnswers).length;
  let correctCount = 0;
  let incorrectCount = 0;

  selectedQuestions.forEach((q) => {
    const ans = selectedAnswers[q.id];
    if (ans !== undefined) {
      if (ans === q.correctAnswerIndex) correctCount++;
      else incorrectCount++;
    }
  });

  const rawScore = correctCount * 2.0 - incorrectCount * 0.66;
  const netScore = Math.max(0, Math.round(rawScore * 100) / 100);
  const maxPossible = selectedQuestions.length * 2.0;
  const percentage = Math.round((netScore / maxPossible) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Scorecard Hero Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
            Prelims Diagnostic Report
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Mock Test Result & Performance Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Calculated as per official UPSC CSE GS-1 scheme (+2.00 for correct, -0.66 for incorrect)
          </p>
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
              Net Score
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-amber-950 font-display">
              {netScore}
            </span>
            <span className="text-[11px] text-slate-500 block">/ {maxPossible} Marks</span>
          </div>

          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block">
              Correct (+2)
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-700">
              {correctCount}
            </span>
            <span className="text-[11px] text-emerald-600 block">+{correctCount * 2} Marks</span>
          </div>

          <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-900 block">
              Negative (-0.66)
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-red-700">
              {incorrectCount}
            </span>
            <span className="text-[11px] text-red-600 block">
              -{(incorrectCount * 0.66).toFixed(2)} Marks
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
              Accuracy
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">
              {attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0}%
            </span>
            <span className="text-[11px] text-slate-500 block">
              {attemptedCount}/{selectedQuestions.length} Attempted
            </span>
          </div>
        </div>

        {/* UPSC Benchmark Assessment */}
        <div className="p-4 rounded-xl bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
          <Award className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong>UPSC Cutoff Benchmark Assessment:</strong>
            <p className="leading-relaxed text-xs text-amber-900">
              {percentage >= 55 
                ? "Excellent performance! With a score above 55%, you comfortably clear the typical UPSC Civil Services Prelims GS-1 cutoff (which generally ranges around 44-48% net score)."
                : percentage >= 40
                ? "Good attempt! You are close to the competitive cutoff boundary. Focus on minimizing negative marks by sharpening elimination techniques on tricky multi-statement questions."
                : "Need more revision on static core concepts. Review the high-yield notes for weak topics and practice statement elimination."}
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={handleStartTest}
            className="px-6 py-2.5 bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-bold rounded-xl shadow-xs transition inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Another Mock Test</span>
          </button>
        </div>

      </div>

      {/* Detailed Question by Question Review */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 font-display">
          Comprehensive Answer Review & Statement Breakdown
        </h3>

        {selectedQuestions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isAttempted = userChoice !== undefined;
          const isCorrect = isAttempted && userChoice === q.correctAnswerIndex;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border transition bg-white ${
                !isAttempted
                  ? "border-slate-200"
                  : isCorrect
                  ? "border-emerald-300"
                  : "border-red-300"
              }`}
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Q#{idx + 1}</span>
                  <span className="text-slate-500 font-medium">{q.topicTitle}</span>
                </div>

                <div className="flex items-center gap-2">
                  {!isAttempted ? (
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      Unattempted (0.00)
                    </span>
                  ) : isCorrect ? (
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Correct (+2.00)
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      Incorrect (-0.66)
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-900 mb-3 whitespace-pre-line">
                {q.question}
              </p>

              {q.statements && q.statements.length > 0 && (
                <div className="pl-3 space-y-1.5 border-l-2 border-amber-800/30 my-2 text-xs text-slate-800">
                  {q.statements.map((stmt, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-1.5">
                      <span className="font-bold text-amber-900 shrink-0">{sIdx + 1}.</span>
                      <span>{stmt}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Options Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs">
                {q.options.map((opt, optIdx) => {
                  const label = ["A", "B", "C", "D"][optIdx];
                  const isRight = q.correctAnswerIndex === optIdx;
                  const isUserPick = userChoice === optIdx;

                  let style = "bg-slate-50 border-slate-200 text-slate-700";
                  if (isRight) style = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold";
                  else if (isUserPick) style = "bg-red-50 border-red-400 text-red-950 font-bold";

                  return (
                    <div key={optIdx} className={`p-2.5 rounded-lg border flex items-start gap-2 ${style}`}>
                      <span className="font-bold">{label}.</span>
                      <span className="flex-1">{opt}</span>
                      {isRight && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      {isUserPick && !isRight && <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {/* In-depth explanation */}
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <span className="font-bold text-slate-900 block">Explanation:</span>
                <p className="leading-relaxed">{q.explanation}</p>
                {q.trapAlert && (
                  <div className="text-amber-900 pt-1 font-medium flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{q.trapAlert}</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
