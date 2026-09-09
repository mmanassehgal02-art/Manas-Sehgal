import React from "react";
import { 
  Bookmark, 
  BookOpen, 
  HelpCircle, 
  Trash2, 
  ArrowRight,
  Clock
} from "lucide-react";
import { ModuleCategory, QuizQuestion } from "../types";

interface BookmarksViewProps {
  modules: ModuleCategory[];
  questions: QuizQuestion[];
  bookmarkedTopicIds: string[];
  toggleBookmarkTopic: (id: string) => void;
  bookmarkedQuestionIds: string[];
  toggleBookmarkQuestion: (id: string) => void;
  onOpenTopic: (id: string) => void;
  onGoToQuizzes: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  modules,
  questions,
  bookmarkedTopicIds,
  toggleBookmarkTopic,
  bookmarkedQuestionIds,
  toggleBookmarkQuestion,
  onOpenTopic,
  onGoToQuizzes,
}) => {
  const allTopics = modules.flatMap((m) => m.topics);
  const bookmarkedTopics = allTopics.filter((t) => bookmarkedTopicIds.includes(t.id));
  const bookmarkedQuestions = questions.filter((q) => bookmarkedQuestionIds.includes(q.id));

  const totalBookmarks = bookmarkedTopics.length + bookmarkedQuestions.length;

  if (totalBookmarks === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-900 mx-auto flex items-center justify-center border border-amber-200">
          <Bookmark className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 font-display">
          No Bookmarked Notes or Questions Yet
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          While revising notes or attempting Prelims quizzes, click the bookmark icon to save tricky facts, architectural styles, or elimination traps for rapid exam revision.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            Saved Revision Bookmarks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {bookmarkedTopics.length} Notes • {bookmarkedQuestions.length} Prelims Questions
          </p>
        </div>
      </div>

      {/* Bookmarked Notes Section */}
      {bookmarkedTopics.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-800" />
            <span>High-Yield Revision Notes ({bookmarkedTopics.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookmarkedTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-amber-700/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {topic.title}
                    </h4>
                    <button
                      onClick={() => toggleBookmarkTopic(topic.id)}
                      className="text-slate-400 hover:text-red-600 transition p-1"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {topic.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {topic.readTimeMinutes} min
                  </span>
                  <button
                    onClick={() => onOpenTopic(topic.id)}
                    className="text-amber-900 font-bold flex items-center gap-1 hover:underline"
                  >
                    <span>Read Notes</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bookmarked Questions Section */}
      {bookmarkedQuestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-800" />
            <span>Tricky Prelims Questions ({bookmarkedQuestions.length})</span>
          </h3>

          <div className="space-y-3">
            {bookmarkedQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {q.topicTitle}
                  </span>
                  <button
                    onClick={() => toggleBookmarkQuestion(q.id)}
                    className="text-slate-400 hover:text-red-600 transition p-1"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-900 whitespace-pre-line">
                  {q.question}
                </p>

                <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700">
                  <span className="font-bold text-emerald-800 block mb-1">
                    Answer: Option {["A", "B", "C", "D"][q.correctAnswerIndex]}
                  </span>
                  <p>{q.explanation}</p>
                </div>

                <div className="text-right">
                  <button
                    onClick={onGoToQuizzes}
                    className="text-xs font-bold text-amber-900 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Practice in Quiz Section</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
