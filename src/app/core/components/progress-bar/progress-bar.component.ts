import {Component, Input} from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon
  ],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})


export class ProgressBarComponent {
  @Input() current_step =0; // used number instead of enums for dynamic classes assignment using indexes range[0-2]
  @Input() steps!: {name: string}[];

}
