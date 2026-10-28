import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { Subscription } from 'rxjs';
import { NgIf, NgFor, UpperCasePipe } from '@angular/common';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatSelectionList, MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NgIf,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatSelectionList,
    NgFor,
    MatListOption,
    UpperCasePipe,
  ],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories: Array<string> | undefined;
  constructor(private storeService: StoreService) {}
  ngOnInit() {
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy() {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
