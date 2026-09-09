export type SubjectType = 
  | "Polity" 
  | "Economy" 
  | "Geography" 
  | "Environment" 
  | "History & Culture" 
  | "Science & Tech" 
  | "UP Special";

export type ExamTargetType = 
  | "UPSC Prelims" 
  | "UPSC Mains" 
  | "UPPSC Prelims" 
  | "UPPSC Mains" 
  | "Both";

export interface ExamRelevance {
  upscPrelims: boolean;
  upscMains: boolean;
  uppscPrelims: boolean;
  uppscMains: boolean;
  mainsPaper?: "GS-1" | "GS-2" | "GS-3" | "GS-4" | "UP GS-5" | "UP GS-6";
  priority: "Very High" | "High" | "Moderate";
}

export interface FlowchartStep {
  step: number;
  label: string;
  detail?: string;
  description?: string;
  tag?: string;
  highlight?: boolean;
}

export interface TopicNote {
  id: string;
  moduleId: string;
  subject: SubjectType;
  title: string;
  subtitle: string;
  readTimeMinutes: number;
  sources: string[]; // e.g. ["NCERT Class 11", "M. Laxmikanth 7th Ed"]
  examRelevance: ExamRelevance;
  highYieldPoints: string[];
  pyqReferences: string[];
  flowchart?: {
    title: string;
    steps: FlowchartStep[];
  };
  sections: {
    heading: string;
    content: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
    callout?: {
      type: "tip" | "trap" | "mnemonic" | "upsc_trend" | "uppsc_focus";
      title: string;
      text: string;
    };
  }[];
  keyTerms: { term: string; meaning: string; examTip?: string }[];
}

export interface ModuleCategory {
  id: string;
  subject: SubjectType;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  sourcesCount: string;
  topics: TopicNote[];
}

export interface MindMapNode {
  id: string;
  label: string;
  type?: "root" | "category" | "concept" | "trap" | "mains_keyword" | "exam_fact";
  color?: string;
  notes?: string;
  children?: MindMapNode[];
}

export interface MindMapData {
  id: string;
  title: string;
  subject: SubjectType;
  topicId?: string;
  description: string;
  examFocus: ("UPSC Prelims" | "UPSC Mains" | "UPPSC Prelims" | "UPPSC Mains")[];
  sources: string[];
  shortcutMnemonic?: string;
  flowchart?: {
    title: string;
    steps: FlowchartStep[];
  };
  rootNode: MindMapNode;
}

export interface ImportantKeyword {
  id: string;
  term: string;
  hindiTerm?: string;
  subject: SubjectType;
  category: "Mains Value-Add" | "Prelims Eliminator" | "Constitutional/Legal" | "Economic Indicator" | "UP Special Fact";
  relevance: ("UPSC Prelims" | "UPSC Mains" | "UPPSC Prelims" | "UPPSC Mains")[];
  definition: string;
  mainsUsageExample: string;
  prelimsTrapNote?: string;
  source: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  subject?: SubjectType;
  topicId?: string;
  topicTitle: string;
  question: string;
  statements?: string[];
  assertionReason?: {
    assertion: string;
    reason: string;
  };
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  pyqYear?: string;
  trapAlert?: string;
  difficulty: "Prelims Standard" | "Advanced" | "Moderate";
  examTarget: "UPSC Prelims" | "UPPSC Prelims" | "Both";
  sourceRef?: string;
}

export interface Flashcard {
  id: string;
  category: string;
  subject?: SubjectType;
  front: string;
  back: string;
  additionalInfo?: string;
  pyqNote?: string;
  examBadge?: "UPSC" | "UPPSC" | "Both";
}

export interface QuizResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  score: number; // +2 for correct, -0.66 for incorrect (or -0.33 for UPPSC)
  accuracyPercentage: number;
  timeSpentSeconds: number;
  examMode?: "UPSC" | "UPPSC";
  date: string;
  answers: {
    questionId: string;
    selectedOptionIndex: number | null;
    isCorrect: boolean;
  }[];
}

export interface UserProgress {
  readTopicIds: string[];
  bookmarkedTopicIds: string[];
  bookmarkedQuestionIds: string[];
  bookmarkedKeywordIds?: string[];
  bookmarkedMindMapIds?: string[];
  completedQuizzesCount: number;
  overallScore: number;
  questionsAttempted: number;
  questionsCorrect: number;
  mockTestsCompleted: QuizResult[];
}
