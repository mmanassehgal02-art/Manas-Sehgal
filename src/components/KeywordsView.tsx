import React, { useState, useMemo } from "react";
import { ImportantKeyword, SubjectType } from "../types";
import { IMPORTANT_KEYWORDS } from "../data/keywordsData";
import { 
  KeyRound, 
  Search, 
  Filter, 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  AlertTriangle, 
  PenTool, 
  Bookmark,
  Share2
} from "lucide-react";

interface KeywordsViewProps {
  onAskAIAboutKeyword?: (keyword: ImportantKeyword) => void;
  bookmarkedKeywordIds?: string[];
  toggleBookmarkKeyword?: (keywordId: string) => void;
}

export const KeywordsView: React.FC<KeywordsViewProps> = ({
  onAskAIAboutKeyword,
  bookmarkedKeywordIds = [],
  toggleBookmarkKeyword,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedExam, setSelectedExam] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered Keywords
  const filteredKeywords = useMemo(() => {
    return IMPORTANT_KEYWORDS.filter((kw) => {
      const matchSubject = selectedSubject === "All" || kw.subject === selectedSubject;
      const matchCategory = selectedCategory === "All" || kw.category === selectedCategory;
      const matchExam = selectedExam === "All" || kw.relevance.includes(selectedExam as any);
      const matchSearch =
        !searchQuery.trim() ||
        kw.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (kw.hindiTerm && kw.hindiTerm.includes(searchQuery)) ||
        kw.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kw.mainsUsageExample.toLowerCase().includes(searchQuery.toLowerCase());

      return matchSubject && matchCategory && matchExam && matchSearch;
    });
  }, [searchQuery, selectedSubject, selectedCategory, selectedExam]);

  const handleCopy = (kw: ImportantKeyword) => {
    const text = `${kw.term} (${kw.hindiTerm || ""})\nDefinition: ${kw.definition}\nMains Usage: ${kw.mainsUsageExample}\nPrelims Trap: ${kw.prelimsTrapNote || "N/A"}`;
    navigator.clipboard.writeText(text);
    setCopiedId(kw.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const subjectsList: ("All" | SubjectType)[] = [
    "All",
    "Polity",
    "Economy",
    "Geography",
    "Environment",
    "History & Culture",
    "Science & Tech",
    "UP Special",
  ];

  const categoriesList = [
    "All",
    "Mains Value-Add",
    "Prelims Eliminator",
    "Constitutional/Legal",
    "Economic Indicator",
    "UP Special Fact",
  ];

  const examsList = [
    "All",
    "UPSC Prelims",
    "UPSC Mains",
    "UPPSC Prelims",
    "UPPSC Mains",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900">
                <KeyRound size={20} />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                High-Yield Keywords Bank (Prelims & Mains)
              </h2>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Essential vocabulary, legal doctrines, economic indicators & UPPSC special terminology that earn +1 to +2 marks in Mains and prevent elimination traps in Prelims.
            </p>
          </div>

          <div className="shrink-0 text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
              {filteredKeywords.length} of {IMPORTANT_KEYWORDS.length} Keywords
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative pt-2">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, Hindi terms, doctrines, or concepts (e.g. Asymmetric Federalism, ODOP, Carrying Capacity)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Filter Tabs & Badges */}
      <div className="space-y-2.5">
        {/* Subject Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold px-1 shrink-0 flex items-center gap-1">
            <Filter size={13} /> Subject:
          </span>
          {subjectsList.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1 rounded-full font-medium transition-all whitespace-nowrap ${
                selectedSubject === s
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Category & Exam Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-slate-400 font-semibold px-1 shrink-0">Type:</span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-0.5 rounded-md font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-amber-800 text-amber-50"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Exam Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-slate-400 font-semibold px-1 shrink-0">Exam:</span>
            {examsList.map((ex) => (
              <button
                key={ex}
                onClick={() => setSelectedExam(ex)}
                className={`px-2.5 py-0.5 rounded-md font-medium transition-all whitespace-nowrap ${
                  selectedExam === ex
                    ? "bg-slate-800 text-slate-100"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Keywords Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredKeywords.map((kw) => {
          const isBookmarked = bookmarkedKeywordIds.includes(kw.id);

          return (
            <div
              key={kw.id}
              className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-amber-300 transition-all duration-150 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {kw.subject}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      kw.category === "Mains Value-Add"
                        ? "bg-violet-50 text-violet-800 border border-violet-200"
                        : kw.category === "Prelims Eliminator"
                        ? "bg-rose-50 text-rose-800 border border-rose-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}>
                      {kw.category}
                    </span>
                  </div>

                  {/* Exam Badges */}
                  <div className="flex items-center gap-1">
                    {kw.relevance.map((rel) => (
                      <span
                        key={rel}
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200/60"
                      >
                        {rel.replace(" Prelims", " Pre").replace(" Mains", " Main")}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Term and Hindi Term */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {kw.term}
                  </h3>
                  {kw.hindiTerm && (
                    <span className="text-xs text-amber-900 font-medium font-sans">
                      {kw.hindiTerm}
                    </span>
                  )}
                </div>

                {/* Definition */}
                <p className="text-xs text-slate-700 leading-relaxed">
                  {kw.definition}
                </p>

                {/* Mains Usage Example Box */}
                <div className="p-3 rounded-lg bg-violet-50/60 border border-violet-100 space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-violet-900 uppercase tracking-wider">
                    <PenTool size={11} />
                    <span>Mains Answer Sentence Usage</span>
                  </div>
                  <p className="text-xs text-violet-950 font-medium italic leading-relaxed">
                    "{kw.mainsUsageExample}"
                  </p>
                </div>

                {/* Prelims Trap Alert (if present) */}
                {kw.prelimsTrapNote && (
                  <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-100 flex items-start gap-2">
                    <AlertTriangle size={13} className="text-rose-600 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-rose-950 leading-snug">
                      <strong className="font-bold">Prelims Trap:</strong> {kw.prelimsTrapNote}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Footer: Source & Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[10px] text-slate-500 truncate max-w-[220px]" title={kw.source}>
                  📚 {kw.source}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onAskAIAboutKeyword && (
                    <button
                      onClick={() => onAskAIAboutKeyword(kw)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-[11px] transition-colors"
                      title="Generate model answer with this keyword"
                    >
                      <Sparkles size={12} />
                      <span>AI Enrich</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCopy(kw)}
                    className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
                    title="Copy Keyword Details"
                  >
                    {copiedId === kw.id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  </button>

                  {toggleBookmarkKeyword && (
                    <button
                      onClick={() => toggleBookmarkKeyword(kw.id)}
                      className={`p-1.5 rounded transition-colors ${
                        isBookmarked
                          ? "text-amber-600 hover:bg-amber-50"
                          : "text-slate-400 hover:bg-slate-100"
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Keyword"}
                    >
                      <Bookmark size={14} className={isBookmarked ? "fill-current" : ""} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
