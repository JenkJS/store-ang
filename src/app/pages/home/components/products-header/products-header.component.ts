import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatCard, MatButton, MatMenuTrigger, MatIcon, MatMenu, MatMenuItem],
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();

  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'desc';
  itemsShowCount = 12;

  constructor() {}
  ngOnInit() {}
  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }
  onItemsUpdated(newCount: number): void {
    this.itemsShowCount = newCount;
    this.itemsCountChange.emit(newCount);
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
