import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { CompanyHttpService } from '../../services/company.service';
import { CompanyResponse } from '../../interfaces';
import { SharedModule } from '../../../../shared';
import { AdminUiContainerComponent } from "../../../admin/components/admin-ui-container/admin-ui-container.component";
import { ConfirmationService, FeedbackService } from '../../../../core';

@Component({
  selector: 'app-single-organization',
  standalone: true,
  imports: [CommonModule, SharedModule, AdminUiContainerComponent],
  templateUrl: './single-organization.component.html',
  styleUrl: './single-organization.component.scss'
})
export class SingleOrganizationComponent {

  private _activateRoute = inject(ActivatedRoute);
  private _companiesService = inject(CompanyHttpService);
  private _companyId = Number(this._activateRoute.snapshot.paramMap.get('id'));
  private _confirmationService = inject(ConfirmationService);
  private _feedbackService = inject(FeedbackService);
  private _router = inject(Router);
  
  delete$ = new Observable<unknown>();

  company$: Observable<CompanyResponse> = this._companiesService.getSingleCompany(this._companyId).pipe(tap(c=> this.company = c))
  company!: CompanyResponse;

  deleteCompany() {
    this.delete$ =
      this._confirmationService.confirm(`Are you sure you want to delete the company ${this.company.name}?`)
      .pipe(switchMap(res => {
        if (res) {
          return this._companiesService.deleteCompany(this._companyId)
        }
        return EMPTY
      }), tap(() => {
        this._feedbackService.success('Company deleted successfully')
        this._router.navigateByUrl('/')
      }))
  }

  editCompany(){
    this._router.navigateByUrl(`/organization/setup/${this.company.id}`)
  }


}
