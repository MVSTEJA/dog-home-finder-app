import { Route, Link, Redirect, Switch } from 'wouter';

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
  useTheme,
} from '@mui/material';

import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

import { FC, ReactElement, ReactNode, Suspense, lazy, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';

import {
  lightThemeOptions,
  mobileLightThemeOptions,
  mobiledarkThemeOptions,
  darkBaseThemeOptions,
} from './theme';
import { COLOR_SCHEME_QUERY, ROUTE_CODES } from './constants';
import ColorModeContext from './context/ColorMode';

import DashboardNav from './pages/DashboardNavTabs';
import AppNavBar from './components/AppNavBar';

const SignInSide = lazy(() => import('src/pages/SignIn'));

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container maxWidth="xl" sx={{ mx: 'auto' }}>
      <AppNavBar />
      <Toolbar />
      {children}
    </Container>
  );
};
const NoMatch: FC = () => {
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
  children: ReactElement | null;
}
const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isLoggedIn,
  redirectPath = ROUTE_CODES.SIGNIN,
  children,
}: ProtectedRouteProps) => {
  if (!isLoggedIn) {
    return <Redirect to={redirectPath} replace />;
  }

  return children;
};

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkBaseThemeOptions);
const mobileLightTheme = createTheme(mobileLightThemeOptions);
const mobileDarkTheme = createTheme(mobiledarkThemeOptions);

const HOME: FC = () => {
  const loggedIn: boolean | null = useReadLocalStorage('login');
  return (
    <ProtectedRoute isLoggedIn={loggedIn}>
      <DashboardNav />
    </ProtectedRoute>
  );
};

const SIGNIN: FC = () => {
  return (
    <Suspense
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
    </Suspense>
  );
};

const App: FC = () => {
  const appTheme = useTheme();
  const matches = appTheme.breakpoints.up('sm');

  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);

  const prevTheme = useReadLocalStorage<'light' | 'dark'>('app-theme');
  const [mode, setMode] = useLocalStorage<'light' | 'dark'>(
    'app-theme',
    prevTheme || (isDarkOS ? 'dark' : 'light')
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const theme = useMemo(
    () => {
      const baseTheme = mode === 'dark' ? darkTheme : lightTheme;
      const mobileBaseTheme =
        mode === 'dark' ? mobileDarkTheme : mobileLightTheme;
      const themeVar = matches ? baseTheme : mobileBaseTheme;
      return themeVar;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, matches]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />

          <Toaster />

          <Layout>
            <Switch>
              <Route path={ROUTE_CODES.SIGNIN} component={SIGNIN} />
              <Route path={ROUTE_CODES.HOME} component={HOME} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </StyledEngineProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
