import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { SharedModule } from "../../../../shared";
import { Company } from '../../interfaces';
import { ConfirmationService, FeedbackService } from '../../../../core';
import { CompanyHttpService } from '../../services/company.service';

@Component({
  selector: 'app-organization-card',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterLink],
  templateUrl: './organization-card.component.html',
  styleUrl: './organization-card.component.scss'
})
export class OrganizationCardComponent {

  delete$ = new Observable<unknown>();

  private _confirmationService = inject(ConfirmationService);
  private _companiesService = inject(CompanyHttpService);
  private _feedbackService = inject(FeedbackService);

  @Input() company!: Company;
  @Output() refreshCompaniesEvent: EventEmitter<unknown> = new EventEmitter()

  deleteCompany() {
    this.delete$ =
      this._confirmationService.confirm(`Are you sure you want to delete the company ${this.company.name}?`)
      .pipe(switchMap(res => {
        if (res) {
          return this._companiesService.deleteCompany(this.company.id)
        }
        return EMPTY
      }), tap(res => {
        this.refreshCompaniesEvent.emit();
        this._feedbackService.success('Company deleted successfully')
      }))
  }

}
