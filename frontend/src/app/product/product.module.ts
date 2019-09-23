import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {TrimPipe} from "../_pipes/trim.pipe";
import {AngularMaterialModule} from "../material-module";
import {CountdownModule} from "ngx-countdown";



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CountdownModule
  ]
})
export class ProductModule { }
