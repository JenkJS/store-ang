import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatToolbar,
    RouterLink,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatBadge,
    MatMenu,
    NgIf,
    NgFor,
    CurrencyPipe,
  ],
})
export class HeaderComponent {
  private _cart: Cart = {
    items: [],
  };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private cartService: CartService) {}

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(): void {
    return this.cartService.onClearCart();
  }
}
