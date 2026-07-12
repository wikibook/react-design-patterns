import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ModalContainer } from './pages/3/40';
import { ModalProvider } from './pages/4/44';
import { QueryClientProvider as CustomQueryClientProvider } from './pages/6/16';
import { router } from './routes';
import './styles.css';

const rootElement = document.getElementById('root');
const queryClient = new QueryClient();

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <CustomQueryClientProvider>
      <QueryClientProvider client={queryClient}>
        <ModalContainer>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </ModalContainer>
        <Toaster />
      </QueryClientProvider>
    </CustomQueryClientProvider>
  </StrictMode>,
);
