import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon-types';
import { Subscription } from 'rxjs';
import { LoggerService } from '../logger.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[] = [];
  private pokemonsSub = new Subscription();
  private cartSubscription = new Subscription();

  constructor(
    private pokemonService: PokemonService,
    private logger: LoggerService,
    private cart: CartService
  ) {}

  onPokemonAdded(poke: Pokemon) {
    this.cart.addToCart(poke);
  }

  ngOnDestroy(): void {
    this.pokemonsSub.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.logger.debug('init HomeComponent');
    this.pokemonsSub = this.pokemonService.PokemonList$.subscribe(
      (result) => (this.pokemons = result)
    );
    this.cartSubscription = this.cart.pokemonCart.subscribe((cart) => {
      this.updatePokemonStatus(cart);
    });
  }

  updatePokemonStatus(cart: Pokemon[]) {
    for (let item of cart) {
      let pokemon = this.pokemons.find((p) => p.name === item.name);
      pokemon.inCart = true;
    }
  }

  trackByFunc(index, item: Pokemon) {
    return item.name;
  }
}
