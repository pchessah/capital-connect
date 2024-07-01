import {Component, inject, Output, EventEmitter} from '@angular/core';
import {OverviewSectionComponent} from "../../../../../shared/components/overview-section/overview-section.component";
import {CardComponent} from "../../../../../shared/components/card/card.component";
import {PhotoCollageComponent} from "../photo-collage/photo-collage.component";
import {BusinessHttpService} from "../../../services/business-http/business.http.service";
import {Observable, tap} from "rxjs";
import {CommonModule} from "@angular/common";
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    OverviewSectionComponent,
    CardComponent,
    PhotoCollageComponent,
    CommonModule,
    ModalComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  visible = false;
  matchedInvestors:number =0;
  private _businessService =inject(BusinessHttpService)

  stats$ =this._businessService.getMatchedInvestors().pipe(tap(res =>{
    this.matchedInvestors =res.count;
  }))

  showDialog(){
    debugger
    this.visible =true;
  }
}
