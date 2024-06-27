import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { Observable } from 'rxjs';
import { OrganizationOnboardService } from '../../services/organization-onboard.service';
@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {

  private _organizationOnboardService = inject(OrganizationOnboardService);

  upload$ = new Observable();
  previewUrl!: string | ArrayBuffer | null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this._organizationOnboardService.companyLogoToUpload.set(file);
      this._previewFile(file);
    }
  }

  private _previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }


  removeLogo(): void {
    this._organizationOnboardService.companyLogoToUpload.set(null as any)
    this.previewUrl = null as any
  }



}
