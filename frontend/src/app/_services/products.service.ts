import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../_models/product.Model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsUrl: string = 'http://localhost:8888/api/products/protected/';
  publicProductsUrl: string = 'http://localhost:8888/api/publicproducts';


  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any>(this.productsUrl);
  }
  //////////these function For Admin purpose
  getAllProducts() {
    return this.http.get<ProductModel[]>(this.productsUrl);
  }

  getProductById(id: string) {
    return this.http.get<ProductModel>(this.productsUrl + id);
  }

  addProduct(product: ProductModel) {
    return this.http.post(this.productsUrl, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.productsUrl + id);
  }

  updateProduct(product: ProductModel) {
    return this.http.put(this.productsUrl + product._id, product);
  }

  getAllPublicProducts() {
    return this.http.get<ProductModel[]>(this.publicProductsUrl);
  }

  bid(bid) {
    return this.http.post(this.bidsUrl, bid);
  }

  getLastBid(productId) {
    return this.http.get(this.bidsUrl + '/product/' + productId);
  }



}
