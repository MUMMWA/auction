import { Component, OnInit } from '@angular/core';
import {StripeScriptTag, StripeSource} from "stripe-angular";
import { StripeToken } from "stripe-angular"

@Component({
  selector: 'app-payment',
  template: `
    <div *ngIf="invalidError" style="color:red">
      {{ invalidError.message }}
    </div>

    <stripe-card
      #stripeCard
      (catch) = "onStripeError($event)"
      [(invalid)] = "invalidError"
      (tokenChange) = "setStripeToken($event)"
      (sourceChange) = "setStripeSource($event)"
    ></stripe-card>

    <button type="button" (click)="stripeCard.createToken(extraData)">createToken</button>
  `,
  styles: []
})
export class PaymentComponent implements OnInit {

  private publishableKey:string = "pk_test_JZ2Al6GkGyQgA4sR27j92QEV00XmIe99ZC";

  constructor(public StripeScriptTag:StripeScriptTag) {
    this.StripeScriptTag.setPublishableKey( this.publishableKey );
  }

  extraData = {
    "name": "james Alituhikya",
    "address_city": "Fairfield",
    "address_line1": "Fairfield",
    "address_line2": "Fairfield",
    "address_state": "Iowa",
    "address_zip": "52251"
  };
  invalidError = undefined;

  ngOnInit() {
  }

  onStripeInvalid( error:Error ){
    console.log('Validation Error', error);
    this.invalidError = {message:error};
  }

  setStripeToken( token:StripeToken ){
    console.log('Stripe token', token)
  }

  setStripeSource( source:StripeSource ){
    console.log('Stripe source', source)
  }

  onStripeError( error:Error ){
    console.error('Stripe error ',error);
    this.invalidError = {message:error};
  }

}
