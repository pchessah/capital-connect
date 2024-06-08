import { Component } from '@angular/core';
import {ProBadgeComponent} from "../pro-badge/pro-badge.component";
import {SharedModule} from "../../../shared/shared.module";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ProBadgeComponent, SharedModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})

export class SidenavComponent {
  show_nav =true;
  toggle_navbar(){
    this.show_nav = !this.show_nav;
  }
}
