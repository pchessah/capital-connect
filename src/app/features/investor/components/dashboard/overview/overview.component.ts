import {Component, inject} from '@angular/core';
import {OverviewSectionComponent} from "../../../../../shared/components/overview-section/overview-section.component";
import {CardComponent} from "../../../../../shared/components/card/card.component";
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";
import {CommonModule} from "@angular/common";
import {
  BusinessAndInvestorMatchingService, IMatchedBusiness
} from "../../../../../shared/business/services/busines.and.investor.matching.service";
import {AuthStateService} from "../../../../auth/services/auth-state.service";
import {tap} from "rxjs";

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
  // stats$ =new Observable();
  visible =false;
  private _authService =inject(AuthStateService)
  private _businessMatchingService =inject(BusinessAndInvestorMatchingService)
  matchedBusinesses: IMatchedBusiness[] =[]

  stats$ =this._businessMatchingService.getMatchedBusinesses(this._authService.currentUserId()).pipe(tap(res =>{
    this.matchedBusinesses =res
  }))

  showDialog(){
    this.visible =true;
  }
}
