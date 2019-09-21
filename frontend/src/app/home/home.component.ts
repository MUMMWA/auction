import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../_models/User';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;


  constructor(private authenticationService: AuthenticationService, private router: Router) {

    this.currentUserSubscription = this.authenticationService.currentUser
      .subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
