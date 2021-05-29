import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Pokemon,
  PokemonsResponse,
  SinglePokemonResponse,
} from './pokemon-types';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private maxItems = 30;

  // API Docs: https://pokeapi.co/docs/v2#pokemon

  constructor(private logger: LoggerService, private httpClient: HttpClient) {}

  public getPokemons(): Observable<Pokemon[]> {
    this.logger.info('fetching pokemons');
    return this.httpClient
      .get<PokemonsResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.maxItems}`
      )
      .pipe(map((res) => res.results));
  }

  /**
   * Gets specific pokemon picture URL by getting all the info and parsing the result to only return the url we need;
   *
   * @param {string} url
   * @return {*}  {Observable<string>}
   * @memberof ApiClientService
   */
  getPokemonPicture(url: string): Observable<string> {
    return this.httpClient.get<SinglePokemonResponse>(url).pipe(
      map((res) => {
        this.logger.info(`fetched picture URL for ${res.name}`);
        return res.sprites.front_default;
      })
    );
  }
}
