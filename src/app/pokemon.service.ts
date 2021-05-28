import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { ApiClientService } from './api-client.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Pokemon } from './pokemon-types';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonList = new BehaviorSubject<Pokemon[]>([]);
  PokemonList$ = this.pokemonList.asObservable();
  private pokemonsSub = new Subscription();

  constructor(
    private logger: LoggerService,
    private apiClient: ApiClientService
  ) {}

  public init() {
    this.pokemonsSub = this.apiClient
      .getPokemons()
      .pipe(
        map((data) => {
          data.forEach((pokemon) => {
            this.apiClient
              .getPokemonPicture(pokemon.url)
              .pipe(take(1))
              .subscribe((res) => (pokemon.pic = res));
          });
          return data;
        })
      )
      .subscribe((response) => {
        console.log(response);
        if (response !== undefined) {
          this.pokemonList.next(response);
          this.logger.info(`Got ${response.length} pokemons`);
          this.pokemonsSub.unsubscribe();
        }
      });
  }

  updatePokemonArrayAfterLoad(loadedCart: Pokemon[]) {
    let pokemonArray = this.pokemonList.value;
    for (let pokemon of loadedCart) {
      let index = pokemonArray.findIndex((item) => item.name === pokemon.name);
      if (index !== -1) {
        pokemonArray[index] = pokemon;
      }
    }
    this.pokemonList.next(pokemonArray);
  }
}
