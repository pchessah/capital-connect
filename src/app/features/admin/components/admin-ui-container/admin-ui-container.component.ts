import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UiSharedComponent } from '../../../../shared/components/ui/ui.component';
import { NavbarComponent } from '../../../../core';
import { SidenavComponent } from "../../../../core/components/sidenav/sidenav.component";

@Component({
  selector: 'app-admin-ui-container',
  standalone: true,
  imports: [CommonModule, UiSharedComponent, NavbarComponent, SidenavComponent],
  templateUrl: './admin-ui-container.component.html',
  styleUrl: './admin-ui-container.component.scss'
})
export class AdminUiContainerComponent {

  links = [
    { label: 'Sections', href: '/questions', exact: false, icon: 'grid_view' },
    { label: 'Companies', href: '/organization/list', exact: false, icon: 'store' },
    { label: 'Sectors', href: '/sectors', exact: false, icon: 'group_work' },
    { label: 'Users', href: '/users', exact: false, icon: 'supervised_user_circle' },
  ]

  @Input({ required: true}) title = 'Dashboard';
  

}
