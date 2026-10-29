import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatFooterCellDef,
  MatFooterCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatFooterRowDef,
  MatFooterRow,
} from '@angular/material/table';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatFooterCellDef,
    MatFooterCell,
    MatButton,
    RouterLink,
    MatIconButton,
    MatIcon,
    MatMiniFabButton,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatFooterRowDef,
    MatFooterRow,
    CurrencyPipe,
  ],
})
export class CartComponent {
  private readonly cartService: CartService = inject(CartService);
  private readonly checkoutService = inject(CheckoutService);
  readonly cart = this.cartService.cart;
  readonly dataSource = computed(() => this.cart().items);
  readonly total = computed(() => this.cartService.getTotal(this.cart().items));
  readonly displayedColumns = ['product', 'name', 'price', 'quantity', 'total', 'action'];

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
    await this.checkoutService.checkout(this.cart().items);
  }
}
