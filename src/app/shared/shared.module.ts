import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { RoleDirective } from './directives/role.directive';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [RoleDirective],
  imports: [CommonModule, AngularMaterialModule,MatDialogModule,],
  exports: [AngularMaterialModule, RoleDirective]
})
export class SharedModule { }
