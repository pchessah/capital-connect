import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-task-action',
  standalone: true,
  imports: [
    MatIcon, CommonModule
  ],
  templateUrl: './task-action.component.html',
  styleUrl: './task-action.component.scss'
})
export class TaskActionComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() actions!: {name: string, action?: Function | string}[];
}
