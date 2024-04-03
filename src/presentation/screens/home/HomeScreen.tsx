import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {FAB, Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {getPokemons} from '../../../use-cases/pokemons';
import {PokeBallBg} from '../../components/ui/PokeBallBg';
import {globalTheme} from '../../../config/theme/global-theme';
import {PokemonCard} from '../../components/pokemons/PokemonCard';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/StackNavigator';

interface HomeScreenProps
  extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {top} = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const theme = useTheme();

  //* This is the regular way to use the useQuery hook

  // const {isLoading, data: pokemons = []} = useQuery({
  //   queryKey: ['pokemon'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60, //60 min
  // });

  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemon', 'infinity'],
    initialPageParam: 0,
    queryFn: async ({pageParam = 0}) => {
      const pokemons = await getPokemons(pageParam);

      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) {
        return undefined;
      }
      return allPages.length;
    },
    staleTime: 1000 * 60 * 60, //60 min
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeBallBg style={styles.imgPosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{marginTop: top}}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        style={[globalTheme.fab, {backgroundColor: theme.colors.primary}]}
        label={'🔍'}
        mode="elevated"
        color={theme.dark ? 'black' : 'white'}
        onPress={() => {
          navigation.push('SearchScreen');
        }}
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
