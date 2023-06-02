import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { useMediaQuery } from '@mui/material';
import App from './App';

import queryClient from './queryClient';
import { FilterProvider } from './context/FilterProvider';
import { PaginateProvider } from './context/PaginateProvider';
import { themeOptions, mobileThemeOptions } from './theme';

const baseTheme = createTheme(themeOptions);
const mobileTheme = createTheme(mobileThemeOptions);

const ThemeAdapter = () => {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <ThemeProvider theme={matches ? baseTheme : mobileTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <FilterProvider>
          <PaginateProvider>
            <App />
            <ToastContainer theme="dark" />
          </PaginateProvider>
        </FilterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeAdapter />
    </BrowserRouter>
  </React.StrictMode>
);
