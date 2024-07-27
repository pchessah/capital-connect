import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { map } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UiSharedComponent } from '../../../../shared/components/ui/ui.component';
import { SharedModule } from '../../../../shared';
import { CompanyHttpService } from '../../services/company.service';
import { OrganizationCardComponent } from '../../components/organization-card/organization-card.component';
import { AdminUiContainerComponent } from "../../../admin/components/admin-ui-container/admin-ui-container.component";

@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [UiSharedComponent, SharedModule, CommonModule, OrganizationCardComponent, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, FormsModule, AdminUiContainerComponent],
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent {

  private _companiesService = inject(CompanyHttpService);
  companies$ = this._companiesService.getAllCompanies();

  searchString = '';

  search() {
    this.companies$ = this._companiesService.getAllCompanies().pipe(map(res => {
      return res.filter(c => c.name.toLowerCase().includes(this.searchString.toLowerCase()))
    }));
  }

  clearSearch() {
    this.searchString = '';
    this.companies$ = this._companiesService.getAllCompanies();
  }

  checkReset(event: string) {
    if(event.length === 0) this.clearSearch();
  }
}
