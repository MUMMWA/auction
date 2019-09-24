import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-winnings',
  templateUrl: './winnings.component.html',
  styleUrls: ['./winnings.component.css']
})
export class WinningsComponent {

  constructor(private userService: UserService) { }

  winnings;
  ngOnInit(): void {
    this.winnings = this.userService.getWinnings().subscribe(
      res => {
        this.winnings = res['products']
        console.log(this.winnings);

      },
      err => console.log(err)
    )
  }

}
