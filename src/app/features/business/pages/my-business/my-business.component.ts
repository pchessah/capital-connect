import { Component } from '@angular/core';
import {SidenavComponent} from "../../../../core";
import {MainComponent} from "../../components/my-business/main/main.component";

@Component({
  selector: 'app-my-business',
  standalone: true,
  imports: [
    MainComponent,
    SidenavComponent
  ],
  templateUrl: './my-business.component.html',
  styleUrl: './my-business.component.scss'
})
export class MyBusinessComponent {
  links =[
    {label: 'Dashboard', href: '/business', exact: true, icon: 'grid_view'},
    {label: 'My business', href: '/business/my-business', exact: false, icon: 'business_center'}
  ]
}
