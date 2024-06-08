import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  drawer_showing =false;
  toggleDrawer(){ this.drawer_showing =!this.drawer_showing; }
}
