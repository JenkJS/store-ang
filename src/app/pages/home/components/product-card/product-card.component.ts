import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../../../../models/product.module';
import { NgIf, NgClass, CurrencyPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgIf, MatCard, NgClass, MatIcon, CurrencyPipe],
})
export class ProductCardComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();
  constructor() {}
  ngOnInit() {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
