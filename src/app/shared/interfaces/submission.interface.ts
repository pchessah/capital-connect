import { Answer, Question } from "../../features/questions/interfaces";

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

export interface UserSubmissionResponse {
  id: number;
  answer: Answer;
  question: Question;

}