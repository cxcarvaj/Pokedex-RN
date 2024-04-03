import React, {useContext} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';

interface PokeBallBgProps {
  style?: StyleProp<ImageStyle>;
}

export const PokeBallBg = ({style}: PokeBallBgProps) => {
  const {isDarkTheme} = useContext(ThemeContext);

  const pokeballImg = isDarkTheme
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  const imgStyle = {width: 300, height: 300, opacity: 0.3};
  return <Image source={pokeballImg} style={[imgStyle, style]} />;
};
