import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbar,
    RouterLink,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatBadge,
    MatMenu,
    CurrencyPipe,
  ],
})
export class HeaderComponent {
  private readonly cartService: CartService = inject(CartService);

  readonly cart = this.cartService.cart
  readonly itemsQuantity = this.cartService.itemsQuantity;
  readonly total = this.cartService.total;

  onClearCart(): void {
    this.cartService.onClearCart();
  }
}
