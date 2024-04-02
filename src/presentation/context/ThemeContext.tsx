import React, {PropsWithChildren, createContext} from 'react';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {PaperProvider, adaptNavigationTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
  isDarkTheme: true,
  theme: LightTheme,
});

export const ThemeContextProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme();

  const isDarkTheme = colorScheme === 'dark';
  const theme = isDarkTheme ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider value={{isDarkTheme, theme}}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
