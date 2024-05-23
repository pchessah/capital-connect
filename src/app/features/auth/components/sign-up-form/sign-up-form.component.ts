import { Component, NgModule } from '@angular/core';
import { AuthModule } from '../../modules/auth.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [CommonModule, AuthModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  password_validation_checks =[
    {check: 'Password Strength', value: 'Weak'},
    {check: 'Cannot contain your name or email address'},
    {check: 'At least 8 charatcers'},
    {check: 'Contains a number or a symbol'},
  ]
}
