import {CompanyStateService} from "../../../features/organization/services/company-state.service";
import {GrowthStage} from "../../../features/organization/interfaces";

const company =new CompanyStateService()


export const INVESTOR_ONBOARDING_SUBSECTION_IDS = {
  ID: 7,
  LANDING: 21,
  STEP_ONE: 22,
  STEP_TWO: 24,
  STEP_THREE: 25,
}
export const INVESTOR_ELIGIBILITY_SUBSECTION_IDS ={

  ESTABLISHED_EXPANSION: {
    ID: 10,
    LANDING: null as unknown as number,
    STEP_ONE: 67,
    STEP_TWO: 68,
    STEP_THREE: 69,
  },

  LIQUIDATION_TURNAROUND:{
    ID: 11,
    LANDING: null as unknown as number,
    STEP_ONE: 133,
    STEP_TWO: 136,
    STEP_THREE: 137,
  },

  STARTUP: {
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

export const INVESTOR_PREPAREDNESS_SUBSECTION_IDS ={
  ID: 4,
  LANDING: 6,
  STEP_ONE: 16,
  STEP_TWO: 17,
  STEP_THREE: 18,
}

export const BUSINESS_FINANCIALS_SUBSECTION_IDS ={
  ID: 5,
  LANDING: 11,
  STEP_ONE: 12,
  STEP_TWO: 14,
  STEP_THREE: 13,
}

export const getInvestorEligibilitySubsectionIds =(companyStage:GrowthStage) =>{
  switch (companyStage){
    case GrowthStage.Established:
    case GrowthStage.Expansion:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.ESTABLISHED_EXPANSION
    case GrowthStage.Growth:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.GROWTH_STAGE
    case GrowthStage.LiquidationTurnAround:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.LIQUIDATION_TURNAROUND
    case GrowthStage.SeedStartUpIdea:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STARTUP
    case GrowthStage.StartUpPostRevenues:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STARTUP
    default:
      return INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STARTUP
  }
}



export const loadInvestorEligibilityQuestions =() =>{
  const stage =company.currentCompany.growthStage;
  return getInvestorEligibilitySubsectionIds(stage);
}


export interface ISCORE {
  percentageScore: number, score: number, targetScore: number
}
