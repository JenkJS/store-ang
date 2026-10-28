import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
