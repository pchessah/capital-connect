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
          title: 'Investor Matchmaking',
          body: 'We will connect you with the investor who match your criteria',
        }
      ]
  }
}
