// types/mui-theme.d.ts

import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    customColor: PaletteColor;
  }
  interface PaletteOptions {
    customColor?: PaletteColorOptions;
  }
}
