import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-winnings',
  templateUrl: './winnings.component.html',
  styleUrls: ['./winnings.component.css']
})
export class WinningsComponent implements OnInit {

  constructor(private userService: UserService) { }

  public winnings;
  ngOnInit(): void {
    this.userService.getWinnings()
      .subscribe(
        res => {
          this.winnings = res['products'];
          console.log(this.winnings)
        },
        error => console.log(error)
      )
  }

}
