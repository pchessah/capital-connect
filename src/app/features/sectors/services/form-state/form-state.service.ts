import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { SectorsService } from '../sectors/sectors.service';
import { Sector, SectorInput, SubSectorInput } from '../../interfaces';
import { FeedbackService } from '../../../../core';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {

  private _sectorsService = inject(SectorsService);
  private _feedbackService = inject(FeedbackService)

  private _sectorFormStateSrc = new BehaviorSubject<SectorInput>(null as any);
  private _sectorFormIsValid = new BehaviorSubject<boolean>(false);

  private _subsectorFormStateSrc = new BehaviorSubject<SubSectorInput>(null as any);
  private _subsectorFormIsValid = new BehaviorSubject<boolean>(false);

  sectorFormState$ = this._sectorFormStateSrc.asObservable();
  sectorFormIsValid$ = this._sectorFormIsValid.asObservable();

  subsectorFormState$ = this._subsectorFormStateSrc.asObservable();
  subsectorFormIsValid$ = this._subsectorFormIsValid.asObservable();

  setSectorFormState(sectorInput: SectorInput) {
    this._sectorFormStateSrc.next(sectorInput);
  }

  setSectorFormIsValid(sectionIsValid: boolean) {
    this._sectorFormIsValid.next(sectionIsValid);
  }

  createSector() {
    const sectorInput: SectorInput = this._sectorFormStateSrc.value;
    return this._sectorsService.createSector(sectorInput).pipe(tap(res => {
      this._feedbackService.success('Sector added successfully');
    }));
  }

  updateSector(sectionId: number) {
    const sectorInput: Sector = { ...this._sectorFormStateSrc.value, id: sectionId };
    return this._sectorsService.updateSector(sectorInput)
  }

  setSubsectionForm(val: SubSectorInput) {
    this._subsectorFormStateSrc.next(val);
  }

  setSubSectionFormIsValid(val: boolean) {
    this._subsectorFormIsValid.next(val);
  }

  createSubsector(sectorId: number) {
    if (!sectorId) {
      this._feedbackService.error('Could not find section');
      throw new Error("Could not find section");

    };
    const input: SubSectorInput = { ...this._subsectorFormStateSrc.value, sectorId: sectorId }
    return this._sectorsService.createSubSector(input).pipe(tap(res => {
      this._feedbackService.success('SubSection added successfully');
    }))
  }

  updateSubSector(sectorId: number, subsectorId: number) {
    if (!sectorId) {
      this._feedbackService.error('Could not find section');
      throw new Error("Could not find section");

    };
    const input = { ...this._subsectorFormStateSrc.value, sectorId: sectorId, id: subsectorId }
    return this._sectorsService.updateSubSector(input).pipe(tap(res => {
      this._feedbackService.success('SubSection added successfully');
    }))
  }

  getCurrentSubSectorBeingEdited(id:number) {
    return this._sectorsService.getSingleSubsector(id)
  }


}
