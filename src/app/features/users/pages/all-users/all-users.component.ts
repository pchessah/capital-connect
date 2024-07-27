import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminUiContainerComponent } from '../../../admin/components/admin-ui-container/admin-ui-container.component';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, AdminUiContainerComponent],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent {

}
