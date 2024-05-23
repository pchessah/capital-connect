import { Component } from '@angular/core';
import { AuthModule } from '../../modules/auth.module';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [AuthModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {

}
