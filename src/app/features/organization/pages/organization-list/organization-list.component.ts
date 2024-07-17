import { Component } from '@angular/core';
import { UiSharedComponent } from '../../../../shared/components/ui/ui.component';
import { SharedModule } from '../../../../shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [UiSharedComponent, SharedModule, CommonModule],
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.scss'
})
export class OrganizationListComponent {

}
