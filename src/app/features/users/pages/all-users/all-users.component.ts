import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { AdminUiContainerComponent } from '../../../admin/components/admin-ui-container/admin-ui-container.component';
import { User } from '../../models';
import { UsersHttpService } from '../../services/users-http.service';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, AdminUiContainerComponent, TableModule, FormsModule, ButtonModule, InputTextModule, TooltipModule],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements AfterViewInit {

  private _usersService = inject(UsersHttpService);

  users: User[] = [];
  users$ = new Observable<User[]>();
  cols: any[] = [
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'roles', header: 'Roles' },
    { field: 'isEmailVerified', header: 'Email Verified' },
    { field: 'actions', header: 'Actions' }
  ];

  @ViewChild('dt') table!: Table;

  ngAfterViewInit(): void {
    this.users$ = this._usersService.getAllUsers().pipe(
      tap(users => {
        this.users = users;
      })
    );
    this.users$.subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(filterValue, 'contains');
  }

  editUser(user: User) {
    console.log('Edit user:', user);
  }

  deleteUser(user: User) {
    console.log('Delete user:', user);
  }

  viewUser(user: User) {
    console.log('View user:', user);
  }
}
