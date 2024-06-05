import { Component, EventEmitter, Output } from '@angular/core';
import { BusinessPageService } from '../../../../../core/business.page.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  @Output() nextStep = new EventEmitter<number>();

  constructor(private pageService: BusinessPageService) {}

  setNextScreen() {
    this.pageService.setCurrentPage(2);
  }

}
