import {booleanAttribute, Component, Input} from '@angular/core';
import {ProBadgeComponent} from "../pro-badge/pro-badge.component";
import {SharedModule} from "../../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {NavbarToggleService} from "../../services/navbar.toggle.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [ProBadgeComponent, SharedModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})

export class SidenavComponent {
  isHidden: boolean | undefined;
  show_nav =true;
  constructor(private toggleService: NavbarToggleService) {}
  sideNavIsHidden$ =this.toggleService.navBarIsHidden$.pipe(tap(state =>{
    this.isHidden =state;
  }));

  toggle_navbar(){
    this.show_nav = !this.show_nav;
  }

  hide_navbar(){
    this.toggleService.toggleVisibility();
    this.sideNavIsHidden$ =this.toggleService.navBarIsHidden$.pipe(tap(state =>{
      this.isHidden =state;
    }));
  }
}
