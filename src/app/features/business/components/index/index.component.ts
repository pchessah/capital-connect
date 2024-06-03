import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  @Output() nextStep = new EventEmitter<number>();

  setNextStep() {
    this.nextStep.emit(1);
  }

}
