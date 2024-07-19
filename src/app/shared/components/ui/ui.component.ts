import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-shared',
  standalone: true,
  imports: [],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss'
})
export class UiSharedComponent {
  @Input({ required: true }) title: string | undefined;
}
