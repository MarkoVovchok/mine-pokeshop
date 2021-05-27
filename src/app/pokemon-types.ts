export class PokemonsResponse {
  results: Pokemon[];
}

export class Pokemon {
  name: string;
  url?: string;
  pic?: string;
  inCart?: boolean;
}
