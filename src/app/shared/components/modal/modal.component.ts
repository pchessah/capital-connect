import {Component, Input} from '@angular/core';
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    Button,
    DialogModule,
    InputTextModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
    visible =false;

    setVisible() {
      this.visible = true;
    }
}
