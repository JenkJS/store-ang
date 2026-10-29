import { inject, Injectable, signal } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly snackBar = inject(MatSnackBar);

  private readonly cartState = signal<Cart>({
    items: [],
  });

  readonly cart = this.cartState.asReadonly();

  addToCart(item: CartItem): void {
    this.cartState.update((cart) => {
      const itemExists = cart.items.some((currentItem) => currentItem.id === item.id);

      const items = itemExists
        ? cart.items.map((currentItem) =>
            currentItem.id === item.id
              ? {
                  ...currentItem,
                  quantity: currentItem.quantity + 1,
                }
              : currentItem,
          )
        : [...cart.items, { ...item }];

      return { items };
    });

    this.snackBar.open('1 item added to cart', 'OK', { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  removeFromCart(item: CartItem): void {
    this.cartState.update((cart) => ({
      items: cart.items.filter((currentItem) => currentItem.id !== item.id),
    }));

    this.snackBar.open('1 item removed from cart', 'OK', { duration: 3000 });
  }

  removeQuantity(item: CartItem): void {
    this.cartState.update((cart) => ({
      items: cart.items
        .map((currentItem) =>
          currentItem.id === item.id
            ? {
                ...currentItem,
                quantity: currentItem.quantity - 1,
              }
            : currentItem,
        )
        .filter((currentItem) => currentItem.quantity > 0),
    }));

    this.snackBar.open('1 item removed from cart', 'OK', { duration: 3000 });
  }

  onClearCart(): void {
    this.cartState.set({
      items: [],
    });

    this.snackBar.open('Cart is clear', 'OK', { duration: 3000 });
  }
}
