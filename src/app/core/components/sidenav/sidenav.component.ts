import { Component } from '@angular/core';
import {ProBadgeComponent} from "../pro-badge/pro-badge.component";
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ProBadgeComponent, SharedModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}
