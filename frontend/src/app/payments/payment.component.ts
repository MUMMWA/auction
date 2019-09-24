import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { ProductsService } from "../_services/products.service";
import { ActivatedRoute } from "@angular/router";
import { Location as L } from '@angular/common';

@Component({
  selector: 'app-payment-c',
  template: `
    
    <div class="container"> 
    <h2 class="page-title-c">Increase your Bid</h2>
    <form #checkout="ngForm" (ngSubmit)="onSubmit(checkout)" class="checkout mt-100">
      <div class="form-row">
        <label for="card-info">Card Info</label>
        <div id="card-info" #cardInfo></div>

        <div id="card-errors" role="alert" *ngIf="error">{{ error }}</div>
      </div>

      <button type="submit">Pay $ {{currentBid - lastBid}}</button>
      <img *ngIf="loading" src="../../assets/img/loading.gif" />
    </form>
    </div>
  `,
  styleUrls: ['./payment.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PaymentComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild("cardInfo", { static: true }) cardInfo: ElementRef;
  productId;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  currentBid: number;
  lastBid: number;
  loading = false;

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef, private productService: ProductsService, private _location: L) { }

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
    this.loading = true;
    this.productService.bid({
      productId: this.productId,
      amount: this.currentBid
    }).subscribe(data => {
      this.loading = false;
      if (data['success'] === 1) {
        console.log("bid data ", data);
        this._location.back();

      } else {
        console.log("bid error", data);
        this.error = data['msg'];
      }


    },
      error1 => {
        this.loading = false;
        console.log("bid error", error1);
        this.error = error1;
      },
      () => this.loading = false
    );
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
    }

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.lastBid = params['lastBid'];
      this.currentBid = params['currentBid'];
      //      this.product = JSON.parse(localStorage.getItem(params['id']));
    });

  }
}
