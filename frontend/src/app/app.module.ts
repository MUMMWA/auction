import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Module as StripeModule } from "stripe-angular"

// Third party
import { CountdownModule } from 'ngx-countdown';
import { AngularMaterialModule } from './material-module';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_interceptors/jwt.interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { AuthenticationService } from './_services/authentication.service';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './_services/products.service';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TrimPipe } from './_pipes/trim.pipe';
import {ProductComponent} from "./product/product.component";
import {ProductModule} from "./product/product.module";
import {Stripe} from "stripe-angular";
import {PaymentModule} from "./payments/payment.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProductsComponent,
    AdminAddProductComponent,
    TrimPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CountdownModule,
    ProductModule,
    StripeModule.forRoot(),
    PaymentModule,
    FormsModule


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, AuthenticationService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
