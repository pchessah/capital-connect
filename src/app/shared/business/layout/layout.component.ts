import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
