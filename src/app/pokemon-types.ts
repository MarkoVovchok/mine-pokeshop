export class PokemonsResponse {
  results: Pokemon[];
}

export interface SinglePokemonResponse {
  id: number;
  sprites: PokemonSprites;
  name: string;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny?: string;
}

export class Pokemon {
  name: string;
  url?: string;
  pic?: string;
  inCart?: boolean;
}
