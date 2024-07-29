import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { EMPTY, lastValueFrom, Observable, switchMap, tap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';
import { AdminUiContainerComponent } from '../../../admin/components/admin-ui-container/admin-ui-container.component';
import { Role, User } from '../../models';
import { UsersHttpService } from '../../services/users-http.service';
import { ConfirmationService, FeedbackService } from '../../../../core';
import { CompanyHttpService } from '../../../organization/services/company.service';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, AdminUiContainerComponent, TableModule, FormsModule, ButtonModule, InputTextModule, TooltipModule],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements AfterViewInit {

  private _usersService = inject(UsersHttpService);
  private _router = inject(Router);
  private _confirmationService = inject(ConfirmationService);
  private _companyService = inject(CompanyHttpService);
  private _feedbackService = inject(FeedbackService);

  users$ = new Observable<User[]>();
  delete$ = new Observable();

  users: User[] = [];
  cols: any[] = [
    { field: 'firstName', header: 'First Name' },
    { field: 'lastName', header: 'Last Name' },
    { field: 'roles', header: 'Roles' },
    { field: 'isEmailVerified', header: 'Email Verified' },
    { field: 'actions', header: 'Actions' }
  ];

  @ViewChild('dt') table!: Table;

  ngAfterViewInit(): void {
    this._initUsers();
  }

  private _initUsers() {
    this.users$ = this._usersService.getAllUsers().pipe(
      tap(users => {
        this.users = users;
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(filterValue, 'contains');
  }

  editUser(user: User) {
    this._router.navigateByUrl(`/users/edit/${user.id}`);
  }

  deleteUser(user: User) {
    this.delete$ =
      this._confirmationService.confirm(`Are you sure you want to delete ${user.username}`).pipe(switchMap(res => {
        if (res) return this._usersService.deletUser(user.id)

        return EMPTY

      }), tap(() => this._initUsers()));
  }

  viewUser(user: User) {
    if(user.roles === Role.USER) {
      lastValueFrom(this._companyService.getCompanyOfUser(user.id).pipe(tap(company => {
        if (company) {
          this._router.navigateByUrl(`/organization/${company.id}`)
        } else {
          this._feedbackService.info(`User ${user.username} does not have a company`)
        }
      })))
    } else {
      this._feedbackService.info(`User ${user.username} does not have a company`)
    }
  }
}
