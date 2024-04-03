import React from 'react';
import {FlatList, View} from 'react-native';
import {globalTheme} from '../../../config/theme/global-theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {Pokemon} from '../../../domain/entities/Pokemon';
import {useQuery} from '@tanstack/react-query';
import {getPokemonNamesWithId} from '../../../use-cases/pokemons';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();

  const {isLoading, data: pokemonNameWithIDList} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder="Search Pokemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={value => console.log(value)}
        value={''}
      />

      <ActivityIndicator style={{paddingTop: 20}} />

      <FlatList
        data={[] as Pokemon[]}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{marginTop: top}}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
