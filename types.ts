
export interface Theme {
  id: string;
  category: string;
  title: string;
  why: string;
  example: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  rationale: string;
}
