import { Component } from '@angular/core';
import {SharedModule} from "../../../../../shared";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-photo-collage',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './photo-collage.component.html',
  styleUrl: './photo-collage.component.scss'
})
export class PhotoCollageComponent {
  collage =[
    'assets/img/avatar.jpeg', 'assets/img/avatar.jpeg',
    'assets/img/avatar.jpeg', 'assets/img/avatar.jpeg'
  ]
}
