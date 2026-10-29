import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Product } from '../../../../models/product.module';
import { NgClass, CurrencyPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, NgClass, MatIcon, CurrencyPipe],
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly fullWidthMode = input(false);
  readonly addToCart = output<Product>();

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }
}
