import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedModule } from "../../../shared";
import { AuthStateService } from '../../../features/auth/services/auth-state.service';
import { CompanyStateService } from '../../../features/organization/services/company-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private _authService = inject(AuthStateService);
  private _companyStateService = inject(CompanyStateService);

  businessName = this._companyStateService.currentCompany?.name
  businessLogoUrl = this._companyStateService.currentCompany?.companyLogo?.path ?? 'assets/img/avatar.jpeg';

  logOut$ = new Observable<boolean>();

  @Input({ transform: booleanAttribute }) onDashboard: boolean = false;
  @Input() isAdmin = false;

  drawerShowing = false;
  toggleDrawer() {
    this.drawerShowing = !this.drawerShowing;
  }

  logOut() {
    this.logOut$ = this._authService.logout()
  }
}
