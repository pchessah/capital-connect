import { User } from "../../auth/interfaces/auth.interface";

export enum RegistrationStructure {
  CoOperative = "Co-operative",
  JointVenture = "Joint Venture",
  LimitedLiabilityPartnership = "Limited Liability Partnerships (LLP)",
  LimitedLiabilityPrivateCompany = "Limited Liability Private Company",
  LimitedLiabilityPublicCompany = "Limited Liability Public Company",
  NonForProfitOrganization = "Non-for-profit Organization",
  SoleProprietorship = "Sole Proprietorship"
}


export enum GrowthStage {
  SeedStartUpIdea = "Seed/Start Up/Idea",
  StartUpPostRevenues = "Start Up - Post Revenues",
  Growth = "Growth",
  Established = "Established",
  Expansion = "Expansion",
  LiquidationTurnAround = "Liquidation/Turn Around"
}


export interface CompanyInput {
  name: string;
  country: string;
  businessSector: string;
  productsAndServices: string;
  registrationStructure: RegistrationStructure;
  yearsOfOperation: string;
  growthStage: GrowthStage;
  numberOfEmployees: string;
  fullTimeBusiness: boolean;
}

 export interface CompanyResponse extends Company {
  user: User;
}

export interface Company extends CompanyInput {
  id: number;
}
