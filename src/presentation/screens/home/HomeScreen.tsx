import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useQuery} from '@tanstack/react-query';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {getPokemons} from '../../../use-cases/pokemons';
import {PokeBallBg} from '../../components/ui/PokeBallBg';
import {globalTheme} from '../../../config/theme/global-theme';
import {PokemonCard} from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {isLoading, data: pokemons} = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60, //60 min
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeBallBg style={styles.imgPosition} />
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{marginTop: top}}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
