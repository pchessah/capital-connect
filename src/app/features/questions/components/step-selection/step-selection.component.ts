import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-step-selection',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './step-selection.component.html',
  styleUrl: './step-selection.component.scss'
})
export class StepSelectionComponent {
  @Input() steps: number[] = [];
  @Output() selectedStep = new EventEmitter<number>();

  onStepChange(event: any) {
    this.selectedStep.emit(event.value);
  }

}
