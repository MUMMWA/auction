import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from '../_models/product.Model';
import { ProductsService } from '../_services/products.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-list-products',
  templateUrl: './admin-list-products.component.html',
  styles: []
})
export class AdminListProductsComponent implements OnInit {

  products: MatTableDataSource<ProductModel>;

  displayedColumns: string[] = ['name', 'start_time', 'end_time', 'description'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data['products'];
    });
  };

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }


  addProduct(): void {
    this.router.navigate(['add-product']);
  }

  deleteProduct(product: ProductModel) {

    this.productService.deleteProduct(product._id).subscribe(data => {
      //console.log(data);
      this.getAllProducts();
    });
  }

  updateProduct(product: ProductModel) {
    localStorage.removeItem("productId");
    localStorage.setItem("productId", product._id);
    this.router.navigate(['edit-product']);
  }

}
