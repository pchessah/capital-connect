import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../../../shared";

@Component({
  selector: 'app-organization-card',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterLink],
  templateUrl: './organization-card.component.html',
  styleUrl: './organization-card.component.scss'
})
export class OrganizationCardComponent {


  @Input() name!: string;
  @Input() id!: number;
  @Output() refreshSectorEvent = new EventEmitter();

}
