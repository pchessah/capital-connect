import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, inject, Input } from '@angular/core';
import { SharedModule } from "../../../shared";
import { Observable } from 'rxjs';
import { AuthStateService } from '../../../features/auth/services/auth-state.service';
import { CompanyStateService } from '../../../features/organization/services/company-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private _authService = inject(AuthStateService);
  private _companyStateService = inject(CompanyStateService);

  businessName = this._companyStateService.currentCompany?.name

  logOut$ = new Observable<boolean>();

  @Input({ transform: booleanAttribute }) on_dashboard: boolean = false;
  
  drawer_showing = false;
  toggleDrawer() { 
    this.drawer_showing = !this.drawer_showing; 
  }

  logOut() {
    this.logOut$ = this._authService.logout()

  }
}
