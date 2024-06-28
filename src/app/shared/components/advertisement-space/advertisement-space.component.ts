import {Component, Input} from '@angular/core';
import {SharedModule} from "../../index";

@Component({
  selector: 'app-advertisement-space',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './advertisement-space.component.html',
  styleUrl: './advertisement-space.component.scss'
})
export class AdvertisementSpaceComponent {
  @Input() title!:string;
  @Input() body!:string;
}
