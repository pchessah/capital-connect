import { Component } from '@angular/core';
import {MainComponent} from "../../../business/components/dashboard/main/main.component";
import {SidenavComponent} from "../../../../core";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MainComponent,
    SidenavComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
