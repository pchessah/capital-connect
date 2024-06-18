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

export interface SubSection extends SubSectionInput {
  id: number;
  name: string;
  description: string;
  section: { id: number}
}

export interface QuestionInput { }

export interface CurrentDashboardInput {
  sectionId: number;
  subsectionId: number;
}