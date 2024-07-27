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
    { label: 'Sections', href: '/questions', exact: true, icon: 'grid_view' },
    { label: 'Companies', href: '/business', exact: true, icon: 'store' },
    { label: 'Sectors', href: '/sectors', exact: false, icon: 'group_work' }
  ]

  @Input({ required: true}) title = 'Dashboard';
  

}
