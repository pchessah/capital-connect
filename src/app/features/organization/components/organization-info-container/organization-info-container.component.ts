import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared';

@Component({
  selector: 'app-organization-info-container',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './organization-info-container.component.html',
  styleUrl: './organization-info-container.component.scss'
})
export class OrganizationInfoContainerComponent {

}
