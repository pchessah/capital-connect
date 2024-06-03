import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsComponent } from '../../components/steps/steps.component';
import { IndexComponent } from '../../components/index/index.component';
import { NavbarComponent } from '../../../../core/navbar/navbar.component';
import { SuccessScreenComponent } from '../../components/success-screen/success-screen.component';

@Component({
  standalone: true,
  selector: 'app-financials',
  styleUrl: './financials.component.scss',
  templateUrl: './financials.component.html',
  imports: [CommonModule, NavbarComponent, IndexComponent, StepsComponent, SuccessScreenComponent],
})

export class FinancialsComponent {
  steps =3;
  current_step =1;

  setNextStep(step =1){
    if ((step <0 && this.current_step ==1) || (step >0 && this.current_step >=this.steps)) return;
    this.current_step +=step;

  }
}
