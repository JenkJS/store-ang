import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.module';
import { StoreService } from '../../services/store.service';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDrawerContainer,
    MatDrawer,
    FiltersComponent,
    MatDrawerContent,
    ProductsHeaderComponent,
    MatGridList,
    MatGridTile,
    ProductCardComponent,
  ],
})
export class HomeComponent {
  private readonly cartServices = inject(CartService);
  private readonly storeService = inject(StoreService);

  readonly cols = signal(3);
  readonly category = signal<string | undefined>(undefined);
  readonly sort = signal('desc');
  readonly countLimit = signal(12);

  readonly rowHeight = computed(() => ROWS_HEIGHT[this.cols()]);

  private readonly query = computed(() => ({
    limit: this.countLimit(),
    sort: this.sort(),
    category: this.category(),
  }));

  readonly products = toSignal(
    toObservable(this.query).pipe(
      switchMap(({ limit, sort, category }) =>
        this.storeService.getAllProducts(limit, sort, category),
      ),
    ),
    { initialValue: [] },
  );

  onColumnsCountChange(colCount: number): void {
    this.cols.set(colCount);
  }

  onShowCategory(category: string): void {
    this.category.set(category);
  }

  onAddToCart(product: Product): void {
    this.cartServices.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onItemsCountChange(count: number): void {
    this.countLimit.set(count);
  }

  onSortChange(desc: string): void {
    this.sort.set(desc);
  }
}
