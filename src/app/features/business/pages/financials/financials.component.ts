import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../core/navbar/navbar.component';
import { IndexComponent } from '../../components/index/index.component';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [NavbarComponent, IndexComponent],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.scss'
})
export class FinancialsComponent {

}
