import { Component } from '@angular/core';
import {TileComponent} from "../tile/tile.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

}
