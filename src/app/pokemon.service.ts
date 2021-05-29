import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { ApiClientService } from './api-client.service';
import { Subscription, BehaviorSubject, Observable, of } from 'rxjs';
import { Pokemon } from './pokemon-types';
import { catchError, map, take, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonList = new BehaviorSubject<Pokemon[]>([]);
  private pokemonPicturesCache = new Map<string, string>();
  private genericFreePokeBallFromWikipedia =
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg';
  PokemonList$ = this.pokemonList.asObservable();
  private pokemonsSub = new Subscription();

  constructor(
    private logger: LoggerService,
    private apiClient: ApiClientService
  ) {}

  public init() {
    this.pokemonsSub = this.apiClient.getPokemons().subscribe((response) => {
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

  /**
   * This method will return picture url of specific pokemon, preferably from cache.
   * On error will return default image of generic pokeball.
   * @param {Pokemon} pokemon
   * @return {*}  {Observable<string>}
   * @memberof PokemonService
   */
  fetchPictureForPokemon(pokemon: Pokemon): Observable<string> {
    let cachedImage = this.pokemonPicturesCache.get(pokemon.name);
    if (cachedImage) {
      return of(cachedImage);
    }
    return this.apiClient.getPokemonPicture(pokemon.url).pipe(
      take(1),
      tap((url) => this.pokemonPicturesCache.set(pokemon.name, url)),
      catchError((err: HttpErrorResponse) => {
        this.logger.error(
          `failed fetching picture for ${pokemon.name}, status: ${err.status}`
        );
        return of(this.genericFreePokeBallFromWikipedia);
      })
    );
  }
}
