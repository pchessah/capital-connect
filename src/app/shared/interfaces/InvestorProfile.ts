export interface InvestorProfile {
    userId: number;
    organizationName: string;
    countriesOfInvestmentFocus: string[];
    headOfficeLocation: string;
    emailAddress: string;
    contactPerson: string;
    useOfFunds: string[];
    maximumFunding: number;
    minimumFunding: number;
    sectorsOfInvestment: string[];
    businessGrowthStages: string[];
    investorType: string;
    investmentStructures: string[];
    esgFocusAreas: string[];
    registrationStructures: string[];
  }