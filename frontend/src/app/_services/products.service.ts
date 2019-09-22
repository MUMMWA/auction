import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsUrl: string = 'http://localhost:8888/api/products/protected/';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any>(this.productsUrl);
  }
}
