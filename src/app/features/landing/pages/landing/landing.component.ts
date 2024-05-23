import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../../carousel/carousel.component';
import { LogInFormComponent } from '../../../auth/components/log-in-form/log-in-form.component';
import { SignInFormComponent } from '../../../auth/components/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, SignInFormComponent, LogInFormComponent, CarouselComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
