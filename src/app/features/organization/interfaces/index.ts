import { User } from "../../auth/interfaces/auth.interface";

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

 export interface CompanyResponse {
  name: string;
  country: string;
  businessSector: string;
  productsAndServices: string;
  registrationStructure: string;
  yearsOfOperation: string;
  growthStage: string;
  numberOfEmployees: number;
  fullTimeBusiness: boolean;
  user: User;
  id: number;
}
