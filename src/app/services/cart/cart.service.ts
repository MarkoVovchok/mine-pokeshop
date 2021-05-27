import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/app/pokemon-types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _pokemonCart: BehaviorSubject<Pokemon[]> = new BehaviorSubject<
    Pokemon[]
  >([]);
  constructor() {}
  get pokemonCart() {
    return this._pokemonCart.asObservable();
  }

  clearCart() {
    this._pokemonCart.value.forEach((pokemon) => (pokemon.inCart = false));
    this._pokemonCart.next([]);
  }

  addToCart(poke: Pokemon) {
    let cart = this._pokemonCart.value;
    cart.push(poke);
    this._pokemonCart.next(cart);
  }

  removeFromCart(poke: Pokemon) {
    let cart = this._pokemonCart.value;
    let pokeIndex = cart.findIndex((pokemon) => pokemon.name === poke.name);
    if (pokeIndex !== -1) {
      poke.inCart = false;
      this._pokemonCart.value.splice(pokeIndex, 1);
      this._pokemonCart.next(cart);
    }
  }
}
