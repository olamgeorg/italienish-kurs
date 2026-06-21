export type Level = 'A1' | 'A2';

export interface UserProgress {
  userId: string;
  email: string | null;
  displayName: string | null;
  points: number;
  completedQuestions: number;
  streak: number;
  lastActive: string; // ISO string
  topicsCompleted: Record<string, {
    score: number;
    total: number;
    completedAt: string;
  }>;
  levelProgress: Record<Level, {
    correct: number;
    totalPlayed: number;
  }>;
}

export type QuestionType = 'multiple-choice' | 'fill-blank' | 'reorder' | 'translation' | 'article-select';

export interface Question {
  id: string;
  level: Level;
  topicId: string;
  type: QuestionType;
  prompt: string;         // E.g., "Was bedeutet 'il tavolo'?" or "Wählen Sie den richtigen Artikel."
  helpText: string;       // In German, helper, e.g., "Tipp: 'tavolo' ist ein männliches Substantiv im Singular."
  italianSentence: string;// The query Italian phrase/sentence/word
  options?: string[];     // For multiple-choice or article-select, 4 choices
  correctAnswer: string | string[];  // Correct answer (string or array of words for reorder)
  explanation: string;    // Grammatical explanation in German
  contextImage?: string;  // Visual representation aid if desired
}

export interface Topic {
  id: string;
  title: string;          // Name in German (e.g., "Präsens-Verben (Presente)")
  italianTitle: string;   // Name in Italian (e.g., "Verbi al presente")
  description: string;    // Short description in German
  level: Level;
  iconName: string;       // Lucide icon key
  color: string;          // Tailwind color class for vibrant theme
}
