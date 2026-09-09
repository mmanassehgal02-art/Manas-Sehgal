import React, { useState } from "react";
import { 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  X, 
  Shuffle, 
  Tag
} from "lucide-react";
import { Flashcard } from "../types";

interface FlashcardsViewProps {
  flashcards: Flashcard[];
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());

  // Filter flashcards by category
  const categories = ["All", ...Array.from(new Set(flashcards.map((f) => f.category)))];

  const filteredCards = selectedCategory === "All"
    ? flashcards
    : flashcards.filter((f) => f.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filteredCards.length));
  };

  const markKnown = (id: string, known: boolean) => {
    setKnownIds((prev) => {
      const next = new Set(prev);
      if (known) next.add(id);
      else next.delete(id);
      return next;
    });
    handleNext();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Flashcards Header & Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Active Recall Flashcards
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Rapid memory drills for high-frequency UPSC CSE matches and key facts
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-900 rounded-lg border border-amber-200">
              Mastered: {knownIds.size} / {flashcards.length}
            </span>
            <button
              onClick={handleShuffle}
              className="p-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition flex items-center gap-1 border border-slate-200"
              title="Shuffle Cards"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 pt-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-amber-900 text-amber-50 shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Card */}
      {currentCard && (
        <div className="perspective-1000">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[300px] bg-white rounded-3xl border-2 border-amber-800/20 p-8 sm:p-10 shadow-xs hover:border-amber-700/40 transition-all flex flex-col justify-between relative group select-none"
          >
            {/* Top Card Info Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {currentCard.category}
              </span>
              <div className="flex items-center gap-2">
                {currentCard.pyqNote && (
                  <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    {currentCard.pyqNote}
                  </span>
                )}
                <span className="font-mono text-slate-400">
                  {currentIndex + 1} / {filteredCards.length}
                </span>
              </div>
            </div>

            {/* Content Center: Front vs Back */}
            <div className="my-6 text-center space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800/80 block">
                {isFlipped ? "Answer / Key Revision Fact" : "Recall Prompt (Click anywhere to flip)"}
              </span>

              <h3 className={`text-lg sm:text-2xl font-bold font-display leading-relaxed transition ${
                isFlipped ? "text-amber-950" : "text-slate-900"
              }`}>
                {isFlipped ? currentCard.back : currentCard.front}
              </h3>

              {isFlipped && currentCard.additionalInfo && (
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed pt-3 border-t border-slate-100">
                  {currentCard.additionalInfo}
                </p>
              )}
            </div>

            {/* Bottom Card Helper */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <RotateCw className="w-3 h-3" />
                Tap card to reveal {isFlipped ? "question" : "answer"}
              </span>

              <span className={`text-[11px] font-bold ${
                knownIds.has(currentCard.id) ? "text-emerald-600" : "text-slate-400"
              }`}>
                {knownIds.has(currentCard.id) ? "✓ Mastered" : "Needs Recall"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation and Feedback Controls */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          className="p-2.5 sm:px-4 sm:py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Did you know it? Yes / No buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => currentCard && markKnown(currentCard.id, false)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            title="Mark for repeat practice"
          >
            <X className="w-3.5 h-3.5 text-red-600" />
            <span>Still Learning</span>
          </button>

          <button
            onClick={() => currentCard && markKnown(currentCard.id, true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            title="Mark as mastered"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mastered</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          className="p-2.5 sm:px-4 sm:py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
