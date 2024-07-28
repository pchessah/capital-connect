import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { EditUserFormComponent } from "../../components/edit-user-form/edit-user-form.component";
import { UsersHttpService } from '../../services/users-http.service';
import { AdminUiContainerComponent } from "../../../admin/components/admin-ui-container/admin-ui-container.component";

@Component({
  selector: 'app-single-user',
  standalone: true,
  imports: [EditUserFormComponent, CommonModule, AdminUiContainerComponent],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.scss'
})
export class SingleUserComponent {

  private _activatedRoute = inject(ActivatedRoute)
  private _userService = inject(UsersHttpService)

  user$ = this._activatedRoute.params.pipe(switchMap(res => {
    const userId = (res as { id: string}).id
    return this._userService.getUserById(Number(userId))
  }))

}
