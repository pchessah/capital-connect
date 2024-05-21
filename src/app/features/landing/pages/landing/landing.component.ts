import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SignInFormComponent } from '../../../auth/components/sign-in-form/sign-in-form.component';
import { LogInFormComponent } from '../../../auth/components/log-in-form/log-in-form.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, SignInFormComponent, LogInFormComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
