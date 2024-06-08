import { Component } from '@angular/core';
import {NavbarComponent} from "../../../../../core/components/navbar/navbar.component";
import {ProfileStatusComponent} from "../profile-status/profile-status.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, ProfileStatusComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
