import React, {useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {Pokemon} from '../../../domain/entities/Pokemon';
import {useQuery} from '@tanstack/react-query';
import {
  getPokemonNamesWithId,
  getPokemonsByIds,
} from '../../../use-cases/pokemons';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {useDebounceValue} from '../../hooks/useDebounceValue';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const debounceValue = useDebounceValue(term);

  const {isLoading, data: pokemonNameWithIDList} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(debounceValue))) {
      const pokemons = pokemonNameWithIDList?.find(
        pokemon => pokemon.id === Number(debounceValue),
      );

      return pokemons ? [pokemons] : [];
    }

    if (debounceValue.length === 0) {
      return [];
    }

    if (debounceValue.length < 3) {
      return [];
    }

    return pokemonNameWithIDList?.filter(pokemon =>
      pokemon.name.includes(debounceValue.toLowerCase()),
    );
  }, [pokemonNameWithIDList, debounceValue]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', 'search', pokemonNameIdList],
    queryFn: () =>
      getPokemonsByIds(pokemonNameIdList?.map(pokemon => pokemon.id) ?? []),
    staleTime: 1000 * 60 * 5, //5 min
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Search Pokemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={value => setTerm(value)}
        value={term}
      />

      {isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}} />}

      {/* <Text>{JSON.stringify(pokemonNameIdList, null, 2)}</Text> */}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{marginTop: top}}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 120}} />}
      />
    </View>
  );
};
