import React, { useState, useMemo } from "react";
import { 
  CheckCircle2, 
  Bookmark, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight,
  BookOpen,
  Tag,
  Lightbulb,
  GitBranch,
  Workflow,
  Layers,
  Filter,
  Share2,
  HardDrive,
  ExternalLink,
  Loader2
} from "lucide-react";
import { ModuleCategory, TopicNote, SubjectType } from "../types";
import { exportNoteToGoogleDrive } from "../services/googleWorkspace";

interface NotesViewProps {
  modules: ModuleCategory[];
  activeTopicId: string;
  setActiveTopicId: (id: string) => void;
  readTopicIds: string[];
  toggleReadTopic: (id: string) => void;
  bookmarkedTopicIds: string[];
  toggleBookmarkTopic: (id: string) => void;
  onTakeQuizForTopic: (topicId: string) => void;
  onAskAIAboutTopic: (topic: TopicNote) => void;
  onNavigateToMindMap?: (topicId?: string) => void;
  searchQuery: string;
  accessToken?: string | null;
  onGoogleSignIn?: () => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  modules,
  activeTopicId,
  setActiveTopicId,
  readTopicIds,
  toggleReadTopic,
  bookmarkedTopicIds,
  toggleBookmarkTopic,
  onTakeQuizForTopic,
  onAskAIAboutTopic,
  onNavigateToMindMap,
  searchQuery,
  accessToken,
  onGoogleSignIn,
}) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>("All");
  const [isExportingToDrive, setIsExportingToDrive] = useState(false);
  const [driveExportSuccessUrl, setDriveExportSuccessUrl] = useState<string | null>(null);
  const [driveExportError, setDriveExportError] = useState<string | null>(null);

  // Filter modules by subject if selected
  const filteredModules = useMemo(() => {
    if (selectedSubjectFilter === "All") return modules;
    return modules.filter((m) => m.subject === selectedSubjectFilter);
  }, [modules, selectedSubjectFilter]);

  // Find currently active module and topic
  const currentModule = modules.find((m) =>
    m.topics.some((t) => t.id === activeTopicId)
  ) || filteredModules[0] || modules[0];

  const currentTopic = currentModule.topics.find((t) => t.id === activeTopicId) || currentModule.topics[0];

  // Tab for active module selection in the sidebar
  const [selectedModuleId, setSelectedModuleId] = useState<string>(currentModule.id);

  const displayedModule = filteredModules.find((m) => m.id === selectedModuleId) || currentModule;

  // Flattened topic list for Next/Prev navigation
  const allTopics = useMemo(() => modules.flatMap((m) => m.topics), [modules]);
  const currentTopicIndex = allTopics.findIndex((t) => t.id === currentTopic.id);
  const prevTopic = currentTopicIndex > 0 ? allTopics[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < allTopics.length - 1 ? allTopics[currentTopicIndex + 1] : null;

  // Filter topics if search query is provided
  const searchFilteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return allTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.highYieldPoints.some((p) => p.toLowerCase().includes(q)) ||
        t.sections.some((s) => s.heading.toLowerCase().includes(q) || s.content.some((c) => c.toLowerCase().includes(q))) ||
        t.keyTerms.some((k) => k.term.toLowerCase().includes(q) || k.meaning.toLowerCase().includes(q))
    );
  }, [allTopics, searchQuery]);

  const isRead = readTopicIds.includes(currentTopic.id);
  const isBookmarked = bookmarkedTopicIds.includes(currentTopic.id);

  const subjectsList: ("All" | SubjectType)[] = [
    "All",
    "Polity",
    "Economy",
    "Geography",
    "Environment",
    "History & Culture",
    "UP Special",
  ];

  const handleExportToGoogleDrive = async () => {
    setDriveExportError(null);
    setDriveExportSuccessUrl(null);

    if (!accessToken) {
      if (onGoogleSignIn) {
        onGoogleSignIn();
      } else {
        setDriveExportError("Please sign in with Google to save notes to your Google Drive.");
      }
      return;
    }

    setIsExportingToDrive(true);
    try {
      const formattedContent = `MYNDMAP UPSC / UPPSC CSE STUDY NOTES
==================================================
Topic: ${currentTopic.title}
Module: ${currentModule.title} (${currentTopic.subject || currentModule.subject})
Exam Relevance: ${currentTopic.examRelevance.join(", ")}
Key Sources: ${currentTopic.sources.join(", ")}

HIGH-YIELD TAKEAWAYS:
--------------------------------------------------
${currentTopic.highYieldPoints.map((pt, i) => `${i + 1}. ${pt}`).join("\n")}

PRELIMS ELIMINATION TRAPS:
--------------------------------------------------
${currentTopic.prelimsTraps.map((tr, i) => `${i + 1}. ${tr}`).join("\n")}

MAINS ANSWER BOOSTER KEYWORDS:
--------------------------------------------------
${currentTopic.mainsKeywords.join(", ")}

${currentTopic.comparativeTable ? `
COMPARATIVE ANALYSIS:
--------------------------------------------------
Headers: ${currentTopic.comparativeTable.headers.join(" | ")}
${currentTopic.comparativeTable.rows.map(row => row.join(" | ")).join("\n")}
` : ""}
`;

      const res = await exportNoteToGoogleDrive(currentTopic.title, formattedContent, accessToken);
      const url = res.webViewLink || `https://drive.google.com/file/d/${res.fileId}/view`;
      setDriveExportSuccessUrl(url);
    } catch (err: any) {
      setDriveExportError(err.message || "Failed to export note to Google Drive.");
    } finally {
      setIsExportingToDrive(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Subject Filter Navigation Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-bold px-1 shrink-0 flex items-center gap-1">
            <Filter size={13} /> Select Subject:
          </span>
          {subjectsList.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSelectedSubjectFilter(s);
                const matchingMod = modules.find((m) => s === "All" || m.subject === s);
                if (matchingMod) {
                  setSelectedModuleId(matchingMod.id);
                  setActiveTopicId(matchingMod.topics[0].id);
                }
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedSubjectFilter === s
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Search notice if search active */}
      {searchQuery && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs sm:text-sm text-amber-900">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>
              Search results for <strong>"{searchQuery}"</strong> ({searchFilteredTopics?.length || 0} topics matched)
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Syllabus Tree & Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Module Selector Pill Bar */}
          {!searchQuery && (
            <div className="bg-white rounded-xl border border-slate-200/80 p-1.5 shadow-2xs space-y-1">
              <span className="block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Syllabus Modules ({filteredModules.length})
              </span>
              {filteredModules.map((mod) => {
                const isSelected = mod.id === selectedModuleId;
                const readCount = mod.topics.filter((t) => readTopicIds.includes(t.id)).length;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setSelectedModuleId(mod.id);
                      setActiveTopicId(mod.topics[0].id);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                      isSelected
                        ? "bg-amber-900 text-amber-50 shadow-xs"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="block font-semibold truncate">{mod.title}</span>
                      <span className={`text-[10px] ${isSelected ? "text-amber-200" : "text-slate-400"}`}>
                        {mod.subject}
                      </span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${
                      isSelected ? "bg-amber-800 text-amber-200" : "bg-slate-100 text-slate-500"
                    }`}>
                      {readCount}/{mod.topics.length}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Topics List Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-2xs">
            <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {searchQuery ? "Matching Topics" : displayedModule.title}
              </h3>
              {!searchQuery && (
                <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                  {displayedModule.badge}
                </span>
              )}
            </div>

            <div className="space-y-1 max-h-[540px] overflow-y-auto pr-1">
              {(searchFilteredTopics || displayedModule.topics).map((topic) => {
                const isSelected = topic.id === currentTopic.id;
                const topicRead = readTopicIds.includes(topic.id);
                const topicBookmarked = bookmarkedTopicIds.includes(topic.id);

                return (
                  <div
                    key={topic.id}
                    onClick={() => setActiveTopicId(topic.id)}
                    className={`group cursor-pointer p-2.5 rounded-lg border transition text-left flex items-start gap-2.5 ${
                      isSelected
                        ? "bg-amber-50/90 border-amber-700/40 text-amber-950 shadow-2xs"
                        : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-700"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReadTopic(topic.id);
                      }}
                      className={`mt-0.5 shrink-0 transition ${
                        topicRead ? "text-emerald-600" : "text-slate-300 hover:text-slate-400"
                      }`}
                      title={topicRead ? "Marked as Revised" : "Click to mark as read"}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className={`text-xs font-semibold truncate ${
                          isSelected ? "text-amber-950 font-bold" : "text-slate-800"
                        }`}>
                          {topic.title}
                        </h4>
                        {topicBookmarked && (
                          <Bookmark className="w-3 h-3 text-amber-700 fill-amber-700 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {topic.subtitle}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {topic.readTimeMinutes} min
                        </span>
                        {topic.flowchart && (
                          <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                            <Workflow size={10} /> Flowchart
                          </span>
                        )}
                        <span>•</span>
                        <span>{topic.highYieldPoints.length} takeaways</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Complete Note Body */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          
          {/* Note Header Banner */}
          <div className="p-6 sm:p-8 bg-linear-to-b from-amber-50/50 via-white to-white border-b border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                  {currentTopic.subject || currentModule.subject || "General Studies"}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  {currentModule.title}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  {currentTopic.readTimeMinutes} min read
                </span>
              </div>

              {/* Action Buttons: Bookmark, Mark Read, Take Quiz, Ask AI */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmarkTopic(currentTopic.id)}
                  className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
                    isBookmarked
                      ? "bg-amber-100 border-amber-300 text-amber-900 font-bold"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                  title="Bookmark for quick revision"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-900" : ""}`} />
                  <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
                </button>

                <button
                  onClick={() => toggleReadTopic(currentTopic.id)}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
                    isRead
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isRead ? "text-emerald-600 fill-emerald-100" : ""}`} />
                  <span>{isRead ? "Revised" : "Mark as Revised"}</span>
                </button>

                {/* Save Note to Google Drive Button */}
                <button
                  onClick={handleExportToGoogleDrive}
                  disabled={isExportingToDrive}
                  className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 shadow-2xs transition disabled:opacity-50"
                  title="Export this note to your Google Drive"
                >
                  {isExportingToDrive ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
                  ) : (
                    <HardDrive className="w-3.5 h-3.5 text-blue-600" />
                  )}
                  <span className="hidden sm:inline">Save to Drive</span>
                </button>
              </div>
            </div>

            {/* Google Drive Export Success Feedback */}
            {driveExportSuccessUrl && (
              <div className="mb-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between gap-2 text-xs text-blue-900">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Note exported to Google Drive successfully!
                </span>
                <a
                  href={driveExportSuccessUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 underline"
                >
                  Open in Drive <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Google Drive Export Error / Auth prompt */}
            {driveExportError && (
              <div className="mb-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between gap-2 text-xs text-amber-900">
                <span>{driveExportError}</span>
                <button
                  onClick={() => setDriveExportError(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs px-1"
                >
                  ✕
                </button>
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight mb-2">
              {currentTopic.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-3 leading-relaxed">
              {currentTopic.subtitle}
            </p>

            {/* Exam Relevance & Sources Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
              {currentTopic.examRelevance && currentTopic.examRelevance.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    🎯 Target:
                  </span>
                  {currentTopic.examRelevance.map((rel, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200"
                    >
                      {rel}
                    </span>
                  ))}
                </div>
              )}

              {currentTopic.sourcesCompiled && currentTopic.sourcesCompiled.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    📚 Sources:
                  </span>
                  {currentTopic.sourcesCompiled.map((src, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {src}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* PYQ References Badges */}
            {currentTopic.pyqReferences.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 mt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3 text-amber-700" />
                  PYQ Trend:
                </span>
                {currentTopic.pyqReferences.map((pyq, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200/80"
                  >
                    {pyq}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Note Content Body */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Quick Actions Callout Bar: Test Yourself & Ask AI & Mind Map */}
            <div className="p-4 bg-linear-to-r from-amber-50 to-orange-50/50 rounded-xl border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-700 text-amber-50 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Master this topic for UPSC & UPPSC Pre + Mains
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Solve high-yield Prelims MCQs, view interactive visual Mind Maps, or consult MyndMentor AI
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 flex-wrap">
                {onNavigateToMindMap && (
                  <button
                    onClick={() => onNavigateToMindMap(currentTopic.id)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-semibold rounded-lg shadow-2xs flex items-center justify-center gap-1.5 transition"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Mind Map</span>
                  </button>
                )}
                <button
                  onClick={() => onTakeQuizForTopic(currentTopic.id)}
                  className="px-3 py-1.5 bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-semibold rounded-lg shadow-2xs flex items-center justify-center gap-1.5 transition"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Topic Quiz</span>
                </button>
                <button
                  onClick={() => onAskAIAboutTopic(currentTopic)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 text-amber-900 border border-amber-300 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>

            {/* HIGH-YIELD FLOWCHART (If Available) */}
            {currentTopic.flowchart && (
              <div className="bg-white rounded-xl border-2 border-amber-300/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-amber-100 text-amber-900">
                      <Workflow size={16} />
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                      {currentTopic.flowchart.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Mains Diagram Formula (+1.5 Marks)
                  </span>
                </div>

                <div className="relative pl-6 space-y-4 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-300">
                  {currentTopic.flowchart.steps.map((st, sIdx) => (
                    <div key={sIdx} className="relative">
                      <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-white ${
                        st.highlight ? "bg-amber-700 text-amber-100" : "bg-slate-800 text-slate-100"
                      }`}>
                        {st.step}
                      </div>
                      <div className={`p-3 rounded-lg border text-xs ${
                        st.highlight ? "bg-amber-50/70 border-amber-300 font-medium" : "bg-slate-50/70 border-slate-200"
                      }`}>
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <strong className="text-slate-900">{st.label}</strong>
                          {st.tag && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-semibold">
                              {st.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {st.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* High-Yield Summary Box */}
            <div className="bg-slate-50/90 rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-sans">
                  High-Yield Takeaways (UPSC Pre & Mains + UPPSC)
                </h3>
              </div>
              <ul className="space-y-2">
                {currentTopic.highYieldPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Sections */}
            <div className="space-y-8">
              {currentTopic.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display pb-2 border-b border-slate-100">
                    {sec.heading}
                  </h3>

                  <div className="space-y-3">
                    {sec.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Comparative Table if available */}
                  {sec.table && (
                    <div className="my-4 overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-amber-900/5 border-b border-slate-200 text-slate-900 font-bold">
                          <tr>
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="px-3.5 py-3 whitespace-nowrap font-bold text-xs">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-amber-50/30 transition">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3.5 py-2.5 text-slate-700 font-medium">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Callout Box: Trap alert, Mnemonic, or UPSC Trend */}
                  {sec.callout && (
                    <div className={`p-4 rounded-xl border my-4 ${
                      sec.callout.type === "trap"
                        ? "bg-red-50/70 border-red-200 text-red-950"
                        : sec.callout.type === "mnemonic"
                        ? "bg-purple-50/70 border-purple-200 text-purple-950"
                        : "bg-amber-50/70 border-amber-200 text-amber-950"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        {sec.callout.type === "trap" ? (
                          <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
                        ) : (
                          <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
                        )}
                        <h4 className="text-xs font-bold uppercase tracking-wider">
                          {sec.callout.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        {sec.callout.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Glossary: Key Terms Definitions */}
            {currentTopic.keyTerms.length > 0 && (
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-display mb-3">
                  Essential Terminology for Prelims & Mains
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentTopic.keyTerms.map((term, tIdx) => (
                    <div key={tIdx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                      <strong className="text-xs font-bold text-amber-950 block mb-1">
                        {term.term}
                      </strong>
                      <p className="text-xs text-slate-600 leading-normal">
                        {term.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Navigation: Previous / Next Topic */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              {prevTopic ? (
                <button
                  onClick={() => setActiveTopicId(prevTopic.id)}
                  className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-amber-900 transition p-2 rounded-lg hover:bg-slate-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400">Previous</span>
                    <span className="font-semibold truncate max-w-[140px] sm:max-w-xs block">
                      {prevTopic.title}
                    </span>
                  </div>
                </button>
              ) : <div />}

              {nextTopic && (
                <button
                  onClick={() => setActiveTopicId(nextTopic.id)}
                  className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-amber-900 transition p-2 rounded-lg hover:bg-slate-50 text-right"
                >
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-400">Next Topic</span>
                    <span className="font-semibold truncate max-w-[140px] sm:max-w-xs block">
                      {nextTopic.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
