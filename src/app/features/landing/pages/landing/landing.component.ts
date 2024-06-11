import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../../carousel/carousel.component';
import { LogInFormComponent } from '../../../auth/components/log-in-form/log-in-form.component';
import { SignUpFormComponent } from '../../../auth/components/sign-up-form/sign-up-form.component';
import { FORM_TYPE } from '../../../auth/interfaces/auth.interface';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent, LogInFormComponent, CarouselComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent {
  forms = FORM_TYPE;
  active_form = this.forms.SIGNUP;

  setSignup() { this.active_form = this.forms.SIGNUP };
  setSignin() { this.active_form = this.forms.SIGNIN };

}
