import { Component } from '@angular/core';
import {SidenavComponent} from "../../../../core";
import {InvestorProfileComponent} from "../../components/InvestorProfile/investor-profile.component";


@Component({
  selector: 'app-investor',
  standalone: true,
  imports: [
    SidenavComponent,
    InvestorProfileComponent
],
  templateUrl: './InvestorProfile.component.html',
  styleUrl: './InvestorProfile.component.scss'
})
export class InvestorProfile {
    links =[
      {label: 'Dashboard', href: '/investor', exact: true, icon: 'grid_view'},
      {label: 'Investor Profile', href: '/investor/profile', exact: true, icon: 'person'}
    ]
}
