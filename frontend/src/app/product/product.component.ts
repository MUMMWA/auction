import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

   product :any = {};
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.product = JSON.parse(localStorage.getItem(params['id']));
      console.log("product",this.product);
    });
  }

  goToPayment(){
   this.router.navigate(['payment']);
  }

}
