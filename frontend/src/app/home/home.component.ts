import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../_models/User';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;


  constructor(private productsService: ProductsService, private authenticationService: AuthenticationService, private router: Router) {

    this.currentUserSubscription = this.authenticationService.currentUser
      .subscribe(user => this.currentUser = user);
  }
  products;
  productsArray;
  ngOnInit() {
    this.productsService.getAllPublicProducts()
      .subscribe(
        res => {
          this.products = res.products;
          this.productsArray = this.products.map(product => {
            let p = {
              ...product,
              timer: (
                new Date(product.end_time).getTime() / 1000) - (new Date().getTime() / 1000)
            };
            localStorage.setItem(p._id, JSON.stringify(p));
            return p;

          }
          );
          console.log(this.productsArray);
        },
        error => console.log(error)
      )

  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
