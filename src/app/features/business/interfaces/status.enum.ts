export enum STEP_STATUS {
  COMPLETE ='complete',
  INCOMPLETE = 'incomplete',
}

export type STEP_TYPE ={
  title: string,
  status: STEP_STATUS,
}
