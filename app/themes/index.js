import baseTheme from './baseTheme';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

const themeIndex = 1;

const themeDictionary = {
  0: baseTheme,
  1: darkTheme,
  2: lightTheme,
};

const currentTheme = themeDictionary[themeIndex];

export default currentTheme;
