import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { LocalStorageKeys } from 'src/app/enums';
import { LoggerService } from 'src/app/logger.service';
import { Pokemon } from 'src/app/pokemon-types';
import { PokemonService } from 'src/app/pokemon.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _pokemonCart: BehaviorSubject<Pokemon[]> = new BehaviorSubject<
    Pokemon[]
  >([]);
  constructor(
    private localStorage: LocalStorageService,
    private auth: AuthService,
    private pokemon: PokemonService,
    private logger: LoggerService
  ) {}

  get pokemonCart() {
    return this._pokemonCart.asObservable();
  }

  clearCart() {
    this._pokemonCart.value.forEach((pokemon) => (pokemon.inCart = false));
    this._pokemonCart.next([]);
    this.saveUsersCartToLocal();
    this.logger.info('Cart cleared');
  }

  addToCart(poke: Pokemon) {
    let cart = this._pokemonCart.value;
    cart.push(poke);
    this._pokemonCart.next(cart);
    this.saveUsersCartToLocal();
  }

  removeFromCart(poke: Pokemon) {
    let cart = this._pokemonCart.value;
    let pokeIndex = cart.findIndex((pokemon) => pokemon.name === poke.name);
    if (pokeIndex !== -1) {
      poke.inCart = false;
      this._pokemonCart.value.splice(pokeIndex, 1);
      this._pokemonCart.next(cart);
    }
    this.saveUsersCartToLocal();
  }

  loadUsersCart() {
    let previousCart = this.localStorage.getFromLocal<Pokemon[]>(
      LocalStorageKeys.Cart
    );
    if (previousCart && previousCart.length > 0) {
      this.clearCart();
      this.pokemon.updatePokemonArrayAfterLoad(previousCart);
      this._pokemonCart.next(previousCart);
      this.logger.info(`Loaded authorized user's cart`);
    }
  }

  saveUsersCartToLocal() {
    this.auth.isLoggedIn$.pipe(take(1)).subscribe((value) => {
      if (value) {
        this.localStorage.saveToLocal(
          LocalStorageKeys.Cart,
          this._pokemonCart.value
        );
      }
    });
  }
}
