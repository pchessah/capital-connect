import { Component } from '@angular/core';
import { CarouselConfig, CarouselModule } from 'ng-carousel-cdk';

interface ICarouselItem{
  title: string,
  body: string,
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  config: CarouselConfig<ICarouselItem> ={
      items: [
        {
          title: 'Capital Raising Eligibility',
          body: 'We will advise you on how eligible and prepared you are for capital Raising',
        },
        {
          title: 'Investor Match Making',
          body: 'We will connect you with the right investor',
        },
        {
          title: 'Capital Raising Advisory',
          body: 'We will support and advise you in your transactions',
        },
        {
          title: 'Deal Flow for Investors',
          body: 'We will provide you with a quality deal pipeline',
        },
      ]
  }
}
