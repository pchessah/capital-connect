import { Component } from '@angular/core';
import {SidenavComponent} from "../../../../core";
import {MainComponent} from "../../components/dashboard/main/main.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidenavComponent,
    MainComponent,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    links =[
      {label: 'Dashboard', href: '/investor', exact: true, icon: 'grid_view'},
      {label: 'Investor Profile', href: '/investor/profile', exact: true, icon: 'person'}

    ]
}
