import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-index-layout',
  standalone: true,
  imports: [],
  templateUrl: './index-layout.component.html',
  styleUrl: './index-layout.component.scss'
})
export class IndexLayoutComponent {
  @Output() nextStep = new EventEmitter<number>();

  setNextStep() {
    this.nextStep.emit(1);
  }
}
