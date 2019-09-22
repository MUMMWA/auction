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


  ngOnInit() {
    this.productsService.getProducts()
      .subscribe(
        res => {
          this.products = res.products
          console.log(this.products)
        },
        error => console.log(error)
      )
  }

}
