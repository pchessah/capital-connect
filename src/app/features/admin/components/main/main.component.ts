import { Component, inject } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { NavbarComponent, NavbarToggleService } from '../../../../core';
import { SharedModule } from '../../../../shared';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UiSharedComponent } from '../../../../shared/components/ui/ui.component';
import { UiComponent } from "../../../sectors/components/ui/ui.component";


@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [
    NavbarComponent, SharedModule, CommonModule, UiSharedComponent, ButtonModule,
    UiComponent
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  private _toggleService = inject(NavbarToggleService)
  private _router = inject(Router);

  navBarIsHidden$ = this._toggleService.navBarIsHidden$

  visible = true
  navigateTo(path: string) {
    this._router.navigate([path]);
  }
  toggleVisibility() {
    this._toggleService.toggleVisibility();
  }

}
