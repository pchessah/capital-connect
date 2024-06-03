import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../core/navbar/navbar.component';
import { IndexComponent } from '../../components/index/index.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [NavbarComponent, IndexComponent, ProgressBarComponent],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.scss'
})
export class FinancialsComponent {

}
