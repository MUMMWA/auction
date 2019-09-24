import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../_models/product.Model';

@Injectable({
  providedIn: 'root'
})
export class SoldProductService {

  productsUrl: string = 'http://localhost:8888/api/soldproducts/protected/';

  constructor(private http: HttpClient) { }

   //////////these function For Admin purpose
   getAllProducts() {
    return this.http.get<ProductModel[]>(this.productsUrl);
  }
}
