import React, { useState, useEffect } from "react";
import { Navbar, NavTabType } from "./components/Navbar";
import { NotesView } from "./components/NotesView";
import { MindMapsView } from "./components/MindMapsView";
import { KeywordsView } from "./components/KeywordsView";
import { TopicQuizzesView } from "./components/TopicQuizzesView";
import { MockTestView } from "./components/MockTestView";
import { FlashcardsView } from "./components/FlashcardsView";
import { AIMentorView } from "./components/AIMentorView";
import { BookmarksView } from "./components/BookmarksView";
import { SYLLABUS_MODULES } from "./data/syllabusData";
import { QUIZ_QUESTIONS } from "./data/quizData";
import { REVISION_FLASHCARDS } from "./data/flashcardData";
import { TopicNote, UserProgress, QuizResult, ImportantKeyword } from "./types";
import { BookOpen, HelpCircle, Sparkles, Award, GitBranch, KeyRound } from "lucide-react";
import { initAuth, googleSignIn, logoutWorkspace } from "./services/googleWorkspace";
import { User } from "firebase/auth";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabType>("notes");

  // Google Workspace User & Token
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
      }
    } catch (err: any) {
      if (
        err?.code !== "auth/popup-closed-by-user" &&
        err?.code !== "auth/cancelled-popup-request"
      ) {
        console.warn("Sign-in notice:", err?.message || err);
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleGoogleSignOut = async () => {
    await logoutWorkspace();
    setUser(null);
    setAccessToken(null);
  };

  // Selected topic in notes
  const [activeTopicId, setActiveTopicId] = useState<string>("constitutional-amendments-basic-structure");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [initialQuizModuleId, setInitialQuizModuleId] = useState<string | undefined>(undefined);
  const [aiMentorPrompt, setAiMentorPrompt] = useState<string>("");
  const [bookmarkedKeywordIds, setBookmarkedKeywordIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("myndmap_bookmarked_keywords");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent User Progress
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem("myndmap_upsc_uppsc_progress");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      readTopicIds: ["constitutional-amendments-basic-structure"],
      bookmarkedTopicIds: [],
      bookmarkedQuestionIds: [],
      questionsAttempted: 0,
      questionsCorrect: 0,
      mockTestsCompleted: [],
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem("myndmap_upsc_uppsc_progress", JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem("myndmap_bookmarked_keywords", JSON.stringify(bookmarkedKeywordIds));
    } catch {
      // ignore
    }
  }, [bookmarkedKeywordIds]);

  // Total topics calculation
  const totalTopics = SYLLABUS_MODULES.reduce((acc, m) => acc + m.topics.length, 0);

  // Toggle Read / Revised
  const toggleReadTopic = (topicId: string) => {
    setProgress((prev) => {
      const exists = prev.readTopicIds.includes(topicId);
      const nextRead = exists
        ? prev.readTopicIds.filter((id) => id !== topicId)
        : [...prev.readTopicIds, topicId];
      return { ...prev, readTopicIds: nextRead };
    });
  };

  // Toggle Bookmark Topic
  const toggleBookmarkTopic = (topicId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedTopicIds.includes(topicId);
      const nextBookmarks = exists
        ? prev.bookmarkedTopicIds.filter((id) => id !== topicId)
        : [...prev.bookmarkedTopicIds, topicId];
      return { ...prev, bookmarkedTopicIds: nextBookmarks };
    });
  };

  // Toggle Bookmark Question
  const toggleBookmarkQuestion = (questionId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedQuestionIds.includes(questionId);
      const nextQBookmarks = exists
        ? prev.bookmarkedQuestionIds.filter((id) => id !== questionId)
        : [...prev.bookmarkedQuestionIds, questionId];
      return { ...prev, bookmarkedQuestionIds: nextQBookmarks };
    });
  };

  // Toggle Bookmark Keyword
  const toggleBookmarkKeyword = (keywordId: string) => {
    setBookmarkedKeywordIds((prev) => {
      const exists = prev.includes(keywordId);
      return exists ? prev.filter((id) => id !== keywordId) : [...prev, keywordId];
    });
  };

  // Handle Question Answered
  const handleQuestionAnswered = (isCorrect: boolean) => {
    setProgress((prev) => ({
      ...prev,
      questionsAttempted: prev.questionsAttempted + 1,
      questionsCorrect: isCorrect ? prev.questionsCorrect + 1 : prev.questionsCorrect,
    }));
  };

  // Handle Mock Test Completed
  const handleMockTestCompleted = (result: QuizResult) => {
    setProgress((prev) => ({
      ...prev,
      questionsAttempted: prev.questionsAttempted + result.totalQuestions,
      questionsCorrect: prev.questionsCorrect + result.correct,
      mockTestsCompleted: [result, ...prev.mockTestsCompleted],
    }));
  };

  // Trigger Quiz for specific topic
  const handleTakeQuizForTopic = (topicId: string) => {
    const parentModule = SYLLABUS_MODULES.find((m) =>
      m.topics.some((t) => t.id === topicId)
    );
    if (parentModule) {
      setInitialQuizModuleId(parentModule.id);
    }
    setActiveTab("quizzes");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Trigger AI Mentor query
  const handleAskAIAboutTopic = (topic: TopicNote | string) => {
    const topicTitle = typeof topic === "string" ? topic : topic.title;
    setAiMentorPrompt(topicTitle);
    setActiveTab("ai");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAskAIAboutKeyword = (kw: ImportantKeyword) => {
    setAiMentorPrompt(`${kw.term} (${kw.hindiTerm || ""}): "${kw.definition}". Explain how to frame this in UPSC GS / UPPSC Mains answers with committee and case law references.`);
    setActiveTab("ai");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Sticky Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
        totalTopics={totalTopics}
        totalQuestions={QUIZ_QUESTIONS.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        onSignIn={handleGoogleSignIn}
        onSignOut={handleGoogleSignOut}
        isAuthLoading={isAuthLoading}
      />

      {/* Main View Router */}
      <main className="min-h-[calc(100vh-200px)]">
        {activeTab === "notes" && (
          <NotesView
            modules={SYLLABUS_MODULES}
            activeTopicId={activeTopicId}
            setActiveTopicId={setActiveTopicId}
            readTopicIds={progress.readTopicIds}
            toggleReadTopic={toggleReadTopic}
            bookmarkedTopicIds={progress.bookmarkedTopicIds}
            toggleBookmarkTopic={toggleBookmarkTopic}
            onTakeQuizForTopic={handleTakeQuizForTopic}
            onAskAIAboutTopic={handleAskAIAboutTopic}
            onNavigateToMindMap={() => {
              setActiveTab("mindmaps");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            searchQuery={searchQuery}
            accessToken={accessToken}
            onGoogleSignIn={handleGoogleSignIn}
          />
        )}

        {activeTab === "mindmaps" && (
          <MindMapsView
            onAskAIAboutTopic={(topicTitle) => {
              setAiMentorPrompt(topicTitle);
              setActiveTab("ai");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNavigateToNotes={(topicId) => {
              if (topicId) setActiveTopicId(topicId);
              setActiveTab("notes");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {activeTab === "keywords" && (
          <KeywordsView
            onAskAIAboutKeyword={handleAskAIAboutKeyword}
            bookmarkedKeywordIds={bookmarkedKeywordIds}
            toggleBookmarkKeyword={toggleBookmarkKeyword}
          />
        )}

        {activeTab === "quizzes" && (
          <TopicQuizzesView
            questions={QUIZ_QUESTIONS}
            modules={SYLLABUS_MODULES}
            initialModuleId={initialQuizModuleId}
            bookmarkedQuestionIds={progress.bookmarkedQuestionIds}
            toggleBookmarkQuestion={toggleBookmarkQuestion}
            onQuestionAnswered={handleQuestionAnswered}
            accessToken={accessToken}
            onGoogleSignIn={handleGoogleSignIn}
          />
        )}

        {activeTab === "mock" && (
          <MockTestView
            allQuestions={QUIZ_QUESTIONS}
            onTestCompleted={handleMockTestCompleted}
          />
        )}

        {activeTab === "flashcards" && (
          <FlashcardsView flashcards={REVISION_FLASHCARDS} />
        )}

        {activeTab === "ai" && (
          <AIMentorView
            initialTopicPrompt={aiMentorPrompt}
          />
        )}

        {activeTab === "bookmarks" && (
          <BookmarksView
            modules={SYLLABUS_MODULES}
            questions={QUIZ_QUESTIONS}
            bookmarkedTopicIds={progress.bookmarkedTopicIds}
            toggleBookmarkTopic={toggleBookmarkTopic}
            bookmarkedQuestionIds={progress.bookmarkedQuestionIds}
            toggleBookmarkQuestion={toggleBookmarkQuestion}
            onOpenTopic={(id) => {
              setActiveTopicId(id);
              setActiveTab("notes");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onGoToQuizzes={() => {
              setActiveTab("quizzes");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200/80 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-amber-800 text-amber-100 flex items-center justify-center font-bold text-xs font-display">
              M
            </div>
            <div>
              <p className="font-semibold text-slate-800">
                MyndMap • UPSC Civil Services & UPPSC Provincial Civil Services
              </p>
              <p className="text-[11px] text-slate-500">
                Compiled from NCERTs (Class 6–12), Laxmikanth, Shankar IAS, Ramesh Singh & UP GS Papers 5 & 6
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs flex-wrap">
            <button
              onClick={() => {
                setActiveTab("notes");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-amber-900 transition font-medium"
            >
              Notes
            </button>
            <button
              onClick={() => {
                setActiveTab("mindmaps");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-amber-900 transition font-medium text-amber-900 font-bold"
            >
              Mind Maps
            </button>
            <button
              onClick={() => {
                setActiveTab("keywords");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-amber-900 transition font-medium"
            >
              Keywords
            </button>
            <button
              onClick={() => {
                setActiveTab("quizzes");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-amber-900 transition font-medium"
            >
              Quizzes
            </button>
            <button
              onClick={() => {
                setActiveTab("mock");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-amber-900 transition font-medium"
            >
              Mock Test
            </button>
            <button
              onClick={() => {
                setActiveTab("ai");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-amber-900 transition font-medium"
            >
              MyndMentor AI
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
