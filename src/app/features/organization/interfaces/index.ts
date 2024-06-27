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
  companyLogo: { id:string, path: string }
}


export enum YearsOfOperation {
  ZeroYears = "0 Years",
  ZeroToOneYears = "0 - 1 years",
  TwoToThreeYears = "2 - 3 years",
  ThreeToFiveYears = "3 - 5 years",
  FiveToEightYears = "5 - 8 years",
  MoreThanEightYears = "More than 8 years"
}

export enum NumberOfEmployees {
  OneToTen = "1-10 employees",
  ElevenToFifty = "11-50 employees",
  FiftyOneToTwoHundred = "51-200 employees",
  TwoHundredOneToFiveHundred = "201-500 employees",
  FiveHundredOneToThousand = "501-1000 employees",
  ThousandOneToFiveThousand = "1001-5000 employees",
  FiveThousandOneToTenThousand = "5001-10,000 employees",
  TenThousandPlus = "10,001+ employees"
}
