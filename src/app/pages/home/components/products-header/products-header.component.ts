import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})

export class ProductsHeaderComponent implements OnInit{
  @Output()columnsCountChange = new EventEmitter<number>
  sort = 'desc'
  itemsShowCount = 12;

  constructor() {
  }
  ngOnInit() {
  }
  onSortUpdated(newSort: string): void {
      this.sort = newSort;
  }
  onItemsUpdated(newCount: number): void{
    this.itemsShowCount = newCount
  }

  onColumnsUpdated(colsNum:number):void{
    this.columnsCountChange.emit(colsNum);
  }

}
