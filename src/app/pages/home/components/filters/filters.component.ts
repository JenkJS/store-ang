import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { UpperCasePipe } from '@angular/common';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatSelectionList,
    MatListOption,
    UpperCasePipe,
  ],
})
export class FiltersComponent {
  readonly showCategory = output<string>();

  private readonly storeService: StoreService = inject(StoreService);

  readonly categories = toSignal(this.storeService.getAllCategories(), { initialValue: [] });
  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
