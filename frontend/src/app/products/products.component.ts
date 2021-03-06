import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { Router } from "@angular/router";
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService, private route: Router, private userService: UserService) { }

  products = [];
  productsArray = [];

  currentDate = new Date();

  winnings;
  ngOnInit() {
    this.productsService.getProducts()
      .subscribe(
        res => {
          this.products = res.products;

          this.productsArray = this.products.map(product => {
            let p = {
              ...product,
              timer: (new Date(product.end_time).getTime() / 1000) - (new Date().getTime() / 1000)
            };
            localStorage.setItem(p._id, JSON.stringify(p));
            return p;

          });
          // this.products = addTimer(product) {

          // }
          // console.log(this.productsArray);
        },
        error => console.log(error)
      )
    this.winnings = this.userService.getWinnings().subscribe(
      res => {
        this.winnings = res['products']
      },
      err => console.log(err)
    )

    console.log(this.currentDate);

  }

  goToProduct(product) {
    this.route.navigate(['product', product._id]);
  }

  // handleEvent(e) {
  //   console.log(e);
  // }

}
