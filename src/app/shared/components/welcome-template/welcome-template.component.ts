import { Component } from '@angular/core';
import {CarouselComponent} from "../../../features/carousel/carousel.component";

@Component({
  selector: 'app-welcome-template',
  standalone: true,
    imports: [
        CarouselComponent
    ],
  templateUrl: './welcome-template.component.html',
  styleUrl: './welcome-template.component.scss'
})
export class WelcomeTemplateComponent {

}
