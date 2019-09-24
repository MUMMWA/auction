import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../_services/products.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('bid',{static:true}) bid;
   product :any = {};
   productId;
   lastBid: number = 0;
  constructor(private route: ActivatedRoute,private router: Router, private productsService: ProductsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.product = JSON.parse(localStorage.getItem(params['id']));
      this.productsService.getLastBid(this.productId)
        .subscribe((res:any) => {
              console.log("last bid:::",res);
              this.lastBid = res.bid.amount;

              },
          error => console.log("last bid error ",error)
        );

      console.log("product",this.product);
    });
  }

  goToPayment(){
   this.router.navigate(['payment',this.productId, this.bid.nativeElement.value, this.lastBid]);
  }

}
