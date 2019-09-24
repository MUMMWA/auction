import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { TrimPipe } from "../_pipes/trim.pipe";
import { AngularMaterialModule } from "../material-module";
import { CountdownModule } from "ngx-countdown";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CountdownModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
