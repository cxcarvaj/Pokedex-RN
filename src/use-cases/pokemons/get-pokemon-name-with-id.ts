import {pokeApi} from '../../config/api/PokeApi';
import {PokeAPIPaginatedResponse} from '../../infrastructure/interfaces/PokeApi.interfaces';

export const getPokemonNamesWithId = async () => {
  const url = 'pokemon?limit=1000';

  const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(url);

  const finalResponse = data.results.map(info => {
    return {
      name: info.name,
      id: Number(info.url.split('/')[6]),
    };
  });

  return finalResponse;
};
