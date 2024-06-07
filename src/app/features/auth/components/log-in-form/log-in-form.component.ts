import {Component, inject} from '@angular/core';
import { AuthModule } from '../../modules/auth.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-log-in-form',
  standalone: true,
  imports: [CommonModule, AuthModule, FormsModule, ReactiveFormsModule],
  templateUrl: './log-in-form.component.html',
  styleUrl: './log-in-form.component.scss'
})
export class LogInFormComponent {
  private _formBuilder = inject(FormBuilder);

  signInForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  isTouchedOrDirty(formControlName:string){

    const fieldIsTouched =this.signInForm.get(formControlName)?.touched;
    const fieldIsDirty =this.signInForm.get(formControlName)?.dirty;
    return fieldIsTouched || fieldIsDirty;
  }

  isValid(formControlName:string){
    return  this.signInForm.get(formControlName)?.valid;
  }

  submitCredentials(){
    const credentials = this.signInForm.value;
    debugger
  }
}
