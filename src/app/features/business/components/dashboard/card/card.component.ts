import {Component, Input} from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../../../../shared/shared.module";

type DETAIL_TYPE ={
  title: string,
  value: string,
  period?: string,
  featured: boolean,
}

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
