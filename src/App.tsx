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
import {
  lightThemeOptions,
  mobileLightThemeOptions,
  mobiledarkThemeOptions,
  darkBaseThemeOptions,
} from './theme';
import { COLOR_SCHEME_QUERY, ROUTE_CODES } from './constants';
import ColorModeContext from './context/ColorMode';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const Layout: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mx: 'auto' }}>
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

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkBaseThemeOptions);
const mobileLightTheme = createTheme(mobileLightThemeOptions);
const mobileDarkTheme = createTheme(mobiledarkThemeOptions);

const App: React.FC = () => {
  const loggedIn: boolean | null = useReadLocalStorage('login');
  const matches = useMediaQuery('(min-width:600px)');
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    isDarkOS ? 'dark' : 'light'
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () => {
      const baseTheme = mode === 'dark' ? darkTheme : lightTheme;
      const mobileBaseTheme =
        mode === 'dark' ? mobileDarkTheme : mobileLightTheme;
      const themeVar = matches ? baseTheme : mobileBaseTheme;
      return themeVar;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
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
                          display: 'flex',
                          justifyContent: 'center',
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
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      }
                    >
                      <Dashboard />
                    </React.Suspense>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </StyledEngineProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
