import { Component, inject } from '@angular/core';
import { UiSharedComponent } from '../../../../shared/components/ui/ui.component';
import { SharedModule } from '../../../../shared';
import { CommonModule } from '@angular/common';
import { CompanyHttpService } from '../../services/company.service';
import { OrganizationCardComponent } from '../../components/organization-card/organization-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [UiSharedComponent, SharedModule, CommonModule, OrganizationCardComponent, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, FormsModule],
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
}
