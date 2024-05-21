import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../shared/angular-material.module';


@NgModule({
  imports: [FormsModule, AngularMaterialModule],
  exports: [FormsModule, AngularMaterialModule],
  declarations: [],
  providers: [],
})
export class AuthModule { }
