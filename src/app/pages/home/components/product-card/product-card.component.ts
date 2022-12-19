import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product} from "../../../../models/product.module";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined
  @Output() addToCart = new EventEmitter();
  constructor() {}
  ngOnInit() {}

  onAddToCart():void{
    this.addToCart.emit(this.product);
  }
}
