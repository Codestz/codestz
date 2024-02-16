import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import MainRouter from './routing/MainRouter';
import { theme } from './theme/theme';
import './i18n';
import './styles.scss';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={MainRouter()} />
    </QueryClientProvider>
  </ThemeProvider>,
);
