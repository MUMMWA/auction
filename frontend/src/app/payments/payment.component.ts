import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { NgForm } from '@angular/forms';
import {ProductsService} from "../_services/products.service";
import {ActivatedRoute} from "@angular/router";

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

      <button type="submit">Pay $ {{amount}}</button>
    </form>
    </div>
  `,
  styleUrls: ['./payment.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PaymentComponent implements AfterViewInit, OnDestroy,OnInit {
  @ViewChild("cardInfo", { static: true }) cardInfo: ElementRef;
   productId;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  amount: number;

  constructor(private route: ActivatedRoute,private cd: ChangeDetectorRef,private productService: ProductsService) { }

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
    this.productService.bid({
      productId: this.productId,
      amount: 777
    }).subscribe(data => {
      if (data['success'] === 1) {
        console.log("bid data ", data);
        // this.message = data['msg'];
        // this.addForm.reset();
        // this.addForm.pristine;
        // this.addForm.untouched;
        // this.addForm.clearValidators;
      } else {
        console.log("bid error",data);
        this.error = data['msg'];
      }
      // this.loading = false;

    });
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
       this.productService.bid({
         productId: this.productId,
         amount: this.amount
       }).subscribe(data => {
          if (data['success'] === 1) {
            console.log("bid data ", data);
            // this.message = data['msg'];
            // this.addForm.reset();
            // this.addForm.pristine;
            // this.addForm.untouched;
            // this.addForm.clearValidators;
          } else {
            console.log("bid error",data);
            this.error = data['msg'];
          }
          // this.loading = false;

        });
      // ...send the token to the your backend to process the charge
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.amount = params['amount'];
//      this.product = JSON.parse(localStorage.getItem(params['id']));
    });

  }
}
