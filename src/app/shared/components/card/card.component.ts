import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() onClick!: Function;
  @Input() detail: DETAIL_TYPE | undefined;
  @Output() event = new EventEmitter();

  callback(){
    this.onClick && this.onClick();
    this.event.emit();
  }
}
