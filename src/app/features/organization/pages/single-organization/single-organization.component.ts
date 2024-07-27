import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CompanyHttpService } from '../../services/company.service';
import { CompanyResponse } from '../../interfaces';
import { SharedModule } from '../../../../shared';
import { AdminUiContainerComponent } from "../../../admin/components/admin-ui-container/admin-ui-container.component";

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

  company$: Observable<CompanyResponse> = this._companiesService.getSingleCompany(this._companyId)



}
