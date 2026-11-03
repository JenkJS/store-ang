import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
import { CartDesktopComponent } from './components/cart-desktop/cart-desktop.component';
import { CartMobileComponent } from './components/cart-mobile/cart-mobile.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButton,
    MatCard,
    CartDesktopComponent,
    CartMobileComponent,
  ],
})
export class CartComponent {
  private readonly cartService: CartService = inject(CartService);
  private readonly checkoutService = inject(CheckoutService);

  readonly items = this.cartService.items;
  readonly total = this.cartService.total;
  readonly isEmpty = this.cartService.isEmpty;


  onClearCart(): void {
    this.cartService.onClearCart();
  }

  onRemoveItem(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  async onCheckout(): Promise<void> {
    await this.checkoutService.checkout(this.items());
  }
}
