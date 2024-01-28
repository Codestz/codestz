/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Palette, ButtonTypeMap } from '@mui/material';

declare module '@mui/material/styles' {
  interface CustomTypeBackground {
    primary: string;
  }
  interface TypeBackground extends CustomTypeBackground {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }

  interface ButtonPropsSizeOverrides {
    extraLarge: true;
  }
}
