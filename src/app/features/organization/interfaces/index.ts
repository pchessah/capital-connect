import { User } from "../../auth/interfaces/auth.interface";

export enum RegistrationStructure {
  B2B = "B2B",
  B2C = "B2C"
}

export enum GrowthStage {
  Startup = "Start Up",
  GrowthStage = "Growth Stage",
  EstablishedExpansion = "Establishment Expansion",
  LiquidationTurnuAround = "Liquidation Turnaround"
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

 export interface CompanyResponse extends Company {
  user: User;
}

export interface Company extends CompanyInput {
  id: number;
}
