import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-layout',
  styleUrl: './layout.component.css',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, RouterOutlet],
})
export class LayoutComponent {
  private readonly cartService = inject(CartService);
  readonly cart = this.cartService.cart;
}
