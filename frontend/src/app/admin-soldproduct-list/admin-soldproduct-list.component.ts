import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from '../_models/product.Model';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { SoldProductService } from '../_services/sold-product.service';

@Component({
  selector: 'app-admin-soldproduct-list',
  templateUrl: './admin-soldproduct-list.component.html',
  styles: []
})
export class AdminSoldproductListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  products: MatTableDataSource<ProductModel>;
  displayedColumns: string[] = ['name', 'start_time', 'end_time', 'highest_bid'];

  constructor(private productService: SoldProductService, private router: Router, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = new MatTableDataSource(data['products']);
      this.products.sort = this.sort;
      this.products.paginator = this.paginator;
    });
  };

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

}
