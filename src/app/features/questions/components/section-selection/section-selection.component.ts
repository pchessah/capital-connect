import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-selection',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './section-selection.component.html',
  styleUrl: './section-selection.component.scss'
})
export class SectionSelectionComponent {
  @Output() selectedSection = new EventEmitter<string>();
  sections: string[] = ['Section 1', 'Section 2']; // Example sections, replace with your data

  onSectionChange(event: any) {
    this.selectedSection.emit(event.value);
  }

}
