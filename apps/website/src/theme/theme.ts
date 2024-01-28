import { createTheme, responsiveFontSizes } from '@mui/material';

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#5840fc',
      },
      secondary: {
        main: '#e74c3c',
      },
      text: {
        primary: '#fff',
        secondary: '#000',
      },
      background: {
        default: '#000',
        paper: '#fff',
        primary: '#080d0d',
      },
    },
    typography: {
      allVariants: {
        color: '#fff',
      },
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.01562em',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: '-0.00833em',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '0em',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.35,
        letterSpacing: '0.00735em',
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '0em',
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: '0.00714em',
      },
      body1: {
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: 1.45,
        letterSpacing: '0.0075em',
      },
      body2: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
      fontFamily: 'Grotesk, Inter, sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '10rem',
            textTransform: 'capitalize',
          },
        },
        variants: [
          {
            props: { size: 'extraLarge' },
            style: {
              fontSize: '1.5rem',
              fontWeight: 600,
              lineHeight: 1.75,
              letterSpacing: '0.02857em',
              padding: '1rem 2.5rem',
            },
          },
          {
            props: { variant: 'gradient' },
            style: {
              color: 'white',
              backgroundImage: 'linear-gradient(90deg, #5840fc 0%, #e74c3c 70%)',
              backgroundSize: '100% auto',
              transition: 'background-size 0.2s ease-in-out',

              '&:hover': {
                backgroundSize: '160% auto',
              },

              '&:active': {
                backgroundSize: '100% auto',
              },
            },
          },
        ],
      },
    },
  }),
);
