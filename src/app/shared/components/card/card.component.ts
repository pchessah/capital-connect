import {Component, Input} from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../index";
import {DETAIL_TYPE} from "../../../features/business/interfaces/detail.type";



@Component({
  selector: 'app-card',
  standalone: true,
    imports: [CommonModule, SharedModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() detail: DETAIL_TYPE | undefined;
}
