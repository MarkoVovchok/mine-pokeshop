import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/pokemon-types';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  $cart: Observable<Pokemon[]>;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.$cart = this.cartService.pokemonCart;
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
