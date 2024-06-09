export interface Section {
  name: string;
  steps: number[];
}

export interface Question {
  section: string;
  step: number;
  questionText: string;
  options: string[];
}