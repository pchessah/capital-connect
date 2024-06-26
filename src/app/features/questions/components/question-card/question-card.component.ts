import {Component, Input} from '@angular/core';
import {Answer} from "../../interfaces";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss'
})
export class QuestionCardComponent {
  @Input() text!: string;
  @Input() id!: number;
  @Input() type!: string;
  @Input() answers: Answer[] =[]
}