import { Answer, Question } from "../../features/questions/interfaces";

export interface Submission {
  userId?: number;
  questionId: number;
  answerId: number;
  text?:string;
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
  text: string;
  explanation : string;
}

export interface GeneralSummary{
  id: number,
  score: string,
  comment: string,
  implication: string,
  action: string,
  recommendation : string
  type : string
}