import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  products = []
  productsArray = []
  ngOnInit() {
    this.productsService.getProducts()
      .subscribe(
        res => {
          this.products = res.products;
          this.productsArray = this.products.map(product =>
            ({
              ...product,
              timer: (
                new Date(product.end_time).getTime() / 1000) - (new Date().getTime() / 1000)
            })
          );
          console.log(this.productsArray);
        },
        error => console.log(error)
      )

  }



}
