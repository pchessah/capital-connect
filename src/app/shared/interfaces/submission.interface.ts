export interface Submission {
  userId?: number;
  questionId: number;
  answerId: number;
}

export interface SubmissionResponse {
  answer: {
    id: number;
  };
  id: number;
  question: {
    id: number;
  };
  user: {
    id: number;
  };
}