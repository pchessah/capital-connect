import { Component, inject } from '@angular/core';
import { AuthStateService } from "../../../../auth/services/auth-state.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
@Component({
  selector: 'app-success-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-screen.component.html',
  styleUrl: './success-screen.component.scss'
})
export class SuccessScreenComponent {

  private _router = inject(Router);
  private _authStateService = inject(AuthStateService);

  goDashboard() {
    this._router.navigateByUrl('/investor');
  }
}
