import { Component, ChangeDetectionStrategy, output, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem],
})
export class ProductsHeaderComponent {
  readonly columnsCountChange = output<number>();
  readonly itemsCountChange = output<number>();
  readonly sortChange = output<string>();

  readonly sort = signal('desc');
  readonly itemsShowCount = signal(12);

  onSortUpdated(newSort: string): void {
    this.sort.set(newSort);
    this.sortChange.emit(newSort);
  }
  onItemsUpdated(newCount: number): void {
    this.itemsShowCount.set(newCount);
    this.itemsCountChange.emit(newCount);
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
