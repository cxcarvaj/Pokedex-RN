import {pokeApi} from '../../config/api/PokeApi';
import type {Pokemon} from '../../domain/entities/Pokemon';
import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/PokeApi.interfaces';
import {PokemonMapper} from '../../infrastructure/mappers/Pokemon.mapper';

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = '/pokemon';

    const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url, {
      params: {
        limit,
        offset: page * 10,
      },
    });

    const pokemonPromises = data.results.map(info => {
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });

    const pokeApiPokemons = await Promise.all(pokemonPromises);

    const pokemonsPromises = pokeApiPokemons.map(item =>
      PokemonMapper.pokeApiPokemonToEntity(item.data),
    );

    return await Promise.all(pokemonsPromises);
  } catch (error) {
    throw new Error('Error getting pokemons');
  }
};
