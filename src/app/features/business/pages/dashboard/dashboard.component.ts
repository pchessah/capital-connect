import { Component } from '@angular/core';
import {MainComponent} from "../../components/dashboard/main/main.component";
import { SidenavComponent } from '../../../../core';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidenavComponent, MainComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  hidden =true;

  toggle_hidden(){
    this.hidden = !this.hidden;
  }
}
