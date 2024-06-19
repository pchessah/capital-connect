export interface SectionInput {
  name: string;
  description: string;
}

export interface Section extends SectionInput {
  id: number;
}

export interface SubSectionInput {
  name: string;
  description: string;
  sectionId: number;
}

export interface QuestionInput {
  text: string;
  subSectionId: number;
  type: QuestionType;
}

export interface Question {
  text: string;
  type: QuestionType;
  subSection: {
    id:number;
  }
  id: number;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  SHORT_ANSWER = 'SHORT_ANSWER',
  TRUE_FALSE = 'TRUE_FALSE'
}

export interface SubSection extends SubSectionInput {
  id: number;
  name: string;
  description: string;
  section: { id: number }
}


export interface CurrentDashboardInput {
  sectionId: number;
  subsectionId: number;
}