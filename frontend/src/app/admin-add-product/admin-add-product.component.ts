import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder, FormGroupExtension, RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styles: []
})
export class AdminAddProductComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  error: string;
  message: string;
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private productsService: ProductsService) {
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      images: this.formBuilder.array([this.initItemRows()])
    });
  }

  initItemRows() {
    return this.formBuilder.group({
      imageUrl: ['', Validators.required]
    });
  }

  get formArr() {
    return this.addForm.get('images') as FormArray;
  }

  onAddImage() {
    this.formArr.push(this.initItemRows());
  }

  onDeleteImage(index: number) {
    this.formArr.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.loading = true;

    if (this.addForm.valid) {
      this.productsService.addProduct(this.addForm.value)
        .subscribe(data => {
          if (data['success'] === 1) {
            this.message = data['msg'];
            this.addForm.reset();
            this.addForm.markAsPristine();
            this.addForm.markAsUntouched;


          }
          else {
            this.error = data['msg'];
          }
          this.loading = false;

        });
    }
  }

  get f() { return this.addForm.controls; }

  reset() {
    //this.router.navigate(['productmgmt', 'add']);
    // console.log('reset');
    this.addForm.reset();
    // this.addForm.markAsPristine();
    // this.addForm.markAsUntouched();
    //this.addForm.updateValueAndValidity();
    //Object.keys(this.addForm.controls).forEach(key => {
    //this.addForm.get(key).setErrors(null, { emitEvent: true });
    //this.addForm.get(key).updateValueAndValidity();
    //});

    // setTimeout(() => {
    //   this.addForm = this.formBuilder.group({
    //     name: ['', Validators.required],
    //     description: ['', Validators.required],
    //     start_time: ['', Validators.required],
    //     end_time: ['', Validators.required],
    //     images: this.formBuilder.array([this.initItemRows()])
    //   });
    // }, 0);
   // (<FormGroupExtension>this.addForm).resetForm()


  }
}
