import { CompanyStateService } from "../../../features/organization/services/company-state.service";
import { GrowthStage } from "../../../features/organization/interfaces";

const company = new CompanyStateService()

export enum ESUBSECTIONS {
  LANDING = 'LANDING', STEP_ONE = 'STEP_ONE', STEP_TWO = 'STEP_TWO', STEP_THREE = 'STEP_THREE'
}
export interface ISECTION {
  ID: number,
  LANDING?: number,
  STEP_ONE: number,
  STEP_TWO: number,
  STEP_THREE: number,
}
export interface Score {
  percentageScore: number, score: number, targetScore: number,
  subSectionName?: string, subSectionId?: number
}

export const INVESTOR_ONBOARDING_SUBSECTION_IDS = {
  ID: 7,
  LANDING: 21,
  STEP_ONE: 22,
  STEP_TWO: 24,
  STEP_THREE: 25,
}

export const INVESTOR_ELIGIBILITY_SUBSECTION_IDS = {

  ESTABLISHED_EXPANSION: {
    ID: 10,
    LANDING: 199,
    STEP_ONE: 67,
    STEP_TWO: 68,
    STEP_THREE: 69,
  },

  LIQUIDATION_TURNAROUND: {
    ID: 11,
    LANDING: null as unknown as number,
    STEP_ONE: 133,
    STEP_TWO: 136,
    STEP_THREE: 137,
  },

  STARTUP_POST_REVENUE: {
    ID: 1,
    LANDING: 15,
    STEP_ONE: 236,
    STEP_TWO: 237,
    STEP_THREE: 9,
  },

  STARTUP_PRE_REVENUE: {
    ID: 1,
    LANDING: 15,
    STEP_ONE: 232,
    STEP_TWO: 235,
    STEP_THREE: 9,
  },

  STARTUP_DEFAULT: {
    ID: 1,
    LANDING: 15,
    STEP_ONE: 3,
    STEP_TWO: 1,
    STEP_THREE: 9,
  },

  GROWTH_STAGE: {
    ID: 9,
    LANDING: 34,
    STEP_ONE: 35,
    STEP_TWO: 37,
    STEP_THREE: 36,
  }
}

export const INVESTOR_PREPAREDNESS_SUBSECTION_IDS = {
  ID: 4,
  LANDING: 6,
  STEP_ONE: 16,
  STEP_TWO: 17,
  STEP_THREE: 18,
}

export const BUSINESS_FINANCIALS_SUBSECTION_IDS = {
  ID: 5,
  LANDING: 11,
  STEP_ONE: 12,
  STEP_TWO: 14,
  STEP_THREE: 13,
}

export const getInvestorEligibilitySubsectionIds = (companyStage: GrowthStage) => {
  switch (companyStage) {
    case GrowthStage.Established:
    case GrowthStage.Expansion:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.ESTABLISHED_EXPANSION
    case GrowthStage.Growth:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.GROWTH_STAGE
    case GrowthStage.LiquidationTurnAround:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.LIQUIDATION_TURNAROUND
    case GrowthStage.SeedStartUpIdea:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STARTUP_PRE_REVENUE
    case GrowthStage.StartUpPostRevenues:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STARTUP_POST_REVENUE
    default:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STARTUP_DEFAULT
  }
}

export const loadInvestorEligibilityQuestions = () => {
  const stage = company.currentCompany.growthStage;
  return getInvestorEligibilitySubsectionIds(stage);
}



