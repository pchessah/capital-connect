import { Component } from '@angular/core';
import { AuthModule } from '../../modules/auth.module';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [AuthModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss'
})
export class SignInFormComponent {

}
