import { Component } from '@angular/core';
import { User } from './_models/User';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService, private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  winnings;
  ngOnInit(): void {
    this.winnings = this.userService.getWinnings().subscribe(
      res => {
        this.winnings = res['products']
      },
      err => console.log(err)
    )
  }

}
