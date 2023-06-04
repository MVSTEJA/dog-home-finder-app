import * as React from 'react';
import { Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';

import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  Toolbar,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { useReadLocalStorage } from 'usehooks-ts';

import { toast } from 'react-toastify';
import SignInSide from './pages/SignIn';
import AppNavBar from './components/AppNavBar';
import { mobileThemeOptions, themeOptions } from './theme';
import { ROUTE_CODES } from './constants';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const Layout: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ p: 0 }}>
      <AppNavBar />
      <Toolbar />
      <Outlet />
    </Container>
  );
};
const NoMatch: React.FC = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to={ROUTE_CODES.HOME}>Go to the home page</Link>
      </p>
    </div>
  );
};

interface ProtectedRouteProps {
  isLoggedIn: boolean | null;
  redirectPath?: string;
  children: React.ReactElement | null;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isLoggedIn,
  redirectPath = ROUTE_CODES.SIGNIN,
  children,
}: ProtectedRouteProps) => {
  if (!isLoggedIn) {
    toast.error('Please provide credentials in login to continue. ', {
      toastId: 'redirectPath',
    });
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
};

const baseTheme = createTheme(themeOptions);
const mobileTheme = createTheme(mobileThemeOptions);

const App: React.FC = () => {
  const loggedIn: boolean | null = useReadLocalStorage('login');
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <ThemeProvider theme={matches ? baseTheme : mobileTheme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Routes>
          <Route path={ROUTE_CODES.HOME} element={<Layout />}>
            <Route
              index
              path={ROUTE_CODES.SIGNIN}
              element={
                <React.Suspense
                  fallback={
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  }
                >
                  <SignInSide />
                </React.Suspense>
              }
            />
            <Route
              path={ROUTE_CODES.HOME}
              element={
                <ProtectedRoute isLoggedIn={loggedIn}>
                  <React.Suspense
                    fallback={
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: '90vh',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    }
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '90vh',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Dashboard />
                    </Box>
                  </React.Suspense>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default App;
