import React from 'react';
import {View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {Button, Text} from 'react-native-paper';

import {getPokemons} from '../../../use-cases/pokemons';

export const HomeScreen = () => {
  const {isLoading, data} = useQuery({
    queryKey: ['pokemon'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60, //60 min
  });

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={() => {}}>Press Me</Button>
    </View>
  );
};
