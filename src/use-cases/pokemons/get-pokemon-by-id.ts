import {pokeApi} from '../../config/api/PokeApi';
import type {Pokemon} from '../../domain/entities/Pokemon';
import type {PokeAPIPokemon} from '../../infrastructure/interfaces/PokeApi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/Pokemon.mapper';

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const {data} = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);

    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);

    return pokemon;
  } catch (error) {
    throw new Error(`Error getting the pokemon with id: ${id}`);
  }
};
