import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { RoleDirective } from './directives/role.directive';

@NgModule({
  declarations: [RoleDirective],
  imports: [CommonModule, AngularMaterialModule, ],
  exports: [AngularMaterialModule, RoleDirective]
})
export class SharedModule { }
