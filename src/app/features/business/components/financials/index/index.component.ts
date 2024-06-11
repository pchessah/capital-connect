import { Component, inject } from '@angular/core';
import { BusinessPageService } from '../../../services/business-page/business.page.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  private _pageService: BusinessPageService = inject(BusinessPageService);

  setNextScreen() {
    this._pageService.setCurrentPage(2);
  }

}
