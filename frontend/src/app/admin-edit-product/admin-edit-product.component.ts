import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder, FormGroupExtension, RxwebValidators } from '@rxweb/reactive-form-validators';
import { ProductModel } from '../_models/product.Model';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styles: []
})
export class AdminEditProductComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;
  error: string;
  message: string;
  loading = false;
  product: ProductModel;

  constructor(private formBuilder: FormBuilder, private router: Router, private productsService: ProductsService) {

    this.editForm = this.formBuilder.group({
      _id: [],
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      images: this.formBuilder.array([])
    });
    this.populateEditFormControls();
  }

  populateEditFormControls() {

    let productId = localStorage.getItem("productId");
    if (!productId) {
      alert("Something went wrong!");
      this.router.navigate(['productmgmt', 'list']);
      return;
    }

    this.productsService.getProductById(productId).subscribe(res => {
      //this.editForm.patchValue(res['product']);
      this.editForm = this.formBuilder.group({
        _id: res['product']._id,
        name: [res['product'].name, Validators.required],
        description: [res['product'].description, Validators.required],
        start_time: [res['product'].start_time, Validators.required],
        end_time: [res['product'].end_time, Validators.required],
        images: this.mapToImagesArrayGroup(res['product'].images),
        bids: res['product'].bids,
        highest_bid: res['product'].highest_bid
      });
    });
    // this.productsService.getProductById(productId).toPromise().then(res =>
    //   {
    //     this.editForm.get('name').setValue(res['product'].name);
    //   });
  }
  private mapToImagesArrayGroup(data: object[]): FormArray {
    return this.formBuilder.array(data.map((i) => {
      return this.formBuilder.group(i);
    }));
}

  ngOnInit() {
  }

  initItemRows() {
    return this.formBuilder.group({
      imageUrl: ['', Validators.required]
    });
  }

  get formArr() {
    return this.editForm.get('images') as FormArray;
  }

  onAddImage() {
    this.formArr.push(this.initItemRows());
  }

  onDeleteImage(index: number) {
    this.formArr.removeAt(index);
  }

  get f() { return this.editForm.controls; }

  reset() {
    this.router.navigate(['productmgmt', 'list']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;

    if (this.editForm.valid) {
      this.productsService.updateProduct(this.editForm.value)
        .subscribe(data => {
          if (data['success'] === 1) {
            this.message = data['msg'];
            this.router.navigate(['productmgmt', 'list']);
          }
          else {
            this.error = data['msg'];
          }
          this.loading = false;
        });
    }
  }
}
