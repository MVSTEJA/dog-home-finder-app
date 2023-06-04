// import './wdyr'; // <-- first import

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';

import { QueryClientProvider } from '@tanstack/react-query';
import WebFont from 'webfontloader';
import App from './App';

import queryClient from './queryClient';
import { FilterProvider } from './context/FilterProvider';
import { PaginateProvider } from './context/PaginateProvider';

WebFont.load({
  google: {
    families: ['Lexend'],
  },
});

let container: HTMLElement | null = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <FilterProvider>
              <PaginateProvider>
                <App />
                <ToastContainer theme="dark" />
              </PaginateProvider>
            </FilterProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
});
