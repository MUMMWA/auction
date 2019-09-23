import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product = {
    name:"TV",
    description:"a tv",
    timer:null,
    images:[]
  };
  constructor() { }

  ngOnInit() {
  }

}
