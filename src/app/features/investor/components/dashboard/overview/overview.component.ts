import { Component } from '@angular/core';
import {OverviewSectionComponent} from "../../../../../shared/components/overview-section/overview-section.component";
import {CardComponent} from "../../../../../shared/components/card/card.component";
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    OverviewSectionComponent,
    CardComponent,
    ModalComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  visible =true;
  matchedBusinesses =[
    {id: '', name: 'U45638', sector: 'FMCG'},
    {id: '', name: 'U45638', sector: 'Tech'},
    {id: '', name: 'U45638', sector: 'FinTech'},
    {id: '', name: 'U45638', sector: 'AgriFin'},
    {id: '', name: 'U45638', sector: 'FMCG'},
    {id: '', name: 'U45638', sector: 'FMCG'},
  ]

  showDialog(){
    this.visible =true;
  }
}
