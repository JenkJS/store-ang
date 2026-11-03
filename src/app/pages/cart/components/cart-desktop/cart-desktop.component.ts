import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CartItem } from '../../../../models/cart.model';
import { CurrencyPipe } from '@angular/common';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatFooterCellDef, MatFooterCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatFooterRowDef, MatFooterRow } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-desktop',
  styleUrl: './cart-desktop.component.css',
  templateUrl: './cart-desktop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe,
    RouterLink,
    MatButton,
    MatIconButton,
    MatMiniFabButton,
    MatIcon,
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
  ],
})
export class CartDesktopComponent {
  readonly items = input.required<readonly CartItem[]>();
  readonly total = input.required<number>();

  readonly addQuantity = output<CartItem>();
  readonly removeQuantity = output<CartItem>();
  readonly removeItem = output<CartItem>();
  readonly clearCart = output<void>();
  readonly checkout = output<void>();

  readonly displayedColumns = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
}
