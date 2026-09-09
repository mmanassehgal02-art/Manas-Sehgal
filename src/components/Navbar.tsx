import React from "react";
import { 
  BookOpen, 
  HelpCircle, 
  Clock, 
  Sparkles, 
  Bookmark, 
  Layers, 
  CheckCircle2, 
  Award,
  Search,
  GitBranch,
  KeyRound,
  LogOut,
  User as UserIcon,
  Loader2
} from "lucide-react";
import { UserProgress } from "../types";
import { User } from "firebase/auth";

export type NavTabType = "notes" | "mindmaps" | "keywords" | "quizzes" | "mock" | "flashcards" | "ai" | "bookmarks";

interface NavbarProps {
  activeTab: NavTabType;
  setActiveTab: (tab: NavTabType) => void;
  progress: UserProgress;
  totalTopics: number;
  totalQuestions: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user?: User | null;
  onSignIn?: () => void;
  onSignOut?: () => void;
  isAuthLoading?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progress,
  totalTopics,
  searchQuery,
  setSearchQuery,
  user,
  onSignIn,
  onSignOut,
  isAuthLoading,
}) => {
  const readPercentage = totalTopics > 0 
    ? Math.round((progress.readTopicIds.length / totalTopics) * 100) 
    : 0;
  const accuracy = progress.questionsAttempted > 0 
    ? Math.round((progress.questionsCorrect / progress.questionsAttempted) * 100) 
    : 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      {/* Top Banner with UPSC CSE & UPPSC PCS Identity & Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-700 via-amber-800 to-amber-950 flex items-center justify-center text-amber-100 shadow-xs ring-1 ring-amber-900/20">
              <span className="font-display font-bold text-lg tracking-wider">M</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 font-display tracking-tight">
                  MyndMap
                </h1>
                <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  UPSC & UPPSC (Pre + Mains)
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hidden sm:inline-block">
                  NCERTs & Standard Sources
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Multi-Subject Notes • Concept Mind Maps & Flowcharts • High-Yield Keywords Bank
              </p>
            </div>
          </div>

          {/* Quick Search & Progress Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, mind maps, keywords..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Syllabus Coverage Pill */}
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50/80 border border-amber-200/70 rounded-lg text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-800" />
              <span className="text-amber-950 font-medium">
                Syllabus: <strong className="text-amber-900">{readPercentage}%</strong>
              </span>
              <div className="w-12 h-1.5 bg-amber-200/60 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-700 rounded-full transition-all duration-500" 
                  style={{ width: `${readPercentage}%` }}
                />
              </div>
            </div>

            {/* Quiz Accuracy Pill */}
            {progress.questionsAttempted > 0 && (
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200/70 rounded-lg text-xs text-emerald-900">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>Accuracy: <strong>{accuracy}%</strong></span>
              </div>
            )}

            {/* Bookmarks Counter button */}
            <button
              id="bookmarks-shortcut-btn"
              onClick={() => setActiveTab("bookmarks")}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg transition border ${
                activeTab === "bookmarks"
                  ? "bg-amber-900 text-amber-50 border-amber-900"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
              title="View Bookmarks"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="font-semibold">{progress.bookmarkedTopicIds.length + progress.bookmarkedQuestionIds.length}</span>
            </button>

            {/* Google Workspace Sign-In & Profile */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100/90 border border-slate-200 rounded-lg text-xs" title={`Connected to Google Drive & Forms as ${user.email}`}>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-4 h-4 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <UserIcon className="w-3.5 h-3.5 text-slate-600" />
                  )}
                  <span className="max-w-[100px] truncate font-medium text-slate-800 text-[11px]">
                    {user.displayName?.split(" ")[0] || user.email?.split("@")[0]}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Google Drive & Forms connected" />
                </div>
                {onSignOut && (
                  <button
                    onClick={onSignOut}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                    title="Sign Out of Google Workspace"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              onSignIn && (
                <button
                  id="google-signin-btn"
                  onClick={onSignIn}
                  disabled={isAuthLoading}
                  className="flex items-center gap-2 px-3 py-1 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-medium text-xs rounded-lg border border-slate-300 shadow-2xs transition disabled:opacity-50"
                  title="Connect Google Drive & Forms"
                >
                  {isAuthLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-600" />
                  ) : (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                  )}
                  <span>Sign in with Google</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 border-t border-slate-100 pt-1 pb-1.5 overflow-x-auto no-scrollbar">
          <button
            id="nav-notes-tab"
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap ${
              activeTab === "notes"
                ? "bg-amber-900 text-amber-50 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Notes</span>
          </button>

          <button
            id="nav-mindmaps-tab"
            onClick={() => setActiveTab("mindmaps")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap ${
              activeTab === "mindmaps"
                ? "bg-amber-900 text-amber-50 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <GitBranch className="w-4 h-4 text-amber-400" />
            <span>Mind Maps & Flowcharts</span>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded-full">
              New
            </span>
          </button>

          <button
            id="nav-keywords-tab"
            onClick={() => setActiveTab("keywords")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap ${
              activeTab === "keywords"
                ? "bg-amber-900 text-amber-50 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Keywords Bank</span>
          </button>

          <button
            id="nav-quizzes-tab"
            onClick={() => setActiveTab("quizzes")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap ${
              activeTab === "quizzes"
                ? "bg-amber-900 text-amber-50 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Topic Quizzes</span>
          </button>

          <button
            id="nav-mock-tab"
            onClick={() => setActiveTab("mock")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap ${
              activeTab === "mock"
                ? "bg-amber-900 text-amber-50 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Prelims Mock Test</span>
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded-full border border-red-200">
              -0.66
            </span>
          </button>

          <button
            id="nav-flashcards-tab"
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap ${
              activeTab === "flashcards"
                ? "bg-amber-900 text-amber-50 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Flashcards</span>
          </button>

          <button
            id="nav-ai-tab"
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap ${
              activeTab === "ai"
                ? "bg-amber-900 text-amber-50 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>MyndMentor AI</span>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded-full">
              Gemini
            </span>
          </button>

          <button
            id="nav-bookmarks-tab"
            onClick={() => setActiveTab("bookmarks")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition whitespace-nowrap ${
              activeTab === "bookmarks"
                ? "bg-amber-900 text-amber-50 shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Bookmarks</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
