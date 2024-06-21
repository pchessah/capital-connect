export enum RegistrationStructure {
  B2B = "B2B",
  B2C = "B2C"
}

export enum GrowthStage {
  Seed = "seed",
  SeriesA = "seriesA",
  SeriesB = "seriesB"
}

export interface CompanyInput {
  name: string;
  country: string;
  businessSector: string;
  productsAndServices: string;
  registrationStructure: RegistrationStructure;
  yearsOfOperation: number;
  growthStage: GrowthStage;
  numberOfEmployees: number;
  fullTimeBusiness: boolean;
}