import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserFormComponent } from "../../components/edit-user-form/edit-user-form.component";
import { Observable } from 'rxjs';
import { User } from '../../models';

@Component({
  selector: 'app-single-user',
  standalone: true,
  imports: [EditUserFormComponent, CommonModule],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.scss'
})
export class SingleUserComponent {

  user$:Observable<User> = new Observable();

}
