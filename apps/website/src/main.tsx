import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import MainRouter from './routing/MainRouter';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/theme';
import './i18n';
import './styles.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={MainRouter()} />
  </ThemeProvider>,
);
