import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import {
  selectIsAuthenticated,
} from '../../../features/auth/auth.selectors';

import {
  useAppSelector,
} from '../../../hooks/useAppSelector';

export const ProtectedRoute = () => {
  const isAuthenticated =
    useAppSelector(
      selectIsAuthenticated,
    );

  const location =
    useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
};