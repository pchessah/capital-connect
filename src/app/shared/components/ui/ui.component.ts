import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-ui-shared',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss'
})
export class UiSharedComponent {
  @Input({ required: true }) title: string | undefined;
}
