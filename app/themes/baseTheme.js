export const baseColors = {
  colorBackground: 'black',
  colorPrimary: 'green',
  colorPrimaryAlt: 'pink',
  colorSecondary: 'blue',
  colorSecondaryAlt: 'cyan',
  colorError: 'red',
  colorLoading: 'yellow',
};

export const baseFonts = {
  fontDisplay: "'RedHatDisplay', sans-serif",
  fontText: "'RedHatText', sans-serif",
};

const baseTheme = { ...baseColors, ...baseFonts };

export default baseTheme;
