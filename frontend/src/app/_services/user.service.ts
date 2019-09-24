import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  bidsUrl: string = 'http://localhost:8888/api/bids';

  register(user: User) {
    return this.http.post(`http://localhost:8888/api/Users/signup`, user);
  }

  findbyemail(email: string) {
    return this.http.post(`http://localhost:8888/api/Users/findbyemail`, { email: email });
  }


  getWinnings() {
    return this.http.get(this.bidsUrl + '/winnings');
  }
}
