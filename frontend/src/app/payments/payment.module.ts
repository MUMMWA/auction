import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentService} from "./payment.service";
import {Module} from "stripe-angular";
import {FormsModule} from "@angular/forms";
import {PaymentComponent} from "./payment.component";



@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    Module,
    FormsModule
  ],
  providers:[PaymentService]
})
export class PaymentModule { }
