import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProtectedGuard } from './_guards/protected.guard';
import { ProductsComponent } from './products/products.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { ProductComponent } from "./product/product.component";
import { PaymentComponent } from "./payments/payment.component";
import { AdminListProductsComponent } from './admin-list-products/admin-list-products.component';
import { AdminEditProductComponent } from './admin-edit-product/admin-edit-product.component';
import { WinningsComponent } from './winnings/winnings.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'productmgmt/add', component: AdminAddProductComponent, canActivate: [ProtectedGuard] },
  { path: 'productmgmt/list', component: AdminListProductsComponent, canActivate: [ProtectedGuard] },
  { path: 'productmgmt/edit', component: AdminEditProductComponent, canActivate: [ProtectedGuard] },
  { path: 'home', redirectTo: '' },
  { path: 'products', component: ProductsComponent,canActivate: [ProtectedGuard] },
  { path: 'product/:id', component: ProductComponent },
  { path: 'payment/:id', component: PaymentComponent ,canActivate: [ProtectedGuard] },
  { path: 'product/:id', component: ProductComponent, canActivate: [ProtectedGuard] },
  { path: 'payment/:id/:amount', component: PaymentComponent, canActivate: [ProtectedGuard] },
  { path: 'winnings', component: WinningsComponent, canActivate: [ProtectedGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
