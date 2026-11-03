import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CartItem } from '../../../../models/cart.model';
import { CurrencyPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    CurrencyPipe,
    RouterLink,
    MatButton,
    MatIconButton,
    MatIcon,],
  selector: 'app-cart-mobile',
  styleUrl: './cart-mobile.component.css',
  templateUrl: './cart-mobile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartMobileComponent {
    readonly items = input.required<readonly CartItem[]>();
  readonly total = input.required<number>();

  readonly addQuantity = output<CartItem>();
  readonly removeQuantity = output<CartItem>();
  readonly removeItem = output<CartItem>();
  readonly clearCart = output<void>();
  readonly checkout = output<void>();
}
