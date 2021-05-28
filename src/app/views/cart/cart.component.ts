import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Pokemon } from 'src/app/pokemon-types';
import { CartService } from 'src/app/services/cart/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  $cart: Observable<Pokemon[]>;
  @ViewChild('clearDialog') clearDialog: TemplateRef<any>;

  constructor(private cartService: CartService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.$cart = this.cartService.pokemonCart;
  }

  private clearCart() {
    this.cartService.clearCart();
  }

  removeFromCart(pok: Pokemon) {
    pok.inCart = false;
    setTimeout(() => {
      this.cartService.removeFromCart(pok);
    }, 500);
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.clearDialog, {
      panelClass: 'cart-dialog-container',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.clearCart();
        }
      });
  }
}
