import {booleanAttribute, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input({transform: booleanAttribute}) on_dashboard =false;
  drawer_showing =false;
  toggleDrawer(){ this.drawer_showing =!this.drawer_showing; }
}
