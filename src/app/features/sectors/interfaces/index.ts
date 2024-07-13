export interface SectorInput {
  name: string;
  description: string;
}

export interface SubSectorInput {
  name: string;
  description: string;
  sectorId: number;
}


export interface Sector {
  id: number;
  name: string;
  description: string;
}


export interface SubSector {
  id: number;
  name: string;
  description: string;
  sectorId?: number;
  sector?: { id: number }
}


