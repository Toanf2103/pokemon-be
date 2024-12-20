import { Pokemon } from '@/database/entities';
export class PokemonResponse extends Pokemon {
  isFavorite: boolean;

  constructor(pokemon: Pokemon, isFavorite: boolean) {
    super(); 
    Object.assign(this, pokemon);
    this.isFavorite = isFavorite;
  }
}
