import { Component } from '@angular/core';
import { AuthModule } from '../../modules/auth.module';

@Component({
  selector: 'app-log-in-form',
  standalone: true,
  imports: [AuthModule],
  templateUrl: './log-in-form.component.html',
  styleUrl: './log-in-form.component.scss'
})
export class LogInFormComponent {

}
