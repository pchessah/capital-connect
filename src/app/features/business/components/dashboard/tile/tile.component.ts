import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  @Input() name: string ='';
  @Input() body: string ='';
  @Input() photo: string ='';
}
