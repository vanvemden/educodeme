export const baseColors = {
  colorBackground: 'black',
  colorPrimary: '#3b1461',
  colorPrimaryAlt: '#ef9d10f',
  colorSecondary: '#6b7b8c',
  colorSecondaryAlt: 'ef9d10f',
  colorError: 'red',
  colorLoading: 'yellow',
};

export const baseFonts = {
  fontDisplay: "'RedHatDisplay', sans-serif",
  fontText: "'RedHatText', sans-serif",
};

const baseTheme = { ...baseColors, ...baseFonts };

export default baseTheme;
