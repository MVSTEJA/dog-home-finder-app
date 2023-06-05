import { Route, Link, Redirect } from 'wouter';

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

import {
  FC,
  ReactElement,
  ReactNode,
  Suspense,
  lazy,
  useMemo,
  useState,
} from 'react';
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

const Dashboard = lazy(() => import('./pages/Dashboard'));

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container maxWidth="xl" sx={{ mx: 'auto' }}>
      <AppNavBar />
      <Toolbar />
      {children}
      {/* <Outlet /> */}
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
    // toast.error('Please provide credentials in login to continue. ', {
    //   toastId: 'redirectPath',
    // });
    return <Redirect to={redirectPath} replace />;
  }

  return children;
};

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkBaseThemeOptions);
const mobileLightTheme = createTheme(mobileLightThemeOptions);
const mobileDarkTheme = createTheme(mobiledarkThemeOptions);

const HOME = () => {
  const loggedIn: boolean | null = useReadLocalStorage('login');
  return (
    <ProtectedRoute isLoggedIn={loggedIn}>
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
        <Dashboard />
      </Suspense>
    </ProtectedRoute>
  );
};

const SIGNIN = () => {
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
  const matches = useMediaQuery('(min-width:600px)');
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [mode, setMode] = useState<'light' | 'dark'>(
    isDarkOS ? 'dark' : 'light'
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  console.log({ matches });
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

          <Layout>
            <Route path={ROUTE_CODES.SIGNIN} component={SIGNIN} />
            <Route path={ROUTE_CODES.HOME} component={HOME} />
            <Route component={NoMatch} />
          </Layout>
        </StyledEngineProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
