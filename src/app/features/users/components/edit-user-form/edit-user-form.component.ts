import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { User } from '../../models';
import { UsersHttpService } from '../../services/users-http.service';

@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.scss'
})
export class EditUserFormComponent {

  private _fb = inject(FormBuilder);
  private _userService = inject(UsersHttpService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  editUserForm!: FormGroup;

  @Input({required: true}) user!: User

  ngOnChanges(changes: SimpleChanges): void {
   if(changes['user'] && changes['user'].currentValue){
    const user = changes['user'].currentValue;
    this.user = user;
      this.editUserForm = this._fb.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        roles: [user.roles, Validators.required],
        isEmailVerified: [user.isEmailVerified, Validators.required]
      });
   };    
  }

  isTouched(formControlName: string) {
    return this.editUserForm.get(formControlName)?.touched
  }

  isDirty(formControlName: string) {
    return this.editUserForm.get(formControlName)?.dirty
  }

  isValid(formControlName: string) {
    return this.editUserForm.get(formControlName)?.valid
  }

  isTouchedOrDirty(formControlName: string) {
    return (this.isDirty(formControlName) || this.isTouched(formControlName))
  }

  submitForm(){

  }



}
