import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../../carousel/carousel.component';
import { LogInFormComponent } from '../../../auth/components/log-in-form/log-in-form.component';
import { SignUpFormComponent } from '../../../auth/components/sign-up-form/sign-up-form.component';

enum FORMS { SIGNUP, SIGNIN }

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent, LogInFormComponent, CarouselComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent {
  forms =FORMS
  active_form =this.forms.SIGNUP;
  seSignup(){this.active_form =this.forms.SIGNUP};
  seSignin(){this.active_form =this.forms.SIGNIN};
}
