import * as React from 'react';
import { Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';

import { CircularProgress, Container } from '@mui/material';
import { useReadLocalStorage } from 'usehooks-ts';

import { toast } from 'react-toastify';
import SignInSide from './pages/SignIn';
import ResponsiveAppBar from './components/AppNavBar';

// const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const Layout: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ p: '0 !important' }}>
      <ResponsiveAppBar />
      <Outlet />
    </Container>
  );
};
const NoMatch: React.FC = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
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
  redirectPath = '/signin',
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
ProtectedRoute.defaultProps = {
  redirectPath: '/signin',
};
const App: React.FC = () => {
  const loggedIn: boolean | null = useReadLocalStorage('login');
  console.log({ loggedIn });
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          path="signin"
          element={
            <React.Suspense fallback={<CircularProgress />}>
              <SignInSide />
            </React.Suspense>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={loggedIn}>
              <React.Suspense fallback={<CircularProgress />}>
                <Dashboard />
              </React.Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default App;
