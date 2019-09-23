import { Component, ViewEncapsulation } from '@angular/core';
import {
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment-c',
  template: `
    <div class="container"> 
    <form #checkout="ngForm" (ngSubmit)="onSubmit(checkout)" class="checkout mt-100">
      <div class="form-row">
        <label for="card-info">Card Info</label>
        <div id="card-info" #cardInfo></div>

        <div id="card-errors" role="alert" *ngIf="error">{{ error }}</div>
      </div>

      <button type="submit">Pay $777</button>
    </form>
    </div>
  `,
  styleUrls: ['./payment.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PaymentComponent implements AfterViewInit, OnDestroy {
  @ViewChild("cardInfo", { static: true }) cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
    }
  }
}
